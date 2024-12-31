const container = document.querySelector(".product-box");
const templateProductDiv = container.querySelector(".product-div");
templateProductDiv.style.display = "none"; // 隱藏範本

fetch("json/products.json") // 改成相對路徑
  .then((res) => {
    if (!res.ok) {
      throw new Error(`HTTP 錯誤！狀態：${res.status}`);
    }
    return res.json();
  })
  .then((categories) => {
    try {
      const selectedProducts = [
        categories[0].product[0],
        categories[1].product[0],
        categories[2].product[0],
      ];

      selectedProducts.forEach((item) => {
        const productDiv = templateProductDiv.cloneNode(true);
        productDiv.style.display = "flex";

        // 設置超連結
        const productLink = document.createElement("a");
        productLink.href = item.url; // 設置商品連結
        productLink.target = "_blank"; // 新分頁開啟
        productLink.style.textDecoration = "none"; // 去除下劃線
        productLink.style.color = "inherit"; // 繼承文字顏色

        // 添加圖片到超連結內
        const imgElement = productDiv.querySelector(".img");
        imgElement.src = item.image;
        imgElement.alt = item.name;
        productLink.appendChild(imgElement);

        // 添加標題、價格和描述
        productDiv.querySelector(".product-title").textContent = item.name;
        productDiv.querySelector(".product-price").textContent = `NT$ ${item.price}`;
        productDiv.querySelector(".product-description").innerHTML = item.description;

        // 包裹整個商品區塊
        productLink.appendChild(productDiv);
        container.appendChild(productLink);
      });
    } catch (error) {
      console.error("處理商品數據時發生錯誤：", error);
      container.innerHTML = '<p>無法載入商品資訊</p>';
    }
  })
  .catch((err) => {
    console.error("JSON 資料載入失敗：", err);
    container.innerHTML = '<p>無法載入商品資訊</p>';
  });
