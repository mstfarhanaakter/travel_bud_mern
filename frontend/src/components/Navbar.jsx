import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FiMenu, FiX, FiMapPin, FiLogOut, FiUser } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/packages', label: 'Packages' },
  { path: '/dashboard', label: 'Dashboard' }
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user, logoutUser } = useAuth();

  const activeClass = ({ isActive }) =>
    isActive
      ? 'rounded-full bg-slate-950 px-4 py-2 text-white'
      : 'rounded-full px-4 py-2 text-slate-700 hover:bg-slate-100';

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
      <nav className="container-custom flex h-20 items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-xl text-white shadow-soft">
            <FiMapPin />
          </span>
          <div>
            <p className="text-xl font-black tracking-tight text-slate-950">Travel Bud</p>
            <p className="text-xs font-semibold text-teal-600">Explore smarter</p>
          </div>
        </Link>

        <div className="hidden items-center gap-2 lg:flex">
          {navLinks.map((item) => (
            <NavLink key={item.path} to={item.path} className={activeClass}>
              {item.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          {user ? (
            <>
              <div className="flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">
                <FiUser /> {user.name}
              </div>
              <button onClick={logoutUser} className="btn-outline !px-4">
                <FiLogOut className="mr-2" /> Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-outline">Login</Link>
              <Link to="/register" className="btn-primary">Get Started</Link>
            </>
          )}
        </div>

        <button onClick={() => setOpen(!open)} className="rounded-2xl border border-slate-200 p-3 text-xl lg:hidden">
          {open ? <FiX /> : <FiMenu />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-slate-200 bg-white px-4 py-4 lg:hidden">
          <div className="flex flex-col gap-2">
            {navLinks.map((item) => (
              <NavLink key={item.path} to={item.path} onClick={() => setOpen(false)} className={activeClass}>
                {item.label}
              </NavLink>
            ))}
            {user ? (
              <button onClick={() => { logoutUser(); setOpen(false); }} className="btn-outline mt-2">
                Logout
              </button>
            ) : (
              <div className="mt-2 grid grid-cols-2 gap-3">
                <Link to="/login" onClick={() => setOpen(false)} className="btn-outline">Login</Link>
                <Link to="/register" onClick={() => setOpen(false)} className="btn-primary">Register</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
