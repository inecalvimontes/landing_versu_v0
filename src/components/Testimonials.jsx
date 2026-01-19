import { useState, useRef, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    name: "Prosa",
    photo: "/logos/testimonials/prosa (color).svg",
    content:
      "Para nosotros Versu ha sido una apoyo clave en la estrategia en nuestro ecommerce y RR.SS, nos ayuda a ordena los mensajes y responde de una manera muy cercana. También nos ayudó a optimizar nuestro tiempo de manera mas eficiente. Y lo mejor es poder tener un apoyo extra en ventas, 24 horas al dia los 7 dias de la.semana, de manera muy simple, es realmente útil. La página es muy amigable y su equipo genial. 1000% recomendado.",
    rating: 5,
  },
  {
    name: "Bestmart",
    photo: "/logos/testimonials/bestmart (color).svg",
    content:
      "Operar al volumen de Bestmart te obliga a tener tecnología que no falle. En estos 7 meses, Versu pasó de ser una herramienta a un aliado clave: hoy automatizamos gran parte del soporte y recuperamos más de $20 millones en ventas con un ROAS de 656. Ha sido fundamental para seguir escalando con orden, la operación no solo es más liviana, sino que cada conversación con el cliente se vuelve rentable.",
    rating: 5,
  },
  {
    name: "Zenlab",
    photo: "/logos/testimonials/zenlab (color).svg",
    content:
      "En ZenLab trabajamos con suplementos funcionales, y algo que aprendimos rápido es que no basta con crear buenos productos: hay que saber explicarlos. Cada cliente llega con dudas reales, quiere entender qué está consumiendo, cómo le puede ayudar y cómo usarlo bien. Responder todo eso, en WhatsApp e Instagram, es muy demandante. Gracias a Versu, logramos automatizar la comunicación sin perder el trato humano. Hoy nuestros clientes reciben información clara, precisa y alineada con nuestros productos, mientras nosotros ganamos tiempo para enfocarnos en lo que más nos importa: mejorar nuestros procesos y seguir cuidando el servicio al cliente, que es el corazón de ZenLab.",
    rating: 5,
  },
  {
    name: "Bekoko",
    photo: "/logos/testimonials/bokoko (color).svg", // Nota: el archivo dice "bokoko" pero debería ser "bekoko"
    content:
      "En Bekoko implementamos el agente de IA nuestra web y la experiencia ha sido muy positiva. Nos permite responder consultas de forma rápida y mejorar la atención al cliente y su experiencia de compra. Destacamos especialmente la relación comercial y el soporte diario: cercano, ágil y siempre disponible. Un partner tecnológico en el que confiamos.",
    rating: 5,
  },
  {
    name: "Paopink",
    photo: "/logos/testimonials/pao pink.svg",
    content:
      "Gracias a Versu, nuestra tienda de fajas PaoPink atiende de forma rápida e inmediata el gran volumen diario de conversaciones en WhatsApp y redes sociales, ofreciendo soporte técnico, informativo y transaccional que nos genera nuevas ventas, así permitiendo que el equipo humano se enfoque en clientes que requieren atención prioritaria.",
    rating: 5,
  },
  {
    name: "Serjaf",
    photo: "/logos/testimonials/serjaf (color).svg",
    content:
      "Versu ha permitido que SERJAF Cycling & Sports atienda a sus clientes de forma inmediata y en cualquier momento, brindando información técnica precisa, asesoría en la elección de productos y generando ventas reales, mientras el equipo se enfoca en tareas estratégicas para el crecimiento del negocio.",
    rating: 5,
  },
  {
    name: "Saintmalé",
    photo: "/logos/testimonials/saint male (color).svg",
    content:
      "Implementar Versu en Saintmalé nos permitió ordenar la casa: hoy automatizamos nuestro soporte y postventa y, de paso, recuperamos carritos con una conversión real de hasta un 29%. La herramienta realmente captura al cliente cuando está por irse, con respuestas rápidas y sugerencias de prendas y tallas precisas. Se ha vuelto un pilar para operar tranquilos y seguir vendiendo.",
    rating: 5,
  },
  {
    name: "Brenda Méndez",
    photo: "/logos/testimonials/brenda mendez (color).png",
    content:
      "La verdad es que me sorprendieron mucho los resultados. Jamás pensé que un agente de IA pudiera atender con este nivel de precisión y, más encima, vender. En solo 3 meses Versu ya nos ha generado más de $4 millones en ventas recuperando carritos, con ROAS sobre 70%. Hoy es parte real de nuestro equipo, no un bot más.",
    rating: 5,
  },
  {
    name: "Maçaix",
    photo: "/logos/testimonials/macaix (color).svg",
    content:
      "Como CEO de Maçaix, implementar Versu fue una decisión estratégica. Automatizamos Instagram y WhatsApp con respuestas rápidas, coherentes y humanas, y logramos recuperar carritos abandonados de forma consistente. Versu no solo mejora el soporte, si no también crea carritos, impulsa conversiones y genera ventas, por lo que la plataforma prácticamente se autofinancia. Es fácil de gestionar, muy eficiente y con un equipo ágil y comprometido. Una solución clave para escalar ecommerce y otras verticales de negocio",
    rating: 5,
  },
  {
    name: "Bikini Missfit",
    photo: "/logos/testimonials/missfit (color).svg",
    content:
      "Una respuesta entregada en el momento preciso nos ha ayudado a subir las ventas en un 30%",
    rating: 5,
  },
  {
    name: "MI Placard",
    photo: "/logos/testimonials/mi placard (color).svg",
    content:
      "Como CEO de Mi Placard, nuestra experiencia con Versu ha sido excelente. En solo un día lograron integrar la IA con nuestro Shopify, algo que no habíamos conseguido con otras soluciones. La plataforma es muy fácil de autogestionar, lo que nos permite adaptarla rápido a cambios de horarios, promociones o información clave. Destaco especialmente su sistema de tickets, que clasifica y prioriza los casos que la IA no puede resolver, y la integración de carrito abandonado por WhatsApp, que nos ha ayudado a recuperar ventas. El equipo es cercano, rápido y muy comprometido. Lo recomiendo totalmente.",
    rating: 5,
  },
];

