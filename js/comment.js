document.addEventListener("DOMContentLoaded", function () {
    const commentInput = document.getElementById("comment-input");
    const sendButton = document.getElementById("send-button");
    const loginMessage = document.getElementById("login-message");

    // 檢查是否登入
    const loggedInUser = localStorage.getItem("loggedInUser");

    if (loggedInUser) {
        // 已登入，啟用留言功能
        commentInput.disabled = false;
        sendButton.disabled = false;
        loginMessage.style.display = "none";
    } else {
        // 未登入，停用留言功能
        commentInput.disabled = true;
        sendButton.disabled = true;
        loginMessage.style.display = "block";
    }

    // 留言送出事件
    sendButton.addEventListener("click", function () {
        const commentText = commentInput.value;
        const starRating = document.querySelectorAll(".star-icon.selected").length;

        if (commentText.trim() === "") {
            alert("請輸入留言內容！");
            return;
        }

        const commentsSection = document.getElementById("comments-section");
        const commentHTML = `
            <hr>
            <div class="center-css">
                <div class="set">
                    <img src="img/DefaultHeader.png" alt="">
                </div>
                <h3 class="name">${loggedInUser}</h3>
                <p class="date">${new Date().toLocaleDateString()}</p>
                <div class="star_s">
                    ${Array(starRating).fill('<img src="img/star.png" alt="">').join('')}
                    ${Array(5 - starRating).fill('<img src="img/emptyStar.png" alt="">').join('')}
                </div>
                <div class="cont">${commentText}</div><br>
            </div>
        `;
        commentsSection.insertAdjacentHTML("beforeend", commentHTML);

        // 清空留言框與評分
        commentInput.value = "";
        document.querySelectorAll(".star-icon").forEach(star => star.classList.remove("selected"));
    });

    // 星星評分事件
    document.querySelectorAll(".star-icon").forEach((star, index) => {
        star.addEventListener("click", function () {
            document.querySelectorAll(".star-icon").forEach(s => s.classList.remove("selected"));
            for (let i = 0; i <= index; i++) {
                document.querySelectorAll(".star-icon")[i].classList.add("selected");
            }
        });
    });
});