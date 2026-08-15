export function initDesignSpecimen() {
  const sizeSlider = document.querySelector('#specimen-size');
  const weightSlider = document.querySelector('#specimen-weight');
  const trackingSlider = document.querySelector('#specimen-tracking');
  const sampleText = document.querySelector('.specimen-sample-text');
  const sizeVal = document.querySelector('#specimen-size-val');
  const weightVal = document.querySelector('#specimen-weight-val');
  const trackingVal = document.querySelector('#specimen-tracking-val');
  const gridToggle = document.querySelector('#toggle-grid');
  const gridBox = document.querySelector('.logo-grid-box');
  const colorChips = document.querySelectorAll('.js-color-chip');

  if (sizeSlider && sampleText) {
    sizeSlider.addEventListener('input', (e) => {
      const val = e.target.value;
      sampleText.style.fontSize = val + 'px';
      if (sizeVal) sizeVal.textContent = val + 'px';
    });
  }

  if (weightSlider && sampleText) {
    weightSlider.addEventListener('input', (e) => {
      const val = e.target.value;
      sampleText.style.fontWeight = val;
      if (weightVal) weightVal.textContent = val;
    });
  }

  if (trackingSlider && sampleText) {
    trackingSlider.addEventListener('input', (e) => {
      const val = e.target.value;
      sampleText.style.letterSpacing = (val / 100) + 'em';
      if (trackingVal) trackingVal.textContent = (val / 100) + 'em';
    });
  }

  if (gridToggle && gridBox) {
    gridToggle.addEventListener('click', () => {
      gridBox.classList.toggle('show-grid');
      gridToggle.classList.toggle('is-active');
    });
  }

  // Copy Color Hex Code
  colorChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const hex = chip.getAttribute('data-hex');
      if (hex) {
        navigator.clipboard.writeText(hex);
        const span = chip.querySelector('span');
        if (span) {
          const original = span.textContent;
          span.textContent = 'COPIED!';
          setTimeout(() => {
            span.textContent = original;
          }, 1200);
        }
      }
    });
  });
}
