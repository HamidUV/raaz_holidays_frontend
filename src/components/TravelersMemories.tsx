
import React from 'react';
import { useTravelMemories } from '@/hooks/use-travel-memories';

const TravelersMemories: React.FC = () => {
  const { memories, isLoading, error } = useTravelMemories();

  // Fallback memories in case API returns empty or fails
  const fallbackMemories = [
    {
      id: '1',
      image_url: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?q=80&w=400&h=300&fit=crop",
      caption: "Sacred Journey to Mecca"
    },
    {
      id: '2',
      image_url: "https://images.unsplash.com/photo-1469041797191-50ace28483c3?q=80&w=400&h=300&fit=crop",
      caption: "Desert Adventures"
    },
    {
      id: '3',
      image_url: "https://images.unsplash.com/photo-1500673922987-e212871fec22?q=80&w=400&h=300&fit=crop",
      caption: "Spiritual Enlightenment"
    },
    {
      id: '4',
      image_url: "https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=400&h=300&fit=crop",
      caption: "Mountain Retreats"
    },
    {
      id: '5',
      image_url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=400&h=300&fit=crop",
      caption: "Cultural Experiences"
    },
    {
      id: '6',
      image_url: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?q=80&w=400&h=300&fit=crop",
      caption: "Unforgettable Moments"
    },
    {
      id: '7',
      image_url: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?q=80&w=400&h=300&fit=crop",
      caption: "Holy Sites"
    },
    {
      id: '8',
      image_url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=400&h=300&fit=crop",
      caption: "Group Pilgrimages"
    }
  ];

  const displayMemories = memories.length > 0 ? memories : fallbackMemories;

  if (isLoading) {
    return (
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-6 font-playfair">
            Our Travelers <span className="text-raaz">Memories</span>
          </h2>
          <div className="flex justify-center items-center h-40">
            <p className="text-lg">Loading memories...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-6 font-playfair">
          Our Travelers <span className="text-raaz">Memories</span>
        </h2>
        <p className="text-center text-gray-600 mb-16 text-lg max-w-3xl mx-auto">
          Capturing the beautiful moments and experiences shared by our valued travelers. 
          Each image tells a story of faith, adventure, and unforgettable journeys that create lasting memories.
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
          {displayMemories.slice(0, 8).map((memory) => (
            <div 
              key={memory.id}
              className="relative group overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              <img 
                src={memory.image_url}
                alt={memory.caption || 'Travel memory'}
                className="w-full h-56 md:h-60 lg:h-48 xl:h-44 object-cover transition-transform group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <p className="text-white text-sm p-3 font-medium leading-tight">
                  {memory.caption || 'Beautiful memory'}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-gray-600 text-lg mb-6">
            Join thousands of satisfied travelers who have created beautiful memories with us
          </p>
          <div className="flex justify-center items-center space-x-8 text-sm text-gray-500">
            {/* <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-gold rounded-full"></div>
              <span>Professional Photography</span>
            </div> */}
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-gold rounded-full"></div>
              <span>Guided Tours</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-gold rounded-full"></div>
              <span>Lifetime Memories</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TravelersMemories;
