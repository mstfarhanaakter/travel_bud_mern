import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axiosInstance from '../api/axiosInstance';
import Loading from '../components/Loading';

const statuses = ['pending', 'confirmed', 'completed', 'cancelled'];

const AllBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadBookings = async () => {
    try {
      const res = await axiosInstance.get('/bookings/all');
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

  const handleStatus = async (id, status) => {
    try {
      await axiosInstance.patch(`/bookings/${id}/status`, { status });
      toast.success('Booking status updated');
      loadBookings();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Status update failed');
    }
  };

  if (loading) return <Loading />;

  return (
    <div>
      <h1 className="mb-6 text-3xl font-black text-slate-950">All Bookings</h1>
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="bg-slate-100 text-slate-600">
              <tr>
                <th className="px-5 py-4">Package</th>
                <th className="px-5 py-4">Traveler</th>
                <th className="px-5 py-4">Travel Date</th>
                <th className="px-5 py-4">Travelers</th>
                <th className="px-5 py-4">Total</th>
                <th className="px-5 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {bookings.map((booking) => (
                <tr key={booking._id}>
                  <td className="px-5 py-4">
                    <p className="font-bold text-slate-950">{booking.packageTitle}</p>
                    <p className="text-xs text-slate-500">{booking.destination}</p>
                  </td>
                  <td className="px-5 py-4">
                    <p className="font-bold text-slate-950">{booking.travelerName}</p>
                    <p className="text-xs text-slate-500">{booking.travelerEmail}</p>
                    <p className="text-xs text-slate-500">{booking.phone}</p>
                  </td>
                  <td className="px-5 py-4 text-slate-600">{new Date(booking.travelDate).toLocaleDateString()}</td>
                  <td className="px-5 py-4 text-slate-600">{booking.travelers}</td>
                  <td className="px-5 py-4 font-bold text-slate-950">${booking.totalPrice}</td>
                  <td className="px-5 py-4">
                    <select value={booking.status} onChange={(e) => handleStatus(booking._id, e.target.value)} className="input-field min-w-36 capitalize">
                      {statuses.map((status) => <option key={status} value={status}>{status}</option>)}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllBookings;
