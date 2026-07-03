# Shop Mây ☁️ — Vercel Edition

Web bán hàng deploy lên **Vercel** — zero database, zero config.

## 🚀 Quick Deploy

### Nút 1-click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/shop-may)

### Hoặc deploy thủ công:

```bash
# Cài Vercel CLI
npm i -g vercel

# Deploy từ thư mục project
cd web-ban-hang
vercel --prod
```

## 📁 Cấu trúc project

```
web-ban-hang/
├── index.html          # Frontend (Tailwind CSS + JS thuần)
├── api/
│   ├── products.js     # GET /api/products — danh sách sản phẩm
│   └── orders.js       # POST /api/orders — đặt hàng
├── data/
│   └── products.json   # Dữ liệu sản phẩm (dễ edit)
└── vercel.json          # Vercel deployment config
```

## 🛠 Tính năng

- ✅ Hiển thị sản phẩm từ JSON file (dễ sửa)
- ✅ Lọc theo danh mục (Điện thoại, Laptop, Phụ kiện, Âm thanh)
- ✅ Giỏ hàng (lưu localStorage)
- ✅ Đặt hàng online (ghi log server)
- ✅ Thanh toán: COD / Chuyển khoản / MoMo
- ✅ Responsive (mobile-first)
- ✅ Tối ưu SEO, load nhanh

## 📝 Tùy chỉnh sản phẩm

Sửa file `data/products.json`:

```json
{
  "id": 1,
  "name": "iPhone 15 Pro Max",
  "category": "phone",
  "price": 33990000,
  "image": "📱",
  "desc": "Chip A17 Pro Titanium",
  "badge": "Mới"
}
```

| Field      | Mô tả                    |
|------------|--------------------------|
| id         | ID sản phẩm              |
| name       | Tên sản phẩm             |
| category   | phone / laptop / audio / accessory |
| price      | Giá (VNĐ)                |
| image      | Emoji icon               |
| desc       | Mô tả ngắn               |
| badge      | Nhãn: Mới / Hot / Bán chạy |

## 🧪 Chạy local

```bash
# Development — dùng Vercel Dev
vercel dev
# → http://localhost:3000
```

## ⚙️ Biến môi trường (optional)

Set trong Vercel Dashboard → Settings → Environment Variables:

| Variable            | Mô tả                          |
|---------------------|--------------------------------|
| `ORDER_WEBHOOK_URL` | Webhook URL khi có đơn mới      |
| `NOTIFICATION_EMAIL`| Email nhận thông báo đơn hàng   |
| `RESEND_API_KEY`    | API key Resend.com gửi mail     |
| `ADMIN_API_KEY`     | Key bảo vệ API /api/orders/list |

## 📬 Nhận thông báo đơn hàng

Có 2 cách:

### Cách 1: Webhook (dễ nhất)
Set `ORDER_WEBHOOK_URL` → nhận POST JSON khi có đơn mới.
Dùng kết hợp với [Make.com](https://make.com), [n8n.io](https://n8n.io), hoặc [Zapier](https://zapier.com) để gửi vào Telegram, email, Google Sheets, etc.

### Cách 2: Email (cần Resend API)
Set cả `RESEND_API_KEY`, `NOTIFICATION_EMAIL`, và `ORDER_WEBHOOK_URL`.

## 🆚 So với Google Apps Script version

|                      | Google Apps Script | Vercel (bản này)    |
|----------------------|--------------------|---------------------|
| Hosting              | Google             | Vercel Edge Network |
| Database             | Google Sheets      | JSON file           |
| API calls            | google.script.run  | REST fetch          |
| Deploy               | 2-3 clicks         | 1-click / CLI       |
| Tốc độ               | Chậm (GAS warm)    | Nhanh (Edge)        |
| Giới hạn             | 6 min execution    | 10s serverless      |
| Giá                  | Free               | Free (Hobby)        |

## License

MIT — làm gì cũng được ✌️
