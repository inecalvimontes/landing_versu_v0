import { useState, useEffect } from "react";
import { Check, Clock, Shield, Target, MessageCircle, ArrowLeft, ArrowRight } from "lucide-react";
import ModalWhatsApp from "./ModalWhatsApp";

const ordersOptions = [
  { value: "0-200", label: "0 - 200" },
  { value: "200-500", label: "200 - 500" },
  { value: "500-1000", label: "500 - 1000" },
  { value: "1000-3000", label: "1000 - 3000" },
  { value: "3000+", label: "+3000" },
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

const sourceOptions = [
  "Instagram",
  "Google",
  "Facebook",
  "LinkedIn",
  "Referido",
  "Otro",
];

const features = [
  { icon: Clock, label: "Configuración en 2 minutos" },
  { icon: Shield, label: "Sin spam" },
  { icon: MessageCircle, label: "Respuesta rápida" },
  { icon: Target, label: "Expertos en Ecommerce" },
];

const demoPoints = [
  "Tu negocio atendido por nuestra IA en vivo.",
  "Tú tienes el control: define cuándo y cómo la IA deriva a tus agentes humanos.",
  "Dashboard de impacto: Proyección de ahorro en costos y aumento de ROI.",
];

// Función helper para enviar webhooks a n8n
async function sendWebhookToN8N(eventType, data) {
  const webhookUrl = 'https://n8n.srv1268009.hstgr.cloud/webhook-test/266f3179-2029-40e2-b9c6-3d3e6efafb1e';
  
  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        eventType,
        timestamp: new Date().toISOString(),
        data,
        metadata: {
          url: window.location.href,
          referrer: document.referrer,
          userAgent: navigator.userAgent,
        }
      })
    });
    
    return response.ok;
  } catch (error) {
    console.error('Error sending webhook:', error);
    // No bloquear el flujo si falla el webhook
    return false;
  }
}

// Helper functions for SavvyCal metadata
function getCookie(name) {
  const m = document.cookie.match(new RegExp("(^|; )" + name + "=([^;]*)"));
  return m ? decodeURIComponent(m[2]) : undefined;
}

function qp(key) {
  try {
    return new URL(window.location.href).searchParams.get(key);
  } catch {
    return null;
  }
}

function readFbp() {
  return getCookie("_fbp");
}

function readOrBuildFbc() {
  const cookie = getCookie("_fbc");
  if (cookie) return cookie;
  const fbclid = qp("fbclid");
  if (!fbclid) return undefined;
  const ts = Math.floor(Date.now() / 1000);
  return `fb.1.${ts}.${fbclid}`;
}

function genEventId() {
  return `SCHEDULE::${Date.now()}::${Math.floor(Math.random() * 1e6)}`;
}

function readAdParams() {
  const KEYS = ["ad_id", "adset_id", "campaign_id"];
  const out = {};
  let url = null;
  try {
    url = new URL(window.location.href);
  } catch {
    // Ignore
  }

  KEYS.forEach((k) => {
    const v =
      (url ? url.searchParams.get(k) : null) ||
      sessionStorage.getItem(`meta_${k}`) ||
      undefined;
    if (v) {
      out[k] = v;
      sessionStorage.setItem(`meta_${k}`, v);
    }
  });
  return out;
}

function buildMetadata() {
  // Contexto para Meta CAPI
  const fbp = readFbp();
  const fbc = readOrBuildFbc();
  const eid = sessionStorage.getItem("schedule_event_id") || genEventId();
  sessionStorage.setItem("schedule_event_id", eid);

  const adp = readAdParams();

  let ref_url = "";
  try {
    const u = new URL(window.location.href);
    ref_url = `${u.origin}${u.pathname}`;
  } catch {
    ref_url = window.location.href;
  }

  const metadata = {
    eid,
    source: "web_landing",
    ref_url,
    ...(fbp ? { fbp } : {}),
    ...(fbc ? { fbc } : {}),
    ...(adp.ad_id ? { ad_id: adp.ad_id } : {}),
    ...(adp.adset_id ? { adset_id: adp.adset_id } : {}),
    ...(adp.campaign_id ? { campaign_id: adp.campaign_id } : {}),
  };

  return metadata;
}

