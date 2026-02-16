
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FloatingWhatsApp from '../components/FloatingWhatsApp';
import ServiceCard from '../components/ServiceCard';

const Services: React.FC = () => {
  // Icons for service cards
  const renderIcon = (name: string) => {
    switch (name) {
      case 'hajj':
        return (
          <svg className="w-8 h-8 text-deepblue" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 9.5V5.5C21 4.4 20.1 3.5 19 3.5H5C3.9 3.5 3 4.4 3 5.5V9.5C1.9 9.5 1 10.4 1 11.5V16.5C1 17.6 1.9 18.5 3 18.5V19.5C3 20.6 3.9 21.5 5 21.5H19C20.1 21.5 21 20.6 21 19.5V18.5C22.1 18.5 23 17.6 23 16.5V11.5C23 10.4 22.1 9.5 21 9.5ZM5 5.5H19V9.5H5V5.5ZM19 19.5H5V13.5H19V19.5ZM21 16.5H19V13.5H17V16.5H7V13.5H5V16.5H3V11.5H21V16.5Z" fill="currentColor"/>
          </svg>
        );
      case 'flight':
        return (
          <svg className="w-8 h-8 text-deepblue" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 16V14L13 9V3.5C13 2.67 12.33 2 11.5 2C10.67 2 10 2.67 10 3.5V9L2 14V16L10 13.5V19L8 20.5V22L11.5 21L15 22V20.5L13 19V13.5L21 16Z" fill="currentColor"/>
          </svg>
        );
      case 'visa':
        return (
          <svg className="w-8 h-8 text-deepblue" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 3H4C2.89 3 2 3.89 2 5V19C2 20.11 2.89 21 4 21H20C21.11 21 22 20.11 22 19V5C22 3.89 21.11 3 20 3ZM20 19H4V5H20V19ZM18 15H6V17H18V15ZM12 7C13.1 7 14 7.9 14 9C14 10.1 13.1 11 12 11C10.9 11 10 10.1 10 9C10 7.9 10.9 7 12 7ZM16 11C16 13.21 14.21 15 12 15C9.79 15 8 13.21 8 11C8 8.79 9.79 7 12 7C14.21 7 16 8.79 16 11Z" fill="currentColor"/>
          </svg>
        );
      case 'tour':
        return (
          <svg className="w-8 h-8 text-deepblue" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.9 3L13.2 5.8L10.9 3L9.1 5.8L6.9 3L4.3 7.4L3 7L4 9H12L13.7 6.2L16.1 9L17.9 6.2L20.2 9L22.1 5.9L21 4.4L18.3 7.4L17 5.1L14.9 3ZM21 13V21.5C21 22.33 20.33 23 19.5 23C18.67 23 18 22.33 18 21.5V17H7.5C5.57 17 4 15.43 4 13.5S5.57 10 7.5 10H18V10.5C18 9.67 18.67 9 19.5 9C20.33 9 21 9.67 21 10.5V13Z" fill="currentColor"/>
          </svg>
        );
      case 'stamp':
        return (
          <svg className="w-8 h-8 text-deepblue" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM15 6.5V9H13V6.5C13 6.22 12.78 6 12.5 6H10.5C10.22 6 10 6.22 10 6.5V10.5C10 10.78 10.22 11 10.5 11H12.5C12.78 11 13 10.78 13 10.5V10H15V12H13V11.5C13 11.22 12.78 11 12.5 11H10.5C10.22 11 10 11.22 10 11.5V15.5C10 15.78 10.22 16 10.5 16H12.5C12.78 16 13 15.78 13 15.5V13H15V17.5C15 17.78 15.22 18 15.5 18H17.5C17.78 18 18 17.78 18 17.5V6.5C18 6.22 17.78 6 17.5 6H15.5C15.22 6 15 6.22 15 6.5Z" fill="currentColor"/>
          </svg>
        );
      case 'emigration':
        return (
          <svg className="w-8 h-8 text-deepblue" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 5H4C2.9 5 2 5.9 2 7V17C2 18.1 2.9 19 4 19H20C21.1 19 22 18.1 22 17V7C22 5.9 21.1 5 20 5ZM20 17H4V7H20V17ZM18 9H6V10H18V9ZM18 11H6V12H18V11ZM18 13H6V14H18V13ZM10 15H6V16H10V15ZM14 15H12V16H14V15ZM18 15H16V16H18V15Z" fill="currentColor"/>
          </svg>
        );
      case 'attestation':
        return (
          <svg className="w-8 h-8 text-deepblue" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2ZM18 20H6V4H13V9H18V20ZM9.7 13.3C9.3 12.9 8.7 12.9 8.3 13.3C7.9 13.7 7.9 14.3 8.3 14.7L10.6 17L15.7 11.9C16.1 11.5 16.1 10.9 15.7 10.5C15.3 10.1 14.7 10.1 14.3 10.5L10.6 14.2L9.7 13.3Z" fill="currentColor"/>
          </svg>
        );
      case 'passport':
        return (
          <svg className="w-8 h-8 text-deepblue" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2ZM12 5C13.66 5 15 6.34 15 8C15 9.66 13.66 11 12 11C10.34 11 9 9.66 9 8C9 6.34 10.34 5 12 5ZM12 19.2C9.5 19.2 7.29 17.92 6 15.98C6.03 13.99 10 12.9 12 12.9C13.99 12.9 17.97 13.99 18 15.98C16.71 17.92 14.5 19.2 12 19.2Z" fill="currentColor"/>
          </svg>
        );
      case 'train':
        return (
          <svg className="w-8 h-8 text-deepblue" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C7.58 2 4 2.5 4 6V15.5C4 17.43 5.57 19 7.5 19L6 20.5V21H18V20.5L16.5 19C18.43 19 20 17.43 20 15.5V6C20 2.5 16.42 2 12 2ZM12 4C16.42 4 18 4.5 18 6H6C6 4.5 7.58 4 12 4ZM6 7H18V15.5C18 16.33 17.33 17 16.5 17H7.5C6.67 17 6 16.33 6 15.5V7ZM8.5 11C7.67 11 7 11.67 7 12.5C7 13.33 7.67 14 8.5 14C9.33 14 10 13.33 10 12.5C10 11.67 9.33 11 8.5 11ZM15.5 11C14.67 11 14 11.67 14 12.5C14 13.33 14.67 14 15.5 14C16.33 14 17 13.33 17 12.5C17 11.67 16.33 11 15.5 11Z" fill="currentColor"/>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-28 pb-16">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center z-0 h-80"
          style={{ backgroundImage: `url(https://i.pinimg.com/1200x/78/54/95/7854957167bdcfd951b758d84b385f73.jpg)` }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        </div>
        
        {/* Hero Content */}
        <div className="relative z-10 container mx-auto text-white text-center px-4 pt-12 pb-32">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-playfair">Our Services</h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto">
            Comprehensive travel solutions tailored to meet all your needs
          </p>
        </div>
      </section>
      
      {/* Services Section */}
      <section className="py-16 px-4 bg-white -mt-24">
        <div className="container mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <ServiceCard 
                title="Hajj & Umrah"
                icon={renderIcon('hajj')}
                description="Complete Hajj and Umrah packages with visa processing, accommodations, transportation, and spiritual guidance."
                contactNumber="+919745500598"
                contactName="Jabir"
              />
              
              <ServiceCard 
                title="Flight Tickets"
                icon={renderIcon('flight')}
                description="Domestic and international flight bookings at competitive prices with special group discounts."
                contactNumber="+917879000800"
                contactName="Junaid"
              />
              
              <ServiceCard 
                title="Visa Services"
                icon={renderIcon('visa')}
                description="Expert assistance for tourist, business, student, and work visas to various countries."
                contactNumber="+919539494152"
                contactName="Jamshid"
              />
              
              <ServiceCard 
                title="Tour Packages"
                icon={renderIcon('tour')}
                description="Customized domestic and international tour packages for individuals, families, and groups."
                contactNumber="+919747063005"
                contactName="Jamshad"
              />
              
              <ServiceCard 
                title="Visa Stamping"
                icon={renderIcon('stamp')}
                description="Professional visa stamping services ensuring proper documentation and timely processing."
                contactNumber="+919539494152"
                contactName="Jamshid"
              />
              
              <ServiceCard 
                title="Emigration Service"
                icon={renderIcon('emigration')}
                description="Complete emigration clearance and documentation services for overseas employment."
                contactNumber="+919539494152"
                contactName="Jamshid"
              />
              
              <ServiceCard 
                title="Attestation"
                icon={renderIcon('attestation')}
                description="Document attestation services for educational certificates, marriage certificates, and other important documents."
                contactNumber="+919539494152"
                contactName="Jamshid"
              />
              
              <ServiceCard 
                title="Passport Service"
                icon={renderIcon('passport')}
                description="Assistance with passport applications, renewals, and related services."
                contactNumber="+919539494152"
                contactName="Jamshid"
              />
              
              <ServiceCard 
                title="VFS, Train, PCC"
                icon={renderIcon('train')}
                description="Comprehensive services for VFS appointments, train bookings, and Police Clearance Certificate (PCC) processing."
                contactNumber="+919947120999"
                contactName="Shabna"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* About Our Services */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 font-playfair">Our Service Approach</h2>
            <p className="text-gray-600 mb-10">
              At RAAZ Holidays, we believe in providing comprehensive travel solutions under one roof. Our services are designed to make your travel experience seamless and hassle-free. We understand the importance of personalized service and strive to meet the unique requirements of each client.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow text-left">
                <h3 className="font-bold text-lg mb-3 text-deepblue">Professional Expertise</h3>
                <p className="text-gray-600">
                  Our team consists of travel experts with years of experience in the industry. We stay updated with the latest travel regulations and requirements to provide you with accurate and timely information.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow text-left">
                <h3 className="font-bold text-lg mb-3 text-deepblue">Customer-Centric Approach</h3>
                <p className="text-gray-600">
                  We prioritize customer satisfaction and tailor our services to meet your specific needs. Our dedicated team is available to assist you throughout your journey.
                </p>
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

export default Services;
