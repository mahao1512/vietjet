# TÀI LIỆU YÊU CẦU DỰ ÁN (PRD - PRODUCT REQUIREMENTS DOCUMENT)
## DỰ ÁN: WEBSITE DU LỊCH & ĐẶT VÉ MÁY BAY VIETJET

---

## 1. THÔNG TIN CHUNG
- **Tên sản phẩm:** Vietjet Travel & Booking Portal
- **Mã dự án:** VJ-FRONTEND-2026
- **Khách hàng mục tiêu:** Khách du lịch nội địa và quốc tế, người có nhu cầu săn vé máy bay giá tốt và tour du lịch trọn gói chất lượng cao.
- **Màu sắc chủ đạo:** 
  - Nền trang web: Màu trắng sáng (#ffffff) và xám nhạt (#f8f9fa).
  - Màu sắc nhận diện: Màu đỏ Vietjet đặc trưng (`#ee1d23`), màu vàng bổ trợ (`#ffc629`).
- **Nền tảng kỹ thuật:** Frontend tĩnh thuần (Pure HTML5, CSS3, Vanilla JavaScript), SQLite chạy Client-side qua WebAssembly (`sql.js`), dịch vụ gửi email tự động `EmailJS`. Không sử dụng máy chủ Backend.

---

## 2. KIẾN TRÚC VÀ CÁC TRANG CỦA HỆ THỐNG

Hệ thống bao gồm 6 màn hình chức năng chính:
1. **Trang Chủ (`index.html`):** Tìm kiếm hành trình bay, hiển thị 8 tour nổi bật, các hãng hàng không liên kết.
2. **Trang Chuyến Bay (`flights.html`):** Bộ lọc đa năng bên trái, danh sách chuyến bay bên phải.
3. **Trang Chi Tiết Chuyến Bay (`flight-detail.html`):** Thông tin hành trình bay, loại máy bay, so sánh và chọn hạng vé (Phổ thông / Thương gia), nút thêm vào giỏ.
4. **Trang Danh Sách Tour (`tours.html`):** Bộ lọc giá, hãng bay, giờ bay bên trái, danh sách tour bên phải.
5. **Trang Chi Tiết Tour (`tour-detail.html`):** Thông tin điểm đi/đến, thời gian, hãng bay, loại phi cơ, lịch trình chi tiết theo ngày, đặt tour.
6. **Trang Giỏ Hàng & Xác Nhận Đặt Chỗ (`cart.html`):** Quản lý giỏ hàng, form thông tin người đặt vé, thông báo đăng ký thành công, gửi email tự động từ `nvhai061993@gmail.com`.

---

## 3. CHI TIẾT ĐẶC TẢ TỪNG MÀN HÌNH

### 3.1. TRANG CHỦ (`index.html`)

#### A. Header & Thanh Điều Hướng (Navigation Bar)
- **Logo:** Logo Vietjet chính hãng (dùng file `image/logo.jpg`).
- **Menu chính:**
  - *Trang chủ* (`index.html`) - Active state
  - *Chuyến bay* (`flights.html`)
  - *Tour du lịch* (`tours.html`)
- **Khối Tiện ích:**
  - Icon Hotline: `1900 1886`
  - Nút **Giỏ hàng** (`cart.html`) có Badge hiển thị số lượng vé/tour đang chọn (`0`, `1`, `2`...).

#### B. Khối Tìm Kiếm Chuyến Bay (Hero Search Widget)
- Nằm nổi bật trên ảnh nền máy bay (`image/maybay.jpg`) với hiệu ứng overlay nhẹ.
- **Loại vé (Radio Button):** 
  - `Vé khứ hồi` (Mặc định).
  - `Vé một chiều`.
- **Trường nhập thông tin:**
  - `Điểm xuất phát`: Danh sách chọn các sân bay lớn (Hà Nội - HAN, TP.HCM - SGN, Đà Nẵng - DAD, Nha Trang - CXR, Phú Quốc - PQC, Singapore - SIN, Tokyo - NRT...).
  - `Điểm đến`: Danh sách chọn sân bay đích tương ứng.
  - `Ngày đi`: Bộ chọn ngày (Datepicker) - mặc định là ngày hôm sau.
  - `Ngày về`: Bộ chọn ngày - tự động disabled nếu khách hàng chọn `Vé một chiều`.
  - `Hành khách`: Chọn số lượng người lớn, trẻ em.
- **Nút hành động:**
  - Nút **"Tìm Kiếm Chuyến Bay"** (Màu đỏ `#ee1d23`, hover đổi màu).
  - Khi click: Lưu các tham số tìm kiếm vào `sessionStorage` và chuyển hướng sang `flights.html?from=...&to=...&type=...&depart=...&return=...`.

#### C. Khối Tour Du Lịch Nổi Bật (Featured Tours)
- **Tiêu đề khối:** "Tour Du Lịch Hấp Dẫn Dành Riêng Cho Bạn" kèm phụ đề giới thiệu.
- **Số lượng hiển thị:** Đúng **8 Tour du lịch nổi bật** (Grid layout 4 cột trên desktop, 2 cột trên tablet, 1 cột trên mobile).
- **Thông tin trên mỗi Card Tour:**
  - Hình ảnh thumbnail chuẩn tỉ lệ **600x400** (sử dụng ảnh du lịch biển, danh lam thắng cảnh sống động).
  - Badge nhãn: "Bán chạy nhất" hoặc "Ưu đãi Vietjet".
  - Tên tour du lịch (Ví dụ: *Tour Đà Nẵng - Hội An - Cầu Vàng Bà Nà Hills 4N3Đ*).
  - Hãng lữ hành tổ chức (Ví dụ: *Vietjet Travel*, *Saigontourist*, *Vietravel*).
  - Thời lượng: Số ngày / đêm (Ví dụ: `4 ngày 3 đêm`, `3 ngày 2 đêm`).
  - Giá tour: Hiển thị giá nổi bật màu đỏ (Ví dụ: `4.590.000 ₫`).
  - Nút/Link: Click vào card hoặc nút "Xem Chi Tiết" sẽ chuyển hướng đến `tour-detail.html?id={id}`.

#### D. Khối Đối Tác Hàng Không (Airline Partners)
- **Tiêu đề:** "Các Hãng Hàng Không Đồng Hành".
- **Nội dung:** Danh sách các hãng bay hàng đầu:
  1. VietJet Air (VJ)
  2. Vietnam Airlines (VN)
  3. Singapore Airlines (SQ)
  4. Bamboo Airways (QH)
  5. Vietravel Airlines (VU)
  6. Qatar Airways (QR)
- **Hành vi tương tác:** 
  - Hiển thị logo sắc nét, hiệu ứng grayscale -> full color khi hover.
  - Khi click vào bất kỳ logo nào, lập tức chuyển hướng người dùng đến trang `flights.html?airline={Tên_Hãng}` với bộ lọc hãng bay đã được chọn sẵn.

#### E. Footer Trang Web
- Thông tin thương hiệu Vietjet, địa chỉ trụ sở, tổng đài hỗ trợ 24/7.
- Liên kết điều hướng chính sách, quy định hành lý, hướng dẫn thanh toán.
- Bản quyền: `© 2026 Vietjet Aviation Joint Stock Company. All rights reserved.`

---

### 3.2. TRANG CHUYẾN BAY (`flights.html`)

Layout 2 cột (Desktop) và Responsive linh hoạt trên thiết bị di động:

#### A. Cột Trái (Bộ Lọc Filter Sidebar)
- **Sắp xếp theo giá:**
  - Giá tăng dần (Mặc định).
  - Giá giảm dần.
  - Thời gian cất cánh sớm nhất.
- **Loại vé:**
  - Tất cả.
  - Vé khứ hồi.
  - Vé một chiều.
  - Bay thẳng (Direct flight).
  - Nhiều thành phố (Multi-city).
- **Hãng hàng không:** Checkbox cho phép chọn một hoặc nhiều hãng:
  - [x] VietJet Air
  - [ ] Vietnam Airlines
  - [ ] Singapore Airlines
  - [ ] Bamboo Airways
- **Thời gian cất cánh (Khung giờ):**
  - Sáng sớm (00:00 - 06:00)
  - Buổi sáng (06:00 - 12:00)
  - Buổi chiều (12:00 - 18:00)
  - Buổi tối (18:00 - 24:00)
- **Hạng dịch vụ:**
  - Hạng Phổ Thông (Economy)
  - Hạng Thương Gia (Business / SkyBoss)
- **Nút "Đặt lại bộ lọc" (Reset):** Trả bộ lọc về mặc định.

#### B. Cột Phải (Danh Sách Chuyến Bay)
- Thanh trạng thái tóm tắt: Hành trình tìm kiếm (VD: *Hà Nội (HAN) ➔ TP.HCM (SGN)*) và số lượng chuyến bay tìm thấy.
- **Mỗi thẻ chuyến bay (Flight Card) bao gồm:**
  - Logo và tên hãng hàng không.
  - Khung thời gian: Giờ cất cánh (Sân bay đi) ➔ Giờ hạ cánh (Sân bay đến).
  - Thời gian bay dự kiến (VD: `2 giờ 10 phút`) và nhãn `Bay thẳng` (Direct).
  - Thông tin máy bay (Airbus A321, Boeing 787...).
  - Dịch vụ bao gồm cơ bản: Hành lý xách tay 7kg, nước uống.
  - Giá vé tốt nhất (Màu đỏ đậm).
  - Nút **"Chọn Chuyến Bay"**: Nhấn vào sẽ chuyển sang `flight-detail.html?id={id}`.

---

### 3.3. TRANG CHI TIẾT CHUYẾN BAY (`flight-detail.html`)

- Nhận `id` từ tham số URL (`?id=...`). Truy vấn SQLite DB để lấy đầy đủ chi tiết chuyến bay.
- **Thông tin tổng quan hành trình:**
  - Điểm khởi hành (Tên sân bay, thành phố, nhà ga).
  - Điểm đến (Tên sân bay, thành phố, nhà ga).
  - Ngày khởi hành và khung giờ bay chi tiết.
  - Hãng bay khai thác & Mã hiệu chuyến bay (VD: *VJ-182*).
  - Loại máy bay chi tiết (Ví dụ: *Airbus A321-200*, *Boeing 787-9 Dreamliner*).
- **Bảng so sánh và chọn Hạng Giá Vé (Pricing Class Options):**
  - **Hạng Phổ Thông (Economy Class):**
    - Giá vé cơ bản (VD: `1.290.000 ₫`).
    - Dịch vụ đi kèm: 07kg hành lý xách tay, ghế tiêu chuẩn, hoàn/đổi vé mất phí theo quy định.
    - Radio / Nút chọn hạng này.
  - **Hạng Thương Gia (Business / SkyBoss Class):**
    - Giá vé cao cấp (VD: `3.850.000 ₫`).
    - Đặc quyền dịch vụ: Phòng chờ thương gia VIP miễn phí, ưu tiên làm thủ tục tại quầy riêng, 40kg hành lý ký gửi + 10kg xách tay, ghế ngồi ngả rộng rãi, miễn phí suất ăn nóng cao cấp và đồ uống trên máy bay.
    - Radio / Nút chọn hạng này.
- **Hành động Đặt vé:**
  - Nút **"Thêm Vào Giỏ Hàng"** / **"Đặt Vé Ngay"**.
  - Xử lý: Đóng gói đối tượng vé vào mảng trong `localStorage` (`vietjet_cart`), hiển thị thông báo Toast xanh "Đã thêm chuyến bay vào giỏ hàng thành công!", cập nhật số đếm giỏ hàng trên Header.

---

### 3.4. TRANG DANH SÁCH TOUR DU LỊCH (`tours.html`)

- Layout 2 cột tương tự trang chuyến bay:
- **Cột Trái (Bộ lọc Tour):**
  - Sắp xếp giá: Giá từ thấp đến cao / Giá từ cao đến thấp.
  - Hãng hàng không bay kèm tour: Lọc theo VietJet Air, Vietnam Airlines, Bamboo Airways...
  - Thời gian cất cánh (Khung giờ khởi hành của chuyến bay trong tour).
- **Cột Phải (Danh sách Tour):**
  - Thẻ Tour chuẩn mực:
    - Ảnh thumbnail tỉ lệ 600x400.
    - Tiêu đề tour đầy đủ.
    - Hãng hàng không vận chuyển & Ngày cất cánh.
    - Thời gian bay và tổng số ngày tour (VD: *4 Ngày 3 Đêm*).
    - Các dịch vụ bao gồm: Khách sạn 4 sao, bữa ăn trọn gói, bảo hiểm 100.000.000đ, hướng dẫn viên nhiệt tình.
    - Mức giá tour trọn gói.
    - Nút **"Xem Chi Tiết Tour"** -> Chuyển hướng tới `tour-detail.html?id={id}`.

---

### 3.5. TRANG CHI TIẾT TOUR DU LỊCH (`tour-detail.html`)

- Nhận `id` từ URL query (`?id=...`).
- **Thông tin tổng quan tour:**
  - Tên tour, mã tour, điểm khởi hành, điểm đến.
  - Hãng hàng không phục vụ chặng bay của tour (Logo & Tên hãng).
  - Loại máy bay chuyên chở (Airbus A321 / Boeing 787).
  - Thời gian bay và số ngày đêm của chuyến đi.
- **Lịch trình chuyến đi chi tiết (Day-by-Day Itinerary Timeline):**
  - Trình bày dạng timeline từng ngày chuyên nghiệp:
    - *Ngày 1:* Khởi hành từ sân bay, đón khách tại điểm đến, nhận phòng khách sạn, tham quan danh thắng buổi chiều, ăn tối đặc sản.
    - *Ngày 2:* Khám phá các địa danh biểu tượng, trải nghiệm văn hóa địa phương.
    - *Ngày 3:* Vui chơi giải trí tự do, mua sắm quà lưu niệm.
    - *Ngày 4:* Trả phòng khách sạn, ra sân bay làm thủ tục chuyến bay về, kết thúc hành trình.
- **Chính sách tour:**
  - Giá bao gồm: Vé máy bay khứ hồi, khách sạn tiêu chuẩn, các bữa ăn theo chương trình, vé tham quan, bảo hiểm.
  - Giá không bao gồm: Chi phí cá nhân, tiền tip.
- **Hành động Đặt Tour:**
  - Chọn số lượng hành khách.
  - Nút **"Chọn Tour & Thêm Vào Giỏ Hàng"** -> Lưu thông tin tour vào `localStorage` -> Hiện Toast thông báo.

---

### 3.6. TRANG GIỎ HÀNG & XÁC NHẬN ĐĂNG KÝ (`cart.html`)

#### A. Bảng Danh Sách Mục Đã Chọn (Cart Items Table)
- Liệt kê đầy đủ các Chuyến bay và Tour khách hàng đã thêm vào giỏ.
- Mỗi hàng gồm:
  - Loại dịch vụ (Badge nhãn: *Chuyến bay* hoặc *Tour du lịch*).
  - Tên dịch vụ / Chi tiết hành trình.
  - Hãng bay & Hạng vé.
  - Đơn giá & Số lượng.
  - Thành tiền.
  - Nút **Xóa (Icon thùng rác)** để gỡ bỏ từng mục.
- Bên dưới có nút **"Xóa Toàn Bộ Giỏ Hàng"** (Xóa sạch `localStorage` và làm mới giao diện).
- **Tổng tiền thanh toán:** Tính tổng cộng toàn bộ đơn hàng nổi bật bằng chữ số lớn màu đỏ.

#### B. Form Nhập Thông Tin Khách Hàng (Customer Form)
Giao diện nhập liệu chỉn chu gồm các trường:
- `Họ và tên` (Bắt buộc, chữ in hoa hoặc chữ thường chuẩn).
- `Số điện thoại` (Bắt buộc, kiểm tra định dạng 10 số di động Việt Nam).
- `Email nhận vé` (Bắt buộc, kiểm tra định dạng email hợp lệ).
- `Địa chỉ liên hệ` (Tùy chọn).
- `Ghi chú thêm` (Yêu cầu hỗ trợ, hành lý thêm, ăn kiêng...).

#### C. Nút Hành Động "Đăng Ký & Xác Nhận Đặt Chỗ"
Khi người dùng bấm nút:
1. Thực hiện kiểm tra (Validate) dữ liệu form:
   - Nếu giỏ hàng trống: Báo lỗi "Giỏ hàng của bạn đang trống!".
   - Nếu chưa nhập đủ thông tin hoặc sai email/SĐT: Báo lỗi tại trường tương ứng.
2. Khi dữ liệu hợp lệ:
   - **Gửi Email tự động qua EmailJS:**
     - Người gửi cấu hình: `nvhai061993@gmail.com`
     - Người nhận: Email khách hàng đã nhập.
     - Nội dung email: Danh sách các chuyến bay/tour đã đặt, họ tên người đặt, tổng số tiền và mã đơn hàng (Mã PNR ngẫu nhiên, ví dụ: `VJ-98472`).
   - **Hiển thị Modal/Popup Hoàn Thành:**
     - Thông báo chúc mừng khách hàng đã đặt chỗ thành công.
     - Hiển thị tóm tắt mã đặt chỗ và thông báo: *"Một email xác nhận chi tiết đã được gửi từ nvhai061993@gmail.com đến địa chỉ của bạn!"*.
   - **Dọn dẹp:**
     - Xóa dữ liệu giỏ hàng trong `localStorage`.
     - Cập nhật số badge giỏ hàng trên Header về 0.
