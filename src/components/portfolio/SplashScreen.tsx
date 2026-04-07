import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BOOT_LINES = [
  'Initializing hardware abstraction layer...',
  'Loading INA333 signal conditioning module...  OK',
  'Mounting LiFePO₄ battery management system... OK',
  'Compiling OpenSCAD parametric models...       OK',
  'Connecting IoT sensor pipeline...             OK',
  'Starting full-stack runtime...                OK',
  '> Portfolio ready.',
];

export default function SplashScreen({ onDone }: { onDone: () => void }) {
  const [lines, setLines]   = useState<string[]>([]);
  const [done, setDone]     = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const show = async () => {
      for (let i = 0; i < BOOT_LINES.length; i++) {
        await new Promise(r => setTimeout(r, i === 0 ? 200 : 260));
        if (cancelled) return;
        setLines(prev => [...prev, BOOT_LINES[i]]);
      }
      await new Promise(r => setTimeout(r, 500));
      if (cancelled) return;
      setDone(true);
      await new Promise(r => setTimeout(r, 600));
      if (cancelled) return;
      setExiting(true);
      await new Promise(r => setTimeout(r, 700));
      if (cancelled) return;
      onDone();
    };
    show();
    return () => { cancelled = true; };
  }, [onDone]);

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[999] flex items-center justify-center"
          style={{ background: '#020617' }}
        >
          {/* Grid bg */}
          <div className="absolute inset-0 soft-grid opacity-30" />
          {/* Glow orbs */}
          <div className="absolute top-1/3 left-1/3 w-96 h-96 rounded-full bg-cyan-500/8 blur-3xl" />
          <div className="absolute bottom-1/3 right-1/3 w-72 h-72 rounded-full bg-blue-500/6 blur-3xl" />

          <div className="relative z-10 w-full max-w-xl px-8">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span className="font-mono text-cyan-400 text-xs uppercase tracking-[0.25em] font-bold">
                  frank-portfolio / boot sequence
                </span>
              </div>
              <div className="h-px bg-gradient-to-r from-cyan-500/60 via-blue-500/40 to-transparent" />
            </motion.div>

            {/* Boot lines */}
            <div className="font-mono text-sm space-y-1.5 min-h-[210px]">
              {lines.map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`${
                    line.includes('OK')      ? 'text-emerald-400' :
                    line.startsWith('>')     ? 'text-cyan-300 font-bold text-base' :
                    'text-gray-400'
                  }`}
                >
                  {!line.startsWith('>') && (
                    <span className="text-gray-600 mr-2 select-none">$</span>
                  )}
                  {line}
                  {i === lines.length - 1 && !done && (
                    <span className="cursor-blink ml-1" />
                  )}
                </motion.div>
              ))}
            </div>

            {/* Progress bar */}
            <div className="mt-8">
              <div className="h-0.5 bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                  initial={{ width: '0%' }}
                  animate={{ width: done ? '100%' : `${(lines.length / BOOT_LINES.length) * 92}%` }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                />
              </div>
              <div className="flex justify-between mt-1.5 font-mono text-[10px] text-gray-600">
                <span>Loading modules</span>
                <span>{Math.round((lines.length / BOOT_LINES.length) * 100)}%</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
