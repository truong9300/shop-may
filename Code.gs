/**
 * Shop Mây ☁️ — Google Apps Script
 * Web bán hàng + Google Sheets database
 *
 * Cách dùng:
 * 1. Tools → Script Editor → Paste code này
 * 2. Tạo Sheet tên "Products" và "Orders"
 * 3. Deploy → New deployment → Web app
 *    → Execute as: Me
 *    → Who has access: Anyone
 */

// ============================================================
// CẤU TRÚC SHEET MẪU
// ============================================================
// Sheet "Products" (A-E):
//   A: id | B: name | C: category | D: price | E: image | F: desc | G: badge
//   1   | iPhone 15 Pro Max | phone | 33990000 | 📱 | Chip A17 Pro | Mới
//   2   | MacBook Air M3    | laptop| 27990000 | 💻 | Chip M3, 15" | Hot
//
// Sheet "Orders" (A-H):
//   A: orderId | B: customerName | C: phone | D: email | E: address
//   F: items (JSON) | G: total | H: payment | I: createdAt

// ============================================================
// GET — serve web app
// ============================================================
function doGet() {
  const html = HtmlService.createHtmlOutputFromFile('Index')
    .setTitle('Shop Mây ☁️')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
  return html;
}

// ============================================================
// API: Lấy danh sách sản phẩm
// ============================================================
function getProducts() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Products');
  if (!sheet) return [];
  
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  
  return data.slice(1).filter(r => r[0]).map(r => ({
    id: r[0],
    name: r[1],
    category: r[2],
    price: Number(r[3]),
    image: r[4] || '📦',
    desc: r[5] || '',
    badge: r[6] || ''
  }));
}

// ============================================================
// API: Đặt hàng
// ============================================================
function placeOrder(order) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Orders');
  if (!sheet) throw new Error('Sheet Orders không tồn tại');

  const orderId = 'SM-' + Date.now().toString(36).toUpperCase();
  const now = new Date().toISOString();

  sheet.appendRow([
    orderId,
    order.customerName,
    order.phone,
    order.email,
    order.address,
    JSON.stringify(order.items),
    order.total,
    order.payment,
    now
  ]);

  // Gửi mail thông báo (nếu có)
  const adminEmail = Session.getActiveUser().getEmail();
  try {
    MailApp.sendEmail({
      to: adminEmail,
      subject: '🛒 Đơn hàng mới: ' + orderId,
      htmlBody: `
        <h3>Đơn hàng mới: ${orderId}</h3>
        <p><b>Khách hàng:</b> ${order.customerName}</p>
        <p><b>SĐT:</b> ${order.phone}</p>
        <p><b>Địa chỉ:</b> ${order.address}</p>
        <p><b>Phương thức:</b> ${order.payment}</p>
        <p><b>Tổng:</b> ${order.total.toLocaleString('vi-VN')}đ</p>
        <hr>
        <pre>${JSON.stringify(order.items, null, 2)}</pre>
      `
    });
  } catch(e) {
    // Không có quyền gửi mail thì bỏ qua
  }

  return { success: true, orderId };
}

// ============================================================
// API: Lấy danh sách đơn hàng (cho admin)
// ============================================================
function getOrders() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Orders');
  if (!sheet) return [];
  
  const data = sheet.getDataRange().getValues();
  return data.slice(1).filter(r => r[0]).map(r => ({
    orderId: r[0],
    customerName: r[1],
    phone: r[2],
    email: r[3],
    address: r[4],
    items: typeof r[5] === 'string' ? JSON.parse(r[5]) : r[5],
    total: r[6],
    payment: r[7],
    createdAt: r[8]
  }));
}
