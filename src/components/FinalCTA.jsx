import { ArrowRight, MessageCircle } from "lucide-react";

const FinalCTA = ({ onDemoClick }) => {
  const openWhatsApp = () => {
    const message = encodeURIComponent("Hola, quiero saber más sobre Versu");
    window.open(`https://wa.me/525512345678?text=${message}`, "_blank");
  };

  return (
    <section className="bg-indigo-600 py-16 md:py-24 lg:py-32 xl:py-40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 xl:px-12 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl xl:text-6xl">
          ¿Listo para transformar tu atención al cliente?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg lg:text-xl xl:text-2xl text-white/80">
          Agenda una demo personalizada y descubre cómo Versu puede ayudar a tu
          tienda.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button
            onClick={onDemoClick}
            className="group inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-base font-medium text-indigo-600 hover:bg-gray-100 transition-colors"
          >
            Solicitar demo
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
          <button
            onClick={openWhatsApp}
            className="inline-flex items-center gap-2 rounded-lg border-2 border-white/20 bg-transparent px-6 py-3 text-base font-medium text-white hover:bg-white/10 transition-colors"
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
