import React from 'react';
import { motion } from 'framer-motion';
import { Code, Lightbulb, Users, Rocket, Award, Heart } from 'lucide-react';

export default function AboutSection() {
  const highlights = [
    {
      icon: Code,
      title: 'Full-Stack Developer',
      description: 'Proficient in building end-to-end solutions from hardware sensors to cloud dashboards'
    },
    {
      icon: Lightbulb,
      title: 'IoT Innovator',
      description: 'Designing and deploying distributed sensor networks processing 10,000+ readings daily'
    },
    {
      icon: Users,
      title: 'Team Leader',
      description: 'Captain of Oberlin Soccer Club, leading 22+ players with strategic thinking'
    },
    {
      icon: Rocket,
      title: 'Fast Learner',
      description: 'Built AR app at HackHarvard in 36 hours with zero prior ARKit experience'
    }
  ];

  return (
    <section id="about" className="py-20 bg-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle, cyan 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
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
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Me</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl blur-2xl opacity-20" />
              <div className="relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm border border-cyan-500/30 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-white mb-4">Engineering the Future</h3>
                <div className="space-y-4 text-gray-300 leading-relaxed">
                  <p>
                    I'm a <span className="text-cyan-400 font-semibold">3-2 Engineering student at Oberlin College</span>, 
                    passionate about creating intelligent systems that seamlessly integrate hardware and software. 
                    My journey spans from deploying IoT sensor networks to building full-stack applications with modern web technologies.
                  </p>
                  <p>
                    As a <span className="text-cyan-400 font-semibold">STRONG Scholar</span> (selected as 1 of 16 from over 1,000 students), 
                    I've developed expertise in Python, Java, JavaScript/TypeScript, and cloud technologies. My work focuses on 
                    real-time data processing, machine learning, and creating user-centric solutions.
                  </p>
                  <p>
                    Currently, I'm managing hardware and software infrastructure for the 
                    <span className="text-cyan-400 font-semibold"> Oberlin Environmental Dashboard</span>, 
                    where I've built distributed IoT pipelines processing thousands of sensor readings daily. 
                    I'm driven by the challenge of solving complex problems and making technology accessible and impactful.
                  </p>
                  <p>
                    Beyond coding, I lead as <span className="text-cyan-400 font-semibold">Captain of the Oberlin Soccer Club</span>, 
                    bringing the same strategic thinking and teamwork to the field as I do to engineering challenges.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {highlights.map((highlight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:border-cyan-500/50 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <highlight.icon className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-lg font-bold text-white mb-2">{highlight.title}</h4>
                <p className="text-gray-400 text-sm">{highlight.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Core Values */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-16"
        >
          <h3 className="text-2xl font-bold text-white text-center mb-8">Core Values</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Award, label: 'Excellence', description: 'Striving for the highest quality in every project' },
              { icon: Lightbulb, label: 'Innovation', description: 'Embracing new technologies and creative solutions' },
              { icon: Heart, label: 'Impact', description: 'Building systems that make a meaningful difference' }
            ].map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + (i * 0.1), duration: 0.4 }}
                className="text-center p-6 bg-gray-800/30 border border-gray-700 rounded-xl hover:border-cyan-500/50 transition-all duration-300"
              >
                <value.icon className="w-10 h-10 mx-auto mb-4 text-cyan-400" />
                <h4 className="text-xl font-bold text-white mb-2">{value.label}</h4>
                <p className="text-gray-400 text-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}


