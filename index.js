import axios from 'axios';
import config from './settings.js';
import fs from 'fs';
import path from 'path';

const TEMP_FILE = './temp.js'; // 👈 keep it JS

(async () => {
  try {
    console.log("❄️ Subzero Synchronization Initiated !");

    const { data: scriptCode } = await axios.get(
      `${config.CDN}/media/2026/mrfrank/subzero/index.js`
    );

    // Save as normal JS file
    fs.writeFileSync(TEMP_FILE, scriptCode);

    // 🔥 Run it as CommonJS (NO ESM issues)
    require(path.resolve(TEMP_FILE));

  } catch (err) {
    console.error("Error:", err);
  }
})();
