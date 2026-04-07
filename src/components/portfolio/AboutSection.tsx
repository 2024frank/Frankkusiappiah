import { motion } from 'framer-motion';
import { Terminal, Zap, Users, Rocket, Award, Brain, Globe, Coffee } from 'lucide-react';

const terminalLines = [
  { prompt: '~$', cmd: 'whoami',        out: 'Frank Kusi Appiah — Oberlin College, 3-2 Engineering' },
  { prompt: '~$', cmd: 'cat skills.txt',out: 'IoT · PCB Design · Full-Stack · CAD · ML · AR' },
  { prompt: '~$', cmd: 'echo $STATUS',  out: 'OPEN_TO_WORK=true  STRONG_SCHOLAR=true  SOCCER_CAPTAIN=true' },
];

const cards = [
  { icon: Brain,   color: 'from-cyan-500 to-blue-600',    title: 'Systems Thinker',  body: 'I design from the atom up — analog circuits → firmware → cloud dashboards' },
  { icon: Zap,     color: 'from-yellow-500 to-orange-500', title: 'Hardware Engineer', body: '4-layer PCBs, LiFePO₄ BMS, Ngspice verified sims, KiCad 7 Gerbers' },
  { icon: Rocket,  color: 'from-purple-500 to-pink-500',   title: '36-Hour Builder',   body: 'Shipped AR Memory Journal at HackHarvard with zero prior ARKit experience' },
  { icon: Users,   color: 'from-emerald-500 to-teal-500',  title: 'Team Leader',       body: 'Captain, Oberlin Soccer Club — 22 players, 3 seasons of strategy' },
  { icon: Globe,   color: 'from-blue-500 to-indigo-500',   title: 'STRONG Scholar',    body: '1 of 16 selected from 1,000+ applicants for research excellence' },
  { icon: Coffee,  color: 'from-amber-500 to-yellow-500',  title: 'Lifelong Learner',  body: 'Side projects span OpenSCAD, LTspice, ARKit — whatever the problem needs' },
];

const stats = [
  { value: '5,000+', label: 'sensor readings / day' },
  { value: '4',      label: 'PCB layers' },
  { value: '−16 dB', label: 'noise rejection' },
  { value: '101×',   label: 'amplifier gain' },
  { value: '36 hrs', label: 'hackathon ship time' },
  { value: '1 of 16', label: 'STRONG Scholar' },
];

export default function AboutSection() {
  return (
    <section id="about" className="relative py-28 overflow-hidden">
      {/* BG decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
        <div className="soft-grid absolute inset-0 opacity-30" />
        {/* Big blurred circles */}
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-cyan-500/6 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-blue-500/6 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="section-tag mx-auto mb-5"><Award className="w-3 h-3" />About me</div>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-4 leading-tight">
            Engineering at the{' '}
            <span className="gradient-text-cyan">Edge</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-lg">
            I build things that sit at the intersection of atoms and bits —
            sensors, circuits, firmware, and cloud.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16 items-start">

          {/* ── Terminal card ──────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7 }}
          >
            {/* Terminal window */}
            <div className="glass-bright rounded-2xl overflow-hidden glow-cyan">
              {/* Title bar */}
              <div className="flex items-center gap-2 px-5 py-3 bg-gray-900/70 border-b border-gray-800">
                <span className="w-3 h-3 rounded-full bg-red-500/80" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <span className="w-3 h-3 rounded-full bg-green-500/80" />
                <Terminal className="w-3.5 h-3.5 text-cyan-400 ml-3" />
                <span className="text-xs text-gray-500 font-mono ml-1">frank@portfolio ~ zsh</span>
              </div>

              {/* Terminal body */}
              <div className="p-6 font-mono text-sm space-y-4">
                {terminalLines.map((line, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, x: -8 }} whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.15, duration: 0.4 }}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-cyan-400 font-bold">{line.prompt}</span>
                      <span className="text-white">{line.cmd}</span>
                    </div>
                    <div className="mt-1 pl-4 text-green-400 text-xs leading-relaxed">{line.out}</div>
                  </motion.div>
                ))}

                {/* Blinking cursor line */}
                <div className="flex items-center gap-2 pt-1">
                  <span className="text-cyan-400 font-bold">~$</span>
                  <span className="text-gray-400 cursor-blink text-xs">./run_all_projects.sh</span>
                </div>
              </div>

              {/* Bio below terminal */}
              <div className="px-6 pb-6 space-y-3 text-sm text-gray-400 leading-relaxed border-t border-gray-800 pt-5">
                <p>I'm a <span className="text-cyan-300 font-semibold">3-2 Engineering student at Oberlin College</span> — meaning I'll finish my BA in physics/CS at Oberlin then transfer to an engineering school (Case Western / Columbia) for a second BS in electrical or computer engineering.</p>
                <p>My work spans the full stack: I've designed <span className="text-cyan-300 font-semibold">4-layer PCBs in KiCad 7</span>, simulated analog circuits in Ngspice, built <span className="text-cyan-300 font-semibold">IoT pipelines processing 5,000+ daily readings</span>, and shipped mobile AR apps in 36-hour hackathons.</p>
                <p>Currently managing hardware + software for the <span className="text-cyan-300 font-semibold">Oberlin Environmental Dashboard</span>.</p>
              </div>
            </div>
          </motion.div>

          {/* ── Cards grid ─────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7 }}
            className="grid grid-cols-2 gap-4"
          >
            {cards.map((c, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.45 }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="glass rounded-xl p-5 hover:border-cyan-500/25 hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-300"
              >
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${c.color} flex items-center justify-center mb-3`}>
                  <c.icon className="w-5 h-5 text-white" />
                </div>
                <h4 className="text-white font-bold text-sm mb-1">{c.title}</h4>
                <p className="text-gray-400 text-xs leading-relaxed">{c.body}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ── Stats bar ────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: 0.3, duration: 0.6 }}
          className="glass-bright rounded-2xl p-8"
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 text-center">
            {stats.map((s, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, scale: 0.85 }} whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }} transition={{ delay: 0.4 + i * 0.07 }}
              >
                <div className="text-2xl md:text-3xl font-black gradient-text-cyan mb-1 glow-text-cyan">{s.value}</div>
                <div className="text-[10px] text-gray-500 uppercase tracking-widest leading-snug">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
