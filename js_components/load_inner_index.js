async function renderList(category) {
  try {
    const res = await fetch("news/news.json");
    const allData = await res.json();

    if (!allData[category]) {
      console.warn(`未找到分类: ${category}`);
      return;
    }

    const list = allData[category].sort((a, b) => new Date(b.date) - new Date(a.date));
    const container = document.querySelector(".policy-list");
    if (!container) return;

    container.innerHTML = list.map(item => {
      const [year, month, day] = item.date.split("-");
      return `
          <article class="policy-card" onclick="window.location.href='${item.url}'">
          <div class="date-box">
            <div class="year">${year}</div>
            <div class="month-day">${month}-${day}</div>
          </div>
          <div class="policy-content">
            <h3>${item.title}</h3>
          </div>
        </article>
      `;
    }).join("");

  } catch (err) {
    console.error("加载数据失败:", err);
  }
}
