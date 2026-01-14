# 📁 Instrucciones para Colocar los Logos

## Estructura de Archivos

Coloca tus archivos de logos en esta carpeta siguiendo esta estructura:

```
public/
  logos/
    versu-logo.svg          ← Logo principal de Versu (para el header)
    partners/
      meta-logo.svg         ← Logo de Meta
      shopify-logo.svg      ← Logo de Shopify
      marca1.svg            ← Otros logos de partners
      marca2.svg
      marca3.svg
      ... (más logos)
```

## Archivos Necesarios

### 1. Logo de Versu (Header)
- **Ubicación**: `public/logos/versu-logo.svg` (o .png, .jpg)
- **Uso**: Se muestra en el header de la página
- **Tamaño recomendado**: Ancho máximo 200px, altura proporcional

### 2. Logos de Partners (Footer)
- **Ubicación**: `public/logos/partners/`
- **Archivos necesarios**:
  - `meta-logo.svg` - Logo de Meta
  - `shopify-logo.svg` - Logo de Shopify
- **Tamaño recomendado**: Altura 20px (h-5 en Tailwind)

### 3. Logos del Carousel (Sección de marcas)
- **Ubicación**: `public/logos/partners/`
- **Nombres**: Puedes usar cualquier nombre, pero actualiza el array en `src/components/LogoCarousel.jsx`
- **Ejemplo de nombres**:
  - `marca1.svg`
  - `marca2.svg`
  - `marca3.svg`
  - etc.

## Formatos Soportados

Los siguientes formatos funcionan:
- ✅ `.svg` (recomendado - mejor calidad y escalabilidad)
- ✅ `.png` (con fondo transparente)
- ✅ `.jpg` / `.jpeg`
- ✅ `.webp`

## Cómo Actualizar los Nombres de Archivos

Si tus logos tienen nombres diferentes, actualiza estos archivos:

### LogoCarousel.jsx
Edita el array `logos` en `src/components/LogoCarousel.jsx`:

```javascript
const logos = [
  { name: "Marca 1", src: "/logos/partners/tu-archivo-1.svg" },
  { name: "Marca 2", src: "/logos/partners/tu-archivo-2.svg" },
  // ... más logos
];
```

### Footer.jsx
Si los logos de Meta o Shopify tienen nombres diferentes, edita:
- `src/components/Footer.jsx` - líneas donde se referencia `/logos/partners/meta-logo.svg` y `/logos/partners/shopify-logo.svg`

## Fallback Automático

Si un logo no se encuentra:
- **Header**: Se mostrará el texto "Versu" como fallback
- **Footer**: Se mostrará el icono SVG por defecto
- **Carousel**: Se mostrará el nombre de la marca como texto

## Verificación

Después de colocar los archivos:
1. Reinicia el servidor de desarrollo (`npm run dev`)
2. Verifica que los logos se muestren correctamente
3. Si no aparecen, revisa la consola del navegador para errores 404
