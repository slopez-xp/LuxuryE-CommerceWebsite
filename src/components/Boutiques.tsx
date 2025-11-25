import { useState } from 'react';
import { MapPin, Phone, Clock, Search } from 'lucide-react';

// ROLEX GREEN CONSTANT
const ROLEX_GREEN = '#006039';

interface BoutiquesProps {
  onNavigate: (page: string) => void;
}

export function Boutiques({ onNavigate }: BoutiquesProps) {
  const [selectedCity, setSelectedCity] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const boutiques = [
    {
      id: 1,
      name: 'Rolex Geneva - Rue du Rhône',
      city: 'Geneva',
      country: 'Switzerland',
      address: '12 Rue du Rhône, 1204 Geneva',
      phone: '+41 22 123 4567',
      hours: 'Mon-Sat: 10:00 - 19:00',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80',
      featured: true
    },
    {
      id: 2,
      name: 'Rolex Paris - Place Vendôme',
      city: 'Paris',
      country: 'France',
      address: '8 Place Vendôme, 75001 Paris',
      phone: '+33 1 42 86 82 82',
      hours: 'Mon-Sat: 10:30 - 19:00',
      image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&q=80',
      featured: true
    },
    {
      id: 3,
      name: 'Rolex London - Bond Street',
      city: 'London',
      country: 'United Kingdom',
      address: '155 New Bond Street, W1S 2TW London',
      phone: '+44 20 7629 1234',
      hours: 'Mon-Sat: 10:00 - 18:00',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
      featured: false
    },
    {
      id: 4,
      name: 'Rolex New York - Fifth Avenue',
      city: 'New York',
      country: 'United States',
      address: '665 Fifth Avenue, NY 10022',
      phone: '+1 212 758 7700',
      hours: 'Mon-Sat: 10:00 - 19:00',
      image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&q=80',
      featured: true
    },
    {
      id: 5,
      name: 'Rolex Dubai - Dubai Mall',
      city: 'Dubai',
      country: 'United Arab Emirates',
      address: 'The Dubai Mall, Downtown Dubai',
      phone: '+971 4 339 8888',
      hours: 'Sun-Thu: 10:00 - 23:00',
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80',
      featured: false
    },
    {
      id: 6,
      name: 'Rolex Tokyo - Ginza',
      city: 'Tokyo',
      country: 'Japan',
      address: '5-7-10 Ginza, Chuo-ku, Tokyo',
      phone: '+81 3 3571 1111',
      hours: 'Mon-Sun: 11:00 - 20:00',
      image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80',
      featured: false
    }
  ];

  const cities = ['all', ...new Set(boutiques.map(b => b.city))];

  const filteredBoutiques = boutiques.filter(boutique => {
    const matchesCity = selectedCity === 'all' || boutique.city === selectedCity;
    const matchesSearch = boutique.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          boutique.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          boutique.country.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCity && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-black pt-0 pb-20">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden mb-20">
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at center, #1a1a1a 0%, #000000 70%)',
          }}
        />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="relative z-10 text-center px-8">
          <div
            className="mb-6 text-[#a37e2c] tracking-[0.3em]"
            style={{
              fontFamily: '-apple-system, Helvetica Neue, sans-serif',
              fontSize: '0.75rem',
              fontWeight: 500,
            }}
          >
            FIND YOUR NEAREST
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
            Rolex Boutiques
          </h1>
          <p
            className="max-w-[600px] mx-auto text-[#cccccc]"
            style={{
              fontFamily: '-apple-system, Helvetica Neue, sans-serif',
              fontSize: '1.125rem',
              lineHeight: 1.8,
              letterSpacing: '0.02em',
            }}
          >
            Visit our exclusive boutiques worldwide for an exceptional shopping experience
          </p>
        </div>
      </section>

      {/* Search and Filter Section */}
      <div className="max-w-[1400px] mx-auto px-8 mb-16">
        <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-[500px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#a37e2c]" size={20} />
            <input
              type="text"
              placeholder="Search by city or country..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#1a1a1a] border border-[#a37e2c]/20 text-white pl-12 pr-4 py-4 rounded-none focus:outline-none focus:border-[#a37e2c] transition-colors"
              style={{
                fontFamily: '-apple-system, Helvetica Neue, sans-serif',
                fontSize: '0.95rem',
              }}
            />
          </div>

          {/* City Filter */}
          <div className="flex gap-3 flex-wrap justify-center">
            {cities.map((city) => (
              <button
                key={city}
                onClick={() => setSelectedCity(city)}
                className={`px-6 py-3 border transition-all duration-300 tracking-[0.15em] ${
                  selectedCity === city
                    ? 'bg-[#a37e2c] text-black border-[#a37e2c]'
                    : 'bg-transparent text-[#a37e2c] border-[#a37e2c]/30 hover:border-[#a37e2c]'
                }`}
                style={{
                  fontFamily: '-apple-system, Helvetica Neue, sans-serif',
                  fontSize: '0.75rem',
                  fontWeight: 500,
                }}
              >
                {city.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Boutiques Grid */}
      <div className="max-w-[1400px] mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBoutiques.map((boutique) => (
            <div
              key={boutique.id}
              className="group relative bg-[#0a0a0a] border transition-all duration-500 overflow-hidden"
              style={{ borderColor: 'rgba(163, 126, 44, 0.1)' }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${ROLEX_GREEN}50`; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(163, 126, 44, 0.1)'; }}
            >
              {/* Image */}
              <div className="relative h-[280px] overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{
                    backgroundImage: `url(${boutique.image})`,
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                {boutique.featured && (
                  <div
                    className="absolute top-4 left-4 bg-[#a37e2c] text-black px-4 py-2 tracking-[0.2em]"
                    style={{
                      fontFamily: '-apple-system, Helvetica Neue, sans-serif',
                      fontSize: '0.65rem',
                      fontWeight: 600,
                    }}
                  >
                    FLAGSHIP
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-8">
                <h3
                  className="mb-2 text-white"
                  style={{
                    fontFamily: 'Playfair Display, Georgia, serif',
                    fontSize: '1.5rem',
                    fontWeight: 400,
                  }}
                >
                  {boutique.name}
                </h3>
                <div
                  className="mb-6 text-[#a37e2c] tracking-[0.15em]"
                  style={{
                    fontFamily: '-apple-system, Helvetica Neue, sans-serif',
                    fontSize: '0.75rem',
                  }}
                >
                  {boutique.country}
                </div>

                {/* Details */}
                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3">
                    <MapPin 
                      className="flex-shrink-0 mt-1 transition-colors duration-300" 
                      size={16}
                      style={{ color: '#a37e2c' }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = ROLEX_GREEN; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = '#a37e2c'; }}
                    />
                    <span
                      className="text-[#cccccc]"
                      style={{
                        fontFamily: '-apple-system, Helvetica Neue, sans-serif',
                        fontSize: '0.9rem',
                        lineHeight: 1.6,
                      }}
                    >
                      {boutique.address}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="text-[#a37e2c] flex-shrink-0" size={16} />
                    <span
                      className="text-[#cccccc]"
                      style={{
                        fontFamily: '-apple-system, Helvetica Neue, sans-serif',
                        fontSize: '0.9rem',
                      }}
                    >
                      {boutique.phone}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="text-[#a37e2c] flex-shrink-0" size={16} />
                    <span
                      className="text-[#cccccc]"
                      style={{
                        fontFamily: '-apple-system, Helvetica Neue, sans-serif',
                        fontSize: '0.9rem',
                      }}
                    >
                      {boutique.hours}
                    </span>
                  </div>
                </div>

                {/* CTA Button */}
                <button
                  className="w-full py-3 border border-[#a37e2c] text-[#a37e2c] hover:bg-[#a37e2c] hover:text-black transition-all duration-300 tracking-[0.15em]"
                  style={{
                    fontFamily: '-apple-system, Helvetica Neue, sans-serif',
                    fontSize: '0.75rem',
                    fontWeight: 500,
                  }}
                >
                  BOOK APPOINTMENT
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredBoutiques.length === 0 && (
          <div className="text-center py-20">
            <p
              className="text-[#999999]"
              style={{
                fontFamily: '-apple-system, Helvetica Neue, sans-serif',
                fontSize: '1.1rem',
              }}
            >
              No boutiques found matching your search criteria.
            </p>
          </div>
        )}
      </div>

      {/* Contact Section */}
      <section className="mt-32 py-20 px-8 bg-[#0a0a0a]">
        <div className="max-w-[800px] mx-auto text-center">
          <h2
            className="mb-6 text-white"
            style={{
              fontFamily: 'Playfair Display, Georgia, serif',
              fontSize: '2.5rem',
              fontWeight: 400,
            }}
          >
            Can't Find a Boutique Near You?
          </h2>
          <p
            className="mb-8 text-[#cccccc]"
            style={{
              fontFamily: '-apple-system, Helvetica Neue, sans-serif',
              fontSize: '1.05rem',
              lineHeight: 1.8,
            }}
          >
            Contact our customer service team to find an authorized Rolex retailer in your area
          </p>
          <button
            onClick={() => onNavigate('support')}
            className="px-12 py-4 border-2 border-[#a37e2c] text-[#a37e2c] hover:bg-[#a37e2c] hover:text-black transition-all duration-300 tracking-[0.15em]"
            style={{
              fontFamily: '-apple-system, Helvetica Neue, sans-serif',
              fontSize: '0.875rem',
              fontWeight: 500,
            }}
          >
            CONTACT SUPPORT
          </button>
        </div>
      </section>
    </div>
  );
}