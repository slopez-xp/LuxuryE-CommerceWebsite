import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, ArrowRight, ChevronLeft, ChevronRight, Award, Shield, Sparkles } from 'lucide-react';
import { VideoWithFallback } from './figma/VideoWithFallback';

// ROLEX GREEN CONSTANT
const ROLEX_GREEN = '#006039';

const heroVideo = new URL('../assests/hero-video.mp4', import.meta.url).href;

interface HomepageProps {
  onNavigate: (page: string) => void;
  navHeight?: number;
}

export function Homepage({ onNavigate, navHeight = 0 }: HomepageProps) {
  const [scrollY, setScrollY] = useState(0);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const [email, setEmail] = useState('');
  
  const heroRef = useRef<HTMLDivElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);
  const craftsmanshipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set(prev).add(entry.target.id));
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll('[data-animate]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % newArrivals.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const heroStyle: React.CSSProperties = {
    height: `calc(100vh - ${navHeight}px)`,
  };

  const featuredCollections = [
    {
      id: 'datejust',
      name: 'DATEJUST',
      subtitle: 'Classic Reference',
      description: 'The quintessential luxury watch, combining elegance with precision since 1945',
      image: 'https://images.unsplash.com/photo-1649357584808-333476473dce?w=800&q=80',
      tag: 'ICONIC'
    },
    {
      id: 'daytona',
      name: 'COSMOGRAPH DAYTONA',
      subtitle: 'Racing Legend',
      description: 'Born on the racetrack, designed for champions who demand excellence',
      image: 'https://images.unsplash.com/photo-1628498643679-fa021dabb3f1?w=800&q=80',
      tag: 'SPORT'
    },
    {
      id: 'submariner',
      name: 'SUBMARINER',
      subtitle: "Diver's Excellence",
      description: 'The ultimate diving companion, waterproof to 300 meters',
      image: 'https://images.unsplash.com/photo-1730757679771-b53e798846cf?w=800&q=80',
      tag: 'PROFESSIONAL'
    },
  ];

  const newArrivals = [
    {
      id: 'oyster-perpetual',
      name: 'OYSTER PERPETUAL 41',
      price: '$5,900',
      badge: 'NEW',
      image: 'https://images.unsplash.com/photo-1706801803974-fc52c9aaac6c?w=600&q=80',
    },
    {
      id: 'gmt-master',
      name: 'GMT-MASTER II',
      price: '$10,700',
      badge: 'LIMITED',
      image: 'https://images.unsplash.com/photo-1625328923319-74cafe485866?w=600&q=80',
    },
    {
      id: 'sky-dweller',
      name: 'SKY-DWELLER',
      price: '$14,800',
      badge: 'EXCLUSIVE',
      image: 'https://images.unsplash.com/photo-1762592033298-d866290f1508?w=600&q=80',
    },
  ];

  const awards = [
    { icon: Award, title: 'Swiss Made', description: 'Certified Excellence' },
    { icon: Shield, title: '5-Year Warranty', description: 'Global Coverage' },
    { icon: Sparkles, title: 'Superlative Chronometer', description: 'Officially Certified' },
  ];

  const handleNewsletterSubmit = () => {
    if (email) {
      alert(`Thank you for subscribing with ${email}`);
      setEmail('');
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-0.5 bg-black/20 z-50">
        <div
          className="h-full bg-gradient-to-r from-[#a37e2c] to-[#d4af37] transition-all duration-300"
          style={{ width: `${(scrollY / (document.body.scrollHeight - window.innerHeight)) * 100}%` }}
        />
      </div>

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative flex items-center justify-center overflow-hidden"
        style={heroStyle}
      >
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at center, #1a1a1a 0%, #000000 70%)',
          }}
        />

        {/* Animated Background Particles */}
        <div className="absolute inset-0 overflow-hidden opacity-20">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-[#a37e2c] rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
              }}
            />
          ))}
        </div>

        {/* Hero Video/Image with Enhanced Parallax */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            transform: `translateY(${scrollY * 0.3}px) scale(${1 + scrollY * 0.0002})`,
          }}
        >
          <div className="relative w-full h-full">
            <VideoWithFallback
              src={heroVideo}
              alt="Rolex Oyster Perpetual"
              className="w-full h-full object-cover"
              autoPlay={true}
              muted={true}
              loop={true}
              controls={false}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black" />
          </div>
        </div>

        {/* Hero Content with Stagger Animation */}
        <div className="relative z-30 text-center px-8 animate-fadeIn">
          <div
            className="mb-6 text-[#a37e2c] tracking-[0.3em] animate-slideDown"
            style={{
              fontFamily: '-apple-system, Helvetica Neue, sans-serif',
              fontSize: '0.75rem',
              fontWeight: 500,
              animationDelay: '0.2s',
            }}
          >
            THE OYSTER PERPETUAL
          </div>
          <h1
            className="mb-8 text-white animate-slideDown"
            style={{
              fontFamily: 'Playfair Display, Georgia, serif',
              fontSize: 'clamp(2.5rem, 8vw, 5rem)',
              fontWeight: 400,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              animationDelay: '0.4s',
            }}
          >
            A Symphony of
            <br />
            <span className="bg-gradient-to-r from-[#a37e2c] to-[#d4af37] bg-clip-text text-transparent">
              Precision
            </span>
          </h1>
          <p
            className="max-w-[600px] mx-auto mb-12 text-[#cccccc] animate-slideDown"
            style={{
              fontFamily: '-apple-system, Helvetica Neue, sans-serif',
              fontSize: '1.125rem',
              lineHeight: 1.8,
              letterSpacing: '0.02em',
              animationDelay: '0.6s',
            }}
          >
            Every Rolex watch is a masterpiece of engineering, designed to last a lifetime and beyond.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slideDown" style={{ animationDelay: '0.8s' }}>
            <button
              onClick={() => onNavigate('collections')}
              className="px-12 py-4 bg-[#a37e2c] text-black hover:bg-[#d4af37] transition-all duration-300 tracking-[0.15em] hover:scale-105 hover:shadow-[0_0_30px_rgba(163,126,44,0.4)]"
              style={{
                fontFamily: '-apple-system, Helvetica Neue, sans-serif',
                fontSize: '0.875rem',
                fontWeight: 600,
              }}
            >
              EXPLORE COLLECTIONS
            </button>
            <button
              onClick={() => onNavigate('boutiques')}
              className="px-12 py-4 border-2 text-[#a37e2c] hover:bg-[#a37e2c]/10 transition-all duration-300 tracking-[0.15em]"
              style={{ borderColor: ROLEX_GREEN }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = ROLEX_GREEN;
                e.currentTarget.style.color = ROLEX_GREEN;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#a37e2c';
                e.currentTarget.style.color = '#a37e2c';
              }}
              style={{
                fontFamily: '-apple-system, Helvetica Neue, sans-serif',
                fontSize: '0.875rem',
                fontWeight: 500,
              }}
            >
              FIND A BOUTIQUE
            </button>
          </div>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="text-[#a37e2c]" size={32} />
        </div>
      </section>

      {/* Awards Banner */}
      <section className="py-16 px-8 bg-[#0a0a0a] border-y border-[#a37e2c]/10">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          {awards.map((award, index) => {
            const Icon = award.icon;
            return (
              <div
                key={index}
                className="flex flex-col items-center text-center group"
                data-animate
                id={`award-${index}`}
              >
                <div 
                  className="w-16 h-16 mb-4 flex items-center justify-center bg-[#a37e2c]/10 rounded-full transition-all duration-300 group-hover:scale-110"
                  style={{ backgroundColor: `rgba(163, 126, 44, 0.1), ${ROLEX_GREEN}20` }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = `${ROLEX_GREEN}30`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(163, 126, 44, 0.1)';
                  }}
                >
                  <Icon 
                    className="text-[#a37e2c] transition-colors duration-300" 
                    size={28}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = ROLEX_GREEN;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = '#a37e2c';
                    }}
                  />
                </div>
                <h3
                  className="mb-2 text-white tracking-[0.1em]"
                  style={{
                    fontFamily: '-apple-system, Helvetica Neue, sans-serif',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                  }}
                >
                  {award.title}
                </h3>
                <p
                  className="text-[#999999]"
                  style={{
                    fontFamily: '-apple-system, Helvetica Neue, sans-serif',
                    fontSize: '0.85rem',
                  }}
                >
                  {award.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Featured Collections */}
      <section
        ref={featuredRef}
        className="py-32 px-8 bg-black"
        data-animate
        id="featured-collections"
      >
        <div className="max-w-[1600px] mx-auto">
          <div className="text-center mb-20">
            <div
              className="mb-6 text-[#a37e2c] tracking-[0.3em]"
              style={{
                fontFamily: '-apple-system, Helvetica Neue, sans-serif',
                fontSize: '0.75rem',
                fontWeight: 500,
              }}
            >
              FEATURED COLLECTIONS
            </div>
            <h2
              className="mb-6 text-white"
              style={{
                fontFamily: 'Playfair Display, Georgia, serif',
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                fontWeight: 400,
                lineHeight: 1.2,
                letterSpacing: '-0.01em',
              }}
            >
              Timeless Icons
            </h2>
            <p
              className="max-w-[700px] mx-auto text-[#cccccc]"
              style={{
                fontFamily: '-apple-system, Helvetica Neue, sans-serif',
                fontSize: '1.125rem',
                lineHeight: 1.8,
              }}
            >
              Discover our most iconic collections, each representing a unique fusion of form and function.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredCollections.map((collection, index) => (
              <div
                key={collection.id}
                className="group relative cursor-pointer overflow-hidden bg-[#0a0a0a] border border-[#a37e2c]/10 hover:border-[#a37e2c]/40 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(163,126,44,0.15)]"
                onClick={() => onNavigate('collections')}
                style={{
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                {/* Tag */}
                <div className="absolute top-6 left-6 z-20 bg-[#a37e2c] text-black px-4 py-2 text-xs tracking-[0.2em] font-semibold">
                  {collection.tag}
                </div>

                {/* Image */}
                <div className="relative aspect-[3/4] overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10 group-hover:from-black/90 transition-all duration-500" />
                  <img
                    src={collection.image}
                    alt={collection.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Overlay Content */}
                  <div className="absolute inset-0 z-20 p-8 flex flex-col justify-end">
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <div
                        className="text-[#a37e2c] mb-2 tracking-[0.15em] text-xs"
                        style={{
                          fontFamily: '-apple-system, Helvetica Neue, sans-serif',
                        }}
                      >
                        {collection.subtitle}
                      </div>
                      <h3
                        className="mb-3 text-white tracking-[0.1em]"
                        style={{
                          fontFamily: '-apple-system, Helvetica Neue, sans-serif',
                          fontSize: '1.2rem',
                          fontWeight: 600,
                        }}
                      >
                        {collection.name}
                      </h3>
                      <p
                        className="text-[#cccccc] mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100"
                        style={{
                          fontFamily: '-apple-system, Helvetica Neue, sans-serif',
                          fontSize: '0.9rem',
                          lineHeight: 1.6,
                        }}
                      >
                        {collection.description}
                      </p>
                      <div className="flex items-center gap-2 text-[#a37e2c] opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200">
                        <span
                          className="tracking-[0.15em] text-xs font-semibold"
                          style={{
                            fontFamily: '-apple-system, Helvetica Neue, sans-serif',
                          }}
                        >
                          DISCOVER MORE
                        </span>
                        <ArrowRight size={16} className="transform group-hover:translate-x-2 transition-transform duration-300" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Accent Line */}
                <div className="h-1 bg-gradient-to-r from-transparent via-[#a37e2c] to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals - Improved Carousel */}
      <section className="py-32 px-8 bg-[#0a0a0a]" data-animate id="new-arrivals">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <div
                className="mb-4 text-[#a37e2c] tracking-[0.3em]"
                style={{
                  fontFamily: '-apple-system, Helvetica Neue, sans-serif',
                  fontSize: '0.75rem',
                  fontWeight: 500,
                }}
              >
                NEW ARRIVALS
              </div>
              <h2
                className="text-white"
                style={{
                  fontFamily: 'Playfair Display, Georgia, serif',
                  fontSize: 'clamp(2rem, 5vw, 3rem)',
                  fontWeight: 400,
                }}
              >
                Latest Additions
              </h2>
            </div>
            <div className="hidden md:flex items-center gap-4">
              <button
                onClick={() => setCarouselIndex((prev) => (prev - 1 + newArrivals.length) % newArrivals.length)}
                className="p-3 border border-[#a37e2c]/30 text-[#a37e2c] hover:bg-[#a37e2c] hover:text-black transition-all duration-300 hover:scale-110"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={() => setCarouselIndex((prev) => (prev + 1) % newArrivals.length)}
                className="p-3 border border-[#a37e2c]/30 text-[#a37e2c] hover:bg-[#a37e2c] hover:text-black transition-all duration-300 hover:scale-110"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* Desktop: Show 3, Mobile: Show 1 */}
          <div className="hidden md:grid md:grid-cols-3 gap-8">
            {newArrivals.map((product) => (
              <div
                key={product.id}
                className="group relative cursor-pointer overflow-hidden bg-black border border-[#a37e2c]/10 hover:border-[#a37e2c]/40 transition-all duration-500 hover:-translate-y-2"
                onClick={() => onNavigate('collections')}
              >
                <div className="absolute top-4 right-4 z-20 bg-[#a37e2c] text-black px-3 py-1 text-xs tracking-[0.2em] font-bold">
                  {product.badge}
                </div>
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                </div>
                <div className="p-6">
                  <h3
                    className="mb-2 text-white tracking-[0.1em]"
                    style={{
                      fontFamily: '-apple-system, Helvetica Neue, sans-serif',
                      fontSize: '0.95rem',
                      fontWeight: 600,
                    }}
                  >
                    {product.name}
                  </h3>
                  <p
                    className="text-[#a37e2c] mb-4 text-lg font-semibold"
                    style={{
                      fontFamily: '-apple-system, Helvetica Neue, sans-serif',
                    }}
                  >
                    {product.price}
                  </p>
                  <div className="flex items-center gap-2 text-[#a37e2c] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="tracking-[0.15em] text-xs font-semibold">VIEW DETAILS</span>
                    <ArrowRight size={14} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Carousel */}
          <div className="md:hidden relative overflow-hidden">
            <div
              className="flex transition-transform duration-500"
              style={{ transform: `translateX(-${carouselIndex * 100}%)` }}
            >
              {newArrivals.map((product) => (
                <div key={product.id} className="min-w-full px-2">
                  <div
                    className="group relative cursor-pointer overflow-hidden bg-black border border-[#a37e2c]/10"
                    onClick={() => onNavigate('collections')}
                  >
                    <div className="absolute top-4 right-4 z-20 bg-[#a37e2c] text-black px-3 py-1 text-xs tracking-[0.2em] font-bold">
                      {product.badge}
                    </div>
                    <div className="relative aspect-[3/4] overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="mb-2 text-white tracking-[0.1em] text-base font-semibold">
                        {product.name}
                      </h3>
                      <p className="text-[#a37e2c] text-lg font-semibold">{product.price}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center gap-2 mt-6">
              {newArrivals.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCarouselIndex(index)}
                  className={`h-1 transition-all duration-300 ${
                    index === carouselIndex ? 'w-8 bg-[#a37e2c]' : 'w-1 bg-[#a37e2c]/30'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Craftsmanship Section */}
      <section
        ref={craftsmanshipRef}
        className="relative py-32 px-8 overflow-hidden bg-black"
        data-animate
        id="craftsmanship"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a0a] to-black" />
        <div className="relative max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div>
            <div
              className="mb-6 text-[#a37e2c] tracking-[0.3em]"
              style={{
                fontFamily: '-apple-system, Helvetica Neue, sans-serif',
                fontSize: '0.75rem',
                fontWeight: 500,
              }}
            >
              SUPERLATIVE CHRONOMETER
            </div>
            <h2
              className="mb-8 text-white"
              style={{
                fontFamily: 'Playfair Display, Georgia, serif',
                fontSize: 'clamp(2rem, 5vw, 3rem)',
                fontWeight: 400,
                lineHeight: 1.2,
              }}
            >
              The Art of
              <br />
              Watchmaking
            </h2>
            <p
              className="mb-8 text-[#cccccc]"
              style={{
                fontFamily: '-apple-system, Helvetica Neue, sans-serif',
                fontSize: '1.05rem',
                lineHeight: 1.8,
              }}
            >
              Each Rolex watch is assembled by hand and tested rigorously to ensure it meets our superlative standards. The result is a timepiece of unparalleled precision and reliability.
            </p>
            <button
              onClick={() => onNavigate('heritage')}
              className="group inline-flex items-center gap-3 text-[#a37e2c] hover:text-[#d4af37] transition-colors tracking-[0.15em]"
              style={{
                fontFamily: '-apple-system, Helvetica Neue, sans-serif',
                fontSize: '0.875rem',
                fontWeight: 600,
              }}
            >
              DISCOVER OUR HERITAGE
              <ArrowRight size={16} className="transform group-hover:translate-x-2 transition-transform duration-300" />
            </button>
          </div>
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
            <div className="absolute -inset-4 bg-gradient-to-r from-[#a37e2c]/20 to-transparent blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <img
              src="https://images.unsplash.com/photo-1763226015334-9a2d3fb11ea5?w=800&q=80"
              alt="Watch Movement"
              className="w-full h-auto rounded-lg transform group-hover:scale-[1.02] transition-transform duration-500"
            />
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24 px-8 bg-[#0a0a0a]" data-animate id="newsletter">
        <div className="max-w-[800px] mx-auto text-center">
          <h2
            className="mb-6 text-white"
            style={{
              fontFamily: 'Playfair Display, Georgia, serif',
              fontSize: 'clamp(2rem, 5vw, 2.5rem)',
              fontWeight: 400,
            }}
          >
            Stay Informed
          </h2>
          <p
            className="mb-10 text-[#cccccc]"
            style={{
              fontFamily: '-apple-system, Helvetica Neue, sans-serif',
              fontSize: '1.05rem',
              lineHeight: 1.8,
            }}
          >
            Subscribe to receive the latest news, exclusive releases, and updates from Rolex
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-[600px] mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-6 py-4 bg-black border border-[#a37e2c]/20 text-white placeholder-[#666] focus:outline-none focus:border-[#a37e2c] transition-colors"
              style={{
                fontFamily: '-apple-system, Helvetica Neue, sans-serif',
                fontSize: '0.95rem',
              }}
            />
            <button
              onClick={handleNewsletterSubmit}
              className="px-10 py-4 bg-[#a37e2c] text-black hover:bg-[#d4af37] transition-all duration-300 tracking-[0.15em] whitespace-nowrap hover:scale-105"
              style={{
                fontFamily: '-apple-system, Helvetica Neue, sans-serif',
                fontSize: '0.875rem',
                fontWeight: 600,
              }}
            >
              SUBSCRIBE
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}