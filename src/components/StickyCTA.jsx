import { useState, useEffect } from "react";
import ModalWhatsApp from "./ModalWhatsApp";

const StickyCTA = ({ onDemoClick }) => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);

  useEffect(() => {
    const formElement = document.getElementById("demo-form");
    if (!formElement) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Ocultar la barra cuando el formulario está visible en el viewport
        setIsFormVisible(entry.isIntersecting);
      },
      { 
        threshold: 0.1,
        rootMargin: '-50px 0px 0px 0px' // Empezar a ocultar un poco antes de que llegue al viewport
      }
    );

    observer.observe(formElement);

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleWhatsApp = () => {
    setIsWhatsAppModalOpen(true);
  };

  // No mostrar la barra si el formulario está visible
  if (isFormVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-background/95 backdrop-blur-lg border-t border-text/20 shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex gap-3">
          <button
            onClick={handleWhatsApp}
            className="glow-btn-whatsapp flex-shrink-0 inline-flex items-center justify-center rounded-full border border-[#1DAB61] bg-transparent px-4 py-2 text-sm font-medium text-white hover:text-white transition-all"
            aria-label="Abrir WhatsApp"
          >
            <img src="/whatsapp.png" alt="WhatsApp" className="w-4 h-4 object-contain" />
          </button>
          <button
            onClick={onDemoClick}
            className="glow-btn flex-1 inline-flex items-center justify-center rounded-full border border-accent bg-transparent px-4 py-3 text-sm font-medium text-white hover:bg-accent transition-all"
          >
            <span>Solicitar demo</span>
          </button>
        </div>
      </div>

      <ModalWhatsApp
        isOpen={isWhatsAppModalOpen}
        onClose={() => setIsWhatsAppModalOpen(false)}
      />
    </div>
  );
};

export default StickyCTA;
