import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

/* ── Letter flip animation ──────────────────────────────────────────────── */
const letterVariants = {
  hidden: { opacity: 0, y: 28, rotateX: -80, scale: 0.85 },
  visible: (i: number) => ({
    opacity: 1, y: 0, rotateX: 0, scale: 1,
    transition: { delay: i * 0.04, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
};

function FlipWord({ word, colorClass = 'text-white', startDelay = 0 }: { word: string; colorClass?: string; startDelay?: number }) {
  return (
    <span className={`inline-flex ${colorClass}`} style={{ perspective: '600px' }}>
      {word.split('').map((ch, i) => (
        <motion.span
          key={i}
          custom={startDelay + i}
          variants={letterVariants}
          initial="hidden"
          animate="visible"
          style={{ display: 'inline-block', transformOrigin: 'bottom center' }}
        >
          {ch === ' ' ? '\u00A0' : ch}
        </motion.span>
      ))}
    </span>
  );
}

/* ── Typewriter ─────────────────────────────────────────────────────────── */
export function Typewriter({ text, delay = 1.8, speed = 38 }: { text: string; delay?: number; speed?: number }) {
  const [displayed, setDisplayed] = useState('');
  const idx = useRef(0);

  useEffect(() => {
    const t = setTimeout(() => {
      const interval = setInterval(() => {
        if (idx.current >= text.length) { clearInterval(interval); return; }
        setDisplayed(text.slice(0, ++idx.current));
      }, speed);
      return () => clearInterval(interval);
    }, delay * 1000);
    return () => clearTimeout(t);
  }, [text, delay, speed]);

  return (
    <span>
      {displayed}
      <span className="cursor-blink" />
    </span>
  );
}

/* ── Count-up stat ──────────────────────────────────────────────────────── */
export function CountUp({ target, suffix = '', prefix = '', duration = 1600, delay = 0 }:
  { target: number; suffix?: string; prefix?: string; duration?: number; delay?: number }) {
  const [count, setCount] = useState(0);
  const ref  = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        setTimeout(() => {
          const start = performance.now();
          const tick = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }, delay);
      }
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, duration, delay]);

  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
}

/* ── Main hero heading ──────────────────────────────────────────────────── */
export default function AnimatedHeroText() {
  return (
    <h1
      className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-none mb-4 select-none"
      style={{ perspective: '800px', fontFeatureSettings: '"kern" 1' }}
    >
      <span className="block mb-1">
        <FlipWord word="Frank" colorClass="text-white" startDelay={0} />
        <span className="text-white">&nbsp;</span>
        <FlipWord word="Kusi" colorClass="text-white" startDelay={6} />
      </span>
      <span className="block">
        <FlipWord
          word="Appiah"
          colorClass="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-cyan-400 to-blue-400"
          startDelay={12}
        />
      </span>
    </h1>
  );
}
