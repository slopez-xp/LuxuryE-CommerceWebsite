import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter, // Added DialogFooter
} from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { supabase } from '../lib/supabase';
import { Product } from '../types';
import { Pencil, Loader2 } from 'lucide-react'; // Added Loader2 icon

interface EditProductModalProps {
  product: Product;
  onProductUpdated: () => void;
  buttonClassName?: string;
}

// Define the Rolex Gold color constant
const ROLEX_GOLD = '#a37e2c';

const EditProductModal: React.FC<EditProductModalProps> = ({ product, onProductUpdated, buttonClassName }) => {
  const [open, setOpen] = useState(false);
  // States initialized based on product props for editing
  const [name, setName] = useState(product.name);
  const [subtitle, setSubtitle] = useState(product.subtitle || '');
  const [price, setPrice] = useState(product.priceValue.toString());
  const [description, setDescription] = useState(product.description || '');
  const [category, setCategory] = useState(product.category || '');
  const [images, setImages] = useState(product.images ? product.images.join(', ') : '');
  const [isSubmitting, setIsSubmitting] = useState(false); // New state for loading/submitting
  const [error, setError] = useState<string | null>(null); // New state for errors

  // Effect to reset form state when a different product is passed or modal opens
  useEffect(() => {
    if (product) {
      setName(product.name);
      setSubtitle(product.subtitle || '');
      // Ensure price is converted to a string for the input field
      setPrice(product.priceValue.toString()); 
      setDescription(product.description || '');
      setCategory(product.category || '');
      setImages(product.images ? product.images.join(', ') : '');
      setError(null); // Clear errors when re-opening
    }
  }, [product, open]); // Added 'open' dependency to reset when the modal is triggered

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      const { error } = await supabase
        .from('products')
        .update({
          name,
          subtitle,
          price: parseFloat(price),
          description,
          category,
          images: images ? images.split(',').map((item) => item.trim()) : [],
        })
        .eq('id', product.id);
      
      if (error) {
        throw new Error(error.message || 'Failed to update product.');
      }
      
      onProductUpdated();
      setOpen(false); // Close the modal on success
    } catch (err: any) {
      console.error('Error updating product:', err);
      setError(`Update failed: ${err.message || 'Unknown error'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {/* Trigger Button: Styled for a cleaner look in the table */}
        <Button 
          variant="ghost" 
          size="icon" 
          className={`text-white/70 hover:text-white hover:bg-white/10 transition-all ${buttonClassName}`}
        >
          <Pencil size={20} />
        </Button>
      </DialogTrigger>
      
      {/* IMPROVED DIALOG CONTENT STYLE */}
      <DialogContent 
        className="bg-[#0a0a0a] text-white border border-[#333] shadow-2xl shadow-black/70 max-w-lg p-8"
        style={{ borderRadius: '8px' }}
      >
        <DialogHeader className="mb-4">
          {/* IMPROVED TITLE TYPOGRAPHY (Serif + Gold Accent) */}
          <DialogTitle 
            className="text-3xl font-serif text-white mb-2 border-b-2 pb-2"
            style={{ borderBottomColor: ROLEX_GOLD }}
          >
            Edit Timepiece
          </DialogTitle>
          <p className="text-sm text-neutral-500">
            Updating product: <strong className="text-white">{product.name}</strong>
          </p>
        </DialogHeader>
        
        {/* SUBMISSION ERROR MESSAGE */}
        {error && (
            <div className="p-3 bg-red-900/50 border border-red-800 text-red-300 text-sm rounded-md">
                {error}
            </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5 mt-4">
          
          {/* INPUT FIELDS - IMPROVED STYLING */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-neutral-300 text-xs tracking-widest uppercase">Name</Label>
            <Input 
              id="name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              className="bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-600 focus:border-rolex-gold focus:ring-1 focus:ring-rolex-gold transition-all" 
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price" className="text-neutral-300 text-xs tracking-widest uppercase">Price (Numeric)</Label>
              <Input 
                id="price" 
                type="number" 
                value={price} 
                onChange={(e) => setPrice(e.target.value)} 
                className="bg-neutral-800 border-neutral-700 text-white focus:border-rolex-gold focus:ring-1 focus:ring-rolex-gold transition-all" 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category" className="text-neutral-300 text-xs tracking-widest uppercase">Category</Label>
              <Input 
                id="category" 
                value={category} 
                onChange={(e) => setCategory(e.target.value)} 
                className="bg-neutral-800 border-neutral-700 text-white focus:border-rolex-gold focus:ring-1 focus:ring-rolex-gold transition-all" 
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="subtitle" className="text-neutral-300 text-xs tracking-widest uppercase">Subtitle</Label>
            <Input 
              id="subtitle" 
              value={subtitle} 
              onChange={(e) => setSubtitle(e.target.value)} 
              className="bg-neutral-800 border-neutral-700 text-white focus:border-rolex-gold focus:ring-1 focus:ring-rolex-gold transition-all" 
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-neutral-300 text-xs tracking-widest uppercase">Description</Label>
            <Input 
              id="description" 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              className="bg-neutral-800 border-neutral-700 text-white focus:border-rolex-gold focus:ring-1 focus:ring-rolex-gold transition-all" 
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="images" className="text-neutral-300 text-xs tracking-widest uppercase">Images (Comma-separated URLs)</Label>
            <Input 
              id="images" 
              value={images} 
              onChange={(e) => setImages(e.target.value)} 
              placeholder="url1.jpg, url2.jpg, url3.png"
              className="bg-neutral-800 border-neutral-700 text-white focus:border-rolex-gold focus:ring-1 focus:ring-rolex-gold transition-all" 
            />
          </div>
          
          <DialogFooter className="pt-4">
            {/* SUBMIT BUTTON - ADDED LOADING STATE */}
            <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full sm:w-auto px-6 py-3 text-black font-bold tracking-widest uppercase transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: ROLEX_GOLD, hover: { backgroundColor: ROLEX_GOLD, opacity: 0.9 } }}
            >
                {isSubmitting ? (
                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...</>
                ) : (
                    'Save Changes'
                )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProductModal;