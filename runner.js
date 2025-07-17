const { spawn } = require('child_process');

function runScript(scriptName) {
  return new Promise((resolve, reject) => {
    const proc = spawn('node', [scriptName]);

    proc.stdout.on('data', (data) => {
      process.stdout.write(`[${scriptName}]: ${data}`);
    });

    proc.stderr.on('data', (data) => {
      process.stderr.write(`[${scriptName} ERROR]: ${data}`);
    });

    proc.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`${scriptName} exited with code ${code}`));
      }
    });
  });
}

async function runBothScripts() {
  try {
    console.log('🚀 Ejecutando youtube.js y youtubeMusic.js simultáneamente...');
    await Promise.all([
      runScript('youtube.js'),
      runScript('youtubeMusic.js'),
    ]);
    console.log('✅ Ambos scripts finalizaron.');
  } catch (error) {
    console.error('❌ Error ejecutando scripts:', error);
  }
}

async function main() {
  while (true) {
    await runBothScripts();
    console.log('⏳ Esperando 1 minuto antes de repetir...');
    await new Promise(resolve => setTimeout(resolve, 60000)); // 60000 ms = 1 minuto
  }
}

main();
