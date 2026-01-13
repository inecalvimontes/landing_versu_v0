const logos = [
  "Marca 1",
  "Marca 2",
  "Marca 3",
  "Marca 4",
  "Marca 5",
  "Marca 6",
];

const LogoCarousel = () => {
  return (
    <section className="border-y border-gray-200 bg-gray-50 py-12 md:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 xl:px-12">
        <p className="mb-8 text-center text-sm font-medium text-gray-500">
          +100 marcas confían en Versu
        </p>

        {/* Mobile: horizontal scroll */}
        <div className="overflow-x-auto scrollbar-hide lg:hidden">
          <div className="flex gap-4 pb-2">
            {logos.map((logo, index) => (
              <div
                key={index}
                className="flex-shrink-0 rounded-full border border-gray-200 bg-white px-6 py-3 shadow-sm"
              >
                <span className="whitespace-nowrap text-sm font-medium text-gray-500">
                  {logo}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop: infinite marquee */}
        <div className="relative hidden overflow-hidden lg:block">
          {/* Fade edges */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-gray-50 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-gray-50 to-transparent" />
          
          {/* Marquee track */}
          <div className="flex animate-marquee">
            {[...logos, ...logos, ...logos, ...logos].map((logo, index) => (
              <div
                key={index}
                className="mx-6 flex-shrink-0 rounded-xl border border-gray-200 bg-white px-8 py-4 shadow-sm"
              >
                <span className="whitespace-nowrap text-base font-medium text-gray-500">
                  {logo}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LogoCarousel;
