const container = document.querySelector(".product-box");
const templateProductDiv = container.querySelector(".product-div");
container.innerHTML = ""; // 清空原本的範本

fetch("http://127.0.0.1:5500/json/products.json", {
  method: "GET",
})
  .then(async (res) => {
    const response = await res.json();

    // 動態生成商品，每個分類只選取一個商品
    response.forEach((categoryItem) => {
      // 選取每個分類的第一個商品
      const item = categoryItem.product[0];

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

      // 將商品區塊添加到連結，連結添加到容器
      productLink.appendChild(productDiv);
      container.appendChild(productLink);
    });
  })
  .catch((err) => {
    console.log("JSON 資料載入失敗：", err);
  });
