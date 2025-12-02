const container = document.getElementById("pdf-container");
const pdfPath = container.getAttribute("data-pdf");

// 创建加载提示
const loading = document.createElement("div");
loading.id = "pdf-loading";
loading.innerHTML = `
  <div class="loading-spinner"></div>
  <p>PDF 加载中，请稍候...</p>
  <p>如果长时间没有响应，请刷新页面。</p>
`;
container.appendChild(loading);

// 用于暂存页面
const tempPages = [];

// PDF.js Worker
pdfjsLib.GlobalWorkerOptions.workerSrc = "../pdfjs/build/pdf.worker.min.js";

pdfjsLib.getDocument(pdfPath).promise.then(pdf => {
    console.log("总页数:", pdf.numPages);

    let finished = 0;  // 用于判断是否全部完成

    for (let i = 1; i <= pdf.numPages; i++) {
        pdf.getPage(i).then(page => {
            const scale = 2.5;
            const viewport = page.getViewport({ scale });

            const canvas = document.createElement("canvas");
            const context = canvas.getContext("2d");
            canvas.width = viewport.width;
            canvas.height = viewport.height;

            const wrapper = document.createElement("div");
            wrapper.className = "pdf-page";
            wrapper.appendChild(canvas);

            // 开始渲染
            page.render({
                canvasContext: context,
                viewport: viewport
            }).promise.then(() => {
                tempPages[i] = wrapper;  // 存入数组
                finished++;

                // 所有页面渲染完成
                if (finished === pdf.numPages) {
                    loading.remove();  // 移除 loading

                    // 一次性显示所有页
                    tempPages.forEach(p => container.appendChild(p));
                }
            });
        });
    }
}).catch(err => {
    loading.innerHTML = `<p style="color:red;text-align:center;">❌ PDF 加载失败！</p>`;
    console.error(err);
});
