import * as THREE from 'three';

export function initMockupViewer() {
  const container = document.querySelector('.mockup-webgl-canvas');
  if (!container) return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
  camera.position.set(0, 0, 4.5);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.2;

  container.innerHTML = '';
  container.appendChild(renderer.domElement);

  // Lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
  scene.add(ambientLight);

  const dirLight1 = new THREE.DirectionalLight(0x8000ff, 2.5);
  dirLight1.position.set(5, 5, 5);
  scene.add(dirLight1);

  const dirLight2 = new THREE.DirectionalLight(0xffffff, 1.5);
  dirLight2.position.set(-5, -5, 2);
  scene.add(dirLight2);

  // Group for Mockup Meshes
  const mockupGroup = new THREE.Group();
  scene.add(mockupGroup);

  const textureLoader = new THREE.TextureLoader();
  const labelTexture = textureLoader.load('/images/collections/86af7f.webp');
  labelTexture.wrapS = THREE.RepeatWrapping;
  labelTexture.wrapT = THREE.RepeatWrapping;

  // 1. Can Mockup Geometry
  const canGeo = new THREE.CylinderGeometry(0.8, 0.8, 2.2, 64);
  const canMat = new THREE.MeshStandardMaterial({
    map: labelTexture,
    metalness: 0.6,
    roughness: 0.25,
    envMapIntensity: 1.5
  });
  const canMesh = new THREE.Mesh(canGeo, canMat);

  // Top Cap & Bottom Bevel
  const capGeo = new THREE.CylinderGeometry(0.75, 0.8, 0.15, 64);
  const capMat = new THREE.MeshStandardMaterial({ color: 0xd1d1d6, metalness: 0.9, roughness: 0.1 });
  const topCap = new THREE.Mesh(capGeo, capMat);
  topCap.position.y = 1.15;
  canMesh.add(topCap);

  const botCap = new THREE.Mesh(capGeo, capMat);
  botCap.position.y = -1.15;
  canMesh.add(botCap);

  mockupGroup.add(canMesh);

  // Mouse Drag & Inspection Logic
  let isDragging = false;
  let prevMouseX = 0;
  let prevMouseY = 0;
  let targetRotY = 0;
  let targetRotX = 0;

  container.addEventListener('mousedown', (e) => {
    isDragging = true;
    prevMouseX = e.clientX;
    prevMouseY = e.clientY;
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
  });

  container.addEventListener('mousemove', (e) => {
    if (isDragging) {
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      targetRotY += deltaX * 0.008;
      targetRotX += deltaY * 0.008;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    }
  });

  // Touch Support
  container.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) {
      isDragging = true;
      prevMouseX = e.touches[0].clientX;
      prevMouseY = e.touches[0].clientY;
    }
  });

  window.addEventListener('touchend', () => {
    isDragging = false;
  });

  container.addEventListener('touchmove', (e) => {
    if (isDragging && e.touches.length === 1) {
      const deltaX = e.touches[0].clientX - prevMouseX;
      const deltaY = e.touches[0].clientY - prevMouseY;
      targetRotY += deltaX * 0.008;
      targetRotX += deltaY * 0.008;
      prevMouseX = e.touches[0].clientX;
      prevMouseY = e.touches[0].clientY;
    }
  });

  // Resize Handler
  function handleResize() {
    if (!container) return;
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  }
  window.addEventListener('resize', handleResize);

  // Render Loop
  function animate() {
    requestAnimationFrame(animate);

    if (!isDragging) {
      targetRotY += 0.004;
    }

    mockupGroup.rotation.y += (targetRotY - mockupGroup.rotation.y) * 0.08;
    mockupGroup.rotation.x += (targetRotX - mockupGroup.rotation.x) * 0.08;

    renderer.render(scene, camera);
  }

  animate();
}
