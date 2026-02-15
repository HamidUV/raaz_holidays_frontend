
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FloatingWhatsApp from '../components/FloatingWhatsApp';
import TestimonialCarousel from '../components/TestimonialCarousel';
import TravelersMemories from '../components/TravelersMemories';

const About: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-28 pb-16">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center z-0 h-80"
          style={{ backgroundImage: `url(https://images.unsplash.com/photo-1649972904349-6e44c42644a7?q=80&w=2070)` }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        </div>
        
        {/* Hero Content */}
        <div className="relative z-10 container mx-auto text-white text-center px-4 pt-12 pb-32">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-playfair">About Us</h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto">
            Discover our story and commitment to exceptional travel experiences
          </p>
        </div>
      </section>
      
      {/* About Section - Updated image height to 428px */}
      <section className="py-16 px-4 bg-white -mt-24">
        <div className="container mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div>
                <h2 className="text-3xl font-bold mb-6 font-playfair">
                  Our <span className="text-raaz">Journey</span>
                </h2>
                <p className="text-gray-600 mb-4">
                  Founded in 2005, RAAZ Holidays began with a vision to provide exceptional travel experiences with a focus on Hajj and Umrah services. What started as a small travel agency in Manjeri, Kerala, has grown into a trusted name in the travel industry, serving thousands of satisfied customers.
                </p>
                <p className="text-gray-600 mb-4">
                  Our journey has been defined by our unwavering commitment to customer satisfaction, attention to detail, and personalized service. We understand that travel, especially religious pilgrimages, are deeply personal experiences, and we strive to make each journey memorable and meaningful.
                </p>
                <p className="text-gray-600">
                  Today, RAAZ Holidays offers a comprehensive range of travel services including Hajj and Umrah packages, international tour packages, visa services, flight bookings, and more. Our experienced team works tirelessly to ensure that every aspect of your journey is taken care of.
                </p>
              </div>
              
              <div className="rounded-xl overflow-hidden shadow-md h-fit">
                <img 
                  src="https://images.unsplash.com/photo-1466442929976-97f336a657be?q=80&w=2071" 
                  alt="RAAZ Holidays Office" 
                  className="w-full h-96 lg:h-[428px] object-cover"
                />
              </div>
            </div>
            
            {/* Mission & Vision - Kept with improved spacing */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4 font-playfair text-deepblue">Our Mission</h3>
                <p className="text-gray-600">
                  To provide exceptional travel experiences by understanding our clients' needs and exceeding their expectations. We aim to make travel accessible, comfortable, and memorable for everyone, with a special focus on Hajj and Umrah services.
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4 font-playfair text-deepblue">Our Vision</h3>
                <p className="text-gray-600">
                  To be the most trusted and preferred travel agency for Hajj, Umrah, and international tours. We aspire to expand our services while maintaining our core values of integrity, excellence, and personalized care.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section - Now using improved carousel */}
      <TestimonialCarousel />
      
      <TravelersMemories />
      {/* Customer Gallery - Kept and improved */}
      {/* <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center font-playfair">
            Our Travelers' <span className="text-raaz">Memories</span>
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div className="rounded-lg overflow-hidden h-44 md:h-60">
              <img 
                src="https://images.unsplash.com/photo-1469041797191-50ace28483c3?q=80&w=2069" 
                alt="Customer Memory" 
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="rounded-lg overflow-hidden h-44 md:h-60">
              <img 
                src="https://images.unsplash.com/photo-1466442929976-97f336a657be?q=80&w=2071" 
                alt="Customer Memory" 
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="rounded-lg overflow-hidden h-44 md:h-60">
              <img 
                src="https://images.unsplash.com/photo-1473158912295-779ef17fc94b?q=80&w=2070" 
                alt="Customer Memory" 
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="rounded-lg overflow-hidden h-44 md:h-60">
              <img 
                src="https://images.unsplash.com/photo-1500673922987-e212871fec22?q=80&w=2070" 
                alt="Customer Memory" 
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="rounded-lg overflow-hidden h-44 md:h-60">
              <img 
                src="https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?q=80&w=2036" 
                alt="Customer Memory" 
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="rounded-lg overflow-hidden h-44 md:h-60">
              <img 
                src="https://images.unsplash.com/photo-1565019011521-b0575cbb57c9?q=80&w=2070" 
                alt="Customer Memory" 
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="rounded-lg overflow-hidden h-44 md:h-60">
              <img 
                src="https://images.unsplash.com/photo-1581451896416-635ec27c340a?q=80&w=2070" 
                alt="Customer Memory" 
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="rounded-lg overflow-hidden h-44 md:h-60">
              <img 
                src="https://images.unsplash.com/photo-1474181487882-5abf3f0ba6c2?q=80&w=2070" 
                alt="Customer Memory" 
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section> */}

      
      {/* Legacy Section - Improved with clearer structure */}
      <section className="py-16 px-4 bg-deepblue text-white">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8 font-playfair">Our <span className="text-raaz">Legacy</span></h2>
            <p className="mb-6 text-lg">
              For nearly two decades, RAAZ Holidays has been a trusted name in the travel industry. Our legacy is built on trust, excellence, and the countless memorable experiences we've created for our clients.
            </p>
            <p className="mb-10 text-lg">
              We take pride in our heritage and continue to uphold the values that have made us successful. When you choose RAAZ Holidays, you're not just choosing a travel agency; you're choosing a partner who cares about making your journey special.
            </p>
            <div className="flex flex-col md:flex-row justify-center gap-6">
              <div className="text-center">
                <h3 className="text-4xl font-bold text-raaz">5000+</h3>
                <p className="text-gray-300">Satisfied Customers</p>
              </div>
              <div className="text-center">
                <h3 className="text-4xl font-bold text-raaz">18</h3>
                <p className="text-gray-300">Years of Experience</p>
              </div>
              <div className="text-center">
                <h3 className="text-4xl font-bold text-raaz">20+</h3>
                <p className="text-gray-300">Destinations</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
};

export default About;
