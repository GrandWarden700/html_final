const container = document.querySelector(".product-box");
const templateProductDiv = container.querySelector(".product-div");
templateProductDiv.style.display = "none"; // 隱藏範本

fetch("json/products.json")  // 改成相對路徑
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
        // 創建外層連結元素
        const linkElement = document.createElement("a");
        linkElement.href = item.url;
        linkElement.target = "_blank";
        linkElement.style.textDecoration = "none";
        linkElement.style.color = "inherit";
        
        // 創建並設置商品div
        const productDiv = templateProductDiv.cloneNode(true);
        productDiv.style.display = "flex";

        // 設置商品內容
        const imgElement = productDiv.querySelector(".img");
        imgElement.src = item.image;
        imgElement.alt = item.name;
        
        productDiv.querySelector(".product-title").textContent = item.name;
        productDiv.querySelector(".product-price").textContent = `NT$ ${item.price}`;
        productDiv.querySelector(".product-description").innerHTML = item.description;

        // 將商品div放入連結元素中
        linkElement.appendChild(productDiv);
        // 將連結元素加入容器
        container.appendChild(linkElement);
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