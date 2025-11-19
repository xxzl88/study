// 按行拆分
const lines = rawText.split('\n').filter(line => line.trim() !== '');
const contentContainer = document.getElementById('article-content');
lines.forEach(line => {
    let tag = 'p';
    let text = line.trim();
    if (text.startsWith('# ')) {
        tag = 'h1';
        text = text.slice(2).trim();
    } else if (text.startsWith('## ')) {
        tag = 'h2';
        text = text.slice(3).trim();
    }
    const element = document.createElement(tag);
    element.textContent = text;
    contentContainer.appendChild(element);
});
// 渲染到页面
document.getElementById("article-title").textContent = articleTitle;
document.getElementById("article-date").textContent = `发布时间：${articleDate}`;