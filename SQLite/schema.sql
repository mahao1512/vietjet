-- ============================================================
-- CƠ SỞ DỮ LIỆU SQLITE: VIETJET TRAVEL & FLIGHT BOOKING
-- FILE: schema.sql (Định nghĩa cấu trúc bảng & chỉ mục)
-- ============================================================

-- Bật hỗ trợ ràng buộc khóa ngoại
PRAGMA foreign_keys = ON;

-- 1. BẢNG HÃNG HÀNG KHÔNG ĐỐI TÁC (airlines)
DROP TABLE IF EXISTS airlines;
CREATE TABLE airlines (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    code TEXT UNIQUE NOT NULL,           -- Mã hãng (VJ, VN, SQ, QH, VU, QR...)
    name TEXT NOT NULL,                  -- Tên đầy đủ của hãng hàng không
    logo TEXT NOT NULL,                  -- Đường dẫn ảnh logo (URL hoặc file local)
    rating REAL DEFAULT 4.8,             -- Đánh giá sao trung bình (1.0 - 5.0)
    country TEXT NOT NULL,               -- Quốc gia đặt trụ sở
    description TEXT                     -- Giới thiệu ngắn về hãng
);

-- 2. BẢNG CHUYẾN BAY (flights)
DROP TABLE IF EXISTS flights;
CREATE TABLE flights (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    airline_code TEXT NOT NULL,          -- Mã hãng (VJ, VN, SQ...)
    airline_name TEXT NOT NULL,          -- Tên hãng bay
    flight_number TEXT NOT NULL,         -- Số hiệu chuyến bay (VD: VJ-182, VN-210)
    from_city TEXT NOT NULL,             -- Tên thành phố cất cánh (VD: Hà Nội)
    from_code TEXT NOT NULL,             -- Mã sân bay cất cánh (VD: HAN)
    to_city TEXT NOT NULL,               -- Tên thành phố hạ cánh (VD: TP.Hồ Chí Minh)
    to_code TEXT NOT NULL,               -- Mã sân bay hạ cánh (VD: SGN)
    depart_time TEXT NOT NULL,           -- Giờ cất cánh định dạng HH:mm (VD: '08:15')
    arrive_time TEXT NOT NULL,           -- Giờ hạ cánh định dạng HH:mm (VD: '10:30')
    duration TEXT NOT NULL,              -- Tổng thời gian bay (VD: '2 giờ 15 phút')
    flight_type TEXT DEFAULT 'one_way',  -- 'one_way' (Một chiều) hoặc 'round_trip' (Khứ hồi)
    is_direct INTEGER DEFAULT 1,         -- 1: Bay thẳng (Direct), 0: Quá cảnh / Nhiều thành phố
    aircraft_type TEXT NOT NULL,         -- Loại tàu bay (Airbus A321neo, Boeing 787-9 Dreamliner...)
    price_economy INTEGER NOT NULL,      -- Giá vé Hạng Phổ Thông (VNĐ)
    price_business INTEGER NOT NULL,     -- Giá vé Hạng Thương Gia (VNĐ)
    time_slot TEXT NOT NULL,             -- Khung giờ: 'early' (00-06h), 'morning' (06-12h), 'afternoon' (12-18h), 'evening' (18-24h)
    services_economy TEXT,               -- Đặc quyền dịch vụ Hạng Phổ Thông
    services_business TEXT,              -- Đặc quyền dịch vụ Hạng Thương Gia
    seats_available INTEGER DEFAULT 50,  -- Số chỗ còn trống
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 3. BẢNG TOUR DU LỊCH (tours)
DROP TABLE IF EXISTS tours;
CREATE TABLE tours (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,                 -- Tiêu đề tour du lịch
    thumbnail TEXT NOT NULL,             -- Đường dẫn ảnh thumbnail tỉ lệ chuẩn 600x400
    agency_name TEXT NOT NULL,           -- Tên hãng lữ hành tổ chức (Vietjet Travel, Vietravel...)
    duration TEXT NOT NULL,              -- Số ngày/đêm (VD: '4 Ngày 3 Đêm', '3 Ngày 2 Đêm')
    days_count INTEGER NOT NULL,         -- Số ngày du lịch (số nguyên dùng để lọc)
    from_city TEXT NOT NULL,             -- Điểm xuất phát (Hà Nội, TP.HCM, Đà Nẵng...)
    destination TEXT NOT NULL,           -- Điểm đến tham quan chính (Đà Nẵng, Phú Quốc, Nha Trang...)
    airline_partner TEXT NOT NULL,       -- Hãng hàng không vận chuyển (VietJet Air, Vietnam Airlines...)
    aircraft_type TEXT NOT NULL,         -- Loại máy bay chuyên chở
    depart_hour TEXT NOT NULL,           -- Giờ cất cánh chặng bay tour (VD: '07:30')
    time_slot TEXT NOT NULL,             -- Khung giờ bay: 'early', 'morning', 'afternoon', 'evening'
    flight_duration TEXT NOT NULL,       -- Thời gian bay chặng đi (VD: '1 giờ 20 phút')
    price INTEGER NOT NULL,              -- Giá tour trọn gói cho 1 khách (VNĐ)
    is_featured INTEGER DEFAULT 0,       -- 1: Nổi bật ở trang chủ (chọn ra 8 tour), 0: Tour thông thường
    services_included TEXT NOT NULL,     -- Danh sách dịch vụ bao gồm (Khách sạn, ăn uống, xe đưa đón, bảo hiểm...)
    itinerary_json TEXT NOT NULL,        -- Lịch trình chi tiết các ngày dưới định dạng JSON
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 4. BẢNG ĐƠN ĐẶT CHỖ / GIỎ HÀNG ĐÃ THANH TOÁN (orders)
DROP TABLE IF EXISTS orders;
CREATE TABLE orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    pnr_code TEXT UNIQUE NOT NULL,       -- Mã đặt chỗ (Booking PNR: VJ-XXXXX)
    customer_name TEXT NOT NULL,         -- Họ tên khách hàng
    customer_phone TEXT NOT NULL,        -- Số điện thoại (10 chữ số)
    customer_email TEXT NOT NULL,        -- Địa chỉ email nhận vé
    customer_address TEXT,               -- Địa chỉ liên hệ
    notes TEXT,                          -- Yêu cầu đặc biệt (suất ăn chay, ghế cạnh cửa sổ...)
    total_amount INTEGER NOT NULL,       -- Tổng tiền thanh toán (VNĐ)
    sender_email TEXT DEFAULT 'nvhai061993@gmail.com', -- Email gửi thông báo đại diện
    status TEXT DEFAULT 'confirmed',     -- Trạng thái đơn hàng: 'pending', 'confirmed', 'cancelled'
    items_json TEXT NOT NULL,            -- Danh sách các chuyến bay & tour đã đặt (mảng JSON)
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- CÁC CHỈ MỤC (INDEXES) TỐI ƯU TỐC ĐỘ TRUY VẤN
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_flights_from_to ON flights (from_code, to_code);
CREATE INDEX IF NOT EXISTS idx_flights_airline ON flights (airline_code);
CREATE INDEX IF NOT EXISTS idx_flights_price_eco ON flights (price_economy);
CREATE INDEX IF NOT EXISTS idx_flights_time_slot ON flights (time_slot);
CREATE INDEX IF NOT EXISTS idx_flights_direct ON flights (is_direct);

CREATE INDEX IF NOT EXISTS idx_tours_featured ON tours (is_featured);
CREATE INDEX IF NOT EXISTS idx_tours_price ON tours (price);
CREATE INDEX IF NOT EXISTS idx_tours_airline ON tours (airline_partner);
CREATE INDEX IF NOT EXISTS idx_tours_destination ON tours (destination);
