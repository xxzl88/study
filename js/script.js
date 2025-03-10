// script.js
document.addEventListener('DOMContentLoaded', () => {
    // 通用悬停效果函数
    const createHoverEffect = (element, enterCallback, leaveCallback) => {
        if (!element) return;

        const handleEnter = () => enterCallback(element);
        const handleLeave = () => leaveCallback(element);

        // 桌面端事件
        element.addEventListener('mouseenter', handleEnter);
        element.addEventListener('mouseleave', handleLeave);
    };
    updateCopyrightYear();

    // 卡片交互系统
    const initAnnouncements = () => {
        document.querySelectorAll('.announcement').forEach(card => {
            createHoverEffect(
                card,
                (el) => {
                    el.style.transform = 'translateY(-3px)';
                    el.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                },
                (el) => {
                    el.style.transform = 'none';
                    el.style.boxShadow = '0 2px 6px rgba(0,0,0,0.1)';
                }
            );
        });
    };
    initAnnouncements();

    // 窗口尺寸变化时重置状态
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (qrcode) qrcode.style.transform = 'scale(1)';
            document.querySelectorAll('.announcement').forEach(card => {
                card.style.transform = 'none';
            });
        }, 100);
    });
})