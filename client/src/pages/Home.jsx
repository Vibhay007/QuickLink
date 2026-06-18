import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

function Home() {
  const { user } = useAuth();

  return (
    <section className="home">
      {/* Background Accent Glows */}
      <div className="glow-orb glow-left"></div>
      <div className="glow-orb glow-right"></div>

      <div className="home-content">
        <span className="saas-badge">// Simple Link Shortener</span>
        <h1 className="page-title saas-hero-title">
          Shorten your links <br className="desktop-only" />
          and track your success
        </h1>
        <p className="page-subtitle saas-hero-subtitle">
          QuickLink helps you create short URLs, see real-time click stats, and download QR codes. Share your clean links anywhere instantly.
        </p>
        
        <div className="home-cta">
          {user ? (
            <Link to="/dashboard" className="btn btn-primary saas-hero-primary">
              Go to Dashboard
            </Link>
          ) : (
            <>
              <Link to="/register" className="btn btn-primary register saas-hero-primary">
                Get started free
              </Link>
              <Link to="/login" className="btn btn-secondary saas-hero-secondary">
                Log in
              </Link>
            </>
          )}
        </div>
      </div>

      <div className="home-features">
        <div className="feature card saas-feature-card">
          <div className="feature-indicator">01 // LINKS</div>
          <h3>Short URLs</h3>
          <p>Turn long, messy website links into clean, short codes that are easy to share and look professional.</p>
        </div>
        <div className="feature card saas-feature-card">
          <div className="feature-indicator">02 // STATS</div>
          <h3>Easy Analytics</h3>
          <p>See how many clicks your links get in real-time. Track what devices and countries your visitors come from.</p>
        </div>
        <div className="feature card saas-feature-card">
          <div className="feature-indicator">03 // SHARING</div>
          <h3>QR Codes</h3>
          <p>Instantly generate matching QR codes for your short links. Perfect for scanning on flyers, business cards, or screens.</p>
        </div>
      </div>

      <style>{`
        .home {
          position: relative;
          text-align: center;
          padding: 6rem 0 8rem 0;
          background: transparent;
          width: 100%;
          overflow: hidden;
        }

        /* Glow System */
        .glow-orb {
          position: absolute;
          width: 400px;
          height: 400px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(34, 197, 94, 0.06) 0%, rgba(0, 0, 0, 0) 70%);
          pointer-events: none;
          z-index: 0;
        }
        .glow-left { top: -10%; left: -10%; }
        .glow-right { bottom: 10%; right: -10%; }

        .home-content {
          position: relative;
          z-index: 1;
        }

        .saas-badge {
          display: inline-block;
          font-family: monospace;
          color: #22c55e;
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 2px;
          margin-bottom: 1.5rem;
          background: rgba(34, 197, 94, 0.08);
          padding: 0.35rem 0.75rem;
          border-radius: 99px;
          border: 1px solid rgba(34, 197, 94, 0.15);
        }

        .saas-hero-title {
          font-size: 4rem;
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: 1.5rem;
          color: #ffffff;
          letter-spacing: -2px;
        }

        .saas-hero-subtitle {
          max-width: 680px;
          margin: 0 auto 3.5rem;
          font-size: 1.15rem;
          color: #9ca3af;
          line-height: 1.75;
        }

        .home-cta {
          display: flex;
          justify-content: center;
          gap: 1.25rem;
          margin-bottom: 7rem;
          flex-wrap: wrap;
          position: relative;
          z-index: 1;
        }

        .home-cta .btn {
          min-width: 190px;
          padding: 0.9rem 2rem;
          font-size: 0.95rem;
          border-radius: 10px;
        }

        .saas-hero-primary {
          background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%) !important;
          color: #000000 !important;
          font-weight: 600;
          border: none;
          box-shadow: 0 4px 20px rgba(34, 197, 94, 0.3);
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .saas-hero-primary:hover {
          filter: brightness(1.15);
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(34, 197, 94, 0.45);
        }

        .saas-hero-secondary {
          background: #111726 !important;
          border: 1px solid rgba(255, 255, 255, 0.08) !important;
          color: #ffffff !important;
          font-weight: 600;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .saas-hero-secondary:hover {
          background: #1f2937 !important;
          border-color: rgba(255, 255, 255, 0.2) !important;
          transform: translateY(-2px);
        }

        /* Feature Card Grid */
        .home-features {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.75rem;
          max-width: 1000px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }

        .saas-feature-card {
          background: #111726; 
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 20px;
          padding: 2.5rem 2rem;
          text-align: left;
          box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.5);
          transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.25s ease;
        }

        .saas-feature-card:hover {
          transform: translateY(-5px);
          border-color: rgba(34, 197, 94, 0.3);
        }

        .feature-indicator {
          font-family: monospace;
          color: #4b5563;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 1px;
          margin-bottom: 1.25rem;
        }

        .saas-feature-card h3 {
          margin-bottom: 0.85rem;
          font-size: 1.3rem;
          font-weight: 700;
          color: #ffffff;
          letter-spacing: -0.4px;
        }

        .saas-feature-card p {
          color: #9ca3af;
          font-size: 0.9rem;
          line-height: 1.65;
        }

        .desktop-only {
          display: block;
        }

        @media (max-width: 768px) {
          .saas-hero-title {
            font-size: 2.75rem;
            letter-spacing: -1px;
          }

          .saas-hero-subtitle {
            font-size: 1rem;
            margin-bottom: 2.5rem;
          }

          .home-cta {
            flex-direction: column;
            align-items: center;
            gap: 0.85rem;
            margin-bottom: 4.5rem;
          }

          .home-cta .btn {
            width: 100%;
            max-width: 340px;
          }

          .desktop-only {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}

export default Home;