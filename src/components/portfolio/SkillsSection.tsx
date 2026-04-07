import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Wrench, Code, Cloud, Database, Smartphone, Box, Layers, ChevronDown } from 'lucide-react';

const skillCategories = [
  {
    icon: Code, title: 'Languages', category: 'languages', color: 'cyan',
    skills: [
      { name: 'Python',     level: 95 },
      { name: 'JavaScript', level: 92 },
      { name: 'TypeScript', level: 90 },
      { name: 'Java',       level: 90 },
      { name: 'C / C++',   level: 85 },
      { name: 'Swift',      level: 80 },
      { name: 'SQL',        level: 88 },
    ],
  },
  {
    icon: Wrench, title: 'Frameworks', category: 'frameworks', color: 'blue',
    skills: [
      { name: 'React',       level: 93 },
      { name: 'Tailwind CSS',level: 95 },
      { name: 'Node.js',     level: 88 },
      { name: 'Flutter',     level: 82 },
      { name: 'Unity',       level: 78 },
    ],
  },
  {
    icon: Cloud, title: 'Cloud & DevOps', category: 'cloud', color: 'purple',
    skills: [
      { name: 'AWS (Cognito, S3)', level: 87 },
      { name: 'Firebase',         level: 90 },
      { name: 'Git / GitHub',     level: 93 },
      { name: 'REST APIs',        level: 91 },
      { name: 'CI/CD',            level: 80 },
    ],
  },
  {
    icon: Database, title: 'Data & ML', category: 'data', color: 'pink',
    skills: [
      { name: 'MySQL',          level: 89 },
      { name: 'Scikit-learn',   level: 85 },
      { name: 'Data Pipelines', level: 88 },
      { name: 'Grafana',        level: 82 },
    ],
  },
  {
    icon: Cpu, title: 'IoT & Hardware', category: 'iot', color: 'indigo',
    skills: [
      { name: 'Sensor Networks',      level: 90 },
      { name: 'IoT Systems',          level: 92 },
      { name: 'Real-time Processing', level: 88 },
      { name: 'Embedded Systems',     level: 83 },
      { name: 'Battery Management',   level: 80 },
      { name: 'Solar Power Systems',  level: 78 },
    ],
  },
  {
    icon: Layers, title: 'PCB & Simulation', category: 'pcb', color: 'teal',
    skills: [
      { name: 'KiCad 7',             level: 85 },
      { name: 'LTspice XVII',        level: 82 },
      { name: 'Ngspice 46',          level: 80 },
      { name: 'Analog Circuit Design',level: 83 },
      { name: 'Schematic Capture',   level: 86 },
      { name: '4-Layer PCB Layout',  level: 80 },
    ],
  },
  {
    icon: Box, title: 'CAD & 3D Design', category: 'cad', color: 'emerald',
    skills: [
      { name: 'OpenSCAD',              level: 84 },
      { name: 'Parametric Modelling',  level: 86 },
      { name: 'FDM 3D Printing',       level: 88 },
      { name: 'Enclosure Design',      level: 82 },
      { name: 'Mechanical Tolerancing',level: 78 },
    ],
  },
  {
    icon: Smartphone, title: 'Mobile & AR', category: 'mobile', color: 'rose',
    skills: [
      { name: 'ARKit',           level: 85 },
      { name: 'Xcode',           level: 87 },
      { name: 'iOS Development', level: 84 },
      { name: 'Cross-platform',  level: 80 },
    ],
  },
];

const colorMap: Record<string, { bar: string; text: string; border: string; bg: string; glow: string }> = {
  cyan:    { bar: 'from-cyan-400 to-cyan-600',    text: 'text-cyan-400',    border: 'border-cyan-500/50',    bg: 'bg-cyan-500/10',    glow: 'shadow-cyan-500/25' },
  blue:    { bar: 'from-blue-400 to-blue-600',    text: 'text-blue-400',    border: 'border-blue-500/50',    bg: 'bg-blue-500/10',    glow: 'shadow-blue-500/25' },
  purple:  { bar: 'from-purple-400 to-purple-600',text: 'text-purple-400',  border: 'border-purple-500/50',  bg: 'bg-purple-500/10',  glow: 'shadow-purple-500/25' },
  pink:    { bar: 'from-pink-400 to-pink-600',    text: 'text-pink-400',    border: 'border-pink-500/50',    bg: 'bg-pink-500/10',    glow: 'shadow-pink-500/25' },
  indigo:  { bar: 'from-indigo-400 to-indigo-600',text: 'text-indigo-400',  border: 'border-indigo-500/50',  bg: 'bg-indigo-500/10',  glow: 'shadow-indigo-500/25' },
  teal:    { bar: 'from-teal-400 to-teal-600',    text: 'text-teal-400',    border: 'border-teal-500/50',    bg: 'bg-teal-500/10',    glow: 'shadow-teal-500/25' },
  emerald: { bar: 'from-emerald-400 to-emerald-600',text: 'text-emerald-400',border:'border-emerald-500/50', bg: 'bg-emerald-500/10', glow: 'shadow-emerald-500/25' },
  rose:    { bar: 'from-rose-400 to-rose-600',    text: 'text-rose-400',    border: 'border-rose-500/50',    bg: 'bg-rose-500/10',    glow: 'shadow-rose-500/25' },
};

