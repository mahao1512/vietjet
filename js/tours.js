/**
 * VIETJET TRAVEL & BOOKING PORTAL
 * FILE: js/tours.js (Logic Lọc và Hiển Thị Danh Sách Tour)
 */

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  const urlParams = new URLSearchParams(window.location.search);
  const paramAirline = urlParams.get('airline');

  if (paramAirline) {
    const radio = document.querySelector(`input[name="tourAirline"][value="${paramAirline}"]`);
    if (radio) radio.checked = true;
  }

  function getTourFilterState() {
    const sort = document.getElementById('tourSort').value;
    const airline = document.querySelector('input[name="tourAirline"]:checked')?.value || 'all';
    const time_slot = document.querySelector('input[name="tourTimeSlot"]:checked')?.value || 'all';

    return { sort, airline, time_slot };
  }

  function renderTours() {
    const container = document.getElementById('toursListContainer');
    const countEl = document.getElementById('toursCountNum');
    if (!container || !window.vietjetDB) return;

    const filters = getTourFilterState();
    const tours = window.vietjetDB.getTours(filters);

    if (countEl) countEl.textContent = tours.length;

    if (tours.length === 0) {
      container.innerHTML = `
        <div class="cart-empty-box" style="grid-column: 1 / -1; background:#fff; border-radius:12px; border:1px solid var(--border-light);">
          <div class="cart-empty-icon">🏝️</div>
          <h3>Không tìm thấy tour du lịch phù hợp</h3>
          <p style="color:var(--text-muted); margin: 8px 0 16px;">Vui lòng thử điều chỉnh lại bộ lọc để tìm kiếm các tour du lịch khác.</p>
          <button id="btnResetEmptyTour" class="btn btn-outline btn-sm">Đặt Lại Bộ Lọc</button>
        </div>
      `;
      document.getElementById('btnResetEmptyTour')?.addEventListener('click', resetTourFilters);
      return;
    }

    container.innerHTML = tours.map(tour => `
      <article class="tour-card">
        <div class="tour-thumb-wrapper">
          <img src="${tour.thumbnail}" alt="${tour.title}" class="tour-thumb" loading="lazy">
          <span class="badge badge-red tour-badge-top">Tour Trọn Gói</span>
          <span class="tour-duration-pill">⏳ ${tour.duration}</span>
        </div>

        <div class="tour-body">
          <div class="tour-agency">
            🏢 ${tour.agency_name} &bull; ✈️ <strong>${tour.airline_partner}</strong>
          </div>

          <h3 class="tour-title">
            <a href="tour-detail.html?id=${tour.id}">${tour.title}</a>
          </h3>

          <div style="font-size:0.83rem; color:var(--text-muted); margin-bottom:10px; display:flex; flex-direction:column; gap:4px;">
            <div>🛫 Giờ bay: <strong>${tour.depart_hour}</strong> (${tour.flight_duration}) - ${tour.aircraft_type}</div>
            <div>📍 Điểm xuất phát: <strong>${tour.from_city}</strong> ➔ Đến: <strong>${tour.destination}</strong></div>
          </div>

          <div style="font-size:0.8rem; color:#059669; margin-bottom:14px; background:#ecfdf5; padding:6px 10px; border-radius:6px;">
            ✓ ${tour.services_included.split(',').slice(0, 2).join(' &bull; ')}
          </div>

          <div class="tour-footer">
            <div class="tour-price-box">
              <span class="tour-price-label">Giá trọn gói từ:</span>
              <span class="tour-price-value">${window.formatCurrency(tour.price)}</span>
            </div>
            <a href="tour-detail.html?id=${tour.id}" class="btn btn-primary btn-sm">
              Chi Tiết Tour ➔
            </a>
          </div>
        </div>
      </article>
    `).join('');
  }

  function resetTourFilters() {
    document.getElementById('tourSort').value = 'price_asc';
    const allAirline = document.querySelector('input[name="tourAirline"][value="all"]');
    if (allAirline) allAirline.checked = true;

    const allTime = document.querySelector('input[name="tourTimeSlot"][value="all"]');
    if (allTime) allTime.checked = true;

    renderTours();
  }

  document.getElementById('tourSort')?.addEventListener('change', renderTours);
  document.querySelectorAll('input[name="tourAirline"]').forEach(r => r.addEventListener('change', renderTours));
  document.querySelectorAll('input[name="tourTimeSlot"]').forEach(r => r.addEventListener('change', renderTours));
  document.getElementById('btnResetTourFilter')?.addEventListener('click', resetTourFilters);

  // Render lần đầu
  renderTours();

  // Khi SQLite/db.db tải xong từ server, tự động render lại dữ liệu mới nhất
  window.addEventListener('vietjet-db-loaded', function () {
    renderTours();
  });
});
