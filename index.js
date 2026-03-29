const fs = require('fs');
const path = require('path');
const axios = require('axios');
const AdmZip = require('adm-zip');
const { execSync } = require('child_process');

// === CONFIG ===
const repoZipUrl = 'https://github.com/mrfr8nk/ted/archive/refs/heads/main.zip';
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
    `module.exports = require("node:fs");`
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

    const zip = new AdmZip(Buffer.from(response.data, 'binary'));
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

/* ================= INSTALL DEPS SAFE ================= */

function installDepsSafe(projectPath) {
  try {
    console.log('📦 Installing dependencies (safe mode)...');

    process.env.GIT = "false";
    process.env.GIT_ASKPASS = "echo";

    execSync(
      "npm install --omit=optional --no-package-lock --legacy-peer-deps",
      {
        cwd: projectPath,
        stdio: "inherit"
      }
    );

  } catch (err) {
    console.log("⚠️ Dependency install failed, continuing...");
  }
}

/* ================= BUILD TS ================= */

function buildProject(projectPath) {
  try {
    console.log("⚙️ Building TypeScript...");
    execSync("npx tsc", {
      cwd: projectPath,
      stdio: "inherit"
    });
  } catch {
    console.log("⚠️ Build skipped (dist may already exist)");
  }
}

/* ================= START BOT ================= */

function startBot(projectPath) {
  try {
    console.log('[🚀] Launching Subzero Bot...');

    const distPath = path.join(projectPath, 'dist', 'index.js');

    if (!fs.existsSync(distPath)) {
      console.error('❌ dist/index.js not found!');
      process.exit(1);
    }

    require(distPath);

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

  installDepsSafe(extractedRepoPath);

  buildProject(extractedRepoPath);

  startBot(extractedRepoPath);
})();
