import React, { useState, useEffect } from 'react';
import { Heart, RotateCw, ShoppingBag, ZoomIn, ArrowRight, Check, Shield, Clock } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { supabase } from '../lib/supabase';
import { Product } from '../types';
import { Skeleton } from './ui/skeleton';
import { useStore } from '../context/StoreContext';
import { CheckCircle2 } from 'lucide-react';

const ROLEX_GREEN = '#006039';

interface ProductDetailPageProps {
  productId: string;
  onNavigate: (page: string) => void;
}

// Define the shape of our product to avoid TypeScript errors
interface Product {
  id: string;
  name: string;
  subtitle: string | null;
  price: number;
  description: string | null;
  images: string[];
  reference?: string;
}

export function ProductDetailPage({ productId, onNavigate }: ProductDetailPageProps) {
  // 1. NEW: State to hold the fetched product
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  const [activeTab, setActiveTab] = useState<'movement' | 'case' | 'dial' | 'bracelet'>('movement');
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const { addToCart, addToWishlist, wishlistItems } = useStore();

  useEffect(() => {
    setIsVisible(true);
    window.scrollTo(0, 0);
  }, [productId]);

  // 2. NEW: The Logic to Fetch Data AND Update State
  useEffect(() => {
    async function fetchProduct() {
      setLoading(true);

      try {
        // Check if the productId is a valid UUID
        const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(productId);

        let query = supabase.from('products').select('*');

        if (isUUID) {
          query = query.eq('id', productId);
        } else {
          // Search by name (case insensitive, allowing partial matches)
          // "gmt-master" will match "GMT-MASTER II"
          query = query.ilike('name', `%${productId}%`);
        }

        const { data, error } = await query.limit(1);

        if (error) throw error;

        if (data && data.length > 0) {
          const foundProduct = data[0];

          // 3. IMPORTANT: Map DB columns to our UI format
          setProduct({
            id: foundProduct.id,
            name: foundProduct.name,
            subtitle: foundProduct.subtitle,
            price: foundProduct.price,
            description: foundProduct.description,
            // Ensure images is always an array
            images: foundProduct.images || [],
            // Use ID as reference if reference column is missing
            reference: foundProduct.id.split('-')[0].toUpperCase() 
          });
        } else {
          console.warn('No product found in DB');
          setProduct(null);
        }
      } catch (err) {
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    }

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  // --- RENDERING ---

  // 4. Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#006039] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // 5. Not Found State
  if (!product) {
    return (
      <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center text-white">
        <h2 className="text-2xl font-serif mb-4">Timepiece Not Found</h2>
        <button onClick={() => onNavigate('collections')} className="text-[#a37e2c] underline">
          Return to Collections
        </button>
      </div>
    );
  }

  // Use the fetched product images
  const productImages = product.images.length > 0 ? product.images : [];
  
  // Mock Specs (You can move this to DB later)
  const specs = {
    movement: [{ label: 'Calibre', value: '3235, Manufacture Rolex' }],
    case: [{ label: 'Diameter', value: '41 mm' }],
    dial: [{ label: 'Color', value: 'Champagne-colour' }],
    bracelet: [{ label: 'Model', value: 'Jubilee' }],
  };

  return (
    <div className={`min-h-screen bg-[#050505] transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 pt-32 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* LEFT: Image Gallery */}
          <div className="lg:col-span-7 relative">
            {/* Green Atmospheric Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-radial-gradient from-[#006039]/20 to-transparent pointer-events-none blur-3xl" />

            <div className="absolute top-6 right-6 z-20">
              <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full text-white hover:bg-[#006039] hover:border-[#006039] transition-all cursor-pointer group">
                <RotateCw size={14} className="group-hover:rotate-180 transition-transform duration-700" />
                <span className="text-[10px] font-bold tracking-widest">360° VIEW</span>
              </div>
            </div>

            {/* Main Image */}
            <div 
              className={`relative aspect-[4/5] md:aspect-square rounded-xl overflow-hidden cursor-zoom-in border bg-[#0a0a0a] transition-colors duration-300 ${isZoomed ? 'border-[#006039]' : 'border-white/5'}`}
              onClick={() => setIsZoomed(!isZoomed)}
            >
              <div className={`w-full h-full transition-transform duration-700 ease-out ${isZoomed ? 'scale-150' : 'scale-100'}`}>
                 {productImages.length > 0 && (
                   <ImageWithFallback
                    src={productImages[selectedImageIndex] || productImages[0]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                 )}
              </div>
              
              <div className={`absolute bottom-6 left-1/2 -translate-x-1/2 text-xs tracking-widest flex items-center gap-2 transition-opacity duration-300 ${isZoomed ? 'text-[#006039] opacity-100' : 'text-white/50 opacity-0 hover:opacity-100'}`}>
                <ZoomIn size={14} /> {isZoomed ? 'CLICK TO CLOSE' : 'CLICK TO ZOOM'}
              </div>
            </div>

            {/* Thumbnails */}
            {productImages.length > 1 && (
              <div className="mt-6 flex justify-center gap-4">
                {productImages.map((image: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`relative w-16 h-16 rounded-lg overflow-hidden transition-all duration-300 ${
                      selectedImageIndex === index
                        ? 'ring-1 ring-[#006039] opacity-100 scale-110'
                        : 'opacity-50 hover:opacity-100 grayscale hover:grayscale-0'
                    }`}
                  >
                    <ImageWithFallback src={image} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT: Details */}
          <div className="lg:col-span-5 flex flex-col lg:pt-8">
            <div className="sticky top-24">
              
              <div className="flex items-center gap-3 mb-6 text-[#a37e2c]">
                <span className="h-px w-8 bg-[#a37e2c]/50"></span>
                <span className="text-xs font-bold tracking-[0.2em]">REF. {product.reference}</span>
              </div>

              <h1 className="text-4xl md:text-6xl text-white font-serif mb-4 leading-tight">
                {product.name}
              </h1>
              
              <p className="text-[#888] text-lg font-light mb-8 leading-relaxed">
                {product.subtitle}
              </p>

              <div className="text-3xl text-[#a37e2c] font-light mb-10">
                ${product.price.toLocaleString()}
              </div>

              <p className="text-[#666] leading-7 mb-12 text-sm border-l-2 border-[#a37e2c]/30 pl-6 italic">
                "{product.description}"
              </p>

              {/* ACTION BUTTONS */}
              <div className="flex flex-col gap-4 mb-12">
                                <button
                                  className="group relative w-full py-5 bg-[#006039] text-white overflow-hidden shadow-[0_0_30px_rgba(0,96,57,0.2)] hover:shadow-[0_0_40px_rgba(0,96,57,0.4)] transition-all duration-500"
                                  onClick={() => addToCart(product.id)}
                                >                  <span className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"/>
                  <div className="relative flex items-center justify-center gap-3 font-bold tracking-widest text-xs">
                    <ShoppingBag size={18} />
                    ADD TO SHOPPING BAG
                  </div>
                </button>
                
                                <button
                                  onClick={() => addToWishlist(product.id)}
                                  className="w-full py-5 border border-[#333] text-white hover:border-[#006039] hover:text-[#006039] transition-colors duration-300 flex items-center justify-center gap-3 font-bold tracking-widest text-xs"
                                >
                                  <Heart size={18} className={wishlistItems.some(item => item.id === product.id) ? 'fill-[#006039] text-[#006039]' : ''} />
                                  {wishlistItems.some(item => item.id === product.id) ? 'SAVED TO WISHLIST' : 'ADD TO WISHLIST'}
                                </button>              </div>

              {/* CERTIFICATION */}
              <div className="flex items-center gap-4 p-4 bg-[#0a0a0a] border border-[#006039]/30 rounded-lg">
                <div className="w-8 h-8 rounded-full bg-[#006039]/20 flex items-center justify-center text-[#006039]">
                    <CheckCircle2 size={16} />
                </div>
                <div>
                    <div className="text-white text-xs font-bold tracking-widest uppercase">Superlative Chronometer</div>
                    <div className="text-[#666] text-[10px] tracking-wider">OFFICIALLY CERTIFIED</div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* TECHNICAL SPECS */}
      <section className="py-24 bg-[#050505] border-t border-white/5">
        <div className="max-w-[1200px] mx-auto px-4">
           <div className="flex flex-col items-center mb-16">
             <h3 className="text-2xl font-serif text-white mb-8">Technical Details</h3>
             
             <div className="flex flex-wrap justify-center gap-8 border-b border-white/10 w-full md:w-auto">
              {Object.keys(specs).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={`pb-4 text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 relative ${
                    activeTab === tab ? 'text-white' : 'text-[#666] hover:text-white'
                  }`}
                >
                  {tab}
                  <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-[#006039] transition-transform duration-300 ${activeTab === tab ? 'scale-x-100' : 'scale-x-0'}`} />
                </button>
              ))}
             </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {specs[activeTab as keyof typeof specs]?.map((spec: any, idx: number) => (
                <div key={idx} className="flex justify-between items-center py-4 border-b border-white/5 group hover:border-[#006039]/30 transition-colors">
                  <span className="text-[#888] text-sm font-medium">{spec.label}</span>
                  <span className="text-white text-sm text-right group-hover:text-[#006039] transition-colors">{spec.value}</span>
                </div>
              ))}
           </div>
        </div>
      </section>
    </div>
  );
}