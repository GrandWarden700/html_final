// 選取商品展示區域
const productContainer = document.querySelector(".product-container");
const productImage = productContainer.querySelector(".img");
const productTitle = productContainer.querySelector(".product-title");
const productPrice = productContainer.querySelector(".product-price");
const productDescription = productContainer.querySelector(".product-description");
let products;
// 載入商品資料
fetch("http://127.0.0.1:5500/json/products.json")
  .then(response => response.json())
  .then(categories => { // 改成 categories
    // 選取第二個 category 的第一個商品
   products = categories[0].product; // 這裡明確表示從 categories 選取商品
  products.forEach((item, index)=>{
     item.id = index;
   });

  product = products[0];


    // 更新頁面中的商品資料
    productImage.src = product.image;
    productImage.alt = product.name;
    productTitle.textContent = product.name;
    productPrice.textContent = `NT$ ${product.price}`;
    productDescription.innerHTML = product.description;

    // Create Add to Cart Button
    const addToCartButton = document.createElement('button');
    addToCartButton.textContent = "加入購物車";
        addToCartButton.addEventListener('click', addToCart);
    // Append button to a suitable location, e.g., near the price
    document.querySelector('.product-container').appendChild(addToCartButton);
    })
  .catch(error => {
    console.error("載入商品資料失敗:", error);
  });


    let cart = JSON.parse(localStorage.getItem('cart')) || [];


    function addToCart() {
        const existingItem = cart.find(item => item.id === product.id);

        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          cart.push({ ...product, quantity: 1 }); // Add product to cart with quantity 1
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        alert("商品已添加到購物車！");
    }