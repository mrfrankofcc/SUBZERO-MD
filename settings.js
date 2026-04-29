import 'dotenv/config';

const settings = {
/* ================= DATABASE ================= */

// Set ONE database URL here — the bot auto-detects the type from the prefix:
//   mongodb:// or mongodb+srv://  → MongoDB
//   postgres:// or postgresql://  → PostgreSQL
//   mysql:// or mysql2://         → MySQL
// Leave empty to use local JSON storage (no DB required).
DATABASE_URL: process.env.DATABASE_URL || '',
    
/* ================= BOT IDENTITY ================= */

botName: process.env.BOT_NAME || '🇸‌🇦‌🇸‌🇭‌🇦‌ᵇᵒᵗ',
botOwner: process.env.BOT_OWNER || 'KIRA',
ownerNumber: process.env.OWNER_NUMBER || '919188252308',
author: process.env.AUTHOR || 'KIRA',
packname: process.env.PACKNAME || '🇸‌🇦‌🇸‌🇭‌🇦‌ᵇᵒᵗ',
description: process.env.DESCRIPTION || 'Multi-device WhatsApp bot',

/* ================= SESSION ================= */

sessionId: process.env.SESSION_ID || '',
pairingNumber: process.env.PAIRING_NUMBER || '',
CDN: 'https://media.mrfrankofc.gleeze.com'

};

// Sync DATABASE_URL back to process.env so all modules pick it up
// (works whether the value was in .env or hardcoded above)
if (settings.DATABASE_URL && !process.env.DATABASE_URL) {
    process.env.DATABASE_URL = settings.DATABASE_URL;
}

export default settings;
