import * as THREE from 'three';

export function initWebGLStudio() {
  const container = document.querySelector('.studio-webgl-canvas');
  if (!container) return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 0, 8.2);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.2;
  
  container.innerHTML = '';
  container.appendChild(renderer.domElement);

  // Group for 3D Ring Orbit
  const ringGroup = new THREE.Group();
  scene.add(ringGroup);

  // Sample Project Textures for 3D Ring
  const textureLoader = new THREE.TextureLoader();
  const projectImages = [
    '/images/collections/86af7f.webp',
    '/images/collections/31b44e.webp',
    '/images/collections/7378a7.webp',
    '/images/collections/63629e.webp',
    '/images/collections/5f5c0b.webp',
    '/images/collections/533811.webp',
    '/images/collections/905aba.webp',
    '/images/collections/b25ce2.webp',
  ];

  const projectTitles = [
    'Brand Identity & Systems',
    'Digital Products & UI/UX',
    '3D Motion & CGI',
    'Creative Campaigns',
    'Visual Strategy & Tokens',
    'Interactive Platforms',
    'Art Direction & CGI',
    'Packaging & Merchandise'
  ];

  const cardMeshes = [];
  const radius = 4.3;
  const cardCount = projectImages.length;

  projectImages.forEach((imgSrc, i) => {
    const angle = (i / cardCount) * Math.PI * 2;
    const geometry = new THREE.PlaneGeometry(1.6, 2.1, 16, 16);
    
    const texture = textureLoader.load(imgSrc);
    const material = new THREE.MeshBasicMaterial({
      map: texture,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.94
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = Math.sin(angle) * radius;
    mesh.position.z = Math.cos(angle) * radius;
    mesh.position.y = Math.sin(angle * 2) * 0.18;
    mesh.rotation.y = angle + Math.PI;

    // Glowing purple border frame
    const wireGeo = new THREE.EdgesGeometry(geometry);
    const wireMat = new THREE.LineBasicMaterial({ color: 0x8000ff, linewidth: 1.5 });
    const wireframe = new THREE.LineSegments(wireGeo, wireMat);
    mesh.add(wireframe);

    mesh.userData = { id: i, title: projectTitles[i], baseAngle: angle };
    ringGroup.add(mesh);
    cardMeshes.push(mesh);
  });

  // Background Ambient Particles (Electric Purple + White)
  const particleGeo = new THREE.BufferGeometry();
  const pCount = 500;
  const pPositions = new Float32Array(pCount * 3);
  const pColors = new Float32Array(pCount * 3);

  for (let i = 0; i < pCount; i++) {
    pPositions[i * 3] = (Math.random() - 0.5) * 22;
    pPositions[i * 3 + 1] = (Math.random() - 0.5) * 16;
    pPositions[i * 3 + 2] = (Math.random() - 0.5) * 14 - 2;

    const isPurple = Math.random() > 0.45;
    pColors[i * 3] = isPurple ? 0.5 : 1.0;
    pColors[i * 3 + 1] = isPurple ? 0.0 : 1.0;
    pColors[i * 3 + 2] = isPurple ? 1.0 : 1.0;
  }

  particleGeo.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));
  particleGeo.setAttribute('color', new THREE.BufferAttribute(pColors, 3));

  const particleMat = new THREE.PointsMaterial({
    size: 0.035,
    vertexColors: true,
    transparent: true,
    opacity: 0.7,
    blending: THREE.AdditiveBlending
  });

  const particleMesh = new THREE.Points(particleGeo, particleMat);
  scene.add(particleMesh);

  // Mouse drag & rotation variables
  let isDragging = false;
  let prevMouseX = 0;
  let targetRotationY = 0;
  let targetRotationX = 0;
  
  // Golden standard luxury rotation speed: ~28 seconds per full orbit
  const baseRotationSpeed = 0.0035; 
  let activeMode = 'rings'; // 'rings' or 'spiral'

  const cuePill = document.querySelector('.project-label__cue');
  const projectPill = document.querySelector('.project-label__pill--project');
  const projectTitleSpan = document.querySelector('.project-label__title');

  window.addEventListener('mousedown', (e) => {
    isDragging = true;
    prevMouseX = e.clientX;
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
  });

  window.addEventListener('mousemove', (e) => {
    if (isDragging) {
      const deltaX = e.clientX - prevMouseX;
      targetRotationY += deltaX * 0.006;
      prevMouseX = e.clientX;
    }

    const normX = (e.clientX / window.innerWidth) * 2 - 1;
    const normY = -(e.clientY / window.innerHeight) * 2 + 1;
    targetRotationX = normY * 0.12;

    // Raycasting for hovered 3D card detection
    const raycaster = new THREE.Raycaster();
    const mouseVector = new THREE.Vector2(normX, normY);
    raycaster.setFromCamera(mouseVector, camera);

    const intersects = raycaster.intersectObjects(cardMeshes);
    if (intersects.length > 0) {
      const hovered = intersects[0].object;
      if (projectPill && projectTitleSpan) {
        projectTitleSpan.textContent = hovered.userData.title;
        projectPill.classList.add('visible');
        if (cuePill) cuePill.classList.remove('visible');
      }
      document.body.style.cursor = 'pointer';
    } else {
      if (projectPill) projectPill.classList.remove('visible');
      if (cuePill) cuePill.classList.add('visible');
      document.body.style.cursor = '';
    }
  });

  // Switch between Rings & Spiral layout modes (K95 Style)
  const ringBtn = document.querySelector('#mode-rings');
  const spiralBtn = document.querySelector('#mode-spiral');
  const switchPill = document.querySelector('.layout-switch__pill');

  function updateMode(mode) {
    activeMode = mode;
    if (mode === 'rings') {
      ringBtn?.classList.add('is-active');
      spiralBtn?.classList.remove('is-active');
      switchPill?.style.setProperty('transform', 'translate(0)');
      cardMeshes.forEach((mesh, i) => {
        const angle = mesh.userData.baseAngle;
        mesh.position.set(Math.sin(angle) * radius, Math.sin(angle * 2) * 0.18, Math.cos(angle) * radius);
      });
    } else {
      spiralBtn?.classList.add('is-active');
      ringBtn?.classList.remove('is-active');
      switchPill?.style.setProperty('transform', 'translate(calc(100% + 4px))');
      cardMeshes.forEach((mesh, i) => {
        const angle = mesh.userData.baseAngle;
        const spiralY = (i - cardCount / 2) * 0.48;
        const spiralR = radius * (1 - (i / cardCount) * 0.22);
        mesh.position.set(Math.sin(angle * 1.5) * spiralR, spiralY, Math.cos(angle * 1.5) * spiralR);
      });
    }
  }

  ringBtn?.addEventListener('click', () => updateMode('rings'));
  spiralBtn?.addEventListener('click', () => updateMode('spiral'));

  // Window resize
  function handleResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }
  window.addEventListener('resize', handleResize);

  // Render Loop
  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    const delta = Math.min(clock.getDelta(), 0.1);

    // Continuous smooth visible auto-rotation (unless actively dragging)
    if (!isDragging) {
      targetRotationY += baseRotationSpeed;
    }

    ringGroup.rotation.y += (targetRotationY - ringGroup.rotation.y) * 0.08;
    ringGroup.rotation.x += (targetRotationX - ringGroup.rotation.x) * 0.08;

    // Gentle particle drift
    particleMesh.rotation.y += 0.0005;

    renderer.render(scene, camera);
  }

  animate();
}
