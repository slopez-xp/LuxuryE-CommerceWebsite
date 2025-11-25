import React, { useState, useMemo, useEffect } from 'react';
import { ChevronDown, X, Grid, List, Filter, Search, AlertCircle, Loader, ShoppingBag, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabase';
import ProductCard from './ProductCard'; // Import the new ProductCard
import { Product } from '../types'; // Import Product from types.ts
import { useStore } from '../context/StoreContext';

// ROLEX GREEN CONSTANT
const ROLEX_GREEN = '#006039';

interface CollectionsPageProps {
  onNavigate: (page: string, productId?: string) => void;
}

// --- MAIN COMPONENT ---
export function CollectionsPage({ onNavigate }: CollectionsPageProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<string>('relevance');
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [compareMode, setCompareMode] = useState(false);
  const [selectedForCompare, setSelectedForCompare] = useState<string[]>([]);
  const { addToCart, addToWishlist, wishlistItems } = useStore();

  // Filter states
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [selectedMaterial, setSelectedMaterial] = useState<string[]>([]);
  const [selectedSize, setSelectedSize] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 90000]);

  // Collapsible Filter Sections
  const [expandedFilters, setExpandedFilters] = useState<Record<string, boolean>>({
    category: true,
    material: true,
    size: true,
    price: true,
  });

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data, error } = await supabase.from('products').select('*');
        if (error) {
          throw error;
        }
        const mappedProducts: Product[] = data.map((p: any) => ({
          ...p,
          price: p.price,
          formattedPrice: `$${p.price.toLocaleString()}`,
          priceValue: p.price,
          material: p.material || 'N/A', 
          size: p.size || 'N/A',         
          badge: p.is_featured ? 'Featured' : undefined,
        }));
        setProducts(mappedProducts);
      } catch (err) {
        setError('Failed to fetch products.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);


  const categories = ['Classic', 'Professional'];
  const materials = ['Oystersteel', 'Yellow Gold', 'White Gold', 'Platinum'];
  const sizes = ['36mm', '40mm', '41mm', '42mm'];

  // --- ACTIONS ---

  const toggleFilter = (type: string, value: string) => {
    if (type === 'category') {
      setSelectedCategory((prev) =>
        prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
      );
    } else if (type === 'material') {
      setSelectedMaterial((prev) =>
        prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
      );
    } else if (type === 'size') {
      setSelectedSize((prev) =>
        prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
      );
    }
  };

  const clearFilters = () => {
    setSelectedCategory([]);
    setSelectedMaterial([]);
    setSelectedSize([]);
    setPriceRange([0, 90000]);
    setSearchQuery('');
  };

  const removeFilter = (filter: string) => {
    if (selectedCategory.includes(filter)) {
      setSelectedCategory(selectedCategory.filter((f) => f !== filter));
    } else if (selectedMaterial.includes(filter)) {
      setSelectedMaterial(selectedMaterial.filter((f) => f !== filter));
    } else if (selectedSize.includes(filter)) {
      setSelectedSize(selectedSize.filter((f) => f !== filter));
    }
  };

  const toggleCompare = (productId: string) => {
    setSelectedForCompare((prev) => {
      if (prev.includes(productId)) {
        return prev.filter((id) => id !== productId);
      } else if (prev.length < 3) {
        return [...prev, productId];
      }
      return prev;
    });
  };

  // --- MEMOIZED FILTERING LOGIC (Performance Optimization) ---
  const processedProducts = useMemo(() => {
    // 1. Filter
    const filtered = products.filter((product) => {
      const productCategory = product.category || '';
      const productMaterial = product.material || '';
      const productSize = product.size || '';

      if (selectedCategory.length > 0 && !selectedCategory.includes(productCategory)) return false;
      if (selectedMaterial.length > 0 && !selectedMaterial.includes(productMaterial)) return false;
      if (selectedSize.length > 0 && !selectedSize.includes(productSize)) return false;
      if (product.priceValue < priceRange[0] || product.priceValue > priceRange[1]) return false;
      if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    });

    // 2. Sort
    return filtered.sort((a, b) => {
      if (sortBy === 'price-low') return a.priceValue - b.priceValue;
      if (sortBy === 'price-high') return b.priceValue - a.priceValue;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return 0;
    });
  }, [products, selectedCategory, selectedMaterial, selectedSize, priceRange, searchQuery, sortBy]);

  const allActiveFilters = [...selectedCategory, ...selectedMaterial, ...selectedSize];

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader className="text-rolex-gold animate-spin" size={48} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-red-500">
        <AlertCircle className="mr-2" /> {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-0 pb-24">
      <div className="max-w-[1600px] mx-auto px-4 md:px-8">
        
        {/* --- STATUS AREA: ALERTS AND FILTERS --- */}
        <div className="flex flex-col gap-4 mb-6">
          {/* Compare Mode Active Banner */}
          <AnimatePresence>
            {compareMode && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="w-full overflow-hidden"
              >
                <div className="p-3 bg-[#a37e2c]/10 backdrop-blur-xl border border-[#a37e2c]/40 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <AlertCircle className="text-[#a37e2c]" size={20} />
                      <div>
                        <span className="text-[#a37e2c] block sm:inline mr-2" style={{ fontFamily: '-apple-system, Helvetica Neue, sans-serif', fontSize: '0.85rem', fontWeight: 600 }}>
                          Compare Mode Active
                        </span>
                        <span className="text-[#cccccc]" style={{ fontFamily: '-apple-system, Helvetica Neue, sans-serif', fontSize: '0.8rem' }}>
                          Select up to 3 watches ({selectedForCompare.length}/3)
                        </span>
                      </div>
                    </div>
                    {selectedForCompare.length >= 2 && (
                      <button
                        className="px-4 py-1.5 bg-[#a37e2c] text-black hover:bg-[#d4af37] transition-all text-xs rounded-sm font-semibold whitespace-nowrap"
                      >
                        COMPARE ({selectedForCompare.length})
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Active Filters Banner */}
          {allActiveFilters.length > 0 && (
            <div className="p-4 bg-[#0a0a0a]/60 backdrop-blur-xl border border-[#a37e2c]/20 rounded-lg">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-[#999999]" style={{ fontFamily: '-apple-system, Helvetica Neue, sans-serif', fontSize: '0.875rem', fontWeight: 500 }}>
                  Active Filters:
                </span>
                {allActiveFilters.map((filter) => (
                  <button
                    key={filter}
                    onClick={() => removeFilter(filter)}
                    className="flex items-center gap-2 px-4 py-2 bg-[#a37e2c]/10 backdrop-blur-md border border-[#a37e2c]/30 text-[#a37e2c] hover:bg-[#a37e2c]/20 hover:border-[#a37e2c] transition-all rounded-full"
                    style={{ fontFamily: '-apple-system, Helvetica Neue, sans-serif', fontSize: '0.8rem', fontWeight: 500 }}
                  >
                    {filter}
                    <X size={14} />
                  </button>
                ))}
                <button
                  onClick={clearFilters}
                  className="text-[#999999] hover:text-[#a37e2c] transition-colors underline ml-2"
                  style={{ fontFamily: '-apple-system, Helvetica Neue, sans-serif', fontSize: '0.8rem' }}
                >
                  Clear all
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-8">
          {/* --- FILTER SIDEBAR (Desktop) --- */}
          {/* FIX: Added sticky logic + max-height/overflow for internal scrolling */}
          <aside className="hidden lg:block w-[300px] flex-shrink-0">
            <div className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto custom-scrollbar bg-[#0a0a0a]/80 backdrop-blur-xl rounded-lg border border-[#a37e2c]/20 p-6 space-y-6 shadow-[0_8px_32px_rgba(163,126,44,0.1)]">
              <div className="flex items-center justify-between mb-4">
                <h2
                  className="text-white tracking-[0.15em]"
                  style={{
                    fontFamily: '-apple-system, Helvetica Neue, sans-serif',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                  }}
                >
                  FILTERS
                </h2>
                {allActiveFilters.length > 0 && (
                  <button
                    onClick={clearFilters}
                    className="text-[#a37e2c] hover:text-[#d4af37] transition-colors text-xs font-semibold"
                  >
                    CLEAR
                  </button>
                )}
              </div>

              {/* Category Filter */}
              <div className="pb-6 border-b border-[#a37e2c]/10">
                <button
                  onClick={() => setExpandedFilters({ ...expandedFilters, category: !expandedFilters.category })}
                  className="w-full flex items-center justify-between mb-4 text-white hover:text-[#a37e2c] transition-colors"
                  style={{ fontFamily: '-apple-system, Helvetica Neue, sans-serif', fontSize: '0.875rem', fontWeight: 600 }}
                >
                  CATEGORY
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-300 ${expandedFilters.category ? 'rotate-180' : ''}`}
                  />
                </button>
                <AnimatePresence>
                  {expandedFilters.category && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="space-y-3 overflow-hidden"
                    >
                      {categories.map((category) => (
                        <label
                          key={category}
                          className="flex items-center gap-3 cursor-pointer group"
                        >
                          <div className="relative">
                            <input
                              type="checkbox"
                              checked={selectedCategory.includes(category)}
                              onChange={() => toggleFilter('category', category)}
                              className="w-4 h-4 appearance-none border-2 border-[#a37e2c]/40 rounded bg-transparent checked:bg-[#a37e2c] checked:border-[#a37e2c] transition-all cursor-pointer"
                            />
                            {selectedCategory.includes(category) && (
                              <svg className="absolute top-0 left-0 w-4 h-4 text-black pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </div>
                          <span className="text-[#cccccc] group-hover:text-white transition-colors text-sm">
                            {category}
                          </span>
                        </label>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Material Filter */}
              <div className="pb-6 border-b border-[#a37e2c]/10">
                <button
                  onClick={() => setExpandedFilters({ ...expandedFilters, material: !expandedFilters.material })}
                  className="w-full flex items-center justify-between mb-4 text-white hover:text-[#a37e2c] transition-colors"
                  style={{ fontFamily: '-apple-system, Helvetica Neue, sans-serif', fontSize: '0.875rem', fontWeight: 600 }}
                >
                  MATERIAL
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-300 ${expandedFilters.material ? 'rotate-180' : ''}`}
                  />
                </button>
                <AnimatePresence>
                  {expandedFilters.material && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="space-y-3 overflow-hidden"
                    >
                      {materials.map((material) => (
                        <label
                          key={material}
                          className="flex items-center gap-3 cursor-pointer group"
                        >
                          <div className="relative">
                            <input
                              type="checkbox"
                              checked={selectedMaterial.includes(material)}
                              onChange={() => toggleFilter('material', material)}
                              className="w-4 h-4 appearance-none border-2 border-[#a37e2c]/40 rounded bg-transparent checked:bg-[#a37e2c] checked:border-[#a37e2c] transition-all cursor-pointer"
                            />
                            {selectedMaterial.includes(material) && (
                              <svg className="absolute top-0 left-0 w-4 h-4 text-black pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </div>
                          <span className="text-[#cccccc] group-hover:text-white transition-colors text-sm">
                            {material}
                          </span>
                        </label>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Size Filter */}
              <div className="pb-6 border-b border-[#a37e2c]/10">
                <button
                  onClick={() => setExpandedFilters({ ...expandedFilters, size: !expandedFilters.size })}
                  className="w-full flex items-center justify-between mb-4 text-white hover:text-[#a37e2c] transition-colors"
                  style={{ fontFamily: '-apple-system, Helvetica Neue, sans-serif', fontSize: '0.875rem', fontWeight: 600 }}
                >
                  SIZE
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-300 ${expandedFilters.size ? 'rotate-180' : ''}`}
                  />
                </button>
                <AnimatePresence>
                  {expandedFilters.size && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="space-y-3 overflow-hidden"
                    >
                      {sizes.map((size) => (
                        <label
                          key={size}
                          className="flex items-center gap-3 cursor-pointer group"
                        >
                          <div className="relative">
                            <input
                              type="checkbox"
                              checked={selectedSize.includes(size)}
                              onChange={() => toggleFilter('size', size)}
                              className="w-4 h-4 appearance-none border-2 border-[#a37e2c]/40 rounded bg-transparent checked:bg-[#a37e2c] checked:border-[#a37e2c] transition-all cursor-pointer"
                            />
                            {selectedSize.includes(size) && (
                              <svg className="absolute top-0 left-0 w-4 h-4 text-black pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </div>
                          <span className="text-[#cccccc] group-hover:text-white transition-colors text-sm">
                            {size}
                          </span>
                        </label>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Price Range */}
              <div>
                <button
                  onClick={() => setExpandedFilters({ ...expandedFilters, price: !expandedFilters.price })}
                  className="w-full flex items-center justify-between mb-4 text-white hover:text-[#a37e2c] transition-colors"
                  style={{ fontFamily: '-apple-system, Helvetica Neue, sans-serif', fontSize: '0.875rem', fontWeight: 600 }}
                >
                  PRICE RANGE
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-300 ${expandedFilters.price ? 'rotate-180' : ''}`}
                  />
                </button>
                <AnimatePresence>
                  {expandedFilters.price && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="space-y-4 overflow-hidden"
                    >
                      <input
                        type="range"
                        min="0"
                        max="90000"
                        step="500"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                        className="w-full h-2 bg-[#1a1a1a] rounded-lg appearance-none cursor-pointer"
                        style={{
                          accentColor: '#a37e2c',
                        }}
                      />
                      <div className="flex items-center justify-between text-[#cccccc]" style={{ fontFamily: '-apple-system, Helvetica Neue, sans-serif', fontSize: '0.85rem' }}>
                        <span>$0</span>
                        <span className="text-[#a37e2c] font-semibold">${priceRange[1].toLocaleString()}</span>
                        <span>$90,000</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </aside>

          {/* --- MAIN CONTENT AREA --- */}
          <div className="flex-1 min-w-0">
            {/* Sort and View Controls with Blur */}
            <div className="mb-8 p-4 bg-[#0a0a0a]/60 backdrop-blur-xl border border-[#a37e2c]/20 rounded-lg">
              <div className="flex flex-col gap-4">
                {/* Top Row Controls */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  
                  {/* Grouped Search and Compare Button */}
                  <div className="flex items-center gap-3">
                    {/* Compact Search Bar */}
                    <div className="relative w-64">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a37e2c]" size={16} />
                      <input
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-3 py-2 bg-[#1a1a1a]/80 backdrop-blur-md border border-[#a37e2c]/30 text-white placeholder-[#666] focus:outline-none focus:border-[#a37e2c] transition-all rounded text-sm"
                        style={{
                          fontFamily: '-apple-system, Helvetica Neue, sans-serif',
                        }}
                      />
                    </div>

                    {/* Compare Mode Toggle */}
                    <button
                      onClick={() => {
                        setCompareMode(!compareMode);
                        setSelectedForCompare([]);
                      }}
                      className={`px-4 py-2 border transition-all whitespace-nowrap flex-shrink-0 rounded ${
                        compareMode
                          ? 'bg-[#a37e2c] text-black border-[#a37e2c]'
                          : 'border-[#a37e2c]/30 text-[#a37e2c] hover:border-[#a37e2c]'
                      }`}
                      style={{ fontFamily: '-apple-system, Helvetica Neue, sans-serif', fontSize: '0.8rem', fontWeight: 500 }}
                    >
                      {compareMode ? 'Exit Compare' : 'Compare'}
                    </button>
                  </div>

                  {/* Right Side: Mobile Filter, Sort, View */}
                  <div className="flex items-center justify-between lg:justify-end gap-4">
                    {/* Mobile Filter Button */}
                    <button
                      onClick={() => setShowFilters(!showFilters)}
                      className="lg:hidden flex items-center gap-2 px-4 py-2 bg-[#a37e2c]/10 border border-[#a37e2c]/30 text-[#a37e2c] hover:bg-[#a37e2c]/20 transition-all"
                      style={{ fontFamily: '-apple-system, Helvetica Neue, sans-serif', fontSize: '0.875rem' }}
                    >
                      <Filter size={16} />
                      Filters
                    </button>

                    <div className="flex items-center gap-4 ml-auto lg:ml-0">
                      {/* Sort */}
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="px-4 py-2 bg-[#1a1a1a]/80 backdrop-blur-md border border-[#a37e2c]/30 text-white focus:border-[#a37e2c] focus:outline-none transition-colors rounded"
                        style={{ fontFamily: '-apple-system, Helvetica Neue, sans-serif', fontSize: '0.8rem' }}
                      >
                        <option value="relevance">Relevance</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                        <option value="name">Name: A to Z</option>
                      </select>

                      {/* View Toggle */}
                      <div className="flex items-center gap-1 border border-[#a37e2c]/30 rounded overflow-hidden">
                        <button
                          onClick={() => setViewMode('grid')}
                          className={`p-2 transition-all ${
                            viewMode === 'grid'
                              ? 'bg-[#a37e2c] text-black'
                              : 'text-[#a37e2c] hover:bg-[#a37e2c]/20'
                          }`}
                          aria-label="Grid view"
                        >
                          <Grid size={18} />
                        </button>
                        <button
                          onClick={() => setViewMode('list')}
                          className={`p-2 transition-all ${
                            viewMode === 'list'
                              ? 'bg-[#a37e2c] text-black'
                              : 'text-[#a37e2c] hover:bg-[#a37e2c]/20'
                          }`}
                          aria-label="List view"
                        >
                          <List size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Filter Sidebar (Overlay) */}
            {showFilters && (
              <div className="lg:hidden mb-8 bg-[#0a0a0a]/90 backdrop-blur-2xl rounded-lg border border-[#a37e2c]/20 p-6 space-y-6 shadow-[0_8px_32px_rgba(163,126,44,0.2)]">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-white tracking-[0.15em]" style={{ fontFamily: '-apple-system, Helvetica Neue, sans-serif', fontSize: '0.875rem', fontWeight: 600 }}>
                    FILTERS
                  </h2>
                  <button onClick={() => setShowFilters(false)} className="text-[#999999] hover:text-[#a37e2c]">
                    <X size={20} />
                  </button>
                </div>
                <div className="text-[#666] text-sm italic">
                  Mobile filters would go here (implementation matches desktop sidebar)
                </div>
              </div>
            )}

            {/* --- PRODUCT GRID OR EMPTY STATE --- */}
            {processedProducts.length === 0 ? (
              // Empty State
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center py-20 text-center border border-[#a37e2c]/10 rounded-lg bg-[#0a0a0a]/40 backdrop-blur-sm"
              >
                <div className="w-16 h-16 mb-6 rounded-full bg-[#a37e2c]/10 flex items-center justify-center border border-[#a37e2c]/20">
                  <Search className="text-[#a37e2c]" size={32} />
                </div>
                <h3 className="text-white font-serif text-2xl mb-3">No Timepieces Found</h3>
                <p className="text-[#999] mb-8 max-w-md leading-relaxed">
                  We couldn't find any watches matching your specific criteria. Try adjusting your filters or search terms.
                </p>
                <button 
                  onClick={clearFilters}
                  className="px-8 py-3 bg-[#a37e2c] text-black font-semibold text-xs tracking-widest hover:bg-[#d4af37] transition-colors"
                >
                  CLEAR ALL FILTERS
                </button>
              </motion.div>
            ) : (
              // Grid with Animations
              <motion.div
                layout
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'
                    : 'space-y-4'
                }
              >
                <AnimatePresence mode="popLayout">
                  {processedProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      viewMode={viewMode}
                      compareMode={compareMode}
                      isSelected={selectedForCompare.includes(product.id)}
                      onToggleCompare={toggleCompare}
                      onNavigate={onNavigate}
                      hoveredCard={hoveredCard}
                      setHoveredCard={setHoveredCard}
                    />
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
