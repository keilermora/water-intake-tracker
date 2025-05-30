# 💧 Water Intake Tracker

Una aplicación web moderna y gamificada para el seguimiento de hidratación diaria con sistema de logros, temas personalizables y funcionalidades sociales.

![Water Intake Tracker](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?style=for-the-badge&logo=tailwind-css)

## ✨ Características Principales

### 🎯 Seguimiento de Hidratación
- **Contador de vasos diario** con metas personalizables
- **Tamaños de vaso configurables** (200ml - 1000ml)
- **Progreso visual** con barras de progreso y animaciones
- **Historial completo** con calendario interactivo
- **Estadísticas detalladas** de consumo en ml

### 🎮 Sistema de Gamificación
- **Sistema de niveles y XP** basado en progreso real
- **Rachas de hidratación** para mantener la motivación
- **Logros y badges** desbloqueables por diferentes metas
- **Títulos especiales** como "Maestro Hidro" y "Leyenda Acuática"
- **Sistema de loot** con recompensas sorpresa

### 🏆 Funcionalidades Sociales
- **Ranking semanal** competitivo
- **Sistema de equipos** (Océano Azul vs Río Verde)
- **Leaderboard dinámico** con puntuaciones
- **Comparación de estadísticas** entre usuarios

### 🎨 Personalización Avanzada
- **Modo claro/oscuro/sistema** automático
- **6 temas únicos** desbloqueables:
  - 🎨 Predeterminado
  - 🌊 Océano
  - 🌲 Bosque
  - 🌅 Atardecer
  - 🌙 Medianoche
  - 🌌 Aurora
- **Temas como recompensas** del sistema de gamificación

### 🌍 Internacionalización
- **Soporte multiidioma** (Español/Inglés)
- **Detección automática** del idioma del navegador
- **Traducciones completas** de toda la interfaz

## 🚀 Instalación y Configuración

### Prerrequisitos

Asegúrate de tener instalado:
- **Node.js** 18.0 o superior
- **npm** o **yarn** como gestor de paquetes

### Instalación Local

1. **Clona el repositorio**
   ```bash
   git clone https://github.com/tu-usuario/water-intake-tracker.git
   cd water-intake-tracker
   ```

2. **Instala las dependencias**
   ```bash
   npm install
   # o
   yarn install
   ```

3. **Inicia el servidor de desarrollo**
   ```bash
   npm run dev
   # o
   yarn dev
   ```

4. **Abre tu navegador**
   
   Visita [http://localhost:3000](http://localhost:3000) para ver la aplicación.

### Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Inicia el servidor de desarrollo
npm run build        # Construye la aplicación para producción
npm run start        # Inicia el servidor de producción
npm run lint         # Ejecuta el linter
npm run type-check   # Verifica los tipos de TypeScript
```

## 🏗️ Estructura del Proyecto

```
water-intake-tracker/
├── app/
│   ├── globals.css          # Estilos globales y variables CSS
│   ├── layout.tsx           # Layout principal de la aplicación
│   └── page.tsx             # Página principal con providers
├── lib/
│   ├── i18n.ts             # Sistema de internacionalización
│   ├── language-context.tsx # Contexto de idioma
│   ├── theme-context.tsx    # Contexto de temas
│   └── mock-data.ts         # API simulada y lógica de datos
├── components/ui/           # Componentes de shadcn/ui
├── water-tracker.tsx        # Componente principal de la aplicación
└── README.md               # Este archivo
```

## 🛠️ Tecnologías Utilizadas

### Frontend
- **[Next.js 15](https://nextjs.org/)** - Framework de React con App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Tipado estático
- **[Tailwind CSS](https://tailwindcss.com/)** - Framework de CSS utilitario
- **[shadcn/ui](https://ui.shadcn.com/)** - Componentes de UI reutilizables
- **[Lucide React](https://lucide.dev/)** - Iconos SVG

### Características Técnicas
- **React Context API** - Gestión de estado global
- **localStorage** - Persistencia de datos local
- **CSS Variables** - Sistema de temas dinámico
- **Responsive Design** - Adaptable a todos los dispositivos
- **Animaciones CSS** - Efectos visuales fluidos

## 📱 Funcionalidades Detalladas

### Sistema de Logros Coherente

Los logros se basan en datos reales del usuario:

- **🔥 Racha de 7 días** - Mantén tu meta por 7 días consecutivos
- **🏆 Maestro Mensual** - Completa 30 días de hidratación consistente
- **⭐ Perfeccionista** - Supera tu meta diaria por 5 días seguidos
- **💪 Sobresaliente** - Bebe 150% de tu meta en un solo día
- **🎯 Rey de la Consistencia** - Cumple tu meta por 14 días consecutivos
- **🦸 Héroe de Hidratación** - Alcanza tu meta 50 veces en total
- **⚔️ Guerrero del Agua** - Bebe más de 100 vasos en total
- **💥 Destructor de Metas** - Supera tu meta 10 veces
- **🌟 Insignia de Dedicación** - Usa la app por 21 días consecutivos

### Sistema de Niveles

Progresión basada en XP real:
- **10 XP** por cada vaso de agua
- **50 XP bonus** por completar la meta diaria
- **5 XP adicional** por cada vaso extra sobre la meta
- **Niveles crecientes** con requisitos de XP escalables

### Calendario Interactivo

- **Vista mensual** con navegación
- **Indicadores visuales** de progreso por día
- **Detalles por día** al hacer clic
- **Códigos de color** según el nivel de hidratación
- **Historial persistente** de hasta 30 días

## 🎨 Sistema de Temas

### Modos de Visualización
- **☀️ Claro** - Colores brillantes para uso diurno
- **🌙 Oscuro** - Colores suaves para reducir fatiga visual
- **🖥️ Sistema** - Se adapta automáticamente al tema del OS

### Temas Desbloqueables
Cada tema se obtiene como recompensa y tiene su propia paleta:

| Tema | Rareza | Colores Principales |
|------|--------|-------------------|
| 🎨 Predeterminado | - | Azul clásico |
| 🌊 Océano | Raro | Azules profundos |
| 🌲 Bosque | Raro | Verdes naturales |
| 🌅 Atardecer | Épico | Naranjas y rojos |
| 🌙 Medianoche | Épico | Púrpuras e índigos |
| 🌌 Aurora | Legendario | Rosas y púrpuras |

## 🌐 Internacionalización

### Idiomas Soportados
- **🇪🇸 Español** - Idioma completo con todas las traducciones
- **🇺🇸 Inglés** - Idioma completo con todas las traducciones

### Características i18n
- **Detección automática** del idioma del navegador
- **Cambio dinámico** sin recargar la página
- **Persistencia** de la preferencia del usuario
- **Traducciones contextuales** para logros y temas

## 💾 Persistencia de Datos

La aplicación utiliza `localStorage` para mantener:

- **Progreso diario** actual
- **Historial de hidratación** (30 días)
- **Configuraciones** (meta diaria, tamaño de vaso)
- **Preferencias** (idioma, tema)
- **Logros desbloqueados**
- **Temas disponibles**
- **Estadísticas de usuario**

## 🔧 Personalización

### Configuración de Metas
- **Meta diaria** ajustable (1-20 vasos)
- **Tamaño de vaso** personalizable (50-1000ml)
- **Presets comunes** (200ml, 250ml, 300ml, 500ml)

### Configuración Visual
- **Modo de tema** (claro/oscuro/sistema)
- **Estilo de tema** (6 opciones desbloqueables)
- **Idioma de interfaz** (español/inglés)

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

---

**¡Mantente hidratado! 💧**

*Hecho con ❤️ y mucha agua*
