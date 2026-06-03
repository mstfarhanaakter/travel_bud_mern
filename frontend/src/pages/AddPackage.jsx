import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axiosInstance from '../api/axiosInstance';

const initialState = {
  title: '',
  destination: '',
  country: '',
  price: '',
  duration: '',
  groupSize: '',
  category: 'Adventure',
  image: '',
  rating: '4.8',
  description: '',
  highlights: '',
  included: '',
  isFeatured: false
};

const AddPackage = () => {
  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...formData,
        price: Number(formData.price),
        groupSize: Number(formData.groupSize),
        rating: Number(formData.rating),
        highlights: formData.highlights.split(',').map((item) => item.trim()).filter(Boolean),
        included: formData.included.split(',').map((item) => item.trim()).filter(Boolean)
      };
      await axiosInstance.post('/packages', payload);
      toast.success('Package added successfully');
      setFormData(initialState);
      navigate('/dashboard/manage-packages');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add package');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="mb-6 text-3xl font-black text-slate-950">Add Travel Package</h1>
      <form onSubmit={handleSubmit} className="card grid gap-5 p-6 md:grid-cols-2">
        <div>
          <label className="label">Package Title</label>
          <input name="title" className="input-field" value={formData.title} onChange={handleChange} required />
        </div>
        <div>
          <label className="label">Destination</label>
          <input name="destination" className="input-field" value={formData.destination} onChange={handleChange} required />
        </div>
        <div>
          <label className="label">Country</label>
          <input name="country" className="input-field" value={formData.country} onChange={handleChange} required />
        </div>
        <div>
          <label className="label">Price</label>
          <input name="price" type="number" className="input-field" value={formData.price} onChange={handleChange} required />
        </div>
        <div>
          <label className="label">Duration</label>
          <input name="duration" className="input-field" placeholder="5 Days / 4 Nights" value={formData.duration} onChange={handleChange} required />
        </div>
        <div>
          <label className="label">Group Size</label>
          <input name="groupSize" type="number" className="input-field" value={formData.groupSize} onChange={handleChange} required />
        </div>
        <div>
          <label className="label">Category</label>
          <select name="category" className="input-field" value={formData.category} onChange={handleChange}>
            {['Adventure', 'Beach', 'City', 'Culture', 'Family', 'Honeymoon', 'Nature'].map((cat) => <option key={cat}>{cat}</option>)}
          </select>
        </div>
        <div>
          <label className="label">Rating</label>
          <input name="rating" type="number" step="0.1" min="1" max="5" className="input-field" value={formData.rating} onChange={handleChange} />
        </div>
        <div className="md:col-span-2">
          <label className="label">Image URL</label>
          <input name="image" className="input-field" placeholder="https://images.unsplash.com/..." value={formData.image} onChange={handleChange} required />
        </div>
        <div className="md:col-span-2">
          <label className="label">Description</label>
          <textarea name="description" className="input-field min-h-28" value={formData.description} onChange={handleChange} required />
        </div>
        <div>
          <label className="label">Highlights</label>
          <textarea name="highlights" className="input-field min-h-24" placeholder="Temple visit, Beach day, Local food" value={formData.highlights} onChange={handleChange} />
        </div>
        <div>
          <label className="label">Included</label>
          <textarea name="included" className="input-field min-h-24" placeholder="Hotel, Breakfast, Guide" value={formData.included} onChange={handleChange} />
        </div>
        <label className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4 text-sm font-bold text-slate-700 md:col-span-2">
          <input type="checkbox" name="isFeatured" checked={formData.isFeatured} onChange={handleChange} className="h-5 w-5 rounded border-slate-300" />
          Show this package on homepage featured section
        </label>
        <div className="md:col-span-2">
          <button disabled={loading} className="btn-primary rounded-2xl">{loading ? 'Saving...' : 'Add Package'}</button>
        </div>
      </form>
    </div>
  );
};

export default AddPackage;
