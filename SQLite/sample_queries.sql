-- ============================================================
-- CƠ SỞ DỮ LIỆU SQLITE: VIETJET TRAVEL & FLIGHT BOOKING
-- FILE: sample_queries.sql (Các câu truy vấn mẫu dùng cho Frontend)
-- ============================================================

-- ------------------------------------------------------------
-- 1. TRUY VẤN DÀNH CHO TRANG CHỦ (index.html)
-- ------------------------------------------------------------

-- 1.1. Lấy danh sách đúng 8 tour du lịch nổi bật để hiển thị ở trang chủ
SELECT 
    id, 
    title, 
    thumbnail, 
    agency_name, 
    duration, 
    price, 
    airline_partner
FROM tours
WHERE is_featured = 1
ORDER BY id ASC
LIMIT 8;

-- 1.2. Lấy danh sách các hãng hàng không đối tác để hiển thị logo
SELECT 
    code, 
    name, 
    logo, 
    rating 
FROM airlines
ORDER BY id ASC;


-- ------------------------------------------------------------
-- 2. TRUY VẤN DÀNH CHO TRANG CHUYẾN BAY (flights.html)
-- ------------------------------------------------------------

-- 2.1. Tìm kiếm chuyến bay theo chặng đi/đến (VD: HAN ➔ SGN) sắp xếp giá tăng dần
SELECT * FROM flights
WHERE from_code = 'HAN' AND to_code = 'SGN'
ORDER BY price_economy ASC;

-- 2.2. Lọc chuyến bay theo hãng hàng không (chọn VietJet Air và Vietnam Airlines)
SELECT * FROM flights
WHERE airline_code IN ('VJ', 'VN')
ORDER BY price_economy ASC;

-- 2.3. Lọc chuyến bay theo khung giờ cất cánh buổi sáng (06:00 - 12:00)
SELECT * FROM flights
WHERE time_slot = 'morning'
ORDER BY depart_time ASC;

-- 2.4. Lọc chuyến bay chỉ bay thẳng (is_direct = 1)
SELECT * FROM flights
WHERE is_direct = 1
ORDER BY price_economy ASC;

-- 2.5. Lọc kết hợp nhiều điều kiện (Chặng HAN - SGN, Bay thẳng, Hãng VietJet, Giá tăng dần)
SELECT 
    id, 
    airline_name, 
    airline_code, 
    flight_number, 
    depart_time, 
    arrive_time, 
    duration, 
    aircraft_type, 
    price_economy, 
    price_business, 
    services_economy
FROM flights
WHERE from_code = 'HAN' 
  AND to_code = 'SGN' 
  AND is_direct = 1 
  AND airline_code = 'VJ'
ORDER BY price_economy ASC;


-- ------------------------------------------------------------
-- 3. TRUY VẤN DÀNH CHO TRANG CHI TIẾT CHUYẾN BAY (flight-detail.html)
-- ------------------------------------------------------------

-- 3.1. Lấy chi tiết chuyến bay theo ID (ví dụ ID = 1)
SELECT 
    f.*,
    a.logo AS airline_logo_url,
    a.rating AS airline_rating
FROM flights f
LEFT JOIN airlines a ON f.airline_code = a.code
WHERE f.id = 1;


-- ------------------------------------------------------------
-- 4. TRUY VẤN DÀNH CHO TRANG TOUR DU LỊCH (tours.html)
-- ------------------------------------------------------------

-- 4.1. Lấy tất cả tour du lịch sắp xếp giá từ thấp đến cao
SELECT * FROM tours
ORDER BY price ASC;

-- 4.2. Lấy tất cả tour du lịch sắp xếp giá từ cao đến thấp
SELECT * FROM tours
ORDER BY price DESC;

-- 4.3. Lọc tour du lịch theo hãng hàng không bay cùng (VD: VietJet Air)
SELECT * FROM tours
WHERE airline_partner = 'VietJet Air'
ORDER BY price ASC;

-- 4.4. Lọc tour du lịch theo khung giờ cất cánh buổi sáng
SELECT * FROM tours
WHERE time_slot = 'morning'
ORDER BY price ASC;


-- ------------------------------------------------------------
-- 5. TRUY VẤN DÀNH CHO TRANG CHI TIẾT TOUR (tour-detail.html)
-- ------------------------------------------------------------

-- 5.1. Lấy thông tin chi tiết tour và lịch trình JSON theo ID (ví dụ ID = 1)
SELECT 
    id,
    title,
    thumbnail,
    agency_name,
    duration,
    days_count,
    from_city,
    destination,
    airline_partner,
    aircraft_type,
    depart_hour,
    flight_duration,
    price,
    services_included,
    itinerary_json
FROM tours
WHERE id = 1;


-- ------------------------------------------------------------
-- 6. TRUY VẤN DÀNH CHO TRANG GIỎ HÀNG & ĐẶT CHỖ (cart.html)
-- ------------------------------------------------------------

-- 6.1. Lưu thông tin đơn đặt chỗ mới khi khách hàng nhấn 'Đăng Ký'
INSERT INTO orders (
    pnr_code, 
    customer_name, 
    customer_phone, 
    customer_email, 
    customer_address, 
    notes, 
    total_amount, 
    items_json
) VALUES (
    'VJ-98421',
    'Nguyễn Văn Hải',
    '0901234567',
    'khachhang@gmail.com',
    'Hà Nội, Việt Nam',
    'Xin ghế ngồi gần cửa sổ và hỗ trợ suất ăn không hành',
    5780000,
    '[{"type":"flight","title":"Hà Nội (HAN) ➔ TP.HCM (SGN)","seatClass":"Hạng Phổ Thông","price":1190000,"quantity":1},{"type":"tour","title":"Tour Đà Nẵng - Hội An - Cầu Vàng Bà Nà Hills 4N3Đ","price":4590000,"quantity":1}]'
);

-- 6.2. Tra cứu đơn hàng theo mã PNR
SELECT * FROM orders
WHERE pnr_code = 'VJ-98421';
