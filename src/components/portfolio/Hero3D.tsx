import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { ChevronDown, Code, Cpu, Database } from 'lucide-react';

export default function Hero3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    sceneRef.current = scene;
    
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current, 
      alpha: true,
      antialias: true 
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    camera.position.z = 12;

    // Enhanced particle system with multiple layers
    const particleLayers: THREE.Points[] = [];
    for(let layer = 0; layer < 3; layer++) {
      const particlesGeometry = new THREE.BufferGeometry();
      const particlesCount = 2000;
      const posArray = new Float32Array(particlesCount * 3);
      const colorArray = new Float32Array(particlesCount * 3);
      const sizeArray = new Float32Array(particlesCount);
      
      for(let i = 0; i < particlesCount * 3; i += 3) {
        const radius = 15 + layer * 5;
        posArray[i] = (Math.random() - 0.5) * radius;
        posArray[i + 1] = (Math.random() - 0.5) * radius;
        posArray[i + 2] = (Math.random() - 0.5) * radius;
        
        const intensity = Math.random();
        colorArray[i] = 0 + intensity * 0.5;
        colorArray[i + 1] = 0.5 + intensity * 0.5;
        colorArray[i + 2] = 1;
        
        sizeArray[i / 3] = Math.random() * 0.05 + 0.02;
      }
      
      particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
      particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));
      particlesGeometry.setAttribute('size', new THREE.BufferAttribute(sizeArray, 1));
      
      const particlesMaterial = new THREE.PointsMaterial({
        size: 0.05,
        vertexColors: true,
        transparent: true,
        opacity: 0.8 - layer * 0.2,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true
      });
      
      const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
      scene.add(particlesMesh);
      particleLayers.push(particlesMesh);
    }

    // Create complex 3D circuit network
    const circuitGroup = new THREE.Group();
    
    // Main circuit board with depth
    const boardGeometry = new THREE.BoxGeometry(8, 5, 0.3);
    const boardMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x0a4a3a,
      transparent: true,
      opacity: 0.4,
      shininess: 100,
      emissive: 0x002211
    });
    const board = new THREE.Mesh(boardGeometry, boardMaterial);
    circuitGroup.add(board);

    // Add edge lighting
    const edgeGeometry = new THREE.EdgesGeometry(boardGeometry);
    const edgeMaterial = new THREE.LineBasicMaterial({ color: 0x00ffff, transparent: true, opacity: 0.6 });
    const edges = new THREE.LineSegments(edgeGeometry, edgeMaterial);
    circuitGroup.add(edges);

    // Create 3D components (ICs, resistors, capacitors)
    const components: THREE.Mesh[] = [];
    for(let i = 0; i < 40; i++) {
      const compType = Math.random();
      let geometry: THREE.BufferGeometry;
      
      if(compType < 0.4) {
        // IC chips
        geometry = new THREE.BoxGeometry(0.3, 0.3, 0.15);
      } else if(compType < 0.7) {
        // Cylindrical components (capacitors)
        geometry = new THREE.CylinderGeometry(0.08, 0.08, 0.25, 16);
      } else {
        // Small resistors
        geometry = new THREE.BoxGeometry(0.15, 0.05, 0.05);
      }
      
      const material = new THREE.MeshPhongMaterial({ 
        color: new THREE.Color(`hsl(${180 + Math.random() * 40}, 80%, ${40 + Math.random() * 30}%)`),
        emissive: new THREE.Color(`hsl(${180 + Math.random() * 40}, 100%, 20%)`),
        shininess: 80
      });
      
      const component = new THREE.Mesh(geometry, material);
      component.position.set(
        (Math.random() - 0.5) * 7,
        (Math.random() - 0.5) * 4,
        0.2 + Math.random() * 0.3
      );
      component.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      
      circuitGroup.add(component);
      components.push(component);
    }

    // Create 3D circuit traces with tubes
    for(let i = 0; i < 100; i++) {
      const points: THREE.Vector3[] = [];
      const startX = (Math.random() - 0.5) * 7;
      const startY = (Math.random() - 0.5) * 4;
      const startZ = 0.15;
      const segments = Math.floor(Math.random() * 4) + 2;
      
      let currentX = startX;
      let currentY = startY;
      let currentZ = startZ;
      
      points.push(new THREE.Vector3(currentX, currentY, currentZ));
      
      for(let j = 0; j < segments; j++) {
        if(Math.random() > 0.5) {
          currentX += (Math.random() - 0.5) * 1.5;
        } else {
          currentY += (Math.random() - 0.5) * 1.5;
        }
        currentZ += (Math.random() - 0.5) * 0.05;
        points.push(new THREE.Vector3(currentX, currentY, currentZ));
      }
      
      const curve = new THREE.CatmullRomCurve3(points);
      const tubeGeometry = new THREE.TubeGeometry(curve, 20, 0.02, 8, false);
      const tubeMaterial = new THREE.MeshPhongMaterial({ 
        color: new THREE.Color(`hsl(${180 + Math.random() * 40}, 100%, 50%)`),
        emissive: new THREE.Color(`hsl(${180 + Math.random() * 40}, 100%, 30%)`),
        transparent: true,
        opacity: 0.8
      });
      const tube = new THREE.Mesh(tubeGeometry, tubeMaterial);
      circuitGroup.add(tube);
      
      // Add glowing spheres at connection points
      points.forEach(point => {
        const nodeGeometry = new THREE.SphereGeometry(0.06, 16, 16);
        const nodeMaterial = new THREE.MeshPhongMaterial({ 
          color: 0x00ffff,
          emissive: 0x00aaff,
          transparent: true,
          opacity: 0.9
        });
        const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
        node.position.copy(point);
        circuitGroup.add(node);
      });
    }

    // Add floating holographic data cubes
    const dataCubes: THREE.Mesh[] = [];
    for(let i = 0; i < 15; i++) {
      const cubeGeometry = new THREE.BoxGeometry(0.3, 0.3, 0.3);
      const cubeMaterial = new THREE.MeshPhongMaterial({
        color: 0x00ffff,
        transparent: true,
        opacity: 0.3,
        emissive: 0x0088ff,
        wireframe: true
      });
      const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
      cube.position.set(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 10
      );
      scene.add(cube);
      dataCubes.push(cube);
    }
    
    scene.add(circuitGroup);

    // Advanced lighting system
    const ambientLight = new THREE.AmbientLight(0x404040, 2);
    scene.add(ambientLight);
    
    const pointLight1 = new THREE.PointLight(0x00ffff, 3, 50);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);
    
    const pointLight2 = new THREE.PointLight(0x0088ff, 3, 50);
    pointLight2.position.set(-5, -5, 5);
    scene.add(pointLight2);

    const pointLight3 = new THREE.PointLight(0xff00ff, 2, 40);
    pointLight3.position.set(0, 8, 3);
    scene.add(pointLight3);

    // Animation
    let mouseX = 0;
    let mouseY = 0;
    let time = 0;
    
    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    
    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.01;
      
      // Animate circuit board with complex motion
      circuitGroup.rotation.x = Math.sin(time * 0.3) * 0.3 + mouseY * 0.4;
      circuitGroup.rotation.y = time * 0.15 + mouseX * 0.4;
      circuitGroup.rotation.z = Math.cos(time * 0.25) * 0.15;
      
      // Animate components
      components.forEach((comp, i) => {
        comp.rotation.y += 0.01 * (i % 2 === 0 ? 1 : -1);
        comp.position.z = 0.2 + Math.sin(time + i) * 0.05;
      });

      // Animate data cubes
      dataCubes.forEach((cube, i) => {
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.015;
        cube.position.y += Math.sin(time * 2 + i) * 0.02;
      });
      
      // Animate particle layers
      particleLayers.forEach((layer, i) => {
        layer.rotation.y = time * (0.03 + i * 0.02);
        layer.rotation.x = Math.sin(time * 0.5) * 0.1;
      });
      
      // Animate lights
      pointLight1.position.x = Math.sin(time) * 7;
      pointLight1.position.y = Math.cos(time) * 7;
      
      pointLight2.position.x = Math.cos(time * 0.7) * 7;
      pointLight2.position.y = Math.sin(time * 0.7) * 7;

      pointLight3.position.x = Math.sin(time * 0.5) * 5;
      pointLight3.position.z = Math.cos(time * 0.5) * 5 + 3;
      
      renderer.render(scene, camera);
    };
    
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-gray-900 via-blue-950 to-purple-900">
      <canvas ref={canvasRef} className="absolute inset-0" />
      
      {/* Floating tech icons */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[Code, Cpu, Database].map((Icon, i) => (
          <motion.div
            key={i}
            className="absolute text-cyan-400/10"
            initial={{ 
              x: `${Math.random() * 100}%`, 
              y: `${Math.random() * 100}%`,
              scale: 0.5
            }}
            animate={{ 
              y: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
              rotate: [0, 360],
              scale: [0.5, 1, 0.5]
            }}
            transition={{ 
              duration: 20 + i * 5, 
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <Icon className="w-32 h-32" />
          </motion.div>
        ))}
      </div>
      
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-6"
          >
            <span className="px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/50 rounded-full text-cyan-300 text-sm font-medium backdrop-blur-sm">
              Full-Stack Engineer & IoT Specialist
            </span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-6xl md:text-8xl font-bold text-white mb-6 leading-tight"
          >
            Frank Kusi
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 mt-2">
              Appiah
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-xl md:text-2xl text-gray-300 mb-4 max-w-3xl mx-auto"
          >
            Building intelligent systems that bridge hardware and software
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto"
          >
            3-2 Engineering @ Oberlin College • IoT • ML • Cloud Architecture
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <a
              href="#projects"
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-semibold hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-105"
            >
              Explore Projects
            </a>
            <a
              href="#contact"
              className="px-8 py-4 bg-white/10 backdrop-blur-md text-white border-2 border-white/30 rounded-lg font-semibold hover:bg-white/20 hover:border-cyan-400/50 transition-all duration-300"
            >
              Get In Touch
            </a>
            <a
              href="https://github.com/2024frank"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-gray-800/50 backdrop-blur-md text-white border-2 border-gray-600 rounded-lg font-semibold hover:border-cyan-400 transition-all duration-300"
            >
              GitHub
            </a>
          </motion.div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="absolute bottom-10"
        >
          <a href="#about" className="flex flex-col items-center text-cyan-400 hover:text-cyan-300 transition-colors">
            <span className="text-sm mb-2">Scroll to explore</span>
            <ChevronDown className="w-6 h-6 animate-bounce" />
          </a>
        </motion.div>
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-900 pointer-events-none" />
    </div>
  );
}


