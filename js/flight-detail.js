/**
 * VIETJET TRAVEL & BOOKING PORTAL
 * FILE: js/flight-detail.js (Chi Tiết Chuyến Bay & Chọn Hạng Vé)
 */

let currentFlight = null;
let currentSelectedClass = 'economy'; // 'economy' | 'business'

// Hàm toàn cục cho phép click trực tiếp vào thẻ
window.selectCabin = function (cabinType) {
  currentSelectedClass = cabinType;
  updateCabinUI();
};

function updateCabinUI() {
  if (!currentFlight) return;

  const cardEco = document.getElementById('cardEconomy');
  const cardBiz = document.getElementById('cardBusiness');
  const btnEco = document.getElementById('btnSelectEconomy');
  const btnBiz = document.getElementById('btnSelectBusiness');
  const totalPriceEl = document.getElementById('selectedTotalPrice');
  const classSummaryEl = document.getElementById('selectedClassSummary');

  if (currentSelectedClass === 'economy') {
    cardEco.classList.add('selected');
    cardBiz.classList.remove('selected');

    btnEco.textContent = 'Đang Chọn Hạng Này';
    btnEco.className = 'btn btn-block btn-outline';

    btnBiz.textContent = 'Chọn Hạng Thương Gia';
    btnBiz.className = 'btn btn-block btn-outline-secondary';

    totalPriceEl.textContent = window.formatCurrency(currentFlight.price_economy);
    classSummaryEl.textContent = 'Đang chọn: Hạng Phổ Thông (Economy) &bull; 07kg xách tay';
  } else {
    cardBiz.classList.add('selected');
    cardEco.classList.remove('selected');

    btnBiz.textContent = 'Đang Chọn Hạng Này';
    btnBiz.className = 'btn btn-block btn-primary';

    btnEco.textContent = 'Chọn Hạng Phổ Thông';
    btnEco.className = 'btn btn-block btn-outline-secondary';

    totalPriceEl.textContent = window.formatCurrency(currentFlight.price_business);
    classSummaryEl.textContent = 'Đang chọn: Hạng Thương Gia (SkyBoss VIP) &bull; 40kg ký gửi & Phòng chờ VIP';
  }
}

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  function loadAndRenderFlight() {
    const urlParams = new URLSearchParams(window.location.search);
    const flightId = urlParams.get('id') || '1';
    const initialClass = urlParams.get('class');
    if (initialClass === 'business') {
      currentSelectedClass = 'business';
    }

    // Truy vấn dữ liệu từ SQLite
    if (window.vietjetDB) {
      currentFlight = window.vietjetDB.getFlightById(flightId);
    }

    const summaryContainer = document.getElementById('flightSummaryCard');
    const breadcrumbEl = document.getElementById('flightDetailBreadcrumb');

    if (!currentFlight) {
      if (summaryContainer) {
        summaryContainer.innerHTML = `
          <div class="cart-empty-box">
            <div class="cart-empty-icon">⚠️</div>
            <h3>Không tìm thấy thông tin chuyến bay này</h3>
            <p style="color:var(--text-muted); margin: 8px 0 16px;">Vui lòng quay lại danh sách chuyến bay để lựa chọn lại hành trình của bạn.</p>
            <a href="flights.html" class="btn btn-primary">Xem Danh Sách Chuyến Bay</a>
          </div>
        `;
      }
      return;
    }

    // Cập nhật Breadcrumb
    if (breadcrumbEl) {
      breadcrumbEl.textContent = `${currentFlight.from_city} (${currentFlight.from_code}) ➔ ${currentFlight.to_city} (${currentFlight.to_code})`;
    }

    // Xác định Logo hãng
    let logoUrl = 'image/logo.jpg';
    if (currentFlight.airline_code === 'VN') logoUrl = 'image/vietnam-airlines.svg';
    else if (currentFlight.airline_code === 'SQ') logoUrl = 'image/singapore-airlines.svg';
    else if (currentFlight.airline_code === 'QH') logoUrl = 'image/bamboo-airways.svg';
    else if (currentFlight.airline_code === 'VU') logoUrl = 'image/vietravel-airlines.svg';

    // Render thông tin tổng quan chặng bay
    if (summaryContainer) {
      summaryContainer.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--border-light); padding-bottom:18px; margin-bottom:20px;">
          <div style="display:flex; align-items:center; gap:16px;">
            <img src="${logoUrl}" alt="${currentFlight.airline_name}" style="height:48px; width:auto; border-radius:6px; border:1px solid var(--border-light); padding:4px; background:#fff;">
            <div>
              <h2 style="font-size:1.3rem; font-weight:800; color:var(--text-main); line-height:1.2;">
                ${currentFlight.airline_name}
              </h2>
              <div style="font-size:0.85rem; color:var(--text-muted); margin-top:2px;">
                Số hiệu: <strong style="color:var(--text-main);">${currentFlight.flight_number}</strong> &bull; Loại máy bay: <strong style="color:var(--primary-red);">${currentFlight.aircraft_type}</strong>
              </div>
            </div>
          </div>

          <span class="badge ${currentFlight.is_direct === 1 ? 'badge-green' : 'badge-yellow'}" style="font-size:0.85rem; padding:6px 14px;">
            ${currentFlight.is_direct === 1 ? 'Bay Thẳng' : 'Nối Chuyến'}
          </span>
        </div>

        <div style="display:grid; grid-template-columns: 1fr auto 1fr; gap:24px; align-items:center; text-align:center; padding:10px 0;">
          <div style="text-align:left;">
            <div style="font-size:0.85rem; color:var(--text-muted); font-weight:700;">ĐIỂM KHỞI HÀNH</div>
            <div style="font-size:2rem; font-weight:900; color:var(--text-main); line-height:1.1; margin:6px 0 2px;">
              ${currentFlight.depart_time}
            </div>
            <div style="font-size:1.1rem; font-weight:800; color:var(--primary-red);">${currentFlight.from_code}</div>
            <div style="font-size:0.9rem; color:var(--text-main); font-weight:600;">${currentFlight.from_city}</div>
          </div>

          <div style="min-width:180px;">
            <span style="font-size:0.85rem; font-weight:700; color:var(--text-muted);">Thời gian bay: ${currentFlight.duration}</span>
            <div class="route-line" style="margin:12px 0;"></div>
            <span style="font-size:0.75rem; color:var(--success); font-weight:700;">Chuyến bay đúng giờ</span>
          </div>

          <div style="text-align:right;">
            <div style="font-size:0.85rem; color:var(--text-muted); font-weight:700;">ĐIỂM ĐẾN</div>
            <div style="font-size:2rem; font-weight:900; color:var(--text-main); line-height:1.1; margin:6px 0 2px;">
              ${currentFlight.arrive_time}
            </div>
            <div style="font-size:1.1rem; font-weight:800; color:var(--primary-red);">${currentFlight.to_code}</div>
            <div style="font-size:0.9rem; color:var(--text-main); font-weight:600;">${currentFlight.to_city}</div>
          </div>
        </div>
      `;
    }

    // Điền giá cho các thẻ hạng vé
    const priceEcoEl = document.getElementById('priceEconomyText');
    const priceBizEl = document.getElementById('priceBusinessText');
    if (priceEcoEl) priceEcoEl.textContent = window.formatCurrency(currentFlight.price_economy);
    if (priceBizEl) priceBizEl.textContent = window.formatCurrency(currentFlight.price_business);

    // Cập nhật trạng thái hiển thị
    updateCabinUI();
  }

  // Render lần đầu
  loadAndRenderFlight();

  // Khi SQLite/db.db tải xong từ server, tự động render lại dữ liệu mới nhất
  window.addEventListener('vietjet-db-loaded', function () {
    loadAndRenderFlight();
  });

  // Xử lý nút Thêm vào giỏ hàng
  const btnAddToCart = document.getElementById('btnAddToCartFlight');
  if (btnAddToCart) {
    btnAddToCart.addEventListener('click', function () {
      const isBusiness = currentSelectedClass === 'business';
      const chosenPrice = isBusiness ? currentFlight.price_business : currentFlight.price_economy;
      const chosenSeatClass = isBusiness ? 'Hạng Thương Gia (SkyBoss)' : 'Hạng Phổ Thông (Economy)';

      const cartItem = {
        type: 'flight',
        id: currentFlight.id,
        title: `${currentFlight.from_city} (${currentFlight.from_code}) ➔ ${currentFlight.to_city} (${currentFlight.to_code})`,
        airline: currentFlight.airline_name,
        flight_number: currentFlight.flight_number,
        aircraft_type: currentFlight.aircraft_type,
        time: `${currentFlight.depart_time} - ${currentFlight.arrive_time}`,
        duration: currentFlight.duration,
        seatClass: chosenSeatClass,
        price: chosenPrice,
        quantity: 1
      };

      window.addToCart(cartItem);

      // Hiệu ứng nút
      btnAddToCart.textContent = '✓ Đã Thêm Vào Giỏ';
      btnAddToCart.classList.remove('btn-primary');
      btnAddToCart.classList.add('btn-accent');

      setTimeout(() => {
        btnAddToCart.textContent = '🛒 Thêm Vào Giỏ Hàng';
        btnAddToCart.classList.remove('btn-accent');
        btnAddToCart.classList.add('btn-primary');
      }, 2000);
    });
  }
});
