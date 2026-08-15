export function initPortfolioFilter() {
  const filterBtns = document.querySelectorAll('.js-filter-btn');
  const projectItems = document.querySelectorAll('.projects__item');
  const modal = document.querySelector('#case-study-modal');
  const modalClose = document.querySelector('#modal-close');
  const modalTitle = document.querySelector('#modal-title');
  const modalCategory = document.querySelector('#modal-category');
  const modalDesc = document.querySelector('#modal-desc');
  const modalColors = document.querySelector('#modal-colors');
  const modalGallery = document.querySelector('#modal-gallery');

  if (!projectItems.length) return;

  // Category Filtering Logic
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');

      const filter = btn.getAttribute('data-filter');

      projectItems.forEach(item => {
        const cat = item.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          item.style.display = 'flex';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 50);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.95)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // Project Details Dataset
  const projectDetails = {
    '0': {
      title: 'Aura Luxury Brand Architecture',
      category: 'Brand Identity & Visual Systems',
      desc: 'A comprehensive brand identity system created for a high-end luxury lifestyle house. Featuring bespoke typography, custom grid guidelines, and eco-friendly embossed packaging tokens.',
      colors: ['#8000FF', '#130A1E', '#F7F7FA', '#E2C044'],
      images: ['/images/collections/86af7f.webp', '/images/collections/5f5c0b.webp', '/images/collections/9aecd5.webp']
    },
    '1': {
      title: 'Nexus WebGL Digital Product',
      category: 'Digital Products & UI/UX',
      desc: 'High-performance interactive 3D WebGL product experience designed for next-gen fintech platforms. Engineered for 120fps fluid momentum and micro-interactions.',
      colors: ['#8000FF', '#0B0512', '#3B82F6', '#10B981'],
      images: ['/images/collections/31b44e.webp', '/images/collections/533811.webp', '/images/collections/8ec9b3.webp']
    },
    '2': {
      title: 'Kinetic 3D Motion Campaign',
      category: '3D Motion & CGI',
      desc: 'Commercial 3D motion graphics and CGI product rendering suite for global launches. Harnessing physically-based lighting, volumetric atmosphere, and fluid simulation.',
      colors: ['#8000FF', '#A346FF', '#18181B', '#EC4899'],
      images: ['/images/collections/7378a7.webp', '/images/collections/905aba.webp', '/images/collections/3d848e.webp']
    },
    '3': {
      title: 'Verve Editorial & Packaging',
      category: 'Campaigns & Packaging',
      desc: 'Sustainable packaging architecture and editorial publication design. Crafted with foil stamping specs, custom die-cut box geometry, and minimalist typography layout.',
      colors: ['#8000FF', '#09090C', '#D1D1D6', '#F59E0B'],
      images: ['/images/collections/63629e.webp', '/images/collections/b25ce2.webp', '/images/collections/667502.webp']
    }
  };

  // Case Study Modal Logic
  projectItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const index = item.getAttribute('data-index') || '0';
      const data = projectDetails[index] || projectDetails['0'];

      if (modalTitle) modalTitle.textContent = data.title;
      if (modalCategory) modalCategory.textContent = data.category;
      if (modalDesc) modalDesc.textContent = data.desc;

      // Color Palette Chips
      if (modalColors) {
        modalColors.innerHTML = data.colors.map(hex => '<div class="color-chip" style="background-color: ' + hex + ';" title="' + hex + '"><span>' + hex + '</span></div>').join('');
      }

      // Gallery Images
      if (modalGallery) {
        modalGallery.innerHTML = data.images.map(src => '<img src="' + src + '" alt="' + data.title + '" loading="lazy" class="modal-gallery-img" />').join('');
      }

      if (modal) {
        modal.classList.add('is-open');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  modalClose?.addEventListener('click', () => {
    if (modal) {
      modal.classList.remove('is-open');
      document.body.style.overflow = '';
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal?.classList.contains('is-open')) {
      modal.classList.remove('is-open');
      document.body.style.overflow = '';
    }
  });
}
