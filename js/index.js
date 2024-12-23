const container = document.querySelector(".product-box"); 
const templateProductDiv = container.querySelector(".product-div");
container.innerHTML = ""; // 清空原本的範本

fetch("http://127.0.0.1:5500/json/products.json", {
  method: "GET",
})
  .then(async (res) => {
    const response = await res.json();

    // 動態生成商品，包含 category 分類
    response.forEach((categoryItem) => {
      const categoryTitle = document.createElement("h2");
      categoryTitle.textContent = categoryItem.category;
      container.appendChild(categoryTitle);

      categoryItem.product.forEach((item) => { // 遍歷每個商品
        const productDiv = templateProductDiv.cloneNode(true);
        productDiv.style.display = "flex"; // 顯示範本
        productDiv.querySelector(".product-title").textContent = item.name; // 設置商品名稱
        productDiv.querySelector(".img").src = item.image; // 設置商品圖片
        productDiv.querySelector(".img").alt = item.name; // 設置圖片替代文字
        productDiv.querySelector(".product-price").textContent = `NT$ ${item.price}`; // 設置商品價格
        productDiv.querySelector(".product-description").innerHTML = item.description; // 設置商品描述

        container.appendChild(productDiv); // 將商品區塊加入頁面
      });
    });
  })
  .catch((err) => {
    console.log("JSON 資料載入失敗：", err);
  });
