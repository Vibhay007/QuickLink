import { useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { signInWithGoogle } from '../services/firebase.js';
import api from '../services/api.js';

function Register() {
  const { user, register, loading: authLoading, setUser } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await register(name, email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
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

  if (authLoading) return <p style={{ color: '#9ca3af', textAlign: 'center', marginTop: '4rem' }}>Loading...</p>;
  if (user) return <Navigate to="/dashboard" replace />;

  return (
    <section className="auth-page">
      <div className="auth-card card">
        <h1 className="saas-title">Sign up</h1>
        <p className="saas-subtitle">Create your QuickLink account</p>
        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoComplete="name"
              placeholder="John Doe"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              placeholder="name@example.com"
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
              minLength={6}
              autoComplete="new-password"
              placeholder="••••••••"
            />
          </div>
          {error && <p className="error">{error}</p>}
          <button
            type="submit"
            className="btn btn-primary auth-submit"
            disabled={submitting}
          >
            {submitting ? 'Signing up...' : 'Sign up'}
          </button>
        </form>
        <div className="divider">or</div>
        <button
          className="btn-google"
          onClick={handleGoogleAuth}
          disabled={submitting}
        >
          <img src="https://www.google.com/favicon.ico" width="16" height="16" alt="Google" />
          Continue with Google
        </button>
        <p className="auth-footer">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
      <style>{`
        .auth-page {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: calc(100vh - 120px);
          padding: 1.5rem 1rem;
          background: transparent; /* Seamlessly flows into main background mesh */
        }
        .auth-card { 
          width: 100%; 
          max-width: 380px; /* Optimized layout width */
          background: #111726; /* Synchronized Saaspo card backing */
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 20px;
          padding: 2rem; /* Tightened internal padding for shorter height */
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        }
        .saas-title {
          font-size: 1.6rem;
          font-weight: 800;
          color: #ffffff;
          margin: 0 0 0.25rem 0;
          letter-spacing: -0.5px;
        }
        .saas-subtitle {
          font-size: 0.85rem;
          color: #6b7280;
          margin: 0 0 1.5rem 0;
        }
        .form-group {
          margin-bottom: 1rem; /* Reduced grouping margin */
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }
        .form-group label {
          color: #9ca3af;
          font-size: 0.8rem;
          font-weight: 600;
        }
        .form-group input {
          background: #0b0f19;
          border: 1px solid rgba(255, 255, 255, 0.06);
          color: #ffffff;
          padding: 0.65rem 0.9rem; /* Slimmer inputs */
          border-radius: 10px;
          font-size: 0.9rem;
          transition: all 0.2s ease;
          width: 100%;
          box-sizing: border-box;
        }
        .form-group input:focus {
          outline: none;
          border-color: rgba(34, 197, 94, 0.4);
          box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.1);
        }
        .form-group input::placeholder {
          color: #4b5563;
        }
        .error {
          color: #f43f5e;
          font-size: 0.8rem;
          margin: 0.5rem 0;
          font-weight: 500;
        }
        .auth-submit { 
          width: 100%; 
          background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%) !important;
          color: #000000 !important;
          border: none;
          padding: 0.7rem 1rem;
          border-radius: 10px;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          margin-top: 0.25rem;
          box-shadow: 0 4px 12px rgba(34, 197, 94, 0.2);
        }
        .auth-submit:hover:not(:disabled) { 
          filter: brightness(1.1);
          transform: translateY(-1px);
          box-shadow: 0 6px 16px rgba(34, 197, 94, 0.3);
        }
        .auth-submit:disabled {
          background: #1f2937 !important;
          color: #4b5563 !important;
          cursor: not-allowed;
          box-shadow: none;
        }
        .btn-google {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.65rem;
          background: #1f2937;
          border: 1px solid rgba(255, 255, 255, 0.05);
          color: #ffffff;
          padding: 0.65rem 1rem;
          border-radius: 10px;
          cursor: pointer;
          font-size: 0.9rem;
          font-weight: 600;
          transition: all 0.2s ease;
        }
        .btn-google:hover:not(:disabled) { 
          background: #2d3748; 
          border-color: rgba(255, 255, 255, 0.15);
        }
        .divider {
          text-align: center;
          color: #4b5563;
          font-size: 0.8rem;
          margin: 1rem 0;
          position: relative;
        }
        .divider::before, .divider::after {
          content: '';
          position: absolute;
          top: 50%;
          width: 38%;
          height: 1px;
          background: rgba(255, 255, 255, 0.05);
        }
        .divider::before { left: 0; }
        .divider::after { right: 0; }
        .auth-footer {
          margin-top: 1.5rem;
          text-align: center;
          color: #6b7280;
          font-size: 0.85rem;
        }
        .auth-footer a {
          color: #22c55e;
          text-decoration: none !important; /* Clean no-underline profile */
          font-weight: 600;
          margin-left: 0.25rem;
        }
        .auth-footer a:hover {
          color: #4ade80;
        }
      `}</style>
    </section>
  );
}

export default Register;