import React, { useEffect, useState, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { Product } from '../types';
import AddProductModal from './AddProductModal';
import EditProductModal from './EditProductModal';
import DeleteProductDialog from './DeleteProductDialog';
import { Clock } from 'lucide-react';

const InventoryTable: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Define the Rolex Gold color for consistency
  const ROLEX_GOLD = '#a37e2c';

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      // Select all columns to ensure we get material, size, category etc.
      const { data, error } = await supabase.from('products').select('*');
      if (error) {
        throw error;
      }
      
      const mappedProducts: Product[] = data.map((p: any) => ({
        id: p.id,
        name: p.name,
        subtitle: p.subtitle || null,
        description: p.description || null,
        images: p.images || null,
        category: p.category || null,
        is_featured: p.is_featured || false,
        created_at: p.created_at || null,
        material: p.material || 'N/A', // Assuming these are now in DB or fallback
        size: p.size || 'N/A',         // Assuming these are now in DB or fallback
        priceValue: p.price,
        formattedPrice: `$${p.price.toLocaleString()}`,
        badge: p.is_featured ? 'Featured' : undefined,
      }));

      setProducts(mappedProducts || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <Clock size={24} className="animate-spin" style={{ color: ROLEX_GOLD }} />
        <span className="ml-3 text-white/70">Loading Inventory...</span>
      </div>
    );
  }

  return (
    <div className="text-white">
      
      {/* --- ADD PRODUCT BUTTON (GOLD STYLED) --- */}
      <div className="flex justify-end mb-6">
        <AddProductModal 
          onProductAdded={fetchProducts} 
          // Style the button to match the luxury theme
          buttonClassName="px-6 py-3 bg-transparent border border-white/20 text-white hover:border-[#a37e2c] hover:text-[#a37e2c] transition-all text-sm font-semibold tracking-wider uppercase"
        />
      </div>

      {/* --- TABLE HEADER (IMPROVED) --- */}
      <div className="grid grid-cols-7 gap-4 py-3 px-4 border-b-2 font-bold uppercase tracking-widest text-xs text-white" 
           style={{ borderBottomColor: ROLEX_GOLD }}>
        <div className="col-span-1">Image</div>
        <div className="col-span-2">Name</div>
        <div className="col-span-1">Ref. ID</div>
        <div className="col-span-1">Price</div>
        <div className="col-span-1">Featured</div>
        <div className="col-span-1">Actions</div>
      </div>

      {/* --- TABLE BODY (IMPROVED ROWS) --- */}
      {products.map((product) => (
        <div 
          key={product.id} 
          className="grid grid-cols-7 gap-4 py-3 px-4 items-center text-sm border-b border-white/10 hover:bg-white/5 transition-colors"
        >
          {/* IMAGE */}
          <div className="col-span-1">
            <img 
              // Safely access the first image URL
              src={product.images && product.images.length > 0 ? product.images[0] : 'placeholder_url_here'} 
              alt={product.name} 
              className="w-12 h-12 object-cover border border-white/10" 
            />
          </div>
          
          {/* NAME */}
          <div className="col-span-2 font-semibold text-white">{product.name}</div>
          
          {/* REFERENCE (Truncated UUID for display) */}
          <div className="col-span-1 text-white/50 font-mono text-xs">
            {product.id.substring(0, 8).toUpperCase()}...
          </div>
          
          {/* PRICE */}
          <div className="col-span-1" style={{ color: ROLEX_GOLD }}>
            {product.formattedPrice}
          </div>

          {/* IS FEATURED */}
          <div className="col-span-1">
            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
              product.is_featured 
                ? 'bg-[#006039]/50 text-[#006039]' 
                : 'bg-neutral-700/50 text-neutral-400'
            }`}>
              {product.is_featured ? 'YES' : 'NO'}
            </span>
          </div>
          
          {/* ACTIONS */}
          <div className="col-span-1 flex gap-3">
            <EditProductModal 
              product={product} 
              onProductUpdated={fetchProducts} 
              buttonClassName="text-white/70 hover:text-white"
            />
            <DeleteProductDialog 
              productId={product.id} 
              onProductDeleted={fetchProducts} 
              buttonClassName="text-red-400 hover:text-red-500"
            />
          </div>
        </div>
      ))}
      {products.length === 0 && (
          <div className="py-8 text-center text-white/50">No products found in the inventory.</div>
      )}
    </div>
  );
};

export default InventoryTable;
