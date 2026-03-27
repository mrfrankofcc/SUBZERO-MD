import 'dotenv/config';

const settings = {
/* ================= BOT IDENTITY ================= */

botName: process.env.BOT_NAME || 'SUBZERO-MD',
botOwner: process.env.BOT_OWNER || 'Darrell M',
ownerNumber: process.env.OWNER_NUMBER || '263719647303',
author: process.env.AUTHOR || 'Mr Frank OFC',
packname: process.env.PACKNAME || 'SUBZERO-MD',
description: process.env.DESCRIPTION || 'Multi-device WhatsApp bot',

/* ================= SESSION ================= */

sessionId: process.env.SESSION_ID || 'Ice~7VHonR',
pairingNumber: process.env.PAIRING_NUMBER || '+51907071260',

/* ================= CDN ================= */

CDN: "https://mrfrankk-cdn.hf.space" // Dont change this part
};

export default settings;
