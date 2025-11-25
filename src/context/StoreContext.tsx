import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './AuthContext';
import { Product } from '../types';
import { Database } from '../types/database.types';

type ProductRow = Database['public']['Tables']['products']['Row'];

interface CartItem {
  product: Product;
  quantity: number;
}

interface StoreContextType {
  cartItems: CartItem[];
  wishlistItems: Product[];
  addToCart: (productId: string) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  updateCartQuantity: (productId: string, quantity: number) => Promise<void>;
  addToWishlist: (productId: string) => Promise<void>;
  removeFromWishlist: (productId: string) => Promise<void>;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);

  const fetchUserCart = async () => {
    if (!user) return;
    try {
      const { data, error } = await supabase
        .from('cart_items')
        .select('quantity, products(*)')
        .eq('user_id', user.id);
      if (error) throw error;
      
      const userCart = data.map(item => {
        const productData = item.products as ProductRow;
        const price = productData.price ?? 0;
        return {
          product: {
            ...(productData as Omit<ProductRow, 'price'>),
            id: productData.id,
            name: productData.name,
            priceValue: price,
            formattedPrice: new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price),
          },
          quantity: item.quantity,
        };
      });
      setCartItems(userCart);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const fetchUserWishlist = async () => {
    if (!user) return;
    try {
      const { data, error } = await supabase
        .from('wishlist')
        .select('products(*)')
        .eq('user_id', user.id);
      if (error) throw error;

      const userWishlist = data.map(item => {
        const productData = item.products as ProductRow;
        const price = productData.price ?? 0;
        return {
            ...(productData as Omit<ProductRow, 'price'>),
            id: productData.id,
            name: productData.name,
            priceValue: price,
            formattedPrice: new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price),
        };
      });
      setWishlistItems(userWishlist);
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    }
  };
  
  useEffect(() => {
    if (user) {
      fetchUserCart();
      fetchUserWishlist();

      const cartSubscription = supabase.channel('cart_items_changes')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'cart_items', filter: `user_id=eq.${user.id}` }, fetchUserCart)
        .subscribe();

      const wishlistSubscription = supabase.channel('wishlist_items_changes')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'wishlist', filter: `user_id=eq.${user.id}` }, fetchUserWishlist)
        .subscribe();

      return () => {
        supabase.removeChannel(cartSubscription);
        supabase.removeChannel(wishlistSubscription);
      };
    } else {
      setCartItems([]); // Clear authenticated user's cart
      setWishlistItems([]); // Clear authenticated user's wishlist
      loadLocalData();
    }
  }, [user]);

  const loadLocalData = () => {
    const localCart = localStorage.getItem('cart');
    const localWishlist = localStorage.getItem('wishlist');
    if (localCart) setCartItems(JSON.parse(localCart));
    if (localWishlist) setWishlistItems(JSON.parse(localWishlist));
  };

  const addToCart = async (productId: string) => {
    if (user) {
      const existingItem = cartItems.find(item => item.product.id === productId);
      const { error } = await supabase.from('cart_items').upsert({
          user_id: user.id,
          product_id: productId,
          quantity: existingItem ? existingItem.quantity + 1 : 1,
      }, { onConflict: 'user_id,product_id' });
      if (error) throw error;
      fetchUserCart();
    } else {
      // Local storage logic
    }
  };

  const removeFromCart = async (productId: string) => {
    if (user) {
      const { error } = await supabase.from('cart_items').delete().match({ user_id: user.id, product_id: productId });
      if (error) throw error;
      fetchUserCart();
    } else {
      // Local storage logic
    }
  };

  const updateCartQuantity = async (productId: string, quantity: number) => {
    if (user) {
      if (quantity === 0) {
        await removeFromCart(productId);
        return;
      }
      const { error } = await supabase.from('cart_items').update({ quantity }).match({ user_id: user.id, product_id: productId });
      if (error) throw error;
      fetchUserCart();
    } else {
      // Local storage logic
    }
  };

  const addToWishlist = async (productId: string) => {
    if (user) {
      const { error } = await supabase.from('wishlist').insert({ user_id: user.id, product_id: productId });
      if (error) throw error;
      fetchUserWishlist();
    } else {
      // Local storage logic
    }
  };

  const removeFromWishlist = async (productId: string) => {
    if (user) {
      const { error } = await supabase.from('wishlist').delete().match({ user_id: user.id, product_id: productId });
      if (error) throw error;
      fetchUserWishlist();
    } else {
      // Local storage logic
    }
  };

  return (
    <StoreContext.Provider value={{ cartItems, wishlistItems, addToCart, removeFromCart, updateCartQuantity, addToWishlist, removeFromWishlist }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
