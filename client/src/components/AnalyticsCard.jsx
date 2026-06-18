import { useState } from 'react';
import axios from 'axios';
import { 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, 
  BarChart, Bar, PieChart, Pie, Cell, Legend 
} from 'recharts';

function AnalyticsCard({ analytics }) {
  if (!analytics) return null;

  const [activeUrlId, setActiveUrlId] = useState(null);
  const [detailedData, setDetailedData] = useState(null);
  const [loading, setLoading] = useState(false);

  const COLORS = ['#d946ef', '#ec4899', '#f43f5e', '#fb7185', '#c084fc'];

  const transformData = (obj) => {
    if (!obj) return [];
    return Object.entries(obj).map(([key, val]) => ({ name: key, value: val }));
  };

  const transformTimeSeries = (obj) => {
    if (!obj) return [];
    return Object.entries(obj).map(([key, val]) => ({ date: key, clicks: val }));
  };

  const handleFetchAnalytics = async (urlId) => {
    if (activeUrlId === urlId) {
      setActiveUrlId(null);
      setDetailedData(null);
      return;
    }

    setActiveUrlId(urlId);
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `http://localhost:5001/api/urls/${urlId}/analytics`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setDetailedData(response.data);
    } catch (err) {
      console.error("Error fetching detailed link metrics:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="analytics-grid">
      {/* Overview Stat Blocks */}
      <div className="analytics-stat card">
        <span className="analytics-value">{analytics.totalUrls}</span>
        <span className="analytics-label">Total Links</span>
      </div>
      <div className="analytics-stat card">
        <span className="analytics-value">{analytics.totalClicks}</span>
        <span className="analytics-label">Total Clicks</span>
      </div>

      {/* Top Links List Container */}
      {analytics.topUrls?.length > 0 && (
        <div className="analytics-top card">
          <h3>Top Links</h3>
          <ul>
            {analytics.topUrls.map((url) => (
              <li key={url._id} className="top-link-item">
                <div className="link-details">
                  <span className="top-code">/{url.shortCode}</span>
                  <span className="top-clicks">{url.clicks} clicks</span>
                </div>
                
                {/* Dedicated Action Button */}
                <button 
                  type="button" 
                  className={`btn-analytics ${activeUrlId === url._id ? 'active' : ''}`}
                  onClick={() => handleFetchAnalytics(url._id)}
                >
                  {activeUrlId === url._id ? 'Hide Stats' : 'View Stats'}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* ── INTERACTIVE CHARTS BREAKDOWN PANEL ── */}
      {(activeUrlId || loading) && (
        <div className="analytics-charts-panel card">
          {loading ? (
            <div className="chart-loader">Fetching granular traffic metrics...</div>
          ) : (
            detailedData && (
              <div className="charts-layout">
                <h4>Granular Insights for Selected Link</h4>
                
                {/* 1. Timeline Chart */}
                <div className="chart-wrapper">
                  <h5>Clicks Distribution Timeline</h5>
                  <div style={{ width: '100%', height: 180 }}>
                    <ResponsiveContainer>
                      <AreaChart data={transformTimeSeries(detailedData.clicksByDay)}>
                        <defs>
                          <linearGradient id="pinkGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#ec4899" stopOpacity={0.25}/>
                            <stop offset="95%" stopColor="#ec4899" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="date" stroke="#94a3b8" fontSize={11} tickLine={false} />
                        <YAxis stroke="#94a3b8" fontSize={11} allowDecimals={false} axisLine={false} tickLine={false} />
                        <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #f3e8ff', borderRadius: '8px' }} />
                        <Area type="monotone" dataKey="clicks" stroke="#ec4899" strokeWidth={2.5} fillOpacity={1} fill="url(#pinkGradient)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* 2. Side-by-Side Splits */}
                <div className="charts-split-row">
                  <div className="chart-wrapper half-width">
                    <h5>Device Breakdowns</h5>
                    <div style={{ width: '100%', height: 150 }}>
                      <ResponsiveContainer>
                        <PieChart>
                          <Pie
                            data={transformData(detailedData.devices)}
                            cx="50%" cy="50%" innerRadius={35} outerRadius={50} paddingAngle={3} dataKey="value"
                          >
                            {transformData(detailedData.devices).map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                          <Legend iconSize={6} wrapperStyle={{ fontSize: '11px' }} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div className="chart-wrapper half-width">
                    <h5>Top Browsers</h5>
                    <div style={{ width: '100%', height: 150 }}>
                      <ResponsiveContainer>
                        <BarChart data={transformData(detailedData.browsers)} layout="vertical">
                          <XAxis type="number" hide />
                          <YAxis dataKey="name" type="category" stroke="#64748b" fontSize={11} width={60} axisLine={false} tickLine={false} />
                          <Tooltip />
                          <Bar dataKey="value" fill="#d946ef" radius={[0, 4, 4, 0]} barSize={12} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      )}

      <style>{`
        .analytics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
          gap: 1rem;
          margin-bottom: 2rem;
        }
        .analytics-stat {
          text-align: center;
          padding: 1.25rem;
        }
        .analytics-value {
          display: block;
          font-size: 2rem;
          font-weight: 700;
          color: var(--primary);
        }
        .analytics-label {
          color: var(--text-muted);
          font-size: 0.9rem;
        }
        .analytics-top {
          grid-column: 1 / -1;
        }
        .analytics-top h3 {
          margin-bottom: 0.75rem;
          font-size: 1rem;
        }
        .analytics-top ul {
          list-style: none;
        }
        .top-link-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.65rem 0.5rem;
          border-bottom: 1px solid var(--border);
        }
        .top-link-item:last-child { border-bottom: none; }
        .link-details {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }
        .top-code { color: var(--primary); font-family: monospace; font-weight: 600; }
        .top-clicks { color: var(--text-muted); font-size: 0.85rem; }

        /* Separate Button Style matching QuickLink theme */
        .btn-analytics {
          background: transparent;
          border: 1px solid var(--primary);
          color: var(--primary);
          padding: 0.4rem 0.8rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .btn-analytics:hover {
          background: var(--primary);
          color: #fff;
        }
        .btn-analytics.active {
          background: #64748b;
          border-color: #64748b;
          color: #fff;
        }

        /* Chart Section CSS */
        .analytics-charts-panel {
          grid-column: 1 / -1;
          padding: 1.25rem;
          animation: fadeIn 0.25s ease-out;
        }
        .chart-loader {
          text-align: center;
          color: var(--text-muted);
          padding: 2rem 0;
          font-size: 0.9rem;
        }
        .charts-layout h4 {
          margin: 0 0 1rem 0;
          font-size: 1rem;
          color: #334155;
        }
        .chart-wrapper {
          background: #fafafa;
          border: 1px solid #f1f5f9;
          border-radius: 10px;
          padding: 1rem;
          margin-bottom: 1rem;
        }
        .chart-wrapper h5 {
          margin: 0 0 0.75rem 0;
          font-size: 0.85rem;
          color: #64748b;
        }
        .charts-split-row {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .half-width {
          flex: 1;
          min-width: 240px;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

export default AnalyticsCard;