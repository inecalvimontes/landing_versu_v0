import { ArrowRight, MessageCircle } from "lucide-react";

const FinalCTA = ({ onDemoClick }) => {
  const openWhatsApp = () => {
    const message = encodeURIComponent("Hola, quiero saber más sobre Versu");
    window.open(`https://wa.me/525512345678?text=${message}`, "_blank");
  };

  return (
    <section className="bg-background py-8 md:py-12 lg:py-16 xl:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 xl:px-12 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-text md:text-4xl lg:text-5xl xl:text-6xl">
          ¿Listo para transformar tu atención al cliente?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg lg:text-xl xl:text-2xl text-text/80">
          Agenda una demo personalizada y descubre cómo Versu puede ayudar a tu
          tienda.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button
            onClick={onDemoClick}
            className="group inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-base font-medium text-white hover:bg-accent/90 transition-colors"
          >
            Solicitar demo
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
          <button
            onClick={openWhatsApp}
            className="inline-flex items-center gap-2 rounded-lg border-2 border-text/20 bg-transparent px-6 py-3 text-base font-medium text-text hover:bg-[#25D366] hover:text-white transition-colors"
          >
            <MessageCircle className="h-4 w-4" />
            Hablar por WhatsApp
          </button>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
