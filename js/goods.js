const container = document.querySelector(".product-box");
const templateProductDiv = container.querySelector(".product-div");
container.innerHTML = ""; // 清空原本的範本

fetch("json/products.json")
  .then(async (res) => {
    const response = await res.json();

    // 動態產生商品，包含 category 分類
    response.forEach((categoryItem) => {
      // 新增分類標題
      const categoryTitle = document.createElement("h2");
      categoryTitle.textContent = categoryItem.category;
      container.appendChild(categoryTitle);

      // 限制每個分類顯示最多三個商品
      const productCount = Math.min(categoryItem.product.length, 3);

      // 商品顯示排版
      const rowDiv = document.createElement("div");
      rowDiv.style.display = "flex";
      rowDiv.style.flexWrap = "wrap"; // 商品換行
      rowDiv.style.gap = "10px"; // 商品間距

      // 產生每個商品
      for (let i = 0; i < productCount; i++) {
        const item = categoryItem.product[i];

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

        // 將商品區塊添加到連結，連結添加到行
        productLink.appendChild(productDiv);
        rowDiv.appendChild(productLink);
      }

      // 把行加入容器
      container.appendChild(rowDiv);
    });
  })
  .catch((err) => {
    console.log("JSON 資料載入失敗：", err);
  });

