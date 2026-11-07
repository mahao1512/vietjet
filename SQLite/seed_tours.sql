-- ============================================================
-- CƠ SỞ DỮ LIỆU SQLITE: VIETJET TRAVEL & FLIGHT BOOKING
-- FILE: seed_tours.sql (Dữ liệu các tour du lịch - gồm 8 tour nổi bật trang chủ)
-- Tất cả ảnh thumbnail đều tuân thủ độ phân giải chuẩn 600x400
-- ============================================================

INSERT INTO tours (
    title, thumbnail, agency_name,
    duration, days_count, from_city, destination,
    airline_partner, aircraft_type,
    depart_hour, time_slot, flight_duration,
    price, is_featured, services_included, itinerary_json
) VALUES

-- 1. Tour Đà Nẵng (Nổi bật 1)
(
    'Tour Đà Nẵng - Hội An - Cầu Vàng Bà Nà Hills 4N3Đ',
    'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=600&h=400&fit=crop&q=80',
    'Vietjet Travel',
    '4 Ngày 3 Đêm',
    4,
    'Hà Nội',
    'Đà Nẵng',
    'VietJet Air',
    'Airbus A321neo',
    '07:30',
    'morning',
    '1 giờ 20 phút',
    4590000,
    1,
    'Vé máy bay Vietjet khứ hồi, Khách sạn 4 sao biển Mỹ Khê, Vé cáp treo Bà Nà Hills, Ăn trọn gói 7 bữa chính, Xe du lịch đời mới, Hướng dẫn viên suốt tuyến, Bảo hiểm du lịch 100.000.000đ',
    '[{"day":1,"title":"Hà Nội - Sân bay Đà Nẵng - Bán đảo Sơn Trà","desc":"Quý khách tập trung tại sân bay Nội Bài, đáp chuyến bay Vietjet VJ-503 đi Đà Nẵng. Xe và hướng dẫn viên đón đoàn viếng Chùa Linh Ứng Bãi Bụt ngắm tượng Phật Bà 67m, nhận phòng khách sạn 4 sao ven biển Mỹ Khê, tự do tắm biển và ăn tối hải sản."},{"day":2,"title":"Chinh phục Bà Nà Hills - Check-in Cầu Vàng - Làng Pháp","desc":"Khởi hành lên KDL Bà Nà Hills bằng hệ thống cáp treo đạt 4 kỷ lục thế giới. Chiêm ngưỡng Cầu Vàng bàn tay khổng lồ giữa sương mây, check-in Làng Pháp cổ kính, hầm rượu Debay và vui chơi không giới hạn tại công viên Fantasy Park."},{"day":3,"title":"Danh thắng Ngũ Hành Sơn - Phố Cổ Hội An lung linh","desc":"Tham quan Làng đá mỹ nghệ Non Nước, khám phá động Huyền Không. Chiều khởi hành đi Phố Cổ Hội An: thăm Chùa Cầu Nhật Bản, nhà cổ Phùng Hưng, đi thuyền thả hoa đăng trên sông Hoài và thưởng thức đặc sản Cao Lầu, cơm gà."},{"day":4,"title":"Chợ Hàn mua sắm đặc sản miền Trung - Hà Nội","desc":"Đoàn tự do dạo Chợ Hàn mua chả bò, mực rim me, bánh khô mè làm quà. Xe đưa đoàn ra sân bay Đà Nẵng đáp chuyến bay Vietjet về lại Hà Nội. Kết thúc hành trình đầy ắp kỷ niệm."}]'
),

