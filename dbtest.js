// Test database connection only
const libsql = require('@libsql/client');

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Step 1 — check env vars exist
  const url       = process.env.STORAGE_URL;
  const authToken = process.env.STORAGE_AUTH_TOKEN;

  if (!url) {
    return res.status(200).json({
      status: 'error',
      step:   'env_vars',
      msg:    'STORAGE_URL not found! Check Vercel environment variables.',
      vars_found: Object.keys(process.env).filter(k => k.includes('STORAGE') || k.includes('TURSO'))
    });
  }

  // Step 2 — try connect
  try {
    const client = libsql.createClient({ url, authToken: authToken || undefined });

    // Step 3 — try simple query
    const result = await client.execute('SELECT 1 as test');

    return res.status(200).json({
      status:    'ok',
      msg:       'Database connected!',
      url_start: url.substring(0, 20) + '...',
      result:    result.rows[0]
    });

  } catch (err) {
    return res.status(200).json({
      status: 'error',
      step:   'connect',
      msg:    err.message
    });
  }
};
