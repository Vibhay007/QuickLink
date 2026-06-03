import { useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

function Register() {
  const { user, register, verifyOTP, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState('register'); // 'register' | 'verify'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await register(name, email, password);
      setStep('verify'); // move to OTP screen
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setSubmitting(false);
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await verifyOTP(email, otp);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Verification failed');
    } finally {
      setSubmitting(false);
    }
  };

  if (authLoading) return <p>Loading...</p>;
  if (user) return <Navigate to="/dashboard" replace />;

  return (
    <section className="auth-page">
      <div className="auth-card card">

        {step === 'register' ? (
          <>
            <h1 className="page-title">Sign up</h1>
            <p className="page-subtitle">Create your QuickLink account</p>
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
                />
              </div>
              {error && <p className="error">{error}</p>}
              <button
                type="submit"
                className="btn btn-primary auth-submit"
                disabled={submitting}
              >
                {submitting ? 'Sending OTP...' : 'Sign up'}
              </button>
            </form>
            <p className="auth-footer">
              Already have an account? <Link to="/login">Log in</Link>
            </p>
          </>
        ) : (
          <>
            <h1 className="page-title">Verify email</h1>
            <p className="page-subtitle">
              We sent a 6-digit code to <strong>{email}</strong>
            </p>
            <form onSubmit={handleVerify}>
              <div className="form-group">
                <label htmlFor="otp">Verification code</label>
                <input
                  id="otp"
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                  maxLength={6}
                  placeholder="Enter 6-digit code"
                  autoComplete="one-time-code"
                  style={{ letterSpacing: '0.3em', fontSize: '1.2rem' }}
                />
              </div>
              {error && <p className="error">{error}</p>}
              <button
                type="submit"
                className="btn btn-primary auth-submit"
                disabled={submitting || otp.length < 6}
              >
                {submitting ? 'Verifying...' : 'Verify email'}
              </button>
            </form>
            <p className="auth-footer">
              Wrong email?{' '}
              <span
                style={{ color: 'var(--primary)', cursor: 'pointer' }}
                onClick={() => { setStep('register'); setError(''); setOtp(''); }}
              >
                Go back
              </span>
            </p>
          </>
        )}

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
      `}</style>
    </section>
  );
}

export default Register;