-- 2. Tour Phú Quốc (Nổi bật 2)
(
    'Tour Phú Quốc - Đảo Ngọc Thiên Đường - Grand World 3N2Đ',
    'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=600&h=400&fit=crop&q=80',
    'Vietjet Holiday',
    '3 Ngày 2 Đêm',
    3,
    'TP.Hồ Chí Minh',
    'Phú Quốc',
    'VietJet Air',
    'Airbus A321',
    '08:45',
    'morning',
    '1 giờ 00 phút',
    3890000,
    1,
    'Vé máy bay Vietjet khứ hồi, Resort 4 sao có hồ bơi tràn bờ, Cano tham quan 4 đảo lặn ngắm san hô, Vé xem show Tinh Hoa Việt Nam, Ăn sáng buffet, Bảo hiểm du lịch',
    '[{"day":1,"title":"TP.HCM - Đảo Ngọc Phú Quốc - Thành phố không ngủ Grand World","desc":"Bay thẳng từ Tân Sơn Nhất đến Phú Quốc. Xe đưa đoàn check-in resort nghỉ ngơi. Chiều khám phá thành phố không ngủ Grand World: du ngoạn thuyền Gondola trên dòng kênh Venice lãng mạn, tham quan Bảo tàng Gấu Teddy và thưởng thức show thực cảnh đỉnh cao."},{"day":2,"title":"Trải nghiệm Cano 4 Đảo - Lặn ngắm san hô tự nhiên - Cáp treo Hòn Thơm","desc":"Lên cano cao tốc lướt sóng qua Hòn Mây Rút, Hòn Gầm Ghì, Hòn Móng Tay. Trải nghiệm lặn ngắm rạn san hô tự nhiên rực rỡ sắc màu, chụp ảnh flycam chuyên nghiệp. Chiều đi cáp treo vượt biển 3 dây dài nhất thế giới sang đảo Hòn Thơm."},{"day":3,"title":"Sunset Sanato ngắm hoàng hôn - Mua sắm ngọc trai - TP.HCM","desc":"Check-in cổng trời và đàn voi chân dài tại Sunset Sanato. Tham quan cơ sở nuôi cấy ngọc trai Phú Quốc và nhà thùng nước mắm truyền thống lâu đời. Xe đưa quý khách ra sân bay Phú Quốc bay về TP.HCM."}]'
),

-- 3. Tour Nha Trang (Nổi bật 3)
(
    'Tour Nha Trang Biển Xanh - VinWonders - Du Thuyền Hoàng Hôn 4N3Đ',
    'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=600&h=400&fit=crop&q=80',
    'Vietjet Travel',
    '4 Ngày 3 Đêm',
    4,
    'Hà Nội',
    'Nha Trang',
    'VietJet Air',
    'Airbus A320',
    '09:15',
    'morning',
    '1 giờ 50 phút',
    4990000,
    1,
    'Vé máy bay Vietjet khứ hồi, Khách sạn 5 sao mặt biển đường Trần Phú, Vé trọn gói VinWonders Hòn Tre, Bữa tiệc cocktail du thuyền hoàng hôn, Tắm bùn khoáng cao cấp',
    '[{"day":1,"title":"Hà Nội - Sân bay Cam Ranh - Phố biển Nha Trang","desc":"Hạ cánh sân bay quốc tế Cam Ranh, ngắm cung đường đèo ven biển ngoạn mục. Nhận phòng khách sạn 5 sao mặt biển, thưởng thức đặc sản nem nướng Ninh Hòa và bún cá sứa danh tiếng."},{"day":2,"title":"Thiên đường giải trí VinWonders Hòn Tre - Show nhạc nước Tata","desc":"Đi cáp treo vượt biển sang đảo ngọc Hòn Tre. Thỏa thích khám phá vịnh phao nổi khổng lồ, vườn thú Quý Vương, xem biểu diễn cá heo và thưởng thức siêu phẩm Tata Show hoành tráng."},{"day":3,"title":"Du thuyền ngắm hoàng hôn Vịnh Nha Trang - Tiệc tối 5 sao","desc":"Lên du thuyền 5 sao đẳng cấp, thưởng thức tiệc finger food, rượu vang và lắng nghe giai điệu vĩ cầm du dương khi mặt trời buông xuống mặt vịnh xanh biếc."},{"day":4,"title":"Tháp Bà Ponagar huyền bí - Tắm bùn khoáng nóng - Hà Nội","desc":"Chiêm bái quần thể kiến trúc tháp Chăm cổ kính Ponagar, ngâm mình trong bùn khoáng thiên nhiên giải độc cơ thể tại I-Resort. Xe đưa ra sân bay Cam Ranh về Hà Nội."}]'
),

