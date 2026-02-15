
import React, { useEffect, useState } from 'react';
import { Plane, Map, Compass } from 'lucide-react';
import { motion } from 'framer-motion';
import logo from '../../public/da.svg'

const LoaderScreen: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Increase loading time to 5 seconds (from 3 seconds)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white">
      <div className="relative flex flex-col items-center">
        {/* <h1 className="text-3xl md:text-5xl font-bold mb-4 text-center animate-pulse font-playfair">
          <span className="blue-gradient">RAAZ</span> <span className="text-white">Holidays</span>
        </h1> */}
          <img className='w-[16rem]' src={logo} alt=""  />
        
        {/* Travel-related icons - WhatsApp icon removed */}
        <div className="flex justify-center mt-8 gap-6">
          <motion.div 
            className="text-raaz opacity-70"
            animate={{ y: [-5, 5, -5] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <Plane size={24} />
          </motion.div>
          
          <motion.div 
            className="text-raaz opacity-70"
            animate={{ rotate: [0, 20, 0, -20, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <Compass size={24} />
          </motion.div>
          
          <motion.div 
            className="text-raaz opacity-70"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <Map size={24} />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LoaderScreen;
