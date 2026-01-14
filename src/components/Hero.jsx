import { Check, ArrowRight, Play } from "lucide-react";

// Partners integrations - TODOS los logos locales de la carpeta partners
const partnersLogos = [
  { name: "Amplifica", logo: "/logos/partners/amplifica.svg" },
  { name: "Blue Express", logo: "/logos/partners/blue express 2.svg" },
  { name: "BSale", logo: "/logos/partners/bsale.svg" },
  { name: "Clickex", logo: "/logos/partners/clickex.svg" },
  { name: "Despachalo", logo: "/logos/partners/despachalo.svg" },
  { name: "Enviame", logo: "/logos/partners/enviame.svg" },
  { name: "Falabella", logo: "/logos/partners/falabella.svg" },
  { name: "Fazt", logo: "/logos/partners/fazt.svg" },
  { name: "Flapp", logo: "/logos/partners/flapp.svg" },
  { name: "Instagram", logo: "/logos/partners/instagram.svg" },
  { name: "JumpSeller", logo: "/logos/partners/jumpseller.svg" },
  { name: "Magento", logo: "/logos/partners/magento.svg" },
  { name: "Mercado Libre", logo: "/logos/partners/mercado libre.svg" },
  { name: "Meta Tech Provider", logo: "/logos/partners/meta tech provider.svg" },
  { name: "PrestaShop", logo: "/logos/partners/prestashop.svg" },
  { name: "Recibelo", logo: "/logos/partners/recibelo.svg" },
  { name: "SavvyCal", logo: "/logos/partners/savvycal.svg" },
  { name: "Shipit", logo: "/logos/partners/shipit.svg" },
  { name: "Shopify", logo: "/logos/partners/shopify 2.svg" },
  { name: "Starken", logo: "/logos/partners/starken.svg" },
  { name: "VTEX", logo: "/logos/partners/vtex logo.svg" },
  { name: "Vtiger", logo: "/logos/partners/vtiger.svg" },
  { name: "WhatsApp", logo: "/logos/partners/whatsapp.svg" },
  { name: "WooCommerce", logo: "/logos/partners/woocommerce final.svg" },
];

// Países disponibles
const countries = [
  { flag: "🇨🇱", name: "Chile", code: "CL" },
  { flag: "🇲🇽", name: "México", code: "MX" },
  { flag: "🇨🇴", name: "Colombia", code: "CO" },
  { flag: "🇵🇪", name: "Perú", code: "PE" },
];

// Componente de países estáticos
const CountryCarousel = () => {
  return (
    <div className="flex items-center justify-between w-full">
      {countries.map((country, index) => (
        <div
          key={index}
          className="inline-flex items-center gap-1.5 rounded-full border border-text/20 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm backdrop-blur-sm"
        >
          {/* Imagen de bandera desde CDN */}
          <img 
            src={`https://flagcdn.com/w20/${country.code.toLowerCase()}.png`}
            alt={`Bandera de ${country.name}`}
            className="w-5 h-4 object-cover rounded-sm"
            onError={(e) => {
              // Fallback a emoji si la imagen no carga
              e.target.style.display = 'none';
              const emoji = document.createElement('span');
              emoji.className = 'text-base';
              emoji.textContent = country.flag;
              e.target.parentElement.insertBefore(emoji, e.target);
            }}
          />
          <span className="font-medium text-text whitespace-nowrap">{country.name}</span>
        </div>
      ))}
    </div>
  );
};

