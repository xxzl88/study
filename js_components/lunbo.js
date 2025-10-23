document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.carousel');
    const images = carousel.querySelectorAll('.carousel-image, .carousel a img');
    const dots = carousel.querySelectorAll('.dot');
    const prevBtn = carousel.querySelector('.prev');
    const nextBtn = carousel.querySelector('.next');

    let currentIndex = 0;
    let interval;
    const intervalTime = 5000; // 自动轮播间隔

    // 显示指定索引的图片
    function showImage(index) {
        images.forEach((img, i) => {
            img.classList.toggle('active', i === index);
        });
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        currentIndex = index;
    }

    function showPrevImage() {
        const index = (currentIndex - 1 + images.length) % images.length;
        showImage(index);
    }

    function showNextImage() {
        const index = (currentIndex + 1) % images.length;
        showImage(index);
    }

    function startCarousel() {
        clearInterval(interval);
        interval = setInterval(showNextImage, intervalTime);
    }

    // 按钮点击事件
    prevBtn.addEventListener('click', () => {
        showPrevImage();
        startCarousel();
    });
    nextBtn.addEventListener('click', () => {
        showNextImage();
        startCarousel();
    });

    // 圆点点击事件
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const index = parseInt(dot.dataset.index);
            showImage(index);
            startCarousel();
        });
    });

    // 触摸滑动
    let startX = 0;
    let isDragging = false;
    const swipeThreshold = 50;

    carousel.addEventListener('touchstart', e => {
        startX = e.touches[0].clientX;
        isDragging = true;
        clearInterval(interval);
    });

    carousel.addEventListener('touchmove', e => {
        if (!isDragging) return;
        e.preventDefault();
    });

    carousel.addEventListener('touchend', e => {
        if (!isDragging) return;
        const deltaX = e.changedTouches[0].clientX - startX;
        if (deltaX > swipeThreshold) showPrevImage();
        else if (deltaX < -swipeThreshold) showNextImage();
        isDragging = false;
        startCarousel();
    });

    // 初始化
    showImage(0);
    startCarousel();
});
