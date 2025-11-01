import { useState } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Wrench, Code, Cloud, Database, Smartphone } from 'lucide-react';

export default function SkillsSection() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const skillCategories = [
    {
      icon: Code,
      title: 'Languages',
      skills: [
        { name: 'Python', level: 95 },
        { name: 'Java', level: 90 },
        { name: 'C/C++', level: 85 },
        { name: 'JavaScript', level: 92 },
        { name: 'TypeScript', level: 90 },
        { name: 'Swift', level: 80 },
        { name: 'SQL', level: 88 }
      ],
      color: 'cyan',
      category: 'languages'
    },
    {
      icon: Wrench,
      title: 'Frameworks',
      skills: [
        { name: 'React', level: 93 },
        { name: 'Node.js', level: 88 },
        { name: 'Tailwind CSS', level: 95 },
        { name: 'Flutter', level: 82 },
        { name: 'Unity', level: 78 }
      ],
      color: 'blue',
      category: 'frameworks'
    },
    {
      icon: Cloud,
      title: 'Cloud & DevOps',
      skills: [
        { name: 'AWS (Cognito, S3)', level: 87 },
        { name: 'Firebase', level: 90 },
        { name: 'Git/GitHub', level: 93 },
        { name: 'REST APIs', level: 91 },
        { name: 'CI/CD', level: 80 }
      ],
      color: 'purple',
      category: 'cloud'
    },
    {
      icon: Database,
      title: 'Data & ML',
      skills: [
        { name: 'MySQL', level: 89 },
        { name: 'Scikit-learn', level: 85 },
        { name: 'Data Pipelines', level: 88 },
        { name: 'Grafana', level: 82 }
      ],
      color: 'pink',
      category: 'data'
    },
    {
      icon: Cpu,
      title: 'IoT & Hardware',
      skills: [
        { name: 'Sensor Networks', level: 90 },
        { name: 'IoT Systems', level: 92 },
        { name: 'Real-time Processing', level: 88 },
        { name: 'Embedded Systems', level: 83 }
      ],
      color: 'indigo',
      category: 'iot'
    },
    {
      icon: Smartphone,
      title: 'Mobile & AR',
      skills: [
        { name: 'ARKit', level: 85 },
        { name: 'Xcode', level: 87 },
        { name: 'iOS Development', level: 84 },
        { name: 'Cross-platform', level: 80 }
      ],
      color: 'emerald',
      category: 'mobile'
    }
  ];

  const colorMap: Record<string, { bg: string; text: string; border: string }> = {
    cyan: { bg: 'from-cyan-400 to-cyan-600', text: 'text-cyan-400', border: 'border-cyan-500' },
    blue: { bg: 'from-blue-400 to-blue-600', text: 'text-blue-400', border: 'border-blue-500' },
    purple: { bg: 'from-purple-400 to-purple-600', text: 'text-purple-400', border: 'border-purple-500' },
    pink: { bg: 'from-pink-400 to-pink-600', text: 'text-pink-400', border: 'border-pink-500' },
    indigo: { bg: 'from-indigo-400 to-indigo-600', text: 'text-indigo-400', border: 'border-indigo-500' },
    emerald: { bg: 'from-emerald-400 to-emerald-600', text: 'text-emerald-400', border: 'border-emerald-500' }
  };

  const filteredCategories = selectedCategory === 'all' 
    ? skillCategories 
    : skillCategories.filter(cat => cat.category === selectedCategory);

  return (
    <section className="py-20 bg-gray-800 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(cyan 1px, transparent 1px), linear-gradient(90deg, cyan 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Skills</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto rounded-full mb-6" />
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
            Comprehensive expertise across multiple domains with measurable proficiency
          </p>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                selectedCategory === 'all'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg'
                  : 'bg-gray-700/50 text-gray-300 hover:bg-gray-700'
              }`}
            >
              All Skills
            </button>
            {skillCategories.map((cat, i) => (
              <button
                key={i}
                onClick={() => setSelectedCategory(cat.category)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  selectedCategory === cat.category
                    ? `bg-gradient-to-r ${colorMap[cat.color].bg} text-white shadow-lg`
                    : 'bg-gray-700/50 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {cat.title}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group bg-gradient-to-br from-gray-900/80 to-gray-900/40 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:border-cyan-500/50 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/10"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colorMap[category.color].bg} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <category.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">{category.title}</h3>
              </div>
              
              <div className="space-y-4">
                {category.skills.map((skill, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: (index * 0.1) + (i * 0.05), duration: 0.4 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-300 text-sm font-medium">{skill.name}</span>
                      <span className={`text-sm font-bold ${colorMap[category.color].text}`}>
                        {skill.level}%
                      </span>
                    </div>
                    <div className="h-2 bg-gray-700/50 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ delay: (index * 0.1) + (i * 0.05) + 0.2, duration: 0.8, ease: "easeOut" }}
                        className={`h-full bg-gradient-to-r ${colorMap[category.color].bg} rounded-full relative`}
                      >
                        <div className="absolute inset-0 bg-white/20 animate-pulse" />
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Technologies */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-12 text-center"
        >
          <h3 className="text-xl font-bold text-white mb-6">Additional Tools & Technologies</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {['SolarWinds', 'AirTable', 'Microsoft Office', 'Agile', 'Scrum', 'Protocol Analyzers', 'Version Control', 'Code Review'].map((tool, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + (i * 0.05), duration: 0.3 }}
                className="px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-full text-gray-300 text-sm hover:border-cyan-500/50 hover:bg-gray-700 hover:text-cyan-400 transition-all duration-300 cursor-default"
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


