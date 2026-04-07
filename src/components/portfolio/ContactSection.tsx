import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, MapPin, Send, Sparkles } from 'lucide-react';

const links = [
  {
    icon: Mail,
    label: 'Email',
    handle: 'fkusiappiah@oberlin.edu',
    href: 'mailto:fkusiappiah@oberlin.edu',
    color: 'from-cyan-500 to-blue-600',
    glow: 'shadow-cyan-500/30',
    border: 'hover:border-cyan-500/40',
  },
  {
    icon: Github,
    label: 'GitHub',
    handle: 'github.com/2024frank',
    href: 'https://github.com/2024frank',
    color: 'from-gray-500 to-gray-700',
    glow: 'shadow-gray-500/30',
    border: 'hover:border-gray-500/40',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    handle: 'frank-kusi-appiah',
    href: 'https://www.linkedin.com/in/frank-kusi-appiah-260a95237/',
    color: 'from-blue-600 to-indigo-600',
    glow: 'shadow-blue-500/30',
    border: 'hover:border-blue-500/40',
  },
  {
    icon: MapPin,
    label: 'Location',
    handle: 'Oberlin, OH  ·  Open to Remote',
    href: null,
    color: 'from-emerald-500 to-teal-600',
    glow: 'shadow-emerald-500/30',
    border: 'hover:border-emerald-500/40',
  },
];

export default function ContactSection() {
  return (
    <section id="contact" className="relative py-28 overflow-hidden">
      {/* BG */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
        <div className="soft-grid absolute inset-0 opacity-20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-cyan-500/5 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="section-tag mx-auto mb-5"><Send className="w-3 h-3" />Contact</div>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-4">
            Let's{' '}
            <span className="gradient-text-cyan">Build</span>
            {' '}Something
          </h2>
          <p className="text-gray-400 text-lg max-w-lg mx-auto">
            Open to hardware engineering internships, research roles, and ambitious side projects.
          </p>
        </motion.div>

        {/* Links grid */}
        <div className="grid sm:grid-cols-2 gap-4 mb-10">
          {links.map((l, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -4 }}
            >
              {l.href ? (
                <a href={l.href}
                  target={l.href.startsWith('http') ? '_blank' : undefined}
                  rel={l.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className={`flex items-center gap-4 p-5 glass rounded-2xl ${l.border} hover:shadow-xl ${l.glow} transition-all duration-300 group shine`}
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${l.color} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                    <l.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 uppercase tracking-widest font-semibold mb-0.5">{l.label}</div>
                    <div className="text-white font-semibold text-sm group-hover:text-cyan-300 transition-colors">{l.handle}</div>
                  </div>
                </a>
              ) : (
                <div className={`flex items-center gap-4 p-5 glass rounded-2xl transition-all duration-300`}>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${l.color} flex items-center justify-center shrink-0`}>
                    <l.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 uppercase tracking-widest font-semibold mb-0.5">{l.label}</div>
                    <div className="text-white font-semibold text-sm">{l.handle}</div>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* CTA banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: 0.4, duration: 0.6 }}
          className="relative glass-bright rounded-2xl p-8 text-center overflow-hidden"
        >
          {/* Animated glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-blue-500/8 to-purple-500/5 rounded-2xl" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />

          <div className="relative z-10">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Sparkles className="w-5 h-5 text-cyan-400" />
              <span className="text-cyan-400 font-bold text-sm uppercase tracking-widest">Open to Opportunities</span>
              <Sparkles className="w-5 h-5 text-cyan-400" />
            </div>
            <h3 className="text-2xl md:text-3xl font-black text-white mb-2">
              Hardware · Embedded · Full-Stack · Research
            </h3>
            <p className="text-gray-400 max-w-md mx-auto text-sm leading-relaxed mb-6">
              If you're building something at the intersection of hardware and software, I'd love to hear about it.
            </p>
            <a href="mailto:fkusiappiah@oberlin.edu"
              className="btn-primary inline-flex rounded-xl">
              <Mail className="w-4 h-4" />
              Send a message
            </a>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ delay: 0.6 }}
          className="text-center text-gray-600 text-xs mt-12 font-mono"
        >
          © {new Date().getFullYear()} Frank Kusi Appiah · Built with React + TypeScript + Framer Motion
        </motion.p>
      </div>
    </section>
  );
}
