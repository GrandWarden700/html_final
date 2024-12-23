const container = document.querySelector(".product-box"); 
const templateProductDiv = container.querySelector(".product-div");
container.innerHTML = ""; // 清空原本的範本

fetch("http://127.0.0.1:5500/json/products.json", {
  method: "GET",
})
  .then(async (res) => {
    const response = await res.json();
    console.log(response, 66);

    // 動態生成商品，包含 category 分類
    response.forEach((categoryItem) => {
      // 創建分類標題
      const categoryTitle = document.createElement("h2");
      categoryTitle.textContent = categoryItem.category;
      container.appendChild(categoryTitle);

      // 生成該分類下的商品
      categoryItem.product.forEach((item) => { // 修改此處
        const productDiv = templateProductDiv.cloneNode(true);
        productDiv.style.display = "flex"; // 顯示隱藏的商品範本
        productDiv.querySelector(".product-title").textContent = item.name;
        productDiv.querySelector(".img").src = item.image; // 圖片路徑
        productDiv.querySelector(".img").alt = item.name; // 圖片替代文字
        productDiv.querySelector(
          ".product-price"
        ).textContent = `NT$ ${item.price}`;
        productDiv.querySelector(".product-description").innerHTML =
          item.description; // 確保描述支持 HTML 格式

        // 添加商品到分類標題下
        container.appendChild(productDiv);
      });
    });
  })
  .catch((err) => {
    console.log("JSON 資料載入失敗：", err);
  });

