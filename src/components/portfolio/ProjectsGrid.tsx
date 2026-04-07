import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Calendar, Image, Cpu, Code2, Box, Layers } from 'lucide-react';
import { format } from 'date-fns';
import ProjectModal from './ProjectModal';
import TiltCard from './TiltCard';
import FloatingChips from './FloatingChips';
import AnimatedHeroText, { Typewriter, CountUp } from './AnimatedHeroText';
import type { Project } from './types';

interface ProjectsGridProps {
  projects: Project[];
}

const CATEGORY_META: Record<string, { icon: React.ElementType; color: string; border: string; bg: string }> = {
  'IoT':              { icon: Cpu,    color: 'text-cyan-400',    border: 'border-cyan-500/50',   bg: 'bg-cyan-500/10'   },
  'Embedded Systems': { icon: Cpu,    color: 'text-cyan-400',    border: 'border-cyan-500/50',   bg: 'bg-cyan-500/10'   },
  'PCB Design':       { icon: Layers, color: 'text-blue-400',    border: 'border-blue-500/50',   bg: 'bg-blue-500/10'   },
  'Circuit Simulation': { icon: Layers, color: 'text-blue-400', border: 'border-blue-500/50',   bg: 'bg-blue-500/10'   },
  'CAD / 3D':         { icon: Box,    color: 'text-emerald-400', border: 'border-emerald-500/50',bg: 'bg-emerald-500/10'},
  'AR / Mobile':      { icon: Code2,  color: 'text-purple-400',  border: 'border-purple-500/50', bg: 'bg-purple-500/10' },
};

function categoryMeta(cat: string) {
  return CATEGORY_META[cat] ?? { icon: Code2, color: 'text-cyan-400', border: 'border-cyan-500/50', bg: 'bg-cyan-500/10' };
}

// Normalise for the filter tabs (PCB Design + Circuit Simulation → "PCB & Simulation")
function filterLabel(cat: string) {
  if (cat === 'Circuit Simulation') return 'PCB Design';
  return cat;
}

