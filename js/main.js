/**
 * VIETJET TRAVEL & BOOKING PORTAL
 * FILE: js/main.js (Global Navigation, Cart Badge, Toast, Utilities)
 */

(function () {
  'use strict';

  const CART_KEY = 'vietjet_cart';

  // ------------------------------------------------------------
  // QUẢN LÝ GIỎ HÀNG (LOCALSTORAGE)
  // ------------------------------------------------------------
  window.getCart = function () {
    try {
      return JSON.parse(localStorage.getItem(CART_KEY) || '[]');
    } catch (e) {
      console.error('Lỗi khi đọc giỏ hàng:', e);
      return [];
    }
  };

  window.saveCart = function (cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    window.updateCartBadge();
  };

  window.addToCart = function (item) {
    const cart = window.getCart();
    // Tạo mã định danh duy nhất cho item
    item.cartId = item.type + '_' + item.id + '_' + Date.now();
    if (!item.quantity) item.quantity = 1;

    cart.push(item);
    window.saveCart(cart);
    window.showToast('Đã thêm "' + item.title + '" vào giỏ hàng thành công!', 'success');
  };

  window.removeFromCart = function (cartId) {
    let cart = window.getCart();
    cart = cart.filter(item => item.cartId !== cartId);
    window.saveCart(cart);
    window.showToast('Đã xóa mục khỏi giỏ hàng.', 'error');
  };

  window.clearCart = function () {
    localStorage.removeItem(CART_KEY);
    window.updateCartBadge();
  };

  window.updateCartBadge = function () {
    const badges = document.querySelectorAll('.cart-badge');
    const cart = window.getCart();
    const count = cart.reduce((total, item) => total + (item.quantity || 1), 0);
    badges.forEach(badge => {
      badge.textContent = count;
      badge.style.display = count > 0 ? 'inline-flex' : 'inline-flex';
    });
  };

  // ------------------------------------------------------------
  // ĐỊNH DẠNG TIỀN TỆ (VND)
  // ------------------------------------------------------------
  window.formatCurrency = function (amount) {
    if (isNaN(amount)) return '0 ₫';
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  // ------------------------------------------------------------
  // TOAST NOTIFICATION
  // ------------------------------------------------------------
  window.showToast = function (message, type = 'success') {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    const icon = type === 'success' ? '✓' : '✕';
    toast.innerHTML = `
      <div class="toast-icon">${icon}</div>
      <div class="toast-message">${message}</div>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  };

  // ------------------------------------------------------------
  // KHỞI TẠO DOM
  // ------------------------------------------------------------
  document.addEventListener('DOMContentLoaded', function () {
    // 1. Cập nhật số đếm giỏ hàng
    window.updateCartBadge();

    // 2. Xử lý menu hamburger trên mobile
    const toggleBtn = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (toggleBtn && navLinks) {
      toggleBtn.addEventListener('click', function () {
        navLinks.classList.toggle('active');
        toggleBtn.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
      });
    }

    // 3. Highlight menu hiện tại
    const currentPath = window.location.pathname.toLowerCase();
    const menuLinks = document.querySelectorAll('.nav-link');
    menuLinks.forEach(link => {
      const href = link.getAttribute('href') ? link.getAttribute('href').toLowerCase() : '';
      if (currentPath.endsWith(href) || (href === 'index.html' && (currentPath.endsWith('/') || currentPath === ''))) {
        link.classList.add('active');
      }
    });
  });

})();