-- 4. Tour Quy Nhơn (Nổi bật 4)
(
    'Tour Quy Nhơn - Phú Yên - Kỳ Co - Eo Gió - Hoa Vàng Cỏ Xanh 4N3Đ',
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=400&fit=crop&q=80',
    'Vietravel Companion',
    '4 Ngày 3 Đêm',
    4,
    'TP.Hồ Chí Minh',
    'Quy Nhơn',
    'Vietravel Airlines',
    'Airbus A321',
    '06:45',
    'morning',
    '1 giờ 10 phút',
    4290000,
    1,
    'Vé bay khứ hồi Vietravel Airlines, Khách sạn 4 sao trung tâm, Cano cao tốc bãi biển Kỳ Co, Bữa trưa hải sản tươi sống 8 món, Xe ô tô máy lạnh chất lượng cao',
    '[{"day":1,"title":"TP.HCM - Sân bay Phù Cát - Eo Gió hùng vĩ - Kỳ Co","desc":"Bay từ TP.HCM đến Phù Cát. Chinh phục cung đường ven biển đẹp bậc nhất tại Eo Gió nơi đón hoàng hôn đẹp nhất Việt Nam. Lên cano sang bãi tắm Kỳ Co làn nước trong xanh thấu đáy."},{"day":2,"title":"Đồi cát Phương Mai - Tượng Phật ngồi chùa Ông Núi","desc":"Trải nghiệm trượt cát tại đồi cát Phương Mai hoang sơ. Chiêm bái tượng Phật Thích Ca ngồi lớn nhất Đông Nam Á tại chùa Ông Núi, ngắm toàn cảnh đầm Thị Nại."},{"day":3,"title":"Quy Nhơn - Phú Yên - Gành Đá Đĩa - Bãi Xép thơ mộng","desc":"Di chuyển sang Phú Yên, chiêm ngưỡng kỳ quan địa chất hiếm có thế giới Gành Đá Đĩa với các cột đá lục lăng xếp chồng. Thăm Bãi Xép nơi quay bối cảnh phim Tôi Thấy Hoa Vàng Trên Cỏ Xanh."},{"day":4,"title":"Mũi Điện Đại Lãnh - Sân bay Tuy Hòa - TP.HCM","desc":"Đón những tia nắng bình minh đầu tiên trên đất liền tại Mũi Đại Lãnh (Mũi Điện), tham quan ngọn hải đăng hơn 100 năm tuổi. Xe đưa ra sân bay Tuy Hòa đáp chuyến bay về TP.HCM."}]'
),

-- 5. Tour Hà Giang (Nổi bật 5)
(
    'Tour Hà Giang Mùa Hoa Tam Giác Mạch - Đèo Mã Pí Lèng 3N2Đ',
    'https://images.unsplash.com/photo-1528127269322-539801943592?w=600&h=400&fit=crop&q=80',
    'Vietjet Discovery',
    '3 Ngày 2 Đêm',
    3,
    'TP.Hồ Chí Minh',
    'Hà Giang',
    'VietJet Air',
    'Airbus A321neo',
    '06:00',
    'morning',
    '2 giờ 10 phút',
    5490000,
    1,
    'Vé máy bay khứ hồi Vietjet chặng SGN - HAN, Xe Limousine VIP suốt tuyến Hà Giang, Homestay cộng đồng bản địa, Thuyền kayak sông Nho Quế, Bảo hiểm du lịch',
    '[{"day":1,"title":"TP.HCM - Hà Nội - Cổng trời Quản Bạ - Rừng thông Yên Minh","desc":"Bay sớm chuyến VJ-182 ra Nội Bài. Xe Limousine đón đoàn trực chỉ cao nguyên đá Hà Giang. Chụp ảnh Cổng Trời Quản Bạ, ngắm Núi Đôi Cô Tiên và rừng thông Yên Minh bạt ngàn."},{"day":2,"title":"Đồng Văn - Tứ đại đỉnh đèo Mã Pí Lèng - Du thuyền hẻm Tu Sản","desc":"Chinh phục con đèo huyền thoại Mã Pí Lèng ngắm vực sâu hun hút. Ngồi thuyền lướt trên dòng sông Nho Quế màu xanh ngọc bích len lỏi qua Hẻm vực Tu Sản sâu nhất Đông Nam Á."},{"day":3,"title":"Cột cờ Lũng Cú cực Bắc - Dinh thự Vua Mèo - Sân bay Nội Bài","desc":"Làm lễ chào cờ trang nghiêm trên đỉnh Lũng Cú nơi địa đầu Tổ quốc. Thăm Dinh Vua Mèo Vương Chính Đức với kiến trúc độc đáo kết hợp Pháp - Hoa - H’Mông. Về Nội Bài bay đêm về TP.HCM."}]'
),

