import { useState, useEffect } from "react";
import { MessageCircle, Menu, X } from "lucide-react";
import { cn } from "../lib/utils";
import ModalWhatsApp from "./ModalWhatsApp";

const Header = ({ onDemoClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openWhatsApp = () => {
    setIsWhatsAppModalOpen(true);
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={cn(
        "fixed left-0 right-0 top-0 z-50 w-full transition-all duration-300",
        isScrolled || isMobileMenuOpen
          ? "border-b border-text/20 bg-background/95 backdrop-blur-lg"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-12 xl:px-16">
        <div className="flex h-16 lg:h-20 items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center">
            <img 
              src="/logos/versu-logo.svg" 
              alt="Versu" 
              className="h-[60px] sm:h-[72px] lg:h-[144px] w-auto"
              onError={(e) => {
                // Fallback a texto si no existe el logo
                const fallback = e.target.nextElementSibling;
                if (fallback) {
                  e.target.style.display = 'none';
                  fallback.style.display = 'block';
                }
              }}
            />
            <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-text hidden">Versu</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-4 lg:gap-6 md:flex">
            <button 
              onClick={openWhatsApp} 
              className="glow-btn-whatsapp inline-flex items-center gap-2 rounded-full border border-[#1DAB61] bg-transparent px-4 py-2 lg:px-6 lg:py-3 text-sm lg:text-base font-medium text-white hover:text-white transition-all"
            >
              <MessageCircle className="h-4 w-4 lg:h-5 lg:w-5" />
              <span>WhatsApp</span>
            </button>
            <button 
              onClick={onDemoClick}
              className="glow-btn inline-flex items-center rounded-full border border-accent bg-transparent px-4 py-2 lg:px-6 lg:py-3 text-sm lg:text-base font-medium text-white hover:bg-accent transition-all"
            >
              <span>Solicitar demo</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-text/20 bg-background md:hidden"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-4 w-4 text-text" />
            ) : (
              <Menu className="h-4 w-4 text-text" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="border-t border-text/20 bg-background py-4 md:hidden">
            <div className="flex flex-col gap-2">
              <button 
                onClick={() => {
                  openWhatsApp();
                  setIsMobileMenuOpen(false);
                }}
                className="glow-btn-whatsapp inline-flex items-center justify-start gap-2 rounded-full border border-[#1DAB61] bg-transparent px-4 py-2 text-sm font-medium text-white hover:text-white transition-all"
              >
                <MessageCircle className="h-4 w-4" />
                <span>Hablar por WhatsApp</span>
              </button>
              <button 
                onClick={() => { 
                  if (onDemoClick) onDemoClick(); 
                  setIsMobileMenuOpen(false); 
                }}
                className="glow-btn inline-flex items-center rounded-full border border-accent bg-transparent px-4 py-2 text-sm font-medium text-white hover:bg-accent transition-all"
              >
                <span>Solicitar demo</span>
              </button>
            </div>
          </div>
        )}
      </div>

      <ModalWhatsApp
        isOpen={isWhatsAppModalOpen}
        onClose={() => setIsWhatsAppModalOpen(false)}
      />
    </header>
  );
};

export default Header;
