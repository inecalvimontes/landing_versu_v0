import { useState } from "react";
import { ArrowRight } from "lucide-react";
import ModalWhatsApp from "./ModalWhatsApp";

const FinalCTA = ({ onDemoClick }) => {
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);

  const openWhatsApp = () => {
    setIsWhatsAppModalOpen(true);
  };

  return (
    <section className="bg-background py-8 md:py-12 lg:py-16 xl:py-20">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-12 xl:px-16 text-center">
        <h2 className="text-[20px] sm:text-[24px] md:text-[32px] lg:text-[40px] tracking-tight text-text font-subtitle">
          ¿Listo para transformar tu atención al cliente?
        </h2>
        <p className="mx-auto mt-1 max-w-2xl text-base sm:text-lg lg:text-xl text-text/80 font-text">
          Agenda una demo personalizada y descubre cómo Versu puede ayudar a tu
          tienda.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button
            onClick={onDemoClick}
            className="glow-btn group inline-flex items-center gap-2 rounded-full border border-accent bg-transparent px-6 py-3 text-base font-medium text-white hover:bg-accent transition-all"
          >
            <span>Solicitar demo</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
          <button
            onClick={openWhatsApp}
            className="glow-btn-whatsapp inline-flex items-center gap-2 rounded-full border border-[#1DAB61] bg-transparent px-6 py-3 text-base font-medium text-white hover:text-white transition-all"
          >
            <img src="/whatsapp.png" alt="WhatsApp" className="h-4 w-4 object-contain" />
            <span>WhatsApp</span>
          </button>
        </div>
      </div>

      <ModalWhatsApp
        isOpen={isWhatsAppModalOpen}
        onClose={() => setIsWhatsAppModalOpen(false)}
      />
    </section>
  );
};

export default FinalCTA;
