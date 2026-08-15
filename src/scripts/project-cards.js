export function initProjectCards() {
  const projectItems = document.querySelectorAll('.projects__item');

  projectItems.forEach((item) => {
    const loops = item.querySelectorAll('.projects__item__loop');
    if (!loops || loops.length === 0) return;

    let currentIndex = 0;
    let intervalId = null;

    // Activate initial image
    loops[0].classList.add('is-active');

    function nextFrame() {
      loops[currentIndex].classList.remove('is-active');
      currentIndex = (currentIndex + 1) % loops.length;
      loops[currentIndex].classList.add('is-active');
    }

    // Fast cycling on hover (80ms per frame)
    item.addEventListener('mouseenter', () => {
      if (intervalId) clearInterval(intervalId);
      intervalId = setInterval(nextFrame, 80);
    });

    item.addEventListener('mouseleave', () => {
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }
      // Reset tilt
      item.style.transform = '';
    });

    // 3D Card Tilt on Mouse Move
    item.addEventListener('mousemove', (e) => {
      const rect = item.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -10;
      const rotateY = ((x - centerX) / centerX) * 10;

      item.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.02)`;
    });

    // Touch support for mobile devices
    item.addEventListener('touchstart', () => {
      if (!intervalId) {
        intervalId = setInterval(nextFrame, 100);
      } else {
        clearInterval(intervalId);
        intervalId = null;
      }
    }, { passive: true });
  });
}
