import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import DashboardLayout from '../layouts/DashboardLayout';
import PrivateRoute from './PrivateRoute';
import AdminRoute from './AdminRoute';
import Home from '../pages/Home';
import Packages from '../pages/Packages';
import PackageDetails from '../pages/PackageDetails';
import Login from '../pages/Login';
import Register from '../pages/Register';
import DashboardHome from '../pages/DashboardHome';
import MyBookings from '../pages/MyBookings';
import AddPackage from '../pages/AddPackage';
import ManagePackages from '../pages/ManagePackages';
import AllBookings from '../pages/AllBookings';
import NotFound from '../pages/NotFound';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: 'packages', element: <Packages /> },
      { path: 'packages/:id', element: <PackageDetails /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> }
    ]
  },
  {
    path: '/dashboard',
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <DashboardHome /> },
      { path: 'my-bookings', element: <MyBookings /> },
      {
        path: 'add-package',
        element: (
          <AdminRoute>
            <AddPackage />
          </AdminRoute>
        )
      },
      {
        path: 'manage-packages',
        element: (
          <AdminRoute>
            <ManagePackages />
          </AdminRoute>
        )
      },
      {
        path: 'all-bookings',
        element: (
          <AdminRoute>
            <AllBookings />
          </AdminRoute>
        )
      }
    ]
  },
  { path: '*', element: <NotFound /> }
]);

export default router;
