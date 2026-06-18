import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand-wrapper">
        <div className="cool-logo-icon">
          <div className="logo-ring ring-outer"></div>
          <div className="logo-ring ring-inner"></div>
          <div className="logo-bolt"></div>
        </div>
        <span className="logo-text">
          quick<span className="highlight">LINK</span>
        </span>
      </Link>

      <div className="navbar-links">
        {user ? (
          <>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive ? 'nav-link active' : 'nav-link'
              }
            >
              Dashboard
            </NavLink>

            <span className="navbar-user">Hi, <span className="user-highlight">{user.name}</span></span>

            <button
              type="button"
              className="btn btn-secondary nav-logout-btn"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive ? 'nav-link active' : 'nav-link'
              }
            >
              Log in
            </NavLink>

            <Link to="/register" className="btn btn-primary signup-btn">
              Sign up
            </Link>
          </>
        )}
      </div>

      <style>{`
        .navbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.85rem 2.5rem;
          background: linear-gradient(180deg, rgba(15, 21, 36, 0.85) 0%, rgba(11, 15, 25, 0.75) 100%);
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          position: sticky;
          top: 0;
          z-index: 100;
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.4);
        }

        /* Modern Aesthetic Logo Engine */
        .navbar-brand-wrapper {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          text-decoration: none !important;
          user-select: none;
        }

        .cool-logo-icon {
          position: relative;
          width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .logo-ring {
          position: absolute;
          border-radius: 50%;
          border: 2px solid transparent;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .ring-outer {
          width: 24px;
          height: 24px;
          border-color: rgba(255, 255, 255, 0.2);
          border-top-color: #22c55e;
          border-bottom-color: #22c55e;
          transform: rotate(-45deg);
        }

        .ring-inner {
          width: 14px;
          height: 14px;
          border-color: rgba(255, 255, 255, 0.1);
          border-left-color: #ffffff;
          border-right-color: #ffffff;
          transform: rotate(45deg);
        }

        .logo-bolt {
          position: absolute;
          width: 2px;
          height: 8px;
          background: #22c55e;
          transform: rotate(45deg);
          box-shadow: 0 0 8px #22c55e;
          transition: all 0.3s ease;
        }

        .logo-text {
          font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif;
          font-size: 1.35rem;
          font-weight: 600;
          color: #ffffff;
          letter-spacing: -0.8px;
          text-decoration: none !important;
        }

        .logo-text .highlight {
          font-weight: 800;
          color: #22c55e;
          letter-spacing: -0.3px;
          margin-left: 1px;
        }

        /* Animated Logo Hover Interactions */
        .navbar-brand-wrapper:hover .ring-outer {
          transform: rotate(135deg);
          border-top-color: #4ade80;
          border-bottom-color: #4ade80;
        }

        .navbar-brand-wrapper:hover .ring-inner {
          transform: rotate(-135deg);
        }

        .navbar-brand-wrapper:hover .logo-bolt {
          background: #ffffff;
          box-shadow: 0 0 12px #ffffff;
        }

        /* Nav Links Navigation Frame */
        .navbar-links {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .nav-link {
          color: #9ca3af;
          font-weight: 500;
          font-size: 0.9rem;
          padding: 0.5rem 0.85rem;
          border-radius: 8px;
          text-decoration: none !important;
          transition: all 0.2s ease;
        }

        .nav-link:hover {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.04);
          text-decoration: none !important;
        }

        .nav-link.active {
          color: #22c55e;
          background: rgba(34, 197, 94, 0.08);
          border: 1px solid rgba(34, 197, 94, 0.15);
          font-weight: 600;
          text-decoration: none !important;
        }

        /* Highlighted User Area */
        .navbar-user {
          color: #6b7280;
          font-size: 0.85rem;
          font-weight: 500;
          border-left: 1px solid rgba(255, 255, 255, 0.08);
          padding-left: 1.5rem;
        }

        .user-highlight {
          color: #ffffff;
          font-weight: 600;
        }

        /* CTA Aesthetic Button Layouts */
        .signup-btn {
          background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%) !important;
          color: #000000 !important;
          font-weight: 600;
          border: none;
          font-size: 0.9rem;
          padding: 0.55rem 1.25rem;
          border-radius: 8px;
          box-shadow: 0 4px 14px rgba(34, 197, 94, 0.2);
          transition: all 0.2s ease;
          text-decoration: none !important;
        }

        .signup-btn:hover {
          filter: brightness(1.1);
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(34, 197, 94, 0.35);
        }

        .nav-logout-btn {
          background: #1f2937 !important;
          border: 1px solid rgba(255, 255, 255, 0.05) !important;
          color: #d1d5db !important;
          font-size: 0.85rem;
          padding: 0.5rem 1.1rem;
          border-radius: 8px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .nav-logout-btn:hover {
          background: #2d3748 !important;
          border-color: rgba(255, 255, 255, 0.15);
          color: #ffffff !important;
        }

        @media (max-width: 640px) {
          .navbar {
            padding: 1rem 1.5rem;
          }
          .navbar-links {
            gap: 0.75rem;
          }
          .navbar-user {
            display: none;
          }
        }
      `}</style>
    </nav>
  );
}

export default Navbar;