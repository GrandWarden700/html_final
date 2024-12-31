let slideIndex = 0;
showSlides(slideIndex);

// 下一張或上一張圖片
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// 顯示指定的圖片
function currentSlide(n) {
  showSlides(slideIndex = n);
}

// 顯示對應的圖片
function showSlides(n) {
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  
  // 循環處理索引值
  if (n >= slides.length) slideIndex = 0;
  if (n < 0) slideIndex = slides.length - 1;

  // 隱藏所有圖片
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  // 移除所有圓點的 "active" 樣式
  for (let i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }

  // 顯示當前圖片並設定對應圓點為 "active"
  slides[slideIndex].style.display = "block";
  dots[slideIndex].className += " active";
}

// 自動切換圖片（可選）
setInterval(() => {
  plusSlides(1); // 每 5 秒切換到下一張圖片
}, 5000);
