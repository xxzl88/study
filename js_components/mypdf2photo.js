// 读取 HTML 属性里的 PDF 路径
const container = document.getElementById("pdf-container");
const pdfPath = container.getAttribute("data-pdf"); // 可以是本地路径或网络 URL

// PDF.js Worker CDN
pdfjsLib.GlobalWorkerOptions.workerSrc =
    "../pdfjs/build/pdf.worker.min.js";

pdfjsLib.getDocument(pdfPath).promise.then(pdf => {
    console.log("总页数：", pdf.numPages);

    for (let i = 1; i <= pdf.numPages; i++) {
        pdf.getPage(i).then(page => {
            const scale = 1.3;
            const viewport = page.getViewport({ scale });

            const canvas = document.createElement("canvas");
            const context = canvas.getContext("2d");
            canvas.width = viewport.width;
            canvas.height = viewport.height;

            const wrapper = document.createElement("div");
            wrapper.className = "pdf-page";
            wrapper.appendChild(canvas);
            container.appendChild(wrapper);

            page.render({
                canvasContext: context,
                viewport: viewport
            });
        });
    }
}).catch(err => {
    container.innerHTML = "<p style='color:red;text-align:center;'>PDF 加载失败！</p>";
    console.error(err);
});
