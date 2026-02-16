import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  Drawer, 
  DrawerClose, 
  DrawerContent, 
  DrawerOverlay, 
  DrawerTrigger 
} from '@/components/ui/drawer';
import logo from '../../public/da.svg';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
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
        ? 'bg-white/95 backdrop-blur-md shadow-lg py-2' 
        : 'bg-transparent py-5'
    }`}>
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center">
          
          {/* Logo Section */}
          <Link to="/home" className="flex items-center group">
            <div className={`w-12 h-12 mr-3 p-2 rounded-full transition-all duration-300 flex items-center justify-center ${
              scrolled ? 'bg-raaz/10' : 'bg-white'
            }`}>
              <img src={logo} className="w-full h-full object-contain" alt="RAAZ Logo" />
            </div>
            <h1 className={`text-xl sm:text-2xl font-bold font-playfair tracking-wide transition-colors duration-300 ${
              scrolled ? 'text-raaz-dark' : 'text-white text-shadow-lg'
            }`}>
              <span className={scrolled ? 'text-raaz' : 'text-white'}>RAAZ</span> Holidays
            </h1>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-10">
            {menuLinks.map(link => {
              const isActive = location.pathname === link.path;
              return (
                <Link 
                  key={link.path}
                  to={link.path} 
                  className={`relative font-medium transition-all duration-300 py-1 group ${
                    isActive 
                      ? (scrolled ? 'text-raaz' : 'text-white') 
                      : (scrolled ? 'text-deepblue hover:text-raaz' : 'text-white/90 hover:text-white')
                  }`}
                >
                  {link.label}
                  {/* Underline Logic */}
                  <span className={`absolute bottom-0 left-0 w-full h-0.5 transform origin-left transition-transform duration-300 ${
                    scrolled ? 'bg-raaz' : 'bg-white'
                  } ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
                </Link>
              );
            })}
          </nav>
          
          {/* Mobile Controls */}
          <div className="md:hidden flex items-center">
            <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
              <DrawerTrigger asChild>
                <button 
                  className={`flex items-center justify-center rounded-xl w-11 h-11 transition-all shadow-sm ${
                    scrolled ? 'bg-raaz text-white' : 'bg-white text-raaz'
                  }`}
                  aria-label="Toggle Menu"
                >
                  <Menu size={24} />
                </button>
              </DrawerTrigger>
              <DrawerOverlay className="bg-black/40 backdrop-blur-sm" />
              <DrawerContent className="h-full w-[280px] right-0 left-auto rounded-l-3xl shadow-2xl p-0 bg-white border-l border-gold/20">
                <div className="flex flex-col h-full">
                  <div className="flex justify-between items-center p-6 border-b border-gray-50">
                    <span className="text-xl font-bold font-playfair">
                      <span className="text-raaz">RAAZ</span> Holidays
                    </span>
                    <DrawerClose className="p-2 rounded-full hover:bg-gray-100 text-deepblue transition-colors">
                      <X size={20} />
                    </DrawerClose>
                  </div>
                  
                  <nav className="flex flex-col p-6 space-y-4">
                    {menuLinks.map(link => {
                      const isActive = location.pathname === link.path;
                      return (
                        <DrawerClose asChild key={link.path}>
                          <Link 
                            to={link.path}
                            onClick={closeDrawer}
                            className={`py-3 px-4 text-lg font-medium rounded-xl transition-all duration-300 flex items-center justify-between ${
                              isActive 
                                ? 'bg-raaz/10 text-raaz translate-x-2' 
                                : 'text-deepblue hover:bg-gray-50'
                            }`}
                          >
                            {link.label}
                            {isActive && <div className="w-1.5 h-1.5 rounded-full bg-raaz" />}
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