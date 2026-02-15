
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FloatingWhatsApp from '../components/FloatingWhatsApp';
import PackageCard from '../components/PackageCard';
import HajjUmrahPackageCard from '../components/HajjUmrahPackageCard';
import { usePackages } from '@/hooks/use-packages';
import { useHajjUmrahPackages } from '@/hooks/use-hajj-umrah-packages';

const Packages: React.FC = () => {
  const { exclusivePackages, isLoading } = usePackages();
  const { packages: hajjUmrahPackages, isLoading: hajjUmrahLoading } = useHajjUmrahPackages();
  
  // Filter packages by category (excluding Hajj & Umrah from general packages)
  const hajjUmrahFromGeneral = exclusivePackages.filter(pkg => 
    pkg.title.toLowerCase().includes('hajj') || 
    pkg.title.toLowerCase().includes('umrah')
  );
  
  const internationalPackages = exclusivePackages.filter(pkg => 
    !pkg.title.toLowerCase().includes('hajj') && 
    !pkg.title.toLowerCase().includes('umrah')
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-28 pb-16">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center z-0 h-80"
          style={{ backgroundImage: `url(https://images.unsplash.com/photo-1472396961693-142e6e269027?q=80&w=2074)` }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        </div>
        
        {/* Hero Content */}
        <div className="relative z-10 container mx-auto text-white text-center px-4 pt-12 pb-32">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-playfair">Our Travel Packages</h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto">
            Discover our carefully curated selection of premium travel experiences for all your needs
          </p>
        </div>
      </section>
      
      {(isLoading || hajjUmrahLoading) ? (
        <section className="py-16 px-4 bg-white -mt-24">
          <div className="container mx-auto text-center">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <p>Loading packages...</p>
            </div>
          </div>
        </section>
      ) : (
        <>
          {/* Hajj & Umrah Packages Section */}
          <section className="py-16 px-4 bg-white -mt-24">
            <div className="container mx-auto">
              <div className="bg-white rounded-xl shadow-lg p-8 mb-16">
                <h2 className="text-2xl font-bold mb-8 font-playfair">
                  <span className="text-raaz">Hajj & Umrah</span> Packages
                </h2>
                
                {/* Display dedicated Hajj & Umrah packages */}
                {hajjUmrahPackages.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
                    {hajjUmrahPackages.map((pkg) => (
                      <HajjUmrahPackageCard 
                        key={pkg.id}
                        title={pkg.title}
                        image={pkg.image_url}
                        price={pkg.price}
                        startDate={pkg.start_date}
                        endDate={pkg.end_date}
                        location={pkg.location}
                        description={pkg.description}
                        contactNumber={pkg.contact_number}
                      />
                    ))}
                  </div>
                ) : null}

                {/* Display Hajj & Umrah packages from general packages */}
                {hajjUmrahFromGeneral.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {hajjUmrahFromGeneral.map((pkg) => (
                      <PackageCard 
                        key={pkg.id}
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
                ) : null}

                {hajjUmrahPackages.length === 0 && hajjUmrahFromGeneral.length === 0 && (
                  <p className="text-center py-4">No Hajj or Umrah packages available at the moment.</p>
                )}
              </div>
              
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold mb-8 font-playfair">
                  <span className="text-raaz">International</span> Tour Packages
                </h2>
                
                {internationalPackages.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {internationalPackages.map((pkg) => (
                      <PackageCard 
                        key={pkg.id}
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
                ) : (
                  <p className="text-center py-4">No international packages available at the moment.</p>
                )}
              </div>
            </div>
          </section>
        </>
      )}

      {/* About Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 font-playfair">Why Choose Our Packages</h2>
            <p className="text-gray-600 mb-8">
              At RAAZ Holidays, we understand that each journey is unique and personal. Our packages are designed with meticulous attention to detail, ensuring that your travel experience is seamless, comfortable, and memorable. We take pride in our personalized service and commitment to excellence.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-5 rounded-lg shadow">
                <h3 className="font-bold text-lg mb-2 text-deepblue">Experienced Guides</h3>
                <p className="text-gray-600">Knowledgeable guides who provide cultural and spiritual context</p>
              </div>
              <div className="bg-white p-5 rounded-lg shadow">
                <h3 className="font-bold text-lg mb-2 text-deepblue">Quality Accommodations</h3>
                <p className="text-gray-600">Carefully selected hotels for comfort and convenience</p>
              </div>
              <div className="bg-white p-5 rounded-lg shadow">
                <h3 className="font-bold text-lg mb-2 text-deepblue">24/7 Support</h3>
                <p className="text-gray-600">Round-the-clock assistance throughout your journey</p>
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

export default Packages;
