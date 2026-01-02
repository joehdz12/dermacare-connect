# DermaCare Connect - Guía de Inicialización del Proyecto

## Tabla de Contenidos

1. [Descripción General](#descripción-general)
2. [Stack Tecnológico](#stack-tecnológico)
3. [Estructura del Proyecto](#estructura-del-proyecto)
4. [Sistema de Diseño](#sistema-de-diseño)
5. [Paleta de Colores](#paleta-de-colores)
6. [Tipografía](#tipografía)
7. [Responsive Design (Mobile-First)](#responsive-design-mobile-first)
8. [Componentes UI](#componentes-ui)
9. [Mejores Prácticas de React](#mejores-prácticas-de-react)
10. [Patrones de Código](#patrones-de-código)
11. [Comandos de Desarrollo](#comandos-de-desarrollo)

---

## Descripción General

DermaCare Connect es una aplicación web para una clínica dermatológica que permite a los usuarios:
- Ver información sobre servicios médicos
- Agendar citas
- Explorar productos de la tienda
- Conocer al doctor y la clínica

**Prioridad:** La aplicación está diseñada con enfoque **mobile-first** ya que la mayoría de usuarios accederán desde dispositivos móviles.

---

## Stack Tecnológico

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| React | 18.3.1 | Framework UI |
| TypeScript | 5.6.2 | Tipado estático |
| Vite | 5.4.19 | Build tool y dev server |
| Tailwind CSS | 3.4.17 | Utilidades CSS |
| shadcn/ui | - | Componentes UI |
| React Router DOM | 6.30.1 | Enrutamiento |
| Lucide React | - | Iconografía |
| date-fns | - | Manejo de fechas |

---

## Estructura del Proyecto

```
dermacare-connect/
├── public/                     # Archivos estáticos
├── src/
│   ├── assets/                 # Imágenes y recursos
│   │   ├── clinic-hero.jpg
│   │   ├── doctor-portrait.jpg
│   │   └── product-*.jpg
│   ├── components/
│   │   ├── ui/                 # Componentes shadcn/ui (48 componentes)
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   └── ...
│   │   ├── AboutSection.tsx    # Sección "Sobre el Doctor"
│   │   ├── BookingSection.tsx  # Sistema de reservas
│   │   ├── Footer.tsx          # Pie de página
│   │   ├── Header.tsx          # Navegación principal
│   │   ├── HeroSection.tsx     # Sección hero
│   │   ├── ProductsSection.tsx # Tienda de productos
│   │   └── ServicesSection.tsx # Servicios médicos
│   ├── hooks/                  # Custom hooks
│   ├── lib/
│   │   └── utils.ts            # Función cn() para clases
│   ├── pages/
│   │   ├── Index.tsx           # Página principal
│   │   └── NotFound.tsx        # Página 404
│   ├── App.tsx                 # Componente raíz
│   ├── App.css                 # Estilos legacy
│   └── index.css               # Estilos globales y variables CSS
├── tailwind.config.ts          # Configuración Tailwind
├── components.json             # Configuración shadcn/ui
├── tsconfig.json               # Configuración TypeScript
└── package.json
```

---

## Sistema de Diseño

### Variables CSS Principales

Todas las variables están definidas en `src/index.css` usando formato HSL sin el prefijo `hsl()`:

```css
/* Uso correcto */
background-color: hsl(var(--primary));
color: hsl(var(--foreground));
```

### Clases Utilitarias Personalizadas

```css
/* Padding de secciones responsive */
.section-padding {
  @apply px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24;
}

/* Contenedor con ancho máximo */
.container-narrow {
  @apply max-w-6xl mx-auto;
}

/* Texto con gradiente */
.text-gradient {
  @apply bg-clip-text text-transparent;
  background-image: var(--gradient-accent);
}

/* Efecto hover en tarjetas */
.card-hover {
  @apply transition-all duration-300 ease-out;
}
.card-hover:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-elevated);
}
```

---

## Paleta de Colores

### Modo Claro (Light Mode)

| Variable | HSL | Descripción | Uso |
|----------|-----|-------------|-----|
| `--background` | `30 33% 98%` | Beige muy claro | Fondo principal |
| `--foreground` | `220 20% 15%` | Azul oscuro | Texto principal |
| `--primary` | `173 40% 35%` | Verde azulado | Botones, enlaces, elementos destacados |
| `--primary-foreground` | `0 0% 100%` | Blanco | Texto sobre primary |
| `--secondary` | `30 30% 95%` | Beige claro | Fondos secundarios |
| `--accent` | `15 80% 65%` | Coral/Salmón | Elementos de acento, CTAs |
| `--muted` | `30 20% 93%` | Gris beige | Fondos suaves |
| `--muted-foreground` | `220 10% 45%` | Gris medio | Texto secundario |
| `--destructive` | `0 84.2% 60.2%` | Rojo | Errores, alertas |
| `--border` | `30 20% 88%` | Beige claro | Bordes |
| `--ring` | `173 40% 35%` | Verde azulado | Focus rings |

### Modo Oscuro (Dark Mode)

| Variable | HSL | Descripción |
|----------|-----|-------------|
| `--background` | `220 20% 10%` | Azul muy oscuro |
| `--foreground` | `30 20% 95%` | Beige muy claro |
| `--primary` | `173 45% 45%` | Verde azulado más claro |
| `--accent` | `15 75% 55%` | Coral más oscuro |
| `--muted` | `220 15% 20%` | Azul gris |
| `--border` | `220 15% 22%` | Azul gris oscuro |

### Gradientes

```css
/* Hero gradient */
--gradient-hero: linear-gradient(135deg,
  hsl(173 40% 35% / 0.08) 0%,
  hsl(30 33% 98%) 50%,
  hsl(15 80% 65% / 0.05) 100%
);

/* Card gradient */
--gradient-card: linear-gradient(180deg,
  hsl(0 0% 100%) 0%,
  hsl(30 30% 98%) 100%
);

/* Accent gradient (para texto/botones) */
--gradient-accent: linear-gradient(135deg,
  hsl(173 40% 35%) 0%,
  hsl(173 50% 28%) 100%
);
```

### Sombras

```css
--shadow-soft: 0 4px 20px -4px hsl(220 20% 15% / 0.08);
--shadow-card: 0 8px 32px -8px hsl(220 20% 15% / 0.1);
--shadow-elevated: 0 16px 48px -12px hsl(220 20% 15% / 0.15);
```

### Uso en Tailwind

```tsx
// Colores
<div className="bg-primary text-primary-foreground" />
<div className="bg-accent text-accent-foreground" />
<div className="text-muted-foreground" />

// Sombras personalizadas
<div className="shadow-soft" />
<div className="shadow-card" />
<div className="shadow-elevated" />
```

---

## Tipografía

### Fuentes

| Fuente | Tipo | Uso |
|--------|------|-----|
| Cormorant Garamond | Serif | Títulos (h1-h6) |
| Inter | Sans-serif | Texto general, UI |

### Clases Tailwind

```tsx
// Títulos (automáticamente usan serif)
<h1 className="font-serif text-4xl font-semibold tracking-tight">
  Título Principal
</h1>

// Texto general (automáticamente usa sans)
<p className="font-sans text-base">
  Contenido del párrafo
</p>

// Forzar fuente específica
<span className="font-serif">Texto con serif</span>
<span className="font-sans">Texto con sans</span>
```

### Escalas Tipográficas Recomendadas

```tsx
// Títulos principales
<h1 className="text-3xl sm:text-4xl lg:text-5xl" />

// Subtítulos de sección
<h2 className="text-2xl sm:text-3xl lg:text-4xl" />

// Títulos de tarjetas
<h3 className="text-lg sm:text-xl" />

// Texto de cuerpo
<p className="text-sm sm:text-base" />

// Texto pequeño/labels
<span className="text-xs sm:text-sm" />
```

---

## Responsive Design (Mobile-First)

### Principio Fundamental

**Diseñar primero para móvil, luego escalar hacia arriba.**

```tsx
// CORRECTO: Mobile-first
<div className="text-sm sm:text-base lg:text-lg">

// INCORRECTO: Desktop-first
<div className="text-lg sm:text-base lg:text-sm">
```

### Breakpoints de Tailwind

| Breakpoint | Mínimo | Dispositivo |
|------------|--------|-------------|
| (default) | 0px | Móviles |
| `sm` | 640px | Móviles grandes / Tablets pequeñas |
| `md` | 768px | Tablets |
| `lg` | 1024px | Laptops |
| `xl` | 1280px | Desktops |
| `2xl` | 1536px | Pantallas grandes |

### Patrones Responsive Comunes

#### Grid Responsive

```tsx
// 1 columna móvil → 2 tablet → 3 desktop
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
  {items.map(item => <Card key={item.id} />)}
</div>
```

#### Flexbox Responsive

```tsx
// Stack vertical en móvil → horizontal en desktop
<div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
  <div className="w-full lg:w-1/2">Contenido 1</div>
  <div className="w-full lg:w-1/2">Contenido 2</div>
</div>
```

#### Padding/Margin Responsive

```tsx
// Spacing que escala con el viewport
<section className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
  {/* Contenido */}
</section>
```

#### Ocultar/Mostrar Elementos

```tsx
// Solo visible en desktop
<div className="hidden lg:block">Solo desktop</div>

// Solo visible en móvil
<div className="block lg:hidden">Solo móvil</div>
```

#### Navegación Mobile-First

```tsx
// Header con menú hamburguesa en móvil
<header>
  {/* Logo siempre visible */}
  <Logo />

  {/* Menú hamburguesa solo en móvil */}
  <button className="lg:hidden">
    <MenuIcon />
  </button>

  {/* Nav links solo en desktop */}
  <nav className="hidden lg:flex">
    <NavLink href="/servicios">Servicios</NavLink>
  </nav>
</header>
```

### Patrón de Sección Estándar

```tsx
const Section: FC<SectionProps> = ({ children, id, className }) => (
  <section
    id={id}
    className={cn(
      "section-padding", // px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24
      className
    )}
  >
    <div className="container-narrow"> {/* max-w-6xl mx-auto */}
      {children}
    </div>
  </section>
);
```

### Patrón de Header de Sección

```tsx
const SectionHeader: FC<HeaderProps> = ({ tag, title, description }) => (
  <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12 lg:mb-16">
    {tag && (
      <span className="inline-block text-xs sm:text-sm font-medium text-accent uppercase tracking-wider mb-2 sm:mb-3">
        {tag}
      </span>
    )}
    <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-semibold text-foreground mb-3 sm:mb-4">
      {title}
    </h2>
    {description && (
      <p className="text-sm sm:text-base text-muted-foreground">
        {description}
      </p>
    )}
  </div>
);
```

---

## Componentes UI

### Componentes shadcn/ui Disponibles (48)

El proyecto incluye la biblioteca completa de shadcn/ui:

- **Navegación:** Accordion, Breadcrumb, Command, ContextMenu, DropdownMenu, Menubar, NavigationMenu, Pagination, Tabs
- **Formularios:** Button, Checkbox, Form, Input, InputOTP, Label, RadioGroup, Select, Slider, Switch, Textarea
- **Feedback:** Alert, AlertDialog, Dialog, Drawer, Popover, Sheet, Sonner, Toast, Toaster, Tooltip
- **Data Display:** Avatar, Badge, Card, Carousel, Chart, HoverCard, Progress, Separator, Skeleton, Table
- **Layout:** AspectRatio, Collapsible, Resizable, ScrollArea, Sidebar

### Variantes de Button Personalizadas

```tsx
import { Button } from "@/components/ui/button";

// Variantes disponibles
<Button variant="default">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="hero">Hero CTA</Button>
<Button variant="accent">Accent</Button>
<Button variant="outline-primary">Outline Primary</Button>

// Tamaños
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="xl">Extra Large</Button>
<Button size="icon"><Icon /></Button>
```

### Función Utilitaria cn()

```tsx
import { cn } from "@/lib/utils";

// Combina clases condicionalmente
<div className={cn(
  "base-classes",
  isActive && "active-classes",
  variant === "primary" && "primary-classes"
)}>
```

---

## Mejores Prácticas de React

### 1. Estructura de Componentes

```tsx
// src/components/MyComponent.tsx
import { FC } from 'react';
import { cn } from '@/lib/utils';

interface MyComponentProps {
  title: string;
  className?: string;
  children?: React.ReactNode;
}

export const MyComponent: FC<MyComponentProps> = ({
  title,
  className,
  children
}) => {
  return (
    <div className={cn("base-styles", className)}>
      <h2 className="font-serif text-2xl">{title}</h2>
      {children}
    </div>
  );
};
```

### 2. Hooks Personalizados

```tsx
// src/hooks/useMediaQuery.ts
import { useState, useEffect } from 'react';

export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    setMatches(media.matches);

    const listener = (e: MediaQueryListEvent) => setMatches(e.matches);
    media.addEventListener('change', listener);

    return () => media.removeEventListener('change', listener);
  }, [query]);

  return matches;
};

// Uso
const isMobile = useMediaQuery('(max-width: 768px)');
```

### 3. Lazy Loading de Componentes

```tsx
import { lazy, Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const HeavyComponent = lazy(() => import('./HeavyComponent'));

export const Page = () => (
  <Suspense fallback={<Skeleton className="h-96 w-full" />}>
    <HeavyComponent />
  </Suspense>
);
```

### 4. Manejo de Estado

```tsx
// Preferir useState para estado local simple
const [isOpen, setIsOpen] = useState(false);

// Usar useReducer para estado complejo
const [state, dispatch] = useReducer(reducer, initialState);

// Evitar prop drilling excesivo - usar Context cuando sea necesario
```

### 5. Optimización de Renders

```tsx
import { memo, useCallback, useMemo } from 'react';

// Memoizar componentes costosos
export const ExpensiveList = memo(({ items }: Props) => (
  // ...
));

// Memoizar callbacks
const handleClick = useCallback(() => {
  // ...
}, [dependencies]);

// Memoizar cálculos costosos
const sortedItems = useMemo(() =>
  items.sort((a, b) => a.name.localeCompare(b.name)),
  [items]
);
```

### 6. Accesibilidad (a11y)

```tsx
// Siempre incluir atributos de accesibilidad
<button
  aria-label="Cerrar menú"
  aria-expanded={isOpen}
  onClick={handleClose}
>
  <XIcon aria-hidden="true" />
</button>

// Usar elementos semánticos
<nav aria-label="Navegación principal">
  <ul>
    <li><a href="/servicios">Servicios</a></li>
  </ul>
</nav>

// Labels en formularios
<label htmlFor="email">Email</label>
<input id="email" type="email" />
```

---

## Patrones de Código

### Patrón de Card Responsive

```tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export const ServiceCard: FC<ServiceCardProps> = ({ icon, title, description }) => (
  <Card className="card-hover bg-card border-border/50">
    <CardHeader className="pb-2 sm:pb-4">
      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-3 sm:mb-4">
        {icon}
      </div>
      <CardTitle className="font-serif text-lg sm:text-xl">
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-sm sm:text-base text-muted-foreground">
        {description}
      </p>
    </CardContent>
  </Card>
);
```

### Patrón de Grid de Productos

```tsx
export const ProductsGrid: FC<{ products: Product[] }> = ({ products }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
    {products.map((product) => (
      <ProductCard key={product.id} product={product} />
    ))}
  </div>
);
```

### Patrón de Animación de Entrada

```tsx
// Usar delays escalonados para animaciones de lista
{items.map((item, index) => (
  <div
    key={item.id}
    className="animate-fade-up opacity-0"
    style={{ animationDelay: `${index * 100}ms` }}
  >
    <ItemCard item={item} />
  </div>
))}
```

### Patrón de CTA Section

```tsx
export const CTASection: FC = () => (
  <section className="section-padding bg-primary text-primary-foreground">
    <div className="container-narrow text-center">
      <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-semibold mb-4 sm:mb-6">
        ¿Listo para comenzar?
      </h2>
      <p className="text-base sm:text-lg opacity-90 mb-6 sm:mb-8 max-w-2xl mx-auto">
        Agenda tu cita hoy y comienza tu camino hacia una piel saludable.
      </p>
      <Button
        variant="accent"
        size="lg"
        className="w-full sm:w-auto"
      >
        Agendar Cita
      </Button>
    </div>
  </section>
);
```

---

## Comandos de Desarrollo

```bash
# Instalar dependencias
npm install

# Servidor de desarrollo
npm run dev

# Build de producción
npm run build

# Preview del build
npm run preview

# Linting
npm run lint

# Agregar componente shadcn/ui
npx shadcn-ui@latest add [component-name]
```

---

## Checklist de Nuevo Componente

- [ ] Usar TypeScript con interfaces/types definidos
- [ ] Implementar props `className` para customización
- [ ] Usar la función `cn()` para combinar clases
- [ ] Diseñar mobile-first (estilos base para móvil)
- [ ] Agregar breakpoints responsive (`sm:`, `md:`, `lg:`)
- [ ] Usar variables de color del tema (`text-primary`, `bg-accent`)
- [ ] Incluir atributos de accesibilidad
- [ ] Usar fuentes correctas (`font-serif` para títulos)
- [ ] Aplicar animaciones consistentes (`animate-fade-up`, `card-hover`)
- [ ] Probar en múltiples tamaños de pantalla

---

## Checklist de Nueva Sección

- [ ] Usar clase `section-padding` para spacing
- [ ] Usar clase `container-narrow` para contenedor
- [ ] Incluir header de sección con tag, título y descripción
- [ ] Implementar grid/flex responsive
- [ ] Mantener consistencia visual con otras secciones
- [ ] Agregar `id` para navegación anchor
- [ ] Verificar en móvil, tablet y desktop

---

## Recursos Adicionales

- [Documentación Tailwind CSS](https://tailwindcss.com/docs)
- [Componentes shadcn/ui](https://ui.shadcn.com)
- [Iconos Lucide](https://lucide.dev/icons)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app)

---

*Última actualización: Enero 2026*
