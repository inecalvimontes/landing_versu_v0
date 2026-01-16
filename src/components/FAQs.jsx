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
    <section className="bg-background py-8 md:py-12 lg:py-16 xl:py-20">
      <div className="mx-auto max-w-7xl px-[42px] sm:px-[72px] lg:px-[84px] xl:px-[108px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-24 items-start">
            {/* Left: Title, subtitle and image - sticky on desktop */}
            <div className="lg:sticky lg:top-24">
              <h2 className="text-[20px] sm:text-[24px] md:text-[32px] lg:text-[40px] tracking-tight text-text mb-1 font-subtitle lg:whitespace-nowrap">
                Preguntas frecuentes (FAQ)
              </h2>
              <p className="text-base lg:text-lg text-text/70 font-text lg:whitespace-nowrap">
                ¿No encuentras lo que buscas? Contacta a nuestro{" "}
                <span className="font-semibold text-text">equipo de soporte</span>.
              </p>
              <div className="mt-8 flex justify-center">
                <div className="rounded-2xl overflow-hidden max-w-[280px] lg:max-w-[320px]">
                <img 
                  src="/placeholder.jpg" 
                  alt="FAQ illustration" 
                  className="w-full h-auto object-cover rounded-2xl"
                />
                </div>
              </div>
            </div>

            {/* Right: FAQ accordion */}
            <div className="divide-y divide-text/20 rounded-2xl border border-text/20 bg-background shadow-sm">
              {faqs.map((faq, index) => (
                <div key={index}>
                  <button
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left transition-colors hover:bg-text/10"
                  >
                    <span className="font-medium text-text">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={cn(
                        "h-5 w-5 flex-shrink-0 text-text/60 transition-transform duration-200",
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
                      <p className="px-6 pb-4 text-sm leading-relaxed text-text/70">
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
