
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FloatingWhatsApp from '../components/FloatingWhatsApp';
import TestimonialCarousel from '../components/TestimonialCarousel';
import PackageCard from '../components/PackageCard';
import UpcomingPackages from '../components/UpcomingPackages';
import ServiceFeatures from '../components/ServiceFeatures';
import MovingServices from '../components/MovingServices';
import TravelersMemories from '../components/TravelersMemories';
import BannerCarousel from '../components/BannerCarousel';
import { Link } from 'react-router-dom';
import { usePackages } from '@/hooks/use-packages';

const Homepage: React.FC = () => {
  const { exclusivePackages, isLoading: packagesLoading } = usePackages();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* Hero Section with Banner Carousel */}
      <BannerCarousel />
      {/* About Section - Made more height */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 font-playfair">
                About <span className="text-raaz">RAAZ Holidays</span>
              </h2>
              <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                Since 2005, RAAZ Holidays has been providing exceptional travel experiences with a focus on Hajj, Umrah, and international tour packages.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Our journey has been defined by our unwavering commitment to customer satisfaction, attention to detail, and personalized service. We understand that travel, especially religious pilgrimages, are deeply personal experiences.
              </p>
              <Link 
                to="/about" 
                className="inline-block py-3 px-6 bg-deepblue text-white hover:bg-deepblue-light transition-colors rounded-md font-medium"
              >
                Learn More
              </Link>
            </div>
            
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?q=80&w=600&h=300&fit=crop" 
                alt="RAAZ Holidays Team" 
                className="w-full h-64 lg:h-80 object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Service Features Section */}
      <ServiceFeatures />
      
      {/* Moving Services Section */}
      <MovingServices />
      
      {/* Featured Packages Section */}
      {/* <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4 font-playfair">
            Exclusive <span className="text-raaz">Packages</span>
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Discover our carefully curated selection of Hajj, Umrah and international tour packages designed for an unforgettable experience.
          </p>
          
          {packagesLoading ? (
            <div className="text-center py-8">
              <p>Loading packages...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {exclusivePackages.slice(0, 3).map((pkg, index) => (
                <PackageCard 
                  key={pkg.id || index}
                  title={pkg.title}
                  image={pkg.image_url}
                  price={pkg.price}
                  duration={pkg.duration || ''}
                  description={pkg.description}
                  contactNumber={pkg.contact_number}
                  featured={pkg.featured}
                />
              ))}
            </div>
          )}
          
          <div className="text-center mt-10">
            <Link 
              to="/packages" 
              className="inline-block py-3 px-6 border-2 border-gold text-raaz hover:bg-gold hover:text-white transition-colors rounded-md font-medium"
            >
              View All Packages
            </Link>
          </div>
        </div>
      </section> */}
      {/* Featured Packages Section */}
<section className="py-24 px-4 bg-white">
  <div className="container mx-auto">
    <div className="max-w-3xl mx-auto text-center mb-16">
      <h2 className="text-3xl font-bold text-center mb-4 font-playfair">
            Exclusive <span className="text-raaz">Packages</span>
          </h2>
      <p className="text-gray-500 text-lg font-light">
        Discover our carefully curated selection of Hajj, Umrah and international tour packages designed for an unforgettable experience.
      </p>
    </div>
    
    {packagesLoading ? (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-raaz mb-4"></div>
        <p className="text-gray-400 font-playfair italic">Preparing your adventures...</p>
      </div>
    ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {exclusivePackages.slice(0, 3).map((pkg, index) => (
          <PackageCard 
            key={pkg.id || index}
            title={pkg.title}
            image={pkg.image_url}
            // price={pkg.price}
            // duration={pkg.duration || ''}
            // description={pkg.description}
            contactNumber={pkg.contact_number || "919745500598"}
            featured={pkg.featured}
          />
        ))}
      </div>
    )}
    
    {/* <div className="text-center mt-16">
      <Link 
        to="/packages" 
        className="inline-flex items-center group px-8 py-4 bg-transparent border-2 border-raaz text-raaz hover:bg-raaz hover:text-white transition-all duration-300 rounded-full font-bold text-lg"
      >
        View All Packages
        <svg 
          className="ml-2 w-5 h-5 transform group-hover:translate-x-2 transition-transform" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </Link>
    </div> */}
  </div>
</section>
      
      {/* Upcoming Packages Section */}
      <UpcomingPackages />
      
      
      
      {/* Testimonials Section */}
      <TestimonialCarousel />
      
      {/* Travelers Memories Section */}
      <TravelersMemories />
      
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
};

export default Homepage;
