function AnalyticsCard({ analytics }) {
  if (!analytics) return null;

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
              <li key={url._id}>
                <span className="top-code">/{url.shortCode}</span>
                <span className="top-clicks">{url.clicks} clicks</span>
              </li>
            ))}
          </ul>
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
        .analytics-top li {
          display: flex;
          justify-content: space-between;
          padding: 0.5rem 0;
          border-bottom: 1px solid var(--border);
        }
        .analytics-top li:last-child { border-bottom: none; }
        .top-code { color: var(--primary); font-family: monospace; }
        .top-clicks { color: var(--text-muted); font-size: 0.9rem; }
      `}</style>
    </div>
  );
}

export default AnalyticsCard;
