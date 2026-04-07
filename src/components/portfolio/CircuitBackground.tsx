import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * Full animated circuit board:
 * – glowing nodes with expanding pulse rings
 * – PCB copper traces (edges)
 * – electron particles that travel along the traces
 * – mouse 3D parallax
 * – additive blending for bloom feel
 */
export default function CircuitBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    /* ── Renderer ─────────────────────────────────────────── */
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);

    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 500);
    camera.position.z = 90;

    /* ── Master group (rotated together) ─────────────────── */
    const root = new THREE.Group();
    scene.add(root);

    /* ── Node positions ───────────────────────────────────── */
    const NODE_COUNT = 140;
    const SPREAD     = 110;
    const MAX_DIST   = 24;

    const positions: THREE.Vector3[] = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      positions.push(new THREE.Vector3(
        (Math.random() - 0.5) * SPREAD,
        (Math.random() - 0.5) * SPREAD,
        (Math.random() - 0.5) * 38,
      ));
    }

    /* ── Node dots ────────────────────────────────────────── */
    const nodePts   = new Float32Array(NODE_COUNT * 3);
    const nodeCol   = new Float32Array(NODE_COUNT * 3);
    for (let i = 0; i < NODE_COUNT; i++) {
      nodePts[i*3]   = positions[i].x;
      nodePts[i*3+1] = positions[i].y;
      nodePts[i*3+2] = positions[i].z;
      // Cyan-blue palette
      const t = Math.random();
      nodeCol[i*3]   = 0.05 + t * 0.1;
      nodeCol[i*3+1] = 0.65 + t * 0.25;
      nodeCol[i*3+2] = 0.9  + t * 0.1;
    }
    const nodeGeo = new THREE.BufferGeometry();
    nodeGeo.setAttribute('position', new THREE.BufferAttribute(nodePts, 3));
    nodeGeo.setAttribute('color',    new THREE.BufferAttribute(nodeCol, 3));
    const nodeMat = new THREE.PointsMaterial({
      size: 1.6, vertexColors: true,
      transparent: true, opacity: 0.9,
      blending: THREE.AdditiveBlending, depthWrite: false,
    });
    root.add(new THREE.Points(nodeGeo, nodeMat));

    /* ── Edges / traces ───────────────────────────────────── */
    interface Edge { a: THREE.Vector3; b: THREE.Vector3 }
    const edges: Edge[] = [];
    const edgeVerts: number[] = [];
    const edgeCols:  number[] = [];

    for (let i = 0; i < NODE_COUNT; i++) {
      for (let j = i + 1; j < NODE_COUNT; j++) {
        const d = positions[i].distanceTo(positions[j]);
        if (d < MAX_DIST) {
          edges.push({ a: positions[i], b: positions[j] });
          const alpha = (1 - d / MAX_DIST) * 0.6;
          edgeVerts.push(...positions[i].toArray(), ...positions[j].toArray());
          edgeCols.push(0.02, alpha * 0.8, alpha, 0.02, alpha * 0.8, alpha);
        }
      }
    }

    const edgeGeo = new THREE.BufferGeometry();
    edgeGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(edgeVerts), 3));
    edgeGeo.setAttribute('color',    new THREE.BufferAttribute(new Float32Array(edgeCols), 3));
    const edgeMat = new THREE.LineBasicMaterial({
      vertexColors: true, transparent: true, opacity: 0.4,
      blending: THREE.AdditiveBlending, depthWrite: false,
    });
    root.add(new THREE.LineSegments(edgeGeo, edgeMat));

    /* ── PCB pad squares at nodes ─────────────────────────── */
    const padGeo = new THREE.PlaneGeometry(1.8, 1.8);
    const PAD_NODES = 35;
    for (let i = 0; i < PAD_NODES; i++) {
      const idx = Math.floor(Math.random() * NODE_COUNT);
      const mat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(0x06b6d4),
        transparent: true, opacity: 0.28,
        blending: THREE.AdditiveBlending, depthWrite: false,
        side: THREE.DoubleSide,
      });
      const mesh = new THREE.Mesh(padGeo, mat);
      mesh.position.copy(positions[idx]);
      mesh.rotation.z = Math.random() * Math.PI;
      root.add(mesh);
    }

    /* ── Pulse rings at selected nodes ───────────────────── */
    interface Ring { mesh: THREE.Mesh; speed: number; phase: number }
    const rings: Ring[] = [];
    const ringGeo = new THREE.RingGeometry(0.5, 0.9, 32);
    const RING_NODES = 20;
    for (let i = 0; i < RING_NODES; i++) {
      const idx = Math.floor(Math.random() * NODE_COUNT);
      const mat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(0x22d3ee),
        transparent: true, opacity: 0.7,
        blending: THREE.AdditiveBlending, depthWrite: false,
        side: THREE.DoubleSide,
      });
      const mesh = new THREE.Mesh(ringGeo, mat);
      mesh.position.copy(positions[idx]);
      mesh.rotation.x = Math.PI / 2;
      root.add(mesh);
      rings.push({ mesh, speed: 0.6 + Math.random() * 0.8, phase: Math.random() * Math.PI * 2 });
    }

    /* ── Electron particles ───────────────────────────────── */
    const ELECTRON_COUNT = 55;
    interface Electron { edgeIdx: number; t: number; speed: number; color: THREE.Color }
    const electrons: Electron[] = [];

    const electronColors = [
      new THREE.Color(0x00ffff),   // cyan — data signal
      new THREE.Color(0x60a5fa),   // blue — clock
      new THREE.Color(0xa78bfa),   // purple — power
      new THREE.Color(0x4ade80),   // green — ground ref
      new THREE.Color(0xfbbf24),   // yellow — analog
    ];

    for (let i = 0; i < ELECTRON_COUNT; i++) {
      electrons.push({
        edgeIdx: Math.floor(Math.random() * edges.length),
        t:       Math.random(),
        speed:   0.004 + Math.random() * 0.009,
        color:   electronColors[Math.floor(Math.random() * electronColors.length)],
      });
    }

    const ePos = new Float32Array(ELECTRON_COUNT * 3);
    const eCol = new Float32Array(ELECTRON_COUNT * 3);
    for (let i = 0; i < ELECTRON_COUNT; i++) {
      eCol[i*3]   = electrons[i].color.r;
      eCol[i*3+1] = electrons[i].color.g;
      eCol[i*3+2] = electrons[i].color.b;
    }
    const electronGeo = new THREE.BufferGeometry();
    electronGeo.setAttribute('position', new THREE.BufferAttribute(ePos, 3));
    electronGeo.setAttribute('color',    new THREE.BufferAttribute(eCol, 3));
    const electronMat = new THREE.PointsMaterial({
      size: 3.5, vertexColors: true,
      transparent: true, opacity: 1.0,
      blending: THREE.AdditiveBlending, depthWrite: false,
      sizeAttenuation: true,
    });
    const electronCloud = new THREE.Points(electronGeo, electronMat);
    root.add(electronCloud);

    /* ── Electron trail (ghost behind each electron) ─────── */
    const trailPos = new Float32Array(ELECTRON_COUNT * 3);
    const trailGeo = new THREE.BufferGeometry();
    trailGeo.setAttribute('position', new THREE.BufferAttribute(trailPos, 3));
    trailGeo.setAttribute('color',    new THREE.BufferAttribute(eCol, 3)); // same colors
    const trailMat = new THREE.PointsMaterial({
      size: 1.8, vertexColors: true,
      transparent: true, opacity: 0.45,
      blending: THREE.AdditiveBlending, depthWrite: false,
      sizeAttenuation: true,
    });
    root.add(new THREE.Points(trailGeo, trailMat));

    /* ── Mouse parallax ──────────────────────────────────── */
    let mouseX = 0, mouseY = 0;
    const onMouse = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth  - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouse);

    /* ── Resize ──────────────────────────────────────────── */
    const onResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', onResize);

    /* ── Animate ─────────────────────────────────────────── */
    let raf: number;
    let clock = 0;

    const animate = () => {
      raf = requestAnimationFrame(animate);
      clock += 0.007;

      /* Root slow drift */
      root.rotation.y = clock * 0.12 + mouseX * 0.07;
      root.rotation.x = Math.sin(clock * 0.3) * 0.04 + mouseY * 0.04;

      /* Camera parallax */
      camera.position.x += (mouseX * 6  - camera.position.x) * 0.03;
      camera.position.y += (-mouseY * 4 - camera.position.y) * 0.03;
      camera.lookAt(scene.position);

      /* Pulse rings */
      for (const r of rings) {
        const s = 0.8 + 2.5 * ((Math.sin(clock * r.speed + r.phase) + 1) / 2);
        r.mesh.scale.setScalar(s);
        (r.mesh.material as THREE.MeshBasicMaterial).opacity = 0.7 * (1 - (s - 0.8) / 2.5);
      }

      /* Node opacity pulse */
      nodeMat.opacity = 0.55 + Math.sin(clock * 2.2) * 0.2;

      /* Electrons */
      const ePosArr   = electronGeo.attributes.position.array as Float32Array;
      const trailArr  = trailGeo.attributes.position.array as Float32Array;

      for (let i = 0; i < ELECTRON_COUNT; i++) {
        const e = electrons[i];

        // Trail is 0.06 behind
        const tTrail = Math.max(0, e.t - 0.06);
        const edgeA  = edges[e.edgeIdx].a;
        const edgeB  = edges[e.edgeIdx].b;

        // Advance electron
        e.t += e.speed;
        if (e.t > 1.0) {
          e.t = 0;
          // Hop to a connected edge (find an edge that starts from current end)
          const curEnd = edges[e.edgeIdx].b;
          const candidates = edges
            .map((ed, idx) => ({ idx, d: ed.a.distanceTo(curEnd) }))
            .filter(x => x.d < 5 && x.idx !== e.edgeIdx);
          if (candidates.length > 0) {
            e.edgeIdx = candidates[Math.floor(Math.random() * candidates.length)].idx;
          } else {
            e.edgeIdx = Math.floor(Math.random() * edges.length);
          }
        }

        const t = e.t;
        ePosArr[i*3]   = edgeA.x + (edgeB.x - edgeA.x) * t;
        ePosArr[i*3+1] = edgeA.y + (edgeB.y - edgeA.y) * t;
        ePosArr[i*3+2] = edgeA.z + (edgeB.z - edgeA.z) * t;

        trailArr[i*3]   = edgeA.x + (edgeB.x - edgeA.x) * tTrail;
        trailArr[i*3+1] = edgeA.y + (edgeB.y - edgeA.y) * tTrail;
        trailArr[i*3+2] = edgeA.z + (edgeB.z - edgeA.z) * tTrail;
      }

      electronGeo.attributes.position.needsUpdate = true;
      trailGeo.attributes.position.needsUpdate    = true;

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
      style={{ opacity: 0.75 }}
      aria-hidden="true"
    />
  );
}
