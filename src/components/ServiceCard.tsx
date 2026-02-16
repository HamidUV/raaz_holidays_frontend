import React from 'react';

interface ServiceCardProps {
  title: string;
  icon: React.ReactNode;
  description: string;
  contactNumber: string;
  contactName: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  icon,
  description,
  contactNumber,
  contactName,
}) => {
  
  // Updated Redirection Logic
  const handleCardClick = () => {
    const phoneNumber = contactNumber.replace(/\D/g, '');
    const message = encodeURIComponent(`Hello! I'm interested in the "${title}" service. Could you please provide more information?`);
    
    // Official API link for better compatibility
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${message}`;

    // Standard method for opening a new tab reliably
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };
  
  return (
    <div 
      className="bg-white rounded-xl shadow-lg p-6 transition-all hover:shadow-xl border border-gray-100 hover:border-gold cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="flex flex-col items-center text-center">
        <div className="bg-deepblue bg-opacity-10 rounded-full p-4 mb-4">
          {icon}
        </div>
        
        <h3 className="text-xl font-bold mb-3 font-playfair">{title}</h3>
        
        <p className="text-gray-600 mb-5">{description}</p>
        
        {/* Sub-text to show who the user will be chatting with */}
        <p className="text-xs text-raaz font-medium uppercase tracking-wider">
          Chat with {contactName}
        </p>
      </div>
    </div>
  );
};

export default ServiceCard;