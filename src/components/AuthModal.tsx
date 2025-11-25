import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Loader2 } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Define the Rolex Gold color constant
const ROLEX_GOLD = '#a37e2c';

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { signInWithEmail, signUpWithEmail } = useAuth();

  const handleFormToggle = () => {
    setIsSignIn(!isSignIn);
    setError(null);
    setEmail('');
    setPassword('');
  };
  
  const resetFormAndClose = () => {
    setEmail('');
    setPassword('');
    setError(null);
    setIsSubmitting(false);
    onClose();
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    
    try {
      if (isSignIn) {
        await signInWithEmail(email, password);
      } else {
        await signUpWithEmail(email, password);
      }
      // If submission is successful, close the modal
      resetFormAndClose();
    } catch (err: any) {
      // Catch specific Supabase errors if possible
      const errorMessage = err.message || 'An unexpected error occurred.';
      setError(errorMessage.includes('Invalid login credentials') ? 'Invalid email or password.' : errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open: any) => {
      if (!open) resetFormAndClose(); // Ensure state is reset when closing
    }}>
      {/* IMPROVED DIALOG CONTENT: Darker background, border accent, better padding */}
      <DialogContent 
        className="bg-[#0a0a0a] text-white border border-[#333] shadow-2xl shadow-black/70 max-w-sm p-8"
        style={{ borderRadius: '8px' }}
      >
        <DialogHeader className="mb-4 text-center">
          {/* IMPROVED TITLE: Serif font, large, gold accent */}
          <DialogTitle 
            className="text-3xl font-serif text-white mb-1 border-b-2 pb-2"
            style={{ borderBottomColor: ROLEX_GOLD }}
          >
            {isSignIn ? 'Welcome Back' : 'Create Account'}
          </DialogTitle>
          <p className="text-sm text-neutral-500 mt-2">
            {isSignIn ? 'Access your private collection area' : 'Join the exclusive community'}
          </p>
        </DialogHeader>
        
        {/* SUBMISSION ERROR MESSAGE */}
        {error && (
            <div className="p-3 bg-red-900/50 border border-red-800 text-red-300 text-sm rounded-md mb-4">
                {error}
            </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* INPUT FIELDS - HIGH CONTRAST STYLING */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-neutral-300 text-xs tracking-widest uppercase">Email</Label>
            <Input 
              id="email" 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required
              disabled={isSubmitting}
              className="bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-600 focus:border-rolex-gold focus:ring-1 focus:ring-rolex-gold transition-all" 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-neutral-300 text-xs tracking-widest uppercase">Password</Label>
            <Input 
              id="password" 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required
              disabled={isSubmitting}
              className="bg-neutral-800 border-neutral-700 text-white focus:border-rolex-gold focus:ring-1 focus:ring-rolex-gold transition-all" 
            />
          </div>
          
          <DialogFooter>
            {/* SUBMIT BUTTON - GOLD AND WIDE */}
            <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full px-6 py-3 text-black font-bold tracking-widest uppercase transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                style={{ backgroundColor: ROLEX_GOLD, hover: { backgroundColor: ROLEX_GOLD, opacity: 0.9 } }}
            >
                {isSubmitting ? (
                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> {isSignIn ? 'Signing In...' : 'Signing Up...'}</>
                ) : (
                    isSignIn ? 'Sign In' : 'Sign Up'
                )}
            </Button>
          </DialogFooter>
        </form>
        
        {/* FORM TOGGLE BUTTON */}
        <div className="text-center mt-4 pt-4 border-t border-neutral-800">
          <button onClick={handleFormToggle} className="text-sm text-neutral-400 hover:text-white transition-colors underline-offset-4 hover:underline">
            {isSignIn ? 'Need an account? Sign Up' : 'Already have an account? Sign In'}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;