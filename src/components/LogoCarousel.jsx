import { useState } from 'react';

// Array de logos de clientes
const clientLogos = [
  { name: "Ansaldo", logo: "/logos/clientes/ansaldo.png" },
  { name: "Bekoko", logo: "/logos/clientes/bekoko.png" },
  { name: "Bestmart", logo: "/logos/clientes/bestmart.png" },
  { name: "Build a Bear", logo: "/logos/clientes/buildabear.png" },
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

  const handleClick = (index) => {
    setActiveIndex(index);
    setTimeout(() => {
      setActiveIndex(null);
    }, 2000);
  };
  return (
    <section className="bg-background py-6 md:py-8 lg:py-10">
      <div className="mb-8 px-6 sm:px-10 lg:px-12 xl:px-16">
        <p className="text-center text-sm font-medium text-text/60">
          +100 marcas confían en Versu
        </p>
      </div>
      <div>

        {/* Mobile: infinite marquee */}
        <div className="relative overflow-hidden lg:hidden">
          <div className="flex w-max animate-marquee-mobile">
            {[...clientLogos, ...clientLogos].map((client, index) => (
              <div
                key={`mobile-${index}`}
                onClick={() => handleClick(index)}
                className={`flex-shrink-0 w-48 h-48 sm:w-56 sm:h-56 transition-all duration-300 group cursor-pointer ${
                  activeIndex === index ? 'grayscale-0' : 'grayscale'
                }`}
              >
                <img 
                  src={client.logo} 
                  alt={client.name}
                  className={`w-full h-full object-cover transition-opacity pointer-events-none ${
                    activeIndex === index ? 'opacity-100' : 'opacity-70'
                  }`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Desktop: infinite marquee */}
        <div className="relative hidden overflow-hidden lg:block">
          {/* Marquee track */}
          <div className="flex w-max animate-marquee">
            {[...clientLogos, ...clientLogos].map((client, index) => (
              <div
                key={`desktop-${index}`}
                onClick={() => handleClick(index)}
                className={`flex-shrink-0 w-64 h-64 xl:w-72 xl:h-72 transition-all duration-300 group cursor-pointer ${
                  activeIndex === index ? 'grayscale-0' : 'grayscale hover:grayscale-0'
                }`}
              >
                <img 
                  src={client.logo} 
                  alt={client.name}
                  className={`w-full h-full object-cover transition-opacity ${
                    activeIndex === index ? 'opacity-100' : 'opacity-70 group-hover:opacity-100'
                  }`}
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
