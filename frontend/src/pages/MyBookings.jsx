import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { FiCalendar, FiMapPin } from 'react-icons/fi';
import axiosInstance from '../api/axiosInstance';
import Loading from '../components/Loading';

const statusClass = {
  pending: 'bg-amber-50 text-amber-700',
  confirmed: 'bg-teal-50 text-teal-700',
  completed: 'bg-blue-50 text-blue-700',
  cancelled: 'bg-rose-50 text-rose-700'
};

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadBookings = async () => {
    try {
      const res = await axiosInstance.get('/bookings/my-bookings');
      setBookings(res.data.bookings);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const handleCancel = async (id) => {
    try {
      await axiosInstance.patch(`/bookings/${id}/cancel`);
      toast.success('Booking cancelled');
      loadBookings();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Cancel failed');
    }
  };

  if (loading) return <Loading />;

  return (
    <div>
      <h1 className="mb-6 text-3xl font-black text-slate-950">My Bookings</h1>
      <div className="space-y-5">
        {bookings.map((booking) => (
          <div key={booking._id} className="card overflow-hidden p-4 md:flex md:items-center md:gap-5">
            <img src={booking.packageImage} alt={booking.packageTitle} className="h-40 w-full rounded-2xl object-cover md:w-56" />
            <div className="mt-4 flex-1 md:mt-0">
              <div className="mb-2 flex flex-wrap items-center gap-3">
                <span className={`rounded-full px-3 py-1 text-xs font-bold capitalize ${statusClass[booking.status]}`}>{booking.status}</span>
                <span className="text-sm font-semibold text-slate-500">${booking.totalPrice}</span>
              </div>
              <h3 className="text-xl font-black text-slate-950">{booking.packageTitle}</h3>
              <p className="mt-2 flex items-center gap-2 text-sm text-slate-500"><FiMapPin /> {booking.destination}</p>
              <p className="mt-2 flex items-center gap-2 text-sm text-slate-500"><FiCalendar /> {new Date(booking.travelDate).toLocaleDateString()}</p>
              <p className="mt-2 text-sm text-slate-500">Travelers: {booking.travelers}</p>
            </div>
            {booking.status !== 'cancelled' && booking.status !== 'completed' && (
              <button onClick={() => handleCancel(booking._id)} className="btn-outline mt-4 border-rose-200 text-rose-600 hover:border-rose-500 hover:text-rose-700 md:mt-0">
                Cancel
              </button>
            )}
          </div>
        ))}
        {!bookings.length && <div className="card p-10 text-center text-slate-500">No bookings yet.</div>}
      </div>
    </div>
  );
};

export default MyBookings;
