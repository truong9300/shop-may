// Vercel Serverless Function — GET /api/products
const fs = require('fs');
const path = require('path');

module.exports = async (req, res) => {
  // CORS headers
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

  try {
    const filePath = path.join(process.cwd(), 'data', 'products.json');
    const data = fs.readFileSync(filePath, 'utf-8');
    const products = JSON.parse(data);
    res.status(200).json(products);
  } catch (err) {
    console.error('Error reading products:', err);
    res.status(500).json({ error: 'Không thể đọc dữ liệu sản phẩm' });
  }
};