const tools = ['SolarWinds','AirTable','Microsoft Office','Agile','Scrum','Protocol Analyzers','Version Control','Code Review','JIRA','Figma'];

export default function SkillsSection() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const filtered = selectedCategory === 'all'
    ? skillCategories
    : skillCategories.filter(c => c.category === selectedCategory);

  return (
    <section id="skills" className="relative py-28 overflow-hidden">
      {/* BG */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
        <div className="soft-grid absolute inset-0 opacity-25" />
        <div className="absolute -top-64 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-cyan-500/5 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="section-tag mx-auto mb-5"><Code className="w-3 h-3" />Technical Skills</div>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-4">
            The Full{' '}
            <span className="gradient-text-cyan">Stack</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto mb-10">
            From millivolt analog signals to cloud dashboards — every layer.
          </p>

          {/* Filter pills */}
          <div className="flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-all duration-200 ${
                selectedCategory === 'all'
                  ? 'bg-cyan-400 border-cyan-400 text-slate-950'
                  : 'border-gray-700 text-gray-400 hover:border-cyan-500/50 hover:text-cyan-400'
              }`}
            >All</button>
            {skillCategories.map(cat => (
              <button
                key={cat.category}
                onClick={() => setSelectedCategory(cat.category)}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-all duration-200 ${
                  selectedCategory === cat.category
                    ? `bg-gradient-to-r ${colorMap[cat.color].bar} border-transparent text-white shadow-lg ${colorMap[cat.color].glow}`
                    : 'border-gray-700 text-gray-400 hover:border-gray-600 hover:text-gray-200'
                }`}
              >
                {cat.title}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Cards grid */}
        <AnimatePresence mode="popLayout">
          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((cat, ci) => {
              const c = colorMap[cat.color];
              const isExpanded = expandedCard === cat.category;
              const shown = isExpanded ? cat.skills : cat.skills.slice(0, 4);

              return (
                <motion.div
                  layout
                  key={cat.category}
                  initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: ci * 0.06, duration: 0.4 }}
                  className={`group glass rounded-2xl p-5 hover:shadow-xl hover:${c.glow} transition-all duration-300 hover:border-current hover:scale-[1.02] cursor-pointer ${c.border}`}
                  onClick={() => setExpandedCard(isExpanded ? null : cat.category)}
                >
                  {/* Card header */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${c.bar} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg ${c.glow}`}>
                        <cat.icon className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="text-white font-bold text-sm">{cat.title}</h3>
                    </div>
                    <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.25 }}>
                      <ChevronDown className={`w-4 h-4 ${c.text} opacity-60`} />
                    </motion.div>
                  </div>

                  {/* Skills */}
                  <div className="space-y-3">
                    {shown.map((skill, si) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: si * 0.04 }}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-gray-300 text-xs font-medium">{skill.name}</span>
                          <span className={`text-xs font-bold ${c.text}`}>{skill.level}%</span>
                        </div>
                        <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ delay: ci * 0.06 + si * 0.04, duration: 0.9, ease: 'easeOut' }}
                            className={`h-full bg-gradient-to-r ${c.bar} rounded-full relative`}
                          >
                            <div className="absolute right-0 top-0 bottom-0 w-2 bg-white/40 rounded-full" />
                          </motion.div>
                        </div>
                      </motion.div>
                    ))}

                    {cat.skills.length > 4 && !isExpanded && (
                      <div className={`text-xs ${c.text} opacity-70 text-center pt-1`}>
                        +{cat.skills.length - 4} more · click to expand
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* Tools cloud */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-14 text-center"
        >
          <p className="text-gray-500 text-xs uppercase tracking-widest font-semibold mb-5">Additional tools</p>
          <div className="flex flex-wrap justify-center gap-3">
            {tools.map((tool, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + i * 0.04, duration: 0.3 }}
                whileHover={{ scale: 1.08, y: -2 }}
                className="px-4 py-1.5 glass rounded-full text-gray-400 text-xs font-medium hover:text-cyan-300 hover:border-cyan-500/40 transition-all duration-200 cursor-default"
              >
                {tool}
              </motion.span>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
