import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { FiTrash2 } from 'react-icons/fi';
import axiosInstance from '../api/axiosInstance';
import Loading from '../components/Loading';

const ManagePackages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadPackages = async () => {
    try {
      const res = await axiosInstance.get('/packages');
      setPackages(res.data.packages);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to load packages');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPackages();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this package?');
    if (!confirmDelete) return;

    try {
      await axiosInstance.delete(`/packages/${id}`);
      toast.success('Package deleted');
      loadPackages();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Delete failed');
    }
  };

  if (loading) return <Loading />;

  return (
    <div>
      <h1 className="mb-6 text-3xl font-black text-slate-950">Manage Packages</h1>
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-slate-100 text-slate-600">
              <tr>
                <th className="px-5 py-4">Package</th>
                <th className="px-5 py-4">Destination</th>
                <th className="px-5 py-4">Category</th>
                <th className="px-5 py-4">Price</th>
                <th className="px-5 py-4">Featured</th>
                <th className="px-5 py-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {packages.map((item) => (
                <tr key={item._id}>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <img src={item.image} alt={item.title} className="h-14 w-16 rounded-xl object-cover" />
                      <div>
                        <p className="font-bold text-slate-950">{item.title}</p>
                        <p className="text-xs text-slate-500">{item.duration}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-slate-600">{item.destination}, {item.country}</td>
                  <td className="px-5 py-4 text-slate-600">{item.category}</td>
                  <td className="px-5 py-4 font-bold text-slate-950">${item.price}</td>
                  <td className="px-5 py-4 text-slate-600">{item.isFeatured ? 'Yes' : 'No'}</td>
                  <td className="px-5 py-4">
                    <button onClick={() => handleDelete(item._id)} className="rounded-xl bg-rose-50 p-3 text-rose-600 hover:bg-rose-100">
                      <FiTrash2 />
                    </button>
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

export default ManagePackages;
