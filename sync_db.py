# ============================================================
# VIETJET TRAVEL - SCRIPT ĐỒNG BỘ SQLITE/DB.DB VÀO JS/DB.JS
# Sử dụng: python sync_db.py
# Mục đích: Đọc toàn bộ dữ liệu mới nhất từ SQLite/db.db và đồng bộ vào js/db.js
# giúp website cập nhật ngay cả khi mở trực tiếp file:// không qua server.
# ============================================================

import sqlite3
import json
import os
import re
import sys

# Đảm bảo in tiếng Việt trên console Windows
if sys.platform == 'win32':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

db_path = os.path.join(os.path.dirname(__file__), 'SQLite', 'db.db')
js_db_path = os.path.join(os.path.dirname(__file__), 'js', 'db.js')

if not os.path.exists(db_path):
    print(f"Lỗi: Không tìm thấy file {db_path}")
    exit(1)

conn = sqlite3.connect(db_path)
conn.row_factory = sqlite3.Row

# 1. Đọc Airlines
airlines = [dict(r) for r in conn.execute('SELECT * FROM airlines ORDER BY id ASC').fetchall()]

# 2. Đọc Flights
flights = [dict(r) for r in conn.execute('SELECT * FROM flights ORDER BY id ASC').fetchall()]

# 3. Đọc Tours
raw_tours = [dict(r) for r in conn.execute('SELECT * FROM tours ORDER BY id ASC').fetchall()]
tours = []
for t in raw_tours:
    tour_dict = dict(t)
    try:
        tour_dict['itinerary'] = json.loads(tour_dict.get('itinerary_json', '[]'))
    except Exception:
        tour_dict['itinerary'] = []
    tours.append(tour_dict)

conn.close()

# Đọc file js/db.js hiện tại
with open(js_db_path, 'r', encoding='utf-8') as f:
    js_content = f.read()

# Thay thế MOCK_AIRLINES
airlines_json = json.dumps(airlines, ensure_ascii=False, indent=2)
flights_json = json.dumps(flights, ensure_ascii=False, indent=2)
tours_json = json.dumps(tours, ensure_ascii=False, indent=2)

js_content = re.sub(
    r'const MOCK_AIRLINES = \[[\s\S]*?\];',
    f'const MOCK_AIRLINES = {airlines_json};',
    js_content
)

js_content = re.sub(
    r'const MOCK_FLIGHTS = \[[\s\S]*?\];',
    f'const MOCK_FLIGHTS = {flights_json};',
    js_content
)

js_content = re.sub(
    r'const MOCK_TOURS = \[[\s\S]*?\];',
    f'const MOCK_TOURS = {tours_json};',
    js_content
)

with open(js_db_path, 'w', encoding='utf-8') as f:
    f.write(js_content)

print(f"✅ ĐÃ ĐỒNG BỘ THÀNH CÔNG TỪ SQLite/db.db VÀO js/db.js!")
print(f"   - Hãng bay: {len(airlines)}")
print(f"   - Chuyến bay: {len(flights)}")
print(f"   - Tour du lịch: {len(tours)}")
