import ProjectsGrid from '../components/portfolio/ProjectsGrid';
import ContactSection from '../components/portfolio/ContactSection';

export default function Portfolio() {
  // Hardcoded projects only
  const projects = [
    {
      id: 'data-science-agriculture',
      title: 'Data Science for Micro-Agriculture',
      description: 'Built ML models on soil and environmental sensor data to predict crop and weather conditions. Developed machine learning models in Scikit-learn to predict future weather and crop conditions. Stored 5,000+ daily data points in a MySQL database and visualized insights in Grafana dashboards for farmers.',
      category: 'IoT',
      technologies: ['Python', 'Scikit-learn', 'MySQL', 'Grafana', 'Machine Learning'],
      completion_date: '2025-01-31',
      image_url: '/images/research/microagric.png'
    },
    {
      id: 'ar-memory-journal',
      title: 'AR Memory Journal',
      description: 'Built an augmented reality app that anchors personal notes and memories to real-world locations, allowing users to revisit emotions and experiences through their phone cameras. Designed and deployed a fully functional AR prototype in 36 hours with a 3-person team at HackHarvard, mastering ARKit and Xcode without prior experience. Integrated Firebase for real-time spatial data storage and Unity for immersive 3D visualization, creating seamless interaction between digital and physical spaces. Showcased at HackHarvard as a creative fusion of memory, technology, and storytelling, highlighting how AR can preserve human experience beyond screens.',
      category: 'IoT',
      technologies: ['ARKit', 'Xcode', 'Firebase', 'Unity', '3D Visualization'],
      completion_date: '2025-10-31',
      image_url: '/images/AR/ar.mov'
    },
    {
      id: 'air-quality-monitor',
      title: 'Air Quality Monitoring Station',
      description: 'Built autonomous air quality monitoring station using PurpleAir sensor with weatherproof outdoor deployment. Designed solar panel charging system with battery management for continuous operation. Automated daily transfer of 1,440 air quality readings from local MySQL database to remote engineering teams.',
      category: 'Embedded Systems',
      technologies: ['IoT', 'PurpleAir', 'Solar Power', 'MySQL', 'Battery Management', 'Weatherproofing'],
      completion_date: '2025-05-31',
      gallery_images: [
        '/images/air-quality/IMG_6354.jpg',
        '/images/air-quality/IMG_6355.jpg',
        '/images/air-quality/IMG_6356.jpg',
        '/images/air-quality/IMG_6358.jpg'
      ]
    },
    {
      id: 'carbon-neutral-stories',
      title: 'Carbon Neutral Stories',
      description: 'Designed and built an interactive exhibition showcasing Oberlin College\'s sustainable infrastructure systems. Created comprehensive visualizations demonstrating real-time water and electricity metering systems across campus buildings. Developed educational displays explaining the campus-wide geothermal heating and cooling system, making complex sustainability concepts accessible to students and visitors. The exhibition highlights how data-driven monitoring contributes to the college\'s carbon neutrality goals, combining technical infrastructure knowledge with compelling storytelling to inspire environmental awareness.',
      category: 'IoT',
      technologies: ['Data Visualization', 'Sustainability', 'IoT Sensors', 'Educational Design', 'Environmental Systems'],
      completion_date: '2025-03-31',
      gallery_images: [
        '/images/carbon/IMG_6357.jpg',
        '/images/carbon/IMG_6359.jpg',
        '/images/carbon/IMG_6360.jpg'
      ]
    }
  ];

  return (
    <div className="bg-gray-900 min-h-screen">
      <ProjectsGrid projects={projects} />
      <ContactSection />
    </div>
  );
}


