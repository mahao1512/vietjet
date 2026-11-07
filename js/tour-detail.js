/**
 * VIETJET TRAVEL & BOOKING PORTAL
 * FILE: js/tour-detail.js (Chi Tiết Tour & Lịch Trình Chuyến Đi)
 */

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  function renderTourDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const tourId = urlParams.get('id') || '1';

    let currentTour = null;
    if (window.vietjetDB) {
      currentTour = window.vietjetDB.getTourById(tourId);
    }

    const container = document.getElementById('tourDetailContainer');
    const breadcrumbEl = document.getElementById('tourBreadcrumb');

    if (!currentTour) {
      if (container) {
        container.innerHTML = `
          <div class="cart-empty-box" style="background:#fff; border-radius:12px; border:1px solid var(--border-light); padding:60px 20px;">
            <div class="cart-empty-icon">⚠️</div>
            <h3>Không tìm thấy thông tin tour du lịch này</h3>
            <p style="color:var(--text-muted); margin: 8px 0 16px;">Vui lòng quay lại danh sách tour để chọn chuyến đi mong muốn.</p>
            <a href="tours.html" class="btn btn-primary">Xem Danh Sách Tour</a>
          </div>
        `;
      }
      return;
    }

    if (breadcrumbEl) {
      breadcrumbEl.textContent = currentTour.title;
    }

    let passengerCount = 1;

    // Render toàn bộ giao diện chi tiết tour
    container.innerHTML = `
      <!-- Tiêu đề & Thông tin cơ bản -->
      <div style="margin-bottom: 24px;">
        <div style="display:flex; gap:10px; align-items:center; margin-bottom:8px;">
          <span class="badge badge-red">Tour Trọn Gói Cao Cấp</span>
          <span class="badge badge-yellow">⏳ ${currentTour.duration}</span>
          <span style="font-size:0.85rem; color:var(--text-muted);">🏢 Đơn vị tổ chức: <strong>${currentTour.agency_name}</strong></span>
        </div>
        <h1 style="font-size: 2.1rem; font-weight: 900; color:var(--text-main); line-height:1.25;">
          ${currentTour.title}
        </h1>
      </div>

      <!-- Layout 2 cột: Cột trái lịch trình & thông tin bay; Cột phải đặt tour -->
      <div style="display:grid; grid-template-columns: 1fr 360px; gap: 32px; align-items:flex-start;">
        
        <!-- CỘT TRÁI -->
        <div>
          <!-- Ảnh Hero Tour -->
          <div style="border-radius: var(--radius-md); overflow:hidden; margin-bottom: 28px; box-shadow:var(--shadow-sm); aspect-ratio: 16/9; background:#e2e8f0;">
            <img src="${currentTour.thumbnail}" alt="${currentTour.title}" style="width:100%; height:100%; object-fit:cover;">
          </div>

          <!-- Khung Thông Tin Vận Chuyển Hàng Không -->
          <div style="background:#fff; border:1px solid var(--border-light); border-radius:var(--radius-md); padding:24px; margin-bottom: 28px; box-shadow:var(--shadow-sm);">
            <h3 style="font-size:1.15rem; font-weight:800; margin-bottom:16px; display:flex; align-items:center; gap:8px;">
              <span>✈️</span> Thông Tin Chuyến Bay Cùng Tour
            </h3>
            <div style="display:grid; grid-template-columns: repeat(3, 1fr); gap:16px; background:var(--bg-subtle); padding:16px; border-radius:var(--radius-sm);">
              <div>
                <div style="font-size:0.75rem; color:var(--text-muted); font-weight:700;">HÃNG HÀNG KHÔNG</div>
                <div style="font-weight:800; color:var(--primary-red); font-size:1rem; margin-top:2px;">${currentTour.airline_partner}</div>
              </div>
              <div>
                <div style="font-size:0.75rem; color:var(--text-muted); font-weight:700;">LOẠI TÀU BAY</div>
                <div style="font-weight:800; color:var(--text-main); font-size:1rem; margin-top:2px;">${currentTour.aircraft_type}</div>
              </div>
              <div>
                <div style="font-size:0.75rem; color:var(--text-muted); font-weight:700;">GIỜ CẤT CÁNH / BAY</div>
                <div style="font-weight:800; color:var(--text-main); font-size:1rem; margin-top:2px;">${currentTour.depart_hour} (${currentTour.flight_duration})</div>
              </div>
            </div>
            <div style="font-size:0.85rem; color:var(--text-muted); margin-top:12px;">
              📍 Tuyến bay: <strong>${currentTour.from_city}</strong> ➔ <strong>${currentTour.destination}</strong> (Vé máy bay khứ hồi đã bao gồm trọn gói trong giá tour).
            </div>
          </div>

          <!-- Khối Lịch Trình Chuyến Đi (Timeline) -->
          <div style="background:#fff; border:1px solid var(--border-light); border-radius:var(--radius-md); padding:28px; box-shadow:var(--shadow-sm); margin-bottom:28px;">
            <h3 style="font-size:1.3rem; font-weight:800; margin-bottom:20px; color:var(--text-main);">
              📅 Lịch Trình Chuyến Đi Chi Tiết
            </h3>

            <div class="tour-itinerary-timeline">
              ${(currentTour.itinerary || []).map(item => `
                <div class="timeline-step">
                  <div class="timeline-dot">${item.day}</div>
                  <div class="timeline-title">Ngày ${item.day}: ${item.title}</div>
                  <div class="timeline-desc">${item.desc}</div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Dịch Vụ Bao Gồm & Không Bao Gồm -->
          <div style="background:#fff; border:1px solid var(--border-light); border-radius:var(--radius-md); padding:28px; box-shadow:var(--shadow-sm);">
            <h3 style="font-size:1.2rem; font-weight:800; margin-bottom:16px;">🎁 Quyền Lợi & Chính Sách Tour</h3>
            
            <div style="margin-bottom:16px;">
              <h4 style="font-size:0.95rem; font-weight:700; color:#059669; margin-bottom:8px;">✓ GIÁ TOUR ĐÃ BAO GỒM:</h4>
              <ul style="list-style:disc; padding-left:20px; font-size:0.9rem; color:var(--text-muted); line-height:1.7;">
                <li>Vé máy bay khứ hồi ${currentTour.airline_partner} (gồm 07kg hành lý xách tay + 20kg ký gửi).</li>
                <li>Khách sạn tiêu chuẩn 4 - 5 sao (2 khách/phòng, lẻ nam/nữ ngủ phòng 3).</li>
                <li>Xe ô tô du lịch đời mới máy lạnh đưa đón tham quan theo chương trình.</li>
                <li>Các bữa ăn chính chất lượng đặc sản địa phương theo lịch trình.</li>
                <li>Vé tham quan các điểm danh thắng trong chương trình.</li>
                <li>Bảo hiểm du lịch trọn gói mức bồi thường tối đa 100.000.000đ/vụ.</li>
                <li>Hướng dẫn viên kinh nghiệm, vui vẻ, tận tâm phục vụ suốt tuyến.</li>
              </ul>
            </div>

            <div>
              <h4 style="font-size:0.95rem; font-weight:700; color:var(--danger); margin-bottom:8px;">✕ GIÁ CHƯA BAO GỒM:</h4>
              <ul style="list-style:disc; padding-left:20px; font-size:0.9rem; color:var(--text-muted); line-height:1.7;">
                <li>Chi phí cá nhân: giặt ủi, điện thoại, minibar, đồ uống ngoài chương trình.</li>
                <li>Tiền tips bồi dưỡng cho hướng dẫn viên và lái xe.</li>
                <li>Thuế VAT (nếu quý khách có nhu cầu xuất hóa đơn đỏ).</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- CỘT PHẢI: KHUNG ĐẶT TOUR (STICKY) -->
        <aside style="position:sticky; top:96px;">
          <div style="background:#fff; border:1px solid var(--border-light); border-radius:var(--radius-md); padding:28px; box-shadow:var(--shadow-md);">
            <div style="font-size:0.85rem; color:var(--text-muted);">Giá tour trọn gói / khách:</div>
            <div style="font-size:2rem; font-weight:900; color:var(--primary-red); margin:4px 0 16px;">
              ${window.formatCurrency(currentTour.price)}
            </div>

            <!-- Bộ chọn số lượng khách -->
            <div style="margin-bottom:20px; padding:16px; background:var(--bg-subtle); border-radius:var(--radius-sm);">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
                <span style="font-weight:700; font-size:0.9rem;">Số Lượng Khách:</span>
                <div style="display:flex; align-items:center; gap:8px;">
                  <button id="btnMinusGuest" class="btn btn-outline btn-sm" style="width:32px; height:32px; padding:0;">-</button>
                  <span id="guestCountText" style="font-weight:800; font-size:1.1rem; min-width:24px; text-align:center;">1</span>
                  <button id="btnPlusGuest" class="btn btn-outline btn-sm" style="width:32px; height:32px; padding:0;">+</button>
                </div>
              </div>

              <div style="display:flex; justify-content:space-between; font-size:0.9rem; padding-top:10px; border-top:1px solid var(--border-light);">
                <span>Tổng thanh toán:</span>
                <strong id="tourTotalPrice" style="color:var(--primary-red); font-size:1.15rem;">
                  ${window.formatCurrency(currentTour.price)}
                </strong>
              </div>
            </div>

            <!-- Nút đặt tour -->
            <button id="btnBookTour" class="btn btn-primary btn-block btn-lg" style="margin-bottom:14px;">
              🛒 Chọn Tour & Thêm Vào Giỏ
            </button>

            <a href="cart.html" class="btn btn-outline-secondary btn-block btn-sm">
              Xem Giỏ Hàng Của Bạn
            </a>

            <!-- Cam kết dịch vụ -->
            <div style="margin-top:24px; padding-top:18px; border-top:1px solid var(--border-light); font-size:0.82rem; color:var(--text-muted); display:flex; flex-direction:column; gap:8px;">
              <div>🛡️ <strong>Bảo hiểm:</strong> Bảo hiểm du lịch lên tới 100 triệu</div>
              <div>📞 <strong>Hỗ trợ:</strong> Hotline chăm sóc 1900 1886</div>
              <div>⚡ <strong>Xác nhận:</strong> Giữ chỗ tức thì, gửi vé qua email</div>
            </div>
          </div>
        </aside>

      </div>
    `;

    // Xử lý sự kiện tăng giảm số khách và thêm vào giỏ
    const btnMinus = document.getElementById('btnMinusGuest');
    const btnPlus = document.getElementById('btnPlusGuest');
    const guestText = document.getElementById('guestCountText');
    const totalPriceEl = document.getElementById('tourTotalPrice');
    const btnBookTour = document.getElementById('btnBookTour');

    function updatePrice() {
      if (guestText) guestText.textContent = passengerCount;
      if (totalPriceEl) totalPriceEl.textContent = window.formatCurrency(currentTour.price * passengerCount);
    }

    btnMinus?.addEventListener('click', function () {
      if (passengerCount > 1) {
        passengerCount--;
        updatePrice();
      }
    });

    btnPlus?.addEventListener('click', function () {
      passengerCount++;
      updatePrice();
    });

    btnBookTour?.addEventListener('click', function () {
      const cartItem = {
        type: 'tour',
        id: currentTour.id,
        title: currentTour.title,
        agency: currentTour.agency_name,
        duration: currentTour.duration,
        airline: currentTour.airline_partner,
        aircraft_type: currentTour.aircraft_type,
        depart_hour: currentTour.depart_hour,
        price: currentTour.price,
        quantity: passengerCount
      };

      window.addToCart(cartItem);

      btnBookTour.textContent = '✓ Đã Thêm Vào Giỏ';
      btnBookTour.classList.remove('btn-primary');
      btnBookTour.classList.add('btn-accent');

      setTimeout(() => {
        btnBookTour.textContent = '🛒 Chọn Tour & Thêm Vào Giỏ';
        btnBookTour.classList.remove('btn-accent');
        btnBookTour.classList.add('btn-primary');
      }, 2000);
    });
  }

  // Render lần đầu
  renderTourDetail();

  // Khi SQLite/db.db tải xong từ server, tự động render lại dữ liệu mới nhất
  window.addEventListener('vietjet-db-loaded', function () {
    renderTourDetail();
  });
});

});
