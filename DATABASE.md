# TÀI LIỆU THIẾT KẾ CƠ SỞ DỮ LIỆU SQLITE (DATABASE.MD)
## CÔNG NGHỆ: SQLITE CLIENT-SIDE VIA SQL.JS (WEBASSEMBLY)

---

## 1. TỔNG QUAN KIẾN TRÚC DỮ LIỆU

Trong dự án Vietjet, website hoạt động hoàn toàn ở phía Frontend (không có backend server). Cơ sở dữ liệu quan hệ **SQLite** được tải và chạy trực tiếp ngay trong bộ nhớ của trình duyệt (In-Memory Database) thông qua công nghệ **WebAssembly** với thư viện **sql.js**.

- **CDN Thư viện:**
  - File JS: `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.8.0/sql-wasm.js`
  - File WASM: `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.8.0/sql-wasm.wasm`
- **Cơ chế lưu trữ:**
  - Dữ liệu tĩnh (Chuyến bay, Tour, Hãng hàng không): Được nạp từ Mock Data khi khởi tạo DB.
  - Dữ liệu giỏ hàng (Cart): Lưu trữ trong `localStorage` để duy trì phiên làm việc giữa các trang HTML.
  - Dự phòng Offline/File protocol: Có sẵn mảng dữ liệu dự phòng (Array Fallback) để đảm bảo nếu mở file HTML trực tiếp qua giao thức `file://` bị chặn nạp WASM do CORS thì trang web vẫn lọc và hiển thị 100% dữ liệu mượt mà.

---

## 2. LƯỢC ĐỒ QUAN HỆ & CẤU TRÚC BẢNG (SCHEMAS)

### 2.1. Bảng `airlines` (Các Hãng Hàng Không Đối Tác)
```sql
CREATE TABLE airlines (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    code TEXT UNIQUE NOT NULL,      -- Mã hãng: VJ, VN, SQ, QH, VU
    name TEXT NOT NULL,             -- Tên hãng: VietJet Air, Vietnam Airlines, Singapore Airlines...
    logo TEXT NOT NULL,             -- Đường dẫn ảnh logo hoặc SVG
    rating REAL DEFAULT 4.8,        -- Đánh giá sao (1.0 - 5.0)
    country TEXT NOT NULL           -- Quốc gia
);
```

### 2.2. Bảng `flights` (Danh Sách Chuyến Bay)
```sql
CREATE TABLE flights (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    airline_code TEXT NOT NULL,          -- Mã hãng (Khóa ngoại logic tới airlines)
    airline_name TEXT NOT NULL,          -- Tên hãng bay
    flight_number TEXT NOT NULL,         -- Mã chuyến bay: VJ-182, VN-210...
    from_city TEXT NOT NULL,             -- Thành phố đi (Ví dụ: Hà Nội)
    from_code TEXT NOT NULL,             -- Mã sân bay đi: HAN
    to_city TEXT NOT NULL,               -- Thành phố đến (Ví dụ: TP.Hồ Chí Minh)
    to_code TEXT NOT NULL,               -- Mã sân bay đến: SGN
    depart_time TEXT NOT NULL,           -- Giờ cất cánh (Định dạng HH:mm, ví dụ: '08:15')
    arrive_time TEXT NOT NULL,           -- Giờ hạ cánh (Định dạng HH:mm, ví dụ: '10:30')
    duration TEXT NOT NULL,              -- Thời gian bay (Ví dụ: '2 giờ 15 phút')
    flight_type TEXT DEFAULT 'one_way',  -- 'one_way' (Một chiều) hoặc 'round_trip' (Khứ hồi)
    is_direct INTEGER DEFAULT 1,         -- 1: Bay thẳng, 0: Quá cảnh / Nhiều thành phố
    aircraft_type TEXT NOT NULL,         -- Loại máy bay: Airbus A321neo, Boeing 787-9...
    price_economy INTEGER NOT NULL,      -- Giá vé Phổ thông (VNĐ)
    price_business INTEGER NOT NULL,     -- Giá vé Thương gia (VNĐ)
    time_slot TEXT NOT NULL,             -- 'early' (00-06h), 'morning' (06-12h), 'afternoon' (12-18h), 'evening' (18-24h)
    services_economy TEXT,               -- Mô tả dịch vụ phổ thông
    services_business TEXT               -- Mô tả dịch vụ thương gia
);
```

