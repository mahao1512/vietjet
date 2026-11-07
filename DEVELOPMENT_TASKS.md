# KẾ HOẠCH PHÁT TRIỂN & CÁC LỆNH PROMPT CHO ANTIGRAVITY (DEVELOPMENT_TASKS.md)

Tài liệu này chứa lộ trình chi tiết từng bước (Tasks) và các mẫu câu lệnh (Prompts) sẵn sàng copy để bạn ra lệnh cho **Antigravity** tự động thực hiện và hoàn thiện dự án website **Vietjet** một cách nhanh chóng, chuẩn xác.

---

## MỤC LỤC CÁC TASK

- [Task 1: Xây dựng nền tảng CSS, Cơ sở dữ liệu SQLite & Tiện ích dùng chung](#task-1-xây-dựng-nền-tảng-css-cơ-sở-dữ-liệu-sqlite--tiện-ích-dùng-chung)
- [Task 2: Hoàn thiện Trang Chủ (index.html)](#task-2-hoàn-thiện-trang-chủ-indexhtml)
- [Task 3: Xây dựng Trang Chuyến Bay & Bộ Lọc Nâng Cao (flights.html)](#task-3-xây-dựng-trang-chuyến-bay--bộ-lọc-nâng-cao-flightshtml)
- [Task 4: Xây dựng Trang Chi Tiết Chuyến Bay & Chọn Hạng Vé (flight-detail.html)](#task-4-xây-dựng-trang-chi-tiết-chuyến-bay--chọn-hạng-vé-flight-detailhtml)
- [Task 5: Xây dựng Trang Tour & Chi Tiết Tour Có Lịch Trình (tours.html & tour-detail.html)](#task-5-xây-dựng-trang-tour--chi-tiết-tour-có-lịch-trình-tourshtml--tour-detailhtml)
- [Task 6: Xây dựng Trang Giỏ Hàng, Thanh Toán & Gửi Email Tự Động (cart.html)](#task-6-xây-dựng-trang-giỏ-hàng-thanh-toán--gửi-email-tự-động-carthtml)
- [Task 7: Kiểm thử toàn diện, Tối ưu Responsive & Đóng gói](#task-7-kiểm-thử-toàn-diện-tối-ưu-responsive--đóng-gói)

---

## TASK 1: XÂY DỰNG NỀN TẢNG CSS, CƠ SỞ DỮ LIỆU SQLITE & TIỆN ÍCH DÙNG CHUNG

### Mục tiêu:
Tạo cấu trúc thư mục, hệ thống CSS biến màu chuẩn Vietjet (`#ee1d23`, nền sáng), file `js/db.js` khởi tạo SQLite client-side bằng `sql.js` nạp đầy đủ dữ liệu giả lập (chuyến bay, 8 tour 600x400, hãng bay) kèm fallback, và file `js/main.js` quản lý giỏ hàng badge, toast thông báo.

### Mẫu câu lệnh (Prompt) gửi Antigravity:
```markdown
Antigravity, hãy thực hiện TASK 1 theo tài liệu GEMINI.md, DATABASE.md và UI_SPEC.md:
1. Tạo thư mục css/ và các file:
   - css/style.css: Thiết lập biến CSS màu sắc chuẩn (#ee1d23, #ffc629, #ffffff, #f8f9fa), reset CSS, style chuẩn cho Header dính (Sticky) có logo image/logo.jpg, Navigation menu, Footer thương hiệu Vietjet.
   - css/components.css: Style các nút bấm (Button Red/Yellow/Outline), thẻ Card, Form input, Select box, Toast notification, Modal popup.
   - css/responsive.css: Cấu hình Media queries cho Tablet (< 992px) và Mobile (< 768px).
2. Tạo thư mục js/ và các file:
   - js/db.js: Tải thư viện sql.js qua CDN WebAssembly. Tạo các bảng 'airlines', 'flights', 'tours' theo đúng schema trong DATABASE.md. Nạp đầy đủ dữ liệu Mock seed data (gồm ít nhất 10 chuyến bay, đúng 8 tour nổi bật với ảnh thumbnail 600x400 và lịch trình chi tiết, danh sách các hãng bay). Có cơ chế Fallback mảng JavaScript nếu chạy file:// offline.
   - js/main.js: Logic dùng chung gồm:
     + Hàm cập nhật số đếm giỏ hàng trên Header từ localStorage ('vietjet_cart').
     + Hàm hiển thị Toast thông báo (Toast success, error).
     + Hàm định dạng tiền tệ VND: formatCurrency(number).
     + Xử lý menu responsive trên thiết bị di động.
```

---

## TASK 2: HOÀN THIỆN TRANG CHỦ (index.html)

### Mục tiêu:
Xây dựng trang chủ hoàn chỉnh, hiện đại với form tìm kiếm chuyến bay thông minh, khu vực hiển thị 8 tour nổi bật, và khối đối tác hàng không tương tác.

### Mẫu câu lệnh (Prompt) gửi Antigravity:
```markdown
Antigravity, hãy thực hiện TASK 2 theo tài liệu PRD.md và UI_SPEC.md:
Xây dựng trang chủ index.html hoàn chỉnh với:
1. Header đồng bộ: Logo image/logo.jpg, menu điều hướng (Trang chủ, Chuyến bay, Tour du lịch), hotline 1900 1886, nút Giỏ hàng có badge số lượng.
2. Hero Section:
   - Sử dụng ảnh nền image/maybay.jpg có overlay mờ sang trọng.
   - Form Tìm kiếm chuyến bay:
     + Radio/Tab: Vé khứ hồi / Vé một chiều (khi chọn một chiều tự disable ngày về).
     + Điểm xuất phát & Điểm đến (Select box sân bay: Hà Nội, TP.HCM, Đà Nẵng, Phú Quốc, Singapore...).
     + Chọn ngày đi, ngày về.
     + Nút "Tìm Kiếm Chuyến Bay" màu đỏ #ee1d23 -> Khi click sẽ chuyển hướng tới flights.html kèm query parameters.
3. Phần Tour Du Lịch Nổi Bật:
   - Hiển thị đúng 8 tour du lịch nổi bật lấy từ SQLite DB (hoặc fallback).
   - Mỗi card tour gồm: Ảnh thumbnail chuẩn 600x400, tên tour, hãng lữ hành, thời lượng số ngày/đêm, giá tiền VND màu đỏ.
   - Click vào card sẽ chuyển hướng tới tour-detail.html?id={id}.
4. Phần Hãng Hàng Không Đối Tác:
   - Hiển thị logo của các hãng: VietJet Air, Vietnam Airlines, Singapore Airlines, Bamboo Airways, Vietravel Airlines.
   - Click vào logo hãng sẽ chuyển hướng tới flights.html?airline={Tên_Hãng}.
5. Khối Banner Dịch Vụ: Tận dụng ảnh image/tiepvien.jpg giới thiệu dịch vụ hàng không tận tâm, chu đáo.
6. Footer đầy đủ thông tin Vietjet, chính sách, hotline.
```

---

## TASK 3: XÂY DỰNG TRANG CHUYẾN BAY & BỘ LỌC NÂNG CAO (flights.html)

### Mục tiêu:
Xây dựng trang danh sách chuyến bay theo bố cục 2 cột, hỗ trợ lọc đa tiêu chí bằng câu truy vấn SQLite client-side theo thời gian thực.

### Mẫu câu lệnh (Prompt) gửi Antigravity:
```markdown
Antigravity, hãy thực hiện TASK 3 theo PRD.md và DATABASE.md:
Tạo trang flights.html và file js/flights.js:
1. Bố cục 2 Cột:
   - Cột Trái (Sidebar Filter):
     + Sắp xếp theo giá: Tăng dần / Giảm dần.
     + Loại vé: Tất cả, Khứ hồi, Một chiều, Bay thẳng, Nhiều thành phố.
     + Hãng hàng không: Checkbox chọn nhiều hãng (VietJet Air, Vietnam Airlines, Singapore Airlines, Bamboo Airways...).
     + Thời gian cất cánh (Giờ): Khung giờ 00:00 - 06:00, 06:00 - 12:00, 12:00 - 18:00, 18:00 - 24:00.
     + Hạng dịch vụ: Phổ thông (Economy), Thương gia (Business).
     + Nút Đặt lại bộ lọc (Reset).
   - Cột Phải (Danh Sách Chuyến Bay):
     + Hiển thị số lượng chuyến bay tìm thấy.
     + Thẻ chuyến bay (Flight Card): Logo hãng, tên hãng, mã chuyến bay, giờ cất cánh - giờ hạ cánh, sân bay đi/đến, thời gian bay, loại máy bay (Airbus/Boeing), tiện ích dịch vụ, giá vé thấp nhất.
     + Nút "Chọn Chuyến Bay" -> chuyển hướng đến flight-detail.html?id={id}.
2. File js/flights.js:
   - Lắng nghe sự kiện thay đổi của các input bộ lọc.
   - Tạo câu truy vấn SQL động SELECT * FROM flights WHERE ... ORDER BY ... thực thi qua SQLite (hoặc filter mảng) và render lại danh sách ngay lập tức không tải lại trang.
   - Đọc các query parameter trên URL (?from=...&to=...&airline=...) để tự động tích chọn bộ lọc ban đầu.
```

---

## TASK 4: XÂY DỰNG TRANG CHI TIẾT CHUYẾN BAY & CHỌN HẠNG VÉ (flight-detail.html)

### Mục tiêu:
Hiển thị thông tin chặng bay chi tiết, cho phép khách hàng so sánh và chọn giữa 2 hạng vé (Phổ thông và Thương gia), sau đó bấm thêm vào giỏ hàng.

### Mẫu câu lệnh (Prompt) gửi Antigravity:
```markdown
Antigravity, hãy thực hiện TASK 4 theo PRD.md, DATABASE.md và UI_SPEC.md:
Tạo file flight-detail.html và js/flight-detail.js:
1. Đọc tham số id chuyến bay từ URL (?id={id}) và truy vấn SQLite DB lấy thông tin chuyến bay tương ứng.
2. Hiển thị thông tin hành trình chi tiết:
   - Điểm đi, điểm đến, mã sân bay, thời gian bay.
   - Hãng hàng không, số hiệu chuyến bay, loại máy bay (Boeing 787, Airbus A321...).
3. Khối So Sánh & Chọn Hạng Vé (2 Card trực quan):
   - Card Hạng Phổ Thông (Economy): Giá vé, 7kg hành lý xách tay, ghế tiêu chuẩn, suất ăn nhẹ.
   - Card Hạng Thương Gia (Business/SkyBoss): Giá vé, phòng chờ VIP, 40kg hành lý, ghế ngồi ngả rộng, suất ăn nóng cao cấp, ưu tiên làm thủ tục.
   - Người dùng có thể click chọn 1 trong 2 hạng vé (có hiệu ứng viền đỏ #ee1d23 khi chọn).
4. Hành động:
   - Nút "Thêm Vào Giỏ Hàng" (Màu đỏ #ee1d23).
   - Khi bấm: Lưu thông tin chuyến bay + hạng vé đã chọn vào localStorage ('vietjet_cart').
   - Cập nhật số badge giỏ hàng trên Header.
   - Hiển thị Toast thông báo "Đã thêm chuyến bay vào giỏ hàng thành công!".
```

---

## TASK 5: XÂY DỰNG TRANG TOUR & CHI TIẾT TOUR CÓ LỊCH TRÌNH (tours.html & tour-detail.html)

### Mục tiêu:
Xây dựng trang danh sách tour có bộ lọc và trang chi tiết tour hiển thị đầy đủ thông tin vận chuyển, loại máy bay và timeline lịch trình từng ngày.

### Mẫu câu lệnh (Prompt) gửi Antigravity:
```markdown
Antigravity, hãy thực hiện TASK 5 theo PRD.md và DATABASE.md:
1. Tạo trang tours.html và js/tours.js:
   - Cột trái: Bộ lọc sắp xếp giá tăng/giảm dần, hãng hàng không đồng hành, thời gian cất cánh (giờ), thời lượng tour.
   - Cột phải: Danh sách các tour du lịch (ảnh thumbnail tỉ lệ 600x400, tên tour, hãng bay, ngày cất cánh, thời gian bay, giá tiền VND, dịch vụ bao gồm).
   - Click chọn tour -> dẫn đến tour-detail.html?id={id}.
2. Tạo trang tour-detail.html và js/tour-detail.js:
   - Hiển thị banner lớn, tên tour, giá tour, điểm đi, điểm đến, thời gian bay, hãng bay đối tác, loại máy bay (Boeing, Airbus...).
   - Khối Lịch trình chuyến đi: Thiết kế dạng Timeline Accordion từng ngày (Ngày 1, Ngày 2, Ngày 3, Ngày 4...) hiển thị các hoạt động chi tiết.
   - Danh sách dịch vụ bao gồm & không bao gồm.
   - Nút "Chọn Tour / Thêm Vào Giỏ Hàng": Lưu tour vào localStorage ('vietjet_cart') và hiện Toast thông báo thành công.
```

---

## TASK 6: XÂY DỰNG TRANG GIỎ HÀNG, THANH TOÁN & GỬI EMAIL TỰ ĐỘNG (cart.html)

### Mục tiêu:
Hoàn thiện trang giỏ hàng với bảng quản lý các vé/tour đã chọn, tính tổng tiền, form thông tin cá nhân và tích hợp gửi email từ `nvhai061993@gmail.com` qua EmailJS kèm thông báo hoàn thành.

### Mẫu câu lệnh (Prompt) gửi Antigravity:
```markdown
Antigravity, hãy thực hiện TASK 6 theo PRD.md và GEMINI.md:
Tạo trang cart.html và file js/cart.js:
1. Bảng Danh Sách Giỏ Hàng:
   - Đọc dữ liệu từ localStorage ('vietjet_cart').
   - Hiển thị danh sách các chuyến bay và tour du lịch đã chọn (tên dịch vụ, phân loại, hạng vé, đơn giá, số lượng, thành tiền).
   - Nút Xóa từng mục và nút "Xóa Toàn Bộ Giỏ Hàng".
   - Tính toán và hiển thị Tổng Số Tiền Thanh Toán.
   - Nếu giỏ hàng trống: Hiển thị thông báo giỏ hàng rỗng và nút quay lại trang chủ.
2. Form Thông Tin Khách Hàng:
   - Họ và tên, Số điện thoại (kiểm tra định dạng 10 số), Email (kiểm tra định dạng email), Địa chỉ, Ghi chú thêm.
3. Quy trình Đăng ký & Gửi Email:
   - Tích hợp CDN EmailJS (@emailjs/browser).
   - Khi bấm "Đăng Ký & Xác Nhận Đặt Chỗ":
     + Kiểm tra tính hợp lệ của dữ liệu form và giỏ hàng.
     + Gửi email xác nhận từ địa chỉ 'nvhai061993@gmail.com' đến email khách hàng vừa nhập (có cấu hình TemplateParams chi tiết, kèm Fallback mô phỏng nếu chưa có Service ID).
     + Hiển thị Modal/Popup thông báo: "Đăng ký thành công! Mã đặt chỗ: VJ-XXXXX. Email xác nhận chi tiết đã được gửi từ nvhai061993@gmail.com đến bạn!".
     + Làm rỗng giỏ hàng localStorage và cập nhật badge header về 0.
```

---

## TASK 7: KIỂM THỬ TOÀN DIỆN, TỐI ƯU RESPONSIVE & ĐÓNG GÓI

### Mục tiêu:
Kiểm tra tính xuyên suốt của toàn bộ luồng người dùng (User Flow), độ tương thích giao diện trên điện thoại di động và máy tính bảng.

### Mẫu câu lệnh (Prompt) gửi Antigravity:
```markdown
Antigravity, hãy thực hiện TASK 7:
1. Rà soát lại tất cả các file HTML, CSS và JavaScript trong dự án.
2. Đảm bảo tông màu trắng sáng, màu chủ đạo đỏ #ee1d23 và vàng #ffc629 hiển thị đồng nhất.
3. Đảm bảo toàn bộ liên kết (Links) giữa các trang:
   - Trang chủ -> Chuyến bay -> Chi tiết chuyến bay -> Giỏ hàng.
   - Trang chủ -> Tour -> Chi tiết tour -> Giỏ hàng.
   - Logo các hãng bay -> Chuyến bay theo hãng.
4. Kiểm tra độ co giãn Responsive trên màn hình Mobile (375px - 414px) và Tablet (768px - 1024px) không bị vỡ layout hay tràn chiều ngang (overflow-x).
5. Đảm bảo code chạy trực tiếp trên trình duyệt mà không cần cài đặt Node.js hay Backend server.
```
