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
