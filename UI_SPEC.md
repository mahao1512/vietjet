# TÀI LIỆU QUY CHUẨN GIAO DIỆN & THIẾT KẾ (UI_SPEC.md)
## DỰ ÁN: CỔNG DU LỊCH & ĐẶT VÉ MÁY BAY VIETJET

---

## 1. HỆ THỐNG MÀU SẮC & THƯƠNG HIỆU (COLOR PALETTE)

Phong cách thiết kế tổng thể: **Sáng sủa, hiện đại, nền trắng tinh tế, điểm nhấn màu đỏ cờ Vietjet (`#ee1d23`) và màu vàng năng động (`#ffc629`)**.

### 1.1. Bảng mã màu chuẩn CSS:
```css
:root {
  /* Màu thương hiệu Vietjet */
  --primary-color: #ee1d23;          /* Đỏ Vietjet nhận diện chính */
  --primary-hover: #c9151a;          /* Đỏ đậm khi di chuột */
  --primary-light: #fff1f1;          /* Đỏ pastel rất nhạt cho tag, badge, hover nền */
  --primary-border: #fca5a5;         /* Viền đỏ nhạt */
  
  --accent-yellow: #ffc629;          /* Vàng Vietjet bổ trợ */
  --accent-yellow-hover: #e5b020;    /* Vàng sẫm khi hover */
  --accent-yellow-light: #fffbeb;

  /* Màu nền & Trung tính */
  --bg-page: #f8f9fa;                /* Nền toàn trang - xám trắng dịu mắt */
  --bg-card: #ffffff;                /* Nền thẻ trắng tinh khiết */
  --bg-muted: #f1f3f5;               /* Nền ô input, thanh lọc phụ */

  /* Màu chữ (Typography) */
  --text-main: #1f2937;              /* Chữ chính: Đen than (Dark Charcoal) */
  --text-muted: #6b7280;             /* Chữ phụ: Xám trung tính */
  --text-sub: #9ca3af;               /* Chữ mờ / placeholder */
  --text-white: #ffffff;

  /* Đường viền & Đổ bóng */
  --border-light: #e5e7eb;
  --border-focus: #ee1d23;
  --shadow-card: 0 4px 12px rgba(0, 0, 0, 0.06);
  --shadow-hover: 0 8px 24px rgba(238, 29, 35, 0.15);
  --shadow-modal: 0 20px 25px -5px rgba(0, 0, 0, 0.2);

  /* Bo góc (Border Radius) */
  --radius-xs: 4px;
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-pill: 999px;
}
```

---

## 2. QUY CHUẨN CÁC THÀNH PHẦN GIAO DIỆN (UI COMPONENTS)

### 2.1. Header & Navigation Bar
- **Vị trí:** Cố định trên cùng (Sticky Header, `position: sticky; top: 0; z-index: 1000;`).
- **Nền:** Trắng (`#ffffff`), đổ bóng nhẹ phía dưới `box-shadow: 0 2px 8px rgba(0,0,0,0.06)`.
- **Cấu trúc:**
  - *Logo:* Đặt ảnh `image/logo.jpg`, chiều cao cố định khoảng 45px - 50px, bo nhẹ viền.
  - *Menu điều hướng:* Căn giữa hoặc trái, font chữ đậm vừa (`font-weight: 600`), link active có gạch chân đỏ hoặc màu chữ đỏ `#ee1d23`.
  - *Hotline & Giỏ hàng:* Đặt bên phải:
    - Hotline: Nút viền vàng/đỏ dạng viên thuốc (Pill shape) `1900 1886`.
    - Giỏ hàng: Nút nền đỏ `#ee1d23`, icon giỏ hàng màu trắng kèm Badge tròn màu vàng `#ffc629` chữ đen/đỏ đếm số mục hiện có.

---

