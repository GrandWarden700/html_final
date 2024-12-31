document.addEventListener("DOMContentLoaded", () => {
    const starRating = document.getElementById("star-rating");
    const stars = starRating.querySelectorAll(".star-icon");
    const commentInput = document.getElementById("comment-input");
    const sendButton = document.getElementById("send-button");
    const commentsSection = document.getElementById("comments-section");
    let selectedStars = 0;
  
    // Handle star rating selection
    stars.forEach((star, index) => {
      star.addEventListener("click", () => {
        selectedStars = index + 1;
        updateStarRating(selectedStars);
      });
    });
  
    function updateStarRating(rating) {
      stars.forEach((star, index) => {
        star.setAttribute(
          "icon",
          index < rating
            ? "material-symbols:star"
            : "material-symbols:star-outline"
        );
      });
    }
  
    // Handle comment submission
    sendButton.addEventListener("click", () => {
      const commentText = commentInput.value.trim();
      if (selectedStars === 0 || commentText === "") {
        alert("請填寫星級和評論內容！");
        return;
      }
  
      const currentDate = new Date().toISOString().split("T")[0];
      const newComment = `
        <div class="center-css">
          <div class="set">
            <img src="img/DefaultHeader.png" alt="">
          </div>
          <h3 class="name">客人</h3>
          <p class="date">${currentDate}</p>
          <div class="star_s">
            ${"<img src='img/star.png' alt=''>".repeat(selectedStars)}
            ${"<img src='img/emptyStar.png' alt=''>".repeat(5 - selectedStars)}
          </div>
          <div class="cont">${commentText}</div>
        </div>
        <hr>
      `;
  
      commentsSection.innerHTML += newComment;
      commentInput.value = "";
      updateStarRating(0);
      selectedStars = 0;
    });
  });
  