import { useState } from "react";
import { Check, Clock, Shield, Target, MessageCircle, ArrowLeft, ChevronRight } from "lucide-react";

const ordersOptions = [
  { value: "0-200", label: "0 - 200" },
  { value: "200-500", label: "200 - 500" },
  { value: "500-1000", label: "500 - 1,000" },
  { value: "1000-3000", label: "1,000 - 3,000" },
  { value: "3000+", label: "3,000 o más" },
];

const platformOptions = [
  "Shopify",
  "WooCommerce",
  "VTEX",
  "Jumpseller",
  "PrestaShop",
  "BigCommerce",
  "Magento",
  "Otro",
];

const countryOptions = [
  { code: "+52", country: "MX", flag: "🇲🇽" },
  { code: "+57", country: "CO", flag: "🇨🇴" },
  { code: "+56", country: "CL", flag: "🇨🇱" },
  { code: "+51", country: "PE", flag: "🇵🇪" },
  { code: "+54", country: "AR", flag: "🇦🇷" },
  { code: "+593", country: "EC", flag: "🇪🇨" },
  { code: "+1", country: "US", flag: "🇺🇸" },
];

const sourceOptions = [
  "Instagram",
  "Google",
  "Facebook",
  "LinkedIn",
  "Referido",
  "Otro",
];

const features = [
  { icon: Clock, label: "Proceso breve (2 pasos)" },
  { icon: Shield, label: "Sin spam" },
  { icon: MessageCircle, label: "Respuesta rápida" },
  { icon: Target, label: "Enfocado en e-commerce" },
];

const demoPoints = [
  "Cómo responde el agente con catálogo y políticas reales.",
  "Cuándo deriva a humano y cómo queda el contexto.",
  "Métricas operativas: volumen, resolución y tiempos.",
];