### 2.3. Bảng `tours` (Danh Sách Tour Du Lịch)
```sql
CREATE TABLE tours (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,                 -- Tên tour du lịch
    thumbnail TEXT NOT NULL,             -- Ảnh đại diện tỉ lệ 600x400
    agency_name TEXT NOT NULL,           -- Hãng lữ hành: Vietjet Travel, Vietravel...
    duration TEXT NOT NULL,              -- Số ngày/đêm: '4 Ngày 3 Đêm', '3 Ngày 2 Đêm'...
    days_count INTEGER NOT NULL,         -- Số ngày để lọc (ví dụ 4)
    from_city TEXT NOT NULL,             -- Nơi xuất phát (Hà Nội, TP.HCM, Đà Nẵng...)
    destination TEXT NOT NULL,           -- Điểm đến (Đà Nẵng, Phú Quốc, Nha Trang, Bangkok...)
    airline_partner TEXT NOT NULL,       -- Hãng bay vận chuyển: VietJet Air, Vietnam Airlines...
    aircraft_type TEXT NOT NULL,         -- Loại máy bay
    depart_hour TEXT NOT NULL,           -- Giờ cất cánh: '07:30'
    time_slot TEXT NOT NULL,             -- 'early', 'morning', 'afternoon', 'evening'
    flight_duration TEXT NOT NULL,       -- Thời gian bay: '1 giờ 20 phút'
    price INTEGER NOT NULL,              -- Giá tour trọn gói (VNĐ)
    is_featured INTEGER DEFAULT 0,       -- 1: Nổi bật ở trang chủ (chọn 8 tour), 0: Thường
    services_included TEXT NOT NULL,     -- Danh sách dịch vụ bao gồm
    itinerary_json TEXT NOT NULL         -- Lịch trình JSON các ngày (Day 1, Day 2...)
);
```

---

## 3. DỮ LIỆU KHỞI TẠO (MOCK SEED DATA)

### 3.1. Dữ liệu Hãng hàng không (`airlines`)
```sql
INSERT INTO airlines (code, name, logo, rating, country) VALUES
('VJ', 'VietJet Air', 'image/logo.jpg', 4.8, 'Việt Nam'),
('VN', 'Vietnam Airlines', 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=100&auto=format&fit=crop&q=60', 4.9, 'Việt Nam'),
('SQ', 'Singapore Airlines', 'https://images.unsplash.com/photo-1556388158-158ea5caac53?w=100&auto=format&fit=crop&q=60', 5.0, 'Singapore'),
('QH', 'Bamboo Airways', 'https://images.unsplash.com/photo-1517479149777-5f3b1511d5ad?w=100&auto=format&fit=crop&q=60', 4.7, 'Việt Nam'),
('VU', 'Vietravel Airlines', 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=100&auto=format&fit=crop&q=60', 4.6, 'Việt Nam');
```

