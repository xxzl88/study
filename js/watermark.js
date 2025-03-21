// js/watermark.js
class Watermark {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.container = document.getElementById('security-watermark');
    this.deviceRatio = window.devicePixelRatio || 1;
    
    // 配置参数
    this.config = {
      screenOpacity: 0.1,   // 屏幕显示透明度
      printOpacity: 0.15,     // 打印透明度
      fontSize: 16,          // 基准字号
      spacing: 350           // 水印间距
    };

    this.init();
  }

  init() {
    this.setupCanvas();
    this.bindEvents();
    this.draw();
    this.preventRemove();
    this.addPrintHandler();
  }

  setupCanvas() {
    this.canvas.style.cssText = `
      width: 100%;
      height: 100%;
      opacity: ${this.config.screenOpacity};
    `;
    this.container.appendChild(this.canvas);
    this.handleResize();
  }

  bindEvents() {
    // 节流处理窗口变化
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => this.handleResize(), 200);
    });

    // 每分钟更新时间
    setInterval(() => this.draw(), 60000);
  }

  handleResize() {
    const { width, height } = this.container.getBoundingClientRect();
    this.canvas.width = width * this.deviceRatio;
    this.canvas.height = height * this.deviceRatio;
    this.ctx.scale(this.deviceRatio, this.deviceRatio);
    this.draw();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // 水印内容
    const texts = [
      `QQ: 718123472`,
      new Date().toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      }).replace(/\//g, '-')
    ];

    // 样式设置
    this.ctx.font = `${this.config.fontSize}px "Helvetica Neue", sans-serif`;
    this.ctx.fillStyle = `rgba(0, 153, 166, 1)`; // 纯色填充
    this.ctx.textAlign = 'center';

    // 绘制模式
    this.drawPattern(texts);
  }

  drawPattern(texts) {
    const patternWidth = this.config.spacing;
    const patternHeight = this.config.spacing * 0.8;

    for (let x = -patternWidth; x < this.canvas.width; x += patternWidth) {
      for (let y = 0; y < this.canvas.height; y += patternHeight) {
        this.ctx.save();
        this.ctx.translate(x + patternWidth / 2, y);
        this.ctx.rotate(-30 * Math.PI / 180);
        texts.forEach((text, i) => {
          this.ctx.fillText(text, 0, i * (this.config.fontSize * 1.5));
        });
        this.ctx.restore();
      }
    }
  }

  addPrintHandler() {
    window.addEventListener('beforeprint', () => {
      // 创建打印专用水印
      const printWatermark = document.createElement('div');
      printWatermark.id = 'print-watermark';
      printWatermark.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 9999;
        pointer-events: none;
        opacity: ${this.config.printOpacity};
        background-image: url(${this.canvas.toDataURL()});
      `;
      document.body.appendChild(printWatermark);
    });

    window.addEventListener('afterprint', () => {
      document.getElementById('print-watermark')?.remove();
    });
  }

  preventRemove() {
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (!document.contains(this.container)) {
          document.body.appendChild(this.container);
          this.container.appendChild(this.canvas);
        }
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }
}

// 初始化
document.addEventListener('DOMContentLoaded', () => new Watermark());
