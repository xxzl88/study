// 通用模块加载函数
async function loadComponent(selector, filePath, callback) {
    try {
        const response = await fetch(filePath);
        if (!response.ok) throw new Error(`无法加载 ${filePath}`);
        const html = await response.text();
        document.querySelector(selector).innerHTML = html;
        if (callback) callback(); // 加载完成后执行回调
    } catch (err) {
        console.error(err);
    }
}

// 页面加载完毕后执行
window.addEventListener("DOMContentLoaded", () => {
    // 加载头部、导航、页脚
    loadComponent("#header", "/components/header.html");
    loadComponent("#nav", "/components/nav.html", () => {
        setActiveNav();      // 设置当前页面高亮
        initMenuToggle();    // 绑定菜单按钮点击事件
    });
    loadComponent("#footer", "/components/footer.html");
});

// 根据页面自动设置active状态
function setActiveNav() {
    const currentPage = document.body.dataset.page; // 从<body>获取当前页面标识
    const links = document.querySelectorAll(".nav-link");
    links.forEach(link => {
        if (link.dataset.page === currentPage) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });
}

// 初始化菜单按钮点击事件（小屏展开/收起）
function initMenuToggle() {
    const toggleBtn = document.querySelector('.menu-toggle');
    const navInner = document.querySelector('.nav-inner');

    if (!toggleBtn || !navInner) return;

    toggleBtn.addEventListener('click', () => {
        navInner.classList.toggle('show');
    });
}

// 可选：使用事件委托方式（如果导航可能后续更新，可替代 initMenuToggle）
/*
document.body.addEventListener('click', function(e) {
    if (e.target.classList.contains('menu-toggle')) {
        const navInner = document.querySelector('.nav-inner');
        if (navInner) navInner.classList.toggle('show');
    }
});
*/
