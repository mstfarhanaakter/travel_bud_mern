import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <main className="container-custom flex min-h-[70vh] items-center justify-center py-16 text-center">
      <div>
        <p className="text-8xl font-black text-teal-500">404</p>
        <h1 className="mt-4 text-4xl font-black text-slate-950">Page not found</h1>
        <p className="mt-3 text-slate-500">The page you are looking for does not exist.</p>
        <Link to="/" className="btn-primary mt-8">Back Home</Link>
      </div>
    </main>
  );
};

export default NotFound;
