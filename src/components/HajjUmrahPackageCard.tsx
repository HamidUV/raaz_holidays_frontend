
import React from 'react';
import { format } from 'date-fns';
import { Calendar, MapPin, Phone } from 'lucide-react';

interface HajjUmrahPackageCardProps {
  title: string;
  image: string;
  price: string;
  startDate: string;
  endDate: string;
  location: string;
  description: string;
  contactNumber: string;
}

const HajjUmrahPackageCard: React.FC<HajjUmrahPackageCardProps> = ({
  title,
  image,
  price,
  startDate,
  endDate,
  location,
  description,
  contactNumber,
}) => {
  const handleInquire = () => {
    const message = `I'm interested in the ${title} Hajj & Umrah package. Please provide more details.`;
    window.open(
      `https://wa.me/${contactNumber.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`,
      '_blank'
    );
  };

  return (
    <div className="rounded-xl overflow-hidden shadow-lg transition-transform hover:shadow-xl hover:-translate-y-1 border border-gray-100 bg-white">
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
        />
        <div className="absolute top-4 left-4 bg-gold text-white text-xs px-3 py-1 rounded-full font-semibold">
          Hajj & Umrah
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <h3 className="text-white font-bold text-lg">{title}</h3>
        </div>
      </div>

      <div className="p-5">
        <div className="flex justify-between items-start mb-4">
          <div className="text-raaz font-bold text-xl">₹{price}</div>
          <div className="flex items-center text-gray-600 text-sm">
            <MapPin size={14} className="mr-1" />
            {location}
          </div>
        </div>

        <p className="text-gray-600 mb-4 text-sm line-clamp-2">{description}</p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-600 text-sm">
            <Calendar size={14} className="mr-2 text-raaz" />
            <span>
              {format(new Date(startDate), 'MMM dd, yyyy')} - {format(new Date(endDate), 'MMM dd, yyyy')}
            </span>
          </div>
          <div className="flex items-center text-gray-600 text-sm">
            <Phone size={14} className="mr-2 text-raaz" />
            <span>{contactNumber}</span>
          </div>
        </div>

        <button
          onClick={handleInquire}
          className="w-full py-2.5 bg-deepblue text-white rounded-md font-medium hover:bg-deepblue-light transition-colors"
        >
          Inquire Now
        </button>
      </div>
    </div>
  );
};

export default HajjUmrahPackageCard;
