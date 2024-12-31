// 商品展示相關
const productContainer = document.querySelector(".product-container");
const productImage = productContainer.querySelector(".img");
const productTitle = productContainer.querySelector(".product-title");
const productPrice = productContainer.querySelector(".product-price");
const productDescription = productContainer.querySelector(".product-description");
let products;
let product;

// 數量控制相關
const qtyInput = document.querySelector('input[name="quantity"]');
const plusBtn = document.querySelector('.qtyplus');
const minusBtn = document.querySelector('.qtyminus');

// 載入商品資料
fetch("json/products.json")
  .then(response => response.json())
  .then(categories => {
    products = categories[1].product;
    products.forEach((item, index) => {
      item.id = index;
    });
    
    product = products[1];
    updateProductDisplay();
  })
  .catch(error => {
    console.error("載入商品資料失敗:", error);
  });

function updateProductDisplay() {
  productImage.src = product.image;
  productImage.alt = product.name;
  productTitle.textContent = product.name;
  productPrice.textContent = `NT$ ${product.price}`;
  productDescription.innerHTML = product.description;

  const addToCartButton = productContainer.querySelector(".add-to-cart");
  addToCartButton.addEventListener("click", addToCart);
}

// 數量控制
plusBtn.addEventListener('click', (e) => {
  e.preventDefault();
  let currentVal = parseInt(qtyInput.value);
  qtyInput.value = !isNaN(currentVal) ? currentVal + 1 : 1;
});

minusBtn.addEventListener('click', (e) => {
  e.preventDefault();
  let currentVal = parseInt(qtyInput.value);
  if (!isNaN(currentVal) && currentVal > 0) {
    qtyInput.value = currentVal - 1;
  }
});

// 購物車功能
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart() {
  const quantity = parseInt(qtyInput.value) || 1;
  const existingItem = cart.find(item => item.id === product.id);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ ...product, quantity });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  alert("商品已添加到購物車！");
}