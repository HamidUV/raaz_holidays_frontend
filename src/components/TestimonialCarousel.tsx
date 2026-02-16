
// import React, { useState } from 'react';

// interface Testimonial {
//   id: number;
//   name: string;
//   location: string;
//   comment: string;
//   image?: string;
// }

// const TestimonialCarousel: React.FC = () => {
//   const testimonials: Testimonial[] = [
//     {
//       id: 1,
//       name: "Ahmed Khan",
//       location: "Dubai, UAE",
//       comment: "RAAZ Holidays provided an exceptional Hajj experience. Everything from accommodations to transportation was perfectly arranged.",
//       image: "https://randomuser.me/api/portraits/men/32.jpg"
//     },
//     {
//       id: 2,
//       name: "Fatima Rahman",
//       location: "Kerala, India",
//       comment: "Our Umrah trip was life-changing and RAAZ made it so smooth. Their attention to detail and spiritual guidance made all the difference.",
//       image: "https://randomuser.me/api/portraits/women/44.jpg"
//     },
//     {
//       id: 3,
//       name: "Mohammed Ali",
//       location: "Mumbai, India",
//       comment: "Highly recommend their visa services! Fast, efficient, and hassle-free. They handled everything professionally.",
//       image: "https://randomuser.me/api/portraits/men/51.jpg"
//     },
//   ];
  
//   const [activeIndex, setActiveIndex] = useState(0);
  
//   const goToNext = () => {
//     setActiveIndex((current) => (current + 1) % testimonials.length);
//   };
  
//   const goToPrevious = () => {
//     setActiveIndex((current) => (current - 1 + testimonials.length) % testimonials.length);
//   };
  
//   return (
//     <section className="py-16 bg-gray-50">
//       <div className="container mx-auto px-4">
//         <h2 className="text-3xl font-bold text-center mb-10 font-playfair">
//           What Our <span className="text-raaz">Clients</span> Say
//         </h2>
        
//         <div className="max-w-3xl mx-auto">
//           {/* Testimonial Card with Better Structured Navigation */}
//           <div className="relative bg-white rounded-xl p-6 md:p-8 shadow-lg border border-gray-100">
//             {/* Quote Icon */}
//             <div className="absolute text-raaz opacity-20 top-4 left-4">
//               <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
//                 <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
//               </svg>
//             </div>
            
//             <div className="flex flex-col items-center text-center py-4">
//               {testimonials.map((testimonial, index) => (
//                 <div 
//                   key={testimonial.id}
//                   className={`transition-opacity duration-500 ${
//                     index === activeIndex ? 'opacity-100 z-10' : 'opacity-0 absolute'
//                   }`}
//                 >
//                   {testimonial.image && (
//                     <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gold mb-6 mx-auto">
//                       <img 
//                         src={testimonial.image} 
//                         alt={testimonial.name}
//                         className="w-full h-full object-cover"
//                       />
//                     </div>
//                   )}
                  
//                   <p className="text-gray-600 italic mb-6 max-w-2xl">{testimonial.comment}</p>
                  
//                   <div>
//                     <h4 className="font-bold text-deepblue">{testimonial.name}</h4>
//                     <p className="text-sm text-gray-500">{testimonial.location}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
            
//             {/* Navigation Buttons - Properly Aligned */}
//             <div className="flex justify-between mt-6">
//               <button 
//                 onClick={goToPrevious}
//                 className="bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md text-deepblue hover:bg-gray-100 focus:outline-none border border-gray-200"
//                 aria-label="Previous testimonial"
//               >
//                 <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//                 </svg>
//               </button>
              
//               <div className="flex items-center space-x-2">
//                 {testimonials.map((_, index) => (
//                   <button
//                     key={index}
//                     onClick={() => setActiveIndex(index)}
//                     className={`h-2 rounded-full focus:outline-none transition-all ${
//                       index === activeIndex ? 'bg-gold w-6' : 'bg-gray-300 w-2'
//                     }`}
//                     aria-label={`Go to testimonial ${index + 1}`}
//                   />
//                 ))}
//               </div>
              
