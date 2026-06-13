import { useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { signInWithGoogle } from '../services/firebase.js';
import api from '../services/api.js';

function Login() {
  const { user, login, loading: authLoading, setUser } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleAuth = async () => {
    setError('');
    setSubmitting(true);
    try {
      const idToken = await signInWithGoogle();
      const { data } = await api.post('/auth/google', { idToken });
      localStorage.setItem('token', data.token);
      setUser({ _id: data._id, name: data.name, email: data.email });
      navigate('/dashboard');
    } catch (err) {
      setError('Google sign-in failed');
    } finally {
      setSubmitting(false);
    }
  };

  if (authLoading) return <p>Loading...</p>;
  if (user) return <Navigate to="/dashboard" replace />;

  return (
    <section className="auth-page">
      <div className="auth-card card">
        <h1 className="page-title">Log in</h1>
        <p className="page-subtitle">Welcome back to QuickLink</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>
          {error && <p className="error">{error}</p>}
          <button type="submit" className="btn btn-primary auth-submit" disabled={submitting}>
            {submitting ? 'Logging in...' : 'Log in'}
          </button>
        </form>
        <div className="divider">or</div>
        <button
          className="btn btn-google"
          onClick={handleGoogleAuth}
          disabled={submitting}
        >
          <img src="https://www.google.com/favicon.ico" width="18" height="18" />
          Continue with Google
        </button>
        <p className="auth-footer">
          Don&apos;t have an account? <Link to="/register">Sign up</Link>
        </p>
      </div>
      <style>{`
        .auth-page {
          display: flex;
          justify-content: center;
          align-items: flex-start;
          padding-top: 2rem;
        }
        .auth-card { width: 100%; max-width: 420px; }
        .auth-submit { width: 100%; margin-top: 0.5rem; }
        .auth-footer {
          margin-top: 1.5rem;
          text-align: center;
          color: var(--text-muted);
          font-size: 0.95rem;
        }
        .btn-google {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          background: white;
          border: 1px solid var(--border);
          color: var(--text);
          padding: 0.6rem 1rem;
          border-radius: 8px;
          cursor: pointer;
          font-size: 0.95rem;
          margin-top: 0.5rem;
        }
        .btn-google:hover { background: var(--bg-secondary); }
        .divider {
          text-align: center;
          color: var(--text-muted);
          font-size: 0.85rem;
          margin: 1rem 0 0.5rem;
          position: relative;
        }
        .divider::before, .divider::after {
          content: '';
          position: absolute;
          top: 50%;
          width: 42%;
          height: 1px;
          background: var(--border);
        }
        .divider::before { left: 0; }
        .divider::after { right: 0; }
      `}</style>
    </section>
  );
}

export default Login;