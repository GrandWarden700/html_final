// 商品頁面管理器
class ProductPageManager {
  constructor(categoryIndex = 1, productIndex = 2) {
      this.categoryIndex = categoryIndex;
      this.productIndex = productIndex;
      this.cart = this.getCart();
      
      // DOM 元素
      this.container = document.querySelector(".product-container");
      this.elements = {
          image: this.container.querySelector(".img"),
          title: this.container.querySelector(".product-title"),
          price: this.container.querySelector(".product-price"),
          description: this.container.querySelector(".product-description"),
          qtyInput: document.querySelector('input[name="quantity"]'),
          plusBtn: document.querySelector('.qtyplus'),
          minusBtn: document.querySelector('.qtyminus'),
          addToCartBtn: this.container.querySelector(".add-to-cart")
      };

      this.init();
  }

  // 初始化
  async init() {
      try {
          await this.loadProducts();
          this.setupEventListeners();
          this.updateProductDisplay();
      } catch (error) {
          console.error("初始化失敗:", error);
          this.showError("商品載入失敗，請重新整理頁面。");
      }
  }

  // 載入商品數據
  async loadProducts() {
      try {
          const response = await fetch("json/products.json");
          const categories = await response.json();
          
          if (!categories[this.categoryIndex]) {
              throw new Error("找不到指定的商品類別");
          }

          this.products = categories[this.categoryIndex].product;
          this.products.forEach((item, index) => {
              item.id = `${this.categoryIndex}-${index}`; // 使用類別和索引組合作為唯一ID
          });
          
          this.product = this.products[this.productIndex];
          
          if (!this.product) {
              throw new Error("找不到指定的商品");
          }
      } catch (error) {
          console.error("載入商品資料失敗:", error);
          throw error;
      }
  }

  // 設置事件監聽器
  setupEventListeners() {
      // 數量控制
      this.elements.plusBtn.addEventListener('click', (e) => {
          e.preventDefault();
          this.updateQuantity(1);
      });

      this.elements.minusBtn.addEventListener('click', (e) => {
          e.preventDefault();
          this.updateQuantity(-1);
      });

      // 數量輸入驗證
      this.elements.qtyInput.addEventListener('change', (e) => {
          let value = parseInt(e.target.value);
          if (isNaN(value) || value < 1) {
              value = 1;
          }
          this.elements.qtyInput.value = value;
      });

      // 加入購物車
      this.elements.addToCartBtn.addEventListener('click', () => this.addToCart());
  }

  // 更新商品顯示
  updateProductDisplay() {
      if (!this.product) return;

      this.elements.image.src = this.product.image;
      this.elements.image.alt = this.product.name;
      this.elements.title.textContent = this.product.name;
      this.elements.price.textContent = `NT$ ${this.product.price}`;
      this.elements.description.innerHTML = this.product.description;
  }

  // 更新數量
  updateQuantity(change) {
      let currentVal = parseInt(this.elements.qtyInput.value) || 0;
      let newVal = currentVal + change;
      
      if (newVal < 1) newVal = 1;
      this.elements.qtyInput.value = newVal;
  }

  // 獲取購物車
  getCart() {
      try {
          return JSON.parse(localStorage.getItem('cart')) || [];
      } catch (error) {
          console.error("讀取購物車失敗:", error);
          return [];
      }
  }

  // 儲存購物車
  saveCart() {
      try {
          localStorage.setItem('cart', JSON.stringify(this.cart));
      } catch (error) {
          console.error("儲存購物車失敗:", error);
          this.showError("購物車儲存失敗，請稍後再試。");
      }
  }

  // 新增到購物車
  addToCart() {
      const quantity = parseInt(this.elements.qtyInput.value) || 1;
      const existingItem = this.cart.find(item => item.id === this.product.id);

      try {
          if (existingItem) {
              existingItem.quantity += quantity;
          } else {
              this.cart.push({ ...this.product, quantity });
          }

          this.saveCart();
          this.showSuccess("商品已新增到購物車！");
      } catch (error) {
          console.error("新增商品到購物車失敗:", error);
          this.showError("新增商品失敗，請稍後再試。");
      }
  }

  // 顯示錯誤訊息
  showError(message) {
      alert(message); // 可以改為更好的 UI 提示
  }

  // 顯示成功訊息
  showSuccess(message) {
      alert(message); // 可以改為更好的 UI 提示
  }
}

// 使用方法：根據不同頁面初始化不同的商品類別
// 在每個商品頁面的腳本中使用：
const productPage = new ProductPageManager(/* categoryIndex, productIndex */);