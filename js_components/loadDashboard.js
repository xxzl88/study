async function loadDashboard() {
  try {
    const res = await fetch("news/news.json");
    const data = await res.json();

    // ---------- 公告动态 ----------
    if (data.ggxx && data.ggxx.length > 0) {
      const noticeList = data.ggxx
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 3);

      const noticeContainer = document.getElementById("notice-list");
      if (noticeContainer) {
        noticeContainer.innerHTML = noticeList.map(item => {
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

    // ---------- 资料动态 ----------
    if (data.xxzl && data.xxzl.length > 0) {
      const dataList = data.xxzl
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 3);

      const dataContainer = document.getElementById("data-list");
      if (dataContainer) {
        dataContainer.innerHTML = dataList.map(item => {
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
    console.error("加载主页数据失败:", err);
  }
}

document.addEventListener("DOMContentLoaded", loadDashboard);
