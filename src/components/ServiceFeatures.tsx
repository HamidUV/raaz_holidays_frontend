
import React from 'react';
import { Shield, DollarSign, Compass } from 'lucide-react';

const ServiceFeatures: React.FC = () => {
  const features = [
    {
      title: "Seamless Service",
      description: "A commitment to providing hassle-free travel services, ensuring a stress-free journey from start to finish.",
      icon: Shield,
      color: "text-raaz"
    },
    {
      title: "Affordable Adventures",
      description: "Delivering budget-friendly travel options without compromising on quality, offering remarkable experiences at unbeatable prices.",
      icon: DollarSign,
      color: "text-green-500"
    },
    {
      title: "Expert Guidance",
      description: "Access to knowledgeable travel experts helps you to take informed decisions and maximize travel experiences.",
      icon: Compass,
      color: "text-deepblue"
    }
  ];

  return (
    <section className="py-24 px-4 bg-white">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-6 font-playfair">
          Why Choose <span className="text-raaz">RAAZ Holidays</span>
        </h2>
        <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">
          Discover what makes us the preferred choice for your spiritual journeys and travel adventures.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="text-center p-8 rounded-xl bg-gray-50 hover:shadow-lg transition-shadow"
            >
              <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full bg-white shadow-md mb-6 ${feature.color}`}>
                <feature.icon size={36} />
              </div>
              <h3 className="text-xl font-bold mb-4 font-playfair">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceFeatures;
