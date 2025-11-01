import React from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';

import Hero3D from '../components/portfolio/Hero3D';
import AboutSection from '../components/portfolio/AboutSection';
import ExperienceTimeline from '../components/portfolio/ExperienceTimeline';
import ProjectsGrid from '../components/portfolio/ProjectsGrid';
import SkillsSection from '../components/portfolio/SkillsSection';
import AchievementsSection from '../components/portfolio/AchievementsSection';
import ContactSection from '../components/portfolio/ContactSection';

export default function Portfolio() {
  const { data: projects = [], isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: () => base44.entities.Project.list('-created_date'),
    initialData: []
  });

  return (
    <div className="bg-gray-900 min-h-screen">
      <Hero3D />
      <AboutSection />
      <ExperienceTimeline />
      <SkillsSection />
      <AchievementsSection />
      <ProjectsGrid projects={projects} />
      <ContactSection />
    </div>
  );
}


