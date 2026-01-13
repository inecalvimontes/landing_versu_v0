import { useState, useEffect } from "react";
import { MessageCircle, Menu, X } from "lucide-react";
import { cn } from "../lib/utils";

const Header = ({ onDemoClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openWhatsApp = () => {
    const message = encodeURIComponent("Hola, quiero saber más sobre Versu");
    window.open(`https://wa.me/56912345678?text=${message}`, "_blank");
  };

  return (
    <header
      className={cn(
        "fixed left-0 right-0 top-0 z-50 transition-all duration-300",
        isScrolled || isMobileMenuOpen
          ? "border-b border-gray-200 bg-white/95 backdrop-blur-lg"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="flex h-16 lg:h-20 items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center">
            <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">Versu</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-4 lg:gap-6 md:flex">
            <button 
              onClick={openWhatsApp} 
              className="inline-flex items-center gap-2 rounded-lg px-4 py-2 lg:px-6 lg:py-3 text-sm lg:text-base font-medium text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <MessageCircle className="h-4 w-4 lg:h-5 lg:w-5" />
              WhatsApp
            </button>
            <button 
              onClick={onDemoClick}
              className="inline-flex items-center rounded-lg bg-indigo-600 px-4 py-2 lg:px-6 lg:py-3 text-sm lg:text-base font-medium text-white hover:bg-indigo-700 transition-colors"
            >
              Solicitar demo
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-300 bg-white md:hidden"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-4 w-4 text-gray-900" />
            ) : (
              <Menu className="h-4 w-4 text-gray-900" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="border-t border-gray-200 bg-white py-4 md:hidden">
            <div className="flex flex-col gap-2">
              <button 
                onClick={() => {
                  openWhatsApp();
                  setIsMobileMenuOpen(false);
                }}
                className="inline-flex items-center justify-start gap-2 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <MessageCircle className="h-4 w-4" />
                Hablar por WhatsApp
              </button>
              <button 
                onClick={() => { 
                  if (onDemoClick) onDemoClick(); 
                  setIsMobileMenuOpen(false); 
                }}
                className="inline-flex items-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition-colors"
              >
                Solicitar demo
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
