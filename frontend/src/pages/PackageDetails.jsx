import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FiCalendar, FiCheckCircle, FiClock, FiMapPin, FiStar, FiUsers } from 'react-icons/fi';
import axiosInstance from '../api/axiosInstance';
import Loading from '../components/Loading';
import { useAuth } from '../context/AuthContext';

const PackageDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState({
    travelerName: '',
    travelerEmail: '',
    phone: '',
    travelDate: '',
    travelers: 1,
    note: ''
  });

  useEffect(() => {
    const loadDetails = async () => {
      try {
        const res = await axiosInstance.get(`/packages/${id}`);
        setItem(res.data.package);
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to load package');
      } finally {
        setLoading(false);
      }
    };
    loadDetails();
  }, [id]);

  useEffect(() => {
    if (user) {
      setBooking((prev) => ({ ...prev, travelerName: user.name || '', travelerEmail: user.email || '', phone: user.phone || '' }));
    }
  }, [user]);

  const handleBook = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.info('Please login to book this package');
      navigate('/login');
      return;
    }

    try {
      await axiosInstance.post('/bookings', { ...booking, packageId: item._id, travelers: Number(booking.travelers) });
      toast.success('Booking request submitted');
      navigate('/dashboard/my-bookings');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Booking failed');
    }
  };

  if (loading) return <Loading />;
  if (!item) return <div className="container-custom py-20">Package not found</div>;

  return (
    <main className="py-12">
      <div className="container-custom">
        <div className="grid gap-8 lg:grid-cols-[1fr_420px]">
          <div>
            <div className="overflow-hidden rounded-[2rem] bg-white shadow-soft">
              <img src={item.image} alt={item.title} className="h-[480px] w-full object-cover" />
            </div>
            <div className="mt-8 card p-8">
              <div className="mb-4 flex flex-wrap gap-3">
                <span className="rounded-full bg-teal-50 px-4 py-2 text-sm font-bold text-teal-700">{item.category}</span>
                <span className="flex items-center gap-2 rounded-full bg-amber-50 px-4 py-2 text-sm font-bold text-amber-700"><FiStar /> {item.rating}</span>
              </div>
              <h1 className="text-4xl font-black tracking-tight text-slate-950">{item.title}</h1>
              <p className="mt-4 flex items-center gap-2 text-lg font-semibold text-teal-600">
                <FiMapPin /> {item.destination}, {item.country}
              </p>
              <p className="mt-6 leading-8 text-slate-600">{item.description}</p>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <div className="rounded-3xl bg-slate-50 p-5"><FiClock className="mb-2 text-2xl text-teal-600" /><p className="font-bold">{item.duration}</p><p className="text-sm text-slate-500">Duration</p></div>
                <div className="rounded-3xl bg-slate-50 p-5"><FiUsers className="mb-2 text-2xl text-teal-600" /><p className="font-bold">{item.groupSize} people</p><p className="text-sm text-slate-500">Group Size</p></div>
                <div className="rounded-3xl bg-slate-50 p-5"><FiCalendar className="mb-2 text-2xl text-teal-600" /><p className="font-bold">Flexible</p><p className="text-sm text-slate-500">Travel Date</p></div>
              </div>

              <div className="mt-8 grid gap-8 md:grid-cols-2">
                <div>
                  <h3 className="text-xl font-black text-slate-950">Highlights</h3>
                  <div className="mt-4 space-y-3">
                    {item.highlights?.map((text) => <p key={text} className="flex gap-2 text-slate-600"><FiCheckCircle className="mt-1 text-teal-600" /> {text}</p>)}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-950">Included</h3>
                  <div className="mt-4 space-y-3">
                    {item.included?.map((text) => <p key={text} className="flex gap-2 text-slate-600"><FiCheckCircle className="mt-1 text-teal-600" /> {text}</p>)}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <aside className="card h-fit p-6 lg:sticky lg:top-28">
            <div className="mb-6 rounded-3xl bg-slate-950 p-6 text-white">
              <p className="text-sm text-slate-300">Starting from</p>
              <h2 className="mt-2 text-4xl font-black">${item.price}</h2>
              <p className="mt-2 text-sm text-slate-400">Per person</p>
            </div>
            <h3 className="mb-5 text-2xl font-black text-slate-950">Book this package</h3>
            <form onSubmit={handleBook} className="space-y-4">
              <div>
                <label className="label">Traveler Name</label>
                <input className="input-field" value={booking.travelerName} onChange={(e) => setBooking({ ...booking, travelerName: e.target.value })} required />
              </div>
              <div>
                <label className="label">Email</label>
                <input type="email" className="input-field" value={booking.travelerEmail} onChange={(e) => setBooking({ ...booking, travelerEmail: e.target.value })} required />
              </div>
              <div>
                <label className="label">Phone</label>
                <input className="input-field" value={booking.phone} onChange={(e) => setBooking({ ...booking, phone: e.target.value })} required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">Travel Date</label>
                  <input type="date" className="input-field" value={booking.travelDate} onChange={(e) => setBooking({ ...booking, travelDate: e.target.value })} required />
                </div>
                <div>
                  <label className="label">Travelers</label>
                  <input type="number" min="1" className="input-field" value={booking.travelers} onChange={(e) => setBooking({ ...booking, travelers: e.target.value })} required />
                </div>
              </div>
              <div>
                <label className="label">Note</label>
                <textarea className="input-field min-h-24" value={booking.note} onChange={(e) => setBooking({ ...booking, note: e.target.value })} placeholder="Any special request?" />
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="flex justify-between text-sm"><span>Total</span><strong>${item.price * Number(booking.travelers || 1)}</strong></p>
              </div>
              <button className="btn-primary w-full rounded-2xl">Confirm Booking</button>
              {!user && <p className="text-center text-sm text-slate-500">Already have an account? <Link to="/login" className="font-bold text-teal-600">Login</Link></p>}
            </form>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default PackageDetails;
