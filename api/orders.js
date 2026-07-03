// Vercel Serverless Function — POST /api/orders
module.exports = async (req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const order = req.body;

    // Validate required fields
    if (!order.customerName || !order.phone || !order.email || !order.address) {
      res.status(400).json({ error: 'Vui lòng điền đầy đủ thông tin giao hàng' });
      return;
    }

    if (!order.items || order.items.length === 0) {
      res.status(400).json({ error: 'Giỏ hàng trống' });
      return;
    }

    // Generate order ID
    const orderId = 'SM-' + Date.now().toString(36).toUpperCase();

    // Build order record
    const orderRecord = {
      orderId,
      customerName: order.customerName,
      phone: order.phone,
      email: order.email,
      address: order.address,
      payment: order.payment || 'cod',
      items: order.items,
      total: order.total,
      createdAt: new Date().toISOString()
    };

    // Log order to server console (Vercel logs)
    console.log('🛒 NEW ORDER:', JSON.stringify(orderRecord, null, 2));

    // If VERCEL_ENV is set and a webhook URL exists, try to notify
    const webhookUrl = process.env.ORDER_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(orderRecord)
        }).catch(() => {});
      } catch (_) {}

      // Also try sending email via a notification service if configured
      try {
        if (process.env.NOTIFICATION_EMAIL) {
          await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${process.env.RESEND_API_KEY || ''}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              from: 'shopmay@yourdomain.com',
              to: process.env.NOTIFICATION_EMAIL,
              subject: `🛒 Đơn hàng mới: ${orderId}`,
              html: buildOrderEmail(orderRecord)
            })
          }).catch(() => {});
        }
      } catch (_) {}
    }

    res.status(200).json({
      success: true,
      orderId,
      message: 'Đặt hàng thành công!'
    });
  } catch (err) {
    console.error('Error placing order:', err);
    res.status(500).json({ error: 'Không thể xử lý đơn hàng. Vui lòng thử lại.' });
  }
};

function buildOrderEmail(order) {
  const itemsHtml = order.items.map(item =>
    `<tr><td>${item.name}</td><td>×${item.qty}</td><td>${(item.price * item.qty).toLocaleString('vi-VN')}đ</td></tr>`
  ).join('');

  return `
    <h3>Đơn hàng mới: ${order.orderId}</h3>
    <p><b>Khách hàng:</b> ${order.customerName}</p>
    <p><b>SĐT:</b> ${order.phone}</p>
    <p><b>Email:</b> ${order.email}</p>
    <p><b>Địa chỉ:</b> ${order.address}</p>
    <p><b>Phương thức:</b> ${order.payment}</p>
    <p><b>Tổng tiền:</b> ${order.total.toLocaleString('vi-VN')}đ</p>
    <hr>
    <table border="1" cellpadding="8" cellspacing="0" style="border-collapse:collapse;width:100%">
      <tr><th>Sản phẩm</th><th>Số lượng</th><th>Thành tiền</th></tr>
      ${itemsHtml}
    </table>
  `;
}
