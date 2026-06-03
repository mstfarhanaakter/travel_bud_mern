import { useEffect, useState } from 'react';
import { FiBox, FiCalendar, FiCheckCircle, FiUser } from 'react-icons/fi';
import axiosInstance from '../api/axiosInstance';
import DashboardCard from '../components/DashboardCard';
import { useAuth } from '../context/AuthContext';

const DashboardHome = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({ packages: 0, bookings: 0, confirmed: 0 });

  useEffect(() => {
    const loadStats = async () => {
      try {
        const packageRes = await axiosInstance.get('/packages');
        const bookingRes = user?.role === 'admin'
          ? await axiosInstance.get('/bookings/all')
          : await axiosInstance.get('/bookings/my-bookings');
        const bookings = bookingRes.data.bookings || [];
        setStats({
          packages: packageRes.data.count || 0,
          bookings: bookings.length,
          confirmed: bookings.filter((item) => item.status === 'confirmed').length
        });
      } catch (error) {
        setStats({ packages: 0, bookings: 0, confirmed: 0 });
      }
    };
    loadStats();
  }, [user]);

  return (
    <div>
      <div className="mb-8 rounded-[2rem] bg-slate-950 p-8 text-white">
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-teal-300">Dashboard</p>
        <h1 className="mt-3 text-4xl font-black">Hello, {user?.name}</h1>
        <p className="mt-3 max-w-2xl text-slate-300">
          {user?.role === 'admin'
            ? 'Manage travel packages and customer bookings from this admin dashboard.'
            : 'Track your bookings, travel dates, and booking status from your personal dashboard.'}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <DashboardCard icon={<FiBox />} title="Total Packages" value={stats.packages} text="Available packages" />
        <DashboardCard icon={<FiCalendar />} title="Bookings" value={stats.bookings} text="Booking records" />
        <DashboardCard icon={<FiCheckCircle />} title="Confirmed" value={stats.confirmed} text="Confirmed bookings" />
      </div>

      <div className="card mt-8 p-6">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-50 text-2xl text-teal-600"><FiUser /></div>
          <div>
            <h3 className="text-xl font-black text-slate-950">Account Information</h3>
            <p className="mt-1 text-sm text-slate-500">{user?.email} • Role: {user?.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
