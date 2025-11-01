import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Award, Users, Target, Zap, Star } from 'lucide-react';

export default function AchievementsSection() {
  const achievements = [
    {
      icon: Trophy,
      title: 'HackHarvard Participant',
      description: 'Built AR Memory Journal in 36 hours, mastering ARKit without prior experience',
      date: 'Oct 2025',
      color: 'cyan',
      metric: '36 hours'
    },
    {
      icon: Star,
      title: 'STRONG Scholar',
      description: 'Selected as 1 of 16 students from 1,000+ admitted for competitive STEM leadership program',
      date: 'Aug 2024',
      color: 'yellow',
      metric: '1 of 16'
    },
    {
      icon: Users,
      title: 'Soccer Team Captain',
      description: 'Leading 22+ players in practices, match strategy, and team coordination',
      date: 'Oct 2024',
      color: 'green',
      metric: '22+ players'
    },
    {
      icon: Zap,
      title: 'Performance Optimization',
      description: 'Improved UI loading times by 25% and reduced system failures by 40%',
      date: '2024',
      color: 'purple',
      metric: '40% reduction'
    },
    {
      icon: Award,
      title: 'Security Enhancement',
      description: 'Reduced unauthorized access by 35% through AWS Cognito implementation',
      date: 'Dec 2024',
      color: 'red',
      metric: '35% improvement'
    },
    {
      icon: Target,
      title: 'Code Review Excellence',
      description: 'Conducted thorough reviews on 50+ pull requests enhancing team code quality',
      date: '2024-2025',
      color: 'blue',
      metric: '50+ reviews'
    }
  ];

  const colorMap: Record<string, { gradient: string; bg: string; border: string; text: string }> = {
    cyan: { gradient: 'from-cyan-400 to-cyan-600', bg: 'bg-cyan-500/20', border: 'border-cyan-500/50', text: 'text-cyan-400' },
    yellow: { gradient: 'from-yellow-400 to-yellow-600', bg: 'bg-yellow-500/20', border: 'border-yellow-500/50', text: 'text-yellow-400' },
    green: { gradient: 'from-green-400 to-green-600', bg: 'bg-green-500/20', border: 'border-green-500/50', text: 'text-green-400' },
    purple: { gradient: 'from-purple-400 to-purple-600', bg: 'bg-purple-500/20', border: 'border-purple-500/50', text: 'text-purple-400' },
    red: { gradient: 'from-red-400 to-red-600', bg: 'bg-red-500/20', border: 'border-red-500/50', text: 'text-red-400' },
    blue: { gradient: 'from-blue-400 to-blue-600', bg: 'bg-blue-500/20', border: 'border-blue-500/50', text: 'text-blue-400' }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-gray-800 to-gray-900 relative overflow-hidden">
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-500/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Notable <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Achievements</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto rounded-full mb-6" />
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Milestones that showcase dedication, innovation, and impact
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="group relative"
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${colorMap[achievement.color].gradient} rounded-xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-300`} />
              
              <div className={`relative bg-gray-900/80 backdrop-blur-sm border ${colorMap[achievement.color].border} rounded-xl p-6 h-full transition-all duration-300`}>
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${colorMap[achievement.color].gradient} flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                    <achievement.icon className="w-7 h-7 text-white" />
                  </div>
                  <span className={`px-3 py-1 ${colorMap[achievement.color].bg} border ${colorMap[achievement.color].border} rounded-full text-xs font-medium ${colorMap[achievement.color].text}`}>
                    {achievement.date}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                  {achievement.title}
                </h3>
                
                <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                  {achievement.description}
                </p>

                <div className={`mt-auto pt-4 border-t border-gray-700 flex items-center justify-between`}>
                  <span className="text-gray-500 text-xs font-medium">Impact</span>
                  <span className={`text-lg font-bold ${colorMap[achievement.color].text}`}>
                    {achievement.metric}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { label: 'Projects Completed', value: '10+' },
            { label: 'Code Reviews', value: '50+' },
            { label: 'Daily Data Points', value: '10K+' },
            { label: 'Team Members Led', value: '22+' }
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 + (i * 0.1), duration: 0.4 }}
              className="text-center p-6 bg-gray-900/50 border border-cyan-500/20 rounded-xl hover:border-cyan-500/50 transition-all duration-300"
            >
              <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-2">
                {stat.value}
              </div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}


