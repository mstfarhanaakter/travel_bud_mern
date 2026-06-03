import { FiMapPin, FiMail, FiPhone } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-slate-950 py-12 text-white">
      <div className="container-custom grid gap-8 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-teal-500 text-xl">
              <FiMapPin />
            </span>
            <div>
              <p className="text-xl font-black">Travel Bud</p>
              <p className="text-sm text-slate-400">Smart travel management</p>
            </div>
          </div>
          <p className="mt-4 text-sm leading-7 text-slate-400">
            A modern MERN travel booking platform for packages, customer bookings, and admin management.
          </p>
        </div>
        <div>
          <h3 className="font-bold">Contact</h3>
          <div className="mt-4 space-y-3 text-sm text-slate-400">
            <p className="flex items-center gap-2"><FiMail /> support@travelbud.com</p>
            <p className="flex items-center gap-2"><FiPhone /> +880 1000 000 000</p>
          </div>
        </div>
        <div>
          <h3 className="font-bold">System Features</h3>
          <p className="mt-4 text-sm leading-7 text-slate-400">
            Authentication, package CRUD, booking management, admin dashboard, user dashboard, toast alerts, responsive UI.
          </p>
        </div>
      </div>
      <div className="container-custom mt-10 border-t border-white/10 pt-6 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} Travel Bud. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
