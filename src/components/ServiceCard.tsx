
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
  const handleCardClick = () => {
    window.open(`https://wa.me/${contactNumber.replace(/\D/g, '')}?text=I'm interested in ${encodeURIComponent(title)} service`, '_blank');
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
      </div>
    </div>
  );
};

export default ServiceCard;
