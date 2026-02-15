
import React from 'react';
import { Plane, MapPin, FileText, Camera, Shield } from 'lucide-react';

const MovingServices: React.FC = () => {
  const services = [
    { name: "Hajj Packages", icon: Plane },
    { name: "Umrah Tours", icon: MapPin },
    { name: "Visa Services", icon: FileText },
    { name: "International Tours", icon: Camera },
    { name: "Travel Insurance", icon: Shield },
    { name: "Hotel Bookings", icon: MapPin },
    { name: "Flight Tickets", icon: Plane },
    { name: "Group Tours", icon: Camera }
  ];

  return (
    <section className="py-8 bg-deepblue overflow-hidden">
      <div className="whitespace-nowrap">
        <div className="inline-flex animate-[marquee_20s_linear_infinite]">
          {/* First set of services */}
          {services.map((service, index) => (
            <div key={`first-${index}`} className="mx-8 flex items-center text-white flex-shrink-0">
              <service.icon className="w-6 h-6 mr-3 text-raaz" />
              <span className="text-lg font-medium">{service.name}</span>
              <span className="mx-6 text-raaz">•</span>
            </div>
          ))}
          {/* Second set of services for seamless loop */}
          {services.map((service, index) => (
            <div key={`second-${index}`} className="mx-8 flex items-center text-white flex-shrink-0">
              <service.icon className="w-6 h-6 mr-3 text-raaz" />
              <span className="text-lg font-medium">{service.name}</span>
              <span className="mx-6 text-raaz">•</span>
            </div>
          ))}
          {/* Third set of services for extra coverage */}
          {services.map((service, index) => (
            <div key={`third-${index}`} className="mx-8 flex items-center text-white flex-shrink-0">
              <service.icon className="w-6 h-6 mr-3 text-raaz" />
              <span className="text-lg font-medium">{service.name}</span>
              <span className="mx-6 text-raaz">•</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MovingServices;
