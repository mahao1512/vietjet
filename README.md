# DỰ ÁN WEBSITE DU LỊCH & ĐẶT VÉ MÁY BAY VIETJET (FRONTEND THUẦN + SQLITE)

Chào mừng bạn đến với dự án website thương mại dịch vụ du lịch & đặt vé máy bay thương hiệu **Vietjet**. Dự án được xây dựng 100% bằng **HTML5, CSS3, JavaScript ES6+ thuần**, không sử dụng Backend, tích hợp cơ sở dữ liệu quan hệ **SQLite trong trình duyệt bằng WebAssembly (sql.js)** và gửi email xác nhận đặt chỗ thông qua **EmailJS**.

---

## 1. DANH SÁCH CÁC TÀI LIỆU .MD DÀNH CHO ANTIGRAVITY

Dự án đã được thiết lập bộ tài liệu Markdown (.MD) chuẩn hóa, phục vụ trực tiếp cho **Antigravity AI Agent** tự động đọc hiểu ngữ cảnh, tuân thủ các quy tắc thiết kế và lập trình:

| File Markdown | Vai Trò & Mục Đích Sử Dụng |
| :--- | :--- |
| **[`GEMINI.md`](./GEMINI.md)** | **File quy tắc cốt lõi (Agent Rules):** Antigravity tự động đọc file này để nắm rõ các ràng buộc kỹ thuật (Frontend thuần, không backend, SQLite qua sql.js, bảng màu `#ee1d23`, cách quản lý `localStorage` giỏ hàng). |
| **[`PRD.md`](./PRD.md)** | **Tài liệu đặc tả yêu cầu sản phẩm (Product Requirements Document):** Mô tả chi tiết từng màn hình (Trang chủ, Chuyến bay, Chi tiết chuyến bay, Tour, Chi tiết tour, Giỏ hàng), nghiệp vụ lọc dữ liệu và luồng đăng ký. |
| **[`DATABASE.md`](./DATABASE.md)** | **Thiết kế cơ sở dữ liệu SQLite:** Chứa toàn bộ câu lệnh DDL (`CREATE TABLE`), dữ liệu Mock Seed Data (chuyến bay, 8 tour nổi bật tỉ lệ 600x400, các hãng bay, lịch trình chi tiết) và hướng dẫn module `js/db.js`. |
| **[`UI_SPEC.md`](./UI_SPEC.md)** | **Quy chuẩn thiết kế giao diện (UI/UX System):** Bảng mã màu chuẩn Vietjet (`#ee1d23`, `#ffc629`, nền trắng `#ffffff`), thông số font, kích thước thẻ card, bố cục 2 cột, bảng giá 2 hạng vé (Phổ thông vs Thương gia). |
| **[`DEVELOPMENT_TASKS.md`](./DEVELOPMENT_TASKS.md)** | **Lộ trình phát triển & Các câu lệnh Prompt:** Chia nhỏ toàn bộ dự án thành 7 Task rõ ràng. Bạn chỉ cần copy từng đoạn Prompt vào khung chat Antigravity để AI tự động code từng tính năng! |

---

## 2. CẤU TRÚC THƯ MỤC DỰ ÁN

```text
D:\deeno\Vietjet\
├── GEMINI.md               # Quy tắc hoạt động cho Antigravity AI
├── PRD.md                  # Đặc tả yêu cầu tính năng sản phẩm
├── DATABASE.md             # Schema SQLite, Seed Data & Queries
├── UI_SPEC.md              # Hệ thống thiết kế & Style tokens
├── DEVELOPMENT_TASKS.md    # Các mẫu Prompt thực thi theo từng Task
├── README.md               # Hướng dẫn tổng quan dự án
│
├── index.html              # Trang chủ (Tìm kiếm chuyến bay, 8 tour nổi bật, hãng bay)
├── flights.html            # Trang danh sách chuyến bay & bộ lọc 2 cột
├── flight-detail.html      # Trang chi tiết chuyến bay & chọn 2 hạng vé
├── tours.html              # Trang danh sách tour & bộ lọc tour
├── tour-detail.html        # Trang chi tiết tour & timeline lịch trình từng ngày
├── cart.html               # Trang giỏ hàng, thông tin khách hàng & gửi email
│
├── css/
│   ├── style.css           # Biến màu, CSS Reset, Header dính, Footer
│   ├── components.css      # Thẻ Card, Button, Form, Toast, Modal
│   └── responsive.css      # Tối ưu giao diện Mobile & Tablet
│
├── js/
│   ├── db.js               # Khởi tạo SQLite WebAssembly (sql.js) & Mock data
│   ├── main.js             # Badge giỏ hàng header, Toast popup, tiện ích VND
│   ├── flights.js          # Lọc chuyến bay thời gian thực bằng SQLite
│   ├── flight-detail.js    # Chi tiết chuyến bay & thêm vào giỏ hàng
│   ├── tours.js            # Lọc danh sách tour bằng SQLite
│   ├── tour-detail.js      # Chi tiết tour, hiển thị lịch trình & đặt tour
│   └── cart.js             # Quản lý giỏ hàng, form checkout & gửi EmailJS
│
└── image/                  # Tài nguyên hình ảnh có sẵn trong máy
    ├── logo.jpg            # Logo nhận diện thương hiệu Vietjet
    ├── maybay.jpg          # Hình ảnh máy bay làm banner Hero
    └── tiepvien.jpg        # Hình ảnh tiếp viên hàng không Vietjet
```

