
import React from 'react';

interface PackageCardProps {
  title: string;
  image: string;
  price: string;
  duration: string;
  description: string;
  contactNumber: string;
  featured?: boolean;
}

const PackageCard: React.FC<PackageCardProps> = ({ 
  title, 
  image, 
  price, 
  duration, 
  description, 
  contactNumber,
  featured = false
}) => {
  const handleBookNow = () => {
    window.open(`https://wa.me/${contactNumber.replace(/\D/g, '')}?text=I'm interested in the ${encodeURIComponent(title)} package`, '_blank');
  };
  
  return (
    <div className={`rounded-xl overflow-hidden shadow-lg transition-transform hover:shadow-xl ${
      featured ? 'border-2 border-gold transform hover:-translate-y-2' : 'border border-gray-100 hover:-translate-y-1'
    }`}>
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
        />
        {featured && (
          <div className="absolute top-4 right-4 bg-gold text-white text-xs px-2 py-1 rounded-full font-semibold">
            Featured
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <p className="text-white font-bold text-lg">{title}</p>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-5">
        <div className="flex justify-between items-center mb-4">
          <p className="text-raaz font-bold text-xl">{price}</p>
          <p className="text-gray-600 text-sm">{duration}</p>
        </div>
        
        <p className="text-gray-600 mb-5 line-clamp-3">{description}</p>
        
        <button
          onClick={handleBookNow}
          className="w-full py-2.5 bg-deepblue text-white rounded-md font-medium hover:bg-deepblue-light transition-colors"
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default PackageCard;
