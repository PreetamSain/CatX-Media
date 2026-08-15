import * as THREE from 'three';

export function initWebGLHero() {
  const container = document.querySelector('.hero-webgl-canvas');
  if (!container) return;

  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  
  function resize() {
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    if (material && material.uniforms) {
      material.uniforms.resolution.value.set(width, height);
    }
  }

  container.innerHTML = '';
  container.appendChild(renderer.domElement);

  const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = vec4(position, 1.0);
    }
  `;

  // Shader with PURE halftone dots (NO checkerboard) and X-intersecting diagonal flow
  const fragmentShader = `
    uniform vec2 resolution;
    uniform float time;
    uniform vec3 uColorBg;
    uniform vec3 uColorAccent;
    varying vec2 vUv;

    // 2D Hash & Simplex Noise
    vec2 hash2(vec2 p) {
      p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
      return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
    }

    float snoise(vec2 p) {
      const float K1 = 0.366025404; // (sqrt(3)-1)/2
      const float K2 = 0.211324865; // (3-sqrt(3))/6

      vec2 i = floor(p + (p.x + p.y) * K1);
      vec2 a = p - i + (i.x + i.y) * K2;
      vec2 o = (a.x > a.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec2 b = a - o + K2;
      vec2 c = a - 1.0 + 2.0 * K2;

      vec3 h = max(0.5 - vec3(dot(a, a), dot(b, b), dot(c, c)), 0.0);
      vec3 n = h * h * h * h * vec3(dot(a, hash2(i)), dot(b, hash2(i + o)), dot(c, hash2(i + 1.0)));
      return dot(n, vec3(70.0));
    }

    void main() {
      float aspect = resolution.x / resolution.y;
      vec2 uv = vUv;
      
      // Center coordinates
      vec2 p = uv - 0.5;
      p.x *= aspect;

      // 1. "X"-Themed Geometry Flow (Intersecting diagonal vectors)
      float diag1 = p.x + p.y * 1.15; // Diagonal /
      float diag2 = p.x - p.y * 1.15; // Diagonal \
      
      float distDiag1 = abs(diag1);
      float distDiag2 = abs(diag2);
      float xSDF = min(distDiag1, distDiag2);

      // Smooth organic wave breathing over time
      float t = time * 0.4;
      float n1 = snoise(vec2(diag1 * 2.0 + t * 0.25, diag2 * 2.0 - t * 0.2));
      float n2 = snoise(vec2(p.x * 2.8 - t * 0.3, p.y * 2.8 + t * 0.25));
      
      // Composite wave field creating organic X-metaballs
      float field = sin(xSDF * 6.5 - t + n1 * 1.1) * 0.5 + 0.5;
      field += sin(length(p) * 4.8 - t * 0.7 + n2 * 0.9) * 0.35;
      field = clamp(field, 0.0, 1.0);

      // 2. Pure Halftone Dot Matrix (Strictly clean circular dots, NO checkerboard)
      float gridSize = 60.0;
      vec2 gridUV = uv * vec2(gridSize * aspect, gridSize);
      vec2 grid = fract(gridUV) - 0.5;
      float dotDist = length(grid);

      // Dot radius dynamically modulated by the field
      float maxRadius = 0.62;
      float targetRadius = field * maxRadius;
      
      // Crisp antialiased circular dots
      float dotMask = smoothstep(targetRadius + 0.04, targetRadius - 0.04, dotDist);

      // 3. Color Composition
      // Deep black background (#06020a)
      vec3 color = uColorBg;

      // Pure solid white halftone dots
      color = mix(color, vec3(1.0), dotMask);

      // Electric Purple aura around the metaball boundary
      float aura = smoothstep(0.35, 0.65, field) * (1.0 - smoothstep(0.65, 0.85, field));
      color += uColorAccent * aura * (1.0 - dotMask * 0.5) * 0.65;

      gl_FragColor = vec4(color, 1.0);
    }
  `;

  const uniforms = {
    resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
    time: { value: 0 },
    uColorBg: { value: new THREE.Color(0x06020a) },
    uColorAccent: { value: new THREE.Color(0x8000ff) }
  };

  const material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms,
    transparent: false
  });

  const geometry = new THREE.PlaneGeometry(2, 2);
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  window.addEventListener('resize', resize);
  resize();

  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    uniforms.time.value = clock.getElapsedTime();
    renderer.render(scene, camera);
  }

  animate();
}
