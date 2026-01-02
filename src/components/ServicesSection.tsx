import { Sparkles, Stethoscope, Syringe, Sun } from "lucide-react";

const services = [
  {
    icon: Stethoscope,
    title: "Consulta General",
    description: "Evaluación completa de la piel para detectar y tratar diversas condiciones dermatológicas.",
    price: "$80",
  },
  {
    icon: Sparkles,
    title: "Tratamientos Faciales",
    description: "Procedimientos estéticos para rejuvenecer y mejorar la apariencia de tu piel.",
    price: "$150",
  },
  {
    icon: Syringe,
    title: "Dermatología Estética",
    description: "Botox, rellenos y otros tratamientos para realzar tu belleza natural.",
    price: "$250",
  },
  {
    icon: Sun,
    title: "Cuidado Solar",
    description: "Evaluación de lunares, tratamiento de daño solar y prevención del cáncer de piel.",
    price: "$100",
  },
];

const ServicesSection = () => {
  return (
    <section id="servicios" className="section-padding bg-secondary/30">
      <div className="container-narrow">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block text-sm font-medium text-accent uppercase tracking-wider mb-3">
            Nuestros Servicios
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-foreground mb-4">
            Tratamientos Especializados
          </h2>
          <p className="text-muted-foreground">
            Ofrecemos una amplia gama de servicios dermatológicos con los más altos 
            estándares de calidad y atención personalizada.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="bg-card rounded-xl p-6 shadow-soft card-hover"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <service.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
                {service.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {service.description}
              </p>
              <span className="text-lg font-semibold text-primary">
                Desde {service.price}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
