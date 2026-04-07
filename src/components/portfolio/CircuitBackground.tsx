import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * WebGL circuit-board particle network — cyan nodes connected by glowing traces,
 * floating slowly in 3D space, responding to mouse parallax.
 */
export default function CircuitBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    /* ── Renderer ── */
    const W = window.innerWidth, H = window.innerHeight;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W, H);
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);

    /* ── Scene / Camera ── */
    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 1000);
    camera.position.z = 80;

    /* ── Nodes ── */
    const NODE_COUNT = 120;
    const SPREAD = 100;
    const positions: THREE.Vector3[] = [];

    const nodeGeo = new THREE.BufferGeometry();
    const nodePts = new Float32Array(NODE_COUNT * 3);
    const nodeColors = new Float32Array(NODE_COUNT * 3);

    for (let i = 0; i < NODE_COUNT; i++) {
      const x = (Math.random() - 0.5) * SPREAD;
      const y = (Math.random() - 0.5) * SPREAD;
      const z = (Math.random() - 0.5) * 40;
      positions.push(new THREE.Vector3(x, y, z));
      nodePts[i * 3]     = x;
      nodePts[i * 3 + 1] = y;
      nodePts[i * 3 + 2] = z;
      // Cyan ↔ blue gradient based on Y
      const t = (y + SPREAD / 2) / SPREAD;
      nodeColors[i * 3]     = 0.1 + t * 0.1;   // R
      nodeColors[i * 3 + 1] = 0.7 + t * 0.2;   // G
      nodeColors[i * 3 + 2] = 0.9;              // B
    }
    nodeGeo.setAttribute('position', new THREE.BufferAttribute(nodePts, 3));
    nodeGeo.setAttribute('color',    new THREE.BufferAttribute(nodeColors, 3));

    const nodeMat = new THREE.PointsMaterial({
      size: 1.2,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      sizeAttenuation: true,
    });
    const nodeCloud = new THREE.Points(nodeGeo, nodeMat);
    scene.add(nodeCloud);

    /* ── Edges (traces) ── */
    const MAX_DIST = 22;
    const edgeVerts: number[] = [];
    const edgeColors: number[] = [];

    for (let i = 0; i < NODE_COUNT; i++) {
      for (let j = i + 1; j < NODE_COUNT; j++) {
        const d = positions[i].distanceTo(positions[j]);
        if (d < MAX_DIST) {
          const alpha = 1 - d / MAX_DIST;
          edgeVerts.push(...positions[i].toArray(), ...positions[j].toArray());
          // Fade out edges by alpha: encode in B channel (used in shader-less way)
          const r = 0.05, g = 0.65 * alpha, b = 0.85 * alpha;
          edgeColors.push(r, g, b, r, g, b);
        }
      }
    }

    const edgeGeo = new THREE.BufferGeometry();
    edgeGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(edgeVerts), 3));
    edgeGeo.setAttribute('color',    new THREE.BufferAttribute(new Float32Array(edgeColors), 3));

    const edgeMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.35,
    });
    const edges = new THREE.LineSegments(edgeGeo, edgeMat);
    scene.add(edges);

    /* ── Floating PCB pads (small glowing squares) ── */
    const padGroup = new THREE.Group();
    const padGeo   = new THREE.PlaneGeometry(1.4, 1.4);
    const padMat   = new THREE.MeshBasicMaterial({
      color: new THREE.Color(0x06b6d4),
      transparent: true,
      opacity: 0.5,
      side: THREE.DoubleSide,
    });
    for (let i = 0; i < 30; i++) {
      const mesh = new THREE.Mesh(padGeo, padMat.clone());
      mesh.position.set(
        (Math.random() - 0.5) * SPREAD,
        (Math.random() - 0.5) * SPREAD,
        (Math.random() - 0.5) * 30,
      );
      mesh.rotation.z = Math.random() * Math.PI;
      padGroup.add(mesh);
    }
    scene.add(padGroup);

    /* ── Mouse parallax ── */
    let mouseX = 0, mouseY = 0;
    const onMouse = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth  - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouse);

    /* ── Resize ── */
    const onResize = () => {
      const W2 = window.innerWidth, H2 = window.innerHeight;
      renderer.setSize(W2, H2);
      camera.aspect = W2 / H2;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', onResize);

    /* ── Animate ── */
    let raf: number;
    let t = 0;
    const animate = () => {
      raf = requestAnimationFrame(animate);
      t += 0.0008;

      // Slow rotation of whole scene
      nodeCloud.rotation.y = t * 0.3 + mouseX * 0.08;
      nodeCloud.rotation.x = mouseY * 0.05;
      edges.rotation.y     = nodeCloud.rotation.y;
      edges.rotation.x     = nodeCloud.rotation.x;

      // Pad gentle float
      padGroup.rotation.y = t * 0.15 + mouseX * 0.06;
      padGroup.rotation.x = Math.sin(t * 0.5) * 0.04 + mouseY * 0.04;

      // Camera drift
      camera.position.x += (mouseX * 5 - camera.position.x) * 0.04;
      camera.position.y += (-mouseY * 4 - camera.position.y) * 0.04;
      camera.lookAt(scene.position);

      // Pulse node opacity
      nodeMat.opacity = 0.55 + Math.sin(t * 2.5) * 0.15;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden="true"
    />
  );
}
