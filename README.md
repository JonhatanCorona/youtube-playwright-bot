Proyecto Bot de Reproducción Automática en YouTube y YouTube Music con Playwright
Este proyecto automatiza la apertura, búsqueda, reproducción y cierre de videos en YouTube y canciones en YouTube Music usando Playwright. Además, ejecuta ambos scripts simultáneamente y repite la acción cada 1 minuto.

Contenido del proyecto
youtube.js: Automatiza YouTube, busca un video, lo reproduce y espera a que termine.

youtubeMusic.js: Automatiza YouTube Music, busca una canción, la reproduce por un tiempo fijo y cierra.

runner.js: Ejecuta ambos scripts simultáneamente y repite la ejecución cada minuto.

Cómo funciona cada script
youtube.js
Inicia Playwright y abre un navegador visible (headless: false)

Navega a YouTube y espera que cargue el DOM.

Intenta cerrar la ventana emergente de cookies si aparece (botón "Aceptar todo").

Localiza la barra de búsqueda, escribe "Video de 10 Segundos" y presiona Enter.

Espera a que carguen los resultados y selecciona el primer video.

Navega a la página del video y espera que el reproductor esté listo.

Forzar la reproducción del video:

Intenta reproducir inmediatamente.

Usa un intervalo que verifica cada segundo si el video está pausado y lo reproduce automáticamente.

Espera a que el video termine para continuar.

Cierra el navegador al finalizar.

youtubeMusic.js
Inicia Playwright y abre un navegador visible.

Navega a YouTube Music y espera el DOM.

Intenta aceptar cookies si aparece el botón correspondiente.

Busca el campo de búsqueda, escribe "Canción de prueba 10 segundos" y presiona Enter.

Espera resultados y selecciona la primera canción.

Navega a la página de la canción y espera un tiempo fijo (17 segundos) para simular la reproducción.

Cierra el navegador.

runner.js
Ejecuta ambos scripts (youtube.js y youtubeMusic.js) en paralelo con child_process.spawn.

Muestra la salida de ambos scripts en la consola, diferenciando por prefijo.

Espera a que ambos scripts finalicen.

Espera 1 minuto y repite la ejecución de nuevo (bucle infinito).

Lo que aprendí usando Playwright en este proyecto
Automatización de navegadores modernos para interactuar con páginas web reales de manera programática.

Uso de selectores dinámicos y robustos (page.locator, getByRole) para encontrar elementos como botones y campos de texto.

Manejo de promesas y eventos para sincronizar la ejecución con la carga de páginas, aparición de elementos y finalización de videos.

Control de reproducción de videos HTML5 usando page.evaluate() para ejecutar código dentro del navegador que verifica y fuerza la reproducción.

Manejo de errores y condiciones especiales, por ejemplo, que el botón de cookies no aparezca o que no haya resultados.

Ejecutar múltiples scripts simultáneamente y orquestar su ciclo de vida con Node.js (child_process.spawn, Promise.all).

Control de tiempos de espera y bucles de repetición para simular uso continuo y automatizado.

¿Cómo usar este proyecto?
Instala dependencias:

bash
Copiar
Editar
npm install playwright
Ejecuta el script runner que controla ambos bots:

bash
Copiar
Editar
node runner.js
Observa cómo se abren ambos navegadores, buscan contenido, reproducen y se cierran automáticamente. Cada minuto, repetirán el ciclo.

