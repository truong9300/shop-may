# Shop Mây ☁️

Web bán hàng đơn giản chạy trên Google Sheets — free hosting, free database.

## 🚀 Features

- Hiển thị sản phẩm từ Google Sheets
- Giỏ hàng + đặt hàng online
- Đơn hàng tự động ghi vào sheet Orders
- Deploy miễn phí trên Google Apps Script

## 📁 Files

| File | Mô tả |
|------|-------|
| `Code.gs` | Google Apps Script backend (doGet, CRUD, orders) |
| `index.html` | Frontend web app (HTML/CSS/JS) |

## 📋 Setup

1. Tạo Google Sheet mới: [sheets.new](https://sheets.new)
2. Rename Sheet1 → **Products**, thêm sheet **Orders**
3. **Extensions → Apps Script** → paste code

### Products Sheet (header ở hàng 1):

| id | name | category | price | image | desc | badge |
|----|------|----------|-------|-------|------|-------|
| 1 | iPhone 15 Pro Max | phone | 33990000 | 📱 | Chip A17 Pro Titanium | Mới |
| 2 | MacBook Air M3 | laptop | 27990000 | 💻 | Chip M3 15" 18h pin | Hot |
| 3 | AirPods Pro 2 | audio | 5990000 | 🎧 | ANC USB-C Adaptive | Bán chạy |
| 4 | Samsung Galaxy S24 Ultra | phone | 31990000 | 📱 | Snapdragon 8 Gen 3 | |
| 5 | Dell XPS 15 | laptop | 39990000 | 💻 | Core Ultra 7 OLED 3.5K | |
| 6 | Sony WH-1000XM5 | audio | 7490000 | 🎧 | Noise Cancelling 30h | |
| 7 | Apple Watch Ultra 2 | accessory | 19990000 | ⌚ | Titanium GPS+Cellular | Mới |
| 8 | Logitech MX Master 3S | accessory | 2290000 | 🖱️ | Silent click 8K DPI | |

### Deploy:

1. **Deploy → New Deployment**
2. Type: **Web app**
3. Execute as: **Me**
4. Who has access: **Anyone**
5. Deploy → copy link

## Tech Stack

- Google Apps Script (backend)
- Vanilla HTML/CSS/JS (frontend)
- Google Sheets (database)

## License

MIT
