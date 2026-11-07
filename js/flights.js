/**
 * VIETJET TRAVEL & BOOKING PORTAL
 * FILE: js/flights.js (Logic Lọc và Hiển Thị Chuyến Bay)
 */

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // 1. Đọc tham số URL Query
  const urlParams = new URLSearchParams(window.location.search);
  const paramFrom = urlParams.get('from');
  const paramTo = urlParams.get('to');
  const paramAirline = urlParams.get('airline');
  const paramType = urlParams.get('type');

  // Cập nhật tiêu đề chặng bay nếu có
  const titleEl = document.getElementById('searchRouteTitle');
  const subtitleEl = document.getElementById('searchRouteSubtitle');
  if (paramFrom && paramTo && titleEl) {
    titleEl.textContent = `Chuyến Bay: ${paramFrom} ➔ ${paramTo}`;
    if (subtitleEl) subtitleEl.textContent = `Kết quả tìm kiếm vé máy bay tốt nhất cho hành trình của bạn`;
  } else if (paramAirline && titleEl) {
    titleEl.textContent = `Các Chuyến Bay Hãng ${paramAirline}`;
  }

  // Nếu có param airline từ URL, tích chọn sẵn checkbox tương ứng
  if (paramAirline) {
    const cb = document.querySelector(`input[name="filterAirline"][value="${paramAirline}"]`);
    if (cb) cb.checked = true;
  }

  // 2. Thu thập các giá trị filter hiện tại
  function getFilterState() {
    const sort = document.getElementById('filterSort').value;
    const tripType = document.querySelector('input[name="filterTripType"]:checked')?.value || 'all';

    // Danh sách hãng bay được chọn
    const selectedAirlines = Array.from(document.querySelectorAll('input[name="filterAirline"]:checked'))
      .map(cb => cb.value);

    // Danh sách khung giờ được chọn
    const selectedTimeSlots = Array.from(document.querySelectorAll('input[name="filterTimeSlot"]:checked'))
      .map(cb => cb.value);

    // Hạng dịch vụ hiển thị
    const cabinView = document.querySelector('input[name="filterCabinView"]:checked')?.value || 'economy';

    return {
      from_code: paramFrom || 'ALL',
      to_code: paramTo || 'ALL',
      sort,
      flight_type: tripType,
      airlines: selectedAirlines,
      time_slots: selectedTimeSlots,
      cabin_view: cabinView
    };
  }

  // 3. Hàm render danh sách chuyến bay
  function renderFlights() {
    const container = document.getElementById('flightsListContainer');
    const countEl = document.getElementById('flightsCountNum');
    if (!container || !window.vietjetDB) return;

    const filters = getFilterState();
    const flights = window.vietjetDB.getFlights(filters);

    if (countEl) countEl.textContent = flights.length;

    if (flights.length === 0) {
      container.innerHTML = `
        <div class="cart-empty-box" style="background:#fff; border-radius:12px; border:1px solid var(--border-light);">
          <div class="cart-empty-icon">✈️</div>
          <h3>Không tìm thấy chuyến bay phù hợp</h3>
          <p style="color:var(--text-muted); margin: 8px 0 16px;">Vui lòng thử bỏ chọn một số điều kiện trong bộ lọc bên trái để xem thêm các chuyến bay khác.</p>
          <button id="btnResetFilterEmpty" class="btn btn-outline btn-sm">Đặt Lại Bộ Lọc</button>
        </div>
      `;
      document.getElementById('btnResetFilterEmpty')?.addEventListener('click', resetFilters);
      return;
    }

    container.innerHTML = flights.map(flight => {
      // Xác định giá và dịch vụ theo Hạng Phổ Thông hay Thương Gia đang chọn
      const isBusiness = filters.cabin_view === 'business';
      const displayPrice = isBusiness ? flight.price_business : flight.price_economy;
      const displayClassLabel = isBusiness ? 'Hạng Thương Gia (Business)' : 'Hạng Phổ Thông (Economy)';
      const displayService = isBusiness ? flight.services_business : flight.services_economy;

      // Xác định logo hãng
      let logoUrl = 'image/logo.jpg';
      if (flight.airline_code === 'VN') logoUrl = 'image/vietnam-airlines.svg';
      else if (flight.airline_code === 'SQ') logoUrl = 'image/singapore-airlines.svg';
      else if (flight.airline_code === 'QH') logoUrl = 'image/bamboo-airways.svg';
      else if (flight.airline_code === 'VU') logoUrl = 'image/vietravel-airlines.svg';

      return `
        <article class="flight-card">
          <!-- Hãng hàng không -->
          <div class="flight-airline">
            <img src="${logoUrl}" alt="${flight.airline_name}" loading="lazy">
            <div class="airline-info">
              <h4>${flight.airline_name}</h4>
              <span>Mã: <strong>${flight.flight_number}</strong></span>
              <div style="font-size:0.75rem; color:var(--text-muted);">${flight.aircraft_type}</div>
            </div>
          </div>

          <!-- Lộ trình & Thời gian -->
          <div class="flight-timeline">
            <div class="time-box">
              <h3>${flight.depart_time}</h3>
              <span>${flight.from_code} (${flight.from_city})</span>
            </div>

            <div class="route-arrow">
              <span>⏱ ${flight.duration}</span>
              <div class="route-line"></div>
              <span class="direct-tag">${flight.is_direct === 1 ? 'Bay Thẳng' : 'Nối Chuyến'}</span>
            </div>

            <div class="time-box">
              <h3>${flight.arrive_time}</h3>
              <span>${flight.to_code} (${flight.to_city})</span>
            </div>
          </div>

          <!-- Dịch vụ cơ bản -->
          <div class="flight-services">
            <span class="badge ${isBusiness ? 'badge-yellow' : 'badge-red-light'}" style="margin-bottom:4px;">
              ${isBusiness ? 'SkyBoss / VIP' : 'Economy'}
            </span>
            <div title="${displayService}">
              🧳 ${displayService.length > 45 ? displayService.substring(0, 45) + '...' : displayService}
            </div>
          </div>

          <!-- Mức giá & Nút chọn -->
          <div class="flight-action">
            <span class="flight-price-from">${displayClassLabel}</span>
            <div class="flight-price-num">${window.formatCurrency(displayPrice)}</div>
            <a href="flight-detail.html?id=${flight.id}&class=${filters.cabin_view}" class="btn btn-primary btn-sm">
              Chọn Chuyến Bay ➔
            </a>
          </div>
        </article>
      `;
    }).join('');
  }

  // 4. Reset Filters
  function resetFilters() {
    document.getElementById('filterSort').value = 'price_asc';
    
    const tripRadioAll = document.querySelector('input[name="filterTripType"][value="all"]');
    if (tripRadioAll) tripRadioAll.checked = true;

    const cabinRadioEco = document.querySelector('input[name="filterCabinView"][value="economy"]');
    if (cabinRadioEco) cabinRadioEco.checked = true;

    document.querySelectorAll('input[name="filterAirline"]').forEach(cb => cb.checked = false);
    document.querySelectorAll('input[name="filterTimeSlot"]').forEach(cb => cb.checked = false);

    renderFlights();
  }

  // 5. Lắng nghe sự kiện thay đổi trên các input
  document.getElementById('filterSort')?.addEventListener('change', renderFlights);
  document.querySelectorAll('input[name="filterTripType"]').forEach(r => r.addEventListener('change', renderFlights));
  document.querySelectorAll('input[name="filterCabinView"]').forEach(r => r.addEventListener('change', renderFlights));
  document.querySelectorAll('input[name="filterAirline"]').forEach(cb => cb.addEventListener('change', renderFlights));
  document.querySelectorAll('input[name="filterTimeSlot"]').forEach(cb => cb.addEventListener('change', renderFlights));
  document.getElementById('btnResetFilter')?.addEventListener('click', resetFilters);

  // Render lần đầu
  renderFlights();

  // Lắng nghe sự kiện nạp xong SQLite/db.db để tự động cập nhật dữ liệu mới nhất
  window.addEventListener('vietjet-db-loaded', function () {
    renderFlights();
  });
});
