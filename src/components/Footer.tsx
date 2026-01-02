import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Clock, Instagram, Facebook } from "lucide-react";

const footerLinks = [
  { name: "Inicio", href: "/#inicio", isRoute: false },
  { name: "Servicios", href: "/#servicios", isRoute: false },
  { name: "Productos", href: "/productos", isRoute: true },
  { name: "Reservar Cita", href: "/#citas", isRoute: false },
  { name: "Contacto", href: "/#contacto", isRoute: false },
];

const Footer = () => {
  return (
    <footer id="contacto" className="section-padding bg-foreground text-background">
      <div className="container-narrow">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <h3 className="font-serif text-2xl font-semibold mb-4">
              Dr. Alvaro J. <span className="text-primary">Ramos</span>
            </h3>
            <p className="text-background/70 mb-6">
              Clínica de dermatología especializada en el cuidado integral de tu piel con tecnología de vanguardia.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Contacto</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-background/70">
                <MapPin className="w-5 h-5 mt-0.5 text-primary" />
                <span>Av. Principal 123, Torre Médica, Piso 5, Ciudad</span>
              </li>
              <li className="flex items-center gap-3 text-background/70">
                <Phone className="w-5 h-5 text-primary" />
                <a href="tel:+1234567890" className="hover:text-primary transition-colors">
                  +1 234 567 890
                </a>
              </li>
              <li className="flex items-center gap-3 text-background/70">
                <Mail className="w-5 h-5 text-primary" />
                <a href="mailto:info@drramos.com" className="hover:text-primary transition-colors">
                  info@drramos.com
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Horario</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-background/70">
                <Clock className="w-5 h-5 mt-0.5 text-primary" />
                <div>
                  <p className="font-medium text-background">Lunes - Viernes</p>
                  <p>9:00 AM - 6:00 PM</p>
                </div>
              </li>
              <li className="flex items-start gap-3 text-background/70">
                <Clock className="w-5 h-5 mt-0.5 text-primary" />
                <div>
                  <p className="font-medium text-background">Sábados</p>
                  <p>Solo con cita previa</p>
                </div>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  {link.isRoute ? (
                    <Link
                      to={link.href}
                      className="text-background/70 hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      className="text-background/70 hover:text-primary transition-colors"
                    >
                      {link.name}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-background/10 text-center text-background/50 text-sm">
          <p>© {new Date().getFullYear()} Dr. Alvaro J. Ramos - Dermatología. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
