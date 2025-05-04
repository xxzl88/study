document.addEventListener('DOMContentLoaded', function() {
  const carousel = document.querySelector('.carousel');
  const images = document.querySelectorAll('.natural-image');
  const dots = document.querySelectorAll('.dot');
  let currentIndex = 0;
  let interval;
  let startX = 0;
  let isDragging = false;
  const swipeThreshold = 50; // 滑动阈值

  // 滑动处理函数
  function handleSwipe(endX) {
      if (!isDragging) return;
      
      const deltaX = endX - startX;
      if (Math.abs(deltaX) > swipeThreshold) {
          if (deltaX > 0) {
              showPrevImage();
          } else {
              showNextImage();
          }
      }
      isDragging = false;
  }

  // 触摸事件
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
      handleSwipe(e.changedTouches[0].clientX);
      startCarousel();
  });

  // 鼠标事件
  carousel.addEventListener('mousedown', e => {
      startX = e.clientX;
      isDragging = true;
      clearInterval(interval);
      e.preventDefault();
  });

  carousel.addEventListener('mousemove', e => {
      if (!isDragging) return;
      e.preventDefault();
  });

  carousel.addEventListener('mouseup', e => {
      handleSwipe(e.clientX);
      startCarousel();
  });

  // 导航按钮事件
  document.querySelector('.prev').addEventListener('click', () => {
      clearInterval(interval);
      showPrevImage();
      startCarousel();
  });

  document.querySelector('.next').addEventListener('click', () => {
      clearInterval(interval);
      showNextImage();
      startCarousel();
  });

  // 图片切换逻辑（优化过渡动画）
  function showImage(index) {
      images[currentIndex].classList.remove('active');
      dots[currentIndex].classList.remove('active');
      
      // 添加方向性过渡
      const direction = index > currentIndex ? 'next' : 'prev';
      images[index].classList.add(direction);
      
      setTimeout(() => {
          images[index].classList.add('active');
          images[index].classList.remove('next', 'prev');
          images[currentIndex].classList.remove('prev', 'next');
      }, 10);

      dots[index].classList.add('active');
      currentIndex = index;
  }

  function showNextImage() {
      const nextIndex = (currentIndex + 1) % images.length;
      showImage(nextIndex);
  }

  function showPrevImage() {
      const prevIndex = (currentIndex - 1 + images.length) % images.length;
      showImage(prevIndex);
  }

  // 自动轮播逻辑（优化交互）
  function startCarousel() {
      clearInterval(interval);
      interval = setInterval(() => {
          showNextImage();
      }, 5000);
  }

  // 初始化
  showImage(0);
  startCarousel();
});


    // 获取所有的圆点和图片
    const dots = document.querySelectorAll('.carousel-dots .dot');
    const images = document.querySelectorAll('.carousel img');

    // 为每个圆点添加点击事件
    dots.forEach(dot => {
        dot.addEventListener('click', function() {
            const index = dot.getAttribute('data-index'); // 获取点击圆点的索引
            
            // 移除所有图片的active类
            images.forEach(img => img.classList.remove('active'));
            // 为点击的图片添加active类
            images[index].classList.add('active');
            
            // 移除所有圆点的active类
            dots.forEach(d => d.classList.remove('active'));
            // 为点击的圆点添加active类
            dot.classList.add('active');
        });
    });
