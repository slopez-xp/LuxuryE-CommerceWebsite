import { useState } from 'react';
import { Heart, RotateCw } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ProductDetailPageProps {
  productId: string;
  onNavigate: (page: string) => void;
}

export function ProductDetailPage({ productId, onNavigate }: ProductDetailPageProps) {
  const [activeTab, setActiveTab] = useState<'movement' | 'case' | 'dial' | 'bracelet'>('movement');
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Product data based on ID
  const productData: Record<string, any> = {
    datejust: {
      name: 'DATEJUST 41',
      subtitle: 'Oyster, 41 mm, Oystersteel and yellow gold',
      image: 'https://images.unsplash.com/photo-1649357584808-333476473dce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2xleCUyMGRhdGVqdXN0JTIwc3RlZWx8ZW58MXx8fHwxNzYzNTU3MTQxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    daytona: {
      name: 'COSMOGRAPH DAYTONA',
      subtitle: 'Oyster, 40 mm, yellow gold',
      image: 'https://images.unsplash.com/photo-1628498643679-fa021dabb3f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2xleCUyMGRheXRvbmElMjBnb2xkfGVufDF8fHx8MTc2MzU1NTAwN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    'gmt-master': {
      name: 'GMT-MASTER II',
      subtitle: 'Oyster, 40 mm, Oystersteel',
      image: 'https://images.unsplash.com/photo-1625328923319-74cafe485866?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2xleCUyMGdtdCUyMG1hc3RlcnxlbnwxfHx8fDE3NjM1NTcxNDF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    submariner: {
      name: 'SUBMARINER DATE',
      subtitle: 'Oyster, 41 mm, Oystersteel',
      image: 'https://images.unsplash.com/photo-1730757679771-b53e798846cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2xleCUyMHN1Ym1hcmluZXIlMjBjbG9zZXxlbnwxfHx8fDE3NjM1NTcxNDB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    'oyster-perpetual': {
      name: 'OYSTER PERPETUAL 41',
      subtitle: 'Oyster, 41 mm, Oystersteel',
      image: 'https://images.unsplash.com/photo-1706801803974-fc52c9aaac6c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2xleCUyMG95c3RlciUyMHBlcnBldHVhbHxlbnwxfHx8fDE3NjM1NTcxNDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    'sky-dweller': {
      name: 'SKY-DWELLER',
      subtitle: 'Oyster, 42 mm, yellow gold',
      image: 'https://images.unsplash.com/photo-1762592033298-d866290f1508?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwcm9sZXglMjBoZXJpdGFnZXxlbnwxfHx8fDE3NjM1NTcxNDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
  };

  const product = productData[productId] || productData.datejust;

  const specs = {
    movement: [
      { label: 'Calibre', value: 'Perpetual, mechanical, self-winding' },
      { label: 'Power Reserve', value: 'Approximately 70 hours' },
      { label: 'Precision', value: '-2/+2 sec/day after casing' },
      { label: 'Functions', value: 'Centre hour, minute, and seconds hands' },
      { label: 'Oscillator', value: 'Paramagnetic blue Parachrom hairspring' },
      { label: 'Winding', value: 'Bidirectional self-winding via Perpetual rotor' },
    ],
    case: [
      { label: 'Diameter', value: '41 mm' },
      { label: 'Material', value: 'Oystersteel' },
      { label: 'Architecture', value: 'Monobloc middle case, screw-down case back and winding crown' },
      { label: 'Winding Crown', value: 'Screw-down, Twinlock double waterproofness system' },
      { label: 'Crystal', value: 'Scratch-resistant sapphire' },
      { label: 'Water Resistance', value: 'Waterproof to 100 metres / 330 feet' },
    ],
    dial: [
      { label: 'Details', value: 'Black' },
      { label: 'Hour Markers', value: 'Chromalight display with long-lasting blue luminescence' },
      { label: 'Hands', value: 'Luminescent' },
      { label: 'Date', value: 'Instantaneous date with rapid setting' },
      { label: 'Cyclops Lens', value: 'Yes, magnifies the date by 2.5' },
    ],
    bracelet: [
      { label: 'Material', value: 'Oystersteel' },
      { label: 'Architecture', value: 'Three-piece solid links' },
      { label: 'Clasp', value: 'Folding Oysterclasp with Easylink 5 mm comfort extension link' },
      { label: 'Finish', value: 'Polished and brushed' },
    ],
  };

  return (
    <div className="min-h-screen bg-black pt-24">
      <div className="max-w-[1800px] mx-auto px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Left - Image */}
          <div className="relative">
            {/* 360° View Indicator */}
            <div className="absolute top-8 right-8 z-20 flex items-center gap-2 bg-black/80 backdrop-blur-sm px-4 py-2 rounded-full border border-[#a37e2c]/30">
              <RotateCw size={16} className="text-[#a37e2c]" />
              <span
                className="text-[#a37e2c] tracking-[0.15em]"
                style={{
                  fontFamily: '-apple-system, Helvetica Neue, sans-serif',
                  fontSize: '0.7rem',
                }}
              >
                360° VIEW
              </span>
            </div>

            {/* Main Image */}
            <div className="relative aspect-square bg-gradient-to-br from-[#1a1a1a] via-[#0a0a0a] to-[#000000] rounded-lg overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <ImageWithFallback
                  src={product.image}
                  alt={product.name}
                  className="w-[85%] h-[85%] object-contain"
                />
              </div>
            </div>

            {/* Technical Badge */}
            <div className="mt-8 flex justify-center">
              <div className="inline-flex items-center gap-3 px-6 py-3 border border-[#a37e2c]/30 rounded-full">
                <div className="w-2 h-2 bg-[#a37e2c] rounded-full animate-pulse" />
                <span
                  className="text-[#a37e2c] tracking-[0.15em]"
                  style={{
                    fontFamily: '-apple-system, Helvetica Neue, sans-serif',
                    fontSize: '0.75rem',
                  }}
                >
                  SUPERLATIVE CHRONOMETER OFFICIALLY CERTIFIED
                </span>
              </div>
            </div>
          </div>

          {/* Right - Details */}
          <div className="flex flex-col">
            {/* Header */}
            <div className="mb-12">
              <div
                className="mb-4 text-[#a37e2c] tracking-[0.3em]"
                style={{
                  fontFamily: '-apple-system, Helvetica Neue, sans-serif',
                  fontSize: '0.75rem',
                  fontWeight: 500,
                }}
              >
                ROLEX {product.name.split(' ')[0]}
              </div>
              <h1
                className="mb-4 text-white"
                style={{
                  fontFamily: 'Playfair Display, Georgia, serif',
                  fontSize: '3.5rem',
                  fontWeight: 400,
                  lineHeight: 1.1,
                  letterSpacing: '-0.02em',
                }}
              >
                {product.name}
              </h1>
              <p
                className="text-[#cccccc]"
                style={{
                  fontFamily: '-apple-system, Helvetica Neue, sans-serif',
                  fontSize: '1.125rem',
                  lineHeight: 1.6,
                }}
              >
                {product.subtitle}
              </p>
            </div>

            {/* Add to Wishlist Button */}
            <button
              onClick={() => setIsWishlisted(!isWishlisted)}
              className={`mb-12 flex items-center justify-center gap-3 px-8 py-4 border-2 transition-all duration-300 ${
                isWishlisted
                  ? 'border-[#a37e2c] bg-[#a37e2c] text-black'
                  : 'border-[#a37e2c] text-[#a37e2c] hover:bg-[#a37e2c] hover:text-black'
              }`}
              style={{
                fontFamily: '-apple-system, Helvetica Neue, sans-serif',
                fontSize: '0.875rem',
                fontWeight: 500,
                letterSpacing: '0.15em',
              }}
            >
              <Heart
                size={20}
                className={isWishlisted ? 'fill-current' : ''}
              />
              {isWishlisted ? 'ADDED TO WISHLIST' : 'ADD TO WISHLIST'}
            </button>

            {/* Technical Specifications Tabs */}
            <div className="flex-1">
              <div
                className="mb-8 text-white tracking-[0.15em]"
                style={{
                  fontFamily: '-apple-system, Helvetica Neue, sans-serif',
                  fontSize: '0.85rem',
                  fontWeight: 500,
                }}
              >
                TECHNICAL SPECIFICATIONS
              </div>

              {/* Tab Navigation */}
              <div className="flex gap-2 mb-8 border-b border-[#a37e2c]/10">
                {(['movement', 'case', 'dial', 'bracelet'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-3 transition-all duration-300 ${
                      activeTab === tab
                        ? 'border-b-2 border-[#a37e2c] text-[#a37e2c]'
                        : 'text-[#999999] hover:text-white'
                    }`}
                    style={{
                      fontFamily: '-apple-system, Helvetica Neue, sans-serif',
                      fontSize: '0.8rem',
                      fontWeight: 500,
                      letterSpacing: '0.15em',
                    }}
                  >
                    {tab.toUpperCase()}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="space-y-6 max-h-[400px] overflow-y-auto pr-4">
                {specs[activeTab].map((spec, index) => (
                  <div
                    key={index}
                    className="border-b border-[#a37e2c]/10 pb-6"
                  >
                    <div
                      className="mb-2 text-[#a37e2c] tracking-[0.15em]"
                      style={{
                        fontFamily: '-apple-system, Helvetica Neue, sans-serif',
                        fontSize: '0.7rem',
                        fontWeight: 500,
                      }}
                    >
                      {spec.label}
                    </div>
                    <div
                      className="text-[#cccccc]"
                      style={{
                        fontFamily: '-apple-system, Helvetica Neue, sans-serif',
                        fontSize: '0.95rem',
                        lineHeight: 1.6,
                      }}
                    >
                      {spec.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Find a Boutique */}
            <div className="mt-12 pt-8 border-t border-[#a37e2c]/10">
              <button
                className="text-[#a37e2c] hover:text-[#c5a85f] transition-colors tracking-[0.15em] inline-flex items-center gap-2"
                onClick={() => onNavigate('boutiques')}
                style={{
                  fontFamily: '-apple-system, Helvetica Neue, sans-serif',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                }}
              >
                FIND A ROLEX BOUTIQUE
                <span className="text-lg">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
