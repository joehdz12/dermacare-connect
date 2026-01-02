import doctorPortrait from "@/assets/doctor-portrait.jpg";
import { Award, GraduationCap, Heart, Users } from "lucide-react";

const stats = [
  { icon: Users, value: "1,000+", label: "Pacientes Atendidos" },
  { icon: Award, value: "10+", label: "Años de Experiencia" },
  { icon: GraduationCap, value: "2", label: "Especializaciones" },
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
                alt="Dr. Alvaro J. Ramos-Rodríguez"
                className="w-full aspect-square object-cover object-top"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground rounded-xl p-6 shadow-card hidden sm:block">
              <p className="font-serif text-3xl font-semibold">10+</p>
              <p className="text-sm opacity-90">Años de experiencia</p>
            </div>
          </div>

          <div>
            <span className="inline-block text-sm font-medium text-accent uppercase tracking-wider mb-3">
              Conóceme
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-foreground mb-4">
              Dr. Alvaro J. Ramos-Rodríguez
            </h2>
            <p className="text-lg text-primary font-medium mb-4">
              Especialista en Dermatología
            </p>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Graduado con honores en 2015, cuento con más de 10 años de experiencia 
              diversa, especialmente en Dermatología y Medicina Interna. Me dedico a 
              brindar atención de la más alta calidad con un enfoque personalizado 
              para cada paciente.
            </p>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Ubicado en Mayagüez, Puerto Rico, colaboro con diversos especialistas 
              del grupo médico Puerto Rico Pathology Associates. Para más información, 
              consejos o agendar una cita, llámenos al (787) 827-9393.
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
