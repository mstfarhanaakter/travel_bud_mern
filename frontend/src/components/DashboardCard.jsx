const DashboardCard = ({ icon, title, value, text }) => {
  return (
    <div className="card p-6">
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-50 text-2xl text-teal-600">
        {icon}
      </div>
      <p className="text-sm font-semibold text-slate-500">{title}</p>
      <h3 className="mt-2 text-3xl font-black text-slate-950">{value}</h3>
      <p className="mt-2 text-sm text-slate-500">{text}</p>
    </div>
  );
};

export default DashboardCard;
