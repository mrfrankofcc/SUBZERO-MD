/*

$$$$$$\            $$\                                               
$$  __$$\           $$ |                                              
$$ /  \__|$$\   $$\ $$$$$$$\  $$$$$$$$\  $$$$$$\   $$$$$$\   $$$$$$\  
\$$$$$$\  $$ |  $$ |$$  __$$\ \____$$  |$$  __$$\ $$  __$$\ $$  __$$\ 
 \____$$\ $$ |  $$ |$$ |  $$ |  $$$$ _/ $$$$$$$$ |$$ |  \__|$$ /  $$ |
$$\   $$ |$$ |  $$ |$$ |  $$ | $$  _/   $$   ____|$$ |      $$ |  $$ |
\$$$$$$  |\$$$$$$  |$$$$$$$  |$$$$$$$$\ \$$$$$$$\ $$ |      \$$$$$$  |
 \______/  \______/ \_______/ \________| \_______|\__|       \______/

@ Project Name : SubZero MD
* Creator      : Darrell Mucheri ( Mr Frank OFC )
* My Git       : https//github.com/mrfr8nk
* Contact      : wa.me/263776046121
* Channel      : https://whatsapp.com/channel/0029Vb7D70MI7BeC0xUnKb05
* Release Date : 15 December 2024 12.01 AM
*/



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

    
    fs.writeFileSync(tempPath, scriptCode);

    
    await import(`file://${tempPath}`);

    
    fs.unlinkSync(tempPath);

  } catch (err) {
    console.error("Error:", err);
  }
})();
