import { useEffect, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import axiosInstance from '../api/axiosInstance';
import PackageCard from '../components/PackageCard';
import SectionHeader from '../components/SectionHeader';
import Loading from '../components/Loading';

const categories = ['all', 'Adventure', 'Beach', 'City', 'Culture', 'Family', 'Honeymoon', 'Nature'];

const Packages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ search: '', category: 'all', sort: 'latest' });

  const loadPackages = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams(filters).toString();
      const res = await axiosInstance.get(`/packages?${params}`);
      setPackages(res.data.packages);
    } catch (error) {
      setPackages([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPackages();
  }, [filters.category, filters.sort]);

  const handleSubmit = (e) => {
    e.preventDefault();
    loadPackages();
  };

  if (loading) return <Loading />;

  return (
    <main className="py-16">
      <div className="container-custom">
        <SectionHeader
          center
          eyebrow="Travel Packages"
          title="Find your perfect destination"
          description="Search, filter, and sort travel packages. Then book your trip securely after login."
        />

        <form onSubmit={handleSubmit} className="card mt-10 grid gap-4 p-4 md:grid-cols-[1fr_180px_180px_120px]">
          <div className="relative">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              className="input-field pl-11"
              placeholder="Search by destination or package name"
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            />
          </div>
          <select className="input-field" value={filters.category} onChange={(e) => setFilters({ ...filters, category: e.target.value })}>
            {categories.map((cat) => <option key={cat} value={cat}>{cat === 'all' ? 'All Categories' : cat}</option>)}
          </select>
          <select className="input-field" value={filters.sort} onChange={(e) => setFilters({ ...filters, sort: e.target.value })}>
            <option value="latest">Latest</option>
            <option value="price-low">Price Low</option>
            <option value="price-high">Price High</option>
            <option value="rating">Top Rated</option>
          </select>
          <button className="btn-primary rounded-2xl">Search</button>
        </form>

        <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {packages.map((item) => <PackageCard key={item._id} item={item} />)}
        </div>

        {!packages.length && (
          <div className="card mt-10 p-10 text-center">
            <h3 className="text-2xl font-black text-slate-950">No packages found</h3>
            <p className="mt-2 text-slate-500">Try another search or category.</p>
          </div>
        )}
      </div>
    </main>
  );
};

export default Packages;
