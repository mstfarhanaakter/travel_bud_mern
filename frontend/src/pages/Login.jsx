import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FiLock, FiMail } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { loginUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/dashboard';

 const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    await loginUser(formData);
    toast.success("Login successful");
    navigate(from, { replace: true });
  } catch (error) {
    toast.error(error.response?.data?.message || "Login failed");
  } finally {
    setLoading(false);
  }
};

  return (
    <main className="min-h-[calc(100vh-80px)] bg-slate-50 py-16">
      <div className="container-custom grid items-center gap-10 lg:grid-cols-2">
        <div>
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-teal-600">Welcome back</p>
          <h1 className="text-5xl font-black tracking-tight text-slate-950">Login to manage your trips.</h1>
          <p className="mt-5 max-w-xl leading-8 text-slate-600">
            Use your Travel Bud account to book packages, check booking status, and manage your travel dashboard.
          </p>
          <div className="mt-6 rounded-3xl bg-white p-5 text-sm text-slate-600 shadow-sm">
            <p><strong>Demo Admin:</strong> admin@travelbud.com / admin123</p>
            <p className="mt-2"><strong>Demo User:</strong> user@travelbud.com / user123</p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="card mx-auto w-full max-w-md p-8">
          <h2 className="text-3xl font-black text-slate-950">Login</h2>
          <p className="mt-2 text-sm text-slate-500">Enter your account details below.</p>
          <div className="mt-8 space-y-5">
            <div>
              <label className="label">Email Address</label>
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input type="email" className="input-field pl-11" placeholder="you@example.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
              </div>
            </div>
            <div>
              <label className="label">Password</label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input type="password" className="input-field pl-11" placeholder="******" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} required />
              </div>
            </div>
            <button disabled={loading} className="btn-primary w-full rounded-2xl">
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </div>
          <p className="mt-6 text-center text-sm text-slate-500">
            New to Travel Bud? <Link to="/register" className="font-bold text-teal-600">Create account</Link>
          </p>
        </form>
      </div>
    </main>
  );
};

export default Login;
