import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Outlet,
  useNavigate
} from 'react-router-dom';
import { useAdmin } from '@/context/AdminContext';
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import AdminDashboard from './AdminDashboard';
import HajjUmrahPackages from './HajjUmrahPackages';
import TravelMemories from './TravelMemories';
import BannerManagement from './BannerManagement';
// import Testimonials from './Testimonials';

const AdminLayout: React.FC = () => {
  const { isAuthenticated, logout } = useAdmin();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    navigate('/raaz_admin');
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/raaz_admin');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white flex flex-col">
        <div className="p-4">
          <Link to="/raaz_admin/dashboard" className="text-lg font-semibold">Admin Dashboard</Link>
        </div>
        <nav className="flex-1 p-4">
          <ul>
            <li className="mb-2">
              <Link to="/raaz_admin/dashboard" className="block hover:bg-gray-700 p-2 rounded">Dashboard</Link>
            </li>
            <li className="mb-2">
              <Link to="/raaz_admin/packages" className="block hover:bg-gray-700 p-2 rounded">Exclusive Packages</Link>
            </li>
            <li className="mb-2">
              <Link to="/raaz_admin/upcoming" className="block hover:bg-gray-700 p-2 rounded">Upcoming Packages</Link>
            </li>
            <li className="mb-2">
              <Link to="/raaz_admin/hajj-umrah" className="block hover:bg-gray-700 p-2 rounded">Hajj & Umrah Packages</Link>
            </li>
            <li className="mb-2">
              <Link to="/raaz_admin/travel-memories" className="block hover:bg-gray-700 p-2 rounded">Travel Memories</Link>
            </li>
            {/* <li className="mb-2">
              <Link to="/raaz_admin/testimonials" className="block hover:bg-gray-700 p-2 rounded">Testimonials</Link>
            </li> */}
            <li className="mb-2">
              <Link to="/raaz_admin/banners" className="block hover:bg-gray-700 p-2 rounded">Banners</Link>
            </li>
          </ul>
        </nav>
        <div className="p-4 border-t border-gray-700">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-full justify-start text-white gap-2">
                <Avatar className="mr-2 h-8 w-8">
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <span>My Account</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4">
        {/* The Routes here are relative to the parent route structure in App.tsx */}
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