-- 6. Tour Singapore (Nổi bật 6)
(
    'Tour Singapore - Đảo Quốc Sư Tử - Garden By The Bay 4N3Đ',
    'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=600&h=400&fit=crop&q=80',
    'Vietjet Global',
    '4 Ngày 3 Đêm',
    4,
    'Hà Nội',
    'Singapore',
    'Singapore Airlines',
    'Boeing 787',
    '12:35',
    'afternoon',
    '3 giờ 40 phút',
    11990000,
    1,
    'Vé máy bay 5 sao Singapore Airlines khứ hồi, Khách sạn 4 sao trung tâm Orchard Road, Vé tham quan Cloud Forest & Flower Dome, Thưởng thức lẩu Hải Đế Haidilao, Xe đưa đón hiện đại',
    '[{"day":1,"title":"Hà Nội - Sân bay Changi Thác nước Jewel - Công viên Sư tử biển Merlion","desc":"Đáp chuyến bay đẳng cấp SQ-175 tới Singapore. Check-in thác nước trong nhà Jewel Changi cao 40m. Xe đưa đoàn dạo công viên Merlion chụp hình tượng Sư tử biển phun nước, ngắm tòa nhà con thuyền Marina Bay Sands."},{"day":2,"title":"Kỳ quan Gardens by the Bay - Đảo giải trí Sentosa","desc":"Khám phá hai nhà kính điều hòa khổng lồ Flower Dome và Cloud Forest với thác nước nhân tạo ấn tượng. Chiều sang đảo Sentosa, chụp ảnh biểu tượng quả cầu Universal Studios và tắm biển Siloso."},{"day":3,"title":"Thiên đường mua sắm Orchard - Khu phố văn hóa Chinatown & Little India","desc":"Thỏa sức săn hàng hiệu miễn thuế tại các đại trung tâm thương mại Ion Orchard, Takashimaya. Khám phá nét giao thoa văn hóa đa sắc tộc tại Chinatown và thưởng thức ẩm thực đường phố Hawker Chan Michelin."},{"day":4,"title":"Chùa Răng Phật linh thiêng - Sân bay Changi - Hà Nội","desc":"Viếng Chùa Răng Phật (Buddha Tooth Relic Temple) nguy nga tráng lệ tại trung tâm phố cổ. Xe đưa đoàn ra sân bay Changi làm thủ tục chuyến bay về lại Hà Nội."}]'
),

-- 7. Tour Thái Lan (Nổi bật 7)
(
    'Tour Thái Lan: Bangkok - Pattaya - Đảo San Hô Coral 5N4Đ',
    'https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=600&h=400&fit=crop&q=80',
    'Vietjet Travel',
    '5 Ngày 4 Đêm',
    5,
    'TP.Hồ Chí Minh',
    'Bangkok',
    'VietJet Air',
    'Airbus A321',
    '09:00',
    'morning',
    '1 giờ 30 phút',
    6890000,
    1,
    'Vé bay Vietjet khứ hồi có 20kg ký gửi, Khách sạn 4 sao hồ bơi, Buffet hải sản tầng 86 Baiyoke Sky cao nhất Bangkok, Tặng vé xem Alcazar Cabaret Show và 1 giờ Massage Thái cổ truyền',
    '[{"day":1,"title":"TP.HCM - Sân bay Suvarnabhumi Bangkok - Thành phố biển Pattaya","desc":"Đáp chuyến bay Vietjet VJ-801 sang Bangkok. Xe và HDV địa phương đón đoàn di chuyển xuống Pattaya. Nhận phòng khách sạn, thưởng thức bữa tối và thưởng ngoạn show biểu diễn người mẫu chuyển giới Alcazar Cabaret rực rỡ."},{"day":2,"title":"Khám phá Đảo San Hô Coral Island - Núi Phật Vàng Khao Chee Chan","desc":"Đi cano cao tốc ra đảo Coral tắm biển làn nước trong xanh hoặc tham gia dù bay, lặn biển (chi phí tự túc). Chiều viếng núi Phật Khắc Vàng bằng tia laser lớn nhất Thái Lan, trải nghiệm massage Thái cổ truyền phục hồi năng lượng."},{"day":3,"title":"Pattaya - Trại Hổ Tiger Park - Thủ đô Bangkok - Du thuyền sông Chao Phraya","desc":"Khởi hành về Bangkok, ghé chụp ảnh cùng những chú hổ tại Tiger Park. Buổi tối lên du thuyền 5 sao dạo sông Mẹ Chao Phraya, thưởng thức ẩm thực hoàng gia và ngắm nhìn chùa Wat Arun rực rỡ trong ánh đèn đêm."},{"day":4,"title":"Chùa Phật Vàng Wat Traimit - Đại tiệc buffet Baiyoke Sky 86 tầng - Mua sắm Siam","desc":"Chiêm bái tượng Phật Thích Ca bằng vàng ròng nguyên khối 5.5 tấn tại Wat Traimit. Ăn trưa buffet quốc tế tại tòa nhà 86 tầng Baiyoke Sky ngắm toàn cảnh Bangkok. Chiều tự do mua sắm tại Siam Paragon, Big C."},{"day":5,"title":"Dạo thuyền Tây Thiên ngắm hiện tượng cá nổi - Bay về TP.HCM","desc":"Đi thuyền ngắm cảnh sông nước linh thiêng và cho cá ăn cầu bình an. Xe đưa đoàn ra sân bay làm thủ tục đáp chuyến bay Vietjet về lại TP.HCM."}]'
),

