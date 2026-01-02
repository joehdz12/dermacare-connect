import { useState } from "react";
import { format, addDays, startOfToday } from "date-fns";
import { es } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Check, Clock, CreditCard, Calendar as CalendarIcon, User, Phone } from "lucide-react";

const timeSlots = [
  "9:00 AM",
  "9:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "2:00 PM",
  "2:30 PM",
  "3:00 PM",
  "3:30 PM",
  "4:00 PM",
  "4:30 PM",
];

const APPOINTMENT_PRICE = 25;

const getUnavailableSlots = (date: Date) => {
  const dayOfWeek = date.getDay();
  if (dayOfWeek === 0 || dayOfWeek === 6) return timeSlots;
  if (dayOfWeek === 1) return ["9:00 AM", "9:30 AM", "2:00 PM"];
  if (dayOfWeek === 3) return ["3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM"];
  return ["10:00 AM", "2:30 PM"];
};

const BookingSection = () => {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errors, setErrors] = useState<{ fullName?: string; phoneNumber?: string }>({});

  const today = startOfToday();
  const unavailableSlots = selectedDate ? getUnavailableSlots(selectedDate) : [];

  const validateStep2 = () => {
    const newErrors: { fullName?: string; phoneNumber?: string } = {};

    if (!fullName.trim()) {
      newErrors.fullName = "El nombre completo es requerido";
    } else if (fullName.trim().split(" ").length < 2) {
      newErrors.fullName = "Ingresa tu nombre y apellido";
    }

    if (!phoneNumber.trim()) {
      newErrors.phoneNumber = "El número de teléfono es requerido";
    } else if (!/^[\d\s\-+()]{10,}$/.test(phoneNumber.trim())) {
      newErrors.phoneNumber = "Ingresa un número de teléfono válido";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (step === 1 && selectedDate && selectedTime) setStep(2);
    if (step === 2 && validateStep2()) setStep(3);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <section id="citas" className="section-padding bg-secondary/30">
      <div className="container-narrow">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block text-sm font-medium text-accent uppercase tracking-wider mb-3">
            Reserva Online
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-foreground mb-4">
            Agenda tu Cita
          </h2>
          <p className="text-muted-foreground">
            Reserva tu cita en línea de forma rápida y sencilla por solo{" "}
            <span className="font-semibold text-primary">${APPOINTMENT_PRICE}</span>.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 mb-12">
          {[
            { num: 1, label: "Fecha y Hora" },
            { num: 2, label: "Datos" },
            { num: 3, label: "Confirmación" },
          ].map((s, idx) => (
            <div key={s.num} className="flex items-center">
              <div
                className={cn(
                  "flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full font-semibold transition-colors text-sm sm:text-base",
                  step >= s.num
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {step > s.num ? <Check className="w-4 h-4 sm:w-5 sm:h-5" /> : s.num}
              </div>
              <span
                className={cn(
                  "ml-1 sm:ml-2 text-xs sm:text-sm font-medium hidden sm:block",
                  step >= s.num ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {s.label}
              </span>
              {idx < 2 && (
                <div
                  className={cn(
                    "w-8 sm:w-16 h-0.5 mx-1 sm:mx-3",
                    step > s.num ? "bg-primary" : "bg-muted"
                  )}
                />
              )}
            </div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Step 1: Select Date & Time */}
          {step === 1 && (
            <div className="animate-fade-in">
              <h3 className="font-serif text-xl font-semibold text-foreground mb-6 text-center">
                Selecciona Fecha y Hora
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-card rounded-xl p-6 shadow-soft">
                  <h4 className="font-medium text-foreground mb-4 flex items-center gap-2">
                    <CalendarIcon className="w-5 h-5 text-primary" />
                    Fecha
                  </h4>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={(date) =>
                      date < today ||
                      date > addDays(today, 30) ||
                      date.getDay() === 0 ||
                      date.getDay() === 6
                    }
                    className="rounded-md border pointer-events-auto"
                  />
                </div>

                <div className="bg-card rounded-xl p-6 shadow-soft">
                  <h4 className="font-medium text-foreground mb-4 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-primary" />
                    Hora Disponible
                  </h4>
                  {selectedDate ? (
                    <div className="grid grid-cols-3 gap-2">
                      {timeSlots.map((time) => {
                        const isUnavailable = unavailableSlots.includes(time);
                        return (
                          <button
                            key={time}
                            onClick={() =>
                              !isUnavailable && setSelectedTime(time)
                            }
                            disabled={isUnavailable}
                            className={cn(
                              "py-3 px-4 rounded-lg text-sm font-medium transition-all",
                              isUnavailable
                                ? "bg-muted text-muted-foreground cursor-not-allowed line-through"
                                : selectedTime === time
                                ? "bg-primary text-primary-foreground shadow-soft"
                                : "bg-secondary hover:bg-secondary/80 text-foreground"
                            )}
                          >
                            {time}
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-center text-muted-foreground py-8">
                      Selecciona una fecha primero
                    </p>
                  )}
                </div>
              </div>
              <div className="mt-8 flex justify-center">
                <Button
                  size="lg"
                  onClick={handleContinue}
                  disabled={!selectedDate || !selectedTime}
                >
                  Continuar
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Personal Data */}
          {step === 2 && (
            <div className="animate-fade-in max-w-xl mx-auto">
              <div className="bg-card rounded-xl p-6 sm:p-8 shadow-soft">
                <h3 className="font-serif text-xl font-semibold text-foreground mb-6 text-center">
                  Datos del Paciente
                </h3>
                <div className="space-y-6">
                  <div className="space-y-3">
                    <Label htmlFor="fullName" className="flex items-center gap-2 text-base font-medium text-foreground">
                      <User className="w-5 h-5 text-primary" />
                      Nombre Completo
                    </Label>
                    <Input
                      id="fullName"
                      type="text"
                      placeholder="Ej: Juan Pérez García"
                      value={fullName}
                      onChange={(e) => {
                        setFullName(e.target.value);
                        if (errors.fullName) setErrors({ ...errors, fullName: undefined });
                      }}
                      className={cn(
                        "h-12 text-base px-4",
                        errors.fullName && "border-destructive"
                      )}
                    />
                    {errors.fullName && (
                      <p className="text-sm text-destructive">{errors.fullName}</p>
                    )}
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="phoneNumber" className="flex items-center gap-2 text-base font-medium text-foreground">
                      <Phone className="w-5 h-5 text-primary" />
                      Número de Teléfono
                    </Label>
                    <Input
                      id="phoneNumber"
                      type="tel"
                      placeholder="Ej: +1 234 567 8900"
                      value={phoneNumber}
                      onChange={(e) => {
                        setPhoneNumber(e.target.value);
                        if (errors.phoneNumber) setErrors({ ...errors, phoneNumber: undefined });
                      }}
                      className={cn(
                        "h-12 text-base px-4",
                        errors.phoneNumber && "border-destructive"
                      )}
                    />
                    {errors.phoneNumber && (
                      <p className="text-sm text-destructive">{errors.phoneNumber}</p>
                    )}
                  </div>
                </div>
              </div>
              <div className="mt-8 flex justify-center gap-4">
                <Button variant="outline" size="lg" onClick={handleBack}>
                  Atrás
                </Button>
                <Button size="lg" onClick={handleContinue}>
                  Continuar
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Confirmation */}
          {step === 3 && selectedDate && (
            <div className="animate-fade-in max-w-xl mx-auto">
              <div className="bg-card rounded-xl p-6 sm:p-8 shadow-card">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-serif text-2xl font-semibold text-foreground">
                    Confirma tu Reserva
                  </h3>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex justify-between py-3 border-b border-border">
                    <span className="text-muted-foreground">Nombre</span>
                    <span className="font-medium text-foreground">
                      {fullName}
                    </span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-border">
                    <span className="text-muted-foreground">Teléfono</span>
                    <span className="font-medium text-foreground">
                      {phoneNumber}
                    </span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-border">
                    <span className="text-muted-foreground">Cita</span>
                    <span className="font-medium text-foreground">
                      Consulta Dermatológica
                    </span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-border">
                    <span className="text-muted-foreground">Fecha</span>
                    <span className="font-medium text-foreground">
                      {format(selectedDate, "EEEE, d 'de' MMMM", { locale: es })}
                    </span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-border">
                    <span className="text-muted-foreground">Hora</span>
                    <span className="font-medium text-foreground">
                      {selectedTime}
                    </span>
                  </div>
                  <div className="flex justify-between py-3">
                    <span className="text-lg font-medium text-foreground">
                      Total a Pagar
                    </span>
                    <span className="text-2xl font-bold text-primary">
                      ${APPOINTMENT_PRICE}
                    </span>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button variant="outline" size="lg" onClick={handleBack}>
                    Atrás
                  </Button>
                  <Button className="flex-1" size="lg">
                    <CreditCard className="w-5 h-5 mr-2" />
                    Pagar y Confirmar
                  </Button>
                </div>

                <p className="text-xs text-muted-foreground text-center mt-4">
                  Al confirmar, aceptas nuestros términos y condiciones de servicio.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default BookingSection;
