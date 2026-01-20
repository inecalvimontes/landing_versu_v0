import { useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

// Función helper para enviar webhooks a n8n
async function sendWebhookToN8N(eventType, data) {
  const webhookUrl = 'https://n8n.srv1268009.hstgr.cloud/webhook-test/266f3179-2029-40e2-b9c6-3d3e6efafb1e';
  
  try {
    const payload = {
      eventType,
      timestamp: new Date().toISOString(),
      data,
      metadata: {
        url: window.location.href,
        referrer: document.referrer,
        userAgent: navigator.userAgent,
      }
    };
    
    const payloadString = JSON.stringify(payload);
    
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-forward-secret': import.meta.env.WEBHOOK_SECRET || '',
      },
      body: payloadString
    });
    
    return response.ok;
  } catch (error) {
    console.error('Error sending webhook:', error);
    // No bloquear el flujo si falla el webhook
    return false;
  }
}

const ordersOptions = [
  { value: "0-200", label: "0 - 200" },
  { value: "200-500", label: "200 - 500" },
  { value: "500-1000", label: "500 - 1000" },
  { value: "1000-3000", label: "1000 - 3000" },
  { value: "3000+", label: "+3000" },
];

const ModalWhatsApp = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    email: "",
    storeUrl: "",
    ordersRange: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    storeUrl: "",
    ordersRange: "",
  });
  const [touched, setTouched] = useState({
    email: false,
    storeUrl: false,
    ordersRange: false,
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
      case "email":
        if (!value.trim()) {
          error = "Ingresa un correo electrónico";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = "Ingresa un correo electrónico válido";
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
    }
    
    setErrors((prev) => ({ ...prev, [field]: error }));
    return !error;
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

  const isFormValid =
    isValidEmail(formData.email) &&
    isValidUrl(formData.storeUrl) &&
    formData.ordersRange !== "";

  const handleOpenWhatsApp = () => {
    // Validate all fields
    const emailValid = validateField("email", formData.email);
    const urlValid = validateField("storeUrl", formData.storeUrl);
    const ordersValid = validateField("ordersRange", formData.ordersRange);
    
    // Mark all as touched
    setTouched({ email: true, storeUrl: true, ordersRange: true });
    
    if (!emailValid || !urlValid || !ordersValid) return;

    // Enviar webhook al abrir WhatsApp
    sendWebhookToN8N('whatsapp_form_opened', {
      email: formData.email,
      storeUrl: formData.storeUrl,
      ordersRange: formData.ordersRange,
    });

    const message = encodeURIComponent(
      `Hola, quiero saber más sobre Versu.\n\nEmail: ${formData.email}\nWebsite: ${formData.storeUrl}\nÓrdenes mensuales: ${formData.ordersRange}`
    );
    window.open(`https://wa.me/56932592085?text=${message}`, "_blank");
    onClose();
    // Reset form
    setFormData({ email: "", storeUrl: "", ordersRange: "" });
    setErrors({ email: "", storeUrl: "", ordersRange: "" });
    setTouched({ email: false, storeUrl: false, ordersRange: false });
  };

  if (!isOpen) return null;

  const modalContent = (
    <div 
      className="fixed top-0 left-0 right-0 bottom-0 z-[9999] flex items-center justify-center p-4"
      style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
    >
      {/* Backdrop */}
      <div
        className="fixed top-0 left-0 right-0 bottom-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
      />

      {/* Modal */}
      <div className="relative z-10 bg-background rounded-2xl border border-text/20 shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-text/10 transition-colors"
          aria-label="Cerrar"
        >
          <X className="h-5 w-5 text-text" />
        </button>

        {/* Content */}
        <div className="p-6">
          <h2 className="text-2xl font-bold text-text mb-2">
            Contáctanos por WhatsApp
          </h2>
          <p className="text-text/70 mb-6">
            Completa tus datos y te abriremos una conversación en WhatsApp.
          </p>

          <div className="space-y-4">
            {/* Email */}
            <div>
              <label className="text-sm font-medium text-text mb-2 block">
                Correo electrónico
              </label>
              <input
                type="email"
                placeholder="tu@empresa.com"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
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

            {/* Website */}
            <div>
              <label className="text-sm font-medium text-text mb-2 block">
                URL de la tienda
              </label>
              <input
                type="url"
                placeholder="https://tutienda.com"
                value={formData.storeUrl}
                onChange={(e) => handleInputChange("storeUrl", e.target.value)}
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

            {/* Orders Range */}
            <div>
              <label className="text-sm font-medium text-text mb-2 block">
                Órdenes mensuales
              </label>
              <select
                value={formData.ordersRange}
                onChange={(e) => handleInputChange("ordersRange", e.target.value)}
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

            {/* Submit button */}
            <button
              onClick={handleOpenWhatsApp}
              disabled={!isFormValid}
              className="glow-btn-whatsapp w-full h-11 mt-6 inline-flex items-center justify-center gap-2 rounded-full border border-[#1DAB61] bg-transparent px-6 text-sm font-medium text-white hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <img src="/whatsapp.png" alt="WhatsApp" className="w-4 h-4 object-contain" />
              <span>Abrir WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default ModalWhatsApp;
