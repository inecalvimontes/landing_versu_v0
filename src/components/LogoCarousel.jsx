import { useState, useRef, useEffect } from 'react';

// Array de logos de clientes
const clientLogos = [
  { name: "Ansaldo", logo: "/logos/clientes/ansaldo.png" },
  { name: "Bekoko", logo: "/logos/clientes/bekoko.png" },
  { name: "Bestmart", logo: "/logos/clientes/bestmart.png" },
  { name: "Build a Bear", logo: "/logos/clientes/buildabear-2.png" },
  { name: "Family Shop", logo: "/logos/clientes/family shop.png" },
  { name: "Pao Pink", logo: "/logos/clientes/pao pink.png" },
  { name: "Prosa", logo: "/logos/clientes/prosa.png" },
  { name: "Saint Malé", logo: "/logos/clientes/saint male.png" },
  { name: "Serjaff", logo: "/logos/clientes/serjaff.png" },
  { name: "Sioux", logo: "/logos/clientes/sioux.png" },
  { name: "Zenlab", logo: "/logos/clientes/zenlab.png" },
];

const LogoCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const mobileMarqueeRef = useRef(null);
  const desktopMarqueeRef = useRef(null);

  const handleClick = (index) => {
    setActiveIndex(index);
    setTimeout(() => {
      setActiveIndex(null);
    }, 2000);
  };

  const handleMarqueeHover = (element, normalDuration, slowDuration) => {
    if (!element) return;
    
    try {
      // Obtener el transform actual del elemento
      const computedStyle = window.getComputedStyle(element);
      const matrix = computedStyle.transform;
      
      if (matrix && matrix !== 'none') {
        const matrixValues = matrix.match(/matrix.*\((.+)\)/);
        if (matrixValues) {
          const values = matrixValues[1].split(', ');
          const translateX = parseFloat(values[4]);
          
          // Calcular el ancho del elemento para determinar el progreso
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

  const handleMarqueeLeave = (element, normalDuration) => {
    if (!element) return;
    
    try {
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
      element.style.animation = `marquee ${normalDuration}s linear infinite`;
      element.style.animationDelay = '0s';
    }
  };

  return (
    <section className="bg-background py-6 md:py-8 lg:py-10">
      <div className="mb-8 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <p className="text-center text-sm font-medium text-text/60">
          +100 marcas confían en Versu
        </p>
      </div>
      <div>

        {/* Mobile: infinite marquee */}
        <div 
          className="relative overflow-hidden lg:hidden group"
          onMouseEnter={() => handleMarqueeHover(mobileMarqueeRef.current, 22, 44)}
          onMouseLeave={() => handleMarqueeLeave(mobileMarqueeRef.current, 22)}
        >
          <div ref={mobileMarqueeRef} className="flex w-max animate-marquee-mobile">
            {[...clientLogos, ...clientLogos].map((client, index) => (
              <div
                key={`mobile-${index}`}
                onClick={() => handleClick(index)}
                className="flex-shrink-0 w-48 h-48 sm:w-56 sm:h-56 transition-all duration-300 group cursor-pointer"
              >
                {/* Código comentado - efecto blanco y negro: activeIndex === index ? 'grayscale-0' : 'grayscale' */}
                {/* Código comentado - efecto de opacidad con click: activeIndex === index ? 'opacity-100' : 'opacity-70' */}
                <img 
                  src={client.logo} 
                  alt={client.name}
                  className="w-full h-full object-cover transition-opacity pointer-events-none opacity-100"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Desktop: infinite marquee */}
        <div 
          className="relative hidden overflow-hidden lg:block group"
          onMouseEnter={() => handleMarqueeHover(desktopMarqueeRef.current, 30, 60)}
          onMouseLeave={() => handleMarqueeLeave(desktopMarqueeRef.current, 30)}
        >
          {/* Marquee track */}
          <div ref={desktopMarqueeRef} className="flex w-max animate-marquee">
            {[...clientLogos, ...clientLogos].map((client, index) => (
              <div
                key={`desktop-${index}`}
                onClick={() => handleClick(index)}
                className="flex-shrink-0 w-64 h-64 xl:w-72 xl:h-72 transition-all duration-300 group cursor-pointer"
              >
                {/* Código comentado - efecto blanco y negro con hover: activeIndex === index ? 'grayscale-0' : 'grayscale hover:grayscale-0' */}
                {/* Código comentado - efecto de opacidad con click y hover: activeIndex === index ? 'opacity-100' : 'opacity-70 group-hover:opacity-100' */}
                <img 
                  src={client.logo} 
                  alt={client.name}
                  className="w-full h-full object-cover transition-opacity opacity-100"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LogoCarousel;