const IntegrationsCarousel = () => {
  return (
    <div>
      {/* Mobile: horizontal scroll */}
      <div className="overflow-x-auto scrollbar-hide lg:hidden px-4 sm:px-6">
        <div className="flex gap-4 pb-2">
          {partnersLogos.map((partner, index) => (
            <div
              key={index}
              className="flex-shrink-0 flex items-center justify-center h-16 px-3"
            >
              <img 
                src={partner.logo} 
                alt={partner.name}
                className="h-12 w-auto max-w-[140px] object-contain opacity-50 grayscale hover:opacity-100 hover:grayscale-0 transition-all"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Desktop: infinite marquee - se extiende a todo el ancho con márgenes */}
      <div className="relative hidden overflow-hidden lg:block -mx-4 sm:-mx-6 lg:-mx-20 xl:-mx-24">
        {/* Fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent" />
        
        {/* Marquee track - duplicamos el array para hacer el loop infinito */}
        <div className="flex animate-marquee px-4 sm:px-6 lg:px-20 xl:px-24">
          {[...partnersLogos, ...partnersLogos, ...partnersLogos].map((partner, index) => (
            <div
              key={index}
              className="mx-4 flex-shrink-0 flex items-center justify-center h-20 px-4"
            >
              <img 
                src={partner.logo} 
                alt={partner.name}
                className="h-16 w-auto max-w-[160px] object-contain opacity-50 grayscale hover:opacity-100 hover:grayscale-0 transition-all"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Hero = ({ onDemoClick }) => {
  const features = [
    "Responde 24/7 con el tono de tu marca",
    "Reduce preguntas repetidas y tickets operativos",
    "Activa flujos como carrito abandonado y postventa",
  ];

  return (
    <section className="relative overflow-hidden pt-[72px] pb-8 md:pt-24 md:pb-12 lg:pt-[120px] lg:pb-16 xl:pt-36 xl:pb-20">
      {/* Video de fondo */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/video hero.MOV" type="video/quicktime" />
        <source src="/video hero.MOV" type="video/mp4" />
      </video>
      {/* Overlay oscuro para legibilidad */}
      <div className="absolute inset-0 bg-background/80 z-10"></div>
      
      <div className="relative z-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-20 xl:px-24">
        <div>
          {/* Left: Content */}
          <div className="max-w-xl xl:max-w-2xl">
            {/* Badge de "Única IA..." - alineado con Convierte */}
            <span className="inline-flex items-center rounded-full px-3 py-1.5 text-xs sm:text-sm lg:text-base font-medium italic text-text/80 backdrop-blur-sm">
              Única IA especializada para e-commerce en LatAm
            </span>

            <h1 className="mt-0 text-balance text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl xl:text-6xl text-text">
              Convierte tus chats de WhatsApp e Instagram en{" "}
              <span className="text-accent">ventas y soporte</span>, sin sumar
              más carga a tu equipo.
            </h1>

            <p className="mt-6 text-lg lg:text-xl xl:text-2xl text-text/70">
              Versu instala agentes de IA entrenados en tu tienda para responder
              consultas, recuperar carritos y derivar casos complejos al equipo
              humano.
            </p>

            <div className="relative">
              <ul className="mt-8 space-y-3">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3 text-sm">
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-accent/20">
                      <Check className="h-3 w-3 text-accent" />
                    </div>
                    <span className="text-text">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Botón Play sobre el bloque de Impacto */}
              <button className="hidden lg:flex absolute left-[calc(110%+370px)] xl:left-[calc(110%+420px)] -top-16 items-center gap-2 rounded-lg bg-accent px-4 py-2 lg:px-6 lg:py-3 text-sm lg:text-base font-medium text-white hover:bg-accent/90 transition-colors shadow-lg z-30">
                <Play className="h-4 w-4 lg:h-5 lg:w-5 fill-white" />
                <span>Play</span>
              </button>

              {/* Tarjetas de Testimonio e Impacto a la derecha - versión desktop */}
              <div className="hidden lg:grid absolute left-[110%] top-0 grid-cols-2 gap-4 w-[500px] xl:w-[550px]">
                <div className="rounded-xl border border-text/20 bg-background/60 backdrop-blur-sm p-4 shadow-sm h-full">
                  <p className="text-xs text-text/60 mb-2">Testimonio</p>
                  <p className="text-sm text-text leading-relaxed">
                    "Versu redujo nuestras consultas repetidas en un 60%."
                  </p>
                </div>
                <div className="rounded-xl border border-text/20 bg-background/60 backdrop-blur-sm p-4 shadow-sm h-full">
                  <p className="text-xs text-text/60 mb-2">Impacto</p>
                  <p className="text-2xl font-bold text-text">+35%</p>
                  <p className="text-sm text-text/60">conversión en carritos</p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <button
                onClick={onDemoClick}
                className="group inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-base font-medium text-white hover:bg-accent/90 transition-colors"
              >
                Solicitar demo
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
              <p className="text-sm text-text/60">
                Toma 2 minutos. Sin spam.
              </p>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-6 text-sm text-text/60">
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-text">+100</span>
                <span>tiendas</span>
              </div>
              <div className="h-6 w-px bg-text/20" />
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-text">4</span>
                <span>países</span>
              </div>
              <div className="h-6 w-px bg-text/20" />
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-text">7 días</span>
                <span>implementación</span>
              </div>
            </div>

            {/* Integramos con: */}
            <div className="mt-10">
              <p className="mb-3 text-xs text-text/60">Integramos con:</p>
            </div>

            {/* Tarjetas de Testimonio e Impacto - versión móvil */}
            <div className="mt-10 grid lg:hidden grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
              <div className="rounded-xl border border-text/20 bg-background/60 backdrop-blur-sm p-4 shadow-sm">
                <p className="text-xs text-text/60 mb-2">Testimonio</p>
                <p className="text-sm text-text leading-relaxed">
                  "Versu redujo nuestras consultas repetidas en un 60%."
                </p>
              </div>
              <div className="rounded-xl border border-text/20 bg-background/60 backdrop-blur-sm p-4 shadow-sm">
                <p className="text-xs text-text/60 mb-2">Impacto</p>
                <p className="text-2xl font-bold text-text">+35%</p>
                <p className="text-sm text-text/60">conversión en carritos</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* E-commerce integrations carousel - se extiende a todo el ancho */}
        <div className="mt-8 lg:mt-12">
          <IntegrationsCarousel />
        </div>
      </div>
    </section>
  );
};

export default Hero;
