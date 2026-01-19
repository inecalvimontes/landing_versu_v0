import { useState, useEffect, useRef } from "react";
import { Check, ArrowRight } from "lucide-react";
// import { Play, X } from "lucide-react"; // Comentado - no se usa el modal de video

// Partners integrations - 24 logos de la carpeta partners
const partnersLogos = [
  { name: "Amplifica", logo: "/logos/partners/amplifica 2.svg" },
  { name: "Blue Express", logo: "/logos/partners/blue express.svg" },
  { name: "BSale", logo: "/logos/partners/bsale.svg" },
  { name: "Clickex", logo: "/logos/partners/clickex.svg", smallest: true },
  { name: "Despachalo", logo: "/logos/partners/despachalo.svg" },
  { name: "Enviame", logo: "/logos/partners/enviame.svg" },
  { name: "Falabella", logo: "/logos/partners/falabella.svg" },
  { name: "Fazt", logo: "/logos/partners/fazt.svg" },
  { name: "Flapp", logo: "/logos/partners/flapp.svg" },
  { name: "Instagram", logo: "/logos/partners/instagram.svg" },
  { name: "JumpSeller", logo: "/logos/partners/jumpseller.svg" },
  { name: "Magento", logo: "/logos/partners/magento.svg" },
  { name: "Mercado Libre", logo: "/logos/partners/mercado libre.svg" },
  { name: "Meta", logo: "/logos/partners/meta logo.svg" },
  { name: "PrestaShop", logo: "/logos/partners/prestashop.svg" },
  { name: "Recibelo", logo: "/logos/partners/recibelo.svg" },
  { name: "SavvyCal", logo: "/logos/partners/savvycal.svg" },
  { name: "Shipit", logo: "/logos/partners/shipit.svg" },
  { name: "Shopify", logo: "/logos/partners/shopify 2.svg" },
  { name: "Starken", logo: "/logos/partners/starken.svg", smaller: true },
  { name: "VTEX", logo: "/logos/partners/vtex.svg" },
  { name: "Vtiger", logo: "/logos/partners/vtiger.svg" },
  { name: "WhatsApp", logo: "/logos/partners/whatsapp.svg" },
  { name: "WooCommerce", logo: "/logos/partners/woocomerce final.svg" },
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
  const [activeIndex, setActiveIndex] = useState(null);
  const marqueeRef = useRef(null);

  const handleClick = (index) => {
    setActiveIndex(index);
    setTimeout(() => {
      setActiveIndex(null);
    }, 2000);
  };

  const handleMarqueeHover = (element) => {
    if (!element) return;
    
    try {
      // Obtener duración actual basada en el tamaño de pantalla
      const isMobile = window.innerWidth < 640;
      const isTablet = window.innerWidth >= 640 && window.innerWidth < 1024;
      const normalDuration = isMobile ? 25 : isTablet ? 35 : 45;
      const slowDuration = normalDuration * 2;
      
      // Obtener el transform actual del elemento
      const computedStyle = window.getComputedStyle(element);
      const matrix = computedStyle.transform;
      
      if (matrix && matrix !== 'none') {
        const matrixValues = matrix.match(/matrix.*\((.+)\)/);
        if (matrixValues) {
          const values = matrixValues[1].split(', ');
          const translateX = parseFloat(values[4]);
          
          // El marquee se mueve de 0 a -50% (la mitad del ancho total)
          // scrollWidth incluye ambas copias, así que una copia = scrollWidth / 2
          const singleCopyWidth = element.scrollWidth / 2;
          const currentProgress = Math.abs(translateX) / singleCopyWidth;
          let progress = currentProgress % 1;
          
          // Si translateX es 0 o muy cercano a 0, progress debería ser 0
          if (Math.abs(translateX) < 1) {
            progress = 0;
          }
          
          const newDelay = -(progress * slowDuration);
          
          element.style.animation = 'none';
          // Forzar reflow
          element.offsetHeight;
          element.style.animation = `marquee ${slowDuration}s linear infinite`;
          element.style.animationDelay = `${newDelay}s`;
        }
      } else {
        // Si no hay transform, usar la API de animaciones
        const animation = element.getAnimations?.()[0];
        if (animation) {
          const currentTime = animation.currentTime || 0;
          const progress = (currentTime % normalDuration) / normalDuration;
          const newDelay = -(progress * slowDuration);
          
          element.style.animation = 'none';
          element.offsetHeight; // Reflow
          element.style.animation = `marquee ${slowDuration}s linear infinite`;
          element.style.animationDelay = `${newDelay}s`;
        }
      }
    } catch (e) {
      console.error('Error en handleMarqueeHover:', e);
    }
  };

  const handleMarqueeLeave = (element) => {
    if (!element) return;
    
    try {
      const isMobile = window.innerWidth < 640;
      const isTablet = window.innerWidth >= 640 && window.innerWidth < 1024;
      const normalDuration = isMobile ? 25 : isTablet ? 35 : 45;
      
      // Obtener el transform actual para mantener la posición
      const computedStyle = window.getComputedStyle(element);
      const matrix = computedStyle.transform;
      
      if (matrix && matrix !== 'none') {
        const matrixValues = matrix.match(/matrix.*\((.+)\)/);
        if (matrixValues) {
          const values = matrixValues[1].split(', ');
          const translateX = parseFloat(values[4]);
          
          const singleCopyWidth = element.scrollWidth / 2;
          const currentProgress = Math.abs(translateX) / singleCopyWidth;
          let progress = currentProgress % 1;
          
          // Si translateX es 0 o muy cercano a 0, progress debería ser 0
          if (Math.abs(translateX) < 1) {
            progress = 0;
          }
          
          const newDelay = -(progress * normalDuration);
          
          element.style.animation = 'none';
          element.offsetHeight; // Reflow
          element.style.animation = `marquee ${normalDuration}s linear infinite`;
          element.style.animationDelay = `${newDelay}s`;
        }
      } else {
        element.style.animation = `marquee ${normalDuration}s linear infinite`;
        element.style.animationDelay = '0s';
      }
    } catch (e) {
      const isMobile = window.innerWidth < 640;
      const isTablet = window.innerWidth >= 640 && window.innerWidth < 1024;
      const normalDuration = isMobile ? 25 : isTablet ? 35 : 45;
      element.style.animation = `marquee ${normalDuration}s linear infinite`;
      element.style.animationDelay = '0s';
    }
  };

  return (
    <div 
      className="relative overflow-hidden group"
      onMouseEnter={() => handleMarqueeHover(marqueeRef.current)}
      onMouseLeave={() => handleMarqueeLeave(marqueeRef.current)}
    >
      {/* Marquee infinito para todas las pantallas */}
      <div ref={marqueeRef} className="flex w-max animate-marquee-partners items-center">
        {[...partnersLogos, ...partnersLogos].map((partner, index) => (
          <div
            key={index}
            onClick={() => handleClick(index)}
            className={`mx-2.5 sm:mx-4 lg:mx-5 flex-shrink-0 flex items-center justify-center h-8 sm:h-10 lg:h-12 cursor-pointer group transition-all duration-300 ${
              activeIndex === index ? 'grayscale-0' : 'grayscale hover:grayscale-0'
            }`}
          >
            <img 
              src={partner.logo} 
              alt={partner.name}
              className={`w-auto object-contain transition-all duration-300 ${
                partner.smallest 
                  ? 'h-5 sm:h-6 lg:h-7' 
                  : partner.smaller 
                  ? 'h-6 sm:h-7 lg:h-9' 
                  : 'h-8 sm:h-10 lg:h-12'
              } ${
                activeIndex === index 
                  ? 'opacity-100' 
                  : 'opacity-50 group-hover:opacity-100'
              }`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const Hero = ({ onDemoClick }) => {
  // const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  // const [isHeroVisible, setIsHeroVisible] = useState(true);
  const [typewriterText, setTypewriterText] = useState("");
  // const videoRef = useRef(null);
  // const heroSectionRef = useRef(null);

  const words = ["resuelve.", "atiende.", "vende.", "responde."];

  const features = [
    "Integración en menos de 48 horas.",
    "Respuestas 24/7 con voz y tono de tu marca.",
    "Atiende consultas, carritos abandonados y post-venta en WhatsApp, Instagram y Web.",
  ];

  // Detectar cuando el hero sale del viewport
  // useEffect(() => {
  //   if (!heroSectionRef.current || !isVideoModalOpen) return;

  //   const observer = new IntersectionObserver(
  //     ([entry]) => {
  //       setIsHeroVisible(entry.isIntersecting);
  //     },
  //     {
  //       threshold: 0.1,
  //       rootMargin: '-50px 0px 0px 0px'
  //     }
  //   );

  //   observer.observe(heroSectionRef.current);

  //   return () => {
  //     observer.disconnect();
  //   };
  // }, [isVideoModalOpen]);

  // Reproducir video cuando se abre el modal
  // useEffect(() => {
  //   if (isVideoModalOpen && videoRef.current) {
  //     videoRef.current.play().catch(console.error);
  //   } else if (!isVideoModalOpen && videoRef.current) {
  //     // Pausar video cuando se cierra el modal
  //     videoRef.current.pause();
  //     videoRef.current.currentTime = 0;
  //   }
  // }, [isVideoModalOpen]);

  // const handleOpenVideo = () => {
  //   setIsVideoModalOpen(true);
  // };

  // const handleCloseVideo = () => {
  //   setIsVideoModalOpen(false);
  // };

  // Cerrar modal con tecla Escape
  // useEffect(() => {
  //   const handleEscape = (e) => {
  //     if (e.key === 'Escape' && isVideoModalOpen) {
  //       setIsVideoModalOpen(false);
  //     }
  //   };
  //   window.addEventListener('keydown', handleEscape);
  //   return () => window.removeEventListener('keydown', handleEscape);
  // }, [isVideoModalOpen]);

  // Efecto de máquina de escribir que cicla entre palabras
  useEffect(() => {
    let currentWordIndex = 0;
    let currentIndex = 0;
    let isDeleting = false;
    let timeoutId;

    const type = () => {
      const currentWord = words[currentWordIndex];

      if (!isDeleting && currentIndex < currentWord.length) {
        // Escribiendo
        setTypewriterText(currentWord.slice(0, currentIndex + 1));
        currentIndex++;
        timeoutId = setTimeout(type, 100); // Velocidad de escritura
      } else if (isDeleting && currentIndex > 0) {
        // Borrando
        setTypewriterText(currentWord.slice(0, currentIndex - 1));
        currentIndex--;
        timeoutId = setTimeout(type, 50); // Velocidad de borrado (más rápido)
      } else if (!isDeleting && currentIndex === currentWord.length) {
        // Esperar antes de borrar
        timeoutId = setTimeout(() => {
          isDeleting = true;
          type();
        }, 2000); // Esperar 2 segundos antes de borrar
      } else if (isDeleting && currentIndex === 0) {
        // Cambiar a la siguiente palabra
        isDeleting = false;
        currentWordIndex = (currentWordIndex + 1) % words.length; // Ciclar entre palabras
        timeoutId = setTimeout(type, 500); // Esperar antes de empezar la siguiente palabra
      }
    };

    type();

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  return (
    <section className="relative w-full overflow-hidden pt-[86px] pb-8 md:pt-[115px] md:pb-12 lg:pt-[144px] lg:pb-16 xl:pt-[173px] xl:pb-20">
      {/* Video de fondo */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
        style={{
          transform: 'scaleX(-1)',
        }}
      >
        <source src="/video_1.mp4" type="video/mp4" />
      </video>
      {/* Imagen de fondo */}
      {/* <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center z-0"
        style={{
          backgroundImage: 'url(/fondo_2.png)',
        }}
      /> */}
      {/* Overlay oscuro para legibilidad */}
      <div className="absolute inset-0 bg-background/80 z-10"></div>
      
      <div className="relative z-20 mx-auto max-w-7xl px-6 sm:px-10 lg:px-12 xl:px-16">

        <div>
          {/* Left: Content */}
          <div className="max-w-xl xl:max-w-2xl">
            {/* Badge de "Única IA..." - alineado con Convierte */}
            {/* <span className="inline-flex items-center rounded-full px-3 py-1.5 text-[10px] sm:text-[12px] lg:text-[16px] font-detail italic text-text/80 backdrop-blur-sm">
              Única IA especializada para e-commerce en Latam
            </span> */}

            <h1 className="mt-0 text-balance text-[30px] sm:text-[35px] lg:text-[40px] tracking-tight text-text font-semibold">
            Tu equipo no da abasto,<br />Versu AI <span className="typewriter-text inline-block min-w-[140px]">{typewriterText}<span className="animate-pulse">|</span></span>
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
                {/* <button
                  onClick={handleOpenVideo}
                  className="glow-btn-white group inline-flex items-center justify-center gap-3 rounded-full border border-[#f2f2f2]/80 bg-transparent px-6 py-3 text-base font-medium text-[#f2f2f2] transition-all h-12 box-border"
                >
                  <div className="play-icon-container flex items-center justify-center w-6 h-6 rounded-full bg-[#f2f2f2] flex-shrink-0 transition-colors">
                    <Play className="h-3 w-3 fill-[#202020] ml-0.5" />
                  </div>
                  <span>Video completo</span>
                </button> */}
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
              <span className="stats-number text-xl sm:text-2xl lg:text-3xl xl:text-4xl text-text whitespace-nowrap">+100</span>
              <span className="stats-text whitespace-nowrap">tiendas</span>
            </div>
            <div className="h-8 sm:h-10 w-px bg-text/20 flex-shrink-0" />
            <div className="flex items-center gap-1 sm:gap-2">
              <span className="stats-number text-xl sm:text-2xl lg:text-3xl xl:text-4xl text-text whitespace-nowrap">4</span>
              <span className="stats-text whitespace-nowrap">países</span>
            </div>
            <div className="h-8 sm:h-10 w-px bg-text/20 flex-shrink-0" />
            <div className="flex items-center gap-1 sm:gap-2">
              <span className="stats-number text-xl sm:text-2xl lg:text-3xl xl:text-4xl text-text whitespace-nowrap">7 días</span>
              <span className="stats-text whitespace-nowrap">implementación</span>
            </div>
            <div className="h-8 sm:h-10 w-px bg-text/20 flex-shrink-0" />
            <div className="flex items-center gap-1 sm:gap-2">
              <span className="stats-number text-xl sm:text-2xl lg:text-3xl xl:text-4xl text-text whitespace-nowrap">35%</span>
              <span className="stats-text whitespace-nowrap">conversión en carritos</span>
            </div>
          </div>
        </div>

        <div className="max-w-xl xl:max-w-2xl">
          {/* Integramos con: */}
          <div className="mt-10">
            <p className="mb-3 text-xs text-text/60">Integramos con:</p>
          </div>
        </div>
      </div>
      
      {/* E-commerce integrations carousel - se extiende a todo el ancho sin márgenes */}
      <div className="relative z-20 mt-8 lg:mt-12">
        <IntegrationsCarousel />
      </div>

      {/* Modal de video en pantalla completa o flotante */}
      {/* {isVideoModalOpen && (
        <>
          {/* Fondo semi-transparente solo cuando el hero es visible */}
          {/* {isHeroVisible && (
            <div 
              className="fixed inset-0 z-[9998] bg-black/50 transition-opacity duration-300"
              onClick={handleCloseVideo}
            />
          )} */}
          
          {/* Contenedor del video */}
          {/* <div 
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
            {/* <button
              onClick={handleCloseVideo}
              className={`absolute z-50 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-[1500ms] ease-in-out backdrop-blur-sm ${
                isHeroVisible
                  ? 'top-4 right-4 opacity-100'
                  : 'top-2 right-2 opacity-100'
              }`}
              aria-label="Cerrar video"
            >
              <X className={`transition-all duration-[1500ms] ease-in-out ${isHeroVisible ? 'h-6 w-6' : 'h-4 w-4'}`} />
            </button> */}

            {/* Reproductor de video */}
            {/* <video
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
      )} */}
    </section>
  );
};

export default Hero;
