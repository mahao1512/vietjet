-- ============================================================
-- CƠ SỞ DỮ LIỆU SQLITE: VIETJET TRAVEL & FLIGHT BOOKING
-- FILE: seed_flights.sql (Dữ liệu các chuyến bay)
-- ============================================================

INSERT INTO flights (
    airline_code, airline_name, flight_number,
    from_city, from_code, to_city, to_code,
    depart_time, arrive_time, duration,
    flight_type, is_direct, aircraft_type,
    price_economy, price_business,
    time_slot, services_economy, services_business, seats_available
) VALUES
-- 1. Tuyến Hà Nội (HAN) ➔ TP.Hồ Chí Minh (SGN)
('VJ', 'VietJet Air', 'VJ-182', 'Hà Nội', 'HAN', 'TP.Hồ Chí Minh', 'SGN', '06:15', '08:25', '2 giờ 10 phút', 'one_way', 1, 'Airbus A321neo', 1190000, 3290000, 'morning', '07kg hành lý xách tay, nước uống đóng chai', 'Phòng chờ SkyBoss VIP, 40kg hành lý ký gửi + 10kg xách tay, phục vụ ẩm thực nóng cao cấp, ưu tiên làm thủ tục & chọn chỗ ngồi', 42),

('VN', 'Vietnam Airlines', 'VN-210', 'Hà Nội', 'HAN', 'TP.Hồ Chí Minh', 'SGN', '08:00', '10:15', '2 giờ 15 phút', 'one_way', 1, 'Boeing 787-9 Dreamliner', 1890000, 4890000, 'morning', '12kg xách tay + 23kg ký gửi, suất ăn nóng và nước giải khát', 'Phòng chờ Bông Sen Vàng 5 sao, 40kg ký gửi, ghế thương gia ngả phẳng 180 độ, sâm panh và thực đơn Âu Á', 28),

('VJ', 'VietJet Air', 'VJ-186', 'Hà Nội', 'HAN', 'TP.Hồ Chí Minh', 'SGN', '09:30', '11:45', '2 giờ 15 phút', 'one_way', 1, 'Airbus A321neo', 1350000, 3450000, 'morning', '07kg hành lý xách tay, nước suối', 'Phòng chờ SkyBoss VIP, 40kg ký gửi, ưu tiên check-in, suất ăn nóng tùy chọn', 35),

('QH', 'Bamboo Airways', 'QH-203', 'Hà Nội', 'HAN', 'TP.Hồ Chí Minh', 'SGN', '11:20', '13:35', '2 giờ 15 phút', 'one_way', 1, 'Boeing 787-9', 1590000, 3990000, 'morning', '07kg xách tay + 20kg ký gửi, đồ ăn nhẹ theo mùa', 'Khoang thương gia riêng biệt, phòng chờ First Lounge, 40kg ký gửi, lối đi ưu tiên', 19),

('VJ', 'VietJet Air', 'VJ-194', 'Hà Nội', 'HAN', 'TP.Hồ Chí Minh', 'SGN', '14:40', '16:55', '2 giờ 15 phút', 'one_way', 1, 'Airbus A320', 1250000, 3350000, 'afternoon', '07kg hành lý xách tay', 'Phòng chờ SkyBoss, 40kg hành lý ký gửi, suất ăn nóng', 50),

('VN', 'Vietnam Airlines', 'VN-255', 'Hà Nội', 'HAN', 'TP.Hồ Chí Minh', 'SGN', '16:00', '18:15', '2 giờ 15 phút', 'one_way', 1, 'Airbus A350-900', 1950000, 5100000, 'afternoon', '12kg xách tay + 23kg ký gửi, màn hình giải trí cá nhân', 'Khoang Business giường nằm, tai nghe chống ồn cao cấp, phòng chờ Lotus Lounge', 24),

('VJ', 'VietJet Air', 'VJ-198', 'Hà Nội', 'HAN', 'TP.Hồ Chí Minh', 'SGN', '20:15', '22:25', '2 giờ 10 phút', 'one_way', 1, 'Airbus A321neo', 1090000, 2990000, 'evening', '07kg hành lý xách tay', 'Phòng chờ SkyBoss, ưu tiên soi chiếu an ninh, suất ăn nóng tùy chọn', 65),

-- 2. Tuyến Hà Nội (HAN) ➔ Đà Nẵng (DAD)
('VJ', 'VietJet Air', 'VJ-503', 'Hà Nội', 'HAN', 'Đà Nẵng', 'DAD', '07:15', '08:35', '1 giờ 20 phút', 'one_way', 1, 'Airbus A320', 890000, 2450000, 'morning', '07kg hành lý xách tay tiêu chuẩn', 'SkyBoss Lounge, 30kg ký gửi, quầy thủ tục riêng, suất ăn đặc biệt', 38),

('VN', 'Vietnam Airlines', 'VN-165', 'Hà Nội', 'HAN', 'Đà Nẵng', 'DAD', '14:20', '15:45', '1 giờ 25 phút', 'one_way', 1, 'Airbus A321', 1450000, 3650000, 'afternoon', '12kg xách tay + 23kg ký gửi, nước ép trái cây', 'Ghế da thương gia cao cấp, phòng chờ VIP, suất ăn nóng tươi ngon', 16),

