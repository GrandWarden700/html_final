window.onload = function () {
const loggedInUser = localStorage.getItem("loggedInUser");
const userLinks = document.querySelector(".user-links");

if (loggedInUser) {
    // 建立歡迎訊息
    const welcomeMessage = document.createElement("span");
    welcomeMessage.textContent = `歡迎 ${loggedInUser}`;
    welcomeMessage.style.color = "#EAE0CC";
    welcomeMessage.style.fontWeight = "bold";

    // 建立登出按鈕
    const logoutButton = document.createElement("button");
    logoutButton.textContent = "登出";
    logoutButton.style.color = "#EAE0CC";
    logoutButton.style.fontWeight = "bold";
    logoutButton.style.backgroundColor = "#4D6A6D";
    logoutButton.style.cursor = "pointer";
    logoutButton.addEventListener("click", function () {
        // 清除 LocalStorage 的登入資料
        localStorage.removeItem("loggedInUser");
        // 重新導向到首頁
        window.location.href = "index.html";
    });

    // 添加歡迎訊息和登出按鈕到 user-links
    userLinks.prepend(welcomeMessage);
    userLinks.appendChild(logoutButton);
} ;
};