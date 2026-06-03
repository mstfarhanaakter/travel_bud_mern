import { Link } from 'react-router-dom';
import { FiClock, FiMapPin, FiStar, FiUsers } from 'react-icons/fi';

const PackageCard = ({ item }) => {
  return (
    <article className="card group overflow-hidden transition hover:-translate-y-1 hover:shadow-soft">
      <div className="relative h-64 overflow-hidden">
        <img
          src={item.image}
          alt={item.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
        />
        <div className="absolute left-4 top-4 rounded-full bg-white/90 px-4 py-2 text-xs font-bold text-slate-900 backdrop-blur">
          {item.category}
        </div>
        <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-slate-950/80 px-3 py-2 text-xs font-bold text-white backdrop-blur">
          <FiStar className="text-amber-300" /> {item.rating}
        </div>
      </div>
      <div className="p-6">
        <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-teal-600">
          <FiMapPin /> {item.destination}, {item.country}
        </div>
        <h3 className="text-xl font-black text-slate-950">{item.title}</h3>
        <p className="mt-3 line-clamp-2 text-sm leading-7 text-slate-600">{item.description}</p>
        <div className="mt-5 grid grid-cols-2 gap-3 text-sm text-slate-600">
          <span className="flex items-center gap-2"><FiClock /> {item.duration}</span>
          <span className="flex items-center gap-2"><FiUsers /> {item.groupSize} people</span>
        </div>
        <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">From</p>
            <p className="text-2xl font-black text-slate-950">${item.price}</p>
          </div>
          <Link to={`/packages/${item._id}`} className="btn-primary !px-5 !py-2.5">
            View Details
          </Link>
        </div>
      </div>
    </article>
  );
};

export default PackageCard;
