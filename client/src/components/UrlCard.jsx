import { useState } from 'react';
import QRCode from './QRCode.jsx';
import copyToClipboard from '../utils/copyToClipboard.js';
import axios from 'axios'; // Ensure axios is configured or imported
import { 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, 
  BarChart, Bar, PieChart, Pie, Cell, Legend 
} from 'recharts';

function UrlCard({ url, onDelete }) {
  const [copied, setCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);
  
  // Analytics States
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCopy = async () => {
    const ok = await copyToClipboard(url.shortUrl);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Fetch metrics when the user clicks the Analytics button
  const toggleAnalytics = async () => {
    const nextState = !showAnalytics;
    setShowAnalytics(nextState);

    if (nextState && !analyticsData) {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem('token'); // Or wherever you store your JWT token
        const response = await axios.get(
          `http://localhost:5001/api/urls/${url._id}/analytics`, 
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setAnalyticsData(response.data);
      } catch (err) {
        console.error("Error fetching analytics:", err);
        setError(err.response?.data?.message || 'Failed to load analytics');
      } finally {
        setLoading(false);
      }
    }
  };

  // Helper to transform object metrics ({ desktop: 2, mobile: 1 }) into chart arrays ([ { name: 'desktop', value: 2 } ])
  const transformData = (obj) => {
    if (!obj) return [];
    return Object.entries(obj).map(([key, val]) => ({ name: key, value: val }));
  };

  // Transform time series data ({ "2026-06-18": 2 }) into line chart array
  const transformTimeSeries = (obj) => {
    if (!obj) return [];
    return Object.entries(obj).map(([key, val]) => ({ date: key, clicks: val }));
  };

  const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  return (
    <div className="url-card card">
      <div className="url-card-header">
        <a href={url.originalUrl} target="_blank" rel="noopener noreferrer" className="url-original">
          {url.title || url.originalUrl}
        </a>
        <span className="url-clicks">{url.clicks} clicks</span>
      </div>
      <div className="url-short">
        <a href={url.shortUrl} target="_blank" rel="noopener noreferrer">
          {url.shortUrl}
        </a>
      </div>
      
      <div className="url-card-actions">
        <button type="button" className="btn btn-secondary" onClick={handleCopy}>
          {copied ? 'Copied!' : 'Copy'}
        </button>
        <button type="button" className="btn btn-secondary" onClick={() => setShowQR(!showQR)}>
          {showQR ? 'Hide QR' : 'QR Code'}
        </button>
        <button type="button" className={`btn ${showAnalytics ? 'btn-primary' : 'btn-secondary'}`} onClick={toggleAnalytics}>
          {showAnalytics ? 'Hide Stats' : 'Analytics'}
        </button>
        <button type="button" className="btn btn-danger" onClick={() => onDelete(url._id)}>
          Delete
        </button>
      </div>

      {showQR && (
        <div className="url-qr">
          <QRCode value={url.shortUrl} />
        </div>
      )}

      {/* ── ANALYTICS EXPANDABLE DASHBOARD ── */}
      {showAnalytics && (
        <div className="url-analytics-panel">
          {loading && <div className="loader">Gathering statistics...</div>}
          {error && <div className="error-msg">{error}</div>}
          
          {analyticsData && !loading && !error && (
            <div className="analytics-content">
              
              {/* Chart 1: Click Timeline */}
              <div className="chart-wrapper full-width">
                <h4>Clicks Over Time</h4>
                <div style={{ width: '100%', height: 200 }}>
                  <ResponsiveContainer>
                    <AreaChart data={transformTimeSeries(analyticsData.clicksByDay)}>
                      <defs>
                        <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4}/>
                          <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="date" stroke="var(--text-muted)" fontSize={11} />
                      <YAxis stroke="var(--text-muted)" fontSize={11} allowDecimals={false} />
                      <Tooltip contentStyle={{ backgroundColor: '#1e1e24', border: 'none', borderRadius: '8px', color: '#fff' }} />
                      <Area type="monotone" dataKey="clicks" stroke="#6366f1" strokeWidth={2} fillOpacity={1} fill="url(#colorClicks)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Chart 2 & 3: Devices & Browsers Grid */}
              <div className="charts-grid">
                <div className="chart-wrapper">
                  <h4>Devices</h4>
                  <div style={{ width: '100%', height: 160 }}>
                    <ResponsiveContainer>
                      <PieChart>
                        <Pie
                          data={transformData(analyticsData.devices)}
                          cx="50%" cy="50%"
                          innerRadius={40} outerRadius={60}
                          paddingAngle={5} dataKey="value"
                        >
                          {transformData(analyticsData.devices).map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend iconSize={8} wrapperStyle={{ fontSize: '11px' }} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="chart-wrapper">
                  <h4>Top Browsers</h4>
                  <div style={{ width: '100%', height: 160 }}>
                    <ResponsiveContainer>
                      <BarChart data={transformData(analyticsData.browsers)} layout="vertical">
                        <XAxis type="number" hide />
                        <YAxis dataKey="name" type="category" stroke="var(--text-muted)" fontSize={11} width={60} />
                        <Tooltip />
                        <Bar dataKey="value" fill="#10b981" radius={[0, 4, 4, 0]} barSize={12} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

            </div>
          )}
        </div>
      )}

      <style>{`
        .url-card { margin-bottom: 1rem; }
        .url-card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 1rem;
          margin-bottom: 0.5rem;
        }
        .url-original {
          color: var(--text);
          font-weight: 600;
          word-break: break-all;
        }
        .url-clicks {
          color: var(--text-muted);
          font-size: 0.85rem;
          white-space: nowrap;
        }
        .url-short { margin-bottom: 1rem; }
        .url-short a { color: var(--primary); word-break: break-all; }
        .url-card-actions { display: flex; flex-wrap: wrap; gap: 0.5rem; }
        .url-qr { margin-top: 1rem; display: flex; justify-content: center; }

        /* Analytics Styling */
        .url-analytics-panel {
          margin-top: 1.25rem;
          padding-top: 1.25rem;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }
        .loader, .error-msg {
          text-align: center;
          font-size: 0.9rem;
          color: var(--text-muted);
          padding: 1rem 0;
        }
        .error-msg { color: #ef4444; }
        .analytics-content {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .chart-wrapper {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          padding: 1rem;
        }
        .chart-wrapper h4 {
          margin: 0 0 0.75rem 0;
          font-size: 0.9rem;
          font-weight: 500;
          color: var(--text-muted);
        }
        .charts-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
        }
      `}</style>
    </div>
  );
}

export default UrlCard;