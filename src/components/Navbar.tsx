
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
import logo from '../../public/da.svg'
const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();
  const [drawerOpen, setDrawerOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const closeDrawer = () => {
    setDrawerOpen(false);
  };

  const menuLinks = [
    { path: '/home', label: 'Home' },
    { path: '/packages', label: 'Packages' },
    { path: '/services', label: 'Services' },
    { path: '/about', label: 'About' },
  ];

  return (
    <header className={`fixed w-full z-40 transition-all duration-300 ${
      scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo - Always visible on both mobile and desktop */}
          <Link to="/home" className="flex items-center">
          <div className='w-14 mr-3 bg-white p-3 rounded-full'>
          <img src={logo} className='' alt="" />
          </div>
            <h1 className={`text-xl sm:text-2xl font-bold font-playfair ${
              scrolled ? 'text-raaz-dark' : 'text-white text-shadow'
            }`}>
              <span className={scrolled ? 'blue-gradient' : 'text-white'}>RAAZ</span> Holidays
            </h1>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {menuLinks.map(link => (
              <Link 
                key={link.path}
                to={link.path} 
                className={`font-medium transition-colors ${
                  location.pathname === link.path ? 'text-raaz' : scrolled ? 'text-deepblue hover:text-raaz' : 'text-white hover:text-raaz'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          
          {/* Mobile Controls */}
          <div className="md:hidden flex items-center gap-3">
            {/* Mobile Menu using Drawer */}
            <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
              <DrawerTrigger asChild>
                <button 
                  className={`flex items-center justify-center rounded-full w-10 h-10 transition-colors ${
                    scrolled ? 'bg-white' : 'bg-white'
                  }`}
                  aria-label="Toggle Menu"
                >
                  <Menu size={20} className="text-raaz" />
                </button>
              </DrawerTrigger>
              <DrawerOverlay className="bg-black/60" />
              <DrawerContent className="h-full w-3/4 max-w-sm right-0 left-auto rounded-l-xl shadow-xl p-0 bg-white border-l-2 border-gold">
                <div className="flex flex-col h-full">
                  <div className="flex justify-between items-center p-4 border-b border-gray-100">
                    <span className="text-xl font-bold font-playfair">
                      <span className="blue-gradient">RAAZ</span> Holidays
                    </span>
                    <DrawerClose className="p-1 rounded-full hover:bg-gray-100">
                      <X size={24} className="text-deepblue" />
                    </DrawerClose>
                  </div>
                  
                  <nav className="flex flex-col p-4 space-y-2">
                    {menuLinks.map(link => (
                      <DrawerClose asChild key={link.path}>
                        <Link 
                          to={link.path}
                          onClick={closeDrawer}
                          className={`py-3 px-4 text-lg font-medium rounded-md transition-all duration-200 ${
                            location.pathname === link.path 
                              ? 'bg-gold/10 text-raaz' 
                              : 'text-deepblue hover:bg-gold/5 hover:text-raaz hover:pl-5'
                          }`}
                        >
                          {link.label}
                        </Link>
                      </DrawerClose>
                    ))}
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
