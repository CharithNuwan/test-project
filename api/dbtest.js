const libsql = require('@libsql/client');

// Singleton pattern — create once, reuse!
let client;

function getClient() {
  if (!client) {
    // Try ALL possible env variable names!
    const url = process.env.TURSO_DATABASE_URL
             || process.env.STORAGE_URL
             || process.env.DATABASE_URL;

    const authToken = process.env.TURSO_AUTH_TOKEN
                   || process.env.STORAGE_AUTH_TOKEN
                   || process.env.DATABASE_AUTH_TOKEN;

    // Debug — show what vars exist
    console.log('ENV CHECK:', {
      TURSO_DATABASE_URL: !!process.env.TURSO_DATABASE_URL,
      STORAGE_URL:        !!process.env.STORAGE_URL,
      TURSO_AUTH_TOKEN:   !!process.env.TURSO_AUTH_TOKEN,
      STORAGE_AUTH_TOKEN: !!process.env.STORAGE_AUTH_TOKEN,
      url_found:          !!url,
    });

    if (!url) {
      throw new Error('No database URL found! Add TURSO_DATABASE_URL to Vercel env vars!');
    }

    client = libsql.createClient({ url, authToken: authToken || undefined });
  }
  return client;
}

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  try {
    const db     = getClient();
    const result = await db.execute('SELECT 1 as test');

    return res.status(200).json({
      status:  'ok',
      message: 'Database connected!',
      result:  result.rows[0]
    });

  } catch (err) {
    return res.status(200).json({
      status: 'error',
      msg:    err.message,
      hint:   'Go to Vercel → Settings → Environment Variables and add TURSO_DATABASE_URL and TURSO_AUTH_TOKEN'
    });
  }
};
