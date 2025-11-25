import { Instagram, Facebook, Twitter, Youtube, Linkedin } from 'lucide-react';

// ROLEX GREEN CONSTANT
const ROLEX_GREEN = '#006039';

export function Footer() {
  return (
    <footer className="bg-black border-t border-[#a37e2c]/10 py-12 w-full">
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 w-full">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-0">
          {/* Copyright */}
          <div className="text-[#999999] tracking-[0.05em] text-center md:text-left" style={{ fontFamily: '-apple-system, Helvetica Neue, sans-serif', fontSize: '0.75rem' }}>
            © 2025 Rolex. All rights reserved.
          </div>

          {/* Links */}
          <div className="flex items-center gap-4 md:gap-8 flex-wrap justify-center">
            <button 
              className="text-[#999999] transition-colors tracking-[0.05em]" 
              style={{ fontFamily: '-apple-system, Helvetica Neue, sans-serif', fontSize: '0.75rem' }}
              onMouseEnter={(e) => { e.currentTarget.style.color = ROLEX_GREEN; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = '#999999'; }}
            >
              PRIVACY POLICY
            </button>
            <button 
              className="text-[#999999] transition-colors tracking-[0.05em]" 
              style={{ fontFamily: '-apple-system, Helvetica Neue, sans-serif', fontSize: '0.75rem' }}
              onMouseEnter={(e) => { e.currentTarget.style.color = ROLEX_GREEN; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = '#999999'; }}
            >
              TERMS OF USE
            </button>
          </div>

          {/* Social */}
          <div className="flex items-center gap-4">
            <span className="text-[#999999] mr-2 hidden sm:inline" style={{ fontFamily: '-apple-system, Helvetica Neue, sans-serif', fontSize: '0.75rem' }}>
            </span>

            <a
              href="https://www.instagram.com/rolex/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Rolex on Instagram"
              className="text-[#999999] transition-colors p-2"
              onMouseEnter={(e) => { e.currentTarget.style.color = ROLEX_GREEN; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = '#999999'; }}
            >
              <Instagram size={18} />
            </a>

            <a
              href="https://www.facebook.com/Rolex/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Rolex on Facebook"
              className="text-[#999999] transition-colors p-2"
              onMouseEnter={(e) => { e.currentTarget.style.color = ROLEX_GREEN; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = '#999999'; }}
            >
              <Facebook size={18} />
            </a>

            <a
              href="https://twitter.com/Rolex"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Rolex on X (Twitter)"
              className="text-[#999999] transition-colors p-2"
              onMouseEnter={(e) => { e.currentTarget.style.color = ROLEX_GREEN; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = '#999999'; }}
            >
              <Twitter size={18} />
            </a>

            <a
              href="https://www.youtube.com/@ROLEX"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Rolex on YouTube"
              className="text-[#999999] transition-colors p-2"
              onMouseEnter={(e) => { e.currentTarget.style.color = ROLEX_GREEN; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = '#999999'; }}
            >
              <Youtube size={18} />
            </a>

            <a
              href="https://www.linkedin.com/company/rolex/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Rolex on LinkedIn"
              className="text-[#999999] hover:text-[#a37e2c] transition-colors p-2 hidden sm:inline"
            >
              <Linkedin size={18} />
            </a>
          </div>
        </div>

        {/* Swiss Made Badge */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-2 border border-[#a37e2c]/30 rounded-full">
            <div className="w-2 h-2 bg-[#a37e2c] rounded-full" />
            <span className="text-[#a37e2c] tracking-[0.15em]" style={{ fontFamily: '-apple-system, Helvetica Neue, sans-serif', fontSize: '0.7rem' }}>
              SWISS MADE
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