### 2.2. Khối Hero Tìm Kiếm Chuyến Bay (Trang Chủ)
- **Hình nền:** Sử dụng `image/maybay.jpg` với lớp phủ tối mỏng gradient (overlay).
- **Hộp tìm kiếm (Search Box):**
  - Đặt nổi bật giữa khung hình, bo góc lớn `border-radius: 16px`, nền trắng tinh khiết, đổ bóng sâu sang trọng.
  - **Tabs chọn loại vé:**
    - Tab "Vé khứ hồi" & Tab "Vé một chiều" dạng pill nút gạt hoặc radio button phong cách hiện đại.
  - **Hàng trường nhập liệu:**
    - Điểm khởi hành (Select box có icon máy bay cất cánh).
    - Biểu tượng mũi tên hai chiều đảo vị trí điểm đi/đến.
    - Điểm đến (Select box có icon máy bay hạ cánh).
    - Ngày đi (Date picker).
    - Ngày về (Date picker - có hiệu ứng làm mờ và disable khi chọn Vé một chiều).
    - Số lượng hành khách (Dropdown chọn Người lớn / Trẻ em).
  - **Nút CTA "Tìm Kiếm":** Nền đỏ rực rỡ, icon kính lúp, hiệu ứng hover nhấc nổi nhẹ (`transform: translateY(-2px)`).

---

### 2.3. Thẻ Tour Du Lịch (Tour Card - Trang Chủ & Danh Sách Tour)
- **Tỉ lệ hình ảnh:** Bắt buộc chuẩn **600x400** (Aspect ratio 3:2), bo góc trên thẻ `border-radius: 12px 12px 0 0`, hiệu ứng zoom nhẹ ảnh khi hover (`transform: scale(1.05)`).
- **Thành phần trên thẻ:**
  - *Huy hiệu nổi bật (Badge):* Đặt góc trên bên trái ảnh (VD: "Vietjet Ưu Đãi" nền đỏ chữ trắng).
  - *Thời lượng:* Đặt góc trên bên phải ảnh (VD: "4N3Đ" nền đen mờ bo tròn).
  - *Tên hãng lữ hành:* Kèm icon xác minh (VD: Vietjet Travel).
  - *Tiêu đề tour:* Font chữ 16px - 18px, đậm, giới hạn 2 dòng (ellipsis).
  - *Thông tin phụ:* Hãng bay vận chuyển (VietJet Air) + Nơi xuất phát.
  - *Mức giá:* Hiển thị lớn màu đỏ `#ee1d23` đậm nét (VD: `4.590.000 ₫`).
  - *Nút xem chi tiết:* Nút outline hoặc nền vàng/đỏ bo góc.

---

### 2.4. Khối Đối Tác Hàng Không (Airline Partners)
- Nền khối: Màu xám trắng dịu nhẹ (`#f8f9fa`).
- Card hãng: Hiển thị logo của các hãng (VietJet Air, Vietnam Airlines, Singapore Airlines, Bamboo Airways...) trong ô trắng bo tròn có viền mỏng.
- Hiệu ứng: Khi di chuột vào logo hãng, ô nổi lên nhẹ và hiện viền đỏ `#ee1d23`, kích thích người dùng bấm vào xem chuyến bay.

---

### 2.5. Bố Cục 2 Cột (Trang Chuyến Bay & Danh Sách Tour)
- **Cột Trái (Bộ lọc - Sidebar):**
  - Chiều rộng cố định: 280px - 300px trên màn hình máy tính.
  - Nền trắng, viền xám mỏng, bo góc `12px`, dính theo cuộn trang (Sticky).
  - Phân khu bộ lọc bằng các đường kẻ mờ hoặc accordion đóng/mở.
  - Checkbox tùy biến kiểu hiện đại có màu active đỏ `#ee1d23`.
- **Cột Phải (Danh sách kết quả):**
  - Chiều rộng: Chiếm toàn bộ phần còn lại (Flex-1).
  - Tiêu đề tóm tắt: "Tìm thấy X chuyến bay / tour phù hợp".
  - Danh sách thẻ sản phẩm xếp dọc theo dạng danh sách (List item card) đối với chuyến bay, và dạng lưới (Grid) đối với Tour.

---

