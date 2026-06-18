import { useState } from 'react';
import { urlAPI } from '../services/api.js';
import { 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, 
  BarChart, Bar, PieChart, Pie, Cell, Legend 
} from 'recharts';

function AnalyticsCard({ analytics }) {
  if (!analytics) return null;

  const [activeUrlId, setActiveUrlId] = useState(null);
  const [detailedData, setDetailedData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Modern emerald and muted slate palette for custom data slices
  const COLORS = ['#22c55e', '#3b82f6', '#a855f7', '#64748b', '#10b981'];

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
      setError(null);
      return;
    }

    setActiveUrlId(urlId);
    setLoading(true);
    setError(null);

    try {
      const { data } = await urlAPI.getClickAnalytics(urlId);
      setDetailedData(data);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to load charts.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="analytics-grid">
      <div className="analytics-stat card">
        <span className="analytics-value">{analytics.totalUrls}</span>
        <span className="analytics-label">Total Links</span>
      </div>
      <div className="analytics-stat card">
        <span className="analytics-value">{analytics.totalClicks}</span>
        <span className="analytics-label">Total Clicks</span>
      </div>

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

      {(activeUrlId || loading) && (
        <div className="analytics-charts-panel card">
          {loading && <div className="chart-loader">Fetching granular traffic metrics...</div>}
          {error && <div className="chart-error-msg">⚠️ {error}</div>}
          
          {!loading && !error && detailedData && (
            <div className="charts-layout">
              <h4>Granular Insights for Selected Link</h4>
              
              <div className="chart-wrapper">
                <h5>Clicks Distribution Timeline</h5>
                <div style={{ width: '100%', height: 180 }}>
                  <ResponsiveContainer>
                    <AreaChart data={transformTimeSeries(detailedData.clicksByDay)}>
                      <defs>
                        <linearGradient id="emeraldGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#22c55e" stopOpacity={0.2}/>
                          <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="date" stroke="#4b5563" fontSize={11} tickLine={false} />
                      <YAxis stroke="#4b5563" fontSize={11} allowDecimals={false} axisLine={false} tickLine={false} />
                      <Tooltip contentStyle={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '8px', color: '#ffffff' }} />
                      <Area type="monotone" dataKey="clicks" stroke="#22c55e" strokeWidth={2.5} fillOpacity={1} fill="url(#emeraldGradient)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

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
                        <Tooltip contentStyle={{ backgroundColor: '#111827', border: '1px solid #1f2937', color: '#ffffff' }} />
                        <Legend iconSize={6} wrapperStyle={{ fontSize: '11px', color: '#9ca3af' }} />
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
                        <YAxis dataKey="name" type="category" stroke="#9ca3af" fontSize={11} width={60} axisLine={false} tickLine={false} />
                        <Tooltip contentStyle={{ backgroundColor: '#111827', border: '1px solid #1f2937', color: '#ffffff' }} />
                        <Bar dataKey="value" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={12} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              <div className="charts-split-row">
                <div className="chart-wrapper half-width">
                  <h5>Top Countries</h5>
                  <div style={{ width: '100%', height: 150 }}>
                    <ResponsiveContainer>
                      <BarChart data={transformData(detailedData.countries)} layout="vertical">
                        <XAxis type="number" hide />
                        <YAxis dataKey="name" type="category" stroke="#9ca3af" fontSize={11} width={80} axisLine={false} tickLine={false} />
                        <Tooltip contentStyle={{ backgroundColor: '#111827', border: '1px solid #1f2937', color: '#ffffff' }} />
                        <Bar dataKey="value" fill="#22c55e" radius={[0, 4, 4, 0]} barSize={12} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="chart-wrapper half-width">
                  <h5>Referrer Sources</h5>
                  <div style={{ width: '100%', height: 150 }}>
                    <ResponsiveContainer>
                      <PieChart>
                        <Pie
                          data={transformData(detailedData.referrers)}
                          cx="50%" cy="50%" innerRadius={35} outerRadius={50} paddingAngle={3} dataKey="value"
                        >
                          {transformData(detailedData.referrers).map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip contentStyle={{ backgroundColor: '#111827', border: '1px solid #1f2937', color: '#ffffff' }} />
                        <Legend iconSize={6} wrapperStyle={{ fontSize: '11px', color: '#9ca3af' }} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

            </div>
          )}
        </div>
      )}

      <style>{`
        .analytics-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 1.25rem; margin-bottom: 2.5rem; }
        .analytics-stat { text-align: left; padding: 1.5rem; background: linear-gradient(180deg, #141c2f 0%, #0f1524 100%); border: 1px solid rgba(255, 255, 255, 0.05); }
        .analytics-value { display: block; font-size: 2.25rem; font-weight: 700; color: #ffffff; letter-spacing: -1px; line-height: 1.2; margin-bottom: 0.25rem; }
        .analytics-label { color: #6b7280; font-size: 0.85rem; font-weight: 500; }
        .analytics-top { grid-column: 1 / -1; background: linear-gradient(180deg, #141c2f 0%, #0f1524 100%); border: 1px solid rgba(255, 255, 255, 0.05); }
        .analytics-top h3 { margin-bottom: 1.25rem; font-size: 1.15rem; color: #ffffff; font-weight: 700; letter-spacing: -0.3px; }
        .analytics-top ul { list-style: none; display: flex; flex-direction: column; gap: 0.25rem; }
        .top-link-item { display: flex; justify-content: space-between; align-items: center; padding: 0.75rem 0.5rem; border-bottom: 1px solid rgba(255, 255, 255, 0.04); }
        .top-link-item:last-child { border-bottom: none; }
        .link-details { display: flex; flex-direction: row; align-items: center; gap: 1.25rem; }
        .top-code { color: #22c55e; font-family: monospace; font-weight: 600; font-size: 0.95rem; }
        .top-clicks { color: #6b7280; font-size: 0.85rem; }
        
        .btn-analytics { background: #1f2937; border: 1px solid rgba(255, 255, 255, 0.06); color: #f3f4f6; padding: 0.45rem 0.9rem; border-radius: 8px; font-size: 0.8rem; font-weight: 600; cursor: pointer; transition: all 0.2s ease; }
        .btn-analytics:hover { background: #2d3748; border-color: rgba(255, 255, 255, 0.15); }
        .btn-analytics.active { background: rgba(34, 197, 94, 0.15); border-color: #22c55e; color: #22c55e; }
        
        .analytics-charts-panel { grid-column: 1 / -1; padding: 2rem; background: linear-gradient(180deg, #141c2f 0%, #0f1524 100%); border: 1px solid rgba(255, 255, 255, 0.05); }
        .chart-loader, .chart-error-msg { text-align: center; color: #6b7280; padding: 2rem 0; font-size: 0.9rem; }
        .chart-error-msg { color: #f43f5e; font-weight: 500; }
        
        .charts-layout h4 { margin: 0 0 1.5rem 0; font-size: 1.15rem; color: #ffffff; font-weight: 700; letter-spacing: -0.3px; }
        .chart-wrapper { background: #0b0f19; border: 1px solid rgba(255, 255, 255, 0.04); border-radius: 12px; padding: 1.25rem; margin-bottom: 1.25rem; }
        .chart-wrapper h5 { margin: 0 0 1rem 0; font-size: 0.85rem; color: #9ca3af; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }
        .charts-split-row { display: flex; gap: 1.25rem; flex-wrap: wrap; margin-bottom: 1.25rem; }
        .charts-split-row:last-child { margin-bottom: 0; }
        .half-width { flex: 1; min-width: 280px; margin-bottom: 0; }

        /* Recharts text customization over dark background labels */
        .recharts-text { fill: #9ca3af !important; }
        .recharts-legend-item-text { color: #9ca3af !important; }
      `}</style>
    </div>
  );
}

export default AnalyticsCard;