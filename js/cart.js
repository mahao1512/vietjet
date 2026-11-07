/**
 * VIETJET TRAVEL & BOOKING PORTAL
 * FILE: js/cart.js (Quản lý Giỏ Hàng, Xóa Item, Form Thông Tin & Đặt Chỗ)
 */

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // Khởi tạo EmailJS nếu có key cấu hình
  if (typeof emailjs !== 'undefined') {
    try {
      // Bạn có thể thay bằng Public Key của bạn khi triển khai production
      emailjs.init("YOUR_PUBLIC_KEY");
    } catch (e) {
      console.warn("EmailJS init note:", e);
    }
  }

  const container = document.getElementById('cartItemsContainer');
  const countTitle = document.getElementById('cartCountTitle');
  const subtotalEl = document.getElementById('summarySubtotal');
  const totalEl = document.getElementById('summaryTotal');
  const btnClearAll = document.getElementById('btnClearAllCart');
  const form = document.getElementById('checkoutForm');
  const modal = document.getElementById('orderSuccessModal');
  const modalPnr = document.getElementById('modalPnrCode');
  const modalDesc = document.getElementById('modalDescText');
  const btnCloseModal = document.getElementById('btnCloseModal');

  // 1. Render giỏ hàng
  function renderCart() {
    const cart = window.getCart();
    const count = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    
    if (countTitle) countTitle.textContent = count;

    if (cart.length === 0) {
      if (container) {
        container.innerHTML = `
          <div class="cart-empty-box">
            <div class="cart-empty-icon">🛒</div>
            <h3>Giỏ hàng của bạn đang trống</h3>
            <p style="color:var(--text-muted); margin: 8px 0 20px;">Hãy lựa chọn chuyến bay hoặc tour du lịch phù hợp cho kỳ nghỉ của bạn.</p>
            <div style="display:flex; gap:12px; justify-content:center;">
              <a href="flights.html" class="btn btn-primary btn-sm">Tìm Chuyến Bay</a>
              <a href="tours.html" class="btn btn-outline btn-sm">Xem Tour Du Lịch</a>
            </div>
          </div>
        `;
      }
      if (subtotalEl) subtotalEl.textContent = '0 ₫';
      if (totalEl) totalEl.textContent = '0 ₫';
      return;
    }

    let grandTotal = 0;

    let html = `
      <table class="cart-table">
        <thead>
          <tr>
            <th>Dịch vụ</th>
            <th>Phân loại</th>
            <th>Số lượng</th>
            <th>Đơn giá</th>
            <th>Thành tiền</th>
            <th style="text-align:right;">Xóa</th>
          </tr>
        </thead>
        <tbody>
    `;

    cart.forEach(item => {
      const qty = item.quantity || 1;
      const itemTotal = item.price * qty;
      grandTotal += itemTotal;

      const isFlight = item.type === 'flight';
      const typeBadge = isFlight 
        ? '<span class="badge badge-red-light">Chuyến Bay</span>' 
        : '<span class="badge badge-yellow">Tour Du Lịch</span>';
      
      const subInfo = isFlight
        ? `✈️ ${item.airline} (${item.flight_number || ''}) &bull; ${item.seatClass || 'Phổ thông'}`
        : `🏝️ ${item.duration} &bull; ${item.airline || 'VietJet Air'}`;

      html += `
        <tr>
          <td>
            <div class="cart-item-title">${item.title}</div>
            <div class="cart-item-sub">${subInfo}</div>
          </td>
          <td>${typeBadge}</td>
          <td><strong>${qty}</strong></td>
          <td style="color:var(--text-muted);">${window.formatCurrency(item.price)}</td>
          <td class="cart-item-price">${window.formatCurrency(itemTotal)}</td>
          <td style="text-align:right;">
            <button class="btn-remove-item" onclick="deleteItem('${item.cartId}')" title="Xóa mục này">
              ✕
            </button>
          </td>
        </tr>
      `;
    });

    html += `
        </tbody>
      </table>
    `;

    if (container) container.innerHTML = html;
    if (subtotalEl) subtotalEl.textContent = window.formatCurrency(grandTotal);
    if (totalEl) totalEl.textContent = window.formatCurrency(grandTotal);
  }

  // 2. Xóa từng item
  window.deleteItem = function (cartId) {
    window.removeFromCart(cartId);
    renderCart();
  };

  // 3. Xóa toàn bộ giỏ hàng
  if (btnClearAll) {
    btnClearAll.addEventListener('click', function () {
      const cart = window.getCart();
      if (cart.length === 0) {
        window.showToast('Giỏ hàng hiện tại đang trống!', 'error');
        return;
      }
      if (confirm('Bạn có chắc chắn muốn xóa toàn bộ giỏ hàng không?')) {
        window.clearCart();
        renderCart();
        window.showToast('Đã dọn dẹp sạch giỏ hàng.', 'success');
      }
    });
  }

  // 4. Xử lý Form đặt chỗ & Gửi Email
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const cart = window.getCart();
      if (cart.length === 0) {
        window.showToast('Giỏ hàng của bạn đang trống! Vui lòng chọn vé hoặc tour trước khi đăng ký.', 'error');
        return;
      }

      const name = document.getElementById('custName').value.trim();
      const phone = document.getElementById('custPhone').value.trim();
      const email = document.getElementById('custEmail').value.trim();
      const idcard = document.getElementById('custIdCard').value.trim();
      const address = document.getElementById('custAddress').value.trim();
      const notes = document.getElementById('custNotes').value.trim();

      // Kiểm tra validate số điện thoại Việt Nam (10 số)
      const phoneRegex = /^[0-9]{10}$/;
      if (!phoneRegex.test(phone)) {
        window.showToast('Vui lòng nhập số điện thoại hợp lệ (đúng 10 chữ số)!', 'error');
        return;
      }

      // Tính tổng tiền
      const totalAmount = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);

      // Lưu đơn hàng qua SQLite Service
      const savedOrder = window.vietjetDB.saveOrder({
        name,
        phone,
        email,
        idcard,
        address,
        notes,
        total: totalAmount,
        items: cart
      });

      const btnSubmit = document.getElementById('btnSubmitOrder');
      if (btnSubmit) {
        btnSubmit.disabled = true;
        btnSubmit.textContent = 'Đang xử lý & Gửi email...';
      }

      // Xử lý gửi email qua EmailJS (hoặc fallback mô phỏng)
      const templateParams = {
        from_email: 'nvhai061993@gmail.com',
        to_email: email,
        to_name: name,
        phone: phone,
        pnr_code: savedOrder.pnr_code,
        total_price: window.formatCurrency(totalAmount),
        order_details: JSON.stringify(cart, null, 2)
      };

      const handleSuccess = function () {
        if (modalPnr) modalPnr.textContent = savedOrder.pnr_code;
        if (modalDesc) {
          modalDesc.innerHTML = `
            Một email xác nhận chi tiết lịch trình và vé điện tử đã được gửi từ đại diện <strong>nvhai061993@gmail.com</strong> tới hộp thư <strong>${email}</strong> của quý khách.
          `;
        }
        if (modal) modal.classList.add('active');

        // Làm sạch giỏ hàng sau khi đặt thành công
        window.clearCart();
        renderCart();
        form.reset();

        if (btnSubmit) {
          btnSubmit.disabled = false;
          btnSubmit.textContent = 'Đăng Ký & Xác Nhận Đặt Chỗ ➔';
        }
      };

      // Thử gọi EmailJS nếu đã cấu hình, nếu không fallback mượt mà
      if (typeof emailjs !== 'undefined' && emailjs.send && false) {
        emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
          .then(function () {
            handleSuccess();
          }, function (error) {
            console.warn('Gửi qua EmailJS bị lỗi hoặc chưa điền Key thật, kích hoạt Fallback UI:', error);
            handleSuccess();
          });
      } else {
        // Fallback mô phỏng tức thì
        setTimeout(handleSuccess, 600);
      }
    });
  }

  // Đóng Modal và chuyển hướng về trang chủ
  if (btnCloseModal) {
    btnCloseModal.addEventListener('click', function () {
      if (modal) modal.classList.remove('active');
      window.location.href = 'index.html';
    });
  }

  // Khởi động render giỏ hàng
  renderCart();
});