### 3.2. Dữ liệu Chuyến bay mẫu (`flights`)
```sql
INSERT INTO flights (airline_code, airline_name, flight_number, from_city, from_code, to_city, to_code, depart_time, arrive_time, duration, flight_type, is_direct, aircraft_type, price_economy, price_business, time_slot, services_economy, services_business) VALUES
('VJ', 'VietJet Air', 'VJ-182', 'Hà Nội', 'HAN', 'TP.Hồ Chí Minh', 'SGN', '06:15', '08:25', '2 giờ 10 phút', 'one_way', 1, 'Airbus A321neo', 1190000, 3290000, 'morning', '7kg hành lý xách tay, nước suối', 'Phòng chờ SkyBoss, 40kg hành lý, ăn nóng miễn phí, ghế ngả rộng'),
('VJ', 'VietJet Air', 'VJ-186', 'Hà Nội', 'HAN', 'TP.Hồ Chí Minh', 'SGN', '09:30', '11:45', '2 giờ 15 phút', 'one_way', 1, 'Airbus A321neo', 1350000, 3450000, 'morning', '7kg hành lý xách tay, nước suối', 'Phòng chờ SkyBoss, 40kg hành lý, ăn nóng miễn phí, ưu tiên làm thủ tục'),
('VN', 'Vietnam Airlines', 'VN-210', 'Hà Nội', 'HAN', 'TP.Hồ Chí Minh', 'SGN', '08:00', '10:15', '2 giờ 15 phút', 'one_way', 1, 'Boeing 787-9 Dreamliner', 1890000, 4890000, 'morning', '12kg xách tay + 23kg ký gửi, suất ăn nóng', 'Phòng chờ Bông Sen VIP, 40kg ký gửi, ghế nằm 180 độ, ẩm thực 5 sao'),
('SQ', 'Singapore Airlines', 'SQ-175', 'Hà Nội', 'HAN', 'Singapore', 'SIN', '12:35', '17:15', '3 giờ 40 phút', 'one_way', 1, 'Airbus A350-900', 3250000, 8950000, 'afternoon', '25kg hành lý ký gửi, giải trí KrisWorld, bữa ăn quốc tế', 'Khoang Business hạng sang, sâm panh miễn phí, phòng chờ SilverKris'),
('VJ', 'VietJet Air', 'VJ-503', 'Hà Nội', 'HAN', 'Đà Nẵng', 'DAD', '07:15', '08:35', '1 giờ 20 phút', 'one_way', 1, 'Airbus A320', 890000, 2450000, 'morning', '7kg hành lý xách tay', 'Phòng chờ VIP, 30kg ký gửi, chọn chỗ ngồi miễn phí'),
('VN', 'Vietnam Airlines', 'VN-165', 'Hà Nội', 'HAN', 'Đà Nẵng', 'DAD', '14:20', '15:45', '1 giờ 25 phút', 'one_way', 1, 'Airbus A321', 1450000, 3650000, 'afternoon', '23kg ký gửi, nước giải khát', 'Ưu tiên check-in, suất ăn nhẹ, phòng chờ thương gia'),
('QH', 'Bamboo Airways', 'QH-201', 'Hà Nội', 'HAN', 'TP.Hồ Chí Minh', 'SGN', '19:15', '21:30', '2 giờ 15 phút', 'one_way', 1, 'Boeing 787-9', 1590000, 3990000, 'evening', '7kg xách tay + 20kg ký gửi, suất ăn nhẹ', 'Ghế Business ngả phẳng, phòng khách First Lounge'),
('VJ', 'VietJet Air', 'VJ-325', 'TP.Hồ Chí Minh', 'SGN', 'Phú Quốc', 'PQC', '08:10', '09:10', '1 giờ 00 phút', 'one_way', 1, 'Airbus A321', 790000, 2190000, 'morning', '7kg hành lý xách tay', 'SkyBoss ưu tiên lên máy bay, 30kg hành lý ký gửi'),
('VU', 'Vietravel Airlines', 'VU-781', 'TP.Hồ Chí Minh', 'SGN', 'Quy Nhơn', 'UIH', '11:00', '12:10', '1 giờ 10 phút', 'one_way', 1, 'Airbus A321', 850000, 2200000, 'morning', '7kg xách tay, đồ ăn nhẹ theo set', 'Hàng ghế đầu ưu tiên, phòng chờ tiêu chuẩn'),
('VJ', 'VietJet Air', 'VJ-272', 'TP.Hồ Chí Minh', 'SGN', 'Hải Phòng', 'HPH', '20:45', '22:50', '2 giờ 05 phút', 'one_way', 1, 'Airbus A321neo', 1150000, 3100000, 'evening', '7kg hành lý xách tay', 'Suất ăn nóng, 30kg ký gửi, thủ tục nhanh');
```

