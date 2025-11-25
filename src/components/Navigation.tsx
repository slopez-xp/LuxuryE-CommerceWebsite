import React, { useState, useEffect, useRef } from 'react';
import { User, Heart, ShoppingBag, Menu, X, ChevronRight, LogIn, MapPin, LogOut, Plus, Minus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useStore } from '../context/StoreContext';
import { useIsMobile } from './ui/use-mobile';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose
} from './ui/sheet';

// ROLEX GREEN CONSTANT
const ROLEX_GREEN = '#006039';

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onShowAuthModal: () => void;
}

export function Navigation({ currentPage, onNavigate, onShowAuthModal }: NavigationProps) {
  const { user, isAdmin, signOut, isLoading } = useAuth();
  const { cartItems, wishlistItems, removeFromCart, updateCartQuantity, removeFromWishlist } = useStore();
  
  // Dropdown states for Desktop
  const [activeDropdown, setActiveDropdown] = useState<'user' | 'wishlist' | 'cart' | null>(null);
  
  // Sheet states for Mobile
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isUserOpen, setIsUserOpen] = useState(false);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const wishlistCount = wishlistItems.length;
  const subtotal = cartItems.reduce((acc, item) => acc + item.product.priceValue * item.quantity, 0);
  const formattedSubtotal = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(subtotal);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node) && !isMobile) {
        setActiveDropdown(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobile]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  // Unified Navigation List
  const mainLinks = [
    { id: 'home', label: 'HOME' },
    { id: 'collections', label: 'COLLECTIONS' },
    { id: 'heritage', label: 'HISTORY' },
    { id: 'boutiques', label: 'BOUTIQUES' },
    { id: 'support', label: 'SUPPORT' }
  ];

  const toggleDropdown = (name: 'user' | 'wishlist' | 'cart') => {
    if (activeDropdown === name) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(name);
      setMobileMenuOpen(false); // Close mobile menu if open
    }
  };

  // Helper to open sheets from the mobile menu overlay
  const openMobileSheet = (type: 'wishlist' | 'cart' | 'user') => {
    setMobileMenuOpen(false); // Close the main mobile menu
    
    // Small timeout to ensure smooth transition between overlays
    setTimeout(() => {
        if (type === 'wishlist') setIsWishlistOpen(true);
        if (type === 'cart') setIsCartOpen(true);
        if (type === 'user') setIsUserOpen(true);
    }, 150);
  };

  // --- SUB-COMPONENT: Dropdown Panel ---
  const DropdownPanel = ({ title, children, type }: { title: string, children: React.ReactNode, type: string }) => {
    if (activeDropdown !== type) return null;

    return (
      <div className="absolute top-full right-0 mt-0 w-80 bg-[#0a0a0a] border border-[#a37e2c]/30 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200 z-50" style={{ borderColor: `rgba(163, 126, 44, 0.3), ${ROLEX_GREEN}50` }}>
        <div className="p-5 border-b border-[#a37e2c]/20" style={{ borderBottomColor: `rgba(163, 126, 44, 0.2), ${ROLEX_GREEN}30` }}>
          <h3 className="text-white font-serif text-lg tracking-wide">{title}</h3>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    );
  };

  return (
    <nav 
      ref={navRef}
      id="site-nav" 
      className="fixed top-0 left-0 right-0 z-[1000] bg-black border-b border-[#a37e2c]/20 transition-all duration-300"
      style={{ borderBottomColor: `rgba(163, 126, 44, 0.2), ${ROLEX_GREEN}40` }}
    >
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 h-20 flex items-center justify-between relative">
        
        {/* 1. LEFT: Logo */}
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-3 group z-20"
        >
          <div 
            className="text-[#a37e2c] tracking-widest group-hover:text-white transition-colors duration-300" 
            style={{ 
              fontFamily: 'Playfair Display, Georgia, serif', 
              fontSize: '1.5rem', 
              fontWeight: 400 
            }}
          >
            ROLEX
          </div>
        </button>

        {/* 2. CENTER: Compacted Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
          {mainLinks.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="relative group py-2"
            >
                <span
                className="text-[0.7rem] font-medium tracking-[0.15em] transition-colors duration-300"
                style={{
                  fontFamily: '-apple-system, Helvetica Neue, sans-serif',
                  color: currentPage === item.id ? '#a37e2c' : '#999999',
                }}
                onMouseEnter={(e) => {
                  if (currentPage !== item.id) {
                    e.currentTarget.style.color = ROLEX_GREEN;
                  }
                }}
                onMouseLeave={(e) => {
                  if (currentPage !== item.id) {
                    e.currentTarget.style.color = '#999999';
                  }
                }}
              >
                {item.label}
              </span>
              <span
                className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[1px] bg-[#a37e2c] transition-all duration-300"
                style={{
                  width: currentPage === item.id ? '100%' : '0%',
                }}
              />
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-[#a37e2c] group-hover:w-full transition-all duration-300" />
            </button>
          ))}
        </div>

        {/* 3. RIGHT: Icon Actions with Dropdowns */}
        <div className="hidden lg:flex items-center gap-6 relative">
          
                    {/* Wishlist Icon & Dropdown */}
                    <div className="relative">
                      {!isMobile ? (
                        <>
                          <button
                            onClick={() => toggleDropdown('wishlist')}
                            className={`p-2 transition-all duration-200 relative ${activeDropdown === 'wishlist' ? 'text-[#a37e2c]' : 'text-white hover:text-[#a37e2c]'}`}
                          >
                            <Heart size={22} strokeWidth={1.5} />
                            {wishlistCount > 0 && (
                              <span className="absolute -top-1 -right-1 w-4 h-4 flex items-center justify-center bg-[#a37e2c] text-black text-[10px] font-bold rounded-full">
                                {wishlistCount}
                              </span>
                            )}
                          </button>
                          <DropdownPanel title="Wishlist" type="wishlist">
                            {wishlistItems.length > 0 ? (
                              <div className="space-y-4">
                                {wishlistItems.map(item => (
                                  <div key={item.id} className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                      <img src={item.images?.[0] || ''} alt={item.name} className="w-12 h-12 object-cover" />
                                      <div>
                                        <p className="font-semibold">{item.name}</p>
                                        <p className="text-sm text-neutral-400">{item.formattedPrice}</p>
                                      </div>
                                    </div>
                                    <button onClick={() => removeFromWishlist(item.id)} className="text-red-500 hover:text-red-700">
                                      <X size={16} />
                                    </button>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div className="text-center py-4">
                                <p className="text-[#888] text-sm mb-4">Your wishlist is currently empty.</p>
                                <button
                                  onClick={() => {
                                    onNavigate('collections');
                                    setActiveDropdown(null);
                                  }}
                                  className="text-[#a37e2c] text-xs underline hover:text-white transition-colors"
                                >
                                  Explore Collection
                                </button>
                              </div>
                            )}
                          </DropdownPanel>
                        </>
                      ) : (
                        <Sheet open={isWishlistOpen} onOpenChange={setIsWishlistOpen}>
                          <SheetTrigger asChild>
                            <button
                              className="p-2 transition-all duration-200 relative text-white hover:text-[#a37e2c]"
                            >
                              <Heart size={22} strokeWidth={1.5} />
                              {wishlistCount > 0 && (
                                <span className="absolute -top-1 -right-1 w-4 h-4 flex items-center justify-center bg-[#a37e2c] text-black text-[10px] font-bold rounded-full">
                                  {wishlistCount}
                                </span>
                              )}
                            </button>
                          </SheetTrigger>
                          <SheetContent side="right" className="bg-black border-none text-white z-[1100] w-full max-w-full h-full">
                            <SheetHeader className="text-left border-b border-[#a37e2c]/20 pb-4">
                              <SheetTitle className="text-[#a37e2c] font-serif tracking-widest text-lg">WISHLIST</SheetTitle>
                            </SheetHeader>
                            <div className="flex flex-col justify-between h-full py-6">
                              {wishlistItems.length > 0 ? (
                                <div className="space-y-4">
                                  {wishlistItems.map(item => (
                                    <div key={item.id} className="flex items-center justify-between">
                                      <div className="flex items-center gap-4">
                                        <img src={item.images?.[0] || ''} alt={item.name} className="w-12 h-12 object-cover" />
                                        <div>
                                          <p className="font-semibold">{item.name}</p>
                                          <p className="text-sm text-neutral-400">{item.formattedPrice}</p>
                                        </div>
                                      </div>
                                      <SheetClose asChild>
                                        <button onClick={() => removeFromWishlist(item.id)} className="text-red-500 hover:text-red-700">
                                          <X size={16} />
                                        </button>
                                      </SheetClose>
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <div className="text-center py-4">
                                  <p className="text-[#888] text-sm mb-4">Your wishlist is currently empty.</p>
                                  <SheetClose asChild>
                                    <button
                                      onClick={() => onNavigate('collections')}
                                      className="text-[#a37e2c] text-xs underline hover:text-white transition-colors"
                                    >
                                      Explore Collection
                                    </button>
                                  </SheetClose>
                                </div>
                              )}
                            </div>
                          </SheetContent>
                        </Sheet>
                      )}
                    </div>
                    {/* Cart Icon & Dropdown */}
                    <div className="relative">
                      {!isMobile ? (
                        <>
                          <button
                            onClick={() => toggleDropdown('cart')}
                            className={`p-2 transition-all duration-200 relative ${activeDropdown === 'cart' ? 'text-[#a37e2c]' : 'text-white hover:text-[#a37e2c]'}`}
                          >
                            <ShoppingBag size={22} strokeWidth={1.5} />
                            {cartCount > 0 && (
                              <span className="absolute -top-1 -right-1 w-4 h-4 flex items-center justify-center bg-[#a37e2c] text-black text-[10px] font-bold rounded-full">
                                {cartCount}
                              </span>
                            )}
                          </button>
                          <DropdownPanel title="Shopping Bag" type="cart">
                             {cartItems.length > 0 ? (
                               <>
                                <div className="space-y-4 max-h-64 overflow-y-auto">
                                 {cartItems.map(item => (
                                   <div key={item.product.id} className="flex items-center justify-between">
                                     <div className="flex items-center gap-4">
                                       <img src={item.product.images?.[0] || ''} alt={item.product.name} className="w-12 h-12 object-cover" />
                                       <div>
                                         <p className="font-semibold">{item.product.name}</p>
                                         <p className="text-sm text-neutral-400">{item.product.formattedPrice}</p>
                                         <div className="flex items-center gap-2 mt-1">
                                           <button onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)} className="text-neutral-400 hover:text-white"><Minus size={14} /></button>
                                           <span>{item.quantity}</span>
                                           <button onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)} className="text-neutral-400 hover:text-white"><Plus size={14} /></button>
                                         </div>
                                       </div>
                                     </div>
                                     <button onClick={() => removeFromCart(item.product.id)} className="text-red-500 hover:text-red-700">
                                       <X size={16} />
                                     </button>
                                   </div>
                                 ))}
                                </div>
                                <div className="pt-6 mt-6 border-t border-[#a37e2c]/20">
                                  <div className="flex justify-between items-center text-white mb-4">
                                    <span className="text-sm">Subtotal</span>
                                    <span className="font-bold text-lg">{formattedSubtotal}</span>
                                  </div>
                                  <button
                                    onClick={() => {
                                      onNavigate('checkout');
                                      setActiveDropdown(null);
                                    }}
                                    className="w-full py-3 bg-[#a37e2c] text-black text-sm font-bold tracking-widest hover:bg-[#d4af37] transition-colors"
                                  >
                                    Proceed to Checkout
                                  </button>
                                </div>
                              </>
                             ) : (
                               <div className="text-center py-4">
                                <p className="text-[#888] text-sm mb-6">Your shopping bag is empty.</p>
                                <button
                                  onClick={() => {
                                    onNavigate('collections');
                                    setActiveDropdown(null);
                                  }}
                                  className="w-full py-3 border border-[#a37e2c] text-[#a37e2c] text-xs font-bold tracking-widest hover:bg-[#a37e2c] hover:text-black transition-colors"
                                >
                                  CONTINUE SHOPPING
                                </button>
                              </div>
                             )}
                          </DropdownPanel>
                        </>
                      ) : (
                        <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
                          <SheetTrigger asChild>
                            <button
                              className={`p-2 transition-all duration-200 relative text-white hover:text-[#a37e2c]`}
                            >
                              <ShoppingBag size={22} strokeWidth={1.5} />
                              {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 w-4 h-4 flex items-center justify-center bg-[#a37e2c] text-black text-[10px] font-bold rounded-full">
                                  {cartCount}
                                </span>
                              )}
                            </button>
                          </SheetTrigger>
                          <SheetContent side="right" className="bg-black border-none text-white z-[1100] w-full max-w-full h-full">
                            <SheetHeader className="text-left border-b border-[#a37e2c]/20 pb-4">
                              <SheetTitle className="text-[#a37e2c] font-serif tracking-widest text-lg">SHOPPING BAG</SheetTitle>
                            </SheetHeader>
                            <div className="flex flex-col justify-between h-full py-6">
                              {cartItems.length > 0 ? (
                                <>
                                  <div className="space-y-4 flex-grow overflow-y-auto">
                                    {cartItems.map(item => (
                                      <div key={item.product.id} className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                          <img src={item.product.images?.[0] || ''} alt={item.product.name} className="w-12 h-12 object-cover" />
                                          <div>
                                            <p className="font-semibold">{item.product.name}</p>
                                            <p className="text-sm text-neutral-400">{item.product.formattedPrice}</p>
                                            <div className="flex items-center gap-2 mt-1">
                                              <button onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)} className="text-neutral-400 hover:text-white"><Minus size={14} /></button>
                                              <span>{item.quantity}</span>
                                              <button onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)} className="text-neutral-400 hover:text-white"><Plus size={14} /></button>
                                            </div>
                                          </div>
                                        </div>
                                        <SheetClose asChild>
                                          <button onClick={() => removeFromCart(item.product.id)} className="text-red-500 hover:text-red-700">
                                            <X size={16} />
                                          </button>
                                        </SheetClose>
                                      </div>
                                    ))}
                                  </div>
                                  <div className="pt-6 mt-6 border-t border-[#a37e2c]/20">
                                    <div className="flex justify-between items-center text-white mb-4">
                                      <span className="text-sm">Subtotal</span>
                                      <span className="font-bold text-lg">{formattedSubtotal}</span>
                                    </div>
                                    <SheetClose asChild>
                                      <button
                                        onClick={() => onNavigate('checkout')}
                                        className="w-full py-3 bg-[#a37e2c] text-black text-sm font-bold tracking-widest hover:bg-[#d4af37] transition-colors"
                                      >
                                        Proceed to Checkout
                                      </button>
                                    </SheetClose>
                                  </div>
                                </>
                              ) : (
                                <div className="text-center py-4">
                                  <p className="text-[#888] text-sm mb-6">Your shopping bag is empty.</p>
                                  <SheetClose asChild>
                                    <button
                                      onClick={() => onNavigate('collections')}
                                      className="w-full py-3 border border-[#a37e2c] text-[#a37e2c] text-xs font-bold tracking-widest hover:bg-[#a37e2c] hover:text-black transition-colors"
                                    >
                                      CONTINUE SHOPPING
                                    </button>
                                  </SheetClose>
                                </div>
                              )}
                            </div>
                          </SheetContent>
                        </Sheet>
                      )}
                    </div>
                    {/* User Icon & Dropdown */}
                    <div className="relative">
                      {!isMobile ? (
                        <>
                          <button
                            onClick={() => toggleDropdown('user')}
                            className={`p-2 transition-all duration-200 ${activeDropdown === 'user' ? 'text-[#a37e2c]' : 'text-white hover:text-[#a37e2c]'}`}
                          >
                            <User size={22} strokeWidth={1.5} />
                          </button>
                          <DropdownPanel title="My Account" type="user">
                            {isLoading ? (
                              <div className="flex items-center justify-center">
                                <div className="w-6 h-6 border-2 border-dashed rounded-full animate-spin border-rolex-gold"></div>
                              </div>
                            ) : user ? (
                              <div className="flex flex-col gap-4">
                                <p className="text-center text-neutral-400 text-sm">Welcome, {user.email}</p>
                                {isAdmin && (
                                  <button
                                    onClick={() => {
                                      onNavigate('admin');
                                      setActiveDropdown(null);
                                    }}
                                    className="w-full py-3 border border-[#a37e2c] text-[#a37e2c] text-xs font-bold tracking-widest hover:bg-[#a37e2c] hover:text-black transition-colors"
                                  >
                                    Admin Dashboard
                                  </button>
                                )}
                                <button
                                  onClick={signOut}
                                  className="w-full py-3 bg-red-600 text-white text-xs font-bold tracking-widest hover:bg-red-700 transition-colors"
                                >
                                  Sign Out
                                </button>
                              </div>
                            ) : (
                              <div className="flex flex-col gap-4 items-center text-center">
                                <div className="w-12 h-12 rounded-full bg-[#a37e2c]/10 flex items-center justify-center text-[#a37e2c] mb-2">
                                  <LogIn size={20} />
                                </div>
                                <p className="text-[#888] text-sm">Sign in to access your exclusive benefits and collection.</p>
                                <button
                                  onClick={onShowAuthModal}
                                  className="w-full py-3 bg-[#a37e2c] text-black text-xs font-bold tracking-widest hover:bg-[#d4af37] transition-colors"
                                >
                                  SIGN IN / REGISTER
                                </button>
                              </div>
                            )}
                          </DropdownPanel>
                        </>
                      ) : (
                        <Sheet open={isUserOpen} onOpenChange={setIsUserOpen}>
                          <SheetTrigger asChild>
                            <button
                              className="p-2 transition-all duration-200 text-white hover:text-[#a37e2c]"
                            >
                              <User size={22} strokeWidth={1.5} />
                            </button>
                          </SheetTrigger>
                          <SheetContent side="right" className="bg-black border-none text-white z-[1100] w-full max-w-full h-full">
                            <SheetHeader className="text-left border-b border-[#a37e2c]/20 pb-4">
                              <SheetTitle className="text-[#a37e2c] font-serif tracking-widest text-lg">MY ACCOUNT</SheetTitle>
                            </SheetHeader>
                            <div className="flex flex-col justify-between h-full py-6">
                              {isLoading ? (
                                <div className="flex items-center justify-center">
                                  <div className="w-6 h-6 border-2 border-dashed rounded-full animate-spin border-rolex-gold"></div>
                                </div>
                              ) : user ? (
                                <div className="flex flex-col gap-4">
                                  <p className="text-center text-neutral-400 text-sm">Welcome, {user.email}</p>
                                  {isAdmin && (
                                    <SheetClose asChild>
                                      <button
                                        onClick={() => onNavigate('admin')}
                                        className="w-full py-3 border border-[#a37e2c] text-[#a37e2c] text-xs font-bold tracking-widest hover:bg-[#a37e2c] hover:text-black transition-colors"
                                      >
                                        Admin Dashboard
                                      </button>
                                    </SheetClose>
                                  )}
                                  <SheetClose asChild>
                                    <button
                                      onClick={signOut}
                                      className="w-full py-3 bg-red-600 text-white text-xs font-bold tracking-widest hover:bg-red-700 transition-colors"
                                    >
                                      Sign Out
                                    </button>
                                  </SheetClose>
                                </div>
                              ) : (
                                <div className="flex flex-col gap-4 items-center text-center">
                                  <div className="w-12 h-12 rounded-full bg-[#a37e2c]/10 flex items-center justify-center text-[#a37e2c] mb-2">
                                    <LogIn size={20} />
                                  </div>
                                  <p className="text-[#888] text-sm">Sign in to access your exclusive benefits and collection.</p>
                                  <SheetClose asChild>
                                    <button
                                      onClick={onShowAuthModal}
                                      className="w-full py-3 bg-[#a37e2c] text-black text-xs font-bold tracking-widest hover:bg-[#d4af37] transition-colors"
                                    >
                                      SIGN IN / REGISTER
                                    </button>
                                  </SheetClose>
                                </div>
                              )}
                            </div>
                          </SheetContent>
                        </Sheet>
                      )}
                    </div>
        </div>
        
        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-white hover:text-[#a37e2c] transition-colors z-50"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* 4. SOLID MOBILE MENU OVERLAY */}
      {/* Fixed: h-screen and bg-black ensures no transparency issues */}
      <div 
        className={`fixed inset-0 bg-black z-40 transition-transform duration-500 ease-in-out lg:hidden ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full pt-24 px-8 pb-10">
          {/* Main Mobile Links */}
          <div className="flex flex-col gap-6">
            {mainLinks.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setMobileMenuOpen(false);
                }}
                className="group flex items-center justify-between text-left py-2 border-b border-[#333]"
              >
                <span 
                  className={`text-xl tracking-widest font-serif ${
                    currentPage === item.id ? 'text-[#a37e2c]' : 'text-white'
                  }`}
                >
                  {item.label}
                </span>
                <ChevronRight className="text-[#333] group-hover:text-[#a37e2c] transition-colors" size={20} />
              </button>
            ))}
          </div>

          {/* Mobile Utility Actions (Bottom) */}
          <div className="mt-auto space-y-6">
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-[#333]">
              <button onClick={() => openMobileSheet('user')} className="flex flex-col items-center gap-2 text-[#888] hover:text-[#a37e2c]">
                <User size={24} strokeWidth={1} />
                <span className="text-[10px] tracking-widest">ACCOUNT</span>
              </button>
              <button onClick={() => openMobileSheet('wishlist')} className="flex flex-col items-center gap-2 text-[#888] hover:text-[#a37e2c]">
                <Heart size={24} strokeWidth={1} />
                <span className="text-[10px] tracking-widest">WISHLIST</span>
              </button>
              <button onClick={() => openMobileSheet('cart')} className="flex flex-col items-center gap-2 text-[#888] hover:text-[#a37e2c]">
                <ShoppingBag size={24} strokeWidth={1} />
                <span className="text-[10px] tracking-widest">CART ({cartCount})</span>
              </button>
            </div>
            
            <div className="flex items-center justify-center gap-2 text-[#666] text-xs tracking-wider py-4">
               <MapPin size={14} />
               <span>FIND A STORE</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}