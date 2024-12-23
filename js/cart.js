function renderCartItem(item, cartItemsContainer) {
    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";
    cartItem.dataset.itemId = item.id;
  
    cartItem.innerHTML = `
          <p>${item.name}</p>
          <div class="quantity">
              <button class="decrease">-</button>
              <input type="number" value="${item.quantity}" min="0" onchange="handleQuantityChange(${item.id}, this.value)">
              <button class="increase">+</button>
          </div>
          <p class="item-total">${item.price * item.quantity} 元</p>
          <div class="actions">
              <button class="remove">移除</button>
          </div>
      `;
      cartItem.querySelector(".decrease").addEventListener("click", () => updateQuantity(item.id, -1, cartItem));
      cartItem.querySelector(".increase").addEventListener("click", () => updateQuantity(item.id, 1, cartItem));
    cartItem.querySelector(".remove").addEventListener("click", () => removeItem(item.id));
  
  
    cartItemsContainer.appendChild(cartItem);
  }
  
  
  
  function renderCart() {
    const cartItemsContainer = document.getElementById("cart-items");
    cartItemsContainer.innerHTML = "";
  
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      cart.forEach(item => renderCartItem(item, cartItemsContainer));
      updateTotalPrice();
  
  }
  
  function updateQuantity(id, change, cartItem) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
      const item = cart.find(i => i.id === id);
      if (item) {
          item.quantity = Math.max(0, item.quantity + change);
  
          if (item.quantity === 0) {
              removeItem(id);
          } else {
              cartItem.querySelector(".item-total").textContent = item.price * item.quantity + " 元";
              cartItem.querySelector("input").value = item.quantity;
               updateTotalPrice();
  
  
          }
  
          localStorage.setItem('cart', JSON.stringify(cart));
  
      }
  }
  
  
   function handleQuantityChange(id, newValue) {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      const item = cart.find(i => i.id === id);
  
     if (item) {
       const quantity = parseInt(newValue, 10);
       if (isNaN(quantity) || quantity < 0) {
         alert("請輸入有效的數量");
         document.querySelector(`.cart-item[data-item-id="${id}"] input`).value = item.quantity;
         return;
       }
  
      item.quantity = quantity;
      const cartItem = document.querySelector(`.cart-item[data-item-id="${id}"]`);
       cartItem.querySelector(".item-total").textContent = item.price * item.quantity + " 元";
  
      updateTotalPrice();
      localStorage.setItem('cart', JSON.stringify(cart));
  
     }
   }
  
  
  function removeItem(id) {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      const index = cart.findIndex(i => i.id === id);
      if (index !== -1) {
          cart.splice(index, 1);
          const cartItemsContainer = document.getElementById("cart-items");
          const cartItemToRemove = cartItemsContainer.querySelector(`.cart-item[data-item-id="${id}"]`);
  
          if (cartItemToRemove) {
              cartItemsContainer.removeChild(cartItemToRemove);
          }
           localStorage.setItem('cart', JSON.stringify(cart));
          updateTotalPrice();
      }
  }
  
  
  
  function updateTotalPrice() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
      let total = 0;
      cart.forEach(item => {
        total += item.price * item.quantity;
      });
      document.getElementById("total-price").textContent = total;
  }
  
  function checkout() {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
  
      if (cart.length === 0) {
          alert("您的購物車是空的！");
      } else {
          alert("感謝您的購買！");
            localStorage.setItem('cart', JSON.stringify([]));
          renderCart();
      }
  }
  
  renderCart();