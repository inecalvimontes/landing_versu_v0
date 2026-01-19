import { useState } from "react";
import { ChevronDown, Users, Bot, Star, Clock, ShieldAlert, FileText } from "lucide-react";
import { cn } from "../lib/utils";

const faqs = [
  {
    question: "¿Versu reemplaza a mi equipo?",
    answer:
      "No. Versu reduce en promedio hasta un 65% la carga operativa del equipo humano. Tu equipo se enfoca en casos críticos o excepciones, y Versu deriva las conversaciones a cada integrante cuando se requiere intervención humana, manteniendo todo el contexto.",
    icon: Users,
  },
  {
    question: "¿Los clientes notan que es IA?",
    answer:
      "Versu responde con el tono de tu marca y mantiene contexto conversacional. La mayoría de clientes no lo nota, pero si preguntan, el agente se identifica como asistente virtual.",
    icon: Bot,
  },
  {
    question: "¿Qué hace diferente a Versu?",
    answer:
      "Versu está diseñado específicamente para e-commerce. Se conecta a tu catálogo y a tus políticas (envíos, cambios, pagos) para responder con contexto real, mantener consistencia y escalar sin perder control operativo. Por eso nos enfocamos en retail/e-commerce y no en industrias fuera de ese scope.",
    icon: Star,
  },
  {
    question: "¿Tiene costo de implementación? ¿Cuanto tiempo toma?",
    answer:
      "No. Versu no tiene costos de implementación. La integración técnica toma alrededor de 3 minutos y el tiempo para dejar los agentes públicos depende del negocio. En promedio, quedan operativos en una semana, considerando ajustes según tu operación.",
    icon: Clock,
  },
  {
    question: "¿Qué pasa si la IA se equivoca?",
    answer:
      "Tu equipo supervisa en tiempo real y puede intervenir con un solo click. Cada error se corrige sin costo y sirve como hito para una mejora continua del agente.",
    icon: ShieldAlert,
  },
  {
    question: "¿Hay cláusula de permanencia?",
    answer:
      "No es obligatorio amarrarse por largos períodos. Trabajamos con suscripción y puedes cancelar en cualquier momento.",
    icon: FileText,
  },
];

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="bg-background py-8 md:py-12 lg:py-16 xl:py-20">
      <div className="mx-auto max-w-7xl px-[42px] sm:px-[72px] lg:px-[84px] xl:px-[108px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-24 items-start">
            {/* Left: Title and subtitle - fixed in initial position */}
            <div className="flex flex-col lg:sticky lg:top-24 lg:pt-32 self-start">
              <h2 className="text-[20px] sm:text-[24px] md:text-[32px] lg:text-[40px] tracking-tight text-text mb-1 font-subtitle lg:whitespace-nowrap">
                Preguntas frecuentes (FAQ)
              </h2>
              <p className="text-base lg:text-lg text-text/70 font-text lg:whitespace-nowrap">
                ¿No encuentras lo que buscas? Contacta a nuestro{" "}
                <span className="font-semibold text-text">equipo de soporte</span>.
              </p>
            </div>

            {/* Right: FAQ accordion */}
            <div className="divide-y divide-text/20 rounded-2xl border border-text/20 bg-background shadow-sm">
              {faqs.map((faq, index) => (
                <div key={index}>
                  <button
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left transition-colors hover:bg-text/10"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <faq.icon className="w-3.5 h-3.5 text-accent flex-shrink-0" />
                      <span className="font-medium text-text">
                        {faq.question}
                      </span>
                    </div>
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
