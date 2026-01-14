import { Star } from "lucide-react";

const testimonials = [
  {
    name: "María González",
    role: "CEO, FashionMX",
    content:
      "Versu redujo nuestras consultas repetidas en un 70%. Ahora el equipo solo atiende casos complejos.",
    rating: 5,
  },
  {
    name: "Carlos Ramírez",
    role: "Head of Operations, TechStore CO",
    content:
      "La implementación fue increíblemente rápida. En una semana ya teníamos el agente respondiendo 24/7.",
    rating: 5,
  },
  {
    name: "Ana Martínez",
    role: "Fundadora, BellezaCL",
    content:
      "Recuperamos carritos abandonados que antes perdíamos. El ROI fue positivo desde el primer mes.",
    rating: 5,
  },
  {
    name: "Diego Torres",
    role: "COO, ElectroPerú",
    content:
      "El agente entiende nuestro catálogo perfectamente y deriva a humanos cuando es necesario.",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="bg-background py-8 md:py-12 lg:py-16 xl:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-20 xl:px-24">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl xl:text-6xl text-text">
            Lo que dicen nuestros clientes
          </h2>
          <p className="mt-4 text-lg lg:text-xl xl:text-2xl text-text/70">
            Tiendas en LatAm que ya transformaron su atención con Versu.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="flex h-full flex-col rounded-2xl border border-text/20 bg-background p-6 shadow-sm"
            >
              <div className="flex gap-1">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-text">
                "{testimonial.content}"
              </blockquote>
              <div className="mt-4 flex items-center gap-3 border-t border-text/20 pt-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/20 text-xs font-semibold text-accent">
                  {testimonial.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <p className="text-sm font-semibold text-text">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-text/60">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
