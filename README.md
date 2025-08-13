# Bot de Reproducción Automática en YouTube y YouTube Music con Playwright

Este proyecto automatiza la reproducción de videos en YouTube y canciones en YouTube Music utilizando Playwright. Los bots abren el navegador, buscan contenido específico, lo reproducen y cierran el navegador automáticamente. Además, ambos scripts se ejecutan simultáneamente y repiten el proceso cada minuto.

---

## Contenido del proyecto

- `youtube.js`: Automatiza YouTube, busca un video y lo reproduce hasta el final.
- `youtubeMusic.js`: Automatiza YouTube Music, busca una canción, la reproduce por un tiempo fijo y cierra el navegador.
- `runner.js`: Ejecuta ambos scripts en paralelo y repite la ejecución cada minuto.

---

## Cómo funciona cada script

### youtube.js
- Inicia Playwright con navegador visible.
- Navega a YouTube y espera que cargue.
- Cierra ventana emergente de cookies si aparece.
- Busca "Video de 10 Segundos" y reproduce el primer video encontrado.
- Fuerza la reproducción del video incluso si está pausado.
- Espera que termine la reproducción y cierra el navegador.

### youtubeMusic.js
- Inicia Playwright con navegador visible.
- Navega a YouTube Music y espera que cargue.
- Cierra ventana emergente de cookies si aparece.
- Busca "Canción de prueba 10 segundos" y reproduce la primera canción por 17 segundos.
- Cierra el navegador.

### runner.js
- Ejecuta ambos scripts (`youtube.js` y `youtubeMusic.js`) simultáneamente.
- Muestra salida de ambos scripts en la consola.
- Espera a que ambos terminen.
- Repite el proceso cada minuto indefinidamente.

---

## Qué aprendí

- Automatización avanzada con Playwright y manipulación de páginas web dinámicas.
- Uso de selectores robustos y manejo de promesas para sincronización de eventos.
- Control programático de reproducción de videos HTML5.
- Orquestación de múltiples procesos Node.js con control de errores.
- Implementación de ciclos de repetición y espera programada.

---

## Requisitos

- Node.js v14+
- npm

---

## Instalación

```bash
npm install playwright


