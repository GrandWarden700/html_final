class ShoppingCartManager {
  constructor() {
      // DOM 元素
      this.elements = {
          cartItems: document.getElementById("cart-items"),
          totalPrice: document.getElementById("total-price"),
          loginMessage: document.getElementById("login-message"),
          checkoutButton: document.getElementById("checkout-button")
      };

      // 初始化購物車數據
      this.cart = this.getCart();

      this.init();
  }

  init() {
      try {
          this.updateLoginState();
          this.renderCart();
          this.setupEventListeners();
      } catch (error) {
          console.error("購物車初始化失敗:", error);
          this.showError("購物車載入失敗，請重新整理頁面。");
      }
  }

  setupEventListeners() {
      // 結帳按鈕事件
      if (this.elements.checkoutButton) {
          this.elements.checkoutButton.addEventListener('click', () => this.checkout());
      }

      // 使用事件委託處理購物車項目的事件
      if (this.elements.cartItems) {
          this.elements.cartItems.addEventListener('click', (e) => {
              const cartItem = e.target.closest('.cart-item');
              if (!cartItem) return;

              const itemId = cartItem.dataset.itemId;

              if (e.target.classList.contains('decrease')) {
                  this.updateQuantity(itemId, -1);
              } else if (e.target.classList.contains('increase')) {
                  this.updateQuantity(itemId, 1);
              } else if (e.target.classList.contains('remove')) {
                  this.removeItem(itemId);
              }
          });

          // 處理數量輸入
          this.elements.cartItems.addEventListener('change', (e) => {
              if (e.target.type === 'number') {
                  const cartItem = e.target.closest('.cart-item');
                  if (cartItem) {
                      this.handleQuantityChange(cartItem.dataset.itemId, e.target.value);
                  }
              }
          });
      }
  }

  renderCartItem(item) {
      const cartItem = document.createElement("div");
      cartItem.className = "cart-item";
      cartItem.dataset.itemId = item.id;

      cartItem.innerHTML = `
          <div class="item-info">
              <p class="item-name">${this.escapeHtml(item.name)}</p>
          </div>
          <div class="quantity">
              <button class="decrease" aria-label="減少數量">-</button>
              <input type="number" 
                     value="${item.quantity}" 
                     min="1" 
                     aria-label="商品數量"
                     class="quantity-input">
              <button class="increase" aria-label="增加數量">+</button>
          </div>
          <p class="item-total">${this.formatPrice(item.price * item.quantity)}</p>
          <div class="actions">
              <button class="remove" aria-label="移除商品">
                  <span class="remove-text">移除</span>
              </button>
          </div>
      `;

      return cartItem;
  }

  renderCart() {
      if (!this.elements.cartItems) return;

      this.elements.cartItems.innerHTML = '';

      if (this.cart.length === 0) {
          this.elements.cartItems.innerHTML = '<div class="empty-cart">購物車是空的</div>';
          return;
      }

      this.cart.forEach(item => {
          this.elements.cartItems.appendChild(this.renderCartItem(item));
      });

      this.updateTotalPrice();
  }

  updateQuantity(id, change) {
      const item = this.cart.find(i => i.id === id);
      if (!item) return;

      const newQuantity = Math.max(1, item.quantity + change);
      item.quantity = newQuantity;

      this.updateCartItemDisplay(id);
      this.saveCart();
  }

  handleQuantityChange(id, newValue) {
      const quantity = parseInt(newValue, 10);
      if (isNaN(quantity) || quantity < 1) {
          this.showError("請輸入有效的數量");
          this.updateCartItemDisplay(id);
          return;
      }

      const item = this.cart.find(i => i.id === id);
      if (item) {
          item.quantity = quantity;
          this.updateCartItemDisplay(id);
          this.saveCart();
      }
  }

  updateCartItemDisplay(id) {
      const item = this.cart.find(i => i.id === id);
      if (!item) return;

      const cartItem = this.elements.cartItems.querySelector(`[data-item-id="${id}"]`);
      if (!cartItem) return;

      cartItem.querySelector('.quantity-input').value = item.quantity;
      cartItem.querySelector('.item-total').textContent = this.formatPrice(item.price * item.quantity);

      this.updateTotalPrice();
  }

  removeItem(id) {
      const index = this.cart.findIndex(i => i.id === id);
      if (index === -1) return;

      this.cart.splice(index, 1);

      const cartItem = this.elements.cartItems.querySelector(`[data-item-id="${id}"]`);
      if (cartItem) {
          cartItem.remove();
      }

      this.saveCart();
      this.updateTotalPrice();

      if (this.cart.length === 0) {
          this.renderCart(); // 重新渲染以顯示空購物車訊息
      }
  }

  updateTotalPrice() {
      if (!this.elements.totalPrice) return;

      const total = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      this.elements.totalPrice.textContent = this.formatPrice(total);
  }

  getCart() {
      try {
          return JSON.parse(localStorage.getItem('cart')) || [];
      } catch (error) {
          console.error("讀取購物車失敗:", error);
          return [];
      }
  }

  saveCart() {
      try {
          localStorage.setItem('cart', JSON.stringify(this.cart));
      } catch (error) {
          console.error("儲存購物車失敗:", error);
          this.showError("購物車儲存失敗，請稍後再試。");
      }
  }

  updateLoginState() {
      const loggedInUser = localStorage.getItem("loggedInUser");

      if (this.elements.loginMessage) {
          this.elements.loginMessage.style.display = loggedInUser ? 'none' : 'block';
      }

      if (this.elements.checkoutButton) {
          this.elements.checkoutButton.disabled = !loggedInUser;
      }
  }

  checkout() {
      if (!localStorage.getItem("loggedInUser")) {
          this.showError("請先登入以使用購物車功能！");
          return;
      }

      if (this.cart.length === 0) {
          this.showError("您的購物車是空的！");
          return;
      }

      // 這裡可以新增實際的結帳邏輯
      this.showSuccess("感謝您的購買！");
      this.cart = [];
      this.saveCart();
      this.renderCart();
  }

  formatPrice(price) {
      return `NT$ ${price.toLocaleString()}`;
  }

  escapeHtml(text) {
      const div = document.createElement('div');
      div.textContent = text;
      return div.innerHTML;
  }

  showError(message) {
      alert(message); 
  }

  showSuccess(message) {
      alert(message); 
  }
}

// 初始化購物車
const cartManager = new ShoppingCartManager();
