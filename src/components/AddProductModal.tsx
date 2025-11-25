import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter, // Added DialogFooter for better button placement
} from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { supabase } from '../lib/supabase';
import { Plus, Loader2 } from 'lucide-react'; // Added Loader2 icon

interface AddProductModalProps {
  onProductAdded: () => void;
  buttonClassName?: string;
}

// Define the Rolex Gold color constant
const ROLEX_GOLD = '#a37e2c';

const AddProductModal: React.FC<AddProductModalProps> = ({ onProductAdded, buttonClassName }) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [images, setImages] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); // New state for loading/submitting
  const [error, setError] = useState<string | null>(null); // New state for errors

  const resetForm = () => {
    setName('');
    setSubtitle('');
    setPrice('');
    setDescription('');
    setCategory('');
    setImages('');
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const { error } = await supabase.from('products').insert([
        {
          name,
          subtitle,
          price: parseFloat(price),
          description,
          category,
          // Split and trim images, ensuring it handles empty input gracefully
          images: images ? images.split(',').map((item) => item.trim()) : [],
        },
      ]);

      if (error) {
        // More specific error handling
        throw new Error(error.message || 'Failed to add product.');
      }

      onProductAdded();
      resetForm();
      setOpen(false);
    } catch (err: any) {
      console.error('Error adding product:', err);
      setError(`Submission failed: ${err.message || 'Unknown error'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(o: boolean | ((prevState: boolean) => boolean)) => {
        setOpen(o);
        if (!o) resetForm(); // Reset form when modal closes
    }}>
      <DialogTrigger asChild>
        {/* IMPROVED TRIGGER BUTTON STYLE (Using a clean dark theme) */}
        <Button 
            className={buttonClassName}
        >
          <Plus size={18} />
          Add New Timepiece
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
            Add New Timepiece
          </DialogTitle>
          <p className="text-sm text-neutral-500">
            Enter all required details for the new product listing.
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
            <Label htmlFor="name" className="text-neutral-300 text-xs tracking-widest uppercase">Name <span className="text-red-500">*</span></Label>
            <Input 
              id="name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required
              className="bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-600 focus:border-rolex-gold focus:ring-1 focus:ring-rolex-gold transition-all" 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="price" className="text-neutral-300 text-xs tracking-widest uppercase">Price (Numeric) <span className="text-red-500">*</span></Label>
            <Input 
              id="price" 
              type="number" 
              value={price} 
              onChange={(e) => setPrice(e.target.value)} 
              required
              className="bg-neutral-800 border-neutral-700 text-white focus:border-rolex-gold focus:ring-1 focus:ring-rolex-gold transition-all" 
            />
          </div>
          
          {/* OPTIONAL FIELDS */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category" className="text-neutral-300 text-xs tracking-widest uppercase">Category</Label>
              <Input 
                id="category" 
                value={category} 
                onChange={(e) => setCategory(e.target.value)} 
                className="bg-neutral-800 border-neutral-700 text-white focus:border-rolex-gold focus:ring-1 focus:ring-rolex-gold transition-all" 
              />
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
                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...</>
                ) : (
                    'Add Product'
                )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddProductModal;