// Vercel Serverless Function — GET /api/orders
// Protected by a simple API key check via query param ?key=xxx
// Set ADMIN_API_KEY in Vercel environment variables

const orders = []; // In-memory (per instance — use a real DB for production)

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  // Simple API key auth
  const apiKey = process.env.ADMIN_API_KEY;
  if (apiKey && req.query.key !== apiKey) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  res.status(200).json(orders);
};
