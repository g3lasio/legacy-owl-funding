# Legacy by LeadPrime — Brief de fotografía y prompts de imagen

Guía para generar (o dirigir a un fotógrafo) los activos visuales que elevan la
página. Cada activo trae: **propósito · dónde va · tamaño/nombre de archivo ·
prompt (Midjourney + ChatGPT/DALL·E) · cómo insertarlo**.

> Lo visual ya construido en el repo (no necesita fotografía): marca del búho
> (`assets/img/brand/owl-mark.svg`), OG image, favicon, diagrama de capital stack
> (`assets/img/brand/capital-stack.svg`) y el mockup del dashboard de LeadPrime
> (`assets/img/brand/leadprime-dashboard.png`). Esto es solo para **fotografía real**.

---

## 0. Dirección de arte (aplica a TODAS)

- **Estética:** editorial y cinematográfica, cálida pero sobria. NADA de stock
  genérico sonriendo a cámara.
- **Grade/color:** sombras azul‑tinta (#04080F–#0E1D33), altas luces cálidas
  doradas (#C5A35A). Contraste medio‑alto, grano fino. Debe "sentarse" sobre el
  fondo navy del sitio (los bloques ya llevan un overlay navy encima).
- **Sujetos:** crews de construcción **latinas reales**, herramientas y obra
  reales (residencial suburbano de EE. UU./California). Ropa de trabajo auténtica.
- **Luz:** hora dorada (amanecer/atardecer) o luz de obra real.
- **Evitar:** logos o texto dentro de la imagen, marcas de agua, render 3D,
  cascos de utilería impecables, manos/dedos deformes (típico de IA — revisar),
  y caras de stock. Relación de aspecto exacta que se indica en cada una.
- **Formato de entrega:** JPG alta calidad, sRGB, con el **nombre de archivo exacto**
  indicado, dentro de `public/assets/img/photos/`.

**Regla de autenticidad:** para la sección *"De contratista a dueño"* usa una
**foto real de Gelasio** (es una prueba de credibilidad; una cara de IA ahí
resta confianza y es problemática). Para hero/crew/casas, IA o banco de imágenes
con licencia está bien.

---

## 1. Hero — crew en un flip al atardecer *(opcional)*
- **Propósito:** fondo/lateral del hero, silueteado para overlay navy.
- **Dónde va:** sección `#hero`. **Tamaño:** 2400×1600 (3:2). **Archivo:** `hero-crew.jpg`
- **Midjourney:**
  > `editorial wide shot of a Latino construction crew working on a suburban house renovation at golden hour, scaffolding and framing visible, cinematic warm rim light, deep navy-blue shadows, gold sunlight, film grain, muted premium color grade, shot on 35mm, shallow depth of field, no text, no logos --ar 3:2 --style raw --stylize 250`
- **ChatGPT/DALL·E:**
  > "Fotografía editorial cinematográfica, plano amplio: una cuadrilla de construcción latina trabajando en la remodelación de una casa suburbana a la hora dorada. Andamios y estructura de madera visibles. Luz cálida de contraluz, sombras azul marino profundas, grano de película, colorimetría premium apagada. Sin texto ni logos. Relación 3:2, horizontal."
- **Post:** oscurecer 15–20%; el sitio ya aplica gradiente navy encima.
- **Insertar:** hoy el hero usa marca de agua del búho. Para usar foto, envúelve
  el `.hero__inner` y añade un `<img>` de fondo con `position:absolute;inset:0;object-fit:cover;opacity:.28` detrás del contenido (te lo dejo listo si decides usarla).

## 2. La ventaja — la crew ejecutando la remodelación
- **Propósito:** materializar "tu crew = tu ventaja".
- **Dónde va:** `#ventaja` (comentario `FOTO #2` en `index.html`). **Tamaño:** 1600×1200 (3:2, se recorta a wide). **Archivo:** `crew-rehab.jpg`
- **Midjourney:**
  > `close documentary shot of skilled hands installing hardwood flooring / framing a wall inside a house under renovation, sawdust in warm light, tools in focus, Latino craftsman, navy shadows and golden highlights, film grain, premium editorial grade, no faces to camera, no text --ar 3:2 --style raw --stylize 200`
- **ChatGPT/DALL·E:**
  > "Foto documental cercana: manos expertas de un carpintero latino instalando piso de madera / levantando un muro dentro de una casa en remodelación; aserrín flotando en luz cálida, herramientas en foco. Sombras marino, luces doradas, grano de película, estética editorial premium. Sin rostros posando, sin texto. 3:2."
- **Insertar:** en `index.html`, **descomenta el bloque `FOTO #2`** (arriba de `.figures`).

## 3. Quién está detrás — retrato de Gelasio *(FOTO REAL, no IA)*
- **Propósito:** prueba humana "de contratista a dueño".
- **Dónde va:** tarjeta "De contratista a dueño" en `#detras` (comentario `FOTO #3`). **Tamaño:** 1200×1500 (4:5 vertical). **Archivo:** `founder-gelasio.jpg`
- **Dirección de foto real (fotógrafo):**
  > Retrato ambiental de Gelasio en una obra o casa terminada, hora dorada. 4:5
  > vertical, encuadre de medio cuerpo, mirada segura (no sonrisa de stock),
  > ropa de trabajo limpia o camisa oscura. Fondo desenfocado cálido. Iluminación
  > lateral suave. Transmite "dueño que empezó con las manos".
- **Si se necesita un placeholder temporal por IA** (reemplazar por foto real pronto):
  > `environmental portrait of a confident Latino man in his 40s, contractor turned owner, standing on a finished renovation site at golden hour, work shirt, medium shot, cinematic warm light, navy shadows, film grain, editorial --ar 4:5 --style raw`
- **Insertar:** **descomenta el bloque `FOTO #3`** en la tarjeta.

## 4. Deal de ejemplo — antes / después del flip
- **Propósito:** hacer tangible el retorno del ejemplo.
- **Dónde va:** debajo de la tabla en `#ejemplo` (comentario `FOTO #4`). **Tamaño:** 2× 1200×900 (4:3). **Archivos:** `flip-before.jpg`, `flip-after.jpg`
- **Midjourney (antes):**
  > `real estate photo of a dated, worn single-family house exterior needing renovation, overcast flat light, honest not staged, suburban California, no text --ar 4:3`
- **Midjourney (después):**
  > `real estate photo of the same house beautifully renovated, fresh exterior, landscaped, warm golden hour light, premium curb appeal, no text --ar 4:3`
- **ChatGPT/DALL·E:** describe "misma casa, antes deteriorada / después remodelada
  con encanto, luz dorada" en dos imágenes 4:3 coherentes entre sí.
- **Insertar:** **descomenta el bloque `FOTO #4`** (las etiquetas "Antes/Después" ya vienen incluidas).

## 5. Dos salidas — casa terminada *(refinancia y renta)*
- **Propósito:** ilustrar "patrimonio que se queda contigo".
- **Dónde va:** `#salidas` (puedo dejarte el bloque). **Tamaño:** 1800×1200 (3:2). **Archivo:** `home-finished.jpg`
- **Midjourney:**
  > `architectural photo of a beautifully renovated suburban home exterior at dusk, warm interior lights glowing, manicured yard, cinematic, premium, navy sky, gold light, no text --ar 3:2 --style raw --stylize 200`
- **ChatGPT/DALL·E:**
  > "Foto arquitectónica de una casa suburbana remodelada al anochecer, luces interiores cálidas encendidas, jardín cuidado, cielo azul marino, estética premium cinematográfica. Sin texto. 3:2."

---

## Cómo insertar (resumen)

1. Genera la imagen con el prompt, exporta al **tamaño y nombre** indicados.
2. Colócala en `public/assets/img/photos/`.
3. En `public/index.html`, **quita los `<!-- -->`** del bloque `FOTO #N`
   correspondiente (busca `FOTO #2`, `FOTO #3`, `FOTO #4`).
4. El CSS ya está listo (`.media`, `.portrait`, `.duo`) — no hay que tocar estilos.
5. Vuelve a desplegar. (Para el hero, avísame y te dejo el bloque de fondo listo.)

> Todos los bloques ya están maquetados y probados; solo faltan los archivos de
> imagen. Si prefieres, genera las imágenes y me las pasas y yo las integro.
