import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, Github, ExternalLink, Calendar, Tag,
  ChevronLeft, ChevronRight, CheckCircle, XCircle,
  Code2, BarChart2, Sliders, Lightbulb, FileText,
} from 'lucide-react';
import { format } from 'date-fns';
import type { Project } from './types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

type Tab = 'overview' | 'code' | 'simulation' | 'specs' | 'notes';

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<Tab>('overview');

  if (!project) return null;

  const images =
    project.gallery_images && project.gallery_images.length > 0
      ? project.gallery_images
      : project.image_url
      ? [project.image_url]
      : [];

  const d = project.details;
  const hasCode = !!d?.codeSnippet;
  const hasSim  = !!d?.simulationResults?.length;
  const hasSpecs = !!d?.specs?.length;
  const hasNotes = !!d?.designNotes?.length;

  const tabs: { id: Tab; label: string; icon: React.ElementType; show: boolean }[] = (
    [
      { id: 'overview'   as Tab, label: 'Highlights', icon: Lightbulb,  show: true },
      { id: 'code'       as Tab, label: 'Code',       icon: Code2,      show: hasCode },
      { id: 'simulation' as Tab, label: 'Simulation', icon: BarChart2,  show: hasSim },
      { id: 'specs'      as Tab, label: 'Specs',      icon: Sliders,    show: hasSpecs },
      { id: 'notes'      as Tab, label: 'Notes',      icon: FileText,   show: hasNotes },
    ] as { id: Tab; label: string; icon: React.ElementType; show: boolean }[]
  ).filter(t => t.show);

  const isVideo = (url: string) => /\.(mp4|mov|webm|ogg)$/i.test(url);

  const nextImage = () => setCurrentImageIndex(p => (p + 1) % images.length);
  const prevImage = () => setCurrentImageIndex(p => (p - 1 + images.length) % images.length);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
      >
        <motion.div
          initial={{ scale: 0.92, opacity: 0, y: 24 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.92, opacity: 0, y: 24 }}
          onClick={e => e.stopPropagation()}
          className="bg-gray-900 border border-cyan-500/30 rounded-2xl w-full max-w-4xl my-4 overflow-hidden"
        >
          {/* ── Media gallery ─────────────────────────────────────────────── */}
          {images.length > 0 ? (
            <div className="relative bg-gray-950" style={{ height: '340px' }}>
              <div className="w-full h-full flex items-center justify-center p-3">
                {isVideo(images[currentImageIndex]) ? (
                  <video
                    key={currentImageIndex}
                    src={images[currentImageIndex]}
                    className="max-w-full max-h-full object-contain rounded-lg"
                    controls autoPlay loop muted
                  />
                ) : (
                  <img
                    key={currentImageIndex}
                    src={images[currentImageIndex]}
                    alt={`${project.title} ${currentImageIndex + 1}`}
                    className="max-w-full max-h-full object-contain rounded-lg"
                  />
                )}
              </div>

              {/* Navigation arrows */}
              {images.length > 1 && (
                <>
                  <button onClick={e => { e.stopPropagation(); prevImage(); }}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-gray-900/80 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-cyan-500 transition-colors">
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button onClick={e => { e.stopPropagation(); nextImage(); }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-gray-900/80 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-cyan-500 transition-colors">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                    {images.map((_, i) => (
                      <button key={i} onClick={e => { e.stopPropagation(); setCurrentImageIndex(i); }}
                        className={`h-1.5 rounded-full transition-all duration-300 ${i === currentImageIndex ? 'w-6 bg-cyan-500' : 'w-1.5 bg-white/40 hover:bg-white/70'}`}
                      />
                    ))}
                  </div>
                </>
              )}

              {/* Close button */}
              <button onClick={onClose}
                className="absolute top-3 right-3 w-9 h-9 bg-gray-900/80 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-red-500 transition-colors z-10">
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="relative p-4 bg-gray-800/40 flex justify-end">
              <button onClick={onClose}
                className="w-9 h-9 bg-gray-700 rounded-full flex items-center justify-center text-white hover:bg-red-500 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* ── Content area ─────────────────────────────────────────────── */}
          <div className="p-6 md:p-8">
            {/* Header */}
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-cyan-500/15 border border-cyan-500/40 rounded-full text-cyan-400 text-sm font-medium">
                <Tag className="w-3 h-3" />
                {project.category}
              </span>
              {project.completion_date && (
                <span className="flex items-center gap-1.5 text-gray-400 text-sm">
                  <Calendar className="w-3.5 h-3.5" />
                  {format(new Date(project.completion_date), 'MMMM yyyy')}
                </span>
              )}
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{project.title}</h2>
            <p className="text-gray-400 leading-relaxed mb-6">{project.description}</p>

            {/* Tech pills */}
            {project.technologies && project.technologies.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {project.technologies.map((tech, i) => (
                  <span key={i} className="px-3 py-1 bg-gray-800 border border-gray-700 rounded-lg text-gray-300 text-sm hover:border-cyan-500/40 hover:text-cyan-400 transition-colors">
                    {tech}
                  </span>
                ))}
              </div>
            )}

            {/* Tab bar */}
            {tabs.length > 1 && (
              <div className="flex flex-wrap gap-1 mb-6 border-b border-gray-800 pb-0">
                {tabs.map(tab => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium rounded-t-lg transition-all duration-200 border-b-2 -mb-px ${
                        activeTab === tab.id
                          ? 'text-cyan-400 border-cyan-500 bg-cyan-500/5'
                          : 'text-gray-400 border-transparent hover:text-gray-200 hover:bg-gray-800/50'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Tab content */}
            <div className="min-h-[120px]">
              {/* ── Highlights ── */}
              {activeTab === 'overview' && d?.highlights && (
                <ul className="space-y-2.5">
                  {d.highlights.map((h, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06 }}
                      className="flex items-start gap-3 text-gray-300 text-sm leading-relaxed"
                    >
                      <span className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400 text-xs font-bold">{i + 1}</span>
                      {h}
                    </motion.li>
                  ))}
                </ul>
              )}

              {/* ── Code snippet ── */}
              {activeTab === 'code' && d?.codeSnippet && (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-cyan-400 uppercase tracking-widest">{d.codeSnippet.label}</span>
                    <span className="px-2.5 py-0.5 bg-gray-800 border border-gray-700 rounded text-gray-400 text-xs font-mono">{d.codeSnippet.language}</span>
                  </div>
                  <div className="relative bg-gray-950 border border-gray-800 rounded-xl overflow-hidden">
                    {/* Fake traffic lights */}
                    <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-gray-800 bg-gray-900/60">
                      <span className="w-3 h-3 rounded-full bg-red-500/70" />
                      <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
                      <span className="w-3 h-3 rounded-full bg-green-500/70" />
                      <span className="ml-3 text-xs text-gray-500 font-mono">{d.codeSnippet.label}</span>
                    </div>
                    <pre className="overflow-x-auto p-5 text-xs leading-relaxed font-mono text-gray-300 max-h-96">
                      <code>{d.codeSnippet.code}</code>
                    </pre>
                  </div>
                </div>
              )}

              {/* ── Simulation results ── */}
              {activeTab === 'simulation' && d?.simulationResults && (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left border-b border-gray-800">
                        <th className="pb-2 pr-4 text-gray-500 font-medium text-xs uppercase tracking-wide">Measurement</th>
                        <th className="pb-2 pr-4 text-gray-500 font-medium text-xs uppercase tracking-wide">Measured</th>
                        <th className="pb-2 pr-4 text-gray-500 font-medium text-xs uppercase tracking-wide">Expected</th>
                        <th className="pb-2 text-gray-500 font-medium text-xs uppercase tracking-wide">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {d.simulationResults.map((r, i) => (
                        <motion.tr
                          key={i}
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.05 }}
                          className="border-b border-gray-800/60 hover:bg-gray-800/30 transition-colors"
                        >
                          <td className="py-3 pr-4 text-gray-300 font-medium">{r.label}</td>
                          <td className="py-3 pr-4 font-mono text-cyan-300 text-sm">{r.value}</td>
                          <td className="py-3 pr-4 font-mono text-gray-400 text-sm">{r.expected}</td>
                          <td className="py-3">
                            {r.pass ? (
                              <span className="inline-flex items-center gap-1 text-emerald-400 text-xs font-semibold">
                                <CheckCircle className="w-3.5 h-3.5" /> PASS
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-red-400 text-xs font-semibold">
                                <XCircle className="w-3.5 h-3.5" /> FAIL
                              </span>
                            )}
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{d.simulationResults.filter(r => r.pass).length}/{d.simulationResults.length} tests passing</span>
                  </div>
                </div>
              )}

              {/* ── Specs ── */}
              {activeTab === 'specs' && d?.specs && (
                <dl className="grid sm:grid-cols-2 gap-3">
                  {d.specs.map((s, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.04 }}
                      className="bg-gray-800/50 border border-gray-700/60 rounded-lg px-4 py-3"
                    >
                      <dt className="text-xs text-gray-500 uppercase tracking-wide font-medium mb-1">{s.label}</dt>
                      <dd className="text-gray-200 font-mono text-sm">{s.value}</dd>
                    </motion.div>
                  ))}
                </dl>
              )}

              {/* ── Design notes ── */}
              {activeTab === 'notes' && d?.designNotes && (
                <ul className="space-y-4">
                  {d.designNotes.map((note, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.07 }}
                      className="flex gap-3 text-sm text-gray-300 leading-relaxed"
                    >
                      <span className="shrink-0 mt-1 w-1.5 h-1.5 rounded-full bg-cyan-500 mt-2" />
                      {note}
                    </motion.li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer links */}
            <div className="flex flex-wrap gap-3 pt-6 mt-4 border-t border-gray-800">
              {project.github_url && (
                <a href={project.github_url} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg text-white text-sm transition-all duration-200 hover:scale-105">
                  <Github className="w-4 h-4" />
                  View on GitHub
                </a>
              )}
              {project.demo_url && (
                <a href={project.demo_url} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 rounded-lg text-white text-sm font-semibold transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/40">
                  <ExternalLink className="w-4 h-4" />
                  Live Demo
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
