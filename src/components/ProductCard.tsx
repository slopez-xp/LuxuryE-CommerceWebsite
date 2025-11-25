import React from 'react';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag } from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext'; // Import useStore

// ROLEX GREEN CONSTANT
const ROLEX_GREEN = '#006039';

interface ProductCardProps {
  product: Product;
  viewMode: 'grid' | 'list';
  compareMode: boolean;
  isSelected: boolean;
  onToggleCompare: (id: string) => void;
  onNavigate: (page: string, id: string) => void;
  hoveredCard: string | null;
  setHoveredCard: (id: string | null) => void;
}

const ProductCard = React.forwardRef<HTMLDivElement, ProductCardProps>(
  (
    {
      product,
      viewMode,
      compareMode,
      isSelected,
      onToggleCompare,
      onNavigate,
      hoveredCard,
      setHoveredCard,
    },
    ref
  ) => {
    const { addToCart, addToWishlist, wishlistItems } = useStore(); // Use the store
    const isWishlisted = wishlistItems.some(item => item.id === product.id);

    const imageUrl = product.images && product.images.length > 0 ? product.images[0] : '';
    const productDescription = product.description || '';
    const productCategory = product.category || '';
    const productMaterial = product.material || '';
    const productSize = product.size || '';

    return (
      <motion.div
        ref={ref}
        layout
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
        id={`product-${product.id}`}
        className={`group relative cursor-pointer overflow-hidden bg-[#0a0a0a] border border-[#a37e2c]/10 transition-all duration-500 ease-in-out ${
          viewMode === 'grid' 
            ? 'hover:scale-[1.02] hover:shadow-lg hover:shadow-[#a37e2c]/20' 
            : 'flex gap-6'
        } ${
          compareMode && isSelected
            ? 'ring-2 ring-[#a37e2c] ring-offset-2 ring-offset-black'
            : 'hover:border-[#a37e2c]/40'
        }`}
        onMouseEnter={() => setHoveredCard(product.id)}
        onMouseLeave={() => setHoveredCard(null)}
        onClick={() => { // Click image for navigation if not compare mode
            if (!compareMode) {
              onNavigate('product', product.id);
            }
          }}
      >
        {/* Compare Checkbox (Visible in Compare Mode) */}
        {compareMode && (
          <div className="absolute top-4 left-4 z-30">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleCompare(product.id);
              }}
              className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all ${
                isSelected
                  ? 'bg-[#a37e2c] border-[#a37e2c] text-black'
                  : 'bg-black/50 border-[#a37e2c]/50 text-[#a37e2c] hover:border-[#a37e2c]'
              }`}
            >
              {isSelected && (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
          </div>
        )}

        {/* Badge */}
        {product.badge && (
          <div className="absolute top-4 right-4 z-20 bg-[#a37e2c] text-black px-3 py-1 text-xs tracking-[0.2em] font-bold">
            {product.badge}
          </div>
        )}

        {/* Image Area */}
        <div 
          className={`relative overflow-hidden ${viewMode === 'grid' ? 'aspect-[3/4]' : 'w-48 h-48 flex-shrink-0'}`}
        >
          {imageUrl && (
            <img
              src={imageUrl}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
          
        </div>

        {/* Text Content */}
        <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
          <h3
            className="mb-2 text-white tracking-[0.1em]"
            style={{
              fontFamily: '-apple-system, Helvetica Neue, sans-serif',
              fontSize: viewMode === 'grid' ? '0.95rem' : '1.1rem',
              fontWeight: 600,
            }}
          >
            {product.name}
          </h3>
          <p
            className={`text-[#cccccc] mb-4 ${viewMode === 'list' ? 'text-base' : 'text-sm'}`}
            style={{
              fontFamily: '-apple-system, Helvetica Neue, sans-serif',
              lineHeight: 1.6,
            }}
          >
            {productDescription}
          </p>
          <div className="flex items-center justify-between">
            <p
              className="text-[#a37e2c] text-lg font-semibold"
              style={{
                fontFamily: '-apple-system, Helvetica Neue, sans-serif',
              }}
            >
              {product.formattedPrice}
            </p>
            {viewMode === 'grid' && !compareMode && (
              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={hoveredCard === product.id ? { y: 0, opacity: 1 } : { y: 10, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-2 text-[#a37e2c]"
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addToWishlist(product.id); // Add to wishlist
                  }}
                  className="p-2 hover:bg-[#a37e2c]/10 rounded transition-colors"
                >
                  <Heart size={18} className={isWishlisted ? 'fill-current' : ''} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(product.id); // Add to cart
                  }}
                  className="p-2 hover:bg-[#a37e2c]/10 rounded transition-colors"
                >
                  <ShoppingBag size={18} />
                </button>
              </motion.div>
            )}
          </div>
          {viewMode === 'list' && (
            <div className="mt-4 flex flex-col gap-2">
              <span
                className="text-[#999999] text-sm"
                style={{ fontFamily: '-apple-system, Helvetica Neue, sans-serif' }}
              >
                {productCategory} • {productMaterial} • {productSize}
              </span>
              {!compareMode && (
                <div className="flex items-center gap-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(product.id);
                    }}
                    className="flex-1 px-4 py-2 bg-[#a37e2c] text-black text-xs font-bold tracking-widest hover:bg-[#d4af37] transition-colors flex items-center justify-center gap-2"
                  >
                    <ShoppingBag size={16} /> ADD TO CART
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToWishlist(product.id);
                    }}
                    className="flex-1 px-4 py-2 border border-[#a37e2c]/50 text-[#a37e2c] text-xs font-bold tracking-widest hover:bg-[#a37e2c]/10 transition-colors flex items-center justify-center gap-2"
                  >
                    <Heart size={16} className={isWishlisted ? 'fill-current' : ''} /> {isWishlisted ? 'IN WISHLIST' : 'ADD TO WISHLIST'}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </motion.div>
    );
  }
);

ProductCard.displayName = 'ProductCard';

export default ProductCard;