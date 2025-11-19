import { useState } from 'react';

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Navigation({ currentPage, onNavigate }: NavigationProps) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'collections', label: 'Collections' },
    { id: 'heritage', label: 'History' }
  ];

  return (
    <nav id="site-nav" className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-b border-[#a37e2c]/10">
      <div className="max-w-[1600px] mx-auto px-8 py-6 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-3 group"
        >
          <div className="text-[#a37e2c] tracking-[0.3em]" style={{ fontFamily: 'Georgia, serif', fontSize: '1.5rem', fontWeight: 400 }}>
            ROLEX
          </div>
        </button>

        {/* Navigation Items */}
        <div className="flex items-center gap-12">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
              className="relative group"
            >
              <span
                className="tracking-[0.15em] transition-colors duration-300"
                style={{
                  fontFamily: '-apple-system, Helvetica Neue, sans-serif',
                  fontSize: '0.75rem',
                  color: currentPage === item.id ? '#a37e2c' : '#ffffff',
                }}
              >
                {item.label}
              </span>
              <span
                className="absolute bottom-[-4px] left-0 h-[1px] bg-[#a37e2c] transition-all duration-300"
                style={{
                  width: hoveredItem === item.id || currentPage === item.id ? '100%' : '0%',
                }}
              />
            </button>
          ))}
        </div>

        {/* Right Side Items */}
        <div className="flex items-center gap-8">
          <button
            type="button"
            onClick={() => onNavigate('boutiques')}
            className="tracking-[0.15em] hover:text-[#a37e2c] transition-colors"
            style={{ fontFamily: '-apple-system, Helvetica Neue, sans-serif', fontSize: '0.75rem' }}
          >
            BOUTIQUES
          </button>
          <button
            type="button"
            onClick={() => onNavigate('support')}
            className="tracking-[0.15em] hover:text-[#a37e2c] transition-colors"
            style={{ fontFamily: '-apple-system, Helvetica Neue, sans-serif', fontSize: '0.75rem' }}
          >
            SUPPORT
          </button>
        </div>
      </div>
    </nav>
  );
}