-- 8. Tour Đà Lạt (Nổi bật 8)
(
    'Tour Đà Lạt Thành Phố Ngàn Hoa - Săn Mây Cầu Đất 3N2Đ',
    'https://images.unsplash.com/photo-1546853020-ca4909aef454?w=600&h=400&fit=crop&q=80',
    'Vietjet Holiday',
    '3 Ngày 2 Đêm',
    3,
    'Hà Nội',
    'Đà Lạt',
    'VietJet Air',
    'Airbus A320',
    '06:50',
    'morning',
    '1 giờ 50 phút',
    3990000,
    1,
    'Vé bay Vietjet khứ hồi, Khách sạn trung tâm view Hồ Xuân Hương, Tour đón bình minh săn mây đồi chè Cầu Đất, Thưởng thức lẩu gà lá é và buffet rau không giới hạn Leguda, Vé thác Datanla',
    '[{"day":1,"title":"Hà Nội - Sân bay Liên Khương - Ga xe lửa cổ Đà Lạt - Quảng trường Lâm Viên","desc":"Bay thẳng từ Nội Bài vào Liên Khương. Đoàn tham quan Ga Đà Lạt cổ kính mang phong cách Đông Dương. Check-in nụ hoa Atiso khổng lồ tại Quảng trường Lâm Viên bên Hồ Xuân Hương, tối tự do thưởng thức sữa đậu nành và bánh tráng nướng chợ đêm."},{"day":2,"title":"Săn mây Panorama Cầu Đất - Thác Datanla trượt máng - Vườn hoa Cẩm Tú Cầu","desc":"Khởi hành sớm săn mây đón bình minh tuyệt đẹp trên đồi chè Cầu Đất bát ngát. Trải nghiệm máng trượt xuyên rừng thông dài nhất châu Á tại thác Datanla. Chiều lạc bước giữa cánh đồng hoa cẩm tú cầu bạt ngàn sắc tím."},{"day":3,"title":"Vườn dâu tây công nghệ cao hái trái - Hà Nội","desc":"Tự tay hái những trái dâu tây tươi mọng tại vườn công nghệ cao của người bản địa. Mua sắm mứt hoa quả, trà atiso đặc sản Đà Lạt. Xe đưa đoàn ra sân bay Liên Khương đón chuyến bay Vietjet về lại Hà Nội."}]'
),

-- 9. Tour bổ sung: Miền Tây Sông Nước
(
    'Tour Cần Thơ - Chợ Nổi Cái Răng - Rừng Tràm Trà Sư 3N2Đ',
    'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=600&h=400&fit=crop&q=80',
    'Vietjet Travel',
    '3 Ngày 2 Đêm',
    3,
    'Hà Nội',
    'Cần Thơ',
    'VietJet Air',
    'Airbus A320',
    '07:00',
    'morning',
    '2 giờ 15 phút',
    3690000,
    0,
    'Vé máy bay Vietjet khứ hồi, Khách sạn 4 sao bến Ninh Kiều, Thuyền du ngoạn chợ nổi, Xuồng ba lá rừng tràm Trà Sư, Thưởng thức đặc sản cá lóc nướng trui',
    '[{"day":1,"title":"Hà Nội - Cần Thơ - Bến Ninh Kiều thơ mộng","desc":"Bay từ Hà Nội đến Cần Thơ, nhận phòng khách sạn bên bến Ninh Kiều. Chiều tham quan Nhà cổ Bình Thủy với lối kiến trúc Pháp cổ độc đáo, tối thưởng thức đờn ca tài tử trên du thuyền."},{"day":2,"title":"Chợ nổi Cái Răng - Rừng tràm Trà Sư An Giang","desc":"Khám phá nét sinh hoạt buôn bán tấp nập trên sông của người dân Chợ Nổi Cái Răng vào sáng sớm. Khởi hành đi Châu Đốc, ngồi xuồng ba lá lướt nhẹ trên thảm bèo xanh mướt của rừng tràm Trà Sư."},{"day":3,"title":"Miếu Bà Chúa Xứ - Làng bè nuôi cá - Hà Nội","desc":"Chiêm bái Miếu Bà Chúa Xứ núi Sam linh thiêng. Thăm làng bè nổi nuôi cá basa trên sông Hậu. Mua sắm đặc sản bánh pía, mắm Châu Đốc trước khi ra sân bay Cần Thơ bay về Hà Nội."}]'
);
