# THƯ MỤC CƠ SỞ DỮ LIỆU SQLITE (VIETJET DATABASE)

Thư mục này chứa toàn bộ các file mã nguồn SQL (`.sql`) để định nghĩa cấu trúc bảng, nạp dữ liệu mẫu ban đầu (Mock Data) và các câu lệnh truy vấn phục vụ website **Vietjet**.

---

## 1. DANH SÁCH CÁC FILE .SQL

| Tên File | Chức Năng |
| :--- | :--- |
| **[`schema.sql`](./schema.sql)** | Chứa các câu lệnh DDL (`CREATE TABLE`, `CREATE INDEX`) cho 4 bảng: `airlines`, `flights`, `tours`, `orders`. |
| **[`seed_airlines.sql`](./seed_airlines.sql)** | Dữ liệu khởi tạo cho 6 hãng hàng không đối tác: VietJet Air, Vietnam Airlines, Singapore Airlines, Bamboo Airways, Vietravel Airlines, Qatar Airways. |
| **[`seed_flights.sql`](./seed_flights.sql)** | Dữ liệu khởi tạo cho gần 20 chuyến bay đa dạng các chặng (HAN - SGN, HAN - DAD, SGN - PQC, HAN - SIN...) với 2 mức giá vé (Phổ thông & Thương gia). |
| **[`seed_tours.sql`](./seed_tours.sql)** | Dữ liệu khởi tạo các tour du lịch, trong đó có **đúng 8 tour nổi bật** (`is_featured = 1`) có ảnh thumbnail tỉ lệ chuẩn **600x400** và lịch trình chi tiết JSON từng ngày. |
| **[`vietjet_master.sql`](./vietjet_master.sql)** | **File tổng hợp All-in-One:** Gộp toàn bộ `schema.sql` và tất cả các `seed_*.sql` vào 1 file duy nhất. Giúp bạn khởi tạo toàn bộ database chỉ với 1 thao tác. |
| **[`sample_queries.sql`](./sample_queries.sql)** | Tập hợp các câu lệnh `SELECT`, `INSERT` mẫu tương ứng với từng chức năng trên giao diện (lọc theo hãng, lọc giờ cất cánh, sắp xếp giá, lấy 8 tour nổi bật, lưu đơn hàng). |

---

## 2. CÁCH HỆ THỐNG FRONTEND SỬ DỤNG CÁC FILE SQL NÀY

Trong kiến trúc không dùng Backend của dự án:
1. File JavaScript **`js/db.js`** sẽ nhúng thư viện WebAssembly **`sql.js`** qua CDN.
2. `js/db.js` sử dụng trực tiếp các câu lệnh SQL trong `vietjet_master.sql` để khởi tạo cơ sở dữ liệu in-memory ngay trên trình duyệt khi người dùng truy cập.
3. Các trang như `flights.js`, `tours.js` sẽ gọi các hàm `db.exec(sql)` với các câu lệnh lọc trong `sample_queries.sql` để hiển thị dữ liệu tức thì mà không cần mạng Internet.

---

## 3. CÁCH XEM VÀ MỞ DATABASE BẰNG CÁC CÔNG CỤ NGOÀI

Bạn có thể mở các file `.sql` này bằng:
- **VS Code Extension:** Cài extension *SQLite Viewer* hoặc *Database Client*.
- **Phần mềm chuyên dụng:** *DB Browser for SQLite* ([https://sqlitebrowser.org/](https://sqlitebrowser.org/)) hoặc *DBeaver*.
- Tạo file database `.db` cục bộ nếu máy tính đã cài đặt `sqlite3`:
  ```bash
  sqlite3 vietjet.db < SQLite/vietjet_master.sql
  ```
