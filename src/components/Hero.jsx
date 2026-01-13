import { useState } from "react";
import { Check, ArrowRight, Play, Plus, X } from "lucide-react";

// Visible integrations (always shown)
const visibleIntegrations = [
  { name: "Shopify", logo: "https://cdn.worldvectorlogo.com/logos/shopify.svg", height: "h-5" },
  { name: "WooCommerce", logo: "https://cdn.worldvectorlogo.com/logos/woocommerce.svg", height: "h-5" },
  { name: "VTEX", logo: "https://cdn.worldvectorlogo.com/logos/vtex-1.svg", height: "h-4" },
];

// Hidden integrations (shown on expand)
const hiddenIntegrations = [
  { name: "PrestaShop", logo: "https://cdn.worldvectorlogo.com/logos/prestashop.svg", height: "h-5" },
  { name: "JumpSeller", logo: "https://jumpseller.com/images/brand-guidelines/logos/logo_jumpseller.svg", height: "h-5" },
  { name: "Magento", logo: "https://cdn.worldvectorlogo.com/logos/magento.svg", height: "h-5" },
  { name: "BigCommerce", logo: "https://cdn.worldvectorlogo.com/logos/bigcommerce-1.svg", height: "h-5" },
  { name: "Tiendanube", logo: "https://d26lpennugtm8s.cloudfront.net/assets/common/img/logos/logo-tiendanube-white.svg", height: "h-4" },
  { name: "Mercado Libre", logo: "https://http2.mlstatic.com/frontend-assets/ui-navigation/5.21.11/mercadolibre/logo__large_plus.png", height: "h-5" },
];

const IntegrationsLogos = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="mt-6">
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-xs text-gray-500">Integramos con:</span>
        
        {/* Visible integrations */}
        {visibleIntegrations.map((integration) => (
          <img
            key={integration.name}
            src={integration.logo}
            alt={integration.name}
            className={`${integration.height} opacity-50 grayscale hover:opacity-100 hover:grayscale-0 transition-all`}
          />
        ))}

        {/* Expand/collapse button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center justify-center h-6 w-6 rounded-full border border-gray-300 bg-gray-100 hover:bg-gray-200 transition-colors"
          aria-label={isExpanded ? "Ver menos integraciones" : "Ver más integraciones"}
        >
          {isExpanded ? (
            <X className="h-3 w-3 text-gray-600" />
          ) : (
            <Plus className="h-3 w-3 text-gray-600" />
          )}
        </button>
      </div>

      {/* Hidden integrations - shown when expanded */}
      {isExpanded && (
        <div className="mt-3 flex flex-wrap items-center gap-4 animate-in fade-in slide-in-from-top-2 duration-200">
          {hiddenIntegrations.map((integration) => (
            <img
              key={integration.name}
              src={integration.logo}
              alt={integration.name}
              className={`${integration.height} opacity-50 grayscale hover:opacity-100 hover:grayscale-0 transition-all`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const Hero = ({ onDemoClick }) => {
  const features = [
    "Responde 24/7 con el tono de tu marca",
    "Reduce preguntas repetidas y tickets operativos",
    "Activa flujos como carrito abandonado y postventa",
  ];

  return (
    <section className="overflow-hidden bg-white pt-24 pb-16 md:pt-32 md:pb-24 lg:pt-40 lg:pb-32 xl:pt-48 xl:pb-40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-20 xl:px-24">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
          {/* Left: Content */}
          <div className="max-w-xl xl:max-w-2xl">
            <div className="flex flex-col items-start gap-1 lg:flex-row lg:flex-wrap lg:items-center">
              <span className="flex items-center gap-1 text-[10px] opacity-60 lg:hidden">
                <span>🇨🇱</span>
                <span>🇲🇽</span>
                <span>🇨🇴</span>
                <span>🇵🇪</span>
              </span>
              <span className="hidden items-center gap-1.5 rounded-full border border-gray-300 bg-gray-100 px-3 py-1 text-sm lg:text-base backdrop-blur-sm lg:inline-flex">
                <span>🇨🇱</span>
                <span>🇲🇽</span>
                <span>🇨🇴</span>
                <span>🇵🇪</span>
              </span>
              <span className="inline-flex items-center rounded-full border border-gray-300 bg-gray-100 px-3 py-1 text-sm lg:text-base font-medium text-gray-600 backdrop-blur-sm">
                Única IA especializada para e-commerce en LatAm
              </span>
            </div>

            <h1 className="mt-6 text-balance text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl xl:text-6xl">
              Convierte tus chats de WhatsApp e Instagram en{" "}
              <span className="text-indigo-600">ventas y soporte</span>, sin sumar
              más carga a tu equipo.
            </h1>

            <p className="mt-6 text-lg lg:text-xl xl:text-2xl text-gray-600">
              Versu instala agentes de IA entrenados en tu tienda para responder
              consultas, recuperar carritos y derivar casos complejos al equipo
              humano.
            </p>

            <ul className="mt-8 space-y-3">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center gap-3 text-sm">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-100">
                    <Check className="h-3 w-3 text-indigo-600" />
                  </div>
                  <span className="text-gray-900">{feature}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <button
                onClick={onDemoClick}
                className="group inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-6 py-3 text-base font-medium text-white hover:bg-indigo-700 transition-colors"
              >
                Solicitar demo
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
              <p className="text-sm text-gray-500">
                Toma 2 minutos. Sin spam.
              </p>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-gray-900">+100</span>
                <span>tiendas</span>
              </div>
              <div className="h-6 w-px bg-gray-300" />
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-gray-900">4</span>
                <span>países</span>
              </div>
              <div className="h-6 w-px bg-gray-300" />
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-gray-900">7 días</span>
                <span>implementación</span>
              </div>
            </div>
            
            {/* E-commerce integrations logos */}
            <IntegrationsLogos />
          </div>

          {/* Right: Visual */}
          <div className="relative">
            <div className="absolute inset-0 -z-10 bg-gradient-to-t from-indigo-100 via-indigo-50 to-transparent blur-3xl" />
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl">
              <div className="flex items-center gap-2 border-b border-gray-200 bg-gray-50 px-4 py-3">
                <div className="h-3 w-3 rounded-full bg-red-500/80" />
                <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                <div className="h-3 w-3 rounded-full bg-green-500/80" />
                <span className="ml-2 text-xs text-gray-500">
                  Panel de Versu
                </span>
              </div>
              <div className="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center relative group cursor-pointer overflow-hidden">
                {/* E-commerce video background */}
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  poster="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80"
                  className="absolute inset-0 w-full h-full object-cover"
                >
                  <source 
                    src="https://assets.mixkit.co/videos/preview/mixkit-hands-holding-a-smartphone-and-typing-on-it-42853-large.mp4" 
                    type="video/mp4" 
                  />
                </video>
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-transparent to-white/20" />
                
                {/* Play button overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-20 w-20 rounded-full bg-indigo-600/90 flex items-center justify-center shadow-lg transition-transform group-hover:scale-110">
                    <Play className="h-8 w-8 text-white ml-1" fill="currentColor" />
                  </div>
                </div>
              </div>
            </div>

            {/* Small cards below */}
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                <p className="text-xs text-gray-500 mb-2">Testimonio</p>
                <p className="text-sm text-gray-900 leading-relaxed">
                  "Versu redujo nuestras consultas repetidas en un 60%."
                </p>
              </div>
              <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                <p className="text-xs text-gray-500 mb-2">Impacto</p>
                <p className="text-2xl font-bold text-gray-900">+35%</p>
                <p className="text-sm text-gray-500">conversión en carritos</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
