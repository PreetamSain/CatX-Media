export function initCursorEffects() {
  const cursor = document.createElement('div');
  cursor.className = 'cursor';
  document.body.appendChild(cursor);

  const labelContainer = document.querySelector('.project-label');

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let cursorX = mouseX;
  let cursorY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (labelContainer) {
      labelContainer.style.transform = `translate3d(${mouseX + 16}px, ${mouseY + 16}px, 0)`;
    }
  });

  function render() {
    cursorX += (mouseX - cursorX) * 0.18;
    cursorY += (mouseY - cursorY) * 0.18;
    cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%)`;
    requestAnimationFrame(render);
  }
  render();

  const interactives = document.querySelectorAll('a, button, .projects__item, .layout-switch__btn, u');
  interactives.forEach((el) => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('is-hovering');
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('is-hovering');
    });
  });
}
