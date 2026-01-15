import { Heart } from "lucide-react";
import { useState } from "react";

const Footer = () => {
  const [metaLogoError, setMetaLogoError] = useState(false);
  const [shopifyLogoError, setShopifyLogoError] = useState(false);

  return (
    <footer className="bg-background text-white">
      {/* Main footer content */}
      <div className="container mx-auto px-6 sm:px-10 lg:px-12 xl:px-16 py-12 lg:py-16 xl:py-20">
        <div className="grid gap-10 md:grid-cols-3 md:items-start">
          {/* Partners */}
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-white/60 mb-4">
              Partners
            </p>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                {!metaLogoError ? (
                  <img 
                    src="/logos/partners/meta-logo.svg" 
                    alt="Meta"
                    className="h-5 w-auto"
                    onError={() => setMetaLogoError(true)}
                  />
                ) : (
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z"/>
                  </svg>
                )}
                <div className="text-xs">
                  <p className="font-medium">Meta</p>
                  <p className="text-white/60">Tech Provider</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {!shopifyLogoError ? (
                  <img 
                    src="/logos/partners/shopify-logo.svg" 
                    alt="Shopify"
                    className="h-5 w-auto"
                    onError={() => setShopifyLogoError(true)}
                  />
                ) : (
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M15.337 3.415c-.672-.824-1.799-1.29-2.877-1.29-.616 0-1.24.147-1.808.475-.567-.328-1.192-.475-1.808-.475-1.078 0-2.205.466-2.877 1.29C5.172 4.467 5 5.864 5 7.007c0 1.477.539 2.893 1.533 4.149 1.647 2.082 4.058 3.753 5.389 4.675l.078.054.078-.054c1.331-.922 3.742-2.593 5.389-4.675C18.461 9.9 19 8.484 19 7.007c0-1.143-.172-2.54-.967-3.592zM12 14.012c-1.185-.835-3.291-2.367-4.714-4.164C6.41 8.71 6 7.562 6 6.507c0-.837.114-2.025.713-2.756.494-.604 1.282-.876 2.059-.876.516 0 1.033.131 1.444.39l.784.494.784-.494c.411-.259.928-.39 1.444-.39.777 0 1.565.272 2.059.876.599.731.713 1.919.713 2.756 0 1.055-.41 2.203-1.286 3.341-1.423 1.797-3.529 3.329-4.714 4.164z"/>
                  </svg>
                )}
                <div className="text-xs">
                  <p className="font-medium">Shopify</p>
                  <p className="text-white/60">Partner</p>
                </div>
              </div>
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
            <p className="text-xs font-medium uppercase tracking-widest text-white/60 mb-4">
              Backed by
            </p>
            <div className="flex items-center gap-6 md:justify-end">
              <span className="text-sm font-medium">fen ventures</span>
              <span className="text-sm font-bold tracking-tight">MRPINK<span className="text-white/60">vc</span></span>
              <span className="text-sm"><span className="font-semibold">Start-Up</span> <span className="text-white/60">Chile</span></span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-6 py-0">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img 
                src="/logos/versu-logo.svg" 
                alt="Versu" 
                className="h-[120px] w-auto"
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
