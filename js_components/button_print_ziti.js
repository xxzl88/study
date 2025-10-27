(function () {
  // 配置：可根据需要调整
  const SELECTORS = ['.article-content', '.fangsong-text', '.heiti-text', '.kaiti-text'];
  const STEP = 0.1;       // 每次调整的比例步长（10%）
  const MIN_SCALE = 0.8;   // 最小缩放比例
  const MAX_SCALE = 1.2;   // 最大缩放比例

  // 目标按钮 id（与您的 HTML 保持一致）
  const ID_LARGER = 'font-larger';
  const ID_SMALLER = 'font-smaller';
  const ID_PRINT = 'print-page';

  // 收集目标元素（优先按提供的类）
  let targets = [];
  SELECTORS.forEach(s => {
    document.querySelectorAll(s).forEach(el => targets.push(el));
  });

  // 如果没有找到任何目标元素，回退到 body（最保守）
  if (targets.length === 0) {
    targets = [document.body];
  }

  // 初始化：为每个目标缓存基准字体（px），以及子标题基准
  function initBaseSizes() {
    targets.forEach(el => {
      const cs = getComputedStyle(el);
      if (!el.dataset.baseFontsize) {
        const base = parseFloat(cs.fontSize) || 16;
        el.dataset.baseFontsize = base; // px
      }
      // 缓存直接子标题/h1/h2 的基准（仅当前元素内部）
      ['h1','h2','h3','h4','p','li'].forEach(tag => {
        el.querySelectorAll(tag).forEach(child => {
          if (!child.dataset.baseFontsize) {
            const cfs = getComputedStyle(child);
            child.dataset.baseFontsize = parseFloat(cfs.fontSize) || null;
          }
        });
      });
    });
  }

  // 应用当前 scale 到所有目标及其缓存的子元素
  function applyScale(scale) {
    targets.forEach(el => {
      const base = parseFloat(el.dataset.baseFontsize) || parseFloat(getComputedStyle(el).fontSize) || 16;
      el.style.fontSize = (base * scale) + 'px';
      // 调整内部直接定义为 px 的子元素（如果存在缓存）
      ['h1','h2','h3','h4','p','li'].forEach(tag => {
        el.querySelectorAll(tag).forEach(child => {
          const childBase = child.dataset.baseFontsize ? parseFloat(child.dataset.baseFontsize) : null;
          if (childBase) {
            child.style.fontSize = (childBase * scale) + 'px';
          }
        });
      });
    });
  }

  // 改变比例（delta 可以为正/负）
  function changeScale(delta) {
    scale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, +(scale + delta).toFixed(3)));
    applyScale(scale);
  }

  // 初始化并应用一次（页面加载或刷新时）
  let scale = 1;  // 初始比例为 1
  initBaseSizes();
  applyScale(scale);

  // 事件绑定（安全检测元素存在）
  function safeBind(id, fn) {
    const el = document.getElementById(id);
    if (el) el.addEventListener('click', fn);
  }

  // 绑定按钮
  safeBind(ID_LARGER, () => changeScale(STEP));
  safeBind(ID_SMALLER, () => changeScale(-STEP));
  safeBind(ID_PRINT, () => window.print());

  // 可选：支持键盘快捷键（+/- 和 p），若不需要可注释掉
  (function bindShortcuts(){
    window.addEventListener('keydown', (e) => {
      // 忽略当 focus 在输入框或可编辑区域时
      const tag = document.activeElement && document.activeElement.tagName;
      const editing = tag === 'INPUT' || tag === 'TEXTAREA' || document.activeElement.isContentEditable;
      if (editing) return;
      if ((e.key === '+' || (e.key === '=' && e.shiftKey))) { // Shift+= is '+'
        e.preventDefault();
        changeScale(STEP);
      } else if (e.key === '-' || e.key === '_') {
        e.preventDefault();
        changeScale(-STEP);
      } else if (e.key === 'p' && (e.ctrlKey || e.metaKey)) {
        // Ctrl/Cmd + P：触发打印（浏览器通常也会拦截）
        // 不阻止默认，调用打印以便一致性
        // window.print();
      }
    });
  })();
})();
