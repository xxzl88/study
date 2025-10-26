async function renderCategory(category, filePath) {
  try {
    const res = await fetch(filePath);
    const list = await res.json();

    const container = document.getElementById(`${category}-list`);
    if (!container) return;

    // 按日期排序
    const sortedList = list.sort((a, b) => new Date(b.date) - new Date(a.date));

    container.innerHTML = sortedList
      .map(item => {
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
      })
      .join("");

  } catch (err) {
    console.error(`加载分类 ${category} 失败:`, err);
  }
}

// ✅ 页面加载时依次渲染不同分类
renderCategory("zxyw", "news/zxyw.json");
renderCategory("ggxx", "news/ggxx.json");
renderCategory("xxzl", "news/xxzl.json");

// 如果以后还要新增：
// renderCategory("tzgg", "news/tzgg.json");
