
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FloatingWhatsApp: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleWhatsAppClick = () => {
  const phoneNumber = "919745500598";
  
  // Professional message with a line break
  const message = "Hello Raaz Holidays! \n\nI'm interested in know more about your travel packages and services. Could you please provide me with more details? Thank you!";

  // Encode the message to handle spaces and special characters
  const encodedMessage = encodeURIComponent(message);
  
  // Official WhatsApp API link
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;

  window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
};

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 0 }}
            animate={{ opacity: 1, scale: 1, y: -10 }}
            exit={{ opacity: 0, scale: 0.8, y: 0 }}
            className="absolute bottom-full right-0 mb-2 bg-white rounded-lg shadow-lg p-3 text-sm font-medium text-gray-700 whitespace-nowrap"
          >
            Chat with us on WhatsApp
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.button
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleWhatsAppClick}
        className="relative bg-[#25D366] rounded-full w-16 h-16 flex items-center justify-center text-white shadow-lg hover:shadow-xl"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Chat on WhatsApp"
        initial={{ y: 0 }}
        animate={{ y: [0, -6, 0] }}
        transition={{
          y: {
            repeat: Infinity,
            duration: 2,
            ease: "easeInOut"
          }
        }}
      >
        {/* Ring Effect */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25"></span>
        
        {/* WhatsApp Icon */}
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.6 6.32A8.78 8.78 0 0 0 12.14 4.78 8.902 8.902 0 0 0 3.49 14.72 8.85 8.85 0 0 0 5.37 20l-1.63 4.9 5.04-1.61A8.75 8.75 0 0 0 12.14 24h.01a8.9 8.9 0 0 0 5.5-15.68zM12.14 22.01h-.01a7.28 7.28 0 0 1-3.7-1.01l-.26-.16-2.74.88.9-2.7-.17-.28a7.14 7.14 0 0 1-1.11-3.74 7.105 7.105 0 0 1 11.24-5.78 7 7 0 0 1 2.06 5.04 7.12 7.12 0 0 1-7.11 7.14zm3.9-5.33c-.22-.11-1.27-.63-1.47-.7-.2-.07-.34-.11-.48.1-.15.22-.56.7-.68.85-.13.14-.25.16-.47.05a5.89 5.89 0 0 1-1.75-1.08 6.57 6.57 0 0 1-1.2-1.5c-.13-.22-.02-.34.09-.45.1-.1.21-.25.32-.38.1-.12.13-.22.2-.36.06-.15.03-.28-.02-.4-.05-.11-.48-1.15-.66-1.58-.17-.42-.35-.36-.48-.36-.12 0-.27-.02-.4-.02a.76.76 0 0 0-.56.26c-.2.2-.74.72-.74 1.77 0 1.05.76 2.06.87 2.2.1.14 1.44 2.2 3.49 3.09.49.21.87.34 1.17.43.49.15.93.13 1.29.08.39-.06 1.2-.5 1.38-.97.17-.48.17-.89.12-.97-.05-.1-.2-.15-.41-.26z" fill="currentColor"/>
        </svg>
      </motion.button>
    </div>
  );
};

export default FloatingWhatsApp;