('QH', 'Bamboo Airways', 'QH-105', 'Hà Nội', 'HAN', 'Đà Nẵng', 'DAD', '18:30', '19:50', '1 giờ 20 phút', 'one_way', 1, 'Embraer 190', 1250000, 2950000, 'evening', '07kg xách tay + 20kg ký gửi', 'Ưu tiên làm thủ tục, phòng chờ Bamboo Lounge, đồ uống cao cấp', 22),

-- 3. Tuyến TP.Hồ Chí Minh (SGN) ➔ Đà Nẵng (DAD)
('VJ', 'VietJet Air', 'VJ-622', 'TP.Hồ Chí Minh', 'SGN', 'Đà Nẵng', 'DAD', '06:30', '07:50', '1 giờ 20 phút', 'one_way', 1, 'Airbus A321neo', 920000, 2550000, 'morning', '07kg hành lý xách tay', 'SkyBoss VIP, 30kg ký gửi, xe riêng đưa đón ra máy bay', 45),

('VN', 'Vietnam Airlines', 'VN-128', 'TP.Hồ Chí Minh', 'SGN', 'Đà Nẵng', 'DAD', '10:05', '11:30', '1 giờ 25 phút', 'one_way', 1, 'Airbus A321', 1520000, 3750000, 'morning', '23kg ký gửi + 12kg xách tay, đồ ăn nhẹ', 'Phòng chờ hạng thương gia ga quốc nội, hành lý ưu tiên dán thẻ VIP', 20),

-- 4. Tuyến TP.Hồ Chí Minh (SGN) ➔ Phú Quốc (PQC)
('VJ', 'VietJet Air', 'VJ-325', 'TP.Hồ Chí Minh', 'SGN', 'Phú Quốc', 'PQC', '08:10', '09:10', '1 giờ 00 phút', 'one_way', 1, 'Airbus A321', 790000, 2190000, 'morning', '07kg hành lý xách tay', 'SkyBoss ưu tiên lên máy bay, 30kg ký gửi, phục vụ nước yến/cà phê', 30),

('VN', 'Vietnam Airlines', 'VN-1823', 'TP.Hồ Chí Minh', 'SGN', 'Phú Quốc', 'PQC', '15:15', '16:15', '1 giờ 00 phút', 'one_way', 1, 'Airbus A321', 1320000, 3150000, 'afternoon', '23kg hành lý ký gửi, khăn lạnh và nước', 'Ghế rộng êm ái, quầy thủ tục VIP, miễn phí đổi vé', 15),

-- 5. Tuyến TP.Hồ Chí Minh (SGN) ➔ Quy Nhơn (UIH)
('VU', 'Vietravel Airlines', 'VU-781', 'TP.Hồ Chí Minh', 'SGN', 'Quy Nhơn', 'UIH', '11:00', '12:10', '1 giờ 10 phút', 'one_way', 1, 'Airbus A321', 850000, 2200000, 'morning', '07kg xách tay, đồ ăn nhẹ theo set du lịch', 'Hàng ghế đầu ưu tiên, phòng chờ thương gia sân bay Tân Sơn Nhất', 25),

-- 6. Tuyến Quốc tế: Hà Nội (HAN) ➔ Singapore (SIN)
('SQ', 'Singapore Airlines', 'SQ-175', 'Hà Nội', 'HAN', 'Singapore', 'SIN', '12:35', '17:15', '3 giờ 40 phút', 'one_way', 1, 'Airbus A350-900', 3250000, 8950000, 'afternoon', '25kg hành lý ký gửi, hệ thống giải trí KrisWorld, bữa ăn nóng quốc tế', 'Khoang Business sang trọng, ghế phẳng thành giường, sâm panh thượng hạng, phòng chờ SilverKris Changi', 18),

('VJ', 'VietJet Air', 'VJ-915', 'Hà Nội', 'HAN', 'Singapore', 'SIN', '09:35', '13:55', '3 giờ 20 phút', 'one_way', 1, 'Airbus A321neo', 1980000, 5200000, 'morning', '07kg hành lý xách tay', 'SkyBoss quốc tế: Phòng chờ VIP, 40kg ký gửi, ẩm thực nóng, check-in riêng', 32),

-- 7. Tuyến Quốc tế: TP.Hồ Chí Minh (SGN) ➔ Bangkok (BKK)
('VJ', 'VietJet Air', 'VJ-801', 'TP.Hồ Chí Minh', 'SGN', 'Bangkok', 'BKK', '09:00', '10:30', '1 giờ 30 phút', 'one_way', 1, 'Airbus A321', 1450000, 3950000, 'morning', '07kg xách tay, nước suối', 'Phòng chờ SkyBoss Tân Sơn Nhất & Suvarnabhumi, 40kg hành lý ký gửi', 40),

-- 8. Chuyến bay nhiều thành phố / Nối chuyến (Multi-city / Transit)
('VN', 'Vietnam Airlines', 'VN-7201', 'Hà Nội', 'HAN', 'Phú Quốc', 'PQC', '06:00', '11:30', '5 giờ 30 phút', 'one_way', 0, 'Boeing 787 / A321', 2350000, 5900000, 'early', 'Nối chuyến tại SGN (1h30m), 23kg ký gửi', 'Toàn chặng hạng thương gia, phòng chờ tại HAN và SGN', 12);
