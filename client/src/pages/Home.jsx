import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

function Home() {
  const { user } = useAuth();

  return (
    <section className="home">
      <h1 className="page-title">Shorten your links in seconds</h1>
      <p className="page-subtitle">
        QuickLink helps you create short URLs, track clicks, and share QR codes — all in one place.
      </p>
      <div className="home-cta">
        {user ? (
          <Link to="/dashboard" className="btn btn-primary">
            Go to Dashboard
          </Link>
        ) : (
          <>
            <Link to="/register" className="btn btn-primary register">
              Get started free
            </Link>
            <Link to="/login" className="btn btn-secondary">
              Log in
            </Link>
          </>
        )}
      </div>
      <div className="home-features">
        <div className="feature card">
          <h3>Short URLs</h3>
          <p>Turn long links into memorable short codes.</p>
        </div>
        <div className="feature card">
          <h3>Analytics</h3>
          <p>Track clicks and see your top-performing links.</p>
        </div>
        <div className="feature card">
          <h3>QR Codes</h3>
          <p>Generate QR codes for easy offline sharing.</p>
        </div>
      </div>
     <style>{`
       .register {
  background: linear-gradient(
    135deg,
    #ec4899 0%,
    #d946ef 50%,
    #8b5cf6 100%
  );

  color: white;
  font-weight: 600;
  border: none;

  box-shadow:
    0 4px 12px rgba(236, 72, 153, 0.25),
    0 8px 24px rgba(139, 92, 246, 0.15);

  transition: all 0.3s ease;
}

.register:hover {
  background: linear-gradient(
    135deg,
    #f472b6 0%,
    #e879f9 50%,
    #a78bfa 100%
  );

  color: white;
  transform: translateY(-2px);

  box-shadow:
    0 8px 20px rgba(236, 72, 153, 0.35),
    0 12px 30px rgba(139, 92, 246, 0.25);
}

.register:active {
  transform: translateY(0);
}
  .home {
    text-align: center;
    padding: 2rem 0;
  }

  .page-title {
    font-size: 3.5rem;
    font-weight: 800;
    line-height: 1.1;
    margin-bottom: 1rem;

    background: linear-gradient(
      135deg,
      #ec4899,
      #c026d3,
      #8b5cf6
    );

    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .page-subtitle {
    max-width: 700px;
    margin: 0 auto 2.5rem;
    font-size: 1.1rem;
    color: var(--text-secondary);
    line-height: 1.8;
  }

  .home-cta {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 4rem;
    flex-wrap: wrap;
  }

  .home-cta .btn {
    min-width: 170px;
    padding: 0.9rem 1.6rem;
  }

  .home-features {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 1.5rem;
  }

  .feature {
    position: relative;
    overflow: hidden;
    transition: all 0.3s ease;
    text-align: left;
  }

  .feature::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      135deg,
      rgba(236, 72, 153, 0.08),
      rgba(168, 85, 247, 0.08)
    );
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .feature:hover {
    transform: translateY(-6px);
    box-shadow:
      0 15px 35px rgba(236, 72, 153, 0.12),
      0 5px 15px rgba(0, 0, 0, 0.05);
  }

  .feature:hover::before {
    opacity: 1;
  }

  .feature h3 {
    position: relative;
    margin-bottom: 0.75rem;
    font-size: 1.25rem;
    color: var(--primary);
  }

  .feature p {
    position: relative;
    color: var(--text-muted);
    font-size: 0.95rem;
    line-height: 1.7;
  }

  @media (max-width: 768px) {
    .page-title {
      font-size: 2.5rem;
    }

    .page-subtitle {
      font-size: 1rem;
    }

    .home-cta {
      flex-direction: column;
      align-items: center;
    }

    .home-cta .btn {
      width: 100%;
      max-width: 320px;
    }
  }
`}</style>
    </section>
  );
}

export default Home;
