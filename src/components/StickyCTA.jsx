import { useState, useEffect } from "react";
import { MessageCircle } from "lucide-react";

const StickyCTA = ({ onDemoClick }) => {
  const [isFormVisible, setIsFormVisible] = useState(false);

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
    const message = encodeURIComponent("Hola, quiero saber más sobre Versu");
    window.open(`https://wa.me/56912345678?text=${message}`, "_blank");
  };

  // No mostrar la barra si el formulario está visible
  if (isFormVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-background/95 backdrop-blur-lg border-t border-text/20 shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex gap-3">
          <button
            onClick={handleWhatsApp}
            className="flex-shrink-0 inline-flex items-center justify-center rounded-lg border border-text/20 bg-background px-4 py-2 text-sm font-medium text-text hover:bg-[#25D366] hover:text-white transition-colors"
            aria-label="Abrir WhatsApp"
          >
            <MessageCircle className="w-4 h-4" />
          </button>
          <button
            onClick={onDemoClick}
            className="flex-1 inline-flex items-center justify-center rounded-lg bg-accent px-4 py-3 text-sm font-medium text-white hover:bg-accent/90 transition-colors"
          >
            Solicitar demo
          </button>
        </div>
      </div>
    </div>
  );
};

export default StickyCTA;
