// Utilidades para trackear eventos de Meta Pixel + Conversions API
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
 * Trackea un evento de Meta Pixel con eventID para deduplicación con CAPI
 * @param {string} eventName - Nombre del evento (ej: 'Schedule')
 * @param {object} parameters - Parámetros opcionales del evento
 * @param {string} eventId - Event ID único para deduplicación
 */
export const trackEventWithId = (eventName, parameters = {}, eventId) => {
  if (typeof window === 'undefined' || !window.fbq) {
    console.warn('Meta Pixel no está inicializado');
    return;
  }
  
  if (!eventId) {
    console.warn('[Tracking] trackEventWithId called without eventId, falling back to regular track');
    trackEvent(eventName, parameters);
    return;
  }
  
  // Usar trackCustom para eventos personalizados o track para estándar
  // Schedule es un evento estándar de Meta, pero trackCustom también funciona
  // Elegimos 'track' porque Schedule es un evento estándar y Meta lo reconoce mejor
  // Si necesitas trackCustom, cambia 'track' por 'trackCustom'
  window.fbq('track', eventName, parameters, { eventID: eventId });
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

/**
 * Envía un evento a Meta Conversions API vía backend/n8n
 * @param {object} payload - Payload con metadata para CAPI
 * @returns {Promise<boolean>} Success status
 */
export const sendCapiEvent = async (payload) => {
  const CAPI_ENDPOINT = 'https://prod-load-balancer.versu.ai/landing/webhook/';
  
  try {
    const response = await fetch(CAPI_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    
    if (!response.ok) {
      if (import.meta.env.DEV) {
        console.debug('[Tracking] CAPI request failed:', response.status, response.statusText);
      }
      return false;
    }
    
    return true;
  } catch (error) {
    if (import.meta.env.DEV) {
      console.debug('[Tracking] CAPI request error:', error);
    }
    // No bloquear el flujo si falla CAPI
    return false;
  }
};

/**
 * Inicializa el listener para eventos de SavvyCal scheduling
 * Maneja deduplicación Pixel + CAPI y previene envíos duplicados
 */
export const initSavvyCalTracking = () => {
  if (typeof window === 'undefined') return;
  
  // Importar funciones de tracking dinámicamente para evitar circular dependencies
  import('./tracking.js').then(({ buildMetadata, genEventId }) => {
    // Verificar si ya se inicializó (prevenir múltiples listeners)
    if (window.__savvycalTrackingInitialized) {
      return;
    }
    window.__savvycalTrackingInitialized = true;
    
    window.addEventListener("savvycal.scheduled", async (ev) => {
      const { id, link, startAt, endAt, email, displayName, timeZone } = ev.detail;
      
      // Prevenir envíos duplicados usando sessionStorage
      const SENT_FLAG_KEY = 'schedule_sent';
      if (typeof sessionStorage !== 'undefined') {
        const alreadySent = sessionStorage.getItem(SENT_FLAG_KEY);
        if (alreadySent) {
          if (import.meta.env.DEV) {
            console.debug('[Tracking] Schedule event already sent, skipping duplicate');
          }
          return;
        }
        // Marcar como enviado inmediatamente para prevenir race conditions
        sessionStorage.setItem(SENT_FLAG_KEY, 'true');
      }
      
      // Generar o recuperar event ID estable para esta sesión
      let eid;
      if (typeof sessionStorage !== 'undefined') {
        eid = sessionStorage.getItem("schedule_event_id") || genEventId();
        sessionStorage.setItem("schedule_event_id", eid);
      } else {
        eid = genEventId();
      }
      
      // Construir metadata con fbp/fbc persistentes
      const metadata = buildMetadata();
      
      // Asegurar que el eid esté en metadata (por si buildMetadata no lo incluyó)
      metadata.eid = eid;
      
      // 1. Disparar evento en Meta Pixel (browser) con eventID para deduplicación
      // Usamos 'Schedule' como evento estándar de Meta (mejor reconocimiento)
      // Alternativa: trackCustom('Schedule', ...) si prefieres evento personalizado
      trackEventWithId(
        'Schedule', // Evento estándar de Meta
        {
          content_name: 'Demo Scheduled',
          content_category: 'conversion',
          // No incluimos email aquí porque PII debe ir hasheado en CAPI
        },
        eid
      );
      
      // 2. Enviar evento a CAPI vía backend/n8n
      // El backend debe transformar este payload a formato CAPI:
      // - meta.fbp -> user_data.fbp
      // - meta.fbc -> user_data.fbc
      // - meta.event_id -> event.event_id
      // - meta.event_source_url -> event.event_source_url
      // - event.action_source = "website"
      // - email debe hashearse con SHA256 en el servidor antes de enviar a CAPI
      const capiPayload = {
        event_name: 'Schedule',
        event_time: Math.floor(Date.now() / 1000),
        event_source_url: metadata.ref_url,
        action_source: 'website', // Siempre "website" para eventos del browser
        meta: {
          event_id: metadata.eid,
          event_source_url: metadata.ref_url,
          ...(metadata.fbp ? { fbp: metadata.fbp } : {}),
          ...(metadata.fbc ? { fbc: metadata.fbc } : {}),
          ...(metadata.ad_id ? { ad_id: metadata.ad_id } : {}),
          ...(metadata.adset_id ? { adset_id: metadata.adset_id } : {}),
          ...(metadata.campaign_id ? { campaign_id: metadata.campaign_id } : {}),
        },
        // TODO: Si se incluye email, debe hashearse con SHA256 en el servidor
        // antes de enviar a CAPI. Incluir solo si hay consentimiento explícito.
        // user_data: {
        //   em: hashSHA256(email.toLowerCase().trim()), // Hacer en servidor
        //   ...(metadata.fbp ? { fbp: metadata.fbp } : {}),
        //   ...(metadata.fbc ? { fbc: metadata.fbc } : {}),
        // }
        // Por ahora, enviamos email en un campo separado para que el servidor lo procese
        // El servidor debe validar consentimiento y hashear antes de CAPI
        user_data_raw: {
          // Email sin hashear - el servidor debe hashearlo con SHA256
          // TODO: Validar consentimiento antes de incluir
          ...(email ? { email: email.toLowerCase().trim() } : {}),
        },
        // Datos adicionales para contexto (no van a CAPI directamente)
        context: {
          savvycal_id: id,
          link,
          start_at: startAt,
          end_at: endAt,
          display_name: displayName,
          time_zone: timeZone,
        },
      };
      
      await sendCapiEvent(capiPayload);
      
      if (import.meta.env.DEV) {
        console.debug('[Tracking] Schedule event tracked:', {
          event_id: eid,
          has_fbp: !!metadata.fbp,
          has_fbc: !!metadata.fbc,
        });
      }
    });
  });
};