const TestimonialCard = ({ testimonial }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Determinar si el texto es largo (más de 300 caracteres aproximadamente)
  const isLongText = testimonial.content.length > 300;

  return (
    <div 
      className={`relative flex flex-col rounded-2xl border border-text/20 bg-background p-6 shadow-sm w-[calc(100vw-4.5rem)] sm:w-[calc(50vw-5rem)] md:w-[calc(33.333vw-5rem)] lg:w-[380px] flex-shrink-0 snap-start snap-always transition-all duration-300 ${
        isExpanded ? 'h-auto' : 'h-[340px]'
      }`}
      style={{
        scrollSnapAlign: 'start',
        scrollSnapStop: 'always',
      }}
    >
      {/* Header: Foto y nombre */}
      <div className="flex items-center gap-8 mb-4">
        {/* Foto con círculo superpuesto - izquierda */}
        <div className="flex-shrink-0 relative">
          <div className="w-16 h-16 rounded-full overflow-hidden bg-white flex items-center justify-center p-2">
            <img
              src={testimonial.photo}
              alt={testimonial.name}
              className="w-full h-full object-contain"
            />
          </div>
          {/* Logo de Shopify superpuesto en la parte inferior derecha - 50% dentro del círculo grande, 50% fuera */}
          <div className="absolute bottom-0 -right-4 w-8 h-8 rounded-full bg-white flex items-center justify-center p-1.5">
            <img
              src="/logos/partners/shopify 2.svg"
              alt="Shopify"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
        
        {/* Nombre centrado verticalmente con el círculo - movido la misma cantidad que el círculo pequeño */}
        <div className="flex-1" style={{ marginLeft: '10px' }}>
          <h3 className="text-xl font-bold text-text">
            {testimonial.name}
          </h3>
        </div>
      </div>

      {/* Estrellas debajo del nombre */}
      <div className="flex gap-1 mb-4">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <Star
            key={i}
            className="h-5 w-5 fill-yellow-400 text-yellow-400"
          />
        ))}
      </div>

      {/* Contenido del testimonio */}
      <div className={`flex-1 overflow-hidden ${isLongText ? 'mb-12' : ''} relative`}>
        {/* Texto visible */}
        <blockquote 
          className={`text-sm leading-relaxed text-text ${
            !isExpanded && isLongText ? 'line-clamp-6' : ''
          }`}
        >
          "{testimonial.content}"
        </blockquote>
        
        {/* Gradiente de difuminado en la última línea cuando está colapsado */}
        {isLongText && !isExpanded && (
          <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-background to-transparent pointer-events-none"></div>
        )}
      </div>
      
      {/* Botón "Ver más" posicionado abajo a la derecha - SIEMPRE VISIBLE para textos largos */}
      {isLongText && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="absolute bottom-6 right-6 text-sm font-medium text-accent hover:text-accent/80 transition-colors bg-background px-3 py-1 rounded-md shadow-sm border border-accent/20"
        >
          {isExpanded ? "Ver menos" : "Ver más"}
        </button>
      )}
    </div>
  );
};

