/**
 * VIETJET TRAVEL & BOOKING PORTAL
 * FILE: js/db.js (SQLite WebAssembly Database & Unified Query Engine)
 * 
 * Hệ thống hỗ trợ 2 chế độ:
 * 1. Chế độ Trực Tiếp (Live Server / HTTP): Nạp trực tiếp file nhị phân "SQLite/db.db" qua WebAssembly (sql.js).
 *    Bất cứ khi nào bạn sửa SQLite/db.db và F5 trình duyệt, trang sẽ đọc ngay dữ liệu mới nhất từ SQLite/db.db!
 * 2. Chế độ Dự Phòng (file:// protocol): Dùng bộ nhớ JS dự phòng khi trình duyệt chặn CORS không cho fetch file local.
 */

(function () {
  'use strict';

  let sqliteDB = null;
  let isRealDbLoaded = false;

  // Dữ liệu dự phòng đồng bộ từ SQLite/db.db
  const MOCK_AIRLINES = [
  {
    "id": 1,
    "code": "VJ",
    "name": "VietJet Air",
    "logo": "image/logo.jpg",
    "rating": 4.8,
    "country": "Việt Nam",
    "description": "Hãng hàng không thế hệ mới, tiên phong mang đến cơ hội bay với chi phí tiết kiệm và dịch vụ thân thiện, hiện đại."
  },
  {
    "id": 2,
    "code": "VN",
    "name": "Vietnam Airlines",
    "logo": "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=120&auto=format&fit=crop&q=80",
    "rating": 4.9,
    "country": "Việt Nam",
    "description": "Hãng hàng không quốc gia Việt Nam chuẩn quốc tế 4 sao Skytrax với mạng bay rộng khắp thế giới."
  },
  {
    "id": 3,
    "code": "SQ",
    "name": "Singapore Airlines",
    "logo": "https://images.unsplash.com/photo-1556388158-158ea5caac53?w=120&auto=format&fit=crop&q=80",
    "rating": 5.0,
    "country": "Singapore",
    "description": "Hãng hàng không 5 sao hàng đầu thế giới với khoang thương gia đẳng cấp và dịch vụ khoang khách hoàn mỹ."
  },
  {
    "id": 4,
    "code": "QH",
    "name": "Bamboo Airways",
    "logo": "https://images.unsplash.com/photo-1517479149777-5f3b1511d5ad?w=120&auto=format&fit=crop&q=80",
    "rating": 4.7,
    "country": "Việt Nam",
    "description": "Hãng hàng không định hướng dịch vụ hiếu khách tận tâm, phong cách phục vụ đẳng cấp và tỷ lệ đúng giờ cao."
  },
  {
    "id": 5,
    "code": "VU",
    "name": "Vietravel Airlines",
    "logo": "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=120&auto=format&fit=crop&q=80",
    "rating": 4.6,
    "country": "Việt Nam",
    "description": "Hãng hàng không du lịch đầu tiên tại Việt Nam, kết nối các điểm đến du lịch nổi tiếng trên khắp dải đất hình chữ S."
  },
  {
    "id": 6,
    "code": "QR",
    "name": "Qatar Airways",
    "logo": "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?w=120&auto=format&fit=crop&q=80",
    "rating": 4.9,
    "country": "Qatar",
    "description": "Hãng hàng không tốt nhất thế giới với mạng lưới bay liên lục địa trải rộng khắp châu Âu, châu Mỹ và Trung Đông."
  }
];

  const MOCK_FLIGHTS = [
  {
    "id": 1,
    "airline_code": "VJ",
    "airline_name": "VietJet Air",
    "flight_number": "VJ-182",
    "from_city": "Hà Nội",
    "from_code": "HAN",
    "to_city": "TP.Hồ Chí Minh",
    "to_code": "SGN",
    "depart_time": "06:15",
    "arrive_time": "08:25",
    "duration": "2 giờ 10 phút",
    "flight_type": "one_way",
    "is_direct": 1,
    "aircraft_type": "Airbus A321neo",
    "price_economy": 1500000,
    "price_business": 3290000,
    "time_slot": "morning",
    "services_economy": "07kg hành lý xách tay, nước uống đóng chai",
    "services_business": "Phòng chờ SkyBoss VIP, 40kg hành lý ký gửi + 10kg xách tay, phục vụ ẩm thực nóng cao cấp, ưu tiên làm thủ tục & chọn chỗ ngồi",
    "seats_available": 42,
    "created_at": "2026-11-07 06:50:57"
  },
  {
    "id": 2,
    "airline_code": "VN",
    "airline_name": "Vietnam Airlines",
    "flight_number": "VN-210",
    "from_city": "Hà Nội",
    "from_code": "HAN",
    "to_city": "TP.Hồ Chí Minh",
    "to_code": "SGN",
    "depart_time": "08:00",
    "arrive_time": "10:15",
    "duration": "2 giờ 15 phút",
    "flight_type": "one_way",
    "is_direct": 1,
    "aircraft_type": "Boeing 787-9 Dreamliner",
    "price_economy": 1890000,
    "price_business": 4890000,
    "time_slot": "morning",
    "services_economy": "12kg xách tay + 23kg ký gửi, suất ăn nóng và nước giải khát",
    "services_business": "Phòng chờ Bông Sen Vàng 5 sao, 40kg ký gửi, ghế thương gia ngả phẳng 180 độ, sâm panh và thực đơn Âu Á",
    "seats_available": 28,
    "created_at": "2026-11-07 06:50:57"
  },
  {
    "id": 3,
    "airline_code": "VJ",
    "airline_name": "VietJet Air",
    "flight_number": "VJ-186",
    "from_city": "Hà Nội",
    "from_code": "HAN",
    "to_city": "TP.Hồ Chí Minh",
    "to_code": "SGN",
    "depart_time": "09:30",
    "arrive_time": "11:45",
    "duration": "2 giờ 15 phút",
    "flight_type": "one_way",
    "is_direct": 1,
    "aircraft_type": "Airbus A321neo",
    "price_economy": 1350000,
    "price_business": 3450000,
    "time_slot": "morning",
    "services_economy": "07kg hành lý xách tay, nước suối",
    "services_business": "Phòng chờ SkyBoss VIP, 40kg ký gửi, ưu tiên check-in, suất ăn nóng tùy chọn",
    "seats_available": 35,
    "created_at": "2026-11-07 06:50:57"
  },
  {
    "id": 4,
    "airline_code": "QH",
    "airline_name": "Bamboo Airways",
    "flight_number": "QH-203",
    "from_city": "Hà Nội",
    "from_code": "HAN",
    "to_city": "TP.Hồ Chí Minh",
    "to_code": "SGN",
    "depart_time": "11:20",
    "arrive_time": "13:35",
    "duration": "2 giờ 15 phút",
    "flight_type": "one_way",
    "is_direct": 1,
    "aircraft_type": "Boeing 787-9",
    "price_economy": 1590000,
    "price_business": 3990000,
    "time_slot": "morning",
    "services_economy": "07kg xách tay + 20kg ký gửi, đồ ăn nhẹ theo mùa",
    "services_business": "Khoang thương gia riêng biệt, phòng chờ First Lounge, 40kg ký gửi, lối đi ưu tiên",
    "seats_available": 19,
    "created_at": "2026-11-07 06:50:57"
  },
  {
    "id": 5,
    "airline_code": "VJ",
    "airline_name": "VietJet Air",
    "flight_number": "VJ-194",
    "from_city": "Hà Nội",
    "from_code": "HAN",
    "to_city": "TP.Hồ Chí Minh",
    "to_code": "SGN",
    "depart_time": "14:40",
    "arrive_time": "16:55",
    "duration": "2 giờ 15 phút",
    "flight_type": "one_way",
    "is_direct": 1,
    "aircraft_type": "Airbus A320",
    "price_economy": 1250000,
    "price_business": 3350000,
    "time_slot": "afternoon",
    "services_economy": "07kg hành lý xách tay",
    "services_business": "Phòng chờ SkyBoss, 40kg hành lý ký gửi, suất ăn nóng",
    "seats_available": 50,
    "created_at": "2026-11-07 06:50:57"
  },
  {
    "id": 6,
    "airline_code": "VN",
    "airline_name": "Vietnam Airlines",
    "flight_number": "VN-255",
    "from_city": "Hà Nội",
    "from_code": "HAN",
    "to_city": "TP.Hồ Chí Minh",
    "to_code": "SGN",
    "depart_time": "16:00",
    "arrive_time": "18:15",
    "duration": "2 giờ 15 phút",
    "flight_type": "one_way",
    "is_direct": 1,
    "aircraft_type": "Airbus A350-900",
    "price_economy": 1950000,
    "price_business": 5100000,
    "time_slot": "afternoon",
    "services_economy": "12kg xách tay + 23kg ký gửi, màn hình giải trí cá nhân",
    "services_business": "Khoang Business giường nằm, tai nghe chống ồn cao cấp, phòng chờ Lotus Lounge",
    "seats_available": 24,
    "created_at": "2026-11-07 06:50:57"
  },
  {
    "id": 7,
    "airline_code": "VJ",
    "airline_name": "VietJet Air",
    "flight_number": "VJ-198",
    "from_city": "Hà Nội",
    "from_code": "HAN",
    "to_city": "TP.Hồ Chí Minh",
    "to_code": "SGN",
    "depart_time": "20:15",
    "arrive_time": "22:25",
    "duration": "2 giờ 10 phút",
    "flight_type": "one_way",
    "is_direct": 1,
    "aircraft_type": "Airbus A321neo",
    "price_economy": 1090000,
    "price_business": 2990000,
    "time_slot": "evening",
    "services_economy": "07kg hành lý xách tay",
    "services_business": "Phòng chờ SkyBoss, ưu tiên soi chiếu an ninh, suất ăn nóng tùy chọn",
    "seats_available": 65,
    "created_at": "2026-11-07 06:50:57"
  },
  {
    "id": 8,
    "airline_code": "VJ",
    "airline_name": "VietJet Air",
    "flight_number": "VJ-503",
    "from_city": "Hà Nội",
    "from_code": "HAN",
    "to_city": "Đà Nẵng",
    "to_code": "DAD",
    "depart_time": "07:15",
    "arrive_time": "08:35",
    "duration": "1 giờ 20 phút",
    "flight_type": "one_way",
    "is_direct": 1,
    "aircraft_type": "Airbus A320",
    "price_economy": 890000,
    "price_business": 2450000,
    "time_slot": "morning",
    "services_economy": "07kg hành lý xách tay tiêu chuẩn",
    "services_business": "SkyBoss Lounge, 30kg ký gửi, quầy thủ tục riêng, suất ăn đặc biệt",
    "seats_available": 38,
    "created_at": "2026-11-07 06:50:57"
  },
  {
    "id": 9,
    "airline_code": "VN",
    "airline_name": "Vietnam Airlines",
    "flight_number": "VN-165",
    "from_city": "Hà Nội",
    "from_code": "HAN",
    "to_city": "Đà Nẵng",
    "to_code": "DAD",
    "depart_time": "14:20",
    "arrive_time": "15:45",
    "duration": "1 giờ 25 phút",
    "flight_type": "one_way",
    "is_direct": 1,
    "aircraft_type": "Airbus A321",
    "price_economy": 1450000,
    "price_business": 3650000,
    "time_slot": "afternoon",
    "services_economy": "12kg xách tay + 23kg ký gửi, nước ép trái cây",
    "services_business": "Ghế da thương gia cao cấp, phòng chờ VIP, suất ăn nóng tươi ngon",
    "seats_available": 16,
    "created_at": "2026-11-07 06:50:57"
  },
  {
    "id": 10,
    "airline_code": "QH",
    "airline_name": "Bamboo Airways",
    "flight_number": "QH-105",
    "from_city": "Hà Nội",
    "from_code": "HAN",
    "to_city": "Đà Nẵng",
    "to_code": "DAD",
    "depart_time": "18:30",
    "arrive_time": "19:50",
    "duration": "1 giờ 20 phút",
    "flight_type": "one_way",
    "is_direct": 1,
    "aircraft_type": "Embraer 190",
    "price_economy": 1250000,
    "price_business": 2950000,
    "time_slot": "evening",
    "services_economy": "07kg xách tay + 20kg ký gửi",
    "services_business": "Ưu tiên làm thủ tục, phòng chờ Bamboo Lounge, đồ uống cao cấp",
    "seats_available": 22,
    "created_at": "2026-11-07 06:50:57"
  },
  {
    "id": 11,
    "airline_code": "VJ",
    "airline_name": "VietJet Air",
    "flight_number": "VJ-622",
    "from_city": "TP.Hồ Chí Minh",
    "from_code": "SGN",
    "to_city": "Đà Nẵng",
    "to_code": "DAD",
    "depart_time": "06:30",
    "arrive_time": "07:50",
    "duration": "1 giờ 20 phút",
    "flight_type": "one_way",
    "is_direct": 1,
    "aircraft_type": "Airbus A321neo",
    "price_economy": 920000,
    "price_business": 2550000,
    "time_slot": "morning",
    "services_economy": "07kg hành lý xách tay",
    "services_business": "SkyBoss VIP, 30kg ký gửi, xe riêng đưa đón ra máy bay",
    "seats_available": 45,
    "created_at": "2026-11-07 06:50:57"
  },
  {
    "id": 12,
    "airline_code": "VN",
    "airline_name": "Vietnam Airlines",
    "flight_number": "VN-128",
    "from_city": "TP.Hồ Chí Minh",
    "from_code": "SGN",
    "to_city": "Đà Nẵng",
    "to_code": "DAD",
    "depart_time": "10:05",
    "arrive_time": "11:30",
    "duration": "1 giờ 25 phút",
    "flight_type": "one_way",
    "is_direct": 1,
    "aircraft_type": "Airbus A321",
    "price_economy": 1520000,
    "price_business": 3750000,
    "time_slot": "morning",
    "services_economy": "23kg ký gửi + 12kg xách tay, đồ ăn nhẹ",
    "services_business": "Phòng chờ hạng thương gia ga quốc nội, hành lý ưu tiên dán thẻ VIP",
    "seats_available": 20,
    "created_at": "2026-11-07 06:50:57"
  },
  {
    "id": 13,
    "airline_code": "VJ",
    "airline_name": "VietJet Air",
    "flight_number": "VJ-325",
    "from_city": "TP.Hồ Chí Minh",
    "from_code": "SGN",
    "to_city": "Phú Quốc",
    "to_code": "PQC",
    "depart_time": "08:10",
    "arrive_time": "09:10",
    "duration": "1 giờ 00 phút",
    "flight_type": "one_way",
    "is_direct": 1,
    "aircraft_type": "Airbus A321",
    "price_economy": 790000,
    "price_business": 2190000,
    "time_slot": "morning",
    "services_economy": "07kg hành lý xách tay",
    "services_business": "SkyBoss ưu tiên lên máy bay, 30kg ký gửi, phục vụ nước yến/cà phê",
    "seats_available": 30,
    "created_at": "2026-11-07 06:50:57"
  },
  {
    "id": 14,
    "airline_code": "VN",
    "airline_name": "Vietnam Airlines",
    "flight_number": "VN-1823",
    "from_city": "TP.Hồ Chí Minh",
    "from_code": "SGN",
    "to_city": "Phú Quốc",
    "to_code": "PQC",
    "depart_time": "15:15",
    "arrive_time": "16:15",
    "duration": "1 giờ 00 phút",
    "flight_type": "one_way",
    "is_direct": 1,
    "aircraft_type": "Airbus A321",
    "price_economy": 1320000,
    "price_business": 3150000,
    "time_slot": "afternoon",
    "services_economy": "23kg hành lý ký gửi, khăn lạnh và nước",
    "services_business": "Ghế rộng êm ái, quầy thủ tục VIP, miễn phí đổi vé",
    "seats_available": 15,
    "created_at": "2026-11-07 06:50:57"
  },
  {
    "id": 15,
    "airline_code": "VU",
    "airline_name": "Vietravel Airlines",
    "flight_number": "VU-781",
    "from_city": "TP.Hồ Chí Minh",
    "from_code": "SGN",
    "to_city": "Quy Nhơn",
    "to_code": "UIH",
    "depart_time": "11:00",
    "arrive_time": "12:10",
    "duration": "1 giờ 10 phút",
    "flight_type": "one_way",
    "is_direct": 1,
    "aircraft_type": "Airbus A321",
    "price_economy": 850000,
    "price_business": 2200000,
    "time_slot": "morning",
    "services_economy": "07kg xách tay, đồ ăn nhẹ theo set du lịch",
    "services_business": "Hàng ghế đầu ưu tiên, phòng chờ thương gia sân bay Tân Sơn Nhất",
    "seats_available": 25,
    "created_at": "2026-11-07 06:50:57"
  },
  {
    "id": 16,
    "airline_code": "SQ",
    "airline_name": "Singapore Airlines",
    "flight_number": "SQ-175",
    "from_city": "Hà Nội",
    "from_code": "HAN",
    "to_city": "Singapore",
    "to_code": "SIN",
    "depart_time": "12:35",
    "arrive_time": "17:15",
    "duration": "3 giờ 40 phút",
    "flight_type": "one_way",
    "is_direct": 1,
    "aircraft_type": "Airbus A350-900",
    "price_economy": 3250000,
    "price_business": 8950000,
    "time_slot": "afternoon",
    "services_economy": "25kg hành lý ký gửi, hệ thống giải trí KrisWorld, bữa ăn nóng quốc tế",
    "services_business": "Khoang Business sang trọng, ghế phẳng thành giường, sâm panh thượng hạng, phòng chờ SilverKris Changi",
    "seats_available": 18,
    "created_at": "2026-11-07 06:50:57"
  },
  {
    "id": 17,
    "airline_code": "VJ",
    "airline_name": "VietJet Air",
    "flight_number": "VJ-915",
    "from_city": "Hà Nội",
    "from_code": "HAN",
    "to_city": "Singapore",
    "to_code": "SIN",
    "depart_time": "09:35",
    "arrive_time": "13:55",
    "duration": "3 giờ 20 phút",
    "flight_type": "one_way",
    "is_direct": 1,
    "aircraft_type": "Airbus A321neo",
    "price_economy": 1980000,
    "price_business": 5200000,
    "time_slot": "morning",
    "services_economy": "07kg hành lý xách tay",
    "services_business": "SkyBoss quốc tế: Phòng chờ VIP, 40kg ký gửi, ẩm thực nóng, check-in riêng",
    "seats_available": 32,
    "created_at": "2026-11-07 06:50:57"
  },
  {
    "id": 18,
    "airline_code": "VJ",
    "airline_name": "VietJet Air",
    "flight_number": "VJ-801",
    "from_city": "TP.Hồ Chí Minh",
    "from_code": "SGN",
    "to_city": "Bangkok",
    "to_code": "BKK",
    "depart_time": "09:00",
    "arrive_time": "10:30",
    "duration": "1 giờ 30 phút",
    "flight_type": "one_way",
    "is_direct": 1,
    "aircraft_type": "Airbus A321",
    "price_economy": 1450000,
    "price_business": 3950000,
    "time_slot": "morning",
    "services_economy": "07kg xách tay, nước suối",
    "services_business": "Phòng chờ SkyBoss Tân Sơn Nhất & Suvarnabhumi, 40kg hành lý ký gửi",
    "seats_available": 40,
    "created_at": "2026-11-07 06:50:57"
  },
  {
    "id": 19,
    "airline_code": "VN",
    "airline_name": "Vietnam Airlines",
    "flight_number": "VN-7201",
    "from_city": "Hà Nội",
    "from_code": "HAN",
    "to_city": "Phú Quốc",
    "to_code": "PQC",
    "depart_time": "06:00",
    "arrive_time": "11:30",
    "duration": "5 giờ 30 phút",
    "flight_type": "one_way",
    "is_direct": 0,
    "aircraft_type": "Boeing 787 / A321",
    "price_economy": 2350000,
    "price_business": 5900000,
    "time_slot": "early",
    "services_economy": "Nối chuyến tại SGN (1h30m), 23kg ký gửi",
    "services_business": "Toàn chặng hạng thương gia, phòng chờ tại HAN và SGN",
    "seats_available": 12,
    "created_at": "2026-11-07 06:50:57"
  }
];

  const MOCK_TOURS = [
  {
    "id": 1,
    "title": "Tour Đà Nẵng - Hội An - Cầu Vàng Bà Nà Hills 4N3Đ",
    "thumbnail": "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=600&h=400&fit=crop&q=80",
    "agency_name": "Vietjet Travel",
    "duration": "4 Ngày 3 Đêm",
    "days_count": 4,
    "from_city": "Hà Nội",
    "destination": "Đà Nẵng",
    "airline_partner": "VietJet Air",
    "aircraft_type": "Airbus A321neo",
    "depart_hour": "07:30",
    "time_slot": "morning",
    "flight_duration": "1 giờ 20 phút",
    "price": 4590000,
    "is_featured": 1,
    "services_included": "Vé máy bay Vietjet khứ hồi, Khách sạn 4 sao biển Mỹ Khê, Vé cáp treo Bà Nà Hills, Ăn trọn gói 7 bữa chính, Xe du lịch đời mới, Hướng dẫn viên suốt tuyến, Bảo hiểm du lịch 100.000.000đ",
    "itinerary_json": "[{\"day\":1,\"title\":\"Hà Nội - Sân bay Đà Nẵng - Bán đảo Sơn Trà\",\"desc\":\"Quý khách tập trung tại sân bay Nội Bài, đáp chuyến bay Vietjet VJ-503 đi Đà Nẵng. Xe và hướng dẫn viên đón đoàn viếng Chùa Linh Ứng Bãi Bụt ngắm tượng Phật Bà 67m, nhận phòng khách sạn 4 sao ven biển Mỹ Khê, tự do tắm biển và ăn tối hải sản.\"},{\"day\":2,\"title\":\"Chinh phục Bà Nà Hills - Check-in Cầu Vàng - Làng Pháp\",\"desc\":\"Khởi hành lên KDL Bà Nà Hills bằng hệ thống cáp treo đạt 4 kỷ lục thế giới. Chiêm ngưỡng Cầu Vàng bàn tay khổng lồ giữa sương mây, check-in Làng Pháp cổ kính, hầm rượu Debay và vui chơi không giới hạn tại công viên Fantasy Park.\"},{\"day\":3,\"title\":\"Danh thắng Ngũ Hành Sơn - Phố Cổ Hội An lung linh\",\"desc\":\"Tham quan Làng đá mỹ nghệ Non Nước, khám phá động Huyền Không. Chiều khởi hành đi Phố Cổ Hội An: thăm Chùa Cầu Nhật Bản, nhà cổ Phùng Hưng, đi thuyền thả hoa đăng trên sông Hoài và thưởng thức đặc sản Cao Lầu, cơm gà.\"},{\"day\":4,\"title\":\"Chợ Hàn mua sắm đặc sản miền Trung - Hà Nội\",\"desc\":\"Đoàn tự do dạo Chợ Hàn mua chả bò, mực rim me, bánh khô mè làm quà. Xe đưa đoàn ra sân bay Đà Nẵng đáp chuyến bay Vietjet về lại Hà Nội. Kết thúc hành trình đầy ắp kỷ niệm.\"}]",
    "created_at": "2026-11-07 06:50:57",
    "itinerary": [
      {
        "day": 1,
        "title": "Hà Nội - Sân bay Đà Nẵng - Bán đảo Sơn Trà",
        "desc": "Quý khách tập trung tại sân bay Nội Bài, đáp chuyến bay Vietjet VJ-503 đi Đà Nẵng. Xe và hướng dẫn viên đón đoàn viếng Chùa Linh Ứng Bãi Bụt ngắm tượng Phật Bà 67m, nhận phòng khách sạn 4 sao ven biển Mỹ Khê, tự do tắm biển và ăn tối hải sản."
      },
      {
        "day": 2,
        "title": "Chinh phục Bà Nà Hills - Check-in Cầu Vàng - Làng Pháp",
        "desc": "Khởi hành lên KDL Bà Nà Hills bằng hệ thống cáp treo đạt 4 kỷ lục thế giới. Chiêm ngưỡng Cầu Vàng bàn tay khổng lồ giữa sương mây, check-in Làng Pháp cổ kính, hầm rượu Debay và vui chơi không giới hạn tại công viên Fantasy Park."
      },
      {
        "day": 3,
        "title": "Danh thắng Ngũ Hành Sơn - Phố Cổ Hội An lung linh",
        "desc": "Tham quan Làng đá mỹ nghệ Non Nước, khám phá động Huyền Không. Chiều khởi hành đi Phố Cổ Hội An: thăm Chùa Cầu Nhật Bản, nhà cổ Phùng Hưng, đi thuyền thả hoa đăng trên sông Hoài và thưởng thức đặc sản Cao Lầu, cơm gà."
      },
      {
        "day": 4,
        "title": "Chợ Hàn mua sắm đặc sản miền Trung - Hà Nội",
        "desc": "Đoàn tự do dạo Chợ Hàn mua chả bò, mực rim me, bánh khô mè làm quà. Xe đưa đoàn ra sân bay Đà Nẵng đáp chuyến bay Vietjet về lại Hà Nội. Kết thúc hành trình đầy ắp kỷ niệm."
      }
    ]
  },
  {
    "id": 2,
    "title": "Tour Phú Quốc - Đảo Ngọc Thiên Đường - Grand World 3N2Đ",
    "thumbnail": "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=600&h=400&fit=crop&q=80",
    "agency_name": "Vietjet Holiday",
    "duration": "3 Ngày 2 Đêm",
    "days_count": 3,
    "from_city": "TP.Hồ Chí Minh",
    "destination": "Phú Quốc",
    "airline_partner": "VietJet Air",
    "aircraft_type": "Airbus A321",
    "depart_hour": "08:45",
    "time_slot": "morning",
    "flight_duration": "1 giờ 00 phút",
    "price": 3890000,
    "is_featured": 1,
    "services_included": "Vé máy bay Vietjet khứ hồi, Resort 4 sao có hồ bơi tràn bờ, Cano tham quan 4 đảo lặn ngắm san hô, Vé xem show Tinh Hoa Việt Nam, Ăn sáng buffet, Bảo hiểm du lịch",
    "itinerary_json": "[{\"day\":1,\"title\":\"TP.HCM - Đảo Ngọc Phú Quốc - Thành phố không ngủ Grand World\",\"desc\":\"Bay thẳng từ Tân Sơn Nhất đến Phú Quốc. Xe đưa đoàn check-in resort nghỉ ngơi. Chiều khám phá thành phố không ngủ Grand World: du ngoạn thuyền Gondola trên dòng kênh Venice lãng mạn, tham quan Bảo tàng Gấu Teddy và thưởng thức show thực cảnh đỉnh cao.\"},{\"day\":2,\"title\":\"Trải nghiệm Cano 4 Đảo - Lặn ngắm san hô tự nhiên - Cáp treo Hòn Thơm\",\"desc\":\"Lên cano cao tốc lướt sóng qua Hòn Mây Rút, Hòn Gầm Ghì, Hòn Móng Tay. Trải nghiệm lặn ngắm rạn san hô tự nhiên rực rỡ sắc màu, chụp ảnh flycam chuyên nghiệp. Chiều đi cáp treo vượt biển 3 dây dài nhất thế giới sang đảo Hòn Thơm.\"},{\"day\":3,\"title\":\"Sunset Sanato ngắm hoàng hôn - Mua sắm ngọc trai - TP.HCM\",\"desc\":\"Check-in cổng trời và đàn voi chân dài tại Sunset Sanato. Tham quan cơ sở nuôi cấy ngọc trai Phú Quốc và nhà thùng nước mắm truyền thống lâu đời. Xe đưa quý khách ra sân bay Phú Quốc bay về TP.HCM.\"}]",
    "created_at": "2026-11-07 06:50:57",
    "itinerary": [
      {
        "day": 1,
        "title": "TP.HCM - Đảo Ngọc Phú Quốc - Thành phố không ngủ Grand World",
        "desc": "Bay thẳng từ Tân Sơn Nhất đến Phú Quốc. Xe đưa đoàn check-in resort nghỉ ngơi. Chiều khám phá thành phố không ngủ Grand World: du ngoạn thuyền Gondola trên dòng kênh Venice lãng mạn, tham quan Bảo tàng Gấu Teddy và thưởng thức show thực cảnh đỉnh cao."
      },
      {
        "day": 2,
        "title": "Trải nghiệm Cano 4 Đảo - Lặn ngắm san hô tự nhiên - Cáp treo Hòn Thơm",
        "desc": "Lên cano cao tốc lướt sóng qua Hòn Mây Rút, Hòn Gầm Ghì, Hòn Móng Tay. Trải nghiệm lặn ngắm rạn san hô tự nhiên rực rỡ sắc màu, chụp ảnh flycam chuyên nghiệp. Chiều đi cáp treo vượt biển 3 dây dài nhất thế giới sang đảo Hòn Thơm."
      },
      {
        "day": 3,
        "title": "Sunset Sanato ngắm hoàng hôn - Mua sắm ngọc trai - TP.HCM",
        "desc": "Check-in cổng trời và đàn voi chân dài tại Sunset Sanato. Tham quan cơ sở nuôi cấy ngọc trai Phú Quốc và nhà thùng nước mắm truyền thống lâu đời. Xe đưa quý khách ra sân bay Phú Quốc bay về TP.HCM."
      }
    ]
  },
  {
    "id": 3,
    "title": "Tour Nha Trang Biển Xanh - VinWonders - Du Thuyền Hoàng Hôn 4N3Đ",
    "thumbnail": "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=600&h=400&fit=crop&q=80",
    "agency_name": "Vietjet Travel",
    "duration": "4 Ngày 3 Đêm",
    "days_count": 4,
    "from_city": "Hà Nội",
    "destination": "Nha Trang",
    "airline_partner": "VietJet Air",
    "aircraft_type": "Airbus A320",
    "depart_hour": "09:15",
    "time_slot": "morning",
    "flight_duration": "1 giờ 50 phút",
    "price": 4990000,
    "is_featured": 1,
    "services_included": "Vé máy bay Vietjet khứ hồi, Khách sạn 5 sao mặt biển đường Trần Phú, Vé trọn gói VinWonders Hòn Tre, Bữa tiệc cocktail du thuyền hoàng hôn, Tắm bùn khoáng cao cấp",
    "itinerary_json": "[{\"day\":1,\"title\":\"Hà Nội - Sân bay Cam Ranh - Phố biển Nha Trang\",\"desc\":\"Hạ cánh sân bay quốc tế Cam Ranh, ngắm cung đường đèo ven biển ngoạn mục. Nhận phòng khách sạn 5 sao mặt biển, thưởng thức đặc sản nem nướng Ninh Hòa và bún cá sứa danh tiếng.\"},{\"day\":2,\"title\":\"Thiên đường giải trí VinWonders Hòn Tre - Show nhạc nước Tata\",\"desc\":\"Đi cáp treo vượt biển sang đảo ngọc Hòn Tre. Thỏa thích khám phá vịnh phao nổi khổng lồ, vườn thú Quý Vương, xem biểu diễn cá heo và thưởng thức siêu phẩm Tata Show hoành tráng.\"},{\"day\":3,\"title\":\"Du thuyền ngắm hoàng hôn Vịnh Nha Trang - Tiệc tối 5 sao\",\"desc\":\"Lên du thuyền 5 sao đẳng cấp, thưởng thức tiệc finger food, rượu vang và lắng nghe giai điệu vĩ cầm du dương khi mặt trời buông xuống mặt vịnh xanh biếc.\"},{\"day\":4,\"title\":\"Tháp Bà Ponagar huyền bí - Tắm bùn khoáng nóng - Hà Nội\",\"desc\":\"Chiêm bái quần thể kiến trúc tháp Chăm cổ kính Ponagar, ngâm mình trong bùn khoáng thiên nhiên giải độc cơ thể tại I-Resort. Xe đưa ra sân bay Cam Ranh về Hà Nội.\"}]",
    "created_at": "2026-11-07 06:50:57",
    "itinerary": [
      {
        "day": 1,
        "title": "Hà Nội - Sân bay Cam Ranh - Phố biển Nha Trang",
        "desc": "Hạ cánh sân bay quốc tế Cam Ranh, ngắm cung đường đèo ven biển ngoạn mục. Nhận phòng khách sạn 5 sao mặt biển, thưởng thức đặc sản nem nướng Ninh Hòa và bún cá sứa danh tiếng."
      },
      {
        "day": 2,
        "title": "Thiên đường giải trí VinWonders Hòn Tre - Show nhạc nước Tata",
        "desc": "Đi cáp treo vượt biển sang đảo ngọc Hòn Tre. Thỏa thích khám phá vịnh phao nổi khổng lồ, vườn thú Quý Vương, xem biểu diễn cá heo và thưởng thức siêu phẩm Tata Show hoành tráng."
      },
      {
        "day": 3,
        "title": "Du thuyền ngắm hoàng hôn Vịnh Nha Trang - Tiệc tối 5 sao",
        "desc": "Lên du thuyền 5 sao đẳng cấp, thưởng thức tiệc finger food, rượu vang và lắng nghe giai điệu vĩ cầm du dương khi mặt trời buông xuống mặt vịnh xanh biếc."
      },
      {
        "day": 4,
        "title": "Tháp Bà Ponagar huyền bí - Tắm bùn khoáng nóng - Hà Nội",
        "desc": "Chiêm bái quần thể kiến trúc tháp Chăm cổ kính Ponagar, ngâm mình trong bùn khoáng thiên nhiên giải độc cơ thể tại I-Resort. Xe đưa ra sân bay Cam Ranh về Hà Nội."
      }
    ]
  },
  {
    "id": 4,
    "title": "Tour Quy Nhơn - Phú Yên - Kỳ Co - Eo Gió - Hoa Vàng Cỏ Xanh 4N3Đ",
    "thumbnail": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=400&fit=crop&q=80",
    "agency_name": "Vietravel Companion",
    "duration": "4 Ngày 3 Đêm",
    "days_count": 4,
    "from_city": "TP.Hồ Chí Minh",
    "destination": "Quy Nhơn",
    "airline_partner": "Vietravel Airlines",
    "aircraft_type": "Airbus A321",
    "depart_hour": "06:45",
    "time_slot": "morning",
    "flight_duration": "1 giờ 10 phút",
    "price": 4290000,
    "is_featured": 1,
    "services_included": "Vé bay khứ hồi Vietravel Airlines, Khách sạn 4 sao trung tâm, Cano cao tốc bãi biển Kỳ Co, Bữa trưa hải sản tươi sống 8 món, Xe ô tô máy lạnh chất lượng cao",
    "itinerary_json": "[{\"day\":1,\"title\":\"TP.HCM - Sân bay Phù Cát - Eo Gió hùng vĩ - Kỳ Co\",\"desc\":\"Bay từ TP.HCM đến Phù Cát. Chinh phục cung đường ven biển đẹp bậc nhất tại Eo Gió nơi đón hoàng hôn đẹp nhất Việt Nam. Lên cano sang bãi tắm Kỳ Co làn nước trong xanh thấu đáy.\"},{\"day\":2,\"title\":\"Đồi cát Phương Mai - Tượng Phật ngồi chùa Ông Núi\",\"desc\":\"Trải nghiệm trượt cát tại đồi cát Phương Mai hoang sơ. Chiêm bái tượng Phật Thích Ca ngồi lớn nhất Đông Nam Á tại chùa Ông Núi, ngắm toàn cảnh đầm Thị Nại.\"},{\"day\":3,\"title\":\"Quy Nhơn - Phú Yên - Gành Đá Đĩa - Bãi Xép thơ mộng\",\"desc\":\"Di chuyển sang Phú Yên, chiêm ngưỡng kỳ quan địa chất hiếm có thế giới Gành Đá Đĩa với các cột đá lục lăng xếp chồng. Thăm Bãi Xép nơi quay bối cảnh phim Tôi Thấy Hoa Vàng Trên Cỏ Xanh.\"},{\"day\":4,\"title\":\"Mũi Điện Đại Lãnh - Sân bay Tuy Hòa - TP.HCM\",\"desc\":\"Đón những tia nắng bình minh đầu tiên trên đất liền tại Mũi Đại Lãnh (Mũi Điện), tham quan ngọn hải đăng hơn 100 năm tuổi. Xe đưa ra sân bay Tuy Hòa đáp chuyến bay về TP.HCM.\"}]",
    "created_at": "2026-11-07 06:50:57",
    "itinerary": [
      {
        "day": 1,
        "title": "TP.HCM - Sân bay Phù Cát - Eo Gió hùng vĩ - Kỳ Co",
        "desc": "Bay từ TP.HCM đến Phù Cát. Chinh phục cung đường ven biển đẹp bậc nhất tại Eo Gió nơi đón hoàng hôn đẹp nhất Việt Nam. Lên cano sang bãi tắm Kỳ Co làn nước trong xanh thấu đáy."
      },
      {
        "day": 2,
        "title": "Đồi cát Phương Mai - Tượng Phật ngồi chùa Ông Núi",
        "desc": "Trải nghiệm trượt cát tại đồi cát Phương Mai hoang sơ. Chiêm bái tượng Phật Thích Ca ngồi lớn nhất Đông Nam Á tại chùa Ông Núi, ngắm toàn cảnh đầm Thị Nại."
      },
      {
        "day": 3,
        "title": "Quy Nhơn - Phú Yên - Gành Đá Đĩa - Bãi Xép thơ mộng",
        "desc": "Di chuyển sang Phú Yên, chiêm ngưỡng kỳ quan địa chất hiếm có thế giới Gành Đá Đĩa với các cột đá lục lăng xếp chồng. Thăm Bãi Xép nơi quay bối cảnh phim Tôi Thấy Hoa Vàng Trên Cỏ Xanh."
      },
      {
        "day": 4,
        "title": "Mũi Điện Đại Lãnh - Sân bay Tuy Hòa - TP.HCM",
        "desc": "Đón những tia nắng bình minh đầu tiên trên đất liền tại Mũi Đại Lãnh (Mũi Điện), tham quan ngọn hải đăng hơn 100 năm tuổi. Xe đưa ra sân bay Tuy Hòa đáp chuyến bay về TP.HCM."
      }
    ]
  },
  {
    "id": 5,
    "title": "Tour Hà Giang Mùa Hoa Tam Giác Mạch - Đèo Mã Pí Lèng 3N2Đ",
    "thumbnail": "https://images.unsplash.com/photo-1528127269322-539801943592?w=600&h=400&fit=crop&q=80",
    "agency_name": "Vietjet Discovery",
    "duration": "3 Ngày 2 Đêm",
    "days_count": 3,
    "from_city": "TP.Hồ Chí Minh",
    "destination": "Hà Giang",
    "airline_partner": "VietJet Air",
    "aircraft_type": "Airbus A321neo",
    "depart_hour": "06:00",
    "time_slot": "morning",
    "flight_duration": "2 giờ 10 phút",
    "price": 5490000,
    "is_featured": 1,
    "services_included": "Vé máy bay khứ hồi Vietjet chặng SGN - HAN, Xe Limousine VIP suốt tuyến Hà Giang, Homestay cộng đồng bản địa, Thuyền kayak sông Nho Quế, Bảo hiểm du lịch",
    "itinerary_json": "[{\"day\":1,\"title\":\"TP.HCM - Hà Nội - Cổng trời Quản Bạ - Rừng thông Yên Minh\",\"desc\":\"Bay sớm chuyến VJ-182 ra Nội Bài. Xe Limousine đón đoàn trực chỉ cao nguyên đá Hà Giang. Chụp ảnh Cổng Trời Quản Bạ, ngắm Núi Đôi Cô Tiên và rừng thông Yên Minh bạt ngàn.\"},{\"day\":2,\"title\":\"Đồng Văn - Tứ đại đỉnh đèo Mã Pí Lèng - Du thuyền hẻm Tu Sản\",\"desc\":\"Chinh phục con đèo huyền thoại Mã Pí Lèng ngắm vực sâu hun hút. Ngồi thuyền lướt trên dòng sông Nho Quế màu xanh ngọc bích len lỏi qua Hẻm vực Tu Sản sâu nhất Đông Nam Á.\"},{\"day\":3,\"title\":\"Cột cờ Lũng Cú cực Bắc - Dinh thự Vua Mèo - Sân bay Nội Bài\",\"desc\":\"Làm lễ chào cờ trang nghiêm trên đỉnh Lũng Cú nơi địa đầu Tổ quốc. Thăm Dinh Vua Mèo Vương Chính Đức với kiến trúc độc đáo kết hợp Pháp - Hoa - H’Mông. Về Nội Bài bay đêm về TP.HCM.\"}]",
    "created_at": "2026-11-07 06:50:57",
    "itinerary": [
      {
        "day": 1,
        "title": "TP.HCM - Hà Nội - Cổng trời Quản Bạ - Rừng thông Yên Minh",
        "desc": "Bay sớm chuyến VJ-182 ra Nội Bài. Xe Limousine đón đoàn trực chỉ cao nguyên đá Hà Giang. Chụp ảnh Cổng Trời Quản Bạ, ngắm Núi Đôi Cô Tiên và rừng thông Yên Minh bạt ngàn."
      },
      {
        "day": 2,
        "title": "Đồng Văn - Tứ đại đỉnh đèo Mã Pí Lèng - Du thuyền hẻm Tu Sản",
        "desc": "Chinh phục con đèo huyền thoại Mã Pí Lèng ngắm vực sâu hun hút. Ngồi thuyền lướt trên dòng sông Nho Quế màu xanh ngọc bích len lỏi qua Hẻm vực Tu Sản sâu nhất Đông Nam Á."
      },
      {
        "day": 3,
        "title": "Cột cờ Lũng Cú cực Bắc - Dinh thự Vua Mèo - Sân bay Nội Bài",
        "desc": "Làm lễ chào cờ trang nghiêm trên đỉnh Lũng Cú nơi địa đầu Tổ quốc. Thăm Dinh Vua Mèo Vương Chính Đức với kiến trúc độc đáo kết hợp Pháp - Hoa - H’Mông. Về Nội Bài bay đêm về TP.HCM."
      }
    ]
  },
  {
    "id": 6,
    "title": "Tour Singapore - Đảo Quốc Sư Tử - Garden By The Bay 4N3Đ",
    "thumbnail": "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=600&h=400&fit=crop&q=80",
    "agency_name": "Vietjet Global",
    "duration": "4 Ngày 3 Đêm",
    "days_count": 4,
    "from_city": "Hà Nội",
    "destination": "Singapore",
    "airline_partner": "Singapore Airlines",
    "aircraft_type": "Boeing 787",
    "depart_hour": "12:35",
    "time_slot": "afternoon",
    "flight_duration": "3 giờ 40 phút",
    "price": 11990000,
    "is_featured": 1,
    "services_included": "Vé máy bay 5 sao Singapore Airlines khứ hồi, Khách sạn 4 sao trung tâm Orchard Road, Vé tham quan Cloud Forest & Flower Dome, Thưởng thức lẩu Hải Đế Haidilao, Xe đưa đón hiện đại",
    "itinerary_json": "[{\"day\":1,\"title\":\"Hà Nội - Sân bay Changi Thác nước Jewel - Công viên Sư tử biển Merlion\",\"desc\":\"Đáp chuyến bay đẳng cấp SQ-175 tới Singapore. Check-in thác nước trong nhà Jewel Changi cao 40m. Xe đưa đoàn dạo công viên Merlion chụp hình tượng Sư tử biển phun nước, ngắm tòa nhà con thuyền Marina Bay Sands.\"},{\"day\":2,\"title\":\"Kỳ quan Gardens by the Bay - Đảo giải trí Sentosa\",\"desc\":\"Khám phá hai nhà kính điều hòa khổng lồ Flower Dome và Cloud Forest với thác nước nhân tạo ấn tượng. Chiều sang đảo Sentosa, chụp ảnh biểu tượng quả cầu Universal Studios và tắm biển Siloso.\"},{\"day\":3,\"title\":\"Thiên đường mua sắm Orchard - Khu phố văn hóa Chinatown & Little India\",\"desc\":\"Thỏa sức săn hàng hiệu miễn thuế tại các đại trung tâm thương mại Ion Orchard, Takashimaya. Khám phá nét giao thoa văn hóa đa sắc tộc tại Chinatown và thưởng thức ẩm thực đường phố Hawker Chan Michelin.\"},{\"day\":4,\"title\":\"Chùa Răng Phật linh thiêng - Sân bay Changi - Hà Nội\",\"desc\":\"Viếng Chùa Răng Phật (Buddha Tooth Relic Temple) nguy nga tráng lệ tại trung tâm phố cổ. Xe đưa đoàn ra sân bay Changi làm thủ tục chuyến bay về lại Hà Nội.\"}]",
    "created_at": "2026-11-07 06:50:57",
    "itinerary": [
      {
        "day": 1,
        "title": "Hà Nội - Sân bay Changi Thác nước Jewel - Công viên Sư tử biển Merlion",
        "desc": "Đáp chuyến bay đẳng cấp SQ-175 tới Singapore. Check-in thác nước trong nhà Jewel Changi cao 40m. Xe đưa đoàn dạo công viên Merlion chụp hình tượng Sư tử biển phun nước, ngắm tòa nhà con thuyền Marina Bay Sands."
      },
      {
        "day": 2,
        "title": "Kỳ quan Gardens by the Bay - Đảo giải trí Sentosa",
        "desc": "Khám phá hai nhà kính điều hòa khổng lồ Flower Dome và Cloud Forest với thác nước nhân tạo ấn tượng. Chiều sang đảo Sentosa, chụp ảnh biểu tượng quả cầu Universal Studios và tắm biển Siloso."
      },
      {
        "day": 3,
        "title": "Thiên đường mua sắm Orchard - Khu phố văn hóa Chinatown & Little India",
        "desc": "Thỏa sức săn hàng hiệu miễn thuế tại các đại trung tâm thương mại Ion Orchard, Takashimaya. Khám phá nét giao thoa văn hóa đa sắc tộc tại Chinatown và thưởng thức ẩm thực đường phố Hawker Chan Michelin."
      },
      {
        "day": 4,
        "title": "Chùa Răng Phật linh thiêng - Sân bay Changi - Hà Nội",
        "desc": "Viếng Chùa Răng Phật (Buddha Tooth Relic Temple) nguy nga tráng lệ tại trung tâm phố cổ. Xe đưa đoàn ra sân bay Changi làm thủ tục chuyến bay về lại Hà Nội."
      }
    ]
  },
  {
    "id": 7,
    "title": "Tour Thái Lan: Bangkok - Pattaya - Đảo San Hô Coral 5N4Đ",
    "thumbnail": "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=600&h=400&fit=crop&q=80",
    "agency_name": "Vietjet Travel",
    "duration": "5 Ngày 4 Đêm",
    "days_count": 5,
    "from_city": "TP.Hồ Chí Minh",
    "destination": "Bangkok",
    "airline_partner": "VietJet Air",
    "aircraft_type": "Airbus A321",
    "depart_hour": "09:00",
    "time_slot": "morning",
    "flight_duration": "1 giờ 30 phút",
    "price": 6890000,
    "is_featured": 1,
    "services_included": "Vé bay Vietjet khứ hồi có 20kg ký gửi, Khách sạn 4 sao hồ bơi, Buffet hải sản tầng 86 Baiyoke Sky cao nhất Bangkok, Tặng vé xem Alcazar Cabaret Show và 1 giờ Massage Thái cổ truyền",
    "itinerary_json": "[{\"day\":1,\"title\":\"TP.HCM - Sân bay Suvarnabhumi Bangkok - Thành phố biển Pattaya\",\"desc\":\"Đáp chuyến bay Vietjet VJ-801 sang Bangkok. Xe và HDV địa phương đón đoàn di chuyển xuống Pattaya. Nhận phòng khách sạn, thưởng thức bữa tối và thưởng ngoạn show biểu diễn người mẫu chuyển giới Alcazar Cabaret rực rỡ.\"},{\"day\":2,\"title\":\"Khám phá Đảo San Hô Coral Island - Núi Phật Vàng Khao Chee Chan\",\"desc\":\"Đi cano cao tốc ra đảo Coral tắm biển làn nước trong xanh hoặc tham gia dù bay, lặn biển (chi phí tự túc). Chiều viếng núi Phật Khắc Vàng bằng tia laser lớn nhất Thái Lan, trải nghiệm massage Thái cổ truyền phục hồi năng lượng.\"},{\"day\":3,\"title\":\"Pattaya - Trại Hổ Tiger Park - Thủ đô Bangkok - Du thuyền sông Chao Phraya\",\"desc\":\"Khởi hành về Bangkok, ghé chụp ảnh cùng những chú hổ tại Tiger Park. Buổi tối lên du thuyền 5 sao dạo sông Mẹ Chao Phraya, thưởng thức ẩm thực hoàng gia và ngắm nhìn chùa Wat Arun rực rỡ trong ánh đèn đêm.\"},{\"day\":4,\"title\":\"Chùa Phật Vàng Wat Traimit - Đại tiệc buffet Baiyoke Sky 86 tầng - Mua sắm Siam\",\"desc\":\"Chiêm bái tượng Phật Thích Ca bằng vàng ròng nguyên khối 5.5 tấn tại Wat Traimit. Ăn trưa buffet quốc tế tại tòa nhà 86 tầng Baiyoke Sky ngắm toàn cảnh Bangkok. Chiều tự do mua sắm tại Siam Paragon, Big C.\"},{\"day\":5,\"title\":\"Dạo thuyền Tây Thiên ngắm hiện tượng cá nổi - Bay về TP.HCM\",\"desc\":\"Đi thuyền ngắm cảnh sông nước linh thiêng và cho cá ăn cầu bình an. Xe đưa đoàn ra sân bay làm thủ tục đáp chuyến bay Vietjet về lại TP.HCM.\"}]",
    "created_at": "2026-11-07 06:50:57",
    "itinerary": [
      {
        "day": 1,
        "title": "TP.HCM - Sân bay Suvarnabhumi Bangkok - Thành phố biển Pattaya",
        "desc": "Đáp chuyến bay Vietjet VJ-801 sang Bangkok. Xe và HDV địa phương đón đoàn di chuyển xuống Pattaya. Nhận phòng khách sạn, thưởng thức bữa tối và thưởng ngoạn show biểu diễn người mẫu chuyển giới Alcazar Cabaret rực rỡ."
      },
      {
        "day": 2,
        "title": "Khám phá Đảo San Hô Coral Island - Núi Phật Vàng Khao Chee Chan",
        "desc": "Đi cano cao tốc ra đảo Coral tắm biển làn nước trong xanh hoặc tham gia dù bay, lặn biển (chi phí tự túc). Chiều viếng núi Phật Khắc Vàng bằng tia laser lớn nhất Thái Lan, trải nghiệm massage Thái cổ truyền phục hồi năng lượng."
      },
      {
        "day": 3,
        "title": "Pattaya - Trại Hổ Tiger Park - Thủ đô Bangkok - Du thuyền sông Chao Phraya",
        "desc": "Khởi hành về Bangkok, ghé chụp ảnh cùng những chú hổ tại Tiger Park. Buổi tối lên du thuyền 5 sao dạo sông Mẹ Chao Phraya, thưởng thức ẩm thực hoàng gia và ngắm nhìn chùa Wat Arun rực rỡ trong ánh đèn đêm."
      },
      {
        "day": 4,
        "title": "Chùa Phật Vàng Wat Traimit - Đại tiệc buffet Baiyoke Sky 86 tầng - Mua sắm Siam",
        "desc": "Chiêm bái tượng Phật Thích Ca bằng vàng ròng nguyên khối 5.5 tấn tại Wat Traimit. Ăn trưa buffet quốc tế tại tòa nhà 86 tầng Baiyoke Sky ngắm toàn cảnh Bangkok. Chiều tự do mua sắm tại Siam Paragon, Big C."
      },
      {
        "day": 5,
        "title": "Dạo thuyền Tây Thiên ngắm hiện tượng cá nổi - Bay về TP.HCM",
        "desc": "Đi thuyền ngắm cảnh sông nước linh thiêng và cho cá ăn cầu bình an. Xe đưa đoàn ra sân bay làm thủ tục đáp chuyến bay Vietjet về lại TP.HCM."
      }
    ]
  },
  {
    "id": 8,
    "title": "Tour Đà Lạt Thành Phố Ngàn Hoa - Săn Mây Cầu Đất 3N2Đ",
    "thumbnail": "https://images.unsplash.com/photo-1546853020-ca4909aef454?w=600&h=400&fit=crop&q=80",
    "agency_name": "Vietjet Holiday",
    "duration": "3 Ngày 2 Đêm",
    "days_count": 3,
    "from_city": "Hà Nội",
    "destination": "Đà Lạt",
    "airline_partner": "VietJet Air",
    "aircraft_type": "Airbus A320",
    "depart_hour": "06:50",
    "time_slot": "morning",
    "flight_duration": "1 giờ 50 phút",
    "price": 3990000,
    "is_featured": 1,
    "services_included": "Vé bay Vietjet khứ hồi, Khách sạn trung tâm view Hồ Xuân Hương, Tour đón bình minh săn mây đồi chè Cầu Đất, Thưởng thức lẩu gà lá é và buffet rau không giới hạn Leguda, Vé thác Datanla",
    "itinerary_json": "[{\"day\":1,\"title\":\"Hà Nội - Sân bay Liên Khương - Ga xe lửa cổ Đà Lạt - Quảng trường Lâm Viên\",\"desc\":\"Bay thẳng từ Nội Bài vào Liên Khương. Đoàn tham quan Ga Đà Lạt cổ kính mang phong cách Đông Dương. Check-in nụ hoa Atiso khổng lồ tại Quảng trường Lâm Viên bên Hồ Xuân Hương, tối tự do thưởng thức sữa đậu nành và bánh tráng nướng chợ đêm.\"},{\"day\":2,\"title\":\"Săn mây Panorama Cầu Đất - Thác Datanla trượt máng - Vườn hoa Cẩm Tú Cầu\",\"desc\":\"Khởi hành sớm săn mây đón bình minh tuyệt đẹp trên đồi chè Cầu Đất bát ngát. Trải nghiệm máng trượt xuyên rừng thông dài nhất châu Á tại thác Datanla. Chiều lạc bước giữa cánh đồng hoa cẩm tú cầu bạt ngàn sắc tím.\"},{\"day\":3,\"title\":\"Vườn dâu tây công nghệ cao hái trái - Hà Nội\",\"desc\":\"Tự tay hái những trái dâu tây tươi mọng tại vườn công nghệ cao của người bản địa. Mua sắm mứt hoa quả, trà atiso đặc sản Đà Lạt. Xe đưa đoàn ra sân bay Liên Khương đón chuyến bay Vietjet về lại Hà Nội.\"}]",
    "created_at": "2026-11-07 06:50:57",
    "itinerary": [
      {
        "day": 1,
        "title": "Hà Nội - Sân bay Liên Khương - Ga xe lửa cổ Đà Lạt - Quảng trường Lâm Viên",
        "desc": "Bay thẳng từ Nội Bài vào Liên Khương. Đoàn tham quan Ga Đà Lạt cổ kính mang phong cách Đông Dương. Check-in nụ hoa Atiso khổng lồ tại Quảng trường Lâm Viên bên Hồ Xuân Hương, tối tự do thưởng thức sữa đậu nành và bánh tráng nướng chợ đêm."
      },
      {
        "day": 2,
        "title": "Săn mây Panorama Cầu Đất - Thác Datanla trượt máng - Vườn hoa Cẩm Tú Cầu",
        "desc": "Khởi hành sớm săn mây đón bình minh tuyệt đẹp trên đồi chè Cầu Đất bát ngát. Trải nghiệm máng trượt xuyên rừng thông dài nhất châu Á tại thác Datanla. Chiều lạc bước giữa cánh đồng hoa cẩm tú cầu bạt ngàn sắc tím."
      },
      {
        "day": 3,
        "title": "Vườn dâu tây công nghệ cao hái trái - Hà Nội",
        "desc": "Tự tay hái những trái dâu tây tươi mọng tại vườn công nghệ cao của người bản địa. Mua sắm mứt hoa quả, trà atiso đặc sản Đà Lạt. Xe đưa đoàn ra sân bay Liên Khương đón chuyến bay Vietjet về lại Hà Nội."
      }
    ]
  },
  {
    "id": 9,
    "title": "Tour Cần Thơ - Chợ Nổi Cái Răng - Rừng Tràm Trà Sư 3N2Đ",
    "thumbnail": "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=600&h=400&fit=crop&q=80",
    "agency_name": "Vietjet Travel",
    "duration": "3 Ngày 2 Đêm",
    "days_count": 3,
    "from_city": "Hà Nội",
    "destination": "Cần Thơ",
    "airline_partner": "VietJet Air",
    "aircraft_type": "Airbus A320",
    "depart_hour": "07:00",
    "time_slot": "morning",
    "flight_duration": "2 giờ 15 phút",
    "price": 3690000,
    "is_featured": 0,
    "services_included": "Vé máy bay Vietjet khứ hồi, Khách sạn 4 sao bến Ninh Kiều, Thuyền du ngoạn chợ nổi, Xuồng ba lá rừng tràm Trà Sư, Thưởng thức đặc sản cá lóc nướng trui",
    "itinerary_json": "[{\"day\":1,\"title\":\"Hà Nội - Cần Thơ - Bến Ninh Kiều thơ mộng\",\"desc\":\"Bay từ Hà Nội đến Cần Thơ, nhận phòng khách sạn bên bến Ninh Kiều. Chiều tham quan Nhà cổ Bình Thủy với lối kiến trúc Pháp cổ độc đáo, tối thưởng thức đờn ca tài tử trên du thuyền.\"},{\"day\":2,\"title\":\"Chợ nổi Cái Răng - Rừng tràm Trà Sư An Giang\",\"desc\":\"Khám phá nét sinh hoạt buôn bán tấp nập trên sông của người dân Chợ Nổi Cái Răng vào sáng sớm. Khởi hành đi Châu Đốc, ngồi xuồng ba lá lướt nhẹ trên thảm bèo xanh mướt của rừng tràm Trà Sư.\"},{\"day\":3,\"title\":\"Miếu Bà Chúa Xứ - Làng bè nuôi cá - Hà Nội\",\"desc\":\"Chiêm bái Miếu Bà Chúa Xứ núi Sam linh thiêng. Thăm làng bè nổi nuôi cá basa trên sông Hậu. Mua sắm đặc sản bánh pía, mắm Châu Đốc trước khi ra sân bay Cần Thơ bay về Hà Nội.\"}]",
    "created_at": "2026-11-07 06:50:57",
    "itinerary": [
      {
        "day": 1,
        "title": "Hà Nội - Cần Thơ - Bến Ninh Kiều thơ mộng",
        "desc": "Bay từ Hà Nội đến Cần Thơ, nhận phòng khách sạn bên bến Ninh Kiều. Chiều tham quan Nhà cổ Bình Thủy với lối kiến trúc Pháp cổ độc đáo, tối thưởng thức đờn ca tài tử trên du thuyền."
      },
      {
        "day": 2,
        "title": "Chợ nổi Cái Răng - Rừng tràm Trà Sư An Giang",
        "desc": "Khám phá nét sinh hoạt buôn bán tấp nập trên sông của người dân Chợ Nổi Cái Răng vào sáng sớm. Khởi hành đi Châu Đốc, ngồi xuồng ba lá lướt nhẹ trên thảm bèo xanh mướt của rừng tràm Trà Sư."
      },
      {
        "day": 3,
        "title": "Miếu Bà Chúa Xứ - Làng bè nuôi cá - Hà Nội",
        "desc": "Chiêm bái Miếu Bà Chúa Xứ núi Sam linh thiêng. Thăm làng bè nổi nuôi cá basa trên sông Hậu. Mua sắm đặc sản bánh pía, mắm Châu Đốc trước khi ra sân bay Cần Thơ bay về Hà Nội."
      }
    ]
  }
];

  // Helper thực thi SQL an toàn
  function queryRows(sql, params = []) {
    if (!sqliteDB) return null;
    try {
      const stmt = sqliteDB.prepare(sql);
      stmt.bind(params);
      const rows = [];
      while (stmt.step()) {
        rows.push(stmt.getAsObject());
      }
      stmt.free();
      return rows;
    } catch (err) {
      console.warn("SQL Query Error:", sql, err);
      return null;
    }
  }

  // Khởi tạo SQL.js và đọc trực tiếp file SQLite/db.db
  async function loadDatabase() {
    if (typeof window.initSqlJs === 'function') {
      try {
        const SQL = await window.initSqlJs({
          locateFile: file => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.8.0/${file}`
        });

        // Cố gắng nạp trực tiếp file nhị phân SQLite/db.db
        // Thêm timestamp để vô hiệu hóa cache trình duyệt, luôn đọc dữ liệu mới nhất
        try {
          const response = await fetch('SQLite/db.db?nocache=' + Date.now());
          if (response.ok) {
            const buf = await response.arrayBuffer();
            sqliteDB = new SQL.Database(new Uint8Array(buf));
            isRealDbLoaded = true;
            console.log("🚀 ĐÃ KẾT NỐI VÀ NẠP DỮ LIỆU THÀNH CÔNG TỪ FILE: SQLite/db.db!");
            window.dispatchEvent(new CustomEvent('vietjet-db-loaded', { detail: { source: 'SQLite/db.db' } }));
            return;
          }
        } catch (fetchErr) {
          console.warn("Không thể fetch trực tiếp file SQLite/db.db (do chính sách CORS trên giao thức file://). Chuyển sang cơ chế SQLite In-Memory:", fetchErr);
        }

        // Nếu không fetch được file db.db, khởi tạo SQLite in-memory và nạp MOCK
        sqliteDB = new SQL.Database();
        sqliteDB.run(`
          CREATE TABLE airlines (id INTEGER PRIMARY KEY, code TEXT, name TEXT, logo TEXT, rating REAL, country TEXT, description TEXT);
          CREATE TABLE flights (id INTEGER PRIMARY KEY, airline_code TEXT, airline_name TEXT, flight_number TEXT, from_city TEXT, from_code TEXT, to_city TEXT, to_code TEXT, depart_time TEXT, arrive_time TEXT, duration TEXT, flight_type TEXT, is_direct INTEGER, aircraft_type TEXT, price_economy INTEGER, price_business INTEGER, time_slot TEXT, services_economy TEXT, services_business TEXT);
          CREATE TABLE tours (id INTEGER PRIMARY KEY, title TEXT, thumbnail TEXT, agency_name TEXT, duration TEXT, days_count INTEGER, from_city TEXT, destination TEXT, airline_partner TEXT, aircraft_type TEXT, depart_hour TEXT, time_slot TEXT, flight_duration TEXT, price INTEGER, is_featured INTEGER, services_included TEXT, itinerary_json TEXT);
        `);

        MOCK_AIRLINES.forEach(a => {
          sqliteDB.run("INSERT INTO airlines VALUES (?, ?, ?, ?, ?, ?, ?)", [a.id || null, a.code, a.name, a.logo, a.rating, a.country, a.description]);
        });
        MOCK_FLIGHTS.forEach(f => {
          sqliteDB.run("INSERT INTO flights VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", 
            [f.id, f.airline_code, f.airline_name, f.flight_number, f.from_city, f.from_code, f.to_city, f.to_code, f.depart_time, f.arrive_time, f.duration, f.flight_type, f.is_direct, f.aircraft_type, f.price_economy, f.price_business, f.time_slot, f.services_economy, f.services_business]);
        });
        MOCK_TOURS.forEach(t => {
          sqliteDB.run("INSERT INTO tours VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [t.id, t.title, t.thumbnail, t.agency_name, t.duration, t.days_count, t.from_city, t.destination, t.airline_partner, t.aircraft_type, t.depart_hour, t.time_slot, t.flight_duration, t.price, t.is_featured, t.services_included, JSON.stringify(t.itinerary || [])]);
        });

        isRealDbLoaded = true;
        console.log("Đã khởi tạo SQLite In-Memory Database thành công!");
        window.dispatchEvent(new CustomEvent('vietjet-db-loaded', { detail: { source: 'in-memory' } }));
      } catch (e) {
        console.warn("Lỗi khởi tạo sql.js:", e);
      }
    }
  }

  // Tự động kích hoạt nạp Database
  loadDatabase();

  // Unified Database Service API
  window.vietjetDB = {
    isLoaded: () => isRealDbLoaded,

    // 1. Lấy danh sách hãng bay
    getAirlines: function () {
      if (sqliteDB) {
        const rows = queryRows("SELECT * FROM airlines ORDER BY id ASC");
        if (rows && rows.length > 0) return rows;
      }
      return MOCK_AIRLINES;
    },

    // 2. Lấy 8 tour nổi bật trang chủ
    getFeaturedTours: function () {
      if (sqliteDB) {
        const rows = queryRows("SELECT * FROM tours WHERE is_featured = 1 ORDER BY id ASC LIMIT 8");
        if (rows && rows.length > 0) {
          return rows.map(r => {
            try { r.itinerary = JSON.parse(r.itinerary_json); } catch(e) { r.itinerary = []; }
            return r;
          });
        }
      }
      return MOCK_TOURS.filter(t => t.is_featured === 1).slice(0, 8);
    },

    // 3. Lấy tour theo ID
    getTourById: function (id) {
      const tourId = parseInt(id, 10);
      if (sqliteDB) {
        const rows = queryRows("SELECT * FROM tours WHERE id = ?", [tourId]);
        if (rows && rows.length > 0) {
          const r = rows[0];
          try { r.itinerary = JSON.parse(r.itinerary_json); } catch(e) { r.itinerary = []; }
          return r;
        }
      }
      return MOCK_TOURS.find(t => t.id === tourId) || null;
    },

    // 4. Lọc tour du lịch
    getTours: function (filters = {}) {
      if (sqliteDB) {
        let sql = "SELECT * FROM tours WHERE 1=1";
        let params = [];
        if (filters.airline && filters.airline !== 'all') {
          sql += " AND airline_partner LIKE ?";
          params.push(`%${filters.airline}%`);
        }
        if (filters.time_slot && filters.time_slot !== 'all') {
          sql += " AND time_slot = ?";
          params.push(filters.time_slot);
        }
        if (filters.sort === 'price_desc') {
          sql += " ORDER BY price DESC";
        } else {
          sql += " ORDER BY price ASC";
        }

        const rows = queryRows(sql, params);
        if (rows) {
          return rows.map(r => {
            try { r.itinerary = JSON.parse(r.itinerary_json); } catch(e) { r.itinerary = []; }
            return r;
          });
        }
      }

      // Fallback
      let results = [...MOCK_TOURS];
      if (filters.airline && filters.airline !== 'all') {
        results = results.filter(t => t.airline_partner.toLowerCase().includes(filters.airline.toLowerCase()));
      }
      if (filters.time_slot && filters.time_slot !== 'all') {
        results = results.filter(t => t.time_slot === filters.time_slot);
      }
      if (filters.sort === 'price_desc') {
        results.sort((a, b) => b.price - a.price);
      } else {
        results.sort((a, b) => a.price - b.price);
      }
      return results;
    },

    // 5. Lấy chuyến bay theo ID
    getFlightById: function (id) {
      const flightId = parseInt(id, 10);
      if (sqliteDB) {
        const rows = queryRows("SELECT * FROM flights WHERE id = ?", [flightId]);
        if (rows && rows.length > 0) return rows[0];
      }
      return MOCK_FLIGHTS.find(f => f.id === flightId) || null;
    },

    // 6. Lọc chuyến bay đa tiêu chí
    getFlights: function (filters = {}) {
      if (sqliteDB) {
        let sql = "SELECT * FROM flights WHERE 1=1";
        let params = [];

        if (filters.from_code && filters.from_code !== 'ALL') {
          sql += " AND from_code = ?";
          params.push(filters.from_code);
        }
        if (filters.to_code && filters.to_code !== 'ALL') {
          sql += " AND to_code = ?";
          params.push(filters.to_code);
        }
        if (filters.airlines && Array.isArray(filters.airlines) && filters.airlines.length > 0) {
          const placeholders = filters.airlines.map(() => '?').join(',');
          sql += ` AND airline_code IN (${placeholders})`;
          params.push(...filters.airlines);
        } else if (filters.airline && filters.airline !== 'all') {
          sql += " AND (airline_code = ? OR airline_name LIKE ?)";
          params.push(filters.airline, `%${filters.airline}%`);
        }
        if (filters.time_slots && Array.isArray(filters.time_slots) && filters.time_slots.length > 0) {
          const placeholders = filters.time_slots.map(() => '?').join(',');
          sql += ` AND time_slot IN (${placeholders})`;
          params.push(...filters.time_slots);
        }
        if (filters.flight_type === 'direct') {
          sql += " AND is_direct = 1";
        } else if (filters.flight_type === 'multi_city') {
          sql += " AND is_direct = 0";
        }

        if (filters.sort === 'price_desc') {
          sql += " ORDER BY price_economy DESC";
        } else if (filters.sort === 'depart_early') {
          sql += " ORDER BY depart_time ASC";
        } else {
          sql += " ORDER BY price_economy ASC";
        }

        const rows = queryRows(sql, params);
        if (rows) return rows;
      }

      // Fallback
      let results = [...MOCK_FLIGHTS];
      if (filters.from_code && filters.from_code !== 'ALL') {
        results = results.filter(f => f.from_code === filters.from_code);
      }
      if (filters.to_code && filters.to_code !== 'ALL') {
        results = results.filter(f => f.to_code === filters.to_code);
      }
      if (filters.airlines && Array.isArray(filters.airlines) && filters.airlines.length > 0) {
        results = results.filter(f => filters.airlines.includes(f.airline_code));
      }
      if (filters.time_slots && Array.isArray(filters.time_slots) && filters.time_slots.length > 0) {
        results = results.filter(f => filters.time_slots.includes(f.time_slot));
      }
      if (filters.flight_type === 'direct') {
        results = results.filter(f => f.is_direct === 1);
      } else if (filters.flight_type === 'multi_city') {
        results = results.filter(f => f.is_direct === 0);
      }
      if (filters.sort === 'price_desc') {
        results.sort((a, b) => b.price_economy - a.price_economy);
      } else if (filters.sort === 'depart_early') {
        results.sort((a, b) => a.depart_time.localeCompare(b.depart_time));
      } else {
        results.sort((a, b) => a.price_economy - b.price_economy);
      }
      return results;
    },

    // 7. Lưu đơn đặt chỗ
    saveOrder: function (orderData) {
      const orders = JSON.parse(localStorage.getItem('vietjet_orders') || '[]');
      const newOrder = {
        id: Date.now(),
        pnr_code: 'VJ-' + Math.floor(10000 + Math.random() * 90000),
        customer_name: orderData.name,
        customer_phone: orderData.phone,
        customer_email: orderData.email,
        customer_idcard: orderData.idcard || '',
        customer_address: orderData.address || '',
        notes: orderData.notes || '',
        total_amount: orderData.total,
        items: orderData.items,
        created_at: new Date().toISOString()
      };
      orders.unshift(newOrder);
      localStorage.setItem('vietjet_orders', JSON.stringify(orders));
      return newOrder;
    }
  };

})();
