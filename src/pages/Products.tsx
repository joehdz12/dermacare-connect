import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Plus, Minus, X } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import productSerum from "@/assets/product-serum.jpg";
import productCream from "@/assets/product-cream.jpg";
import productSunscreen from "@/assets/product-sunscreen.jpg";
import productCleanser from "@/assets/product-cleanser.jpg";

const products = [
  {
    id: 1,
    name: "Sérum Vitamina C",
    description: "Sérum antioxidante para iluminar y proteger la piel.",
    price: 65,
    image: productSerum,
    category: "Tratamiento",
  },
  {
    id: 2,
    name: "Crema Hidratante",
    description: "Hidratación profunda con ácido hialurónico.",
    price: 48,
    image: productCream,
    category: "Hidratación",
  },
  {
    id: 3,
    name: "Protector Solar SPF 50",
    description: "Protección solar de amplio espectro, no comedogénico.",
    price: 35,
    image: productSunscreen,
    category: "Protección",
  },
  {
    id: 4,
    name: "Limpiador Facial",
    description: "Limpieza suave sin irritar, apto para pieles sensibles.",
    price: 28,
    image: productCleanser,
    category: "Limpieza",
  },
  {
    id: 5,
    name: "Crema Anti-Edad",
    description: "Fórmula avanzada con retinol para reducir líneas de expresión.",
    price: 78,
    image: productCream,
    category: "Tratamiento",
  },
  {
    id: 6,
    name: "Tónico Facial",
    description: "Equilibra el pH de la piel y prepara para la hidratación.",
    price: 32,
    image: productCleanser,
    category: "Limpieza",
  },
  {
    id: 7,
    name: "Sérum Ácido Hialurónico",
    description: "Hidratación intensa para una piel más firme y luminosa.",
    price: 55,
    image: productSerum,
    category: "Hidratación",
  },
  {
    id: 8,
    name: "Protector Solar Mineral",
    description: "Protección física con zinc, ideal para pieles sensibles.",
    price: 42,
    image: productSunscreen,
    category: "Protección",
  },
];

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const Products = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product: (typeof products)[0]) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary/5 to-background px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="container-narrow">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <span className="inline-block text-sm font-medium text-accent uppercase tracking-wider mb-2">
                  Nuestra Tienda
                </span>
                <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground">
                  Productos Dermatológicos
                </h1>
                <p className="text-muted-foreground mt-3 max-w-xl">
                  Productos recomendados por el Dr. Alvaro J. Ramos para el cuidado
                  profesional de tu piel.
                </p>
              </div>
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-3 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors self-start sm:self-center"
                aria-label="Abrir carrito"
              >
                <ShoppingCart className="w-6 h-6 text-primary" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-accent-foreground text-xs font-bold rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="container-narrow">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {products.map((product, index) => (
                <div
                  key={product.id}
                  className="group bg-card rounded-xl overflow-hidden shadow-soft card-hover animate-fade-up opacity-0"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative aspect-square overflow-hidden bg-secondary/30">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 px-2 py-1 bg-primary/90 text-primary-foreground text-xs font-medium rounded">
                      {product.category}
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-serif text-lg font-semibold text-foreground mb-1">
                      {product.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-primary">
                        ${product.price}
                      </span>
                      <Button size="sm" onClick={() => addToCart(product)}>
                        <Plus className="w-4 h-4" />
                        Agregar
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Cart Sidebar */}
        {isCartOpen && (
          <div className="fixed inset-0 z-50 flex justify-end">
            <div
              className="absolute inset-0 bg-foreground/20 backdrop-blur-sm"
              onClick={() => setIsCartOpen(false)}
            />
            <div className="relative w-full max-w-md bg-card shadow-elevated animate-fade-in">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-4 sm:p-6 border-b border-border">
                  <h3 className="font-serif text-lg sm:text-xl font-semibold">
                    Tu Carrito ({totalItems})
                  </h3>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="p-2 hover:bg-secondary rounded-lg transition-colors"
                    aria-label="Cerrar carrito"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 sm:p-6">
                  {cart.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">
                      Tu carrito está vacío
                    </p>
                  ) : (
                    <div className="space-y-4">
                      {cart.map((item) => (
                        <div
                          key={item.id}
                          className="flex gap-3 sm:gap-4 p-3 rounded-lg bg-secondary/30"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-14 h-14 sm:w-16 sm:h-16 object-cover rounded-lg"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-foreground text-sm sm:text-base truncate">
                              {item.name}
                            </h4>
                            <p className="text-sm text-primary font-semibold">
                              ${item.price}
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <button
                                onClick={() => updateQuantity(item.id, -1)}
                                className="w-6 h-6 rounded bg-secondary flex items-center justify-center hover:bg-secondary/80"
                                aria-label="Reducir cantidad"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="w-8 text-center text-sm font-medium">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, 1)}
                                className="w-6 h-6 rounded bg-secondary flex items-center justify-center hover:bg-secondary/80"
                                aria-label="Aumentar cantidad"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {cart.length > 0 && (
                  <div className="p-4 sm:p-6 border-t border-border">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-muted-foreground">Total</span>
                      <span className="text-xl sm:text-2xl font-bold text-foreground">
                        ${totalPrice.toFixed(2)}
                      </span>
                    </div>
                    <Button className="w-full" size="lg">
                      Proceder al Pago
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Products;
