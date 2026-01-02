import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, ShoppingBag } from "lucide-react";
import clinicHero from "@/assets/clinic-hero.jpg";

const HeroSection = () => {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center pt-20">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src={clinicHero} 
          alt="Clínica Dermatológica" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/40" />
      </div>
      
      <div className="container-narrow section-padding relative z-10">
        <div className="max-w-2xl">
          <span className="inline-block text-sm font-medium text-accent uppercase tracking-wider mb-4 animate-fade-up">
            Dermatología Especializada
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold text-foreground leading-tight mb-6 animate-fade-up" style={{ animationDelay: "0.1s" }}>
            Tu piel merece el mejor{" "}
            <span className="text-primary">cuidado experto</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed animate-fade-up" style={{ animationDelay: "0.2s" }}>
            Bienvenido a nuestra clínica dermatológica. Ofrecemos tratamientos 
            personalizados con la tecnología más avanzada para el cuidado de tu piel.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <Button variant="hero" size="xl" asChild>
              <a href="#citas" className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Reservar Cita
              </a>
            </Button>
            <Button variant="outline-primary" size="xl" asChild>
              <Link to="/productos" className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5" />
                Ver Productos
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
