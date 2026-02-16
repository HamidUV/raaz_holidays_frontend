
// import React from 'react';
// import { ArrowRight, Calendar } from 'lucide-react';
// import { usePackages } from '@/hooks/use-packages';

// interface PackageDateProps {
//   startDate: string;
//   endDate: string;
// }

// interface UpcomingPackageProps {
//   title: string;
//   image: string;
//   description: string;
//   price: string;
//   dates: PackageDateProps[];
//   contactNumber: string;
//   earlyBird?: boolean;
//   limitedSlots?: number;
// }

// const TourDate: React.FC<PackageDateProps> = ({ startDate, endDate }) => {
//   return (
//     <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
//       <Calendar size={16} className="text-raaz" />
//       <span>{startDate} – {endDate}</span>
//     </div>
//   );
// };

// const UpcomingPackageCard: React.FC<UpcomingPackageProps> = ({
//   title,
//   image,
//   description,
//   price,
//   dates,
//   contactNumber,
//   earlyBird = false,
//   limitedSlots,
// }) => {
//   const handleBookNow = () => {
//     window.open(`https://wa.me/${contactNumber.replace(/\D/g, '')}?text=I'm interested in the upcoming ${encodeURIComponent(title)} package`, '_blank');
//   };

//   return (
//     <div className="rounded-xl overflow-hidden shadow-lg transition-transform hover:shadow-xl hover:-translate-y-1 border border-gray-100 flex flex-col h-full bg-white">
//       <div className="relative h-48 overflow-hidden">
//         <img
//           src={image}
//           alt={title}
//           className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
//         />
//         {limitedSlots && (
//           <div className="absolute top-4 right-4 bg-deepblue text-white text-xs px-2 py-1 rounded-full font-semibold">
//             Only {limitedSlots} slots left
//           </div>
//         )}
//         {earlyBird && (
//           <div className="absolute top-4 left-4 bg-gold text-white text-xs px-2 py-1 rounded-full font-semibold">
//             Early Bird Offer
//           </div>
//         )}
//       </div>

//       <div className="p-5 flex flex-col flex-grow">
//         <div className="flex justify-between items-start mb-3">
//           <h3 className="font-bold text-lg text-deepblue">{title}</h3>
//           <p className="text-raaz font-bold">{price}</p>
//         </div>

//         <p className="text-gray-600 mb-4 text-sm flex-grow">{description}</p>
        
//         <div className="mb-4 bg-gray-50 p-3 rounded-lg">
//           <p className="text-xs uppercase font-semibold text-gray-500 mb-2">Upcoming Dates:</p>
//           {dates.map((date, index) => (
//             <TourDate key={index} startDate={date.startDate} endDate={date.endDate} />
//           ))}
//         </div>

//         <button
//           onClick={handleBookNow}
//           className="w-full py-2.5 flex items-center justify-center gap-2 bg-deepblue text-white rounded-md font-medium hover:bg-deepblue-light transition-colors"
//         >
//           Book Now <ArrowRight size={16} />
//         </button>
//       </div>
//     </div>
//   );
// };

// const UpcomingPackages: React.FC = () => {
//   const { upcomingPackages, isLoading } = usePackages();
  
//   // Format packages data for display
//   const formatPackages = () => {
//     return upcomingPackages.map(pkg => ({
//       title: pkg.title,
//       image: pkg.image_url,
//       description: pkg.description,
//       price: pkg.price,
//       dates: pkg.tour_dates || [],
//       contactNumber: pkg.contact_number,
//       earlyBird: pkg.early_bird,
//       limitedSlots: pkg.slots_available
//     }));
//   };
  
//   const formattedPackages = formatPackages();

