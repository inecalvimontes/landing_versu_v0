import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-background text-white">
      {/* Main footer content */}
      <div className="mx-auto max-w-7xl px-[42px] sm:px-[72px] lg:px-[84px] xl:px-[108px] py-3 lg:py-4 xl:py-5">
        <div className="grid gap-2 md:grid-cols-3 md:items-center">
          {/* Partners */}
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-white/60 mb-2">
              Partners
            </p>
            <div className="flex items-center gap-3">
              <img 
                src="/logos/footer/meta tech blanco.svg" 
                alt="Meta Tech Provider"
                className="h-[45px] w-auto"
              />
              <img 
                src="/logos/footer/shopify partners blanco.svg" 
                alt="Shopify Partner"
                className="h-[45px] w-auto"
              />
            </div>
          </div>

          {/* Made with love */}
          <div className="text-center">
            <p className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-widest">
              Hecho con <Heart className="h-4 w-4 fill-white/80 text-white/80" /> en LATAM
            </p>
          </div>

          {/* Backed by */}
          <div className="md:text-right">
            <p className="text-xs font-medium uppercase tracking-widest text-white/60 mb-2">
              Backed by
            </p>
            <div className="flex items-center gap-[18px] md:justify-end">
              <img 
                src="/logos/footer/fen ventures blanco.svg" 
                alt="Fen Ventures"
                className="h-[33.75px] w-auto"
              />
              <img 
                src="/logos/footer/mr pink blanco.svg" 
                alt="MRPINK vc"
                className="h-[33.75px] w-auto"
              />
              <img 
                src="/logos/footer/startup chile blanco.svg" 
                alt="Start-Up Chile"
                className="h-[16.875px] w-auto"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-[42px] sm:px-[72px] lg:px-[84px] xl:px-[108px] py-2">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
            <div className="flex items-center gap-3">
              <img 
                src="/logos/versu-logo.svg" 
                alt="Versu" 
                className="h-[60px] w-auto"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
              <span className="text-white/60 text-sm">
                © 2026 Versu. Todos los derechos reservados.
              </span>
            </div>
            <div className="flex items-center gap-6 text-sm">
              <a href="#" className="text-white/60 hover:text-white transition-colors">
                Privacidad
              </a>
              <a href="#" className="text-white/60 hover:text-white transition-colors">
                Términos de servicio
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