const DemoForm = () => {
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    storeUrl: "",
    ordersRange: "",
    platform: "",
    countryCode: "+52",
    phone: "",
    name: "",
    email: "",
    source: "",
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleContinue = () => {
    setStep(2);
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    // Aquí puedes agregar la lógica para enviar el formulario
    console.log("Form data:", formData);
  };

  const showCalendar = formData.ordersRange !== "0-200";

  const handleWhatsApp = () => {
    window.open("https://wa.me/1234567890", "_blank");
  };

  return (
    <section id="demo-form" className="py-12 lg:py-24 xl:py-32 bg-gray-50">
      <div className="container mx-auto px-4 lg:px-6 xl:px-8">
        <div className="max-w-6xl xl:max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl lg:rounded-3xl border border-gray-200 shadow-xl overflow-hidden">
            <div className="grid lg:grid-cols-2">
              {/* Left content - hidden on mobile */}
              <div className="hidden lg:block p-10 bg-gradient-to-br from-white to-gray-50">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Solicita tu demo
                  </h2>
                  <p className="text-gray-600 mb-8 leading-relaxed">
                    Cuéntanos sobre tu tienda y un contacto. Al finalizar podrás ver la mejor opción para continuar.
                  </p>

                  {/* Feature chips */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {features.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-gray-200 text-sm"
                      >
                        <feature.icon className="w-3.5 h-3.5 text-gray-500" />
                        <span className="text-gray-600">{feature.label}</span>
                      </div>
                    ))}
                  </div>

                  {/* Demo points */}
                  <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6">
                    <h3 className="font-semibold text-gray-900 mb-4">
                      Qué verás en la demo
                    </h3>
                    <ul className="space-y-3">
                      {demoPoints.map((point, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center mt-0.5">
                            <Check className="w-3 h-3 text-indigo-600" />
                          </div>
                          <span className="text-sm text-gray-600">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <p className="text-xs text-gray-500">
                    Al enviar, aceptas que te contactemos para coordinar la demo.
                  </p>
                </div>
              </div>

              {/* Right form */}
              <div className="p-5 lg:p-10 bg-white">
                {/* Mobile header */}
                <div className="lg:hidden mb-5">
                  <h2 className="text-xl font-bold text-gray-900 mb-1">
                    Solicita tu demo
                  </h2>
                  <p className="text-sm text-gray-600">
                    Cuéntanos sobre tu tienda y te contactamos.
                  </p>
                </div>
                {!isSubmitted ? (
                  <div>
                    {/* Stepper header */}
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-medium text-gray-900">
                          Formulario
                        </span>
                        <span className="text-sm text-gray-500">
                          Paso {step} de 2
                        </span>
                      </div>
                      <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-indigo-600 rounded-full transition-all duration-300"
                          style={{ width: step === 1 ? "50%" : "100%" }}
                        />
                      </div>
                    </div>

                    {/* Tabs */}
                    <div className="flex gap-1 mb-6 p-1 bg-gray-100 rounded-lg">
                      <button
                        className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                          step === 1
                            ? "bg-white shadow-sm text-gray-900"
                            : "text-gray-500"
                        }`}
                        onClick={() => step === 2 && handleBack()}
                      >
                        Contacto
                      </button>
                      <button
                        className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                          step === 2
                            ? "bg-white shadow-sm text-gray-900"
                            : "text-gray-500"
                        }`}
                        disabled={step === 1}
                      >
                        Tu negocio
                      </button>
                    </div>

                    <form onSubmit={handleSubmit}>
                      {step === 1 ? (
                        <div className="space-y-4">
                          <div>
                            <label className="text-sm font-medium text-gray-900 mb-2 block">
                              Teléfono
                            </label>
                            <div className="flex gap-2">
                              <select
                                value={formData.countryCode}
                                onChange={(e) =>
                                  handleInputChange("countryCode", e.target.value)
                                }
                                className="w-28 h-11 px-3 rounded-lg border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                              >
                                {countryOptions.map((option) => (
                                  <option key={option.code} value={option.code}>
                                    {option.flag} {option.code}
                                  </option>
                                ))}
                              </select>
                              <input
                                type="tel"
                                placeholder="123 456 7890"
                                value={formData.phone}
                                onChange={(e) =>
                                  handleInputChange("phone", e.target.value)
                                }
                                className="h-11 flex-1 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="text-sm font-medium text-gray-900 mb-2 block">
                              Nombre
                            </label>
                            <input
                              type="text"
                              placeholder="Tu nombre"
                              value={formData.name}
                              onChange={(e) =>
                                handleInputChange("name", e.target.value)
                              }
                              className="w-full h-11 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                          </div>

                          <div>
                            <label className="text-sm font-medium text-gray-900 mb-2 block">
                              Correo corporativo
                            </label>
                            <input
                              type="email"
                              placeholder="tu@empresa.com"
                              value={formData.email}
                              onChange={(e) =>
                                handleInputChange("email", e.target.value)
                              }
                              className="w-full h-11 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                          </div>

                          <div>
                            <label className="text-sm font-medium text-gray-900 mb-2 block">
                              ¿Dónde nos conociste?
                            </label>
                            <select
                              value={formData.source}
                              onChange={(e) =>
                                handleInputChange("source", e.target.value)
                              }
                              className="w-full h-11 px-4 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                              <option value="">Selecciona una opción</option>
                              {sourceOptions.map((option) => (
                                <option key={option} value={option}>
                                  {option}
                                </option>
                              ))}
                            </select>
                          </div>

                          <button
                            type="button"
                            onClick={handleContinue}
                            className="w-full h-11 mt-6 inline-flex items-center justify-center rounded-lg bg-indigo-600 px-6 text-sm font-medium text-white hover:bg-indigo-700 transition-colors"
                          >
                            Continuar
                            <ChevronRight className="w-4 h-4 ml-1" />
                          </button>

                          <p className="text-xs text-center text-gray-500">
                            Tiempo estimado: 1 minuto.
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div>
                            <label className="text-sm font-medium text-gray-900 mb-2 block">
                              URL de la tienda
                            </label>
                            <input
                              type="url"
                              placeholder="https://tutienda.com"
                              value={formData.storeUrl}
                              onChange={(e) =>
                                handleInputChange("storeUrl", e.target.value)
                              }
                              className="w-full h-11 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                          </div>

                          <div>
                            <label className="text-sm font-medium text-gray-900 mb-2 block">
                              Órdenes mensuales
                            </label>
                            <select
                              value={formData.ordersRange}
                              onChange={(e) =>
                                handleInputChange("ordersRange", e.target.value)
                              }
                              className="w-full h-11 px-4 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                              <option value="">Selecciona un rango</option>
                              {ordersOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="text-sm font-medium text-gray-900 mb-2 block">
                              CMS / Plataforma
                            </label>
                            <select
                              value={formData.platform}
                              onChange={(e) =>
                                handleInputChange("platform", e.target.value)
                              }
                              className="w-full h-11 px-4 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                              <option value="">Selecciona tu plataforma</option>
                              {platformOptions.map((option) => (
                                <option key={option} value={option}>
                                  {option}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div className="flex gap-3 mt-6">
                            <button
                              type="button"
                              onClick={handleBack}
                              className="h-11 px-4 inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                              <ArrowLeft className="w-4 h-4 mr-1" />
                              Atrás
                            </button>
                            <button
                              type="submit"
                              className="h-11 flex-1 inline-flex items-center justify-center rounded-lg bg-indigo-600 px-6 text-sm font-medium text-white hover:bg-indigo-700 transition-colors"
                            >
                              Enviar
                            </button>
                          </div>

                          <p className="text-xs text-center text-gray-500">
                            No compartimos tu información. Sin spam.
                          </p>
                        </div>
                      )}
                    </form>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    {showCalendar ? (
                      <>
                        <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center mx-auto mb-6">
                          <Check className="w-8 h-8 text-indigo-600" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          Agenda tu demo
                        </h3>
                        <p className="text-gray-600 mb-6">
                          Selecciona un horario que te convenga.
                        </p>
                        <div className="bg-gray-100 rounded-xl border border-gray-200 p-8 min-h-[300px] flex items-center justify-center">
                          <span className="text-gray-500">
                            [Calendario embebido]
                          </span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center mx-auto mb-6">
                          <Check className="w-8 h-8 text-indigo-600" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          Muchas gracias por escribirnos
                        </h3>
                        <p className="text-gray-600 mb-6">
                          Nuestro equipo te contactará a la brevedad.
                        </p>
                        <button
                          onClick={handleWhatsApp}
                          className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          <MessageCircle className="w-4 h-4 mr-2" />
                          Hablar por WhatsApp
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* WhatsApp alternative */}
          <div className="mt-6">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 text-center">
              <p className="text-gray-600 mb-4">
                ¿Prefieres escribir ahora?
              </p>
              <button
                onClick={handleWhatsApp}
                className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Abrir WhatsApp
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoForm;