//   if (isLoading) {
//     return (
//       <section className="py-16 px-4 bg-white">
//         <div className="container mx-auto">
//           <div className="text-center">
//             <p>Loading upcoming packages...</p>
//           </div>
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section className="py-16 px-4 bg-white">
//       <div className="container mx-auto">
//         <div className="text-center mb-12">
//           <h2 className="text-3xl font-bold font-playfair mb-2">
//             Upcoming <span className="text-raaz">Packages</span>
//           </h2>
//           <p className="text-gray-600 max-w-2xl mx-auto">
//             Plan ahead with our future tour dates and secure your spot early for the best prices and availability.
//           </p>
//         </div>

//         {formattedPackages.length === 0 ? (
//           <div className="text-center py-8">
//             <p>No upcoming packages available at the moment. Please check back later.</p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {formattedPackages.map((pkg, index) => (
//               <UpcomingPackageCard
//                 key={index}
//                 title={pkg.title}
//                 image={pkg.image}
//                 description={pkg.description}
//                 price={pkg.price}
//                 dates={pkg.dates}
//                 contactNumber={pkg.contactNumber}
//                 earlyBird={pkg.earlyBird}
//                 limitedSlots={pkg.limitedSlots}
//               />
//             ))}
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default UpcomingPackages;

import React from 'react';
import { usePackages } from '@/hooks/use-packages';

interface UpcomingPackageProps {
  title: string;
  image: string;
  contactNumber: string;
  limitedSlots?: number;
  earlyBird?: boolean;
}

const UpcomingPackageCard: React.FC<UpcomingPackageProps> = ({
  title,
  image,
  contactNumber,
  limitedSlots,
  earlyBird,
}) => {
  
  // Professional WhatsApp redirection fix
  const handleBookNow = () => {
    const phoneNumber = contactNumber.replace(/\D/g, '');
    const message = encodeURIComponent(`Hello Raaz Holidays! 👋 I'm interested in the upcoming "${title}" package. Could you please share more details?`);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${message}`;
    
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="group relative rounded-2xl overflow-hidden shadow-md transition-all duration-500 hover:shadow-2xl border border-gray-100">
      {/* Premium Height Image Container (Matched to Exclusive Packages) */}
      <div className="relative h-[450px] md:h-[500px] overflow-hidden bg-gray-200">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
        />

        {/* Badges */}
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
          {limitedSlots && (
            <div className="bg-deepblue text-white text-[10px] uppercase tracking-widest px-3 py-1 rounded-full font-bold shadow-lg w-fit">
              {limitedSlots} Slots Left
            </div>
          )}
          {earlyBird && (
            <div className="bg-raaz text-white text-[10px] uppercase tracking-widest px-3 py-1 rounded-full font-bold shadow-lg w-fit">
              Early Bird
            </div>
          )}
        </div>

        {/* Premium Hover Overlay (Matched to Exclusive Packages) */}
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

const UpcomingPackages: React.FC = () => {
  const { upcomingPackages, isLoading } = usePackages();

  if (isLoading) {
    return (
      <section className="py-24 px-4 bg-white">
        <div className="container mx-auto flex flex-col items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-raaz"></div>
          <p className="mt-4 text-gray-400 font-playfair italic">Loading upcoming adventures...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 px-4 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-16">
         <h2 className="text-3xl font-bold font-playfair mb-2">
             Upcoming <span className="text-raaz">Packages</span>
           </h2>
          {/* <div className="h-1 w-20 bg-raaz mx-auto mb-6"></div> */}
          <p className="text-gray-500 max-w-2xl mx-auto font-light leading-relaxed italic">
            Plan ahead with our future tour dates and secure your spot early for the best experiences.
          </p>
        </div>

        {upcomingPackages.length === 0 ? (
          <div className="text-center py-20 border-2 border-dashed border-gray-100 rounded-3xl">
            <p className="text-gray-400 font-playfair italic text-lg">New journeys are being planned. Stay tuned!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {upcomingPackages.map((pkg, index) => (
              <UpcomingPackageCard
                key={pkg.id || index}
                title={pkg.title}
                image={pkg.image_url}
                contactNumber={pkg.contact_number || '919745500598'}
                earlyBird={pkg.early_bird}
                limitedSlots={pkg.slots_available}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default UpcomingPackages;