### 2.6. Thẻ Chuyến Bay (Flight Card)
- **Thiết kế dạng hàng ngang (Horizontal Card):**
  - *Cột 1 (Hãng bay):* Logo hãng, tên hãng, số hiệu chuyến bay (`VJ-182`), loại tàu bay (`Airbus A321neo`).
  - *Cột 2 (Hành trình thời gian):*
    - Giờ đi (`08:15`) - Tên sân bay (`HAN`).
    - Đường bay đồ họa: Đoạn kẻ nối có icon máy bay ở giữa và ghi chú thời gian bay (`2h 10m`) kèm nhãn `Bay thẳng`.
    - Giờ đến (`10:25`) - Tên sân bay (`SGN`).
  - *Cột 3 (Dịch vụ):* Các icon nhỏ hiển thị hành lý xách tay 7kg, nước suối.
  - *Cột 4 (Giá & Nút đặt):*
    - Giá khởi điểm (Chữ số đỏ to, rõ ràng).
    - Nút **"Chọn Chuyến Bay"** màu đỏ nổi bật.

---

### 2.7. Khối So Sánh & Chọn Hạng Vé (Trang Chi Tiết Chuyến Bay)
Trình bày dưới dạng **2 Card so sánh đặt cạnh nhau** (Side-by-side):

1. **Card Hạng Phổ Thông (Economy Class):**
   - Viền xám trung tính, tiêu đề màu xám than.
   - Giá vé phổ thông (Ví dụ: `1.290.000 ₫`).
   - Danh sách tính năng (Dấu tích xanh):
     - 07kg hành lý xách tay.
     - Suất ăn nhẹ/nước suối tiêu chuẩn.
     - Ghế ngồi tiêu chuẩn thoải mái.
     - Thay đổi ngày bay (có tính phí chênh lệch).
   - Nút chọn hạng Phổ thông.

2. **Card Hạng Thương Gia (Business / SkyBoss Class):**
   - Viền đỏ viền vàng ánh kim sang trọng, có nhãn "Đề xuất / Phổ biến nhất".
   - Giá vé thương gia (Ví dụ: `3.850.000 ₫`).
   - Danh sách tính năng cao cấp:
     - Miễn phí phòng chờ thương gia VIP Lounge sang trọng.
     - Ưu tiên làm thủ tục check-in tại quầy riêng, lối đi ưu tiên.
     - 40kg hành lý ký gửi + 10kg hành lý xách tay.
     - Ghế ngồi khoang riêng êm ái, ngả lưng tối đa.
     - Phục vụ suất ăn nóng cao cấp không giới hạn và đồ uống hảo hạng.
   - Nút chọn hạng Thương gia nổi bật màu đỏ.

---

### 2.8. Lịch Trình Tour (Timeline Accordion - Trang Chi Tiết Tour)
- Sử dụng đường kẻ dọc màu đỏ nhạt với các nút tròn đánh số Ngày 1, Ngày 2, Ngày 3, Ngày 4.
- Mỗi ngày có tiêu đề chặng hành trình và mô tả chi tiết buổi sáng / trưa / tối.
- Có thể bấm mở rộng / thu gọn từng ngày để xem lịch trình.

---

### 2.9. Bảng Giỏ Hàng & Form Thanh Toán (`cart.html`)
- **Bảng tóm tắt:**
  - Header bảng màu đỏ nhạt hoặc xám.
  - Hiển thị rõ ảnh/icon, tên vé hoặc tour, phân loại, giá tiền, số lượng.
  - Icon thùng rác màu đỏ có tooltip xác nhận xóa.
- **Form đăng ký cá nhân:**
  - Thiết kế 2 cột: Cột Họ tên, Cột Số điện thoại; Cột Email, Cột Địa chỉ; Dưới cùng là Ghi chú hành trình.
  - Báo lỗi realtime viền đỏ nếu nhập sai định dạng.
- **Hộp thoại Hoàn Thành (Success Modal):**
  - Xuất hiện với hiệu ứng phóng to nhẹ (Scale-in).
  - Biểu tượng dấu tích xanh tròn lớn sinh động.
  - Mã đặt chỗ nổi bật (Ví dụ: `Mã PNR: VJ-78923`).
  - Thông báo: *"Đơn hàng đã được xác nhận thành công! Email chi tiết đã được gửi từ nvhai061993@gmail.com tới email của bạn."*
  - Nút quay về trang chủ.
