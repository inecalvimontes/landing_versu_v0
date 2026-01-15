import { useState, useEffect, useRef } from "react";
import { Check, ArrowRight, Play, X } from "lucide-react";

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
      <div className="relative hidden overflow-hidden lg:block">
        {/* Marquee track - duplicamos el array para hacer el loop infinito */}
        <div className="flex animate-marquee">
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
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isHeroVisible, setIsHeroVisible] = useState(true);
  const videoRef = useRef(null);
  const heroSectionRef = useRef(null);

  const features = [
    "Integración en menos de 48 horas.",
    "Respuestas 24/7 con voz y tono de tu marca.",
    "Atiende consultas, carritos abandonados y post-venta en WhatsApp, Instagram y Web.",
  ];

  // Detectar cuando el hero sale del viewport
  useEffect(() => {
    if (!heroSectionRef.current || !isVideoModalOpen) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeroVisible(entry.isIntersecting);
      },
      {
        threshold: 0.1,
        rootMargin: '-50px 0px 0px 0px'
      }
    );

    observer.observe(heroSectionRef.current);

    return () => {
      observer.disconnect();
    };
  }, [isVideoModalOpen]);

  // Reproducir video cuando se abre el modal
  useEffect(() => {
    if (isVideoModalOpen && videoRef.current) {
      videoRef.current.play().catch(console.error);
    } else if (!isVideoModalOpen && videoRef.current) {
      // Pausar video cuando se cierra el modal
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [isVideoModalOpen]);

  const handleOpenVideo = () => {
    setIsVideoModalOpen(true);
  };

  const handleCloseVideo = () => {
    setIsVideoModalOpen(false);
  };

  // Cerrar modal con tecla Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isVideoModalOpen) {
        setIsVideoModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isVideoModalOpen]);

  return (
    <section ref={heroSectionRef} className="relative w-full overflow-hidden pt-[86px] pb-8 md:pt-[115px] md:pb-12 lg:pt-[144px] lg:pb-16 xl:pt-[173px] xl:pb-20">
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
      
      <div className="relative z-20 mx-auto max-w-7xl px-6 sm:px-10 lg:px-12 xl:px-16">

        <div>
          {/* Left: Content */}
          <div className="max-w-xl xl:max-w-2xl">
            {/* Badge de "Única IA..." - alineado con Convierte */}
            {/* <span className="inline-flex items-center rounded-full px-3 py-1.5 text-[10px] sm:text-[12px] lg:text-[16px] font-detail italic text-text/80 backdrop-blur-sm">
              Única IA especializada para e-commerce en LatAm
            </span> */}

            <h1 className="mt-0 text-balance text-[30px] sm:text-[35px] lg:text-[40px] tracking-tight text-text font-semibold">
            Tu equipo no da abasto,<br />Versu AI sí
            </h1>

            <p className="mt-6 text-base sm:text-lg lg:text-xl text-text font-text">
              El único agente de IA construido solo para e-commerce.<br />Automatiza ventas, soporte y post-venta sin perder control. <br />
            </p>

            <ul className="mt-8 space-y-3">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center gap-3 text-base font-text">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-transparent border border-accent flex-shrink-0">
                    <Check className="h-3 w-3 text-white" />
                  </div>
                  <span className="text-text lg:whitespace-nowrap">{feature}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col gap-3">
              <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                <button
                  onClick={onDemoClick}
                  className="glow-btn group inline-flex items-center justify-center gap-2 rounded-full border border-accent bg-transparent px-6 py-3 text-base font-medium text-white hover:bg-accent transition-all h-12"
                >
                  <span>Solicitar demo</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
                <button
                  onClick={handleOpenVideo}
                  className="glow-btn-white group inline-flex items-center justify-center gap-3 rounded-full border border-[#f2f2f2]/80 bg-transparent px-6 py-3 text-base font-medium text-[#f2f2f2] transition-all h-12 box-border"
                >
                  <div className="play-icon-container flex items-center justify-center w-6 h-6 rounded-full bg-[#f2f2f2] flex-shrink-0 transition-colors">
                    <Play className="h-3 w-3 fill-[#202020] ml-0.5" />
                  </div>
                  <span>Video completo</span>
                </button>
              </div>
              <p className="text-sm text-text/60">
                Toma 2 minutos. Sin spam.
              </p>
            </div>

          </div>
        </div>
        
        {/* Stats - Centrado en toda la página */}
        <div className="mt-10 w-full flex items-center justify-center">
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 lg:gap-8 text-xs sm:text-base lg:text-lg text-text/60">
            <div className="flex items-center gap-1 sm:gap-2">
              <span className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-text whitespace-nowrap">+100</span>
              <span className="whitespace-nowrap">tiendas</span>
            </div>
            <div className="h-8 sm:h-10 w-px bg-text/20 flex-shrink-0" />
            <div className="flex items-center gap-1 sm:gap-2">
              <span className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-text whitespace-nowrap">4</span>
              <span className="whitespace-nowrap">países</span>
            </div>
            <div className="h-8 sm:h-10 w-px bg-text/20 flex-shrink-0" />
            <div className="flex items-center gap-1 sm:gap-2">
              <span className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-text whitespace-nowrap">7 días</span>
              <span className="whitespace-nowrap">implementación</span>
            </div>
            <div className="h-8 sm:h-10 w-px bg-text/20 flex-shrink-0" />
            <div className="flex items-center gap-1 sm:gap-2">
              <span className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-text whitespace-nowrap">35%</span>
              <span className="whitespace-nowrap">conversión en carritos</span>
            </div>
          </div>
        </div>

        <div className="max-w-xl xl:max-w-2xl">
          {/* Integramos con: */}
          <div className="mt-10">
            <p className="mb-3 text-xs text-text/60">Integramos con:</p>
          </div>
        </div>
        
        {/* E-commerce integrations carousel - se extiende a todo el ancho */}
        <div className="mt-8 lg:mt-12">
          <IntegrationsCarousel />
        </div>
      </div>

      {/* Modal de video en pantalla completa o flotante */}
      {isVideoModalOpen && (
        <>
          {/* Fondo semi-transparente solo cuando el hero es visible */}
          {isHeroVisible && (
            <div 
              className="fixed inset-0 z-[9998] bg-black/50 transition-opacity duration-300"
              onClick={handleCloseVideo}
            />
          )}
          
          {/* Contenedor del video */}
          <div 
            className={`fixed z-[9999] transition-all duration-[1500ms] ease-in-out ${
              isHeroVisible
                ? 'inset-0 flex items-center justify-center p-4 opacity-100'
                : 'bottom-4 right-4 w-80 h-48 md:w-96 md:h-56 lg:w-[28rem] lg:h-[16rem] shadow-2xl rounded-lg overflow-hidden opacity-100'
            }`}
            style={{
              transitionProperty: 'width, height, top, right, bottom, left, border-radius, box-shadow, opacity',
            }}
            onClick={(e) => {
              if (isHeroVisible) {
                e.stopPropagation();
              }
            }}
          >
            {/* Botón cerrar */}
            <button
              onClick={handleCloseVideo}
              className={`absolute z-50 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-[1500ms] ease-in-out backdrop-blur-sm ${
                isHeroVisible
                  ? 'top-4 right-4 opacity-100'
                  : 'top-2 right-2 opacity-100'
              }`}
              aria-label="Cerrar video"
            >
              <X className={`transition-all duration-[1500ms] ease-in-out ${isHeroVisible ? 'h-6 w-6' : 'h-4 w-4'}`} />
            </button>

            {/* Reproductor de video */}
            <video
              ref={videoRef}
              controls
              autoPlay
              className={`object-contain transition-all duration-[1500ms] ease-in-out ${
                isHeroVisible
                  ? 'w-full h-full max-w-7xl max-h-[90vh] opacity-100'
                  : 'w-full h-full opacity-100'
              }`}
              style={{
                transitionProperty: 'width, height, max-width, max-height, opacity',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <source src="/video hero.MOV" type="video/mp4" />
              Tu navegador no soporta la reproducción de video.
            </video>
          </div>
        </>
      )}
    </section>
  );
};

export default Hero;
