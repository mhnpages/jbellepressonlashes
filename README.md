# Micrositio Press-On Lashes · J. Belle Cosmetics

Micrositio estático, responsive y sin base de datos para presentar los estilos Press-On, recomendar un estilo y preparar pedidos por WhatsApp.

## Abrirlo localmente

La forma recomendada es servir la carpeta con un servidor local. Desde esta carpeta ejecuta una de estas opciones:

```bash
python -m http.server 4173
```

o, si usas Node.js:

```bash
npx serve .
```

Después abre `http://localhost:4173`. Evita abrir `index.html` con doble clic porque algunos navegadores restringen recursos al usar `file://`.

## Archivos principales

- `index.html`: estructura, contenido, SEO y secciones.
- `assets/css/styles.css`: colores, tipografías, composición y diseño responsive.
- `assets/js/config.js`: precio, WhatsApp, estilos, preguntas, redes y Reels.
- `assets/js/app.js`: recomendador, selección, formulario, sesión y WhatsApp.
- `assets/images/`: fotografías reales y versiones WebP optimizadas.
- `assets/videos/`: los dos videos verticales locales.

Mantén esta estructura porque las rutas de imágenes, videos, CSS y JavaScript son relativas a `index.html`.

## Cambiar el precio o WhatsApp

Abre `assets/js/config.js` y edita:

```js
whatsappNumber: "50495248254",
whatsappDisplay: "+504 9524-8254",
price: 790,
currency: "L"
```

`whatsappNumber` debe llevar solo números y código de país. El mensaje de pedido usa automáticamente estos datos.

## Reemplazar fotografías y logo

Reemplaza una fotografía conservando el nombre para no tocar el código:

- `assets/images/kit-principal.png` y `.webp`: imagen principal del kit.
- `assets/images/natural.png` y `.webp`: estilo Natural.
- `assets/images/intermedio.png` y `.webp`: estilo Intermedio.
- `assets/images/volumen.png` y `.webp`: estilo Volumen.
- `assets/images/como-colocar.png` y `.webp`: explicación visual.
- `assets/images/antes-despues.jpg` y `.webp`: resultado real.

El encabezado usa una versión tipográfica del nombre J. Belle para evitar una imagen rota. Si recibes el logo oficial aislado, guárdalo como `assets/images/logo-jbelle.png` y reemplaza el bloque `.brand` del encabezado por una etiqueta `<img>` con texto alternativo.

Para una carga más rápida, crea también la versión WebP con el mismo nombre. No alteres la forma, densidad, curvatura ni largo del producto real.

## Editar o agregar estilos

Los estilos viven en `assets/js/config.js`, dentro de `styles`. Para cambiar una descripción:

```js
natural: {
  id: "natural",
  name: "Natural",
  length: "11 mm",
  image: "assets/images/natural.webp",
  intensity: "Suave",
  usage: "Uso diario",
  description: "Tu nueva descripción."
}
```

Para agregar un estilo nuevo:

1. Agrega su objeto en `styles`.
2. Añade la fotografía en `assets/images/`.
3. Crea una tarjeta nueva en la sección `#estilos` de `index.html`.
4. Añade una opción en el selector `#order-style`.
5. Asigna puntos hacia ese estilo en las preguntas del recomendador.

## Modificar el recomendador

Las preguntas y sus opciones están en `assets/js/config.js`, dentro de `quiz`. Cada opción suma puntos:

```js
{ label: "Muy naturales", scores: { natural: 3 } }
```

Puedes cambiar textos o puntuaciones. Si agregas una pregunta, la barra de progreso se ajusta automáticamente. Las reglas especiales para respuestas mixtas están en `calculateRecommendation()` dentro de `assets/js/app.js`.

## Agregar uno o dos Reels de Instagram

En `assets/js/config.js`, pega los enlaces completos:

```js
instagramReels: [
  "https://www.instagram.com/reel/CODIGO_1/",
  "https://www.instagram.com/reel/CODIGO_2/"
]
```

Si dejas un espacio vacío, el sitio muestra una tarjeta elegante indicando dónde irá el Reel. Instagram debe permitir que la publicación sea pública para que el embed funcione.

## Editar redes sociales

En `assets/js/config.js`, busca `social`. Instagram y WhatsApp ya están activos. Para mostrar Facebook o TikTok, agrega su URL:

```js
facebook: {
  label: "Facebook",
  handle: "J. Belle Cosmetics",
  url: "https://facebook.com/tu-pagina"
}
```

Las redes con `url: ""` permanecen ocultas y no generan enlaces incorrectos.

## Cambiar colores y tipografías

Los colores están al inicio de `assets/css/styles.css`, dentro de `:root`. Por ejemplo:

```css
--jbelle-rose: #b96679;
--jbelle-rose-dark: #7d3e4d;
--jbelle-cream: #fff8f3;
```

Las tipografías se importan en el `<head>` de `index.html`. El sitio usa Cormorant Garamond para títulos y Manrope para lectura, botones y formularios. Si cambias las fuentes, actualiza también `--font-display` y `--font-body` en el CSS.

## Privacidad

No hay analítica, cookies, píxeles, base de datos ni formularios externos. Nombre, ciudad, estilo, pago y respuestas se guardan solo en `sessionStorage` y se usan para preparar el enlace de WhatsApp. Al cerrar la pestaña, el navegador puede eliminar esos datos.

## Publicar

Puedes subir `index.html` y la carpeta `assets/` a cualquier hosting estático, por ejemplo Cloudflare Pages, Netlify, GitHub Pages o el hosting de tu dominio. La carpeta publicada debe conservar exactamente la misma estructura.

Pasos generales:

1. Sube `index.html` a la raíz pública.
2. Sube la carpeta `assets/` completa junto a `index.html`.
3. Verifica que los dos videos grandes hayan terminado de cargarse.
4. Abre la URL pública en celular y prueba un pedido.
5. Si tu hosting limita el tamaño de archivos, aloja los videos en Instagram o un CDN y sustituye los `<source>` en `index.html`.

## Pruebas

La lógica principal puede verificarse con:

```bash
node --test tests/jbelle-logic.test.mjs
```

La prueba comprueba Natural, Intermedio, Volumen y el mensaje dinámico de WhatsApp.
