import { useState, useEffect, useCallback } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { urlAPI } from '../services/api.js';
import UrlCard from '../components/UrlCard.jsx';
import AnalyticsCard from '../components/AnalyticsCard.jsx';

function Dashboard() {
  const { user, loading: authLoading } = useAuth();
  const [urls, setUrls] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [originalUrl, setOriginalUrl] = useState('');
  const [title, setTitle] = useState('');
  const [customAlias, setCustomAlias] = useState('');
  const [aliasStatus, setAliasStatus] = useState(null);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [urlsRes, analyticsRes] = await Promise.all([
        urlAPI.getAll(),
        urlAPI.getAnalytics(),
      ]);
      setUrls(urlsRes.data);
      setAnalytics(analyticsRes.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchData();
  }, [user]);

  useEffect(() => {
    if (!customAlias) {
      setAliasStatus(null);
      return;
    }

    const isValid = /^[a-zA-Z0-9-_]{3,30}$/.test(customAlias);
    if (!isValid) {
      setAliasStatus('invalid');
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const { data } = await urlAPI.checkAlias(customAlias);
        setAliasStatus(data.available ? 'available' : 'taken');
      } catch {
        setAliasStatus(null);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [customAlias]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (aliasStatus === 'taken') {
      return setError('This alias is already taken. Please choose another.');
    }
    if (aliasStatus === 'invalid') {
      return setError('Alias must be 3-30 characters, letters/numbers/hyphens only.');
    }

    setSubmitting(true);
    try {
      const { data } = await urlAPI.create({ originalUrl, title, customAlias: customAlias || undefined });
      setUrls((prev) => [data, ...prev]);
      setAnalytics((prev) =>
        prev
          ? {
              ...prev,
              totalUrls: prev.totalUrls + 1,
              topUrls: [data, ...(prev.topUrls || [])].slice(0, 5),
            }
          : prev
      );
      setOriginalUrl('');
      setTitle('');
      setCustomAlias('');
      setAliasStatus(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to shorten URL');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await urlAPI.delete(id);
      setUrls((prev) => prev.filter((u) => u._id !== id));
      const analyticsRes = await urlAPI.getAnalytics();
      setAnalytics(analyticsRes.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete URL');
    }
  };

  if (authLoading) return <p style={{ color: '#9ca3af', textAlign: 'center', marginTop: '4rem' }}>Loading...</p>;
  if (!user) return <Navigate to="/login" replace />;

  return (
    <section className="dashboard">
      <h1 className="saas-dashboard-title">Dashboard</h1>
      <p className="saas-dashboard-subtitle">Create and manage your short links.</p>

      {loading ? (
        <p style={{ color: '#6b7280', fontSize: '0.95rem' }}>Loading your links...</p>
      ) : (
        <>
          <AnalyticsCard analytics={analytics} />

          <form className="shorten-form card saas-form" onSubmit={handleSubmit}>
            <h2>Shorten a URL</h2>
            
            <div className="form-group">
              <label htmlFor="originalUrl">Long URL</label>
              <input
                id="originalUrl"
                type="url"
                placeholder="https://example.com/very-long-url"
                value={originalUrl}
                onChange={(e) => setOriginalUrl(e.target.value)}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="title">Title (optional)</label>
              <input
                id="title"
                type="text"
                placeholder="My link"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="customAlias">Custom Alias (optional)</label>
              <div className="alias-input-wrapper">
                <input
                  id="customAlias"
                  type="text"
                  placeholder="my-portfolio"
                  value={customAlias}
                  onChange={(e) => setCustomAlias(e.target.value)}
                />
                {aliasStatus && (
                  <div className={`alias-badge ${aliasStatus}`}>
                    {aliasStatus === 'available' && '✅ Available'}
                    {aliasStatus === 'taken'     && '❌ Taken'}
                    {aliasStatus === 'invalid'   && '⚠️ Invalid Pattern'}
                  </div>
                )}
              </div>
              {customAlias && (
                <small className="alias-preview">
                  Generated URL: <span>https://quicklink-l7pm.onrender.com/{customAlias}</span>
                </small>
              )}
            </div>

            {error && <p className="error">{error}</p>}
            
            <button
              type="submit"
              className="btn-saas-submit"
              disabled={submitting || aliasStatus === 'taken' || aliasStatus === 'invalid'}
            >
              {submitting ? 'Shortening...' : 'Shorten Endpoint'}
            </button>
          </form>

          <div className="url-list">
            <h2 className="list-section-title">Your links</h2>
            {urls.length === 0 ? (
              <p className="empty">No links yet. Create your first short URL above.</p>
            ) : (
              <div className="cards-stack">
                {urls.map((url) => <UrlCard key={url._id} url={url} onDelete={handleDelete} />)}
              </div>
            )}
          </div>
        </>
      )}
      <style>{`
        /* Dashboard Container Settings */
        .dashboard {
          max-width: 1000px;
          margin: 0 auto;
          padding: 3.5rem 1.5rem 6rem 1.5rem;
          background: transparent; /* Seamless blend with global background */
          min-height: 100vh;
          font-family: -apple-system, BlinkMacSystemFont, sans-serif;
          color: #f3f4f6;
        }
        .saas-dashboard-title {
          font-size: 2.25rem;
          font-weight: 800;
          color: #ffffff;
          letter-spacing: -1px;
          margin: 0 0 0.35rem 0;
        }
        .saas-dashboard-subtitle {
          color: #6b7280;
          font-size: 0.95rem;
          margin: 0 0 2.5rem 0;
        }

        /* Modern Saas Panel Box */
        .saas-form {
          background: #111726; /* Matches premium feature card backing color */
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 20px;
          padding: 2.5rem 2rem;
          margin-bottom: 2.5rem;
          box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.5);
        }
        .saas-form h2 {
          color: #ffffff;
          font-size: 1.35rem;
          font-weight: 700;
          letter-spacing: -0.4px;
          margin: 0 0 1.75rem 0;
        }

        /* Input Controls Layout */
        .form-group {
          margin-bottom: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .form-group label {
          color: #9ca3af;
          font-size: 0.85rem;
          font-weight: 600;
          letter-spacing: -0.1px;
        }
        .form-group input {
          background: #0b0f19;
          border: 1px solid rgba(255, 255, 255, 0.06);
          color: #ffffff;
          padding: 0.85rem 1.15rem;
          border-radius: 10px;
          font-size: 0.95rem;
          transition: all 0.25s ease;
          width: 100%;
          box-sizing: border-box;
        }
        .form-group input:focus {
          outline: none;
          border-color: rgba(34, 197, 94, 0.4);
          box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.1);
        }
        .form-group input::placeholder {
          color: #4b5563;
        }

        /* Interactive Custom Alias Field */
        .alias-input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          width: 100%;
        }
        .alias-input-wrapper input {
          padding-right: 8.5rem;
        }
        .alias-badge {
          position: absolute;
          right: 0.75rem;
          font-size: 0.75rem;
          font-weight: 600;
          padding: 0.3rem 0.6rem;
          border-radius: 6px;
          background: #111827;
          border: 1px solid transparent;
          user-select: none;
        }
        .alias-badge.available { color: #4ade80; border-color: rgba(74, 222, 128, 0.2); }
        .alias-badge.taken { color: #f87171; border-color: rgba(248, 113, 113, 0.2); }
        .alias-badge.invalid { color: #fbbf24; border-color: rgba(251, 191, 36, 0.2); }
        
        .alias-preview {
          color: #6b7280;
          font-size: 0.8rem;
          margin-top: 0.35rem;
        }
        .alias-preview span {
          color: #22c55e;
          font-family: monospace;
          font-weight: 600;
        }

        /* Action Controls button */
        .btn-saas-submit {
          width: 100%;
          background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%) !important;
          color: #000000 !important;
          border: none;
          padding: 0.9rem 1.5rem;
          border-radius: 10px;
          font-size: 0.95rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          margin-top: 0.5rem;
          box-shadow: 0 4px 14px rgba(34, 197, 94, 0.25);
        }
        .btn-saas-submit:hover:not(:disabled) {
          filter: brightness(1.1);
          transform: translateY(-1.5px);
          box-shadow: 0 6px 20px rgba(34, 197, 94, 0.35);
        }
        .btn-saas-submit:disabled {
          background: #1f2937 !important;
          color: #4b5563 !important;
          cursor: not-allowed;
          box-shadow: none;
          filter: none;
          transform: none;
        }

        .error {
          color: #f43f5e;
          font-size: 0.85rem;
          margin: 0.5rem 0;
          font-weight: 500;
        }

        /* Bottom Link Feed List Section */
        .list-section-title {
          color: #ffffff;
          font-size: 1.35rem;
          font-weight: 700;
          margin: 3.5rem 0 1.5rem 0;
          letter-spacing: -0.4px;
        }
        .cards-stack {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .empty {
          color: #6b7280;
          font-size: 0.95rem;
          background: #111726;
          border: 1px solid rgba(255, 255, 255, 0.05);
          padding: 3rem 2rem;
          border-radius: 16px;
          text-align: center;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </section>
  );
}

export default Dashboard;