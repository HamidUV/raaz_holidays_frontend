
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useBanners } from '@/hooks/use-banners';

const BannerCarousel: React.FC = () => {
  const { activeBanners, isLoading } = useBanners();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-advance slides every 30 seconds
  useEffect(() => {
    if (activeBanners.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % activeBanners.length);
    }, 30000);

    return () => clearInterval(interval);
  }, [activeBanners.length]);

  // Fallback banners if no banners are available
  const fallbackBanners = [
    {
      id: 'fallback-1',
      image_url: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?q=80&w=2076',
      caption: 'Professional Hajj, Umrah & International Tour Packages with personalized service and utmost care.',
      title: 'Experience the Sacred Journey',
      display_order: 1
    },
    {
      id: 'fallback-2',
      image_url: 'https://images.unsplash.com/photo-1568849676085-51415703900f?q=80&w=2076',
      caption: 'Discover breathtaking destinations with our expertly crafted travel packages.',
      title: 'Explore Amazing Destinations',
      display_order: 2
    },
    {
      id: 'fallback-3',
      image_url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2076',
      caption: 'Create unforgettable memories with our premium holiday experiences.',
      title: 'Unforgettable Adventures Await',
      display_order: 3
    }
  ];

  const banners = activeBanners.length > 0 ? activeBanners : fallbackBanners;
  const currentBanner = banners[currentSlide];

  // Auto-advance for multiple banners (including fallback)
  useEffect(() => {
    if (banners.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 30000);

    return () => clearInterval(interval);
  }, [banners.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  if (isLoading) {
    return (
      <section className="relative h-screen bg-gray-900">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white text-xl">Loading...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Banner Images */}
      <div className="relative w-full h-full">
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div 
              className="absolute inset-0 bg-cover bg-center z-0"
              style={{ backgroundImage: `url(${banner.image_url})` }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 container mx-auto h-full flex flex-col items-center justify-center text-white text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-slide-down opacity-0 font-playfair text-shadow" style={{ animationDelay: '0.3s' }}>
          {currentBanner.title || 'Experience the'} <span className="text-raaz">Sacred Journey</span>
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl animate-slide-down opacity-0" style={{ animationDelay: '0.5s' }}>
          {currentBanner.caption || 'Professional Hajj, Umrah & International Tour Packages with personalized service and utmost care.'}
        </p>
      </div>

      {/* Navigation Arrows - Only show if multiple banners */}
      {banners.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all duration-300"
            aria-label="Previous banner"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all duration-300"
            aria-label="Next banner"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}

      {/* Indicators - Only show if multiple banners */}
      {banners.length > 1 && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-gold scale-125' 
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Go to banner ${index + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default BannerCarousel;
