import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, UserCheck } from 'lucide-react';

export default function ExperienceTimeline() {
  const experiences = [
    {
      type: 'work',
      icon: UserCheck,
      title: 'User Experience (UX) Peer Advisor',
      organization: 'Career Exploration & Development',
      location: 'Oberlin College, OH',
      period: 'Aug 2025 - Present',
      highlights: [
        'Provide peer advising and support for career platforms including Handshake, OberLink, and Interstride',
        'Staff weekly drop-in advising hours and respond to student inquiries in an inclusive, timely manner',
        'Promote career resources by tabling weekly at Wilder Hall, Science Center, and Living Learning Communities',
        'Assist with data collection and reporting from career platforms to support programming',
        'Collaborate on digital resource improvements using Google Sheets, Trello, and project management tools',
        'Contribute to CED implementation team for new Engage CRM to track alumni and employer engagement'
      ],
      color: 'emerald'
    },
    {
      type: 'work',
      icon: Briefcase,
      title: 'Hardware & Software Manager',
      organization: 'Oberlin Environmental Dashboard',
      location: 'Oberlin, OH',
      period: 'Jun 2025 - Present',
      highlights: [
        'Designed distributed IoT ingestion pipelines for 30+ sensors processing 10,000+ readings/day',
        'Built cloud-connected APIs and optimized data pipelines, reducing failures by 40%',
        'Developed real-time monitoring dashboard to visualize uptime, latency, and anomalies',
        'Integrated automated anomaly detection for data accuracy across 25+ live dashboards',
        'Managed hardware deployment and software infrastructure for campus-wide monitoring system'
      ],
      color: 'cyan'
    },
    {
      type: 'work',
      icon: Briefcase,
      title: 'Software Engineer Intern',
      organization: 'Anansenet Limited Company',
      location: 'Remote, Ghana',
      period: 'Nov 2024 - Jan 2025',
      highlights: [
        'Implemented AWS Cognito authentication, reducing unauthorized access by 35%',
        'Developed responsive 10+ UIs with TypeScript + Tailwind, improving loading times by 25%',
        'Conducted thorough code reviews on 50+ pull requests, enhancing security practices',
        'Collaborated with distributed development team using Git workflows and agile methodologies'
      ],
      color: 'blue'
    },
    {
      type: 'work',
      icon: Briefcase,
      title: 'Help Desk Technology Consultant',
      organization: 'Oberlin College Center for IT',
      location: 'Oberlin, OH',
      period: 'Aug 2024 - Present',
      highlights: [
        'Resolved 40+ software and networking support requests weekly',
        'Logged and tracked 300+ tickets in SolarWinds',
        'Served as liaison improving response times for 2,500+ users'
      ],
      color: 'purple'
    },
    {
      type: 'education',
      icon: GraduationCap,
      title: 'Bachelor of Arts, 3-2 Engineering',
      organization: 'Oberlin College of Arts and Sciences',
      location: 'Oberlin, OH',
      period: 'Aug 2024 - May 2026',
      highlights: [
        'Coursework: Data Structures, Discrete Mathematics, Mechanics & Relativity',
        'Selected as STRONG Scholar (1 of 16 from 1,000+ students)',
        'Captain of Oberlin College Soccer Club'
      ],
      color: 'pink'
    }
  ];

  const colorMap: Record<string, { gradient: string; bg: string; border: string; text: string }> = {
    cyan: { gradient: 'from-cyan-400 to-cyan-600', bg: 'bg-cyan-500/20', border: 'border-cyan-500/50', text: 'text-cyan-400' },
    blue: { gradient: 'from-blue-400 to-blue-600', bg: 'bg-blue-500/20', border: 'border-blue-500/50', text: 'text-blue-400' },
    purple: { gradient: 'from-purple-400 to-purple-600', bg: 'bg-purple-500/20', border: 'border-purple-500/50', text: 'text-purple-400' },
    pink: { gradient: 'from-pink-400 to-pink-600', bg: 'bg-pink-500/20', border: 'border-pink-500/50', text: 'text-pink-400' },
    emerald: { gradient: 'from-emerald-400 to-emerald-600', bg: 'bg-emerald-500/20', border: 'border-emerald-500/50', text: 'text-emerald-400' }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-gray-800 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(cyan 1px, transparent 1px), linear-gradient(90deg, cyan 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Experience <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Timeline</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto rounded-full mb-6" />
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            My journey through engineering, software development, and innovation
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 via-blue-500 to-purple-500" />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                } flex-col md:justify-between`}
              >
                {/* Timeline dot */}
                <div className={`absolute left-8 md:left-1/2 w-4 h-4 rounded-full bg-gradient-to-r ${colorMap[exp.color].gradient} transform -translate-x-2 md:-translate-x-1/2 z-10 ring-4 ring-gray-900`} />

                {/* Content card */}
                <div className={`w-full md:w-5/12 ml-16 md:ml-0 ${index % 2 === 0 ? 'md:mr-auto md:pr-12' : 'md:ml-auto md:pl-12'}`}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className={`bg-gray-800/50 backdrop-blur-sm border ${colorMap[exp.color].border} rounded-xl p-6 hover:shadow-xl hover:shadow-${exp.color}-500/20 transition-all duration-300`}
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${colorMap[exp.color].gradient} flex items-center justify-center flex-shrink-0`}>
                        <exp.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-1">{exp.title}</h3>
                        <p className={`${colorMap[exp.color].text} font-semibold mb-1`}>{exp.organization}</p>
                        <div className="flex flex-wrap gap-2 text-sm text-gray-400">
                          <span>{exp.period}</span>
                          <span>•</span>
                          <span>{exp.location}</span>
                        </div>
                      </div>
                    </div>
                    
                    <ul className="space-y-2">
                      {exp.highlights.map((highlight, i) => (
                        <li key={i} className="flex items-start text-gray-300 text-sm">
                          <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${colorMap[exp.color].gradient} mt-2 mr-3 flex-shrink-0`} />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


