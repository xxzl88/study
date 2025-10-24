
document.addEventListener("DOMContentLoaded", () => {
    const articleTitle = document.querySelector(".article-title");
    if (articleTitle) {
        document.title = articleTitle.textContent.trim() + " - 我的分享小站";
    }
});