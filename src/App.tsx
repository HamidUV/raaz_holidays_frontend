import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Packages from "./pages/Packages";
import Services from "./pages/Services";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Loader from "./components/Loader";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminLayout from "./pages/admin/AdminLayout";
import HajjUmrahPackages from "./pages/admin/HajjUmrahPackages";
import AddHajjUmrahPackage from "./pages/admin/AddHajjUmrahPackage";
import TravelMemories from "./pages/admin/TravelMemories";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import { AdminProvider } from "./context/AdminContext";
// import Testimonials from "./pages/admin/Testimonials";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Loader />
      <Toaster />
      <Sonner />
      <AdminProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<Index />} />
            <Route path="/packages" element={<Packages />} />
            <Route path="/services" element={<Services />} />
            <Route path="/about" element={<About />} />
            
            {/* Admin Routes */}
            <Route path="/raaz_admin" element={<AdminLogin />} />
            <Route path="/raaz_admin/dashboard" element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }>
              <Route index element={<AdminDashboard />} />
            </Route>
            <Route path="/raaz_admin/packages" element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }>
              <Route index element={<AdminDashboard section="packages" />} />
            </Route>
            <Route path="/raaz_admin/upcoming" element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }>
              <Route index element={<AdminDashboard section="upcoming" />} />
            </Route>
            <Route path="/raaz_admin/banners" element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }>
              <Route index element={<AdminDashboard section="banners" />} />
            </Route>
            
            {/* Hajj & Umrah Admin Routes */}
            <Route path="/raaz_admin/hajj-umrah" element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }>
              <Route index element={<HajjUmrahPackages />} />
            </Route>
            <Route path="/raaz_admin/hajj-umrah/add" element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }>
              <Route index element={<AddHajjUmrahPackage />} />
            </Route>
            
            {/* Travel Memories Admin Routes */}
            <Route path="/raaz_admin/travel-memories" element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }>
              <Route index element={<TravelMemories />} />
            </Route>
            
            {/* Testimonials Admin Routes */}
            {/* <Route path="/raaz_admin/testimonials" element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }>
              <Route index element={<Testimonials />} />
            </Route> */}
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AdminProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