---

## 3. CÁCH DÙNG BỘ TÀI LIỆU NÀY VỚI ANTIGRAVITY

Bạn có 2 cách cực kỳ tiện lợi để nhờ Antigravity hoàn thiện toàn bộ website:

### Cách 1: Cho Antigravity thực hiện toàn bộ dự án từ A - Z (Khuyên dùng)
Bạn chỉ cần gửi lệnh sau cho Antigravity trong khung chat:
> *"Antigravity, hãy đọc toàn bộ các file `GEMINI.md`, `PRD.md`, `DATABASE.md`, `UI_SPEC.md` và thực hiện lần lượt các task từ Task 1 đến Task 6 trong `DEVELOPMENT_TASKS.md` để hoàn thiện 100% dự án website Vietjet cho tôi."*

### Cách 2: Thực hiện từng Task theo lộ trình kiểm soát chất lượng
Mở file **[`DEVELOPMENT_TASKS.md`](./DEVELOPMENT_TASKS.md)**, copy từng mẫu prompt của từng Task:
1. **Task 1:** Tạo nền tảng CSS, SQLite DB (`js/db.js`) và tiện ích (`js/main.js`).
2. **Task 2:** Tạo Trang Chủ (`index.html`).
3. **Task 3:** Tạo Trang Chuyến Bay & Bộ Lọc (`flights.html`, `js/flights.js`).
4. **Task 4:** Tạo Trang Chi Tiết Chuyến Bay (`flight-detail.html`, `js/flight-detail.js`).
5. **Task 5:** Tạo Trang Tour & Chi Tiết Tour (`tours.html`, `tour-detail.html`).
6. **Task 6:** Tạo Trang Giỏ Hàng, Thanh Toán & Gửi Email (`cart.html`, `js/cart.js`).
7. **Task 7:** Kiểm thử Responsive trên Mobile/Tablet và hoàn thiện.

---

## 4. CẤU HÌNH GỬI EMAIL TỰ ĐỘNG (EMAILJS)

Khi khách hàng bấm **"Đăng Ký & Xác Nhận Đặt Chỗ"** tại `cart.html`, hệ thống sẽ kích hoạt EmailJS gửi thông tin vé từ email `nvhai061993@gmail.com` đến email khách hàng.

Để kích hoạt email gửi thật vào hộp thư:
1. Đăng ký tài khoản miễn phí tại [https://www.emailjs.com](https://www.emailjs.com).
2. Tạo một **Email Service** (kết nối với tài khoản Gmail `nvhai061993@gmail.com`).
3. Tạo một **Email Template** với các biến:
   - `{{to_name}}`: Tên khách hàng.
   - `{{to_email}}`: Email người nhận.
   - `{{from_email}}`: `nvhai061993@gmail.com`.
   - `{{pnr_code}}`: Mã đặt chỗ (PNR).
   - `{{order_details}}`: Bảng chi tiết chuyến bay / tour.
   - `{{total_price}}`: Tổng số tiền thanh toán.
4. Mở file `cart.html` và điền **PUBLIC KEY**, **SERVICE ID**, **TEMPLATE ID** của bạn vào đoạn script EmailJS:
   ```javascript
   emailjs.init("YOUR_PUBLIC_KEY");
   emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", templateParams);
   ```
*(Lưu ý: Nếu chưa cấu hình Key, hệ thống đã tích hợp sẵn cơ chế **Giả lập thông báo thành công (Mock Simulation)**, vẫn hiện Modal mã đặt chỗ PNR và thông báo gửi email đầy đủ để bạn nghiệm thu giao diện mượt mà).*

---

## 5. HƯỚNG DẪN CHẠY DỰ ÁN TRÊN MÁY TÍNH

Do SQLite chạy qua thư viện WebAssembly (`sql.js`), để trình duyệt tải được file `.wasm` không bị giới hạn chính sách bảo mật local:
- **Cách 1 (Khuyên dùng):** Cài extension **Live Server** trong VS Code / Antigravity IDE, sau đó click chuột phải vào `index.html` và chọn **"Open with Live Server"**.
- **Cách 2 (Sử dụng Python / Node.js tiện ích nếu có):**
  - Mở PowerShell tại thư mục dự án và gõ:
    ```powershell
    python -m http.server 8000
    ```
    Sau đó mở trình duyệt truy cập: `http://localhost:8000`.
- **Cách 3 (Chạy trực tiếp file://):** Hệ thống trong file `js/db.js` đã được thiết kế sẵn cơ chế **Fallback dữ liệu mảng**, giúp website vẫn hiển thị danh sách chuyến bay và 8 tour du lịch ngay cả khi bạn chỉ nhấp đúp trực tiếp vào file `index.html`!
