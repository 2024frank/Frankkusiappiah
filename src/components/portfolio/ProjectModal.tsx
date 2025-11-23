import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Github, ExternalLink, Calendar, Tag, ChevronLeft, ChevronRight } from 'lucide-react';
import { format } from 'date-fns';

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

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  if (!project) return null;

  // Determine which images to show - gallery or single image
  const images = project.gallery_images && project.gallery_images.length > 0 
    ? project.gallery_images 
    : project.image_url 
    ? [project.image_url]
    : [];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Check if current media is a video
  const isVideo = (url: string) => {
    return url.match(/\.(mp4|mov|webm|ogg)$/i);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-gray-900 border border-cyan-500/30 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        >
          {/* Header Image/Video Gallery */}
          {images.length > 0 && (
            <div className="relative h-96 md:h-[600px] overflow-hidden rounded-t-2xl bg-gray-900">
              <div className="w-full h-full flex items-center justify-center p-4">
                {isVideo(images[currentImageIndex]) ? (
                  <motion.video
                    key={currentImageIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    src={images[currentImageIndex]}
                    className="max-w-full max-h-full object-contain"
                    controls
                    autoPlay
                    loop
                    muted
                  />
                ) : (
                  <motion.img
                    key={currentImageIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    src={images[currentImageIndex]}
                    alt={`${project.title} - Image ${currentImageIndex + 1}`}
                    className="max-w-full max-h-full object-contain"
                  />
                )}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/30 to-transparent pointer-events-none" />
            
            {/* Gallery Navigation */}
            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-gray-900/80 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-cyan-500 transition-colors duration-300"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-gray-900/80 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-cyan-500 transition-colors duration-300"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentImageIndex(index);
                      }}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentImageIndex 
                          ? 'bg-cyan-500 w-8' 
                          : 'bg-white/50 hover:bg-white/80'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
              
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-10 h-10 bg-gray-900/80 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-red-500 transition-colors duration-300 z-10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* Close button when no images */}
          {images.length === 0 && (
            <div className="relative p-4 bg-gray-800/50 rounded-t-2xl">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-10 h-10 bg-gray-900/80 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-red-500 transition-colors duration-300 z-10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* Content */}
          <div className="p-6 md:p-8">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-cyan-500/20 border border-cyan-500/50 rounded-full text-cyan-400 text-sm font-medium flex items-center gap-2">
                <Tag className="w-3 h-3" />
                {project.category}
              </span>
              {project.completion_date && (
                <span className="flex items-center gap-2 text-gray-400 text-sm">
                  <Calendar className="w-4 h-4" />
                  {format(new Date(project.completion_date), 'MMMM yyyy')}
                </span>
              )}
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{project.title}</h2>
            
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              {project.description}
            </p>

            {/* Technologies */}
            {project.technologies && project.technologies.length > 0 && (
              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-3">Technologies Used</h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.05 }}
                      className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-300 hover:border-cyan-500/50 hover:text-cyan-400 transition-all duration-300"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>
            )}

            {/* Links */}
            <div className="flex flex-wrap gap-4 pt-6 border-t border-gray-800">
              {project.github_url && (
                <a
                  href={project.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg text-white transition-all duration-300 hover:scale-105"
                >
                  <Github className="w-5 h-5" />
                  View on GitHub
                </a>
              )}
              {project.demo_url && (
                <a
                  href={project.demo_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 rounded-lg text-white font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/50"
                >
                  <ExternalLink className="w-5 h-5" />
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


