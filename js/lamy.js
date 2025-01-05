const container = document.querySelector(".product-box");
const templateProductDiv = container.querySelector(".product-div");
container.innerHTML = ""; // 清空原本的範本

// 設定特定品牌名稱
const targetBrand = "lamy";

fetch("json/products.json", {
  method: "GET",
})
  .then(async (res) => {
    const response = await res.json();

    // 過濾特定品牌的商品
    const targetCategory = response.find(
      (categoryItem) => categoryItem.category === targetBrand
    );

    if (!targetCategory) {
      container.innerHTML = `<p>找不到品牌 ${targetBrand} 的商品。</p>`;
      return;
    }

    // 添加分類標題
    const categoryTitle = document.createElement("h2");
    categoryTitle.textContent = targetCategory.category;
    container.appendChild(categoryTitle);

    let currentRow = null; // 用來追蹤當前的 row
    let productCount = 0;  // 商品計數器

    // 生成每個商品
    targetCategory.product.forEach((item) => {
      if (productCount % 5 === 0) {
        // 每 5 個商品新建一個 row
        currentRow = document.createElement("div");
        currentRow.style.display = "flex";
        currentRow.style.gap = "10px"; // 商品間距
        currentRow.style.flexWrap = "nowrap"; // 確保一行最多 5 個
        container.appendChild(currentRow);
      }

      // 創建商品區塊
      const productDiv = templateProductDiv.cloneNode(true);
      productDiv.style.display = "flex";

      // 設置超連結
      const productLink = document.createElement("a");
      productLink.href = item.url; // 設置商品連結
      productLink.target = "_blank"; // 新分頁開啟
      productLink.style.textDecoration = "none";
      productLink.style.color = "inherit";

      // 填充商品內容
      productDiv.querySelector(".product-title").textContent = item.name;
      productDiv.querySelector(".img").src = item.image;
      productDiv.querySelector(".img").alt = item.name;
      productDiv.querySelector(".product-price").textContent = `NT$ ${item.price}`;

      // 隱藏描述（如果有）
      const description = productDiv.querySelector(".product-description");
      if (description) {
        description.style.display = "none";
      }

      // 將商品區塊添加到連結，連結添加到當前的 row
      productLink.appendChild(productDiv);
      currentRow.appendChild(productLink);

      productCount++; // 增加商品計數器
    });
  })
  .catch((err) => {
    console.log("JSON 資料載入失敗：", err);
    container.innerHTML = `<p>商品資料載入失敗，請稍後再試。</p>`;
  });
