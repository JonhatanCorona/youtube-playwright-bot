const { chromium } = require('playwright');

(async () => {
    console.log("✅ Iniciando Playwright...");

    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    console.log("🌐 Navegando a YouTube...");
    await page.goto('https://www.youtube.com');

    try {
        console.log("🔘 Buscando botón 'Aceptar todo'...");
        await page.getByRole('button', { name: /Aceptar todo/i }).click({ timeout: 5000 });
        console.log("✅ Se hizo clic en 'Aceptar todo'");
    } catch (e) {
        console.log("⚠️ Botón 'Aceptar todo' no encontrado o ya aceptado.");
    }

    console.log("⌨️ Buscando barra de búsqueda...");
    const searchInput = page.locator('input[name="search_query"]');
    await searchInput.waitFor();
    await searchInput.fill('Video de 10 Segundos');
    await page.keyboard.press('Enter');

    console.log("🔍 Esperando resultados...");
    await page.locator('ytd-video-renderer').first().waitFor({ timeout: 10000 });

    const videos = await page.locator('ytd-video-renderer').all();
    console.log(`🎥 Se encontraron ${videos.length} videos.`);

    if (videos.length > 0) {
        const firstVideoLink = videos[0].locator('a#video-title');
        console.log("▶️ Haciendo clic en el enlace del primer video para ir a su página...");
        await Promise.all([
            page.waitForURL(/watch\?v=/, { timeout: 15000 }),
            firstVideoLink.click()
        ]);
        console.log("🌟 Página del video cargada:", page.url());

        const videoPlayer = page.locator('#movie_player');
        await videoPlayer.waitFor({ timeout: 10000 });

        // Forzar reproducción y esperar que termine, manteniendo play activo si se pausa
        await page.evaluate(() => {
            const video = document.querySelector('video');
            if (!video) return Promise.resolve();

            video.play(); // Intenta reproducir inmediatamente

            return new Promise((resolve) => {
                const interval = setInterval(() => {
                    if (video.paused) {
                        video.play();
                    }
                }, 1000);

                video.addEventListener('ended', () => {
                    clearInterval(interval);
                    resolve();
                }, { once: true });
            });
        });

        console.log("✅ El video terminó de reproducirse.");
    } else {
        console.log('❌ No se encontraron videos');
        await browser.close();
        return;
    }

    console.log("✅ Cerrando navegador...");
    await browser.close();
})();
