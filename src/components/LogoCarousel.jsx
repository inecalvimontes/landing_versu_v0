// Array de logos de partners
// Reemplaza estos nombres con los nombres reales de tus archivos de logos
const logos = [
  { name: "Marca 1", src: "/logos/partners/marca1.svg" },
  { name: "Marca 2", src: "/logos/partners/marca2.svg" },
  { name: "Marca 3", src: "/logos/partners/marca3.svg" },
  { name: "Marca 4", src: "/logos/partners/marca4.svg" },
  { name: "Marca 5", src: "/logos/partners/marca5.svg" },
  { name: "Marca 6", src: "/logos/partners/marca6.svg" },
];

const LogoCarousel = () => {
  return (
    <section className="bg-background py-6 md:py-8 lg:py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 xl:px-12">
        <p className="mb-8 text-center text-sm font-medium text-text/60">
          +100 marcas confían en Versu
        </p>

        {/* Mobile: horizontal scroll */}
        <div className="overflow-x-auto scrollbar-hide lg:hidden">
          <div className="flex gap-4 pb-2">
            {logos.map((logo, index) => (
              <div
                key={index}
                className="flex-shrink-0 flex items-center justify-center h-16 px-4"
              >
                <img 
                  src={logo.src} 
                  alt={logo.name}
                  className="h-12 w-auto max-w-[140px] object-contain opacity-60 grayscale hover:opacity-100 hover:grayscale-0 transition-all"
                  onError={(e) => {
                    // Si no existe la imagen, mostrar el nombre como fallback
                    e.target.style.display = 'none';
                    const fallback = document.createElement('span');
                    fallback.className = 'whitespace-nowrap text-sm font-medium text-text/60';
                    fallback.textContent = logo.name;
                    e.target.parentElement.appendChild(fallback);
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Desktop: infinite marquee */}
        <div className="relative hidden overflow-hidden lg:block">
          {/* Fade edges */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />
          
          {/* Marquee track */}
          <div className="flex animate-marquee">
            {[...logos, ...logos, ...logos, ...logos].map((logo, index) => (
              <div
                key={index}
                className="mx-6 flex-shrink-0 flex items-center justify-center h-20 px-6"
              >
                <img 
                  src={logo.src} 
                  alt={logo.name}
                  className="h-16 w-auto max-w-[180px] object-contain opacity-60 grayscale hover:opacity-100 hover:grayscale-0 transition-all"
                  onError={(e) => {
                    // Si no existe la imagen, mostrar el nombre como fallback
                    e.target.style.display = 'none';
                    const fallback = document.createElement('span');
                    fallback.className = 'whitespace-nowrap text-base font-medium text-text/60';
                    fallback.textContent = logo.name;
                    e.target.parentElement.appendChild(fallback);
                  }}
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
