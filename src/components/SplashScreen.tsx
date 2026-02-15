
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SplashScreen: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const navigate = useNavigate();
  
  const handleEnterSite = () => {
    setIsVisible(false);
    setTimeout(() => {
      navigate('/home');
    }, 500); // Delay to allow animation to complete
  };

  useEffect(() => {
    // Check if we've seen the splash screen this session
    const hasSeenSplash = sessionStorage.getItem('hasSeenSplash');
    if (hasSeenSplash) {
      navigate('/home');
    } else {
      sessionStorage.setItem('hasSeenSplash', 'true');
    }
  }, [navigate]);

  return (
    <div 
      className={`fixed inset-0 flex flex-col items-center justify-center bg-deepblue transition-opacity duration-500 z-50 ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="relative w-full h-full">
        {/* Full-screen background image */}
        <div 
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: `url(https://images.unsplash.com/photo-1466442929976-97f336a657be?q=80&w=2071)` }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center animate-fade-in font-playfair text-shadow">
            <span className="blue-gradient">RAAZ</span> Holidays
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-center max-w-lg mx-auto animate-fade-in opacity-0" style={{ animationDelay: '0.3s' }}>
            Your Journey to Spiritual and Scenic Experiences
          </p>
          
          <button
            onClick={handleEnterSite}
            className="bg-transparent border-2 border-gold px-8 py-3 rounded-md text-raaz hover:bg-gold hover:text-white transition-all duration-300 animate-fade-in opacity-0 font-medium"
            style={{ animationDelay: '0.6s' }}
          >
            Enter Site
          </button>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
