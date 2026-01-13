import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "../lib/utils";

const faqs = [
  {
    question: "¿Versu reemplaza a mi equipo?",
    answer:
      "No. Versu automatiza consultas frecuentes y deriva casos complejos a tu equipo humano con todo el contexto de la conversación.",
  },
  {
    question: "¿Cuánto se demora en quedar funcionando?",
    answer:
      "El promedio es de 7 días hábiles, dependiendo de la complejidad de tu catálogo y políticas. Algunos clientes han logrado implementar en 3 días.",
  },
  {
    question: "¿Qué canales soporta?",
    answer:
      "WhatsApp Business API e Instagram DMs. Próximamente estaremos agregando Facebook Messenger y chat web.",
  },
  {
    question: "¿Cómo se entrena el agente?",
    answer:
      "Conectamos tu tienda (Shopify, WooCommerce, VTEX, etc.) y extraemos automáticamente tu catálogo. Además, configuramos tus políticas de envío, devoluciones y preguntas frecuentes.",
  },
  {
    question: "¿Puedo personalizar las respuestas?",
    answer:
      "Sí, puedes ajustar el tono, agregar respuestas específicas y definir cuándo debe derivar a un humano. Todo desde nuestro panel sin necesidad de código.",
  },
  {
    question: "¿Qué pasa si el agente no sabe responder?",
    answer:
      "El agente está configurado para reconocer sus límites. Cuando no tiene certeza, deriva la conversación a tu equipo con un resumen del contexto.",
  },
  {
    question: "¿Hay un período de prueba?",
    answer:
      "Ofrecemos una demo personalizada donde puedes ver el agente funcionando con tu catálogo real antes de tomar una decisión.",
  },
  {
    question: "¿Cuánto cuesta?",
    answer:
      "Tenemos planes desde $99 USD/mes. El precio final depende del volumen de conversaciones y las integraciones requeridas. Agenda una demo para recibir una cotización personalizada.",
  },
];

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="bg-gray-50 py-16 md:py-24 lg:py-32 xl:py-40">
      <div className="container mx-auto px-4 lg:px-6 xl:px-8">
        <div className="max-w-6xl xl:max-w-7xl mx-auto">
          {/* Header - centered */}
          <div className="text-center mb-10 lg:mb-16">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl xl:text-6xl">
              Preguntas frecuentes
            </h2>
            <p className="mt-4 text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">
              ¿Tienes más preguntas? Escríbenos por WhatsApp y te responderemos
              en minutos.
            </p>
          </div>

          {/* FAQ accordion - full width */}
          <div className="divide-y divide-gray-200 rounded-2xl border border-gray-200 bg-white shadow-sm">
            {faqs.map((faq, index) => (
              <div key={index}>
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left transition-colors hover:bg-gray-50"
                >
                  <span className="font-medium text-gray-900">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={cn(
                      "h-5 w-5 flex-shrink-0 text-gray-500 transition-transform duration-200",
                      openIndex === index && "rotate-180"
                    )}
                  />
                </button>
                <div
                  className={cn(
                    "grid transition-all duration-200 ease-in-out",
                    openIndex === index
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-4 text-sm leading-relaxed text-gray-600">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQs;
