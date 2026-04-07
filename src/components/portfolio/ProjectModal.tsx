import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, Github, ExternalLink, Calendar, Tag,
  ChevronLeft, ChevronRight, CheckCircle, XCircle,
  Code2, BarChart2, Sliders, Lightbulb, FileText, Copy, Check,
} from 'lucide-react';
import { format } from 'date-fns';
import type { Project } from './types';

interface Props { project: Project | null; onClose: () => void; }
type Tab = 'overview' | 'code' | 'simulation' | 'specs' | 'notes';

function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <button onClick={copy}
      className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-800 hover:bg-cyan-500/20 border border-gray-700 hover:border-cyan-500/50 rounded-lg text-gray-400 hover:text-cyan-400 text-xs transition-all duration-200">
      {copied ? <><Check className="w-3 h-3" /> Copied</> : <><Copy className="w-3 h-3" /> Copy</>}
    </button>
  );
}

export default function ProjectModal({ project, onClose }: Props) {
  const [imgIdx, setImgIdx]       = useState(0);
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [fileIdx, setFileIdx]     = useState(0);

  if (!project) return null;

  const images = project.gallery_images?.length
    ? project.gallery_images
    : project.image_url ? [project.image_url] : [];

  const d = project.details;
  const codeFiles = d?.codeFiles ?? (d?.codeSnippet
    ? [{ ...d.codeSnippet, filename: d.codeSnippet.label }]
    : []);

  const tabs: { id: Tab; label: string; icon: React.ElementType; show: boolean }[] = [
    { id: 'overview',   label: 'Highlights', icon: Lightbulb,  show: true },
    { id: 'code',       label: 'Code',       icon: Code2,      show: codeFiles.length > 0 },
    { id: 'simulation', label: 'Simulation', icon: BarChart2,  show: !!d?.simulationResults?.length },
    { id: 'specs',      label: 'Specs',      icon: Sliders,    show: !!d?.specs?.length },
    { id: 'notes',      label: 'Notes',      icon: FileText,   show: !!d?.designNotes?.length },
  ].filter(t => t.show) as { id: Tab; label: string; icon: React.ElementType; show: boolean }[];

  const isVideo = (u: string) => /\.(mp4|mov|webm|ogg)$/i.test(u);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto"
      >
        <motion.div
          initial={{ scale: 0.90, opacity: 0, y: 32 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.90, opacity: 0, y: 32 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          onClick={e => e.stopPropagation()}
          className="relative w-full max-w-4xl my-4 rounded-2xl overflow-hidden"
          style={{ background: 'linear-gradient(135deg, rgba(15,23,42,0.98) 0%, rgba(2,6,23,0.98) 100%)', border: '1px solid rgba(6,182,212,0.25)' }}
        >
          {/* Neon top line */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-70" />

          {/* ── Gallery ──────────────────────────────────────────────── */}
          {images.length > 0 ? (
            <div className="relative bg-gray-950/60 overflow-hidden" style={{ height: 320 }}>
              <div className="w-full h-full flex items-center justify-center p-4">
                {isVideo(images[imgIdx]) ? (
                  <video key={imgIdx} src={images[imgIdx]}
                    className="max-w-full max-h-full object-contain rounded-xl"
                    controls autoPlay loop muted />
                ) : (
                  <motion.img key={imgIdx}
                    initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.35 }}
                    src={images[imgIdx]} alt={project.title}
                    className="max-w-full max-h-full object-contain rounded-xl" />
                )}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent pointer-events-none" />

              {images.length > 1 && (
                <>
                  <button onClick={e => { e.stopPropagation(); setImgIdx(p => (p - 1 + images.length) % images.length); }}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 glass rounded-full flex items-center justify-center text-white hover:bg-cyan-500/30 transition-all">
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button onClick={e => { e.stopPropagation(); setImgIdx(p => (p + 1) % images.length); }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 glass rounded-full flex items-center justify-center text-white hover:bg-cyan-500/30 transition-all">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                    {images.map((_, i) => (
                      <button key={i} onClick={e => { e.stopPropagation(); setImgIdx(i); }}
                        className={`h-1.5 rounded-full transition-all duration-300 ${i === imgIdx ? 'w-6 bg-cyan-400' : 'w-1.5 bg-white/30'}`} />
                    ))}
                  </div>
                </>
              )}
              <button onClick={onClose}
                className="absolute top-3 right-3 w-9 h-9 glass rounded-full flex items-center justify-center text-white hover:bg-red-500/70 transition-all z-10">
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex justify-end p-4">
              <button onClick={onClose}
                className="w-9 h-9 glass rounded-full flex items-center justify-center text-white hover:bg-red-500/70 transition-all">
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* ── Content ──────────────────────────────────────────────── */}
          <div className="p-6 md:p-8">

            {/* Header */}
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span className="badge-cyan"><Tag className="w-3 h-3" />{project.category}</span>
              {project.completion_date && (
                <span className="flex items-center gap-1.5 text-gray-500 text-xs">
                  <Calendar className="w-3 h-3" />
                  {format(new Date(project.completion_date), 'MMMM yyyy')}
                </span>
              )}
            </div>

            <h2 className="text-2xl md:text-3xl font-black text-white mb-2 leading-tight">{project.title}</h2>
            <p className="text-gray-400 leading-relaxed mb-5 text-sm">{project.description}</p>

            {/* Tech pills */}
            {project.technologies && project.technologies.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {project.technologies.map((t, i) => (
                  <span key={i} className="px-3 py-1 bg-gray-800/80 border border-gray-700/60 rounded-lg text-gray-300 text-xs font-mono hover:border-cyan-500/40 hover:text-cyan-300 transition-colors">
                    {t}
                  </span>
                ))}
              </div>
            )}

            {/* Tabs */}
            {tabs.length > 1 && (
              <div className="flex flex-wrap gap-1 mb-6 border-b border-gray-800">
                {tabs.map(tab => {
                  const Icon = tab.icon;
                  return (
                    <button key={tab.id} onClick={() => { setActiveTab(tab.id); setFileIdx(0); }}
                      className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold rounded-t-lg -mb-px border-b-2 transition-all duration-200 ${
                        activeTab === tab.id
                          ? 'text-cyan-400 border-cyan-400 bg-cyan-400/5'
                          : 'text-gray-500 border-transparent hover:text-gray-300 hover:bg-white/5'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />{tab.label}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Tab Panels */}
            <div className="min-h-[140px]">

              {/* ── Highlights ──────────────────────────────────── */}
              {activeTab === 'overview' && d?.highlights && (
                <ul className="space-y-3">
                  {d.highlights.map((h, i) => (
                    <motion.li key={i} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.07 }}
                      className="flex items-start gap-3 text-sm text-gray-300 leading-relaxed">
                      <span className="shrink-0 mt-0.5 w-5 h-5 rounded-full bg-cyan-500/15 border border-cyan-500/35 flex items-center justify-center text-cyan-400 text-[10px] font-black">
                        {i + 1}
                      </span>
                      {h}
                    </motion.li>
                  ))}
                </ul>
              )}

              {/* ── Code ────────────────────────────────────────── */}
              {activeTab === 'code' && codeFiles.length > 0 && (
                <div>
                  {/* File tabs */}
                  {codeFiles.length > 1 && (
                    <div className="flex gap-1 mb-0 overflow-x-auto pb-0">
                      {codeFiles.map((f, i) => (
                        <button key={i} onClick={() => setFileIdx(i)}
                          className={`shrink-0 px-4 py-2 text-xs font-mono rounded-t-lg border-b-0 transition-all duration-200 border ${
                            fileIdx === i
                              ? 'bg-gray-900 border-gray-700 border-b-gray-900 text-cyan-300 -mb-px z-10'
                              : 'bg-gray-800/40 border-transparent text-gray-500 hover:text-gray-300'
                          }`}
                        >
                          {f.filename}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Code block */}
                  <div className={`bg-[#0d1117] border border-gray-800 rounded-xl overflow-hidden ${codeFiles.length > 1 ? 'rounded-tl-none' : ''}`}>
                    {/* Window chrome */}
                    <div className="flex items-center justify-between px-4 py-2.5 border-b border-gray-800 bg-gray-900/60">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-red-500/80" />
                        <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                        <span className="w-3 h-3 rounded-full bg-green-500/80" />
                        <span className="ml-3 text-xs text-gray-500 font-mono">
                          {codeFiles[fileIdx]?.filename || codeFiles[fileIdx]?.label}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-600 font-mono uppercase">{codeFiles[fileIdx]?.language}</span>
                        <CopyButton code={codeFiles[fileIdx]?.code ?? ''} />
                      </div>
                    </div>
                    <pre className="overflow-x-auto p-5 text-xs leading-6 font-mono text-gray-300 max-h-[420px]">
                      <code>{codeFiles[fileIdx]?.code}</code>
                    </pre>
                  </div>
                </div>
              )}

              {/* ── Simulation ──────────────────────────────────── */}
              {activeTab === 'simulation' && d?.simulationResults && (
                <div>
                  <div className="overflow-x-auto rounded-xl border border-gray-800">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-gray-900/80 text-left">
                          <th className="px-4 py-3 text-gray-500 font-semibold text-xs uppercase tracking-wide">Measurement</th>
                          <th className="px-4 py-3 text-gray-500 font-semibold text-xs uppercase tracking-wide">Measured</th>
                          <th className="px-4 py-3 text-gray-500 font-semibold text-xs uppercase tracking-wide">Expected</th>
                          <th className="px-4 py-3 text-gray-500 font-semibold text-xs uppercase tracking-wide">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {d.simulationResults.map((r, i) => (
                          <motion.tr key={i}
                            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className={`border-t border-gray-800/60 ${r.pass ? 'hover:bg-emerald-500/5' : 'hover:bg-red-500/5'} transition-colors`}
                          >
                            <td className="px-4 py-3 text-gray-300 font-medium text-sm">{r.label}</td>
                            <td className="px-4 py-3 font-mono text-cyan-300 text-sm">{r.value}</td>
                            <td className="px-4 py-3 font-mono text-gray-500 text-sm">{r.expected}</td>
                            <td className="px-4 py-3">
                              {r.pass
                                ? <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-500/15 border border-emerald-500/30 rounded-full text-emerald-400 text-xs font-bold"><CheckCircle className="w-3 h-3" />PASS</span>
                                : <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-red-500/15 border border-red-500/30 rounded-full text-red-400 text-xs font-bold"><XCircle className="w-3 h-3" />FAIL</span>}
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                    {d.simulationResults.filter(r => r.pass).length}/{d.simulationResults.length} tests passing
                  </div>
                </div>
              )}

              {/* ── Specs ───────────────────────────────────────── */}
              {activeTab === 'specs' && d?.specs && (
                <dl className="grid sm:grid-cols-2 gap-3">
                  {d.specs.map((s, i) => (
                    <motion.div key={i}
                      initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.04 }}
                      className="bg-gray-900/60 border border-gray-800 rounded-xl px-4 py-3 hover:border-cyan-500/30 transition-colors">
                      <dt className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold mb-1">{s.label}</dt>
                      <dd className="text-gray-200 font-mono text-sm">{s.value}</dd>
                    </motion.div>
                  ))}
                </dl>
              )}

              {/* ── Notes ───────────────────────────────────────── */}
              {activeTab === 'notes' && d?.designNotes && (
                <ul className="space-y-4">
                  {d.designNotes.map((note, i) => (
                    <motion.li key={i}
                      initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.08 }}
                      className="flex gap-3 text-sm text-gray-300 leading-relaxed pl-3 border-l-2 border-cyan-500/30">
                      {note}
                    </motion.li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer links */}
            <div className="flex flex-wrap gap-3 pt-6 mt-6 border-t border-gray-800">
              {project.github_url && (
                <a href={project.github_url} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 glass rounded-xl text-white text-sm font-semibold hover:border-gray-600 hover:bg-white/5 transition-all duration-200 hover:scale-105">
                  <Github className="w-4 h-4" /> View on GitHub
                </a>
              )}
              {project.demo_url && (
                <a href={project.demo_url} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 btn-primary rounded-xl text-sm">
                  <ExternalLink className="w-4 h-4" /> Live Demo
                </a>
              )}
            </div>
          </div>

          {/* Bottom neon line */}
          <div className="h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
