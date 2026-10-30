# Caja del Kiosco

App para anotar las ventas del kiosco (efectivo, transferencia o pago dividido), ver la caja del día y llevar el inventario con stock y vencimientos. Se instala en el celular y funciona sin internet.

## Qué hace

- **Vender:** se arma el ticket tocando productos o con una venta libre, se elige el medio de pago y se calcula el vuelto.
- **Lista de precios:** la app trae cargada la lista de precios del Kiosco San Miguel (64 productos, desde `PRODUCTOS_BASE` en `index.html`). Se carga una sola vez por equipo: suma los que no estén y no toca los que ya existían con el mismo nombre. Nacen sin stock; se carga con el botón **+** de cada producto.
- **Productos:** precio, aviso de stock bajo y lotes (cada lote con su cantidad y su fecha de vencimiento), con filtros para lo vencido o por vencer. Al vender se descuenta del lote que vence antes; el botón **+** de cada producto suma un lote nuevo.
- **Promos:** cada producto puede tener una promo (descuento en %, precio rebajado, o combo tipo 3 por $3.900), con fecha de fin opcional. Se aplica sola en el ticket y queda registrada en la venta.
- **Promos con varios productos:** en Productos > Promos se arman "Promo 1", "Promo 2"… (por ejemplo una cerveza + un sándwich por un precio). Aparecen arriba del catálogo al vender; tocarlas las suma al ticket y al cobrar el precio se reparte entre sus productos, así el stock y los lotes bajan por producto.
- **Caja del día:** total, efectivo, transferencia, lo más vendido, todas las ventas, y anotaciones con fotos.
- **Cerrar caja:** la caja abierta no cambia sola a la medianoche: las ventas y notas siguen yendo a ese día hasta tocar **Cerrar caja** (en Caja, con un segundo toque para confirmar). Recién ahí se abre la del día siguiente. El día abierto se guarda en el equipo (`turno` en IndexedDB).
- **Compartir:** el reporte de caja y la lista de productos, por WhatsApp, como texto o como planilla CSV.
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
