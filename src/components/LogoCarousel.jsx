// Array de logos de clientes
const clientLogos = [
  { name: "Ansaldo", logo: "/logos/clientes/ansaldo.svg" },
  { name: "Aqua Force", logo: "/logos/clientes/aqua force.svg" },
  { name: "Bestmart", logo: "/logos/clientes/bestmart.svg" },
  { name: "Build a Bear", logo: "/logos/clientes/build a bear.svg" },
  { name: "Bullpadel", logo: "/logos/clientes/bullpadel.svg" },
  { name: "Family Shop", logo: "/logos/clientes/family shop.svg" },
  { name: "Mr Click", logo: "/logos/clientes/mr click.svg" },
  { name: "Saintmalé", logo: "/logos/clientes/saintmalé.svg" },
  { name: "Sioux", logo: "/logos/clientes/sioux.svg" },
  { name: "Ultimate Fitness", logo: "/logos/clientes/ultimate fitness.svg" },
];

const LogoCarousel = () => {
  return (
    <section className="bg-background py-6 md:py-8 lg:py-10">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-12 xl:px-16">
        <p className="mb-8 text-center text-sm font-medium text-text/60">
          +100 marcas confían en Versu
        </p>

        {/* Mobile: horizontal scroll */}
        <div className="overflow-x-auto scrollbar-hide lg:hidden px-4 sm:px-6">
          <div className="flex gap-4 pb-2">
            {clientLogos.map((client, index) => (
              <div
                key={index}
                className="flex-shrink-0 flex items-center justify-center h-16 px-3"
              >
                <img 
                  src={client.logo} 
                  alt={client.name}
                  className="h-12 w-auto max-w-[140px] object-contain opacity-50 grayscale hover:opacity-100 hover:grayscale-0 transition-all"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Desktop: infinite marquee */}
        <div className="relative hidden overflow-hidden lg:block">
          {/* Marquee track */}
          <div className="flex animate-marquee">
            {[...clientLogos, ...clientLogos, ...clientLogos].map((client, index) => (
              <div
                key={index}
                className="mx-4 flex-shrink-0 flex items-center justify-center h-20 px-4"
              >
                <img 
                  src={client.logo} 
                  alt={client.name}
                  className="h-16 w-auto max-w-[160px] object-contain opacity-50 grayscale hover:opacity-100 hover:grayscale-0 transition-all"
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
