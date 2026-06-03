import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiAward, FiGlobe, FiMap, FiShield, FiStar, FiUsers } from 'react-icons/fi';
import axiosInstance from '../api/axiosInstance';
import PackageCard from '../components/PackageCard';
import SectionHeader from '../components/SectionHeader';

const Home = () => {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    const loadFeatured = async () => {
      try {
        const res = await axiosInstance.get('/packages?featured=true');
        setPackages(res.data.packages.slice(0, 3));
      } catch (error) {
        setPackages([]);
      }
    };
    loadFeatured();
  }, []);

  return (
    <main>
      <section className="relative overflow-hidden bg-slate-950 py-20 text-white lg:py-28">
        <div className="absolute inset-0 opacity-30">
          <img
            src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2000&auto=format&fit=crop"
            alt="Travel Bud hero"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-950/40" />
        <div className="container-custom relative grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold text-teal-100 backdrop-blur">
              <FiStar className="text-amber-300" /> Trusted travel management platform
            </div>
            <h1 className="max-w-4xl text-5xl font-black leading-tight tracking-tight sm:text-6xl lg:text-7xl">
              Plan, book, and manage trips with Travel Bud.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              A professional MERN travel management system with packages, customer bookings, secure login, and admin dashboard.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/packages" className="btn-primary bg-teal-500 hover:bg-teal-400">
                Explore Packages <FiArrowRight className="ml-2" />
              </Link>
              <Link to="/register" className="btn-outline border-white/20 bg-white/10 text-white hover:bg-white hover:text-slate-950">
                Create Account
              </Link>
            </div>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-white/10 p-4 shadow-soft backdrop-blur-xl">
            <img
              src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop"
              alt="Beach"
              className="h-[430px] w-full rounded-[1.5rem] object-cover"
            />
            <div className="mt-4 grid grid-cols-3 gap-3 text-center">
              <div className="rounded-2xl bg-white/10 p-4">
                <p className="text-2xl font-black">40+</p>
                <p className="text-xs text-slate-300">Tours</p>
              </div>
              <div className="rounded-2xl bg-white/10 p-4">
                <p className="text-2xl font-black">18+</p>
                <p className="text-xs text-slate-300">Countries</p>
              </div>
              <div className="rounded-2xl bg-white/10 p-4">
                <p className="text-2xl font-black">4.8</p>
                <p className="text-xs text-slate-300">Rating</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container-custom">
          <div className="grid gap-6 md:grid-cols-4">
            {[
              { icon: <FiGlobe />, title: 'Global Trips', text: 'Curated travel packages' },
              { icon: <FiShield />, title: 'Secure Booking', text: 'JWT protected booking flow' },
              { icon: <FiUsers />, title: 'Customer Panel', text: 'Track booking status' },
              { icon: <FiAward />, title: 'Admin Dashboard', text: 'Manage tours and bookings' }
            ].map((item) => (
              <div key={item.title} className="card p-6">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-50 text-2xl text-teal-600">{item.icon}</div>
                <h3 className="text-lg font-black text-slate-950">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="container-custom">
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeader
              eyebrow="Featured Tours"
              title="Popular travel packages"
              description="Choose from professionally designed travel packages and book directly from the platform."
            />
            <Link to="/packages" className="btn-outline w-fit">View All Packages</Link>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {packages.map((item) => <PackageCard key={item._id} item={item} />)}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container-custom">
          <div className="grid items-center gap-10 rounded-[2rem] bg-slate-950 p-8 text-white lg:grid-cols-2 lg:p-14">
            <div>
              <div>
                <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-teal-300">Why Travel Bud</p>
                <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">Everything managed from one clean dashboard</h2>
                <p className="mt-4 text-base leading-8 text-slate-300">Users can book trips and track status. Admin can add packages, manage listings, and update booking status.</p>
              </div>
              <Link to="/dashboard" className="btn-primary mt-8 bg-teal-500 hover:bg-teal-400">Open Dashboard</Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {['Package CRUD', 'Booking Tracking', 'Secure Auth', 'Responsive UI'].map((text) => (
                <div key={text} className="rounded-3xl border border-white/10 bg-white/10 p-6 text-center font-bold backdrop-blur">
                  <FiMap className="mx-auto mb-3 text-3xl text-teal-300" /> {text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
