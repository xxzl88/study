// 轮播逻辑
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.natural-image');
    const dots = document.querySelectorAll('.dot');
    let currentIndex = 0;
    let interval;
  
    function showImage(index) {
      images.forEach(img => img.classList.remove('active'));
      dots.forEach(dot => dot.classList.remove('active'));
      
      images[index].classList.add('active');
      dots[index].classList.add('active');
      currentIndex = index;
    }
  
    function nextImage() {
      const nextIndex = (currentIndex + 1) % images.length;
      showImage(nextIndex);
    }
  
    // 自动轮播
    function startCarousel() {
      interval = setInterval(nextImage, 4000); // 5秒切换
    }
  
    // 点击指示器切换
    dots.forEach(dot => {
      dot.addEventListener('click', function() {
        clearInterval(interval);
        showImage(parseInt(this.dataset.index));
        startCarousel();
      });
    });
  
    // 初始化
    showImage(0);
    startCarousel();
  });