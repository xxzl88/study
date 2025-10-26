async function loadDashboard() {
  const sections = [
    { id: "zxyw-list", file: "news/zxyw.json" },
    { id: "notice-list", file: "news/ggxx.json" },
    { id: "data-list", file: "news/xxzl.json" }

    // 后续可继续加 { id: "other-list", file: "news/tzgg.json" }
  ];

  for (const { id, file } of sections) {
    try {
      const res = await fetch(file);
      const list = await res.json();

      if (list && list.length > 0) {
        const sortedList = list.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 3);
        const container = document.getElementById(id);

        if (container) {
          container.innerHTML = sortedList.map(item => {
            const [year, month, day] = item.date.split("-");
            return `
              <li class="news-item">
                <a href="${item.url}" class="news-link" style="display:flex;align-items:center;">
                  <time style="display:flex;flex-direction:column;text-align:center;margin-right:8px;flex-shrink:0;">
                    <div style="color:#0099a6;font-weight:bold;font-size:1.1em;">${year}</div>
                    <div style="color:#555;font-size:0.85em;">${month}-${day}</div>
                  </time>
                  <span>${item.title}</span>
                </a>
              </li>
            `;
          }).join("");
        }
      }
    } catch (err) {
      console.error(`加载 ${file} 失败:`, err);
    }
  }
}

document.addEventListener("DOMContentLoaded", loadDashboard);
