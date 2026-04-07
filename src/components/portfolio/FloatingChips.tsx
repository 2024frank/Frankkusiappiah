import { motion } from 'framer-motion';
import { Cpu, Layers, Box, Code2, Database, Wifi } from 'lucide-react';

const chips = [
  { icon: Cpu,      label: 'INA333',    color: 'from-cyan-500/20 to-cyan-600/10',    border: 'border-cyan-500/30',    text: 'text-cyan-400',    x: '-left-16',  y: 'top-8',     delay: 0 },
  { icon: Layers,   label: 'KiCad 7',   color: 'from-blue-500/20 to-blue-600/10',    border: 'border-blue-500/30',    text: 'text-blue-400',    x: '-right-16', y: 'top-4',     delay: 0.2 },
  { icon: Box,      label: 'OpenSCAD',  color: 'from-emerald-500/20 to-emerald-600/10', border: 'border-emerald-500/30', text: 'text-emerald-400', x: '-left-14',  y: 'bottom-8',  delay: 0.4 },
  { icon: Code2,    label: 'ARKit',     color: 'from-purple-500/20 to-purple-600/10', border: 'border-purple-500/30',  text: 'text-purple-400',  x: '-right-14', y: 'bottom-4',  delay: 0.6 },
  { icon: Database, label: 'MySQL',     color: 'from-pink-500/20 to-pink-600/10',     border: 'border-pink-500/30',    text: 'text-pink-400',    x: '-left-8',   y: '-top-10',   delay: 0.3 },
  { icon: Wifi,     label: 'IoT',       color: 'from-indigo-500/20 to-indigo-600/10', border: 'border-indigo-500/30',  text: 'text-indigo-400',  x: '-right-8',  y: '-top-8',    delay: 0.5 },
];

export default function FloatingChips() {
  return (
    <>
      {chips.map((chip, i) => (
        <motion.div
          key={i}
          className={`absolute hidden lg:flex items-center gap-1.5 px-3 py-2 rounded-xl
            bg-gradient-to-br ${chip.color} backdrop-blur-md
            border ${chip.border} ${chip.x} ${chip.y}
            shadow-lg whitespace-nowrap select-none pointer-events-none`}
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{
            opacity: [0, 1, 1],
            scale:   [0.6, 1, 1],
            y: [20, 0, -6, 0, -4, 0],
          }}
          transition={{
            opacity:  { delay: chip.delay + 0.8, duration: 0.5 },
            scale:    { delay: chip.delay + 0.8, duration: 0.5, type: 'spring', stiffness: 200 },
            y:        { delay: chip.delay + 1.2, duration: 4, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' },
          }}
        >
          <chip.icon className={`w-3.5 h-3.5 ${chip.text}`} />
          <span className={`text-xs font-bold font-mono ${chip.text}`}>{chip.label}</span>
        </motion.div>
      ))}
    </>
  );
}
