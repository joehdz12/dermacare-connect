import doctorPortrait from "@/assets/doctor-portrait.jpg";
import { Award, GraduationCap, Heart, Users } from "lucide-react";

const stats = [
  { icon: Users, value: "5,000+", label: "Pacientes Atendidos" },
  { icon: Award, value: "15+", label: "Años de Experiencia" },
  { icon: GraduationCap, value: "3", label: "Especializaciones" },
  { icon: Heart, value: "98%", label: "Satisfacción" },
];

const AboutSection = () => {
  return (
    <section className="section-padding">
      <div className="container-narrow">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-elevated">
              <img
                src={doctorPortrait}
                alt="Dra. María Martínez"
                className="w-full aspect-square object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground rounded-xl p-6 shadow-card hidden sm:block">
              <p className="font-serif text-3xl font-semibold">15+</p>
              <p className="text-sm opacity-90">Años de experiencia</p>
            </div>
          </div>

          <div>
            <span className="inline-block text-sm font-medium text-accent uppercase tracking-wider mb-3">
              Conóceme
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-foreground mb-4">
              Dra. María Martínez
            </h2>
            <p className="text-lg text-primary font-medium mb-4">
              Dermatóloga Certificada
            </p>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Con más de 15 años de experiencia en dermatología clínica y estética, 
              me dedico a brindar atención de la más alta calidad. Mi enfoque 
              combina las técnicas más avanzadas con un trato cálido y personalizado 
              para cada paciente.
            </p>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Especializada en tratamientos anti-envejecimiento, acné severo y 
              detección temprana del cáncer de piel. Mi objetivo es ayudarte a 
              sentirte bien en tu propia piel.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat) => (
                <div key={stat.label} className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                  <stat.icon className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-semibold text-foreground">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
