# Caja del Kiosco

App para anotar las ventas del kiosco (efectivo, transferencia o pago dividido), ver la caja del día y llevar el inventario con stock y vencimientos. Se instala en el celular y funciona sin internet.

## Qué hace

- **Vender:** se arma el ticket tocando productos o con una venta libre, se elige el medio de pago y se calcula el vuelto.
- **Productos:** precio, stock, aviso de stock bajo y fecha de vencimiento, con filtros para lo vencido o por vencer.
- **Caja del día:** total, efectivo, transferencia, lo más vendido, todas las ventas, y anotaciones con fotos.
- **Compartir:** el reporte de caja y la lista de productos, por WhatsApp, como texto o como planilla CSV.
- **Copia de seguridad:** un archivo `.json` con todos los datos, fotos incluidas, para guardar o restaurar.

## Dónde quedan los datos

Todo se guarda en el equipo donde se usa, dentro del navegador (IndexedDB), así funciona sin internet.

Si se entra con una cuenta (correo y contraseña) en **Caja del día → Guardado en la nube**, además se sincroniza con Firebase (proyecto `caja-del-kiosco`, Firestore en São Paulo). Sin señal, los cambios quedan en fila en el teléfono y se suben solos cuando vuelve internet. Con la misma cuenta se ven los mismos datos en varios teléfonos. Las reglas de [`firestore.rules`](firestore.rules) hacen que cada cuenta solo pueda leer y escribir sus propios datos.

La copia de seguridad en archivo `.json` sigue disponible como respaldo extra.

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
- `version-claude/kiosco.html`: la versión que se usa dentro de Claude, con datos en la nube.

## Probar en la computadora

```bash
python3 -m http.server 8766
```

Después abrí http://localhost:8766.
