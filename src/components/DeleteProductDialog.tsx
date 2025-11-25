import React, { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './ui/alert-dialog';
import { Button } from './ui/button';
import { supabase } from '../lib/supabase';
import { Trash2, Loader2 } from 'lucide-react';

interface DeleteProductDialogProps {
  productId: string;
  onProductDeleted: () => void;
  buttonClassName?: string;
}

// Define the Rolex Gold color constant
const ROLEX_GOLD = '#a37e2c';

const DeleteProductDialog: React.FC<DeleteProductDialogProps> = ({ productId, onProductDeleted, buttonClassName }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const { error } = await supabase.from('products').delete().eq('id', productId);
      
      if (error) {
        throw error;
      }
      
      onProductDeleted();
      // Dialog will close automatically after action
    } catch (error) {
      console.error('Error deleting product:', error);
      // Optional: Add a local error state or notification here
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {/* Trigger Button: Styled to blend in but highlight on hover/focus */}
        <Button 
          variant="ghost" // Use ghost variant for a cleaner look in the table
          size="icon" 
          className={`text-red-400 hover:text-red-500 hover:bg-red-900/30 transition-all ${buttonClassName}`}
        >
          <Trash2 size={20} />
        </Button>
      </AlertDialogTrigger>
      
      {/* IMPROVED ALERT DIALOG CONTENT */}
      <AlertDialogContent 
        className="bg-[#0a0a0a] text-white border border-[#333] shadow-2xl shadow-black/70 max-w-sm p-8"
        style={{ borderRadius: '8px' }}
      >
        <AlertDialogHeader>
          {/* IMPROVED TITLE: Prominent, gold-accented */}
          <AlertDialogTitle 
            className="text-2xl font-serif text-white mb-2 border-b pb-2"
            style={{ borderColor: ROLEX_GOLD }}
          >
            Confirm Deletion
          </AlertDialogTitle>
          <AlertDialogDescription className="text-neutral-400 mt-4">
            You are about to permanently delete this timepiece from the inventory.
            <br />
            <strong className="text-red-400 font-semibold">This action cannot be undone.</strong>
          </AlertDialogDescription>
        </AlertDialogHeader>
        
        <AlertDialogFooter className="mt-6 flex justify-end gap-3">
          {/* CANCEL BUTTON: Styled as a subtle secondary action */}
          <AlertDialogCancel 
            disabled={isDeleting}
            className="bg-neutral-700 text-white hover:bg-neutral-600 hover:text-white border-none transition-colors px-6"
          >
            Cancel
          </AlertDialogCancel>
          
          {/* DELETE BUTTON: Destructive color, but with the luxury feel */}
          <AlertDialogAction 
            onClick={handleDelete} 
            disabled={isDeleting}
            className="bg-red-700 hover:bg-red-800 text-white transition-colors px-6 font-bold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isDeleting ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Deleting...</>
            ) : (
                'Delete Permanently'
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteProductDialog;