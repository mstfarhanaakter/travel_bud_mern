import { NavLink, Outlet } from 'react-router-dom';
import { FiBox, FiCalendar, FiGrid, FiHome, FiList, FiPlusCircle } from 'react-icons/fi';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';

const DashboardLayout = () => {
  const { user } = useAuth();

  const links = [
    { path: '/dashboard', label: 'Overview', icon: <FiHome />, end: true },
    { path: '/dashboard/my-bookings', label: 'My Bookings', icon: <FiCalendar /> }
  ];

  if (user?.role === 'admin') {
    links.push(
      { path: '/dashboard/add-package', label: 'Add Package', icon: <FiPlusCircle /> },
      { path: '/dashboard/manage-packages', label: 'Manage Packages', icon: <FiBox /> },
      { path: '/dashboard/all-bookings', label: 'All Bookings', icon: <FiList /> }
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="container-custom py-8">
        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
          <aside className="card h-fit p-4">
            <div className="mb-5 rounded-3xl bg-slate-950 p-5 text-white">
              <p className="text-sm text-slate-300">Welcome back</p>
              <h2 className="mt-1 text-xl font-black">{user?.name}</h2>
              <p className="mt-2 inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-bold capitalize text-teal-200">
                {user?.role}
              </p>
            </div>
            <div className="space-y-2">
              {links.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  end={link.end}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold transition ${
                      isActive ? 'bg-teal-500 text-white' : 'text-slate-700 hover:bg-slate-100'
                    }`
                  }
                >
                  {link.icon} {link.label}
                </NavLink>
              ))}
            </div>
          </aside>
          <main>
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
