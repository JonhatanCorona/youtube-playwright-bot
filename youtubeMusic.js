const { chromium } = require('playwright');

(async () => {
    console.log("✅ Iniciando Playwright...");

    const browser = await chromium.launch({ headless: false }); // Cambia a true para headless
    const context = await browser.newContext();
    const page = await context.newPage();

    console.log("🌐 Navegando a YouTube Music...");
    await page.goto('https://music.youtube.com', { waitUntil: 'domcontentloaded' });

    // Aceptar cookies si aparecen
    try {
        console.log("🔘 Buscando botón 'Aceptar todo'...");
        await page.getByRole('button', { name: /Aceptar todo/i }).click({ timeout: 5000 });
        console.log("✅ Se hizo clic en 'Aceptar todo'");
    } catch {
        console.log("⚠️ Botón 'Aceptar todo' no encontrado o ya aceptado.");
    }

    console.log("⌨️ Buscando campo de entrada de búsqueda...");
    const searchInput = page.locator('ytmusic-search-box input');

    await searchInput.waitFor({ timeout: 10000 });
    await searchInput.click();
    await searchInput.fill('Canción de prueba 10 segundos');
    await page.keyboard.press('Enter');

    console.log("🔍 Esperando resultados...");
    await page.locator('ytmusic-shelf-renderer ytmusic-responsive-list-item-renderer').first().waitFor({ timeout: 15000 });

    const songs = await page.locator('ytmusic-shelf-renderer ytmusic-responsive-list-item-renderer').all();
    console.log(`🎵 Se encontraron ${songs.length} canciones.`);

    if (songs.length > 0) {
        const firstSong = songs[0].locator('.title-column a').first();
        console.log("▶️ Haciendo clic en la primera canción...");
        await Promise.all([
            page.waitForURL(/watch\?v=/, { timeout: 15000 }),
            firstSong.click()
        ]);

        console.log("🌟 Página de la canción cargada:", page.url());

        console.log("⏳ Esperando 20 segundos...");
        await page.waitForTimeout(17000);

        console.log("✅ Tiempo cumplido, cerrando navegador...");
        await browser.close();
        console.log("✅ Navegador cerrado.");

    } else {
        console.log("❌ No se encontraron canciones.");
        await browser.close();
        console.log("✅ Navegador cerrado.");
    }
})();
