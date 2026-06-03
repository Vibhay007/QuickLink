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
      <Link to="/" className="navbar-brand">
        QuickLink
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

            <span className="navbar-user">Hi, {user.name}</span>

            <button
              type="button"
              className="btn btn-secondary"
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
   .signup-btn {
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

.signup-btn:hover {
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

.signup-btn:active {
  transform: translateY(0);
}
     .navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;

  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.95),
    rgba(253, 242, 248, 0.95),
    rgba(250, 232, 255, 0.95)
  );

  border-bottom: 1px solid rgba(236, 72, 153, 0.15);
  backdrop-filter: blur(16px);

  box-shadow: 0 4px 20px rgba(236, 72, 153, 0.08);
}

.navbar-brand {
  font-size: 1.5rem;
  font-weight: 800;
  text-decoration: none;

  background: linear-gradient(
    135deg,
    #ec4899,
    #c026d3,
    #8b5cf6
  );

  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  transition: transform 0.25s ease;
}

.navbar-brand:hover {
  transform: scale(1.03);
}

        .navbar-links {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .navbar-links a {
          text-decoration: none;
        }

        .nav-link {
          position: relative;
          color: var(--text-muted);
          font-weight: 500;
          padding: 0.5rem 0.85rem;
          border-radius: 10px;
          transition: all 0.25s ease;
        }

        .nav-link:hover {
          color: var(--primary);
          background: rgba(236, 72, 153, 0.08);
        }

        .nav-link.active {
          color: var(--primary);
          background: rgba(236, 72, 153, 0.12);
          font-weight: 600;
        }

        .nav-link.active::after {
          content: "";
          position: absolute;
          left: 15%;
          bottom: -4px;
          width: 70%;
          height: 3px;
          border-radius: 999px;
          background: linear-gradient(
            90deg,
            #ec4899,
            #c026d3
          );
        }

        .navbar-user {
          color: var(--text-muted);
          font-size: 0.9rem;
        }

        @media (max-width: 640px) {
          .navbar {
            padding: 1rem;
          }

          .navbar-links {
            gap: 0.5rem;
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