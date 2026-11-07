-- ============================================================
-- CƠ SỞ DỮ LIỆU SQLITE: VIETJET TRAVEL & FLIGHT BOOKING
-- FILE: vietjet_master.sql (FILE TỔNG HỢP TOÀN BỘ SCHEMA VÀ SEED DATA)
-- Chạy file này để khởi tạo hoàn chỉnh database Vietjet trong 1 bước duy nhất!
-- ============================================================

PRAGMA foreign_keys = ON;

-- ------------------------------------------------------------
-- 1. BẢNG HÃNG HÀNG KHÔNG (airlines)
-- ------------------------------------------------------------
DROP TABLE IF EXISTS airlines;
CREATE TABLE airlines (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    code TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    logo TEXT NOT NULL,
    rating REAL DEFAULT 4.8,
    country TEXT NOT NULL,
    description TEXT
);

INSERT INTO airlines (code, name, logo, rating, country, description) VALUES
('VJ', 'VietJet Air', 'image/logo.jpg', 4.8, 'Việt Nam', 'Hãng hàng không thế hệ mới, tiên phong mang đến cơ hội bay với chi phí tiết kiệm và dịch vụ thân thiện, hiện đại.'),
('VN', 'Vietnam Airlines', 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=120&auto=format&fit=crop&q=80', 4.9, 'Việt Nam', 'Hãng hàng không quốc gia Việt Nam chuẩn quốc tế 4 sao Skytrax với mạng bay rộng khắp thế giới.'),
('SQ', 'Singapore Airlines', 'https://images.unsplash.com/photo-1556388158-158ea5caac53?w=120&auto=format&fit=crop&q=80', 5.0, 'Singapore', 'Hãng hàng không 5 sao hàng đầu thế giới với khoang thương gia đẳng cấp và dịch vụ khoang khách hoàn mỹ.'),
('QH', 'Bamboo Airways', 'https://images.unsplash.com/photo-1517479149777-5f3b1511d5ad?w=120&auto=format&fit=crop&q=80', 4.7, 'Việt Nam', 'Hãng hàng không định hướng dịch vụ hiếu khách tận tâm, phong cách phục vụ đẳng cấp và tỷ lệ đúng giờ cao.'),
('VU', 'Vietravel Airlines', 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=120&auto=format&fit=crop&q=80', 4.6, 'Việt Nam', 'Hãng hàng không du lịch đầu tiên tại Việt Nam, kết nối các điểm đến du lịch nổi tiếng trên khắp dải đất hình chữ S.'),
('QR', 'Qatar Airways', 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?w=120&auto=format&fit=crop&q=80', 4.9, 'Qatar', 'Hãng hàng không tốt nhất thế giới với mạng lưới bay liên lục địa trải rộng khắp châu Âu, châu Mỹ và Trung Đông.');

-- ------------------------------------------------------------
-- 2. BẢNG CHUYẾN BAY (flights)
-- ------------------------------------------------------------
DROP TABLE IF EXISTS flights;
CREATE TABLE flights (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    airline_code TEXT NOT NULL,
    airline_name TEXT NOT NULL,
    flight_number TEXT NOT NULL,
    from_city TEXT NOT NULL,
    from_code TEXT NOT NULL,
    to_city TEXT NOT NULL,
    to_code TEXT NOT NULL,
    depart_time TEXT NOT NULL,
    arrive_time TEXT NOT NULL,
    duration TEXT NOT NULL,
    flight_type TEXT DEFAULT 'one_way',
    is_direct INTEGER DEFAULT 1,
    aircraft_type TEXT NOT NULL,
    price_economy INTEGER NOT NULL,
    price_business INTEGER NOT NULL,
    time_slot TEXT NOT NULL,
    services_economy TEXT,
    services_business TEXT,
    seats_available INTEGER DEFAULT 50,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO flights (
    airline_code, airline_name, flight_number,
    from_city, from_code, to_city, to_code,
    depart_time, arrive_time, duration,
    flight_type, is_direct, aircraft_type,
    price_economy, price_business,
    time_slot, services_economy, services_business, seats_available
) VALUES
('VJ', 'VietJet Air', 'VJ-182', 'Hà Nội', 'HAN', 'TP.Hồ Chí Minh', 'SGN', '06:15', '08:25', '2 giờ 10 phút', 'one_way', 1, 'Airbus A321neo', 1190000, 3290000, 'morning', '07kg hành lý xách tay, nước uống đóng chai', 'Phòng chờ SkyBoss VIP, 40kg hành lý ký gửi + 10kg xách tay, phục vụ ẩm thực nóng cao cấp, ưu tiên làm thủ tục & chọn chỗ ngồi', 42),
('VN', 'Vietnam Airlines', 'VN-210', 'Hà Nội', 'HAN', 'TP.Hồ Chí Minh', 'SGN', '08:00', '10:15', '2 giờ 15 phút', 'one_way', 1, 'Boeing 787-9 Dreamliner', 1890000, 4890000, 'morning', '12kg xách tay + 23kg ký gửi, suất ăn nóng và nước giải khát', 'Phòng chờ Bông Sen Vàng 5 sao, 40kg ký gửi, ghế thương gia ngả phẳng 180 độ, sâm panh và thực đơn Âu Á', 28),
('VJ', 'VietJet Air', 'VJ-186', 'Hà Nội', 'HAN', 'TP.Hồ Chí Minh', 'SGN', '09:30', '11:45', '2 giờ 15 phút', 'one_way', 1, 'Airbus A321neo', 1350000, 3450000, 'morning', '07kg hành lý xách tay, nước suối', 'Phòng chờ SkyBoss VIP, 40kg ký gửi, ưu tiên check-in, suất ăn nóng tùy chọn', 35),
('QH', 'Bamboo Airways', 'QH-203', 'Hà Nội', 'HAN', 'TP.Hồ Chí Minh', 'SGN', '11:20', '13:35', '2 giờ 15 phút', 'one_way', 1, 'Boeing 787-9', 1590000, 3990000, 'morning', '07kg xách tay + 20kg ký gửi, đồ ăn nhẹ theo mùa', 'Khoang thương gia riêng biệt, phòng chờ First Lounge, 40kg ký gửi, lối đi ưu tiên', 19),
('VJ', 'VietJet Air', 'VJ-194', 'Hà Nội', 'HAN', 'TP.Hồ Chí Minh', 'SGN', '14:40', '16:55', '2 giờ 15 phút', 'one_way', 1, 'Airbus A320', 1250000, 3350000, 'afternoon', '07kg hành lý xách tay', 'Phòng chờ SkyBoss, 40kg hành lý ký gửi, suất ăn nóng', 50),
('VN', 'Vietnam Airlines', 'VN-255', 'Hà Nội', 'HAN', 'TP.Hồ Chí Minh', 'SGN', '16:00', '18:15', '2 giờ 15 phút', 'one_way', 1, 'Airbus A350-900', 1950000, 5100000, 'afternoon', '12kg xách tay + 23kg ký gửi, màn hình giải trí cá nhân', 'Khoang Business giường nằm, tai nghe chống ồn cao cấp, phòng chờ Lotus Lounge', 24),
('VJ', 'VietJet Air', 'VJ-198', 'Hà Nội', 'HAN', 'TP.Hồ Chí Minh', 'SGN', '20:15', '22:25', '2 giờ 10 phút', 'one_way', 1, 'Airbus A321neo', 1090000, 2990000, 'evening', '07kg hành lý xách tay', 'Phòng chờ SkyBoss, ưu tiên soi chiếu an ninh, suất ăn nóng tùy chọn', 65),
('VJ', 'VietJet Air', 'VJ-503', 'Hà Nội', 'HAN', 'Đà Nẵng', 'DAD', '07:15', '08:35', '1 giờ 20 phút', 'one_way', 1, 'Airbus A320', 890000, 2450000, 'morning', '07kg hành lý xách tay tiêu chuẩn', 'SkyBoss Lounge, 30kg ký gửi, quầy thủ tục riêng, suất ăn đặc biệt', 38),
('VN', 'Vietnam Airlines', 'VN-165', 'Hà Nội', 'HAN', 'Đà Nẵng', 'DAD', '14:20', '15:45', '1 giờ 25 phút', 'one_way', 1, 'Airbus A321', 1450000, 3650000, 'afternoon', '12kg xách tay + 23kg ký gửi, nước ép trái cây', 'Ghế da thương gia cao cấp, phòng chờ VIP, suất ăn nóng tươi ngon', 16),
('QH', 'Bamboo Airways', 'QH-105', 'Hà Nội', 'HAN', 'Đà Nẵng', 'DAD', '18:30', '19:50', '1 giờ 20 phút', 'one_way', 1, 'Embraer 190', 1250000, 2950000, 'evening', '07kg xách tay + 20kg ký gửi', 'Ưu tiên làm thủ tục, phòng chờ Bamboo Lounge, đồ uống cao cấp', 22),
('VJ', 'VietJet Air', 'VJ-622', 'TP.Hồ Chí Minh', 'SGN', 'Đà Nẵng', 'DAD', '06:30', '07:50', '1 giờ 20 phút', 'one_way', 1, 'Airbus A321neo', 920000, 2550000, 'morning', '07kg hành lý xách tay', 'SkyBoss VIP, 30kg ký gửi, xe riêng đưa đón ra máy bay', 45),
('VN', 'Vietnam Airlines', 'VN-128', 'TP.Hồ Chí Minh', 'SGN', 'Đà Nẵng', 'DAD', '10:05', '11:30', '1 giờ 25 phút', 'one_way', 1, 'Airbus A321', 1520000, 3750000, 'morning', '23kg ký gửi + 12kg xách tay, đồ ăn nhẹ', 'Phòng chờ hạng thương gia ga quốc nội, hành lý ưu tiên dán thẻ VIP', 20),
('VJ', 'VietJet Air', 'VJ-325', 'TP.Hồ Chí Minh', 'SGN', 'Phú Quốc', 'PQC', '08:10', '09:10', '1 giờ 00 phút', 'one_way', 1, 'Airbus A321', 790000, 2190000, 'morning', '07kg hành lý xách tay', 'SkyBoss ưu tiên lên máy bay, 30kg ký gửi, phục vụ nước yến/cà phê', 30),
('VN', 'Vietnam Airlines', 'VN-1823', 'TP.Hồ Chí Minh', 'SGN', 'Phú Quốc', 'PQC', '15:15', '16:15', '1 giờ 00 phút', 'one_way', 1, 'Airbus A321', 1320000, 3150000, 'afternoon', '23kg hành lý ký gửi, khăn lạnh và nước', 'Ghế rộng êm ái, quầy thủ tục VIP, miễn phí đổi vé', 15),
('VU', 'Vietravel Airlines', 'VU-781', 'TP.Hồ Chí Minh', 'SGN', 'Quy Nhơn', 'UIH', '11:00', '12:10', '1 giờ 10 phút', 'one_way', 1, 'Airbus A321', 850000, 2200000, 'morning', '07kg xách tay, đồ ăn nhẹ theo set du lịch', 'Hàng ghế đầu ưu tiên, phòng chờ thương gia sân bay Tân Sơn Nhất', 25),
('SQ', 'Singapore Airlines', 'SQ-175', 'Hà Nội', 'HAN', 'Singapore', 'SIN', '12:35', '17:15', '3 giờ 40 phút', 'one_way', 1, 'Airbus A350-900', 3250000, 8950000, 'afternoon', '25kg hành lý ký gửi, hệ thống giải trí KrisWorld, bữa ăn nóng quốc tế', 'Khoang Business sang trọng, ghế phẳng thành giường, sâm panh thượng hạng, phòng chờ SilverKris Changi', 18),
('VJ', 'VietJet Air', 'VJ-915', 'Hà Nội', 'HAN', 'Singapore', 'SIN', '09:35', '13:55', '3 giờ 20 phút', 'one_way', 1, 'Airbus A321neo', 1980000, 5200000, 'morning', '07kg hành lý xách tay', 'SkyBoss quốc tế: Phòng chờ VIP, 40kg ký gửi, ẩm thực nóng, check-in riêng', 32),
('VJ', 'VietJet Air', 'VJ-801', 'TP.Hồ Chí Minh', 'SGN', 'Bangkok', 'BKK', '09:00', '10:30', '1 giờ 30 phút', 'one_way', 1, 'Airbus A321', 1450000, 3950000, 'morning', '07kg xách tay, nước suối', 'Phòng chờ SkyBoss Tân Sơn Nhất & Suvarnabhumi, 40kg hành lý ký gửi', 40),
('VN', 'Vietnam Airlines', 'VN-7201', 'Hà Nội', 'HAN', 'Phú Quốc', 'PQC', '06:00', '11:30', '5 giờ 30 phút', 'one_way', 0, 'Boeing 787 / A321', 2350000, 5900000, 'early', 'Nối chuyến tại SGN (1h30m), 23kg ký gửi', 'Toàn chặng hạng thương gia, phòng chờ tại HAN và SGN', 12);

-- ------------------------------------------------------------
-- 3. BẢNG TOUR DU LỊCH (tours)
-- ------------------------------------------------------------
DROP TABLE IF EXISTS tours;
CREATE TABLE tours (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    thumbnail TEXT NOT NULL,
    agency_name TEXT NOT NULL,
    duration TEXT NOT NULL,
    days_count INTEGER NOT NULL,
    from_city TEXT NOT NULL,
    destination TEXT NOT NULL,
    airline_partner TEXT NOT NULL,
    aircraft_type TEXT NOT NULL,
    depart_hour TEXT NOT NULL,
    time_slot TEXT NOT NULL,
    flight_duration TEXT NOT NULL,
    price INTEGER NOT NULL,
    is_featured INTEGER DEFAULT 0,
    services_included TEXT NOT NULL,
    itinerary_json TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO tours (
    title, thumbnail, agency_name,
    duration, days_count, from_city, destination,
    airline_partner, aircraft_type,
    depart_hour, time_slot, flight_duration,
    price, is_featured, services_included, itinerary_json
) VALUES
('Tour Đà Nẵng - Hội An - Cầu Vàng Bà Nà Hills 4N3Đ', 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=600&h=400&fit=crop&q=80', 'Vietjet Travel', '4 Ngày 3 Đêm', 4, 'Hà Nội', 'Đà Nẵng', 'VietJet Air', 'Airbus A321neo', '07:30', 'morning', '1 giờ 20 phút', 4590000, 1, 'Vé máy bay Vietjet khứ hồi, Khách sạn 4 sao biển Mỹ Khê, Vé cáp treo Bà Nà Hills, Ăn trọn gói 7 bữa chính, Xe du lịch đời mới, Hướng dẫn viên suốt tuyến, Bảo hiểm du lịch 100.000.000đ', '[{"day":1,"title":"Hà Nội - Sân bay Đà Nẵng - Bán đảo Sơn Trà","desc":"Quý khách tập trung tại sân bay Nội Bài, đáp chuyến bay Vietjet VJ-503 đi Đà Nẵng. Xe và hướng dẫn viên đón đoàn viếng Chùa Linh Ứng Bãi Bụt ngắm tượng Phật Bà 67m, nhận phòng khách sạn 4 sao ven biển Mỹ Khê, tự do tắm biển và ăn tối hải sản."},{"day":2,"title":"Chinh phục Bà Nà Hills - Check-in Cầu Vàng - Làng Pháp","desc":"Khởi hành lên KDL Bà Nà Hills bằng hệ thống cáp treo đạt 4 kỷ lục thế giới. Chiêm ngưỡng Cầu Vàng bàn tay khổng lồ giữa sương mây, check-in Làng Pháp cổ kính, hầm rượu Debay và vui chơi không giới hạn tại công viên Fantasy Park."},{"day":3,"title":"Danh thắng Ngũ Hành Sơn - Phố Cổ Hội An lung linh","desc":"Tham quan Làng đá mỹ nghệ Non Nước, khám phá động Huyền Không. Chiều khởi hành đi Phố Cổ Hội An: thăm Chùa Cầu Nhật Bản, nhà cổ Phùng Hưng, đi thuyền thả hoa đăng trên sông Hoài và thưởng thức đặc sản Cao Lầu, cơm gà."},{"day":4,"title":"Chợ Hàn mua sắm đặc sản miền Trung - Hà Nội","desc":"Đoàn tự do dạo Chợ Hàn mua chả bò, mực rim me, bánh khô mè làm quà. Xe đưa đoàn ra sân bay Đà Nẵng đáp chuyến bay Vietjet về lại Hà Nội. Kết thúc hành trình đầy ắp kỷ niệm."}]'),

('Tour Phú Quốc - Đảo Ngọc Thiên Đường - Grand World 3N2Đ', 'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=600&h=400&fit=crop&q=80', 'Vietjet Holiday', '3 Ngày 2 Đêm', 3, 'TP.Hồ Chí Minh', 'Phú Quốc', 'VietJet Air', 'Airbus A321', '08:45', 'morning', '1 giờ 00 phút', 3890000, 1, 'Vé máy bay Vietjet khứ hồi, Resort 4 sao có hồ bơi tràn bờ, Cano tham quan 4 đảo lặn ngắm san hô, Vé xem show Tinh Hoa Việt Nam, Ăn sáng buffet, Bảo hiểm du lịch', '[{"day":1,"title":"TP.HCM - Đảo Ngọc Phú Quốc - Thành phố không ngủ Grand World","desc":"Bay thẳng từ Tân Sơn Nhất đến Phú Quốc. Xe đưa đoàn check-in resort nghỉ ngơi. Chiều khám phá thành phố không ngủ Grand World: du ngoạn thuyền Gondola trên dòng kênh Venice lãng mạn, tham quan Bảo tàng Gấu Teddy và thưởng thức show thực cảnh đỉnh cao."},{"day":2,"title":"Trải nghiệm Cano 4 Đảo - Lặn ngắm san hô tự nhiên - Cáp treo Hòn Thơm","desc":"Lên cano cao tốc lướt sóng qua Hòn Mây Rút, Hòn Gầm Ghì, Hòn Móng Tay. Trải nghiệm lặn ngắm rạn san hô tự nhiên rực rỡ sắc màu, chụp ảnh flycam chuyên nghiệp. Chiều đi cáp treo vượt biển 3 dây dài nhất thế giới sang đảo Hòn Thơm."},{"day":3,"title":"Sunset Sanato ngắm hoàng hôn - Mua sắm ngọc trai - TP.HCM","desc":"Check-in cổng trời và đàn voi chân dài tại Sunset Sanato. Tham quan cơ sở nuôi cấy ngọc trai Phú Quốc và nhà thùng nước mắm truyền thống lâu đời. Xe đưa quý khách ra sân bay Phú Quốc bay về TP.HCM."}]'),

('Tour Nha Trang Biển Xanh - VinWonders - Du Thuyền Hoàng Hôn 4N3Đ', 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=600&h=400&fit=crop&q=80', 'Vietjet Travel', '4 Ngày 3 Đêm', 4, 'Hà Nội', 'Nha Trang', 'VietJet Air', 'Airbus A320', '09:15', 'morning', '1 giờ 50 phút', 4990000, 1, 'Vé máy bay Vietjet khứ hồi, Khách sạn 5 sao mặt biển đường Trần Phú, Vé trọn gói VinWonders Hòn Tre, Bữa tiệc cocktail du thuyền hoàng hôn, Tắm bùn khoáng cao cấp', '[{"day":1,"title":"Hà Nội - Sân bay Cam Ranh - Phố biển Nha Trang","desc":"Hạ cánh sân bay quốc tế Cam Ranh, ngắm cung đường đèo ven biển ngoạn mục. Nhận phòng khách sạn 5 sao mặt biển, thưởng thức đặc sản nem nướng Ninh Hòa và bún cá sứa danh tiếng."},{"day":2,"title":"Thiên đường giải trí VinWonders Hòn Tre - Show nhạc nước Tata","desc":"Đi cáp treo vượt biển sang đảo ngọc Hòn Tre. Thỏa thích khám phá vịnh phao nổi khổng lồ, vườn thú Quý Vương, xem biểu diễn cá heo và thưởng thức siêu phẩm Tata Show hoành tráng."},{"day":3,"title":"Du thuyền ngắm hoàng hôn Vịnh Nha Trang - Tiệc tối 5 sao","desc":"Lên du thuyền 5 sao đẳng cấp, thưởng thức tiệc finger food, rượu vang và lắng nghe giai điệu vĩ cầm du dương khi mặt trời buông xuống mặt vịnh xanh biếc."},{"day":4,"title":"Tháp Bà Ponagar huyền bí - Tắm bùn khoáng nóng - Hà Nội","desc":"Chiêm bái quần thể kiến trúc tháp Chăm cổ kính Ponagar, ngâm mình trong bùn khoáng thiên nhiên giải độc cơ thể tại I-Resort. Xe đưa ra sân bay Cam Ranh về Hà Nội."}]'),

('Tour Quy Nhơn - Phú Yên - Kỳ Co - Eo Gió - Hoa Vàng Cỏ Xanh 4N3Đ', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=400&fit=crop&q=80', 'Vietravel Companion', '4 Ngày 3 Đêm', 4, 'TP.Hồ Chí Minh', 'Quy Nhơn', 'Vietravel Airlines', 'Airbus A321', '06:45', 'morning', '1 giờ 10 phút', 4290000, 1, 'Vé bay khứ hồi Vietravel Airlines, Khách sạn 4 sao trung tâm, Cano cao tốc bãi biển Kỳ Co, Bữa trưa hải sản tươi sống 8 món, Xe ô tô máy lạnh chất lượng cao', '[{"day":1,"title":"TP.HCM - Sân bay Phù Cát - Eo Gió hùng vĩ - Kỳ Co","desc":"Bay từ TP.HCM đến Phù Cát. Chinh phục cung đường ven biển đẹp bậc nhất tại Eo Gió nơi đón hoàng hôn đẹp nhất Việt Nam. Lên cano sang bãi tắm Kỳ Co làn nước trong xanh thấu đáy."},{"day":2,"title":"Đồi cát Phương Mai - Tượng Phật ngồi chùa Ông Núi","desc":"Trải nghiệm trượt cát tại đồi cát Phương Mai hoang sơ. Chiêm bái tượng Phật Thích Ca ngồi lớn nhất Đông Nam Á tại chùa Ông Núi, ngắm toàn cảnh đầm Thị Nại."},{"day":3,"title":"Quy Nhơn - Phú Yên - Gành Đá Đĩa - Bãi Xép thơ mộng","desc":"Di chuyển sang Phú Yên, chiêm ngưỡng kỳ quan địa chất hiếm có thế giới Gành Đá Đĩa với các cột đá lục lăng xếp chồng. Thăm Bãi Xép nơi quay bối cảnh phim Tôi Thấy Hoa Vàng Trên Cỏ Xanh."},{"day":4,"title":"Mũi Điện Đại Lãnh - Sân bay Tuy Hòa - TP.HCM","desc":"Đón những tia nắng bình minh đầu tiên trên đất liền tại Mũi Đại Lãnh (Mũi Điện), tham quan ngọn hải đăng hơn 100 năm tuổi. Xe đưa ra sân bay Tuy Hòa đáp chuyến bay về TP.HCM."}]'),

('Tour Hà Giang Mùa Hoa Tam Giác Mạch - Đèo Mã Pí Lèng 3N2Đ', 'https://images.unsplash.com/photo-1528127269322-539801943592?w=600&h=400&fit=crop&q=80', 'Vietjet Discovery', '3 Ngày 2 Đêm', 3, 'TP.Hồ Chí Minh', 'Hà Giang', 'VietJet Air', 'Airbus A321neo', '06:00', 'morning', '2 giờ 10 phút', 5490000, 1, 'Vé máy bay khứ hồi Vietjet chặng SGN - HAN, Xe Limousine VIP suốt tuyến Hà Giang, Homestay cộng đồng bản địa, Thuyền kayak sông Nho Quế, Bảo hiểm du lịch', '[{"day":1,"title":"TP.HCM - Hà Nội - Cổng trời Quản Bạ - Rừng thông Yên Minh","desc":"Bay sớm chuyến VJ-182 ra Nội Bài. Xe Limousine đón đoàn trực chỉ cao nguyên đá Hà Giang. Chụp ảnh Cổng Trời Quản Bạ, ngắm Núi Đôi Cô Tiên và rừng thông Yên Minh bạt ngàn."},{"day":2,"title":"Đồng Văn - Tứ đại đỉnh đèo Mã Pí Lèng - Du thuyền hẻm Tu Sản","desc":"Chinh phục con đèo huyền thoại Mã Pí Lèng ngắm vực sâu hun hút. Ngồi thuyền lướt trên dòng sông Nho Quế màu xanh ngọc bích len lỏi qua Hẻm vực Tu Sản sâu nhất Đông Nam Á."},{"day":3,"title":"Cột cờ Lũng Cú cực Bắc - Dinh thự Vua Mèo - Sân bay Nội Bài","desc":"Làm lễ chào cờ trang nghiêm trên đỉnh Lũng Cú nơi địa đầu Tổ quốc. Thăm Dinh Vua Mèo Vương Chính Đức với kiến trúc độc đáo kết hợp Pháp - Hoa - H’Mông. Về Nội Bài bay đêm về TP.HCM."}]'),

('Tour Singapore - Đảo Quốc Sư Tử - Garden By The Bay 4N3Đ', 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=600&h=400&fit=crop&q=80', 'Vietjet Global', '4 Ngày 3 Đêm', 4, 'Hà Nội', 'Singapore', 'Singapore Airlines', 'Boeing 787', '12:35', 'afternoon', '3 giờ 40 phút', 11990000, 1, 'Vé máy bay 5 sao Singapore Airlines khứ hồi, Khách sạn 4 sao trung tâm Orchard Road, Vé tham quan Cloud Forest & Flower Dome, Thưởng thức lẩu Hải Đế Haidilao, Xe đưa đón hiện đại', '[{"day":1,"title":"Hà Nội - Sân bay Changi Thác nước Jewel - Công viên Sư tử biển Merlion","desc":"Đáp chuyến bay đẳng cấp SQ-175 tới Singapore. Check-in thác nước trong nhà Jewel Changi cao 40m. Xe đưa đoàn dạo công viên Merlion chụp hình tượng Sư tử biển phun nước, ngắm tòa nhà con thuyền Marina Bay Sands."},{"day":2,"title":"Kỳ quan Gardens by the Bay - Đảo giải trí Sentosa","desc":"Khám phá hai nhà kính điều hòa khổng lồ Flower Dome và Cloud Forest với thác nước nhân tạo ấn tượng. Chiều sang đảo Sentosa, chụp ảnh biểu tượng quả cầu Universal Studios và tắm biển Siloso."},{"day":3,"title":"Thiên đường mua sắm Orchard - Khu phố văn hóa Chinatown & Little India","desc":"Thỏa sức săn hàng hiệu miễn thuế tại các đại trung tâm thương mại Ion Orchard, Takashimaya. Khám phá nét giao thoa văn hóa đa sắc tộc tại Chinatown và thưởng thức ẩm thực đường phố Hawker Chan Michelin."},{"day":4,"title":"Chùa Răng Phật linh thiêng - Sân bay Changi - Hà Nội","desc":"Viếng Chùa Răng Phật (Buddha Tooth Relic Temple) nguy nga tráng lệ tại trung tâm phố cổ. Xe đưa đoàn ra sân bay Changi làm thủ tục chuyến bay về lại Hà Nội."}]'),

('Tour Thái Lan: Bangkok - Pattaya - Đảo San Hô Coral 5N4Đ', 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=600&h=400&fit=crop&q=80', 'Vietjet Travel', '5 Ngày 4 Đêm', 5, 'TP.Hồ Chí Minh', 'Bangkok', 'VietJet Air', 'Airbus A321', '09:00', 'morning', '1 giờ 30 phút', 6890000, 1, 'Vé bay Vietjet khứ hồi có 20kg ký gửi, Khách sạn 4 sao hồ bơi, Buffet hải sản tầng 86 Baiyoke Sky cao nhất Bangkok, Tặng vé xem Alcazar Cabaret Show và 1 giờ Massage Thái cổ truyền', '[{"day":1,"title":"TP.HCM - Sân bay Suvarnabhumi Bangkok - Thành phố biển Pattaya","desc":"Đáp chuyến bay Vietjet VJ-801 sang Bangkok. Xe và HDV địa phương đón đoàn di chuyển xuống Pattaya. Nhận phòng khách sạn, thưởng thức bữa tối và thưởng ngoạn show biểu diễn người mẫu chuyển giới Alcazar Cabaret rực rỡ."},{"day":2,"title":"Khám phá Đảo San Hô Coral Island - Núi Phật Vàng Khao Chee Chan","desc":"Đi cano cao tốc ra đảo Coral tắm biển làn nước trong xanh hoặc tham gia dù bay, lặn biển (chi phí tự túc). Chiều viếng núi Phật Khắc Vàng bằng tia laser lớn nhất Thái Lan, trải nghiệm massage Thái cổ truyền phục hồi năng lượng."},{"day":3,"title":"Pattaya - Trại Hổ Tiger Park - Thủ đô Bangkok - Du thuyền sông Chao Phraya","desc":"Khởi hành về Bangkok, ghé chụp ảnh cùng những chú hổ tại Tiger Park. Buổi tối lên du thuyền 5 sao dạo sông Mẹ Chao Phraya, thưởng thức ẩm thực hoàng gia và ngắm nhìn chùa Wat Arun rực rỡ trong ánh đèn đêm."},{"day":4,"title":"Chùa Phật Vàng Wat Traimit - Đại tiệc buffet Baiyoke Sky 86 tầng - Mua sắm Siam","desc":"Chiêm bái tượng Phật Thích Ca bằng vàng ròng nguyên khối 5.5 tấn tại Wat Traimit. Ăn trưa buffet quốc tế tại tòa nhà 86 tầng Baiyoke Sky ngắm toàn cảnh Bangkok. Chiều tự do mua sắm tại Siam Paragon, Big C."},{"day":5,"title":"Dạo thuyền Tây Thiên ngắm hiện tượng cá nổi - Bay về TP.HCM","desc":"Đi thuyền ngắm cảnh sông nước linh thiêng và cho cá ăn cầu bình an. Xe đưa đoàn ra sân bay làm thủ tục đáp chuyến bay Vietjet về lại TP.HCM."}]'),

('Tour Đà Lạt Thành Phố Ngàn Hoa - Săn Mây Cầu Đất 3N2Đ', 'https://images.unsplash.com/photo-1546853020-ca4909aef454?w=600&h=400&fit=crop&q=80', 'Vietjet Holiday', '3 Ngày 2 Đêm', 3, 'Hà Nội', 'Đà Lạt', 'VietJet Air', 'Airbus A320', '06:50', 'morning', '1 giờ 50 phút', 3990000, 1, 'Vé bay Vietjet khứ hồi, Khách sạn trung tâm view Hồ Xuân Hương, Tour đón bình minh săn mây đồi chè Cầu Đất, Thưởng thức lẩu gà lá é và buffet rau không giới hạn Leguda, Vé thác Datanla', '[{"day":1,"title":"Hà Nội - Sân bay Liên Khương - Ga xe lửa cổ Đà Lạt - Quảng trường Lâm Viên","desc":"Bay thẳng từ Nội Bài vào Liên Khương. Đoàn tham quan Ga Đà Lạt cổ kính mang phong cách Đông Dương. Check-in nụ hoa Atiso khổng lồ tại Quảng trường Lâm Viên bên Hồ Xuân Hương, tối tự do thưởng thức sữa đậu nành và bánh tráng nướng chợ đêm."},{"day":2,"title":"Săn mây Panorama Cầu Đất - Thác Datanla trượt máng - Vườn hoa Cẩm Tú Cầu","desc":"Khởi hành sớm săn mây đón bình minh tuyệt đẹp trên đồi chè Cầu Đất bát ngát. Trải nghiệm máng trượt xuyên rừng thông dài nhất châu Á tại thác Datanla. Chiều lạc bước giữa cánh đồng hoa cẩm tú cầu bạt ngàn sắc tím."},{"day":3,"title":"Vườn dâu tây công nghệ cao hái trái - Hà Nội","desc":"Tự tay hái những trái dâu tây tươi mọng tại vườn công nghệ cao của người bản địa. Mua sắm mứt hoa quả, trà atiso đặc sản Đà Lạt. Xe đưa đoàn ra sân bay Liên Khương đón chuyến bay Vietjet về lại Hà Nội."}]'),

('Tour Cần Thơ - Chợ Nổi Cái Răng - Rừng Tràm Trà Sư 3N2Đ', 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=600&h=400&fit=crop&q=80', 'Vietjet Travel', '3 Ngày 2 Đêm', 3, 'Hà Nội', 'Cần Thơ', 'VietJet Air', 'Airbus A320', '07:00', 'morning', '2 giờ 15 phút', 3690000, 0, 'Vé máy bay Vietjet khứ hồi, Khách sạn 4 sao bến Ninh Kiều, Thuyền du ngoạn chợ nổi, Xuồng ba lá rừng tràm Trà Sư, Thưởng thức đặc sản cá lóc nướng trui', '[{"day":1,"title":"Hà Nội - Cần Thơ - Bến Ninh Kiều thơ mộng","desc":"Bay từ Hà Nội đến Cần Thơ, nhận phòng khách sạn bên bến Ninh Kiều. Chiều tham quan Nhà cổ Bình Thủy với lối kiến trúc Pháp cổ độc đáo, tối thưởng thức đờn ca tài tử trên du thuyền."},{"day":2,"title":"Chợ nổi Cái Răng - Rừng tràm Trà Sư An Giang","desc":"Khám phá nét sinh hoạt buôn bán tấp nập trên sông của người dân Chợ Nổi Cái Răng vào sáng sớm. Khởi hành đi Châu Đốc, ngồi xuồng ba lá lướt nhẹ trên thảm bèo xanh mướt của rừng tràm Trà Sư."},{"day":3,"title":"Miếu Bà Chúa Xứ - Làng bè nuôi cá - Hà Nội","desc":"Chiêm bái Miếu Bà Chúa Xứ núi Sam linh thiêng. Thăm làng bè nổi nuôi cá basa trên sông Hậu. Mua sắm đặc sản bánh pía, mắm Châu Đốc trước khi ra sân bay Cần Thơ bay về Hà Nội."}]');

-- ------------------------------------------------------------
-- 4. BẢNG ĐƠN ĐẶT CHỖ (orders)
-- ------------------------------------------------------------
DROP TABLE IF EXISTS orders;
CREATE TABLE orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    pnr_code TEXT UNIQUE NOT NULL,
    customer_name TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    customer_address TEXT,
    notes TEXT,
    total_amount INTEGER NOT NULL,
    sender_email TEXT DEFAULT 'nvhai061993@gmail.com',
    status TEXT DEFAULT 'confirmed',
    items_json TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ------------------------------------------------------------
-- 5. CHỈ MỤC TỐI ƯU HÓA (INDEXES)
-- ------------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_flights_from_to ON flights (from_code, to_code);
CREATE INDEX IF NOT EXISTS idx_flights_airline ON flights (airline_code);
CREATE INDEX IF NOT EXISTS idx_flights_price_eco ON flights (price_economy);
CREATE INDEX IF NOT EXISTS idx_flights_time_slot ON flights (time_slot);
CREATE INDEX IF NOT EXISTS idx_flights_direct ON flights (is_direct);

CREATE INDEX IF NOT EXISTS idx_tours_featured ON tours (is_featured);
CREATE INDEX IF NOT EXISTS idx_tours_price ON tours (price);
CREATE INDEX IF NOT EXISTS idx_tours_airline ON tours (airline_partner);
CREATE INDEX IF NOT EXISTS idx_tours_destination ON tours (destination);
