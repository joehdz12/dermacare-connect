import { useState } from "react";
import { format, addDays, isSameDay, startOfToday } from "date-fns";
import { es } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { Check, Clock, CreditCard, Calendar as CalendarIcon } from "lucide-react";

const timeSlots = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
];

const services = [
  { id: "consulta", name: "Consulta General", price: 80, duration: "30 min" },
  { id: "facial", name: "Tratamiento Facial", price: 150, duration: "60 min" },
  { id: "estetica", name: "Dermatología Estética", price: 250, duration: "45 min" },
  { id: "solar", name: "Evaluación de Lunares", price: 100, duration: "30 min" },
];

// Simulate unavailable slots
const getUnavailableSlots = (date: Date) => {
  const dayOfWeek = date.getDay();
  if (dayOfWeek === 0 || dayOfWeek === 6) return timeSlots; // Weekends closed
  if (dayOfWeek === 1) return ["09:00", "09:30", "14:00"]; // Monday busy morning
  if (dayOfWeek === 3) return ["15:00", "15:30", "16:00", "16:30"]; // Wednesday afternoon busy
  return ["10:00", "14:30"]; // Some random slots taken
};

const BookingSection = () => {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const today = startOfToday();
  const unavailableSlots = selectedDate ? getUnavailableSlots(selectedDate) : [];
  const selectedServiceData = services.find((s) => s.id === selectedService);

  const handleContinue = () => {
    if (step === 1 && selectedService) setStep(2);
    if (step === 2 && selectedDate && selectedTime) setStep(3);
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
            Reserva tu cita en línea de forma rápida y sencilla. 
            Selecciona el servicio, fecha y hora que más te convengan.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-4 mb-12">
          {[
            { num: 1, label: "Servicio" },
            { num: 2, label: "Fecha y Hora" },
            { num: 3, label: "Confirmación" },
          ].map((s, idx) => (
            <div key={s.num} className="flex items-center">
              <div
                className={cn(
                  "flex items-center justify-center w-10 h-10 rounded-full font-semibold transition-colors",
                  step >= s.num
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {step > s.num ? <Check className="w-5 h-5" /> : s.num}
              </div>
              <span
                className={cn(
                  "ml-2 text-sm font-medium hidden sm:block",
                  step >= s.num ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {s.label}
              </span>
              {idx < 2 && (
                <div
                  className={cn(
                    "w-12 sm:w-20 h-0.5 mx-2 sm:mx-4",
                    step > s.num ? "bg-primary" : "bg-muted"
                  )}
                />
              )}
            </div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Step 1: Select Service */}
          {step === 1 && (
            <div className="animate-fade-in">
              <h3 className="font-serif text-xl font-semibold text-foreground mb-6 text-center">
                Selecciona un Servicio
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {services.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => setSelectedService(service.id)}
                    className={cn(
                      "p-6 rounded-xl text-left transition-all duration-200 border-2",
                      selectedService === service.id
                        ? "border-primary bg-primary/5 shadow-card"
                        : "border-border bg-card hover:border-primary/50 hover:shadow-soft"
                    )}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-serif text-lg font-semibold text-foreground mb-1">
                          {service.name}
                        </h4>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {service.duration}
                        </p>
                      </div>
                      <span className="text-xl font-bold text-primary">
                        ${service.price}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
              <div className="mt-8 flex justify-center">
                <Button
                  size="lg"
                  onClick={handleContinue}
                  disabled={!selectedService}
                >
                  Continuar
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Select Date & Time */}
          {step === 2 && (
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
              <div className="mt-8 flex justify-center gap-4">
                <Button variant="outline" size="lg" onClick={handleBack}>
                  Atrás
                </Button>
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

          {/* Step 3: Confirmation */}
          {step === 3 && selectedDate && selectedServiceData && (
            <div className="animate-fade-in max-w-xl mx-auto">
              <div className="bg-card rounded-xl p-8 shadow-card">
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
                    <span className="text-muted-foreground">Servicio</span>
                    <span className="font-medium text-foreground">
                      {selectedServiceData.name}
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
                  <div className="flex justify-between py-3 border-b border-border">
                    <span className="text-muted-foreground">Duración</span>
                    <span className="font-medium text-foreground">
                      {selectedServiceData.duration}
                    </span>
                  </div>
                  <div className="flex justify-between py-3">
                    <span className="text-lg font-medium text-foreground">
                      Total a Pagar
                    </span>
                    <span className="text-2xl font-bold text-primary">
                      ${selectedServiceData.price}
                    </span>
                  </div>
                </div>

                <Button className="w-full" size="lg">
                  <CreditCard className="w-5 h-5 mr-2" />
                  Pagar y Confirmar
                </Button>

                <p className="text-xs text-muted-foreground text-center mt-4">
                  Al confirmar, aceptas nuestros términos y condiciones de servicio.
                </p>
              </div>

              <div className="mt-6 flex justify-center">
                <Button variant="outline" onClick={handleBack}>
                  Modificar Reserva
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default BookingSection;
