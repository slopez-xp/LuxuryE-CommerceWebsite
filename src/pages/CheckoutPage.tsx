import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../components/ui/dialog';

// ROLEX GREEN and GOLD CONSTANTS
const ROLEX_GREEN = '#006039';
const ROLEX_GOLD = '#a37e2c';

interface CheckoutPageProps {
  onNavigate: (page: string) => void;
}

export function CheckoutPage({ onNavigate }: CheckoutPageProps) {
  const { cartItems } = useStore();
  const [isConfirmationOpen, setConfirmationOpen] = useState(false);

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.priceValue * item.quantity, 0);
  const shipping = 0; // Free shipping
  const taxes = subtotal * 0.10; // 10% tax
  const grandTotal = subtotal + shipping + taxes;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);
  };

  const handlePlaceOrder = () => {
    setConfirmationOpen(true);
  };

  const handleContinueShopping = () => {
    setConfirmationOpen(false);
    onNavigate('home');
  };

  return (
    <div className="bg-black text-white min-h-screen">
      <div className="container mx-auto px-4 py-24">
        <h1 className="text-4xl font-serif text-center mb-12 tracking-wider">Checkout</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left Column: Form and Order Items */}
          <div className="lg:col-span-2">
            <div className="bg-[#0a0a0a] border border-[#a37e2c]/20 p-8 rounded-lg mb-8">
              <h2 className="text-2xl font-serif mb-6 text-[#a37e2c]">Billing & Shipping</h2>
              <p>Billing and Shipping Form (Placeholder)</p>
            </div>
            
            <div className="bg-[#0a0a0a] border border-[#a37e2c]/20 p-8 rounded-lg">
              <h2 className="text-2xl font-serif mb-6 text-[#a37e2c]">Order Items</h2>
              <div className="space-y-4">
                {cartItems.map(item => (
                  <div key={item.product.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <img src={item.product.images?.[0] || ''} alt={item.product.name} className="w-16 h-16 object-cover rounded-md" />
                      <div>
                        <p className="font-semibold">{item.product.name}</p>
                        <p className="text-sm text-neutral-400">Quantity: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="font-semibold">{formatPrice(item.product.priceValue * item.quantity)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-[#0a0a0a] border border-[#a37e2c]/20 p-8 rounded-lg">
              <h2 className="text-2xl font-serif mb-6 text-[#a37e2c]">Order Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping & Handling</span>
                  <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Taxes</span>
                  <span>{formatPrice(taxes)}</span>
                </div>
                <div className="border-t border-[#a37e2c]/20 my-4"></div>
                <div className="flex justify-between text-xl font-bold">
                  <span>Grand Total</span>
                  <span>{formatPrice(grandTotal)}</span>
                </div>
              </div>
              <Button
                onClick={handlePlaceOrder}
                className="w-full mt-8 bg-[#a37e2c] text-black font-bold text-lg py-6 hover:bg-[#d4af37]"
              >
                Place Order & Pay
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <Dialog open={isConfirmationOpen} onOpenChange={setConfirmationOpen}>
        <DialogContent className="bg-black text-white border-[#a37e2c]/50">
          <DialogHeader>
            <DialogTitle className="text-2xl font-serif text-center text-[#a37e2c] flex flex-col items-center gap-4">
              <CheckCircle size={48} color={ROLEX_GREEN} />
              Purchase Confirmed
            </DialogTitle>
          </DialogHeader>
          <div className="py-4 text-center">
            <p>Thank you for your order. A confirmation email has been sent to your address.</p>
            <p className="mt-4 font-bold">Total Amount Paid: {formatPrice(grandTotal)}</p>
          </div>
          <DialogFooter>
            <Button
              onClick={handleContinueShopping}
              className="w-full mt-4 bg-transparent border border-[#a37e2c] text-[#a37e2c] hover:bg-[#a37e2c] hover:text-black transition-colors"
            >
              Continue Shopping
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
