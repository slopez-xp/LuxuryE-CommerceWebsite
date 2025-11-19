import { useState, useEffect } from 'react';
import { VideoWithFallback } from './figma/VideoWithFallback';
import { ChevronDown } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import heroMp4 from '../assests/hero-video.mp4';

interface HomepageProps {
  onNavigate: (page: string) => void;
  navHeight?: number;
}

export function Homepage({ onNavigate, navHeight = 0 }: HomepageProps) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // compute hero height so it fits viewport minus navbar
  const heroStyle: React.CSSProperties = {
    height: `calc(100vh - ${navHeight}px)`,
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section
        className="relative flex items-center justify-center overflow-hidden"
        style={heroStyle}
      >
        {/* Gradient Background */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at center, #1a1a1a 0%, #000000 70%)',
          }}
        />

        {/* Hero Image with Parallax */}
        <div
          className="absolute inset-0 flex items-center justify-center z-0"
          style={{
            transform: `translateY(${scrollY * 0.3}px)`,
          }}
        >
          <VideoWithFallback
            src={heroMp4}
            poster="https://images.unsplash.com/photo-1749831754129-3a84b9fdeb87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
            alt="Rolex Oyster Perpetual"
            className="w-full h-full object-cover"
          />
          {/* Dark overlay to make text more readable */}
          <div className="absolute inset-0 bg-black/60 pointer-events-none" />
        </div>

        {/* Hero Text */}
        <div className="relative z-30 text-center px-8">
          <div
            className="mb-6 text-[#a37e2c] tracking-[0.3em]"
            style={{
              fontFamily: '-apple-system, Helvetica Neue, sans-serif',
              fontSize: '0.75rem',
              fontWeight: 500,
            }}
          >
            THE OYSTER PERPETUAL
          </div>
          <h1
            className="mb-8 text-white"
            style={{
              fontFamily: 'Playfair Display, Georgia, serif',
              fontSize: '4.5rem',
              fontWeight: 400,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}
          >
            A Symphony of
            <br />
            Precision
          </h1>
          <p
            className="max-w-[600px] mx-auto mb-12 text-[#cccccc]"
            style={{
              fontFamily: '-apple-system, Helvetica Neue, sans-serif',
              fontSize: '1.125rem',
              lineHeight: 1.8,
              letterSpacing: '0.02em',
            }}
          >
            Every Rolex watch is a masterpiece of engineering, designed to last a lifetime and beyond.
          </p>
          <button
            onClick={() => onNavigate('collections')}
            className="px-12 py-4 border-2 border-[#a37e2c] text-[#a37e2c] hover:bg-[#a37e2c] hover:text-black transition-all duration-300 tracking-[0.15em]"
            style={{
              fontFamily: '-apple-system, Helvetica Neue, sans-serif',
              fontSize: '0.875rem',
              fontWeight: 500,
            }}
          >
            EXPLORE COLLECTIONS
          </button>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-40">
          <ChevronDown className="text-[#a37e2c]" size={32} />
        </div>
      </section>

      {/* Feature Sections */}
      <section className="py-32 px-8">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-16">
          {/* Precision */}
          <div className="text-center">
            <div className="mb-6 w-1 h-20 bg-gradient-to-b from-[#a37e2c] to-transparent mx-auto" />
            <h3
              className="mb-4 text-white"
              style={{
                fontFamily: 'Playfair Display, Georgia, serif',
                fontSize: '1.5rem',
                fontWeight: 400,
              }}
            >
              Swiss Precision
            </h3>
            <p
              className="text-[#999999] max-w-[300px] mx-auto"
              style={{
                fontFamily: '-apple-system, Helvetica Neue, sans-serif',
                fontSize: '0.95rem',
                lineHeight: 1.8,
              }}
            >
              Every movement is crafted in-house to meet the most exacting standards of Swiss watchmaking.
            </p>
          </div>

          {/* Oyster Case */}
          <div className="text-center">
            <div className="mb-6 w-1 h-20 bg-gradient-to-b from-[#a37e2c] to-transparent mx-auto" />
            <h3
              className="mb-4 text-white"
              style={{
                fontFamily: 'Playfair Display, Georgia, serif',
                fontSize: '1.5rem',
                fontWeight: 400,
              }}
            >
              Oyster Case
            </h3>
            <p
              className="text-[#999999] max-w-[300px] mx-auto"
              style={{
                fontFamily: '-apple-system, Helvetica Neue, sans-serif',
                fontSize: '0.95rem',
                lineHeight: 1.8,
              }}
            >
              Waterproof, robust, and elegant. The iconic Oyster case has defined watchmaking since 1926.
            </p>
          </div>

          {/* Heritage */}
          <div className="text-center">
            <div className="mb-6 w-1 h-20 bg-gradient-to-b from-[#a37e2c] to-transparent mx-auto" />
            <h3
              className="mb-4 text-white"
              style={{
                fontFamily: 'Playfair Display, Georgia, serif',
                fontSize: '1.5rem',
                fontWeight: 400,
              }}
            >
              Century of Excellence
            </h3>
            <p
              className="text-[#999999] max-w-[300px] mx-auto"
              style={{
                fontFamily: '-apple-system, Helvetica Neue, sans-serif',
                fontSize: '0.95rem',
                lineHeight: 1.8,
              }}
            >
              Since 1905, Rolex has been at the forefront of horological innovation and achievement.
            </p>
          </div>
        </div>
      </section>

      {/* Craftsmanship Section */}
      <section className="relative py-48 px-8 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, #000000 0%, #1a1a1a 50%, #000000 100%)',
          }}
        />
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
                fontSize: '3rem',
                fontWeight: 400,
                lineHeight: 1.2,
                letterSpacing: '-0.01em',
              }}
            >
              The Art of
              <br />
              Watchmaking
            </h2>
            <p
              className="mb-6 text-[#cccccc]"
              style={{
                fontFamily: '-apple-system, Helvetica Neue, sans-serif',
                fontSize: '1.05rem',
                lineHeight: 1.8,
                letterSpacing: '0.01em',
              }}
            >
              Each Rolex watch is assembled by hand and tested rigorously to ensure it meets our superlative standards. The result is a timepiece of unparalleled precision and reliability.
            </p>
            <button
              onClick={() => onNavigate('heritage')}
              className="text-[#a37e2c] hover:text-[#c5a85f] transition-colors tracking-[0.15em] inline-flex items-center gap-2"
              style={{
                fontFamily: '-apple-system, Helvetica Neue, sans-serif',
                fontSize: '0.875rem',
                fontWeight: 500,
              }}
            >
              DISCOVER OUR HERITAGE
              <span className="text-lg">→</span>
            </button>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black" />
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1763226015334-9a2d3fb11ea5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB3YXRjaCUyMG1vdmVtZW50fGVufDF8fHx8MTc2MzU1NzE0Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Watch Movement"
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