export default function ProjectsGrid({ projects }: ProjectsGridProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const filterOptions = ['All', ...Array.from(new Set(projects.map(p => filterLabel(p.category))))];

  const visible = activeFilter === 'All'
    ? projects
    : projects.filter(p => filterLabel(p.category) === activeFilter);

  return (
    <>
      <section id="projects" className="pt-24 pb-32 min-h-screen relative overflow-hidden">
        <div className="absolute inset-0 soft-grid opacity-15 pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* ── Hero header ─────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            {/* Profile */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.7, type: 'spring', stiffness: 200 }}
              className="mb-10"
            >
              <div className="relative w-52 h-52 mx-auto">
                {/* Floating tech chips */}
                <FloatingChips />
                {/* Outer spinning ring */}
                <div className="spin-slow absolute inset-[-12px] rounded-full border border-dashed border-cyan-500/30" />
                {/* Inner spinning ring */}
                <div className="spin-slow-reverse absolute inset-[-6px] rounded-full border border-cyan-400/20" />
                {/* Glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full opacity-60 blur-2xl" />
                {/* Photo */}
                <img
                  src="/images/profile.jpg"
                  alt="Frank Kusi Appiah"
                  className="relative w-full h-full rounded-full object-cover border-2 border-cyan-400/60 shadow-2xl shadow-cyan-500/50"
                  style={{ objectPosition: 'center 20%' }}
                />
                {/* Online indicator */}
                <div className="absolute bottom-2 right-2 w-4 h-4 bg-emerald-400 rounded-full border-2 border-gray-900 shadow-lg shadow-emerald-400/50" />
              </div>
            </motion.div>

            {/* 3D letter-flip name */}
            <AnimatedHeroText />

            {/* Typewriter subtitle */}
            <p className="text-lg md:text-xl text-gray-300 mb-2 h-7">
              <Typewriter text="I build things at the intersection of atoms and bits." delay={1.4} />
            </p>
            <p className="text-sm text-gray-500 mb-10 max-w-xl mx-auto font-mono">
              Full-Stack · IoT · PCB Design · 3D CAD · Circuit Simulation
            </p>

            {/* Count-up stats */}
            <div className="flex flex-wrap justify-center gap-4 mb-14">
              {[
                { label: 'Projects',    num: projects.length, suffix: '' },
                { label: 'PCB Designs', num: 3,  suffix: '' },
                { label: 'CAD Models',  num: 3,  suffix: '' },
                { label: 'Sensor Reads/Day', num: 5000, suffix: '+' },
              ].map((s, i) => (
                <TiltCard key={s.label} maxTilt={18} scale={1.08} glare
                  className="glass-panel px-6 py-4 rounded-xl text-center cursor-default">
                  <div className="text-3xl font-black gradient-text-cyan">
                    <CountUp target={s.num} suffix={s.suffix} delay={i * 120} duration={1400} />
                  </div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-widest mt-0.5">{s.label}</div>
                </TiltCard>
              ))}
            </div>

            <motion.h2
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.2, duration: 0.6 }}
              className="text-3xl md:text-4xl font-black text-white mb-4"
            >
              Things I Have{' '}
              <span className="gradient-text-cyan">Built</span>
            </motion.h2>
            <motion.div
              initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
              transition={{ delay: 2.4, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto rounded-full mb-8 origin-left"
            />

            {/* ── Category filter tabs ─────────────────────────────────── */}
            <div className="flex flex-wrap justify-center gap-2">
              {filterOptions.map(opt => (
                <button
                  key={opt}
                  onClick={() => setActiveFilter(opt)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200 ${
                    activeFilter === opt
                      ? 'bg-cyan-400 border-cyan-300 text-slate-950'
                      : 'border-gray-600 text-gray-300 hover:border-cyan-400 hover:text-cyan-300 hover:bg-cyan-400/10'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </motion.div>

          {/* ── Project grid ─────────────────────────────────────────────── */}
          <AnimatePresence mode="popLayout">
            {visible.length === 0 ? (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
                <div className="text-gray-400 text-lg">No projects in this category yet.</div>
              </motion.div>
            ) : (
              <motion.div layout className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {visible.map((project, index) => {
                  const meta = categoryMeta(project.category);
                  const Icon = meta.icon;
                  const thumb =
                    (project.gallery_images && project.gallery_images[0]) || project.image_url;
                  const isFeatured = project.featured;

                  return (
                    <motion.div
                      layout
                      key={project.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ delay: index * 0.05, duration: 0.4 }}
                      className={isFeatured ? 'md:col-span-2 xl:col-span-2' : ''}
                    >
                    <TiltCard
                      maxTilt={10}
                      scale={1.03}
                      glare
                      className="w-full h-full"
                    >
                    <div
                      onClick={() => setSelectedProject(project)}
                      className="group relative glass-panel rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:border-cyan-400/60 hover:shadow-2xl hover:shadow-cyan-500/20"
                    >
                      {/* Thumbnail */}
                      <div className={`relative overflow-hidden ${isFeatured ? 'h-60' : 'h-44'}`}>
                        {thumb ? (
                          thumb.match(/\.(mp4|mov|webm|ogg)$/i) ? (
                            <video src={thumb} className="w-full h-full object-cover" muted loop playsInline />
                          ) : (
                            <img
                              src={thumb}
                              alt={project.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          )
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                            <Icon className="w-16 h-16 text-gray-700" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                        {/* Gallery badge */}
                        {project.gallery_images && project.gallery_images.length > 1 && (
                          <div className="absolute bottom-3 left-3 flex items-center gap-1 px-2.5 py-1 bg-gray-900/80 backdrop-blur-sm rounded-full text-white text-xs">
                            <Image className="w-3 h-3" />
                            {project.gallery_images.length} photos
                          </div>
                        )}

                        {/* Featured star */}
                        {isFeatured && (
                          <div className="absolute top-3 left-3 px-2.5 py-1 bg-cyan-400/20 border border-cyan-300/40 backdrop-blur-sm rounded-full text-cyan-300 text-xs font-semibold">
                            ★ Featured
                          </div>
                        )}

                        {/* Ext links */}
                        <div className="absolute top-3 right-3 flex gap-1.5">
                          {project.github_url && (
                            <button
                              onClick={e => { e.stopPropagation(); window.open(project.github_url, '_blank'); }}
                              className="p-1.5 bg-gray-900/80 backdrop-blur-sm rounded-lg text-white hover:bg-cyan-500 transition-colors"
                            >
                              <Github className="w-4 h-4" />
                            </button>
                          )}
                          {project.demo_url && (
                            <button
                              onClick={e => { e.stopPropagation(); window.open(project.demo_url, '_blank'); }}
                              className="p-1.5 bg-gray-900/80 backdrop-blur-sm rounded-lg text-white hover:bg-cyan-500 transition-colors"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Card body */}
                      <div className="p-5">
                        {/* Category + date */}
                        <div className="flex items-center gap-2 mb-3">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border ${meta.color} ${meta.border} ${meta.bg}`}>
                            <Icon className="w-3 h-3" />
                            {project.category}
                          </span>
                          {project.completion_date && (
                            <span className="flex items-center gap-1 text-gray-500 text-xs ml-auto">
                              <Calendar className="w-3 h-3" />
                              {format(new Date(project.completion_date), 'MMM yyyy')}
                            </span>
                          )}
                        </div>

                        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors line-clamp-2 leading-snug">
                          {project.title}
                        </h3>

                        <p className="text-gray-400 text-sm mb-4 line-clamp-3 leading-relaxed">
                          {project.description}
                        </p>

                        {/* Tech pills */}
                        {project.technologies && project.technologies.length > 0 && (
                          <div className="flex flex-wrap gap-1.5">
                            {project.technologies.slice(0, 5).map((tech, i) => (
                              <span key={i} className="px-2 py-0.5 bg-gray-700/60 rounded-md text-gray-300 text-xs">
                                {tech}
                              </span>
                            ))}
                            {project.technologies.length > 5 && (
                              <span className="px-2 py-0.5 bg-gray-700/60 rounded-md text-cyan-400 text-xs font-semibold">
                                +{project.technologies.length - 5}
                              </span>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Hover glow border */}
                      <div className="absolute inset-0 border-2 border-cyan-400/0 group-hover:border-cyan-300/30 rounded-2xl transition-all duration-300 pointer-events-none" />
                    </div>
                    </TiltCard>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </>
  );
}
