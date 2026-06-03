const Loading = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50">
      <div className="text-center">
        <div className="mx-auto h-14 w-14 animate-spin rounded-full border-4 border-slate-200 border-t-teal-500" />
        <p className="mt-4 text-sm font-semibold text-slate-600">Loading Travel Bud...</p>
      </div>
    </div>
  );
};

export default Loading;
