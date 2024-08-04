const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMkZHUCtxUnlrMDJ3ODYzTEpMNzFXeUdhVFZQSVFEdklKRWc2RlNkMXFXST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiV096TGdUVDRRNnduczQxeURsVlZHa3Jjb3hhOGdLdmFTelhkeDFYanhtOD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJtQ1JWbDJSQ0NYK2lUVnlSTE9qZnQwandUaVJZWFV4bEZidndHM1ZUUWxnPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJJRS9RUndVMnpJYTdld2pWN3J5VWlTKzYvTUZ1eHdVSHNvWXR3anRBWmdFPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkFKdG40Y3VVSlNOQ0lUOXJhTTFXWk1yR0xzbWFPWXR0d3RObDhtbTVpa0U9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImlEbWsrcHM1UEhLaStVQnhiSURqV0ZoYXFPOGlxRUNSdjRNUm9PV3ZVVlU9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiV0hCcHJ5aXRwKzNkamVBUHpaS2Y5TVhkdVN4bUZ3Z2lvSk1ib3ZwQkUzUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMmJhZVdLTEtLQ0lpS2hWVlpBTElwRVE3WmpjdDlJdnl0NzVROU9LL3Frcz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlZOcHVPTHVKQWM5MHNETVkrVUdud1ZRK1VWOFB2a1ZQMWJubjErc3M2WUhnM2x3dC9iVm9nK2dYNWJ4UFVucEg3cGZGOTB3VGVuMGhQcWoxN24zZUNnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTAxLCJhZHZTZWNyZXRLZXkiOiJETGkxdTY1V1VaT0ljSjI1NVFMNmI2RnNVdTlpeFY3TDU0WHJ6TjF0TGJjPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiI2VnNhR0k0ZFF6U1VRMlRBOE5kdDJRIiwicGhvbmVJZCI6IjQ3M2YzNmI3LWM3YzMtNDZkZS05OGI4LTJhYWE2OWU0OTIyOSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJTTWNRWUtoTHc2MDVZUmtXVmJybks1WThJbTg9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNHJnQUpEQ09mUktCZ1FncUVGRzdRWDlwT2E4PSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlQzQUxEMUYxIiwibWUiOnsiaWQiOiIyMjE3NjAyNjM2MzE6NTdAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoi44OT44O844Kz44Oe44OrLkJpY29tYXJ1IFNob2d1bmHEqyJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDSjNTMkt3R0VNREt2N1VHR0I0Z0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiUkUzTHcwRzNEcjUvN1BTWXEwSFpBazhud2gvK21SZW9DdVlOdEdEWUp3ST0iLCJhY2NvdW50U2lnbmF0dXJlIjoia0NzOEp5WTdDRC9JN0VMSzR0dnA0MGRzeXJFY1pkcVVYTHBlSUVEaXJBS2YzTndWazhzSFByR2lPK0prSGZoSEo5c0sybkxuaDBqU0k2bXBNbGV4Q3c9PSIsImRldmljZVNpZ25hdHVyZSI6IjNwcTc3eVpDM0NIZXRBeGpaTUdMS0VRMlNHQ2tOTCtFMFZnMzlQQSs0M1EybmxBVVNLMjZ1ejlsWHZIVEd0MTNtZUFOVlZDeXNabU5yK1FKVGl0TkNRPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjIxNzYwMjYzNjMxOjU3QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlVSTnk4TkJ0dzYrZit6MG1LdEIyUUpQSjhJZi9wa1hxQXJtRGJSZzJDY0MifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjI4MDM1MzMsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBTEpLIn0=',
    PREFIXE: process.env.PREFIX || "!",
    OWNER_NAME: process.env.OWNER_NAME || "Ibrahim Adams",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " Ibrahim Adams",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "no",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'BMW_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://guru_souf_user:Bz0ds10MFYAII5VYs9Qx8plpP5kTHlci@dpg-cqn1hro8fa8c73ak117g-a/guru_souf" : "postgresql://guru_souf_user:Bz0ds10MFYAII5VYs9Qx8plpP5kTHlci@dpg-cqn1hro8fa8c73ak117g-a.oregon-postgres.render.com/guru_souf",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

