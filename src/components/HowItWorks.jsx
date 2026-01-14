import { useState } from "react";
import { Link2, Brain, Rocket, Send, MessageCircle, ArrowRight } from "lucide-react";
import IPhoneFrame from "./ui/IPhoneFrame";

const steps = [
  {
    icon: Link2,
    title: "Conectamos tu canal y tu tienda",
    description:
      "Integración directa con WhatsApp Business, Instagram y tu plataforma de e-commerce.",
  },
  {
    icon: Brain,
    title: "Entrenamos el agente con tu operación",
    description:
      "Configuramos el agente con tu catálogo, políticas y tono de marca.",
  },
  {
    icon: Rocket,
    title: "Publicas y controlas desde la plataforma",
    description:
      "Monitorea conversaciones, métricas y ajusta el comportamiento en tiempo real.",
  },
];

const countryOptions = [
  { code: "+52", country: "🇲🇽 MX" },
  { code: "+57", country: "🇨🇴 CO" },
  { code: "+56", country: "🇨🇱 CL" },
  { code: "+51", country: "🇵🇪 PE" },
];

const HowItWorks = () => {
  const [chatStep, setChatStep] = useState("chat");
  const [messages, setMessages] = useState([
    { text: "¡Hola! Soy Versu 👋 ¿Tienes alguna pregunta sobre nuestros productos?", isUser: false },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [countryCode, setCountryCode] = useState("+56");
  const [phone, setPhone] = useState("");
  const [storeUrl, setStoreUrl] = useState("");

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    const userMessage = inputValue;
    setMessages(prev => [...prev, { text: userMessage, isUser: true }]);
    setInputValue("");
    
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        text: "¡Gracias por tu mensaje! Para darte una respuesta personalizada, ¿podrías compartirme tu número de WhatsApp y la URL de tu tienda?", 
        isUser: false 
      }]);
      setChatStep("form");
    }, 1000);
  };

  const handleSubmitForm = () => {
    if (!phone.trim() || !storeUrl.trim()) return;
    setChatStep("done");
    setMessages(prev => [...prev, { 
      text: "¡Perfecto! Ahora puedes probar Versu directamente en WhatsApp con tu catálogo.", 
      isUser: false 
    }]);
  };

  const openWhatsApp = () => {
    const fullPhone = `${countryCode}${phone}`.replace(/\s+/g, "");
    const message = encodeURIComponent(`Hola, quiero probar Versu. Mi tienda es: ${storeUrl}`);
    window.open(`https://wa.me/56912345678?text=${message}`, "_blank");
  };

  return (
    <section className="bg-background py-8 md:py-12 lg:py-16 xl:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-40 xl:px-48">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Left: Title, Subtitle and Steps */}
          <div>
            <div className="mb-8 lg:mb-10">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl xl:text-6xl text-text">
                Cómo funciona
              </h2>
              <p className="mt-4 text-lg lg:text-xl xl:text-2xl text-text/70">
                Tres pasos. Sin equipo técnico para partir.
              </p>
            </div>
            <div className="space-y-8 lg:space-y-10">
            {steps.map((step, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/20">
                    <step.icon className="h-6 w-6 text-accent" />
                  </div>
                </div>
                <div>
                  <p className="mb-1 text-xs font-medium uppercase tracking-wider text-text/60">
                    PASO {index + 1}
                  </p>
                  <h3 className="text-lg font-semibold text-text">{step.title}</h3>
                  <p className="mt-1 text-text/70">{step.description}</p>
                </div>
              </div>
            ))}
            </div>
          </div>

          {/* iPhone Simulator */}
          <div className="flex items-center justify-center lg:justify-end">
            <div className="w-full max-w-[280px]">
              <div className="text-center mb-4">
                <p className="text-sm font-medium text-text/60">
                  Prueba cómo funciona Versu
                </p>
              </div>
              
              <IPhoneFrame>
                {/* Status Bar */}
                <div className="flex items-center justify-between bg-accent px-4 py-2 pt-12">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
                      <MessageCircle className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-white">Versu</p>
                      <p className="text-[10px] text-white/70">En línea</p>
                    </div>
                  </div>
                </div>

                {/* Chat Messages */}
                <div className="h-80 overflow-y-auto bg-text/5 p-3 space-y-2">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-xl px-3 py-2 text-xs ${
                          message.isUser
                            ? "bg-accent text-white rounded-tr-sm"
                            : "bg-background border border-text/20 rounded-tl-sm text-text"
                        }`}
                      >
                        {message.text}
                      </div>
                    </div>
                  ))}

                  {/* Form inside chat */}
                  {chatStep === "form" && (
                    <div className="mt-3 space-y-2 rounded-xl bg-background border border-text/20 p-2.5">
                      <div>
                        <label className="text-[10px] text-text/60 mb-1 block">
                          Tu WhatsApp
                        </label>
                        <div className="flex gap-1">
                          <select
                            value={countryCode}
                            onChange={(e) => setCountryCode(e.target.value)}
                            className="w-14 h-6 px-1 text-[9px] rounded border border-text/20 bg-background flex-shrink-0 text-text"
                          >
                            {countryOptions.map((opt) => (
                              <option key={opt.code} value={opt.code}>
                                {opt.country.split(' ')[1]}
                              </option>
                            ))}
                          </select>
                          <input
                            placeholder="9 1234 5678"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="h-6 text-[10px] flex-1 min-w-0 px-1.5 rounded border border-text/20 bg-background text-text"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-[10px] text-text/60 mb-1 block">
                          URL de tu tienda
                        </label>
                        <input
                          placeholder="URL de tu tienda"
                          value={storeUrl}
                          onChange={(e) => setStoreUrl(e.target.value)}
                          className="h-6 text-[10px] w-full px-1.5 rounded border border-text/20 bg-background text-text"
                        />
                      </div>
                      <button
                        className="w-full h-6 text-[10px] rounded bg-accent text-white hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={handleSubmitForm}
                        disabled={!phone.trim() || !storeUrl.trim()}
                      >
                        Continuar
                      </button>
                    </div>
                  )}

                  {/* WhatsApp button */}
                  {chatStep === "done" && (
                    <div className="mt-3">
                      <button
                        className="w-full h-9 gap-2 rounded-lg bg-[#25D366] hover:bg-[#25D366]/90 text-white inline-flex items-center justify-center text-xs transition-colors"
                        onClick={openWhatsApp}
                      >
                        <MessageCircle className="h-4 w-4" />
                        Abrir WhatsApp
                        <ArrowRight className="h-3 w-3" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Input Area */}
                {chatStep === "chat" && (
                  <div className="border-t border-text/20 bg-background p-2 pb-8">
                    <div className="flex items-center gap-2">
                      <input
                        placeholder="Escribe un mensaje..."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                        className="h-8 flex-1 text-xs px-2 rounded border border-text/20 bg-background text-text"
                      />
                      <button
                        className="h-8 w-8 rounded inline-flex items-center justify-center bg-accent text-white hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={handleSendMessage}
                        disabled={!inputValue.trim()}
                      >
                        <Send className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                )}

                {chatStep !== "chat" && (
                  <div className="border-t border-text/20 bg-background p-2 pb-8">
                    <div className="h-8 flex items-center justify-center">
                      <p className="text-[10px] text-text/60">
                        {chatStep === "form" ? "Completa el formulario arriba" : "¡Listo para probar!"}
                      </p>
                    </div>
                  </div>
                )}
              </IPhoneFrame>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
