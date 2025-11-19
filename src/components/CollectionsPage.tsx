import { useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Collection {
  id: string;
  name: string;
  description: string;
  image: string;
}

interface CollectionsPageProps {
  onNavigate: (page: string, productId?: string) => void;
}

export function CollectionsPage({ onNavigate }: CollectionsPageProps) {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const collections: Collection[] = [
    {
      id: 'datejust',
      name: 'DATEJUST',
      description: 'The classic watch of reference, for men and women',
      image: 'https://images.unsplash.com/photo-1649357584808-333476473dce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2xleCUyMGRhdGVqdXN0JTIwc3RlZWx8ZW58MXx8fHwxNzYzNTU3MTQxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      id: 'daytona',
      name: 'COSMOGRAPH DAYTONA',
      description: 'Designed to meet the demands of professional racing drivers',
      image: 'https://images.unsplash.com/photo-1628498643679-fa021dabb3f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2xleCUyMGRheXRvbmElMjBnb2xkfGVufDF8fHx8MTc2MzU1NTAwN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      id: 'gmt-master',
      name: 'GMT-MASTER II',
      description: 'The watch of choice for world travelers',
      image: 'https://images.unsplash.com/photo-1625328923319-74cafe485866?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2xleCUyMGdtdCUyMG1hc3RlcnxlbnwxfHx8fDE3NjM1NTcxNDF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      id: 'submariner',
      name: 'SUBMARINER',
      description: "The diver's watch par excellence",
      image: 'https://images.unsplash.com/photo-1730757679771-b53e798846cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2xleCUyMHN1Ym1hcmluZXIlMjBjbG9zZXxlbnwxfHx8fDE3NjM1NTcxNDB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      id: 'oyster-perpetual',
      name: 'OYSTER PERPETUAL',
      description: 'The quintessential Oyster, in its purest form',
      image: 'https://images.unsplash.com/photo-1706801803974-fc52c9aaac6c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2xleCUyMG95c3RlciUyMHBlcnBldHVhbHxlbnwxfHx8fDE3NjM1NTcxNDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      id: 'sky-dweller',
      name: 'SKY-DWELLER',
      description: 'An elegant watch of exceptional sophistication',
      image: 'https://images.unsplash.com/photo-1762592033298-d866290f1508?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwcm9sZXglMjBoZXJpdGFnZXxlbnwxfHx8fDE3NjM1NTcxNDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
  ];

  return (
    <div className="min-h-screen bg-black pt-32 pb-24 px-8">
      {/* Header */}
      <div className="max-w-[1600px] mx-auto mb-20 text-center">
        <div
          className="mb-6 text-[#a37e2c] tracking-[0.3em]"
          style={{
            fontFamily: '-apple-system, Helvetica Neue, sans-serif',
            fontSize: '0.75rem',
            fontWeight: 500,
          }}
        >
          ROLEX COLLECTIONS
        </div>
        <h1
          className="mb-8 text-white"
          style={{
            fontFamily: 'Playfair Display, Georgia, serif',
            fontSize: '4rem',
            fontWeight: 400,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
          }}
        >
          Timeless Icons
        </h1>
        <p
          className="max-w-[700px] mx-auto text-[#cccccc]"
          style={{
            fontFamily: '-apple-system, Helvetica Neue, sans-serif',
            fontSize: '1.125rem',
            lineHeight: 1.8,
            letterSpacing: '0.02em',
          }}
        >
          Each Rolex collection represents a unique fusion of form and function, designed for those who demand excellence.
        </p>
      </div>

      {/* Collections Grid */}
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {collections.map((collection) => (
          <div
            key={collection.id}
            className="group relative cursor-pointer"
            onMouseEnter={() => setHoveredCard(collection.id)}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={() => onNavigate('product', collection.id)}
          >
            {/* Card Background */}
            <div className="relative overflow-hidden rounded-lg bg-gradient-to-b from-[#0a0a0a] to-[#000000] border border-[#a37e2c]/10 transition-all duration-500 hover:border-[#a37e2c]/40">
              {/* Image Container */}
              <div className="relative aspect-[4/5] overflow-hidden">
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10"
                  style={{
                    opacity: hoveredCard === collection.id ? 0.6 : 0.8,
                  }}
                />
                <ImageWithFallback
                  src={collection.image}
                  alt={collection.name}
                  className="w-full h-full object-cover transition-transform duration-700"
                  style={{
                    transform: hoveredCard === collection.id ? 'scale(1.08)' : 'scale(1)',
                  }}
                />
              </div>

              {/* Content */}
              <div className="relative p-8">
                <h3
                  className="mb-3 text-white tracking-[0.15em]"
                  style={{
                    fontFamily: '-apple-system, Helvetica Neue, sans-serif',
                    fontSize: '0.95rem',
                    fontWeight: 500,
                  }}
                >
                  {collection.name}
                </h3>
                <p
                  className="text-[#999999] mb-6"
                  style={{
                    fontFamily: '-apple-system, Helvetica Neue, sans-serif',
                    fontSize: '0.9rem',
                    lineHeight: 1.6,
                  }}
                >
                  {collection.description}
                </p>

                {/* Explore Button */}
                <div
                  className="overflow-hidden"
                  style={{
                    maxHeight: hoveredCard === collection.id ? '50px' : '0px',
                    transition: 'max-height 0.4s ease',
                  }}
                >
                  <button className="w-full py-3 border border-[#a37e2c] text-[#a37e2c] hover:bg-[#a37e2c] hover:text-black transition-all duration-300 tracking-[0.15em]"
                    style={{
                      fontFamily: '-apple-system, Helvetica Neue, sans-serif',
                      fontSize: '0.8rem',
                      fontWeight: 500,
                    }}
                  >
                    EXPLORE
                  </button>
                </div>
              </div>
            </div>

            {/* Gold accent line */}
            <div
              className="absolute top-0 left-0 h-1 bg-gradient-to-r from-[#a37e2c] to-transparent transition-all duration-500"
              style={{
                width: hoveredCard === collection.id ? '100%' : '0%',
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
