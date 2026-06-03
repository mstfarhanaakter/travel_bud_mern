import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FiLock, FiMail, FiPhone, FiUser } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { registerUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await registerUser(formData);
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-[calc(100vh-80px)] bg-slate-50 py-16">
      <div className="container-custom grid items-center gap-10 lg:grid-cols-2">
        <div className="order-2 lg:order-1">
          <form onSubmit={handleSubmit} className="card mx-auto w-full max-w-md p-8">
            <h2 className="text-3xl font-black text-slate-950">Create Account</h2>
            <p className="mt-2 text-sm text-slate-500">Register as a traveler and start booking.</p>
            <div className="mt-8 space-y-5">
              <div>
                <label className="label">Full Name</label>
                <div className="relative"><FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" /><input className="input-field pl-11" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required /></div>
              </div>
              <div>
                <label className="label">Email</label>
                <div className="relative"><FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" /><input type="email" className="input-field pl-11" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required /></div>
              </div>
              <div>
                <label className="label">Phone</label>
                <div className="relative"><FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" /><input className="input-field pl-11" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} /></div>
              </div>
              <div>
                <label className="label">Password</label>
                <div className="relative"><FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" /><input type="password" className="input-field pl-11" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} required minLength="6" /></div>
              </div>
              <button disabled={loading} className="btn-primary w-full rounded-2xl">{loading ? 'Creating...' : 'Create Account'}</button>
            </div>
            <p className="mt-6 text-center text-sm text-slate-500">Already registered? <Link to="/login" className="font-bold text-teal-600">Login</Link></p>
          </form>
        </div>
        <div className="order-1 lg:order-2">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-teal-600">Join Travel Bud</p>
          <h1 className="text-5xl font-black tracking-tight text-slate-950">Book curated travel packages from one platform.</h1>
          <p className="mt-5 max-w-xl leading-8 text-slate-600">This account gives you access to booking forms, personal booking history, and booking status tracking.</p>
        </div>
      </div>
    </main>
  );
};

export default Register;
