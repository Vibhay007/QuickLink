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
  const [customAlias, setCustomAlias] = useState('');         // 👈 new
  const [aliasStatus, setAliasStatus] = useState(null);       // 👈 null | 'available' | 'taken' | 'invalid'
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

  // Live alias availability check
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
    }, 500); // wait 500ms after user stops typing

    return () => clearTimeout(timer);
  }, [customAlias]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Block submit if alias is taken or invalid
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

  if (authLoading) return <p>Loading...</p>;
  if (!user) return <Navigate to="/login" replace />;

  return (
    <section className="dashboard">
      <h1 className="page-title">Dashboard</h1>
      <p className="page-subtitle">Create and manage your short links.</p>

      {loading ? (
        <p>Loading your links...</p>
      ) : (
        <>
          <AnalyticsCard analytics={analytics} />

          <form className="shorten-form card" onSubmit={handleSubmit}>
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

            {/* 👇 New custom alias field */}
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
                {aliasStatus === 'available' && <span className="alias-status available">✅ Available</span>}
                {aliasStatus === 'taken'     && <span className="alias-status taken">❌ Already taken</span>}
                {aliasStatus === 'invalid'   && <span className="alias-status invalid">⚠️ 3-30 chars, letters/numbers/hyphens only</span>}
              </div>
              {customAlias && (
                <small className="alias-preview">
                  Your link: <strong>https://quicklink-l7pm.onrender.com/{customAlias}</strong>
                </small>
              )}
            </div>

            {error && <p className="error">{error}</p>}
            <button
              type="submit"
              className="btn btn-primary"
              disabled={submitting || aliasStatus === 'taken' || aliasStatus === 'invalid'}
            >
              {submitting ? 'Shortening...' : 'Shorten'}
            </button>
          </form>

          <div className="url-list">
            <h2>Your links</h2>
            {urls.length === 0 ? (
              <p className="empty">No links yet. Create your first short URL above.</p>
            ) : (
              urls.map((url) => <UrlCard key={url._id} url={url} onDelete={handleDelete} />)
            )}
          </div>
        </>
      )}
      <style>{`
        .shorten-form { margin-bottom: 2rem; }
        .shorten-form h2 { margin-bottom: 1rem; font-size: 1.15rem; }
        .url-list h2 { margin-bottom: 1rem; font-size: 1.15rem; }
        .empty { color: var(--text-muted); }
        .alias-input-wrapper { position: relative; display: flex; align-items: center; gap: 0.5rem; }
        .alias-input-wrapper input { flex: 1; }
        .alias-status { font-size: 0.8rem; white-space: nowrap; }
        .alias-status.available { color: #4ade80; }
        .alias-status.taken { color: #f87171; }
        .alias-status.invalid { color: #facc15; }
        .alias-preview { color: var(--text-muted); font-size: 0.8rem; margin-top: 0.25rem; display: block; }
      `}</style>
    </section>
  );
}

export default Dashboard;