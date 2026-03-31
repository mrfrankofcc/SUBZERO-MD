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

sessionId: process.env.SESSION_ID || '',
pairingNumber: process.env.PAIRING_NUMBER || '',

/* ================= CDN ================= */

CDN: "https://cdnn.lovable.app" // Dont change this part
};

export default settings;