### 3.3. Dữ liệu 8 Tour Nổi Bật Trang Chủ & Các Tour Khác (`tours`)
Các hình ảnh thumbnail tour đều tuân thủ độ phân giải chuẩn **600x400**:
```sql
INSERT INTO tours (title, thumbnail, agency_name, duration, days_count, from_city, destination, airline_partner, aircraft_type, depart_hour, time_slot, flight_duration, price, is_featured, services_included, itinerary_json) VALUES
-- 1. Tour Đà Nẵng
('Tour Đà Nẵng - Hội An - Cầu Vàng Bà Nà Hills 4N3Đ', 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=600&h=400&fit=crop&q=80', 'Vietjet Travel', '4 Ngày 3 Đêm', 4, 'Hà Nội', 'Đà Nẵng', 'VietJet Air', 'Airbus A321neo', '07:30', 'morning', '1 giờ 20 phút', 4590000, 1, 'Vé máy bay khứ hồi, Khách sạn 4 sao biển Mỹ Khê, Vé cáp treo Bà Nà Hills, Ăn trọn gói 7 bữa', '[{"day":1,"title":"Hà Nội - Đà Nẵng - Bán đảo Sơn Trà","desc":"Bay từ Nội Bài đến Đà Nẵng, xe đón viếng Chùa Linh Ứng, tắm biển Mỹ Khê."},{"day":2,"title":"Bà Nà Hills - Cầu Vàng - Fantasy Park","desc":"Trải nghiệm cáp treo đạt kỷ lục, check-in Cầu Vàng nổi tiếng thế giới, vui chơi không giới hạn."},{"day":3,"title":"Ngũ Hành Sơn - Phố cổ Hội An","desc":"Thăm làng đá mỹ nghệ Non Nước, dạo phố cổ Hội An về đêm ngắm đèn lồng lung linh."},{"day":4,"title":"Chợ Hàn mua sắm - Hà Nội","desc":"Mua sắm đặc sản chả bò, mực rim tại Chợ Hàn, xe đưa ra sân bay về lại Hà Nội."}]'),

-- 2. Tour Phú Quốc
('Tour Phú Quốc - Đảo Ngọc Thiên Đường - Grand World 3N2Đ', 'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=600&h=400&fit=crop&q=80', 'Vietjet Holiday', '3 Ngày 2 Đêm', 3, 'TP.Hồ Chí Minh', 'Phú Quốc', 'VietJet Air', 'Airbus A321', '08:45', 'morning', '1 giờ 00 phút', 3890000, 1, 'Vé bay khứ hồi Vietjet, Resort 4 sao có hồ bơi vô cực, Cano 4 đảo, Vé show Tinh Hoa Việt Nam', '[{"day":1,"title":"TP.HCM - Phú Quốc - Grand World","desc":"Bay đến Phú Quốc, tham quan thành phố không ngủ Grand World, du ngoạn thuyền Gondola phong cách Venice."},{"day":2,"title":"Tour Cano 4 Đảo - Cáp treo Hòn Thơm","desc":"Trải nghiệm cano lướt sóng qua Hòn Mây Rút, Hòn Móng Tay, lặn ngắm san hô tự nhiên."},{"day":3,"title":"Sunset Sanato - Mua sắm đặc sản ngọc trai - TP.HCM","desc":"Chụp ảnh hoàng hôn tuyệt đẹp tại bãi biển Sunset Sanato, ghé thăm cơ sở ngọc trai và nước mắm truyền thống, bay về TP.HCM."}]'),

-- 3. Tour Nha Trang
('Tour Nha Trang Biển Xanh - VinWonders - Du Thuyền Hoàng Hôn 4N3Đ', 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=600&h=400&fit=crop&q=80', 'Vietjet Travel', '4 Ngày 3 Đêm', 4, 'Hà Nội', 'Nha Trang', 'VietJet Air', 'Airbus A320', '09:15', 'morning', '1 giờ 50 phút', 4990000, 1, 'Vé bay Vietjet khứ hồi, Khách sạn 5 sao mặt biển Trần Phú, Vé trọn gói VinWonders, Tiệc buffet hải sản', '[{"day":1,"title":"Hà Nội - Cam Ranh - Nha Trang","desc":"Hạ cánh Cam Ranh, xe đón về trung tâm phố biển, tự do dạo biển và thưởng thức nem nướng Ninh Hòa."},{"day":2,"title":"Vui chơi thế giới giải trí VinWonders Hòn Tre","desc":"Đi cáp treo vượt biển dài nhất, tham quan vịnh cá heo, xem show nhạc nước hoành tráng Tata Show."},{"day":3,"title":"Du thuyền ngắm hoàng hôn Vịnh Nha Trang","desc":"Thưởng thức cocktail và nhạc acoustic lãng mạn trên du thuyền 5 sao đẳng cấp ngắm vịnh biển."},{"day":4,"title":"Tháp Bà Ponagar - Tắm bùn khoáng I-Resort - Hà Nội","desc":"Tìm hiểu kiến trúc văn hóa Chăm pa cổ kính, thư giãn cơ thể tại khu khoáng nóng, ra sân bay bay về."}]'),

-- 4. Tour Quy Nhơn
('Tour Quy Nhơn - Phú Yên - Kỳ Co - Eo Gió - Hoa Vàng Cỏ Xanh 4N3Đ', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=400&fit=crop&q=80', 'Vietravel Companion', '4 Ngày 3 Đêm', 4, 'TP.Hồ Chí Minh', 'Quy Nhơn', 'Vietravel Airlines', 'Airbus A321', '06:45', 'morning', '1 giờ 10 phút', 4290000, 1, 'Vé bay khứ hồi, Khách sạn 4 sao Quy Nhơn & Tuy Hòa, Vé cano Kỳ Co, Thưởng thức đặc sản mắt cá ngừ đại dương', '[{"day":1,"title":"TP.HCM - Quy Nhơn - Eo Gió - Kỳ Co","desc":"Chinh phục con đường ven biển đẹp nhất Việt Nam tại Eo Gió, lặn ngắm san hô tại bãi tắm Kỳ Co nước trong vắt."},{"day":2,"title":"Tượng Phật chùa Ông Núi - Đồi cát Phương Mai","desc":"Chiêm bái tượng Phật ngồi lớn nhất Đông Nam Á, trượt cát thử thách cảm giác mạnh tại Phương Mai."},{"day":3,"title":"Quy Nhơn - Phú Yên - Gành Đá Đĩa - Bãi Xép","desc":"Check-in kỳ quan địa chất Gành Đá Đĩa, ngắm cảnh thơ mộng trong phim Hoa Vàng Trên Cỏ Xanh."},{"day":4,"title":"Mũi Điện Đại Lãnh - Sân bay Tuy Hòa - TP.HCM","desc":"Đón ánh bình minh tại nơi cực Đông đất liền, tham quan ngọn hải đăng Đại Lãnh, bay về TP.HCM."}]'),

-- 5. Tour Hà Giang
('Tour Hà Giang Mùa Hoa Tam Giác Mạch - Đèo Mã Pí Lèng 3N2Đ', 'https://images.unsplash.com/photo-1528127269322-539801943592?w=600&h=400&fit=crop&q=80', 'Vietjet Discovery', '3 Ngày 2 Đêm', 3, 'TP.Hồ Chí Minh', 'Hà Giang', 'VietJet Air', 'Airbus A321neo', '06:00', 'morning', '2 giờ 10 phút', 5490000, 1, 'Vé bay khứ hồi TP.HCM - Hà Nội, Xe limousine đưa đón Hà Giang, Homestay bản sắc dân tộc, Đi thuyền Hẻm Tu Sản', '[{"day":1,"title":"TP.HCM - Hà Nội - Quản Bạ - Yên Minh","desc":"Bay sớm ra Hà Nội, xe đưa lên cao nguyên đá, ngắm Núi Đôi Cô Tiên và rừng thông Yên Minh xanh ngát."},{"day":2,"title":"Đồng Văn - Đèo Mã Pí Lèng - Hẻm Tu Sản sông Nho Quế","desc":"Chinh phục một trong tứ đại đỉnh đèo miền Bắc, ngồi thuyền thả trôi trên dòng sông Nho Quế màu xanh ngọc bích."},{"day":3,"title":"Cột cờ Lũng Cú - Hà Nội - TP.HCM","desc":"Làm lễ chào cờ tại điểm cực Bắc Tổ quốc, về lại sân bay Nội Bài đón chuyến bay đêm về TP.HCM."}]'),

-- 6. Tour Singapore
('Tour Singapore - Đảo Quốc Sư Tử - Garden By The Bay 4N3Đ', 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=600&h=400&fit=crop&q=80', 'Vietjet Global', '4 Ngày 3 Đêm', 4, 'Hà Nội', 'Singapore', 'Singapore Airlines', 'Boeing 787', '12:35', 'afternoon', '3 giờ 40 phút', 11990000, 1, 'Bay hàng không 5 sao Singapore Airlines, Khách sạn 4 sao trung tâm Orchard, Vé Cloud Forest & Flower Dome', '[{"day":1,"title":"Hà Nội - Changi Jewel - Công viên Sư tử biển","desc":"Bay thẳng đến Singapore, chiêm ngưỡng thác nước trong nhà Jewel Changi, chụp hình tượng Merlion biểu tượng."},{"day":2,"title":"Gardens by the Bay - Đảo Sentosa - Universal","desc":"Khám phá khu vườn năng lượng khổng lồ Supertree, xem show Wings of Time tại bãi biển Sentosa."},{"day":3,"title":"Mua sắm Orchard Road - Phố người Hoa Chinatown","desc":"Tự do trải nghiệm mua sắm hàng hiệu miễn thuế, thưởng thức ẩm thực Michelin cua sốt ớt trứ danh."},{"day":4,"title":"Chùa Răng Phật - Sân bay Changi - Hà Nội","desc":"Viếng ngôi chùa linh thiêng tại khu Chinatown, làm thủ tục chuyến bay về lại Hà Nội."}]'),

-- 7. Tour Thái Lan
('Tour Thái Lan: Bangkok - Pattaya - Đảo San Hô Coral 5N4Đ', 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=600&h=400&fit=crop&q=80', 'Vietjet Travel', '5 Ngày 4 Đêm', 5, 'TP.Hồ Chí Minh', 'Bangkok', 'VietJet Air', 'Airbus A321', '09:00', 'morning', '1 giờ 30 phút', 6890000, 1, 'Bay khứ hồi Vietjet chặng SGN-BKK, Khách sạn 4 sao hồ bơi, Buffet 86 tầng Baiyoke Sky, Massage Thái cổ truyền', '[{"day":1,"title":"TP.HCM - Bangkok - Thành phố biển Pattaya","desc":"Hạ cánh Suvarnabhumi, xe đưa về thành phố biển sôi động Pattaya, xem Alcazar Cabaret show rực rỡ."},{"day":2,"title":"Đảo San Hô Coral Island - Trân Bảo Phật Sơn","desc":"Đi cano ra đảo san hô tắm biển trong lành, viếng núi Phật khắc vàng bằng laser lớn nhất thế giới."},{"day":3,"title":"Pattaya - Bangkok - Du thuyền sông Chao Phraya","desc":"Về thủ đô Bangkok, thưởng thức bữa tối lãng mạn trên du thuyền ngắm chùa Wat Arun lung linh trong đêm."},{"day":4,"title":"Chùa Phật Vàng - Mua sắm trung tâm Siam Paragon","desc":"Viếng tượng Phật bằng vàng ròng nguyên khối nặng 5.5 tấn, tự do săn sale tại các trung tâm thương mại lớn."},{"day":5,"title":"Dạo thuyền Tây Thiên - Sân bay Bangkok - TP.HCM","desc":"Xem hiện tượng cá nổi trên sông Chao Phraya, xe đưa ra sân bay đáp chuyến bay Vietjet về lại TP.HCM."}]'),

-- 8. Tour Đà Lạt
('Tour Đà Lạt Thành Phố Ngàn Hoa - Săn Mây Cầu Đất 3N2Đ', 'https://images.unsplash.com/photo-1546853020-ca4909aef454?w=600&h=400&fit=crop&q=80', 'Vietjet Holiday', '3 Ngày 2 Đêm', 3, 'Hà Nội', 'Đà Lạt', 'VietJet Air', 'Airbus A320', '06:50', 'morning', '1 giờ 50 phút', 3990000, 1, 'Vé bay khứ hồi Vietjet, Khách sạn trung tâm view Hồ Xuân Hương, Tour săn mây đồi chè Cầu Đất, Tiệc lẩu gà lá é', '[{"day":1,"title":"Hà Nội - Sân bay Liên Khương - Đà Lạt ngàn hoa","desc":"Bay thẳng đến cao nguyên sương mù, tham quan Vườn hoa Thành phố, dạo chợ đêm Đà Lạt uống sữa đậu nành nóng."},{"day":2,"title":"Săn mây Panorama Cầu Đất - Thác Datanla","desc":"Đón bình minh trên biển mây bồng bềnh, trải nghiệm máng trượt xuyên rừng thông dài nhất châu Á tại thác Datanla."},{"day":3,"title":"Quảng trường Lâm Viên - Vườn dâu tây công nghệ cao - Hà Nội","desc":"Chụp hình biểu tượng nụ hoa Atiso khổng lồ, tự tay hái những trái dâu tây chín mọng, ra sân bay về Hà Nội."}]');
```

---

## 4. MODULE KẾT NỐI VÀ TRUY VẤN TRONG JAVASCRIPT (`js/db.js`)

Cấu trúc file `js/db.js` cần cung cấp:
1. `initDatabase()`: Khởi tạo SQLite WebAssembly, chạy các câu lệnh DDL và nạp Seed Data.
2. `queryAll(sql, params)`: Thực thi câu lệnh `SELECT` và trả về mảng Javascript Object thân thiện (mỗi hàng là 1 key-value).
3. `queryOne(sql, params)`: Lấy 1 bản ghi duy nhất theo ID.
4. `saveOrder(orderData)`: Lưu đơn hàng mới khi khách hàng nhấn đăng ký.
5. Cung cấp **Fallback Data Generator**: Nếu trình duyệt không bật được WebAssembly (ví dụ chạy offline bằng giao thức `file://` bị giới hạn sandbox), hệ thống tự động trả về dữ liệu mẫu tương đương mà không bị crash.
