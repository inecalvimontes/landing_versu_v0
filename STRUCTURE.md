# Estructura del Proyecto

## 📁 Organización de Archivos

```
src/
├── components/          # Componentes reutilizables
│   ├── Header.jsx      # Navegación superior
│   ├── Hero.jsx        # Sección principal/banner
│   ├── Features.jsx    # Sección de características
│   ├── CTA.jsx         # Call to Action
│   └── Footer.jsx      # Pie de página
├── App.jsx             # Componente principal (orquesta todos los componentes)
├── main.jsx            # Punto de entrada de React
└── index.css           # Estilos globales de Tailwind
```

## 🎯 Cómo Funciona

### App.jsx
El componente principal (`App.jsx`) importa y organiza todos los componentes de la página:

```jsx
import Header from './components/Header'
import Hero from './components/Hero'
import Features from './components/Features'
import CTA from './components/CTA'
import Footer from './components/Footer'
```

### Componentes Individuales
Cada componente está en su propio archivo dentro de `src/components/`:
- **Fácil de encontrar**: Cada sección tiene su propio archivo
- **Fácil de modificar**: Puedes editar un componente sin afectar otros
- **Reutilizable**: Puedes usar los componentes en otras partes si es necesario

## ✏️ Cómo Personalizar

### Para modificar una sección específica:
1. Abre el archivo del componente en `src/components/`
2. Edita el contenido, clases de Tailwind, estructura, etc.
3. Los cambios se reflejarán automáticamente (Hot Reload)

### Para agregar nuevas secciones:
1. Crea un nuevo archivo en `src/components/` (ej: `About.jsx`, `Testimonials.jsx`)
2. Exporta el componente: `export default NombreComponente`
3. Impórtalo en `App.jsx`: `import NombreComponente from './components/NombreComponente'`
4. Agrégalo en el JSX de `App.jsx`: `<NombreComponente />`

### Para cambiar el orden de las secciones:
Simplemente reordena los componentes en `App.jsx`:

```jsx
<div className="min-h-screen bg-gray-50">
  <Header />
  <Hero />
  <Features />
  <CTA />
  <Footer />
</div>
```

## 🎨 Componentes Disponibles

### Header
- Navegación superior
- Logo
- Menú de navegación
- Responsive (menú hamburguesa en móvil)

### Hero
- Banner principal
- Título grande
- Descripción
- Botones de acción

### Features
- Sección de características
- Grid de 3 columnas
- Iconos SVG
- Responsive

### CTA (Call to Action)
- Sección de llamado a la acción
- Fondo destacado
- Botón principal

### Footer
- Pie de página
- Links organizados en columnas
- Información de copyright
- Responsive

## 📝 Notas

- Todos los componentes usan **Tailwind CSS** para estilos
- La estructura es **responsive** por defecto
- Puedes **agregar, eliminar o modificar** componentes según necesites
- Cada componente es **independiente** y fácil de mantener
