# Caja del Kiosco

App para anotar las ventas del kiosco (efectivo, transferencia o pago dividido), ver la caja del día y tener a mano los precios de cada producto y sus variantes. El stock y los vencimientos quedan para una etapa más adelante (del dueño, no del vendedor). Se instala en el celular y funciona sin internet.

## Qué hace

- **Vender:** se arma el ticket tocando productos o agregando uno nuevo desde el buscador cuando no hay coincidencias, se elige el medio de pago y se calcula el vuelto. El catálogo está agrupado por categoría y cada una se despliega al tocarla (el equipo recuerda cuáles quedaron abiertas); arriba quedan siempre los más vendidos de los últimos 30 días. Al buscar se ve todo lo que coincide, y Enter suma el primero. Un producto con variantes abre una ventana para elegir cuál (por ejemplo Coca-Cola → 1 L).
- **Editar una línea del ticket:** el lápiz permite cambiar el nombre para esa venta y el precio por unidad. Si cambiás el precio, podés elegir si se actualiza también en Productos.
- **Editar una venta:** el lápiz de cada venta abre la edición: cantidades, precios (con la misma pregunta), agregar productos y medio de pago. Al guardar, la venta queda marcada como "Editada". También se pueden corregir el día y la hora: si cambiás el día, la venta pasa a esa caja.
- **Venta que me olvidé de anotar:** el botón **+** de la lista de ventas (en Vender y en Caja) abre una venta nueva: se eligen los productos, el medio de pago y el día y la hora reales. En Caja se abre en el día que estés mirando. También sirve el botón del reloj, al lado de Cobrar, para ponerle día y hora a lo que ya armaste en el ticket. La venta se guarda con esa fecha y queda en la caja de ese día (no se aceptan horas que todavía no pasaron).
- **Lista de precios:** la app trae cargada la lista de precios del Kiosco San Miguel (64 productos, desde `PRODUCTOS_BASE` en `index.html`). Se carga una sola vez por equipo: suma los que no estén y no toca los que ya existían con el mismo nombre (también cuenta el nombre de cada variante: "Coca-Cola" + "500 ml descartable" equivale a "Coca-Cola descartable 500 ml").
- **Productos:** nombre, categoría y precio. Un producto puede tener **variantes** (tamaños, sabores), cada una con su precio; en ese caso el precio va en cada variante. Vender no descuenta stock. Si quedaron datos de stock o lotes de versiones anteriores, se conservan guardados pero no se muestran ni se usan.
- **Promos:** cada producto puede tener una promo (descuento en %, precio rebajado, o combo tipo 3 por $3.900), con fecha de fin opcional. Se aplica sola en el ticket y queda registrada en la venta. En un producto con variantes solo puede ser un descuento en %.
- **Promos con varios productos:** en Productos > Promos se arman "Promo 1", "Promo 2"… (por ejemplo una cerveza + un sándwich por un precio; cada ítem puede ser una variante puntual). Aparecen arriba del catálogo al vender; tocarlas las suma al ticket y al cobrar el precio se reparte entre sus productos, así "lo más vendido" cuenta cada uno.
- **Caja del día:** total, efectivo, transferencia, lo más vendido, todas las ventas, y anotaciones con fotos y edición de texto. Se cambia de día con las flechas o eligiendo la fecha.
- **Cambio de día:** al abrir la app se muestra la caja de hoy. Si quedó abierta la caja de ayer, se conserva hasta las 03:00 según la hora del dispositivo. A partir de esa hora, la app pasa automáticamente a la caja de hoy.
- **Cerrar caja:** en la pestaña Caja se puede cerrar la caja abierta con un segundo toque para confirmar.
- **Historial:** consultá las ventas de los últimos 7 o 30 días, del mes, de todo el historial o de un rango de fechas.
- **Pago a quien atiende:** el 10 % del total vendido se muestra en Vender, Caja e Historial, y se incluye en los informes de ventas.
- **Compartir:** desde Caja e Historial podés compartir el informe por WhatsApp o como planilla CSV. Desde Productos también podés compartir la lista de precios con sus variantes.
- **Cuenta y copias:** el botón de persona de la barra superior abre el menú para entrar con Google (o con correo y contraseña) y para guardar o restaurar una copia de seguridad en un archivo `.json`, fotos incluidas.

## Dónde quedan los datos

Todo se guarda en el equipo donde se usa, dentro del navegador (IndexedDB), así funciona sin internet.

Si se entra con una cuenta (Google, o correo y contraseña) desde el botón de cuenta de la barra superior, además se sincroniza con Firebase (proyecto `caja-del-kiosco`, Firestore en São Paulo). Sin señal, los cambios quedan en fila en el teléfono y se suben solos cuando vuelve internet. Con la misma cuenta se ven los mismos datos en varios teléfonos. Las reglas de [`firestore.rules`](firestore.rules) hacen que cada cuenta solo pueda leer y escribir sus propios datos.

La copia de seguridad en archivo `.json` (en el mismo menú) sigue disponible como respaldo extra.

## Instalar en el celular

Abrí la dirección de GitHub Pages con internet:

- **iPhone:** en Safari, tocá Compartir y después **Agregar a inicio**.
- **Android:** en Chrome, tocá **Instalar app** en la app, o en el menú ⋮ elegí **Instalar aplicación**.

## Actualizar la app

Después de cambiar cualquier archivo, subí el número de `VERSION` en `sw.js` (por ejemplo `caja-kiosco-v2`). Así los teléfonos bajan la versión nueva la próxima vez que abran la app con internet.

## Archivos

- `index.html`: la app completa.
- `sw.js`: guarda la app en el teléfono para que funcione sin internet.
- `manifest.webmanifest`, `logo.svg`, `icon-*.png`, `apple-touch-icon.png`: nombre, logo e íconos para instalarla.
- `fonts/`: las tipografías, incluidas en la app para que abra al instante y sin internet.
- `version-claude/kiosco.html`: la versión que se usa dentro de Claude, con datos en la nube.

## Probar en la computadora

```bash
python3 -m http.server 8766
```

Después abrí http://localhost:8766.
