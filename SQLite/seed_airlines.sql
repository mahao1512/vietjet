-- ============================================================
-- CƠ SỞ DỮ LIỆU SQLITE: VIETJET TRAVEL & FLIGHT BOOKING
-- FILE: seed_airlines.sql (Dữ liệu các hãng hàng không đối tác)
-- ============================================================

INSERT INTO airlines (code, name, logo, rating, country, description) VALUES
('VJ', 'VietJet Air', 'image/logo.jpg', 4.8, 'Việt Nam', 'Hãng hàng không thế hệ mới, tiên phong mang đến cơ hội bay với chi phí tiết kiệm và dịch vụ thân thiện, hiện đại.'),
('VN', 'Vietnam Airlines', 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=120&auto=format&fit=crop&q=80', 4.9, 'Việt Nam', 'Hãng hàng không quốc gia Việt Nam chuẩn quốc tế 4 sao Skytrax với mạng bay rộng khắp thế giới.'),
('SQ', 'Singapore Airlines', 'https://images.unsplash.com/photo-1556388158-158ea5caac53?w=120&auto=format&fit=crop&q=80', 5.0, 'Singapore', 'Hãng hàng không 5 sao hàng đầu thế giới với khoang thương gia đẳng cấp và dịch vụ khoang khách hoàn mỹ.'),
('QH', 'Bamboo Airways', 'https://images.unsplash.com/photo-1517479149777-5f3b1511d5ad?w=120&auto=format&fit=crop&q=80', 4.7, 'Việt Nam', 'Hãng hàng không định hướng dịch vụ hiếu khách tận tâm, phong cách phục vụ đẳng cấp và tỷ lệ đúng giờ cao.'),
('VU', 'Vietravel Airlines', 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=120&auto=format&fit=crop&q=80', 4.6, 'Việt Nam', 'Hãng hàng không du lịch đầu tiên tại Việt Nam, kết nối các điểm đến du lịch nổi tiếng trên khắp dải đất hình chữ S.'),
('QR', 'Qatar Airways', 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?w=120&auto=format&fit=crop&q=80', 4.9, 'Qatar', 'Hãng hàng không tốt nhất thế giới với mạng lưới bay liên lục địa trải rộng khắp châu Âu, châu Mỹ và Trung Đông.');
