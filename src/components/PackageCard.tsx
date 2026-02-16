
// import React from 'react';

// interface PackageCardProps {
//   title: string;
//   image: string;
//   price: string;
//   duration: string;
//   description: string;
//   contactNumber: string;
//   featured?: boolean;
// }

// const PackageCard: React.FC<PackageCardProps> = ({ 
//   title, 
//   image, 
//   price, 
//   duration, 
//   description, 
//   contactNumber,
//   featured = false
// }) => {
//   const handleBookNow = () => {
//     window.open(`https://wa.me/${contactNumber.replace(/\D/g, '')}?text=I'm interested in the ${encodeURIComponent(title)} package`, '_blank');
//   };
  
//   return (
//     <div className={`rounded-xl overflow-hidden shadow-lg transition-transform hover:shadow-xl ${
//       featured ? 'border-2 border-gold transform hover:-translate-y-2' : 'border border-gray-100 hover:-translate-y-1'
//     }`}>
//       {/* Image */}
//       <div className="relative h-48 overflow-hidden">
//         <img 
//           src={image} 
//           alt={title} 
//           className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
//         />
//         {featured && (
//           <div className="absolute top-4 right-4 bg-gold text-white text-xs px-2 py-1 rounded-full font-semibold">
//             Featured
//           </div>
//         )}
//         <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
//           <p className="text-white font-bold text-lg">{title}</p>
//         </div>
//       </div>
      
//       {/* Content */}
//       <div className="p-5">
//         <div className="flex justify-between items-center mb-4">
//           <p className="text-raaz font-bold text-xl">{price}</p>
//           <p className="text-gray-600 text-sm">{duration}</p>
//         </div>
        
//         <p className="text-gray-600 mb-5 line-clamp-3">{description}</p>
        
//         <button
//           onClick={handleBookNow}
//           className="w-full py-2.5 bg-deepblue text-white rounded-md font-medium hover:bg-deepblue-light transition-colors"
//         >
//           Book Now
//         </button>
//       </div>
//     </div>
//   );
// };

// export default PackageCard;

import React from 'react';

interface PackageCardProps {
  title: string;
  image: string;
  contactNumber: string;
  featured?: boolean;
}

const PackageCard: React.FC<PackageCardProps> = ({ 
  title, 
  image, 
  contactNumber,
  featured = false
}) => {
  
  // Solved WhatsApp Redirection Issue
  const handleBookNow = () => {
    const phoneNumber = contactNumber.replace(/\D/g, '');
    const message = encodeURIComponent(`Hello Raaz Holidays! I'm interested in learning more about the "${title}" package. Could you please provide details?`);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${message}`;
    
    // Using a safe window.open
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };
  
  return (
    <div className={`group relative rounded-2xl overflow-hidden shadow-md transition-all duration-500 hover:shadow-2xl ${
      featured ? 'ring-2 ring-raaz' : 'border border-gray-100'
    }`}>
      {/* Increased Height Image Container */}
      <div className="relative h-[450px] md:h-[500px] overflow-hidden bg-gray-200">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
        />
        
        {/* Featured Badge */}
        {featured && (
          <div className="absolute top-4 left-4 z-10 bg-raaz text-white text-[10px] uppercase tracking-widest px-3 py-1 rounded-full font-bold shadow-lg">
            Special Offer
          </div>
        )}

        {/* Hover Overlay: Shows Title and Button */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
          <h3 className="text-white font-playfair text-2xl font-bold mb-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            {title}
          </h3>
          
          <button
            onClick={handleBookNow}
            className="w-full py-4 bg-white text-raaz font-bold rounded-xl uppercase tracking-wider text-sm hover:bg-raaz hover:text-white transition-all duration-300 shadow-xl"
          >
            Enquire via WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
};

export default PackageCard;
