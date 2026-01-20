// Utilidades para trackear eventos de Meta Pixel
// El código base del pixel ya está instalado en index.html

/**
 * Trackea un evento personalizado de Meta Pixel
 * @param {string} eventName - Nombre del evento (ej: 'Lead', 'Contact', 'Schedule')
 * @param {object} parameters - Parámetros opcionales del evento
 */
export const trackEvent = (eventName, parameters = {}) => {
  if (typeof window === 'undefined' || !window.fbq) {
    console.warn('Meta Pixel no está inicializado');
    return;
  }
  
  window.fbq('track', eventName, parameters);
};

/**
 * Eventos predefinidos comunes
 */

// Trackear cuando alguien ve contenido
export const trackViewContent = (contentName, contentType = 'landing_page') => {
  trackEvent('ViewContent', {
    content_name: contentName,
    content_category: contentType
  });
};

// Trackear cuando alguien genera un lead
export const trackLead = (source = 'form') => {
  trackEvent('Lead', {
    content_name: 'Lead Generation',
    content_category: source
  });
};

// Trackear cuando alguien hace contacto
export const trackContact = () => {
  trackEvent('Contact');
};

// Trackear cuando alguien agenda una demo
export const trackSchedule = (email, startAt) => {
  trackEvent('Schedule', {
    content_name: 'Demo Scheduled',
    email: email,
    start_at: startAt
  });
};

// Trackear cuando alguien inicia checkout (solicita demo)
export const trackInitiateCheckout = () => {
  trackEvent('InitiateCheckout', {
    content_name: 'Demo Request',
    content_category: 'conversion'
  });
};

// Trackear cuando se envía un formulario
export const trackSubmitApplication = (formType = 'demo') => {
  trackEvent('SubmitApplication', {
    content_name: `${formType}_form`,
    content_category: 'form_submission'
  });
};
