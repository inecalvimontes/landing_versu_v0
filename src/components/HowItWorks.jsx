import { useState, useEffect } from "react";
import { Link2, Brain, Rocket, Send, MessageCircle, ArrowRight, ArrowLeft, Video, Phone, Plus, Camera, Mic, Signal, Wifi, Battery } from "lucide-react";
import IPhoneFrame from "./ui/IPhoneFrame";
import ModalWhatsApp from "./ModalWhatsApp";

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
    { text: "¡Hola! Soy Versu 👋 ¿Tienes alguna pregunta sobre nuestros productos?", isUser: false, timestamp: new Date() },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [countryCode, setCountryCode] = useState("+56");
  const [phone, setPhone] = useState("");
  const [storeUrl, setStoreUrl] = useState("");
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', hour12: false });
  };

  const formatDate = (date) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const dayName = days[date.getDay()];
    const day = date.getDate();
    const month = months[date.getMonth()];
    return `${dayName} ${day}. ${month}`;
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    const userMessage = inputValue;
    setMessages(prev => [...prev, { text: userMessage, isUser: true, timestamp: new Date() }]);
    setInputValue("");
    
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        text: "¡Gracias por tu mensaje! Para darte una respuesta personalizada, ¿podrías compartirme tu número de WhatsApp y la URL de tu tienda?", 
        isUser: false,
        timestamp: new Date()
      }]);
      setChatStep("form");
    }, 1000);
  };

  const handleSubmitForm = () => {
    if (!phone.trim() || !storeUrl.trim()) return;
    setChatStep("done");
    setMessages(prev => [...prev, { 
      text: "¡Perfecto! Ahora puedes probar Versu directamente en WhatsApp con tu catálogo.", 
      isUser: false,
      timestamp: new Date()
    }]);
  };

  const openWhatsApp = () => {
    setIsWhatsAppModalOpen(true);
  };

  return (
    <section className="bg-background py-8 md:py-12 lg:py-16 xl:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <div className="grid gap-6 lg:grid-cols-[3fr_2fr] lg:gap-8 items-center">
          {/* Left: Title, Subtitle and Steps */}
          <div>
            <div className="mb-8 lg:mb-10">
              <h2 className="text-[20px] sm:text-[24px] md:text-[32px] lg:text-[40px] tracking-tight text-text font-subtitle">
                Cómo funciona
              </h2>
              <p className="mt-1 text-base sm:text-lg lg:text-xl text-text/70 font-text">
                Tres pasos. Sin equipo técnico para partir.
              </p>
            </div>
            <div className="space-y-8 lg:space-y-10">
            {steps.map((step, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="glow-icon flex h-12 w-12 items-center justify-center rounded-xl bg-accent/20 transition-all">
                    <step.icon className="h-6 w-6 text-accent transition-all" />
                  </div>
                </div>
                <div>
                  <p className="mb-1 text-[20px] font-detail uppercase tracking-wider text-text/60">
                    PASO {index + 1}
                  </p>
                  <h3 className="text-[20px] sm:text-[24px] font-subtitle text-text">{step.title}</h3>
                  <p className="mt-1 text-base text-text/70 font-text xl:whitespace-nowrap">{step.description}</p>
                </div>
              </div>
            ))}
            </div>
          </div>

          {/* iPhone Simulator */}
          <div className="w-full lg:w-auto flex items-center justify-center lg:justify-end order-2">
            <div className="w-full max-w-[360px]">
              <div className="text-center mb-4">
                <p className="text-sm font-medium text-text/60">
                  Prueba cómo funciona Versu
                </p>
              </div>
              
              <IPhoneFrame>
                <div className="flex flex-col h-full bg-black relative iphone-content">
                  {/* iOS Status Bar */}
                  <div className="flex items-center justify-between px-4 pt-2 pb-1 bg-accent text-white font-medium">
                    <span className="text-[13.75px] ml-2">{formatTime(currentTime)}</span>
                    <div className="flex items-center gap-1 mr-2">
                      <Signal className="h-[13.8px] w-[13.8px]" />
                      <Wifi className="h-[13.8px] w-[13.8px]" />
                      <Battery className="h-[13.8px] w-[13.8px]" />
                    </div>
                  </div>

                  {/* WhatsApp Header */}
                  <div className="flex items-center justify-between bg-accent px-3 py-2 text-white">
                    <div className="flex items-center gap-3 flex-1">
                      <ArrowLeft className="h-5 w-5" />
                      <div className="h-9 w-9 rounded-full bg-white p-1 relative overflow-hidden">
                        <img src="/foto_perfil.svg" alt="Versu AI" className="h-full w-full object-cover rounded-full" />
                      </div>
                      <div className="flex-1">
                        <p className="text-[15px] font-medium">Versu AI</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Video className="h-6 w-6" />
                      <Phone className="h-5 w-auto" />
                    </div>
                  </div>

                  {/* Chat Messages */}
                  <div 
                    className="flex-1 overflow-y-auto p-3 space-y-3 min-h-0 relative"
                    style={{
                      backgroundImage: 'url(/fondo_wpp_2.PNG)',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                    }}
                  >
                    {/* Date Bubble */}
                    <div className="flex justify-center">
                      <div className="bg-[#353535] text-white/70 px-3 py-1 rounded-lg text-[12px]">
                        {formatDate(currentTime)}
                      </div>
                    </div>

                    {messages.map((message, index) => (
                      <div
                        key={index}
                        className={`flex ${message.isUser ? "justify-end" : "justify-start"} mb-1`}
                      >
                        <div
                          className={`max-w-[80%] rounded-lg px-2 py-1.5 text-[15px] ${
                            message.isUser
                              ? "bg-[#B0A9E8] text-[#1F2C33] message-bubble-user rounded-br-sm"
                              : "bg-[#353535] text-white message-bubble-other rounded-bl-sm"
                          }`}
                          style={{
                            boxShadow: message.isUser 
                              ? '0 1px 2px rgba(0,0,0,0.1)' 
                              : '0 1px 2px rgba(0,0,0,0.2)'
                          }}
                        >
                          <div className="pr-1 pb-0.5">
                            {message.text}
                          </div>
                          <div className={`flex items-center justify-end gap-1 mt-0.5 ${message.isUser ? 'text-[#1F2C33]/70' : 'text-white/70'}`}>
                            <span className="text-[10px]">{formatTime(message.timestamp)}</span>
                            {message.isUser && (
                              <img 
                                src="/double_tick.svg" 
                                alt="read" 
                                className="h-[18px] w-auto ml-0.5"
                                style={{ 
                                  filter: 'brightness(0) saturate(100%)',
                                  opacity: 0.5
                                }}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* Form inside chat */}
                    {chatStep === "form" && (
                      <div className="mt-3 space-y-2 rounded-xl bg-[#353535] border border-text/20 p-2.5">
                        <div>
                          <label className="text-[12.5px] text-white/70 mb-1 block">
                            Tu WhatsApp
                          </label>
                          <div className="flex gap-1">
                            <select
                              value={countryCode}
                              onChange={(e) => setCountryCode(e.target.value)}
                              className="w-14 h-6 px-1 text-[11.25px] rounded border border-white/20 bg-[#353535] flex-shrink-0 text-white"
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
                              className="h-6 text-[12.5px] flex-1 min-w-0 px-1.5 rounded border border-white/20 bg-[#353535] text-white placeholder:text-white/50"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="text-[12.5px] text-white/70 mb-1 block">
                            URL de tu tienda
                          </label>
                          <input
                            placeholder="URL de tu tienda"
                            value={storeUrl}
                            onChange={(e) => setStoreUrl(e.target.value)}
                            className="h-6 text-[12.5px] w-full px-1.5 rounded border border-white/20 bg-[#353535] text-white placeholder:text-white/50"
                          />
                        </div>
                        <button
                          className="w-full h-6 text-[12.5px] rounded bg-accent text-white hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed"
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
                          className="glow-btn-whatsapp w-full h-9 gap-2 rounded-full border border-[#1DAB61] bg-transparent text-white inline-flex items-center justify-center text-[15px] transition-all"
                          onClick={openWhatsApp}
                        >
                          <img src="/whatsapp.png" alt="WhatsApp" className="h-4 w-4 object-contain" />
                          <span>Abrir WhatsApp</span>
                          <ArrowRight className="h-3 w-3" />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* WhatsApp Input Bar */}
                  {chatStep === "chat" && (
                    <div className="bg-[#353535] px-2 py-2 pb-8 flex-shrink-0">
                      <div className="flex items-center gap-2">
                        <button className="h-8 w-8 flex items-center justify-center text-white/70 flex-shrink-0">
                          <Plus className="h-5 w-5" />
                        </button>
                        <input
                          placeholder="Escribe aquí..."
                          value={inputValue}
                          onChange={(e) => setInputValue(e.target.value)}
                          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                          className="h-9 flex-1 text-[15px] px-3 rounded-full bg-white text-[#1F2C33] placeholder:text-gray-400 placeholder:italic max-w-[calc(100%-120px)]"
                        />
                        <div className="flex items-center gap-0 flex-shrink-0">
                          <button className="h-8 w-8 flex items-center justify-center text-white/70">
                            <Camera className="h-5 w-5" />
                          </button>
                          <button className="h-8 w-8 flex items-center justify-center text-white/70">
                            <Mic className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {chatStep !== "chat" && (
                    <div className="bg-[#353535] px-2 py-2 pb-8 flex-shrink-0">
                      <div className="h-9 flex items-center justify-center">
                        <p className="text-[12.5px] text-white/60">
                          {chatStep === "form" ? "Completa el formulario arriba" : "¡Listo para probar!"}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Home indicator bar */}
                  <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-2">
                    <div className="h-1 w-32 rounded-full bg-white/30"></div>
                  </div>
                </div>
              </IPhoneFrame>
            </div>
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

export default HowItWorks;