//               <button 
//                 onClick={goToNext}
//                 className="bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md text-deepblue hover:bg-gray-100 focus:outline-none border border-gray-200"
//                 aria-label="Next testimonial"
//               >
//                 <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                 </svg>
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default TestimonialCarousel;

import React, { useState } from 'react';

interface Testimonial {
  id: number;
  name: string;
  location: string;
  comment: string;
  color: string; // Background color for the avatar
}

const TestimonialCarousel: React.FC = () => {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Salman",
      location: "Thailand Tour Client",
      comment: "I recently went on a Thailand tour organized by Raaz Tours and Travel, and it was one of the best travel experiences I’ve ever had! Every destination was perfectly planned. From island hopping to the Phi Phi Islands, everything was smooth and hassle-free. Their attention to detail and great pricing made our vacation unforgettable.",
      color: "bg-blue-600"
    },
    {
      id: 2,
      name: "Nejiya Nasi",
      location: "Thailand & Malaysia",
      comment: "Wonderful Trip with Raaz Tours & Travels! I had an amazing experience visiting Thailand and Malaysia. Everything was perfectly arranged – from flights and stay to food and sightseeing. The team was super friendly and helpful throughout the journey. Highly recommend them for your next vacation!",
      color: "bg-raaz"
    },
    {
      id: 3,
      name: "Joolisha",
      location: "Valued Client",
      comment: "Their service is amazing. Very good hospitality. They give wonderful memories. I am very happy with the overall experience provided by the Raaz team.",
      color: "bg-purple-600"
    },
  ];
  
  const [activeIndex, setActiveIndex] = useState(0);
  
  const goToNext = () => {
    setActiveIndex((current) => (current + 1) % testimonials.length);
  };
  
  const goToPrevious = () => {
    setActiveIndex((current) => (current - 1 + testimonials.length) % testimonials.length);
  };
  
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10 font-playfair">
          What Our <span className="text-raaz">Clients</span> Say
        </h2>
        
        <div className="max-w-3xl mx-auto">
          <div className="relative bg-white rounded-xl p-6 md:p-8 shadow-lg border border-gray-100">
            {/* Quote Icon */}
            <div className="absolute text-raaz opacity-20 top-4 left-4">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
            </div>
            
            <div className="flex flex-col items-center text-center py-4">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={testimonial.id}
                  className={`transition-opacity duration-500 ${
                    index === activeIndex ? 'opacity-100 z-10' : 'opacity-0 absolute'
                  }`}
                >
                  {/* Google-style Letter Avatar */}
                  <div className={`w-20 h-20 rounded-full flex items-center justify-center text-white text-3xl font-bold mb-6 mx-auto shadow-inner ${testimonial.color}`}>
                    {testimonial.name.charAt(0).toUpperCase()}
                  </div>
                  
                  <p className="text-gray-600 italic mb-6 max-w-2xl leading-relaxed">"{testimonial.comment}"</p>
                  
                  <div>
                    <h4 className="font-bold text-deepblue text-lg">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500 uppercase tracking-widest">{testimonial.location}</p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Navigation Buttons */}
            <div className="flex justify-between mt-6">
              <button 
                onClick={goToPrevious}
                className="bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md text-deepblue hover:bg-gray-100 focus:outline-none border border-gray-200 transition-colors"
                aria-label="Previous testimonial"
              >
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <div className="flex items-center space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`h-2 rounded-full focus:outline-none transition-all ${
                      index === activeIndex ? 'bg-raaz w-6' : 'bg-gray-300 w-2'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
              
              <button 
                onClick={goToNext}
                className="bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md text-deepblue hover:bg-gray-100 focus:outline-none border border-gray-200 transition-colors"
                aria-label="Next testimonial"
              >
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;