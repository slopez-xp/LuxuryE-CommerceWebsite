import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Award, Clock, Trophy } from 'lucide-react';

// ROLEX GREEN CONSTANT
const ROLEX_GREEN = '#006039';

interface Milestone {
  year: string;
  title: string;
  description: string;
  image: string;
  achievement: string;
}

interface HeritagePageProps {
  onNavigate?: (page: string) => void;
}

export function HeritagePage({ onNavigate }: HeritagePageProps) {
  const [scrollY, setScrollY] = useState(0);
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleItems((prev) => new Set(prev).add(index));
          }
        });
      },
      { threshold: 0.2, rootMargin: '-50px' }
    );

    const milestoneElements = document.querySelectorAll('[data-milestone]');
    milestoneElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const milestones: Milestone[] = [
    {
      year: '1905',
      title: 'Foundation',
      description: 'Hans Wilsdorf and Alfred Davis establish Wilsdorf & Davis in London, the company that would become Rolex.',
      image: 'https://images.unsplash.com/photo-1762592033298-d866290f1508?w=800&q=80',
      achievement: 'Birth of a Legend'
    },
    {
      year: '1926',
      title: 'The Oyster',
      description: "The world's first waterproof wristwatch. A revolutionary invention that would become the foundation of all Rolex watches.",
      image: 'https://images.unsplash.com/photo-1706801803974-fc52c9aaac6c?w=800&q=80',
      achievement: 'Waterproof Innovation'
    },
    {
      year: '1953',
      title: 'Conquest of Everest',
      description: 'Sir Edmund Hillary and Tenzing Norgay reach the summit of Mount Everest wearing Rolex Oyster Perpetual watches.',
      image: 'https://images.unsplash.com/photo-1730757679771-b53e798846cf?w=800&q=80',
      achievement: 'Summit Achievement'
    },
    {
      year: '1963',
      title: 'Cosmograph Daytona',
      description: 'Rolex introduces the Cosmograph Daytona, designed specifically for professional racing drivers.',
      image: 'https://images.unsplash.com/photo-1628498643679-fa021dabb3f1?w=800&q=80',
      achievement: 'Racing Excellence'
    },
    {
      year: '1970',
      title: 'Datejust Excellence',
      description: 'The Datejust becomes the quintessential watch of reference, embodying the perfect balance of form and function.',
      image: 'https://images.unsplash.com/photo-1649357584808-333476473dce?w=800&q=80',
      achievement: 'Timeless Classic'
    },
    {
      year: '2000',
      title: 'Parachrom Hairspring',
      description: 'Rolex develops and patents the blue Parachrom hairspring, offering greater resistance to shocks and temperature variations.',
      image: 'https://images.unsplash.com/photo-1763226015334-9a2d3fb11ea5?w=800&q=80',
      achievement: 'Technical Innovation'
    },
  ];

  const stats = [
    { icon: Award, value: '120+', label: 'Years of Excellence' },
    { icon: Clock, value: '100M+', label: 'Watches Crafted' },
    { icon: Trophy, value: '500+', label: 'Patents & Innovations' },
  ];

  const getTimelineProgress = () => {
    if (!timelineRef.current) return 0;
    const rect = timelineRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const elementTop = rect.top;
    const elementHeight = rect.height;
    const startOffset = windowHeight / 2;
    const progress = Math.max(0, Math.min(1, (startOffset - elementTop) / elementHeight));
    return progress * 100;
  };

  return (
    // FIX 1: w-full instead of min-h-screen, and strict overflow-x-hidden on the root
    <div className="bg-black w-full overflow-x-hidden relative">
      
      {/* Global Ambience - Fixed background, safe from scroll layout */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 animate-pulse"></div>
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-[#a37e2c] rounded-full mix-blend-screen opacity-5 blur-[120px]"></div>
        <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-[#d4af37] rounded-full mix-blend-screen opacity-5 blur-[120px]"></div>
      </div>

      {/* Hero Section */}
      {/* FIX 2: Added 'overflow-hidden' to this section to crop the parallax movement so it doesn't push the page height down */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden z-10">
        <div 
          className="absolute inset-0 z-0"
          style={{
            transform: `translateY(${scrollY * 0.5}px)`,
            willChange: 'transform' // Performance optimization
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[#111] via-black to-black opacity-90"></div>
          {/* Particles */}
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-[#a37e2c] blur-sm"
              style={{
                width: `${Math.random() * 4 + 1}px`,
                height: `${Math.random() * 4 + 1}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.5 + 0.2,
                transform: `translateY(${scrollY * (0.2 + Math.random() * 0.5)}px)`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 text-center px-4">
          <div 
            className="mb-6 inline-block"
            style={{
              transform: `translateY(${scrollY * -0.2}px)`,
              opacity: Math.max(0, 1 - scrollY * 0.002)
            }}
          >
            <span className="text-[#a37e2c] tracking-[0.5em] text-xs md:text-sm font-medium border-b border-[#a37e2c]/30 pb-2">
              ESTABLISHED 1905
            </span>
          </div>
          
          <h1
            className="text-white mb-6"
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(3rem, 10vw, 7rem)',
              lineHeight: 0.9,
              transform: `scale(${1 + scrollY * 0.0005}) translateY(${scrollY * 0.1}px)`,
              opacity: Math.max(0, 1 - scrollY * 0.0015),
              textShadow: '0 20px 50px rgba(0,0,0,0.5)'
            }}
          >
            A Legacy of <br />
            <span className="bg-gradient-to-r from-[#a37e2c] via-[#f9e5b9] to-[#a37e2c] bg-clip-text text-transparent bg-[length:200%_auto] animate-shine">
              Perfection
            </span>
          </h1>

          <p 
            className="max-w-2xl mx-auto text-[#888] text-lg md:text-xl font-light leading-relaxed"
            style={{
              transform: `translateY(${scrollY * 0.3}px)`,
              opacity: Math.max(0, 1 - scrollY * 0.0025)
            }}
          >
            Tracing the history of horological excellence through a century of innovation.
          </p>
        </div>

        <div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-50"
          style={{ opacity: Math.max(0, 0.5 - scrollY * 0.005) }}
        >
          <ChevronDown className="text-white w-8 h-8" />
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-20 py-24 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, idx) => (
            <div 
              key={idx}
              className="group relative h-64 perspective-1000"
            >
              <div className="absolute inset-0 bg-[#111] border border-[#a37e2c]/20 rounded-xl transform transition-transform duration-700 group-hover:-translate-y-4 group-hover:rotate-x-12 shadow-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#a37e2c]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="h-full flex flex-col items-center justify-center p-8 text-center relative z-10">
                  <stat.icon className="w-12 h-12 text-[#a37e2c] mb-4 transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12" />
                  <div className="text-4xl md:text-5xl font-serif text-white mb-2">{stat.value}</div>
                  <div className="text-[#666] uppercase tracking-widest text-xs font-semibold">{stat.label}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline Section */}
      {/* FIX 3: Added overflow-hidden to timeline to catch any 3D transforms swinging outside */}
      <section ref={timelineRef} className="relative py-32 overflow-hidden z-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative">
          
          {/* The Light Beam */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-[#333] transform md:-translate-x-1/2">
            <div 
              className="w-full bg-gradient-to-b from-[#a37e2c] via-[#f9e5b9] to-[#a37e2c] shadow-[0_0_15px_#a37e2c]"
              style={{ 
                height: `${getTimelineProgress()}%`,
                transition: 'height 0.1s linear'
              }}
            />
          </div>

          <div className="space-y-32 md:space-y-48">
            {milestones.map((milestone, index) => {
              const isEven = index % 2 === 0;
              const isVisible = visibleItems.has(index);

              return (
                <div 
                  key={index}
                  data-milestone
                  data-index={index}
                  className={`relative flex flex-col md:flex-row items-center gap-12 md:gap-24 ${isEven ? 'md:flex-row-reverse' : ''}`}
                >
                  {/* Timeline Node */}
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 -translate-x-1/2 md:-translate-x-1/2 flex items-center justify-center z-30">
                    <div className={`w-3 h-3 rounded-full transition-all duration-700 ${isVisible ? 'bg-[#a37e2c] scale-100 shadow-[0_0_20px_#a37e2c]' : 'bg-[#333] scale-50'}`} />
                    {isVisible && (
                      <div className="absolute inset-0 w-full h-full border border-[#a37e2c] rounded-full animate-ping opacity-50"></div>
                    )}
                  </div>

                  {/* Text Content */}
                  <div 
                    className="flex-1 w-full pl-12 md:pl-0 perspective-1000"
                    style={{
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible 
                        ? 'translate3d(0,0,0) rotateY(0deg)' 
                        : `translate3d(${isEven ? '50px' : '-50px'}, 0, -100px) rotateY(${isEven ? '-15deg' : '15deg'})`,
                      transition: 'all 1s cubic-bezier(0.17, 0.55, 0.55, 1)'
                    }}
                  >
                    <div className={`text-left ${isEven ? 'md:text-left' : 'md:text-right'}`}>
                      <div className="inline-block px-4 py-1 mb-4 border border-[#a37e2c]/30 rounded-full bg-[#a37e2c]/5 backdrop-blur-md">
                        <span className="text-[#a37e2c] text-xs tracking-[0.2em] font-bold">{milestone.achievement}</span>
                      </div>
                      <h2 className="text-6xl md:text-8xl font-serif text-white/5 font-bold absolute -top-12 md:-top-16 w-full select-none pointer-events-none">
                        {milestone.year}
                      </h2>
                      <h3 className="text-3xl md:text-4xl text-white font-serif mb-4 relative z-10">{milestone.title}</h3>
                      <p className="text-[#999] leading-relaxed relative z-10 max-w-md ml-0 md:ml-auto md:mr-0 inline-block">
                        {milestone.description}
                      </p>
                    </div>
                  </div>

                  {/* Image Card */}
                  <div 
                    className="flex-1 w-full pl-12 md:pl-0 perspective-1000 group"
                    style={{
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible 
                        ? 'translate3d(0,0,0) rotateY(0deg)' 
                        : `translate3d(${isEven ? '-50px' : '50px'}, 0, -100px) rotateY(${isEven ? '15deg' : '-15deg'})`,
                      transition: 'all 1.2s cubic-bezier(0.17, 0.55, 0.55, 1) 0.2s'
                    }}
                  >
                    <div className="relative aspect-[4/3] w-full max-w-lg mx-auto transform-style-3d transition-transform duration-500 group-hover:rotate-y-6 group-hover:rotate-x-6">
                      <div 
                        className="absolute -inset-4 border border-[#a37e2c]/30 z-0 opacity-0 group-hover:opacity-100 transition-all duration-700"
                        style={{ transform: 'translateZ(-50px)' }}
                      ></div>
                      
                      <div className="relative h-full w-full overflow-hidden rounded-sm shadow-2xl bg-[#111]">
                        <img 
                          src={milestone.image} 
                          alt={milestone.title}
                          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000"
                        />
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:animate-shine-fast pointer-events-none"></div>
                        <div className="absolute inset-0 ring-1 ring-[#a37e2c]/20 group-hover:ring-[#a37e2c]/60 transition-all duration-500"></div>
                      </div>

                      <div 
                        className={`absolute -bottom-6 ${isEven ? '-right-6' : '-left-6'} bg-black border border-[#a37e2c] px-6 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.8)] z-20`}
                        style={{ transform: 'translateZ(30px)' }}
                      >
                        <span className="text-2xl font-serif text-[#a37e2c]">{milestone.year}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer / Quote - Bottom of the page */}
      <section className="relative py-40 px-4 text-center overflow-hidden z-20">
        <div className="absolute inset-0 bg-gradient-to-t from-[#a37e2c]/10 to-transparent opacity-20"></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="mb-8 text-[#a37e2c] opacity-50">
            <Award size={48} className="mx-auto" />
          </div>
          <p className="text-3xl md:text-5xl font-serif text-white leading-tight italic mb-12">
            "A Rolex is not just a watch. It is a symbol of excellence, a testament to human achievement."
          </p>
          <button 
            className="px-8 py-3 bg-transparent border text-[#a37e2c] transition-all duration-300 tracking-widest text-xs uppercase font-bold"
            style={{ borderColor: '#a37e2c' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = ROLEX_GREEN;
              e.currentTarget.style.color = ROLEX_GREEN;
              e.currentTarget.style.backgroundColor = `${ROLEX_GREEN}10`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#a37e2c';
              e.currentTarget.style.color = '#a37e2c';
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            Explore Collection
          </button>
        </div>
      </section>

      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .rotate-x-12 {
          transform: rotateX(12deg);
        }
        @keyframes shine {
          to {
            background-position: 200% center;
          }
        }
        @keyframes shine-fast {
          0% { transform: translateX(-100%) skewX(-15deg); }
          100% { transform: translateX(200%) skewX(-15deg); }
        }
        .animate-shine {
          animation: shine 4s linear infinite;
        }
        .animate-shine-fast {
          animation: shine-fast 0.7s ease-in-out;
        }
      `}</style>
    </div>
  );
}