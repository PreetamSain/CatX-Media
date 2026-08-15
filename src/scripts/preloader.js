export function initPreloader() {
  const loader = document.querySelector('.boot-loader');
  const counter = document.querySelector('.boot-loader__counter');
  if (!loader || !counter) return;

  let current = 0;
  const target = 100;
  const duration = 1600; // 1.6s fast snappy luxury counter
  const startTime = performance.now();

  function update() {
    const now = performance.now();
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Ease out cubic
    current = Math.floor(progress * target);
    counter.textContent = `[${current.toString().padStart(2, '0')}%]`;

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      counter.textContent = '[100%]';
      setTimeout(() => {
        loader.classList.add('is-fading');
        document.body.classList.add('is-loaded');
        setTimeout(() => {
          loader.style.display = 'none';
        }, 900);
      }, 200);
    }
  }

  requestAnimationFrame(update);
}
