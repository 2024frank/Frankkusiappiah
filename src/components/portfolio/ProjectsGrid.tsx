import { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Calendar, Image } from 'lucide-react';
import { format } from 'date-fns';
import ProjectModal from './ProjectModal';

interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  image_url?: string;
  gallery_images?: string[];
  github_url?: string;
  demo_url?: string;
  completion_date?: string;
  technologies?: string[];
  featured?: boolean;
}

interface ProjectsGridProps {
  projects: Project[];
}

export default function ProjectsGrid({ projects }: ProjectsGridProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <>
      <section id="projects" className="pt-20 pb-32 bg-gradient-to-b from-gray-900 to-gray-800 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            {/* Profile Picture */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="mb-8"
            >
              <div className="relative w-56 h-56 mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full animate-pulse opacity-75 blur-xl"></div>
                <img
                  src="/images/profile.jpg"
                  alt="Frank Kusi Appiah"
                  className="relative w-full h-full rounded-full object-cover object-top border-4 border-cyan-500/50 shadow-2xl shadow-cyan-500/50"
                  style={{ objectPosition: 'center 20%' }}
                />
              </div>
            </motion.div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-3">
              Frank Kusi <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Appiah</span>
            </h1>
            <p className="text-xl text-gray-400 mb-8">i write code, i build stuff, i learn things on the fly</p>
            
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 mt-12">
              Things I Have <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Built</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto rounded-full mb-6" />
          </motion.div>

          {projects.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="text-gray-400 text-lg">No projects found matching your criteria</div>
            </motion.div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -10 }}
                  onClick={() => setSelectedProject(project)}
                  className={`group relative bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl overflow-hidden hover:border-cyan-500/50 transition-all duration-300 cursor-pointer hover:shadow-2xl hover:shadow-cyan-500/20 ${
                    project.featured ? 'md:col-span-2 md:row-span-2' : ''
                  }`}
                >
                  <div className={`relative overflow-hidden ${project.featured ? 'h-96' : 'h-64'}`}>
                    {((project.gallery_images && project.gallery_images[0]) || project.image_url) ? (
                      <>
                        {project.image_url?.match(/\.(mp4|mov|webm|ogg)$/i) ? (
                          <video
                            src={project.image_url}
                            className="w-full h-full object-cover"
                            muted
                            loop
                            playsInline
                            poster=""
                          />
                        ) : (
                          <img
                            src={(project.gallery_images && project.gallery_images[0]) || project.image_url}
                            alt={project.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                      </>
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                        <div className="text-gray-600 text-6xl">💻</div>
                      </div>
                    )}
                    
                    {/* Gallery indicator */}
                    {project.gallery_images && project.gallery_images.length > 1 && (
                      <div className="absolute bottom-4 left-4 px-3 py-1 bg-gray-900/80 backdrop-blur-sm rounded-full text-white text-xs font-semibold flex items-center gap-1">
                        <Image className="w-3 h-3" />
                        {project.gallery_images.length} Photos
                      </div>
                    )}
                    
                    <div className="absolute top-4 right-4 flex gap-2">
                      {project.github_url && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(project.github_url, '_blank');
                          }}
                          className="p-2 bg-gray-900/80 backdrop-blur-sm rounded-lg text-white hover:bg-cyan-500 transition-colors duration-300"
                        >
                          <Github className="w-5 h-5" />
                        </button>
                      )}
                      {project.demo_url && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(project.demo_url, '_blank');
                          }}
                          className="p-2 bg-gray-900/80 backdrop-blur-sm rounded-lg text-white hover:bg-cyan-500 transition-colors duration-300"
                        >
                          <ExternalLink className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-3 py-1 bg-cyan-500/20 border border-cyan-500/50 rounded-full text-cyan-400 text-xs font-medium">
                        {project.category}
                      </span>
                      {project.completion_date && (
                        <span className="flex items-center gap-1 text-gray-400 text-xs">
                          <Calendar className="w-3 h-3" />
                          {format(new Date(project.completion_date), 'MMM yyyy')}
                        </span>
                      )}
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors line-clamp-2">
                      {project.title}
                    </h3>
                    
                    <p className="text-gray-400 mb-4 line-clamp-3">
                      {project.description}
                    </p>

                    {project.technologies && project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.slice(0, 4).map((tech, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 bg-gray-700/50 rounded text-gray-300 text-xs"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 4 && (
                          <span className="px-2 py-1 bg-gray-700/50 rounded text-cyan-400 text-xs font-semibold">
                            +{project.technologies.length - 4}
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="absolute inset-0 border-2 border-cyan-500/0 group-hover:border-cyan-500/50 rounded-xl transition-all duration-300 pointer-events-none" />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </>
  );
}