const Testimonials = () => {
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScrollButtons();
    const container = scrollContainerRef.current;
    if (container) {
      // Reducir sensibilidad en dispositivos táctiles con throttle
      let scrollTimeout;
      const handleScroll = () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          checkScrollButtons();
        }, 50); // Reducir frecuencia de actualización
      };
      
      container.addEventListener('scroll', handleScroll, { passive: true });
      window.addEventListener('resize', checkScrollButtons);
      
      // Reducir momentum scrolling en iOS
      container.style.overscrollBehavior = 'contain';
      
      return () => {
        clearTimeout(scrollTimeout);
        container.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', checkScrollButtons);
      };
    }
  }, []);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth = container.querySelector('div')?.offsetWidth || 380;
      const gap = 24; // gap-6 = 1.5rem = 24px
      const scrollAmount = cardWidth + gap;
      
      const newScrollLeft = container.scrollLeft + 
        (direction === 'left' ? -scrollAmount : scrollAmount);
      
      container.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="bg-background py-8 md:py-12 lg:py-16 xl:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <div className="text-center">
          <h2 className="text-[20px] sm:text-[24px] md:text-[32px] lg:text-[40px] tracking-tight text-text font-subtitle">
            Lo que dicen nuestros clientes
          </h2>
          <p className="mt-1 text-base sm:text-lg lg:text-xl text-text/70 font-text">
            Tiendas en Latam que ya transformaron su atención con Versu.
          </p>
        </div>

        {/* Carrusel de testimonios */}
        <div className="mt-12 relative">
          {/* Gradiente izquierdo - se muestra cuando hay contenido a la izquierda */}
          {canScrollLeft && (
            <div className="absolute left-0 top-0 bottom-4 w-24 bg-gradient-to-r from-background to-transparent pointer-events-none z-10"></div>
          )}
          
          {/* Gradiente derecho - se muestra cuando hay contenido a la derecha */}
          {canScrollRight && (
            <div className="absolute right-0 top-0 bottom-4 w-24 bg-gradient-to-l from-background to-transparent pointer-events-none z-10"></div>
          )}
          
          <div 
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4 snap-x snap-mandatory"
            style={{ 
              scrollbarWidth: 'none', 
              msOverflowStyle: 'none',
              touchAction: 'pan-x',
              WebkitOverflowScrolling: 'touch',
              scrollSnapType: 'x mandatory',
              scrollSnapStop: 'always',
              overscrollBehaviorX: 'contain',
              scrollPadding: '0 1rem', // Aumentar el área de snap para reducir sensibilidad
            }}
            onTouchStart={(e) => {
              // Reducir sensibilidad: requerir más movimiento antes de activar scroll
              const touch = e.touches[0];
              e.currentTarget.dataset.touchStartX = touch.clientX;
              e.currentTarget.dataset.touchStartY = touch.clientY;
            }}
            onTouchMove={(e) => {
              // Solo permitir scroll si el movimiento horizontal es significativo y mayor que el vertical
              const touch = e.touches[0];
              const startX = parseFloat(e.currentTarget.dataset.touchStartX || '0');
              const startY = parseFloat(e.currentTarget.dataset.touchStartY || '0');
              const deltaX = Math.abs(touch.clientX - startX);
              const deltaY = Math.abs(touch.clientY - startY);
              
              // Requerir al menos 15px de movimiento horizontal y que sea mayor que el vertical
              // Esto reduce la sensibilidad accidental
              if (deltaX < 15 || deltaY > deltaX) {
                e.preventDefault();
              }
            }}
          >
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} testimonial={testimonial} />
            ))}
          </div>

          {/* Flechas de navegación */}
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all ${
                canScrollLeft
                  ? 'border-accent text-accent hover:bg-accent hover:text-white'
                  : 'border-text/20 text-text/20 cursor-not-allowed'
              }`}
              aria-label="Anterior"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all ${
                canScrollRight
                  ? 'border-accent text-accent hover:bg-accent hover:text-white'
                  : 'border-text/20 text-text/20 cursor-not-allowed'
              }`}
              aria-label="Siguiente"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
