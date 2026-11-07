# VIETJET TRAVEL - ANTIGRAVITY AGENT RULES & CONTEXT (GEMINI.md)

Tài liệu này chứa các quy tắc, ràng buộc kỹ thuật và chỉ dẫn hành vi cho **Antigravity AI Agent** khi tham gia lập trình và phát triển dự án website du lịch **Vietjet**.

---

## 1. TỔNG QUAN DỰ ÁN & VAI TRÒ AGENT

- **Tên dự án:** Vietjet Travel & Flight Booking Portal
- **Mục tiêu:** Xây dựng website thương mại dịch vụ du lịch, đặt vé máy bay và tour trọn gói mang thương hiệu Vietjet.
- **Phong cách giao diện:** Hiện đại, tối giản, thanh lịch, nền trắng sáng (#ffffff), màu sắc nhận diện thương hiệu đỏ (#ee1d23) và vàng (#ffc629).
- **Vai trò của Agent:** Đóng vai trò Senior Frontend Developer & UI/UX Specialist, viết code sạch (clean code), chuẩn ngữ nghĩa (semantic HTML5), CSS modular, JavaScript ES6+ thuần tối ưu, chạy hoàn toàn Client-side.

---

## 2. NGUYÊN TẮC KỸ THUẬT BẮT BUỘC (HARD CONSTRAINTS)

1. **Không sử dụng Backend:**
   - Không dùng Node.js server, Express, PHP, Python, Java backend.
   - Tất cả dữ liệu chạy trong trình duyệt (Client-side).
2. **Công nghệ cốt lõi:**
   - **HTML5:** Semantic tags (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`).
   - **CSS3 thuần:** Flexbox, CSS Grid, CSS Custom Properties (Variables), Responsive (Mobile-First hoặc Desktop-First kèm Media Queries). Không dùng Tailwind CDN hay Bootstrap nếu không được yêu cầu.
   - **JavaScript thuần (Vanilla ES6+):** Module-friendly, DOM manipulation sạch sẽ, không dùng jQuery, React, Vue.
3. **Cơ sở dữ liệu SQLite trong trình duyệt:**
   - Sử dụng thư viện **sql.js** (WebAssembly SQLite) qua CDN:
     `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.8.0/sql-wasm.js`
   - Khởi tạo và nạp dữ liệu Mock data vào SQLite in-memory / IndexedDB khi người dùng tải trang lần đầu.
   - Các truy vấn lọc chuyến bay, tour du lịch đều dùng câu lệnh `SELECT ... WHERE ... ORDER BY ...` thực thi qua SQLite.
4. **Giỏ hàng (Cart) & Lưu trữ cục bộ:**
   - Sử dụng `localStorage` với key `vietjet_cart` để lưu các vé máy bay và tour đã chọn.
   - Đồng bộ số lượng trên icon giỏ hàng ở header giữa tất cả các trang.
5. **Gửi Email thông báo:**
   - Tích hợp thư viện **EmailJS** (`@emailjs/browser` qua CDN) để gửi email xác nhận đặt chỗ trực tiếp từ Client:
     - Email người gửi đại diện: `nvhai061993@gmail.com`
     - Email người nhận: Địa chỉ email do khách hàng nhập trong form giỏ hàng.
     - Cung cấp cơ chế dự phòng (Fallback Mock Notification) nếu chưa điền API Key EmailJS thật.

---

## 3. BẢNG MÀU THƯƠNG HIỆU & HỆ THỐNG THIẾT KẾ (DESIGN TOKENS)

Khi viết CSS, Agent **phải tuân thủ** các biến màu sau:

```css
:root {
  /* Brand Colors */
  --primary-red: #ee1d23;        /* Đỏ Vietjet đặc trưng */
  --primary-red-hover: #c9151a;  /* Đỏ đậm khi hover */
  --primary-red-light: #fff0f0;  /* Nền đỏ nhạt / tag */
  --accent-yellow: #ffc629;      /* Vàng Vietjet */
  --accent-yellow-hover: #e6b01f;

  /* Neutral Colors */
  --bg-body: #f8f9fa;            /* Nền tổng thể sáng */
  --bg-white: #ffffff;           /* Nền thẻ, container */
  --text-primary: #1f2937;       /* Chữ chính (Dark Charcoal) */
  --text-secondary: #6b7280;     /* Chữ phụ, mô tả */
  --text-light: #9ca3af;         /* Chữ mờ, placeholder */
  --border-color: #e5e7eb;       /* Đường viền chuẩn */
  --border-focus: #ee1d23;

  /* Status Colors */
  --success: #10b981;
  --warning: #f59e0b;
  --danger: #ef4444;

  /* Shadows & Radius */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 16px;
  --radius-full: 9999px;

  /* Typography */
  --font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
}
```

---

## 4. TỔ CHỨC CẤU TRÚC THƯ MỤC CHUẨN

```text
D:\deeno\Vietjet\
├── index.html              # Trang chủ (Hero search, 8 tour nổi bật, đối tác hàng không)
├── flights.html            # Trang danh sách chuyến bay & bộ lọc nâng cao
├── flight-detail.html      # Trang chi tiết chuyến bay & chọn hạng vé
├── tours.html              # Trang danh sách tour du lịch & bộ lọc
├── tour-detail.html        # Trang chi tiết tour & lịch trình chuyến đi
├── cart.html               # Trang giỏ hàng, thông tin cá nhân & gửi email
├── css/
│   ├── style.css           # Biến chung, reset, header, navigation, footer
│   ├── components.css      # Thẻ card, nút bấm, input, modal, toast
│   └── responsive.css      # Cấu hình responsive tương thích mobile, tablet
├── js/
│   ├── db.js               # Khởi tạo SQLite WebAssembly (sql.js), tạo bảng, nạp Mock Data
│   ├── main.js             # Logic header, giỏ hàng badge, toast notification, tiện ích
│   ├── flights.js          # Logic truy vấn SQLite & lọc danh sách chuyến bay
│   ├── flight-detail.js    # Logic chi tiết chuyến bay & thêm vào giỏ hàng
│   ├── tours.js            # Logic truy vấn SQLite & lọc danh sách tour
│   ├── tour-detail.js      # Logic chi tiết tour, hiển thị lịch trình & thêm vào giỏ hàng
│   └── cart.js             # Logic quản lý giỏ hàng, form đăng ký & gửi email EmailJS
├── image/                  # Hình ảnh tài nguyên nội bộ
│   ├── logo.jpg            # Logo Vietjet
│   ├── maybay.jpg          # Hình ảnh máy bay
│   └── tiepvien.jpg        # Hình ảnh tiếp viên / banner
└── assets/                 # Các icon SVG, ảnh đối tác, placeholder nếu cần
```

---

## 5. HƯỚNG DẪN DÀNH CHO ANTIGRAVITY KHI SINH CODE

1. **Liên kết hình ảnh sẵn có:**
   - Tận dụng tối đa các ảnh có sẵn trong thư mục `image/`:
     - Logo header/footer: `image/logo.jpg`
     - Hero banner / chi tiết máy bay: `image/maybay.jpg`
     - Banner khuyến mãi / hình đại diện dịch vụ: `image/tiepvien.jpg`
   - Đối với ảnh tour 600x400: sử dụng placeholder chất lượng cao từ `https://images.unsplash.com/...` hoặc `https://placehold.co/600x400` với chủ đề du lịch biển đảo, danh lam thắng cảnh Việt Nam & quốc tế.

2. **Cách xử lý SQLite Client-Side (`js/db.js`):**
   - Đảm bảo tải `sql-wasm.js` và `sql-wasm.wasm` bất đồng bộ ổn định.
   - Cung cấp hàm toàn cục `window.getDB()` trả về Promise instance của SQLite DB.
   - Chuẩn bị sẵn cơ chế fallback bằng Object/Array trong trường hợp CDN sql.js gặp trục trặc mạng, giúp ứng dụng luôn hoạt động trơn tru 100%.

3. **Tính liên kết giữa các trang:**
   - Dùng URL query parameters để truyền dữ liệu (`flights.html?from=HAN&to=SGN`, `flight-detail.html?id=1`, `tours.html?airline=VietJet`, `tour-detail.html?id=2`).
   - Sử dụng `localStorage` lưu trữ giỏ hàng dưới cấu trúc rõ ràng:
     ```json
     [
       {
         "cartId": "flight_1_1710000000",
         "type": "flight",
         "id": 1,
         "title": "Hà Nội (HAN) ➔ TP.HCM (SGN)",
         "airline": "VietJet Air",
         "seatClass": "Hạng Phổ Thông",
         "price": 1200000,
         "date": "2026-12-01",
         "time": "08:00 - 10:15",
         "quantity": 1
       }
     ]
     ```

4. **Trải nghiệm người dùng (UX) đạt chuẩn cao cấp:**
   - Định dạng tiền tệ kiểu Việt Nam: `1.200.000 ₫` thông qua `Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })`.
   - Hiển thị Toast thông báo mỗi khi: thêm vào giỏ hàng thành công, xóa mục, giỏ hàng trống.
   - Form validate kỹ càng: số điện thoại đúng 10 số, email đúng định dạng regex.