const DemoForm = () => {
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    storeUrl: "",
    ordersRange: "",
    platform: "",
    name: "",
    email: "",
    source: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    source: "",
    storeUrl: "",
    ordersRange: "",
    platform: "",
  });
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    source: false,
    storeUrl: false,
    ordersRange: false,
    platform: false,
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validateField(field, formData[field]);
  };

  const validateField = (field, value) => {
    let error = "";
    
    switch (field) {
      case "name":
        if (!value.trim()) {
          error = "Ingresa tu nombre";
        }
        break;
      case "email":
        if (!value.trim()) {
          error = "Ingresa un correo electrónico";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = "Ingresa un correo electrónico válido";
        }
        break;
      case "source":
        if (!value) {
          error = "Selecciona una opción";
        }
        break;
      case "storeUrl":
        if (!value.trim()) {
          error = "Ingresa la URL de tu tienda";
        } else {
          try {
            new URL(value);
          } catch {
            error = "Ingresa una URL válida (ej: https://tutienda.com)";
          }
        }
        break;
      case "ordersRange":
        if (!value) {
          error = "Selecciona un rango de órdenes";
        }
        break;
      case "platform":
        if (!value) {
          error = "Selecciona tu plataforma";
        }
        break;
    }
    
    setErrors((prev) => ({ ...prev, [field]: error }));
    return !error;
  };

  const handleContinue = () => {
    // Validate all step 1 fields
    const nameValid = validateField("name", formData.name);
    const emailValid = validateField("email", formData.email);
    const sourceValid = validateField("source", formData.source);
    
    // Mark all as touched
    setTouched((prev) => ({ ...prev, name: true, email: true, source: true }));
    
    if (nameValid && emailValid && sourceValid) {
      // Enviar webhook al avanzar del paso 1
      sendWebhookToN8N('demo_form_step_1_completed', {
        name: formData.name,
        email: formData.email,
        source: formData.source,
        step: 1
      });
      setStep(2);
    }
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate all step 2 fields
    const urlValid = validateField("storeUrl", formData.storeUrl);
    const ordersValid = validateField("ordersRange", formData.ordersRange);
    const platformValid = validateField("platform", formData.platform);
    
    // Mark all as touched
    setTouched((prev) => ({ ...prev, storeUrl: true, ordersRange: true, platform: true }));
    
    if (urlValid && ordersValid && platformValid) {
      // Enviar webhook al completar el paso 2 (agendar reunión)
      sendWebhookToN8N('demo_form_step_2_completed', {
        name: formData.name,
        email: formData.email,
        source: formData.source,
        storeUrl: formData.storeUrl,
        ordersRange: formData.ordersRange,
        platform: formData.platform,
        step: 2
      });
      setIsSubmitted(true);
      // Aquí puedes agregar la lógica para enviar el formulario
      console.log("Form data:", formData);
    }
  };

  const handleWhatsApp = () => {
    setIsWhatsAppModalOpen(true);
  };

  // Email validation
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // URL validation
  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  // Step 1 validation
  const isStep1Valid = 
    formData.name.trim() !== "" &&
    isValidEmail(formData.email) &&
    formData.source !== "";

  // Step 2 validation
  const isStep2Valid = 
    isValidUrl(formData.storeUrl) &&
    formData.ordersRange !== "" &&
    formData.platform !== "";

  // Initialize SavvyCal when the calendar should be shown
  useEffect(() => {
    if (isSubmitted && window.SavvyCal) {
      // Small delay to ensure the DOM element exists
      setTimeout(() => {
        // Clear previous calendar instance to avoid duplication
        const container = document.getElementById('savvycal-booking');
        if (container) {
          container.innerHTML = '';
        }
        
        // Determinar qué URL de SavvyCal usar según el rango de órdenes
        const isHighVolume = formData.ordersRange === '1000-3000' || formData.ordersRange === '3000+';
        const savvyCalLink = isHighVolume 
          ? 'macarena/reunion-con-versu-ai' 
          : 'versu/demo';
        
        // Construir metadata para Meta CAPI y tracking
        const metadata = buildMetadata();
        
        window.SavvyCal('inline', { 
          link: savvyCalLink, 
          selector: '#savvycal-booking',
          email: formData.email,
          displayName: formData.name,
          metadata, // Metadata para tracking de Meta y analytics
          // Campos personalizados usando índices según el orden en SavvyCal
          questions: {
            0: formData.storeUrl,           // Website (primera pregunta)
            1: formData.ordersRange         // Órdenes mensuales (segunda pregunta)
          }
        });
      }, 100);
    }
  }, [isSubmitted, formData.ordersRange, formData.email, formData.name, formData.storeUrl]);

  return (
    <section id="demo-form" className="py-6 lg:py-12 xl:py-16 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
          <div className="bg-background rounded-2xl lg:rounded-3xl border border-text/20 shadow-xl overflow-hidden">
            <div className="grid lg:grid-cols-2 lg:items-stretch">
              {/* Left content - hidden on mobile */}
              <div className="hidden lg:block p-10 bg-gradient-to-br from-background to-background lg:flex lg:flex-col">
                <div className="lg:flex lg:flex-col lg:flex-grow lg:justify-between">
                  <h2 className="text-[20px] sm:text-[24px] md:text-[32px] lg:text-[40px] text-text mb-1 font-subtitle">
                    Agenda tu demo
                  </h2>
                  <p className="text-text/70 mb-8 leading-relaxed">
                    Mira cómo Versu escala tus ventas en piloto automático.
                  </p>

                  {/* Feature chips */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {features.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-background border border-text/20 text-sm"
                      >
                        <feature.icon className="w-3.5 h-3.5 text-accent" />
                        <span className="text-text/80">{feature.label}</span>
                      </div>
                    ))}
                  </div>

                  {/* Demo points */}
                  <div className="bg-background rounded-xl border border-text/20 p-5 mb-6">
                    <h3 className="font-semibold text-text mb-4">
                      Simulación real
                    </h3>
                    <ul className="space-y-3">
                      {demoPoints.map((point, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="flex-shrink-0 w-5 h-5 rounded-full bg-transparent border border-accent flex items-center justify-center mt-0.5">
                            <Check className="w-3 h-3 text-white" />
                          </div>
                          <span className="text-sm text-text/70">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Comentado: texto original */}
                  {/* <p className="text-xs text-text/60">
                    Al enviar, aceptas que te contactemos para coordinar la demo.
                  </p> */}
                  <p className="text-xs text-text/60">
                    Tus datos están seguros. Al continuar, aceptas nuestra política de privacidad.
                  </p>

                  {/* Botón Atrás - solo visible cuando se muestra el calendario */}
                  {isSubmitted && (
                    <button
                      type="button"
                      onClick={() => setIsSubmitted(false)}
                      className="glow-btn-white h-11 px-4 mt-6 inline-flex items-center justify-center rounded-full border border-white/80 bg-transparent text-white hover:bg-white transition-all"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      <span>Atrás</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Right form */}
              <div className="p-5 lg:p-10 bg-background lg:flex lg:flex-col lg:justify-between">
                {/* Mobile header */}
                <div className="lg:hidden mb-5">
                  <h2 className="text-xl font-bold text-text mb-1">
                    Mira cómo Versu escala tus ventas en piloto automático.
                  </h2>
                  <p className="text-sm text-text/70">
                    Obtén una demo personalizada de tu tienda.
                  </p>
                </div>
                {!isSubmitted ? (
                  <div className="lg:flex lg:flex-col lg:flex-grow lg:justify-between">
                    {/* Stepper header */}
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-medium text-text">
                          Formulario
                        </span>
                        <span className="text-sm text-text/60">
                          Paso {step} de 2
                        </span>
                      </div>
                      <div className="h-1.5 bg-text/20 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-accent rounded-full transition-all duration-300"
                          style={{ width: step === 1 ? "50%" : "100%" }}
                        />
                      </div>
                    </div>

                    {/* Tabs */}
                    <div className="flex gap-1 mb-6 p-1 bg-text/10 rounded-lg">
                      <button
                        className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                          step === 1
                            ? "bg-background shadow-sm text-text"
                            : "text-text/60"
                        }`}
                        onClick={() => step === 2 && handleBack()}
                      >
                        Contacto
                      </button>
                      <button
                        className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                          step === 2
                            ? "bg-background shadow-sm text-text"
                            : "text-text/60"
                        }`}
                        disabled={step === 1}
                      >
                        Tu negocio
                      </button>
                    </div>

                    <form onSubmit={handleSubmit} className="lg:flex lg:flex-col lg:flex-grow lg:justify-between">
                      {step === 1 ? (
                        <div className="space-y-4 lg:flex lg:flex-col lg:justify-between">
                          <div>
                            <label className="text-sm font-medium text-text mb-2 block">
                              Nombre
                            </label>
                            <input
                              type="text"
                              placeholder="Tu nombre"
                              value={formData.name}
                              onChange={(e) =>
                                handleInputChange("name", e.target.value)
                              }
                              onBlur={() => handleBlur("name")}
                              required
                              className={`w-full h-11 px-4 rounded-lg border bg-background text-text focus:outline-none focus:ring-2 ${
                                touched.name && errors.name
                                  ? "border-red-500 focus:ring-red-500"
                                  : "border-text/20 focus:ring-accent"
                              }`}
                            />
                            {touched.name && errors.name && (
                              <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                            )}
                          </div>

                          <div>
                            <label className="text-sm font-medium text-text mb-2 block">
                              Correo corporativo
                            </label>
                            <input
                              type="email"
                              placeholder="tu@empresa.com"
                              value={formData.email}
                              onChange={(e) =>
                                handleInputChange("email", e.target.value)
                              }
                              onBlur={() => handleBlur("email")}
                              required
                              className={`w-full h-11 px-4 rounded-lg border bg-background text-text focus:outline-none focus:ring-2 ${
                                touched.email && errors.email
                                  ? "border-red-500 focus:ring-red-500"
                                  : "border-text/20 focus:ring-accent"
                              }`}
                            />
                            {touched.email && errors.email && (
                              <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                            )}
                          </div>

                          <div>
                            <label className="text-sm font-medium text-text mb-2 block">
                              ¿Cómo supiste de Versu?
                            </label>
                            <select
                              value={formData.source}
                              onChange={(e) =>
                                handleInputChange("source", e.target.value)
                              }
                              onBlur={() => handleBlur("source")}
                              required
                              className={`w-full h-11 px-4 rounded-lg border bg-background text-text focus:outline-none focus:ring-2 ${
                                touched.source && errors.source
                                  ? "border-red-500 focus:ring-red-500"
                                  : "border-text/20 focus:ring-accent"
                              }`}
                            >
                              <option value="">Selecciona una opción</option>
                              {sourceOptions.map((option) => (
                                <option key={option} value={option}>
                                  {option}
                                </option>
                              ))}
                            </select>
                            {touched.source && errors.source && (
                              <p className="mt-1 text-sm text-red-500">{errors.source}</p>
                            )}
                          </div>

                          <button
                            type="button"
                            onClick={handleContinue}
                            disabled={!isStep1Valid}
                            className="glow-btn group w-full h-11 mt-6 inline-flex items-center justify-center gap-2 rounded-full border border-accent bg-transparent px-6 text-sm font-medium text-white hover:bg-accent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <span>Continuar</span>
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </button>

                          <p className="text-xs text-center text-text/60 lg:mt-auto">
                            Tiempo estimado: 1 minuto.
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div>
                            <label className="text-sm font-medium text-text mb-2 block">
                              URL de la tienda
                            </label>
                            <input
                              type="url"
                              placeholder="https://tutienda.com"
                              value={formData.storeUrl}
                              onChange={(e) =>
                                handleInputChange("storeUrl", e.target.value)
                              }
                              onBlur={() => handleBlur("storeUrl")}
                              required
                              className={`w-full h-11 px-4 rounded-lg border bg-background text-text focus:outline-none focus:ring-2 ${
                                touched.storeUrl && errors.storeUrl
                                  ? "border-red-500 focus:ring-red-500"
                                  : "border-text/20 focus:ring-accent"
                              }`}
                            />
                            {touched.storeUrl && errors.storeUrl && (
                              <p className="mt-1 text-sm text-red-500">{errors.storeUrl}</p>
                            )}
                          </div>

                          <div>
                            <label className="text-sm font-medium text-text mb-2 block">
                              Órdenes mensuales
                            </label>
                            <select
                              value={formData.ordersRange}
                              onChange={(e) =>
                                handleInputChange("ordersRange", e.target.value)
                              }
                              onBlur={() => handleBlur("ordersRange")}
                              required
                              className={`w-full h-11 px-4 rounded-lg border bg-background text-text focus:outline-none focus:ring-2 ${
                                touched.ordersRange && errors.ordersRange
                                  ? "border-red-500 focus:ring-red-500"
                                  : "border-text/20 focus:ring-accent"
                              }`}
                            >
                              <option value="">Selecciona un rango</option>
                              {ordersOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>
                            {touched.ordersRange && errors.ordersRange && (
                              <p className="mt-1 text-sm text-red-500">{errors.ordersRange}</p>
                            )}
                          </div>

                          <div>
                            <label className="text-sm font-medium text-text mb-2 block">
                              CMS / Plataforma
                            </label>
                            <select
                              value={formData.platform}
                              onChange={(e) =>
                                handleInputChange("platform", e.target.value)
                              }
                              onBlur={() => handleBlur("platform")}
                              required
                              className={`w-full h-11 px-4 rounded-lg border bg-background text-text focus:outline-none focus:ring-2 ${
                                touched.platform && errors.platform
                                  ? "border-red-500 focus:ring-red-500"
                                  : "border-text/20 focus:ring-accent"
                              }`}
                            >
                              <option value="">Selecciona tu plataforma</option>
                              {platformOptions.map((option) => (
                                <option key={option} value={option}>
                                  {option}
                                </option>
                              ))}
                            </select>
                            {touched.platform && errors.platform && (
                              <p className="mt-1 text-sm text-red-500">{errors.platform}</p>
                            )}
                          </div>

                          <div className="flex gap-3 mt-6">
                            <button
                              type="button"
                              onClick={handleBack}
                              className="glow-btn-white h-11 px-4 inline-flex items-center justify-center rounded-full border border-white/80 bg-transparent text-white hover:bg-white transition-all"
                            >
                              <ArrowLeft className="w-4 h-4 mr-1" />
                              <span>Atrás</span>
                            </button>
                            <button
                              type="submit"
                              disabled={!isStep2Valid}
                              className="glow-btn group h-11 flex-1 inline-flex items-center justify-center gap-2 rounded-full border border-accent bg-transparent px-6 text-sm font-medium text-white hover:bg-accent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <span>Agendar mi demo</span>
                              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </button>
                          </div>

                          <p className="text-xs text-center text-text/60">
                            Tus datos están seguros. Al continuar, aceptas nuestra política de privacidad.
                          </p>
                        </div>
                      )}
                    </form>
                  </div>
                ) : (
                  <>
                    <div id="savvycal-booking" className="min-h-[300px]">
                      {/* SavvyCal calendar will be injected here */}
                    </div>
                    {/* Botón Atrás para móviles - debajo del calendario */}
                    <button
                      type="button"
                      onClick={() => setIsSubmitted(false)}
                      className="lg:hidden glow-btn-white h-11 px-4 mt-4 inline-flex items-center justify-center rounded-full border border-white/80 bg-transparent text-white hover:bg-white transition-all"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      <span>Atrás</span>
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* WhatsApp alternative */}
            <div className="p-6 text-center">
              <button
                onClick={handleWhatsApp}
                className="glow-btn-whatsapp inline-flex items-center justify-center rounded-full border border-[#1DAB61] bg-transparent px-4 py-2 text-sm font-medium text-white hover:text-white transition-all"
              >
                <img src="/whatsapp.png" alt="WhatsApp" className="w-4 h-4 mr-2 object-contain" />
                <span>WhatsApp</span>
              </button>
              <p className="text-text/70 mt-2">
                ¿Sigues con dudas? Escríbenos
              </p>
            </div>
          </div>
      </div>

      <ModalWhatsApp
        isOpen={isWhatsAppModalOpen}
        onClose={() => setIsWhatsAppModalOpen(false)}
      />
    </section>
  );
};

export default DemoForm;
