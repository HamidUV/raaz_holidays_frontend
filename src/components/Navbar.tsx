import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { 
  Drawer, 
  DrawerClose, 
  DrawerContent, 
  DrawerOverlay, 
  DrawerTrigger 
} from '@/components/ui/drawer';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeDrawer = () => setDrawerOpen(false);

  const menuLinks = [
    { path: '/home', label: 'Home' },
    { path: '/packages', label: 'Packages' },
    { path: '/services', label: 'Services' },
    { path: '/about', label: 'About' },
  ];

  return (
    <header className={`fixed w-full z-40 transition-all duration-500 ease-in-out ${
      scrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg py-1' 
        : 'bg-transparent py-4'
    }`}>
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center">
          
          {/* Logo Section */}
          <Link to="/home" className="flex items-center group">
            <div className={`transition-all duration-500 ease-out flex items-center justify-center ${
              scrolled ? 'w-16 h-16' : 'w-28 h-28'
            }`}>
              <img 
                src="/logo.png" 
                alt="RAAZ Logo"
                className={`w-full h-full object-contain transition-all duration-500 group-hover:scale-110 ${
                  // When NOT scrolled (on dark hero), invert to white. 
                  // When scrolled (on white bg), keep original (black).
                  !scrolled ? 'brightness-0 invert' : ''
                }`} 
              />
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-12">
            {menuLinks.map(link => {
              const isActive = location.pathname === link.path;
              return (
                <Link 
                  key={link.path}
                  to={link.path} 
                  className={`relative font-semibold text-base transition-all duration-300 py-1 group ${
                    isActive 
                      ? (scrolled ? 'text-raaz' : 'text-white') 
                      : (scrolled ? 'text-deepblue hover:text-raaz' : 'text-white/90 hover:text-white')
                  }`}
                >
                  {link.label}
                  <span className={`absolute -bottom-1 left-0 h-0.5 transform origin-left transition-all duration-300 ${
                    scrolled ? 'bg-raaz' : 'bg-white'
                  } ${isActive ? 'w-full scale-x-100' : 'w-full scale-x-0 group-hover:scale-x-100'}`} />
                </Link>
              );
            })}
          </nav>
          
          {/* Mobile Controls */}
          <div className="md:hidden flex items-center">
            <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
              <DrawerTrigger asChild>
                <button 
                  className={`flex items-center justify-center rounded-xl w-12 h-12 transition-all shadow-md ${
                    scrolled ? 'bg-raaz text-white' : 'bg-white text-raaz'
                  }`}
                  aria-label="Toggle Menu"
                >
                  <Menu size={28} />
                </button>
              </DrawerTrigger>
              <DrawerOverlay className="bg-black/40 backdrop-blur-sm" />
              <DrawerContent className="h-full w-[300px] right-0 left-auto rounded-l-[2.5rem] shadow-2xl p-0 bg-white border-l border-gold/10">
                <div className="flex flex-col h-full">
                  
                  {/* Mobile Header - Logo remains original color on white drawer */}
                  <div className="flex flex-col items-center justify-center p-10 border-b border-gray-50 bg-gray-50 relative">
                    <div className="w-24 h-24">
                       <img src="/logo.png" className="w-full h-full object-contain" alt="RAAZ Logo" />
                    </div>
                    <DrawerClose className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-200 text-deepblue transition-colors">
                      <X size={24} />
                    </DrawerClose>
                  </div>
                  
                  <nav className="flex flex-col p-8 space-y-6">
                    {menuLinks.map(link => {
                      const isActive = location.pathname === link.path;
                      return (
                        <DrawerClose asChild key={link.path}>
                          <Link 
                            to={link.path}
                            onClick={closeDrawer}
                            className={`py-4 px-6 text-xl font-bold rounded-2xl transition-all duration-300 flex items-center justify-between ${
                              isActive 
                                ? 'bg-raaz text-white shadow-lg translate-x-2' 
                                : 'text-deepblue hover:bg-gray-100'
                            }`}
                          >
                            {link.label}
                            {isActive && <div className="w-2 h-2 rounded-full bg-white animate-pulse" />}
                          </Link>
                        </DrawerClose>
                      );
                    })}
                  </nav>
                </div>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;