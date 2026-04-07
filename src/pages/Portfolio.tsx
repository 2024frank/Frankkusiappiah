import ProjectsGrid from '../components/portfolio/ProjectsGrid';
import ContactSection from '../components/portfolio/ContactSection';

export default function Portfolio() {
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
      description: 'Built an augmented reality app that anchors personal notes and memories to real-world locations, allowing users to revisit emotions and experiences through their phone cameras. Designed and deployed a fully functional AR prototype in 36 hours with a 3-person team at HackHarvard, mastering ARKit and Xcode without prior experience. Integrated Firebase for real-time spatial data storage and Unity for immersive 3D visualization, creating seamless interaction between digital and physical spaces.',
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
      description: "Designed and built an interactive exhibition showcasing Oberlin College's sustainable infrastructure systems. Created comprehensive visualizations demonstrating real-time water and electricity metering systems across campus buildings. Developed educational displays explaining the campus-wide geothermal heating and cooling system, making complex sustainability concepts accessible to students and visitors.",
      category: 'IoT',
      technologies: ['Data Visualization', 'Sustainability', 'IoT Sensors', 'Educational Design', 'Environmental Systems'],
      completion_date: '2025-03-31',
      gallery_images: [
        '/images/carbon/IMG_6357.jpg',
        '/images/carbon/IMG_6359.jpg',
        '/images/carbon/IMG_6360.jpg'
      ]
    },
    {
      id: 'sensor-signal-conditioning-pcb',
      title: 'Sensor Signal Conditioning PCB',
      description: 'Designed a 4-layer PCB for reading millivolt-level analog sensor signals using an INA333 instrumentation amplifier. Features a two-stage RC filter chain (fc = 159 Hz input, 15.9 Hz output), REF3033 precision voltage reference for the INA333 REF pin, and a solid ground plane on layer 2 for <5 mΩ return path resistance. Gain is set by a single 0.1% resistor (1–1000×). Validated with LTspice and Ngspice simulations showing −16 dB noise rejection at 1 kHz and gain accuracy within 0.5% of theory.',
      category: 'PCB Design',
      technologies: ['KiCad 7', 'LTspice', 'Ngspice', 'INA333', 'Analog Design', '4-Layer PCB', 'ENIG Finish'],
      completion_date: '2024-03-15',
      featured: true,
      image_url: '/images/hardware-p1/schematic_preview.svg'
    },
    {
      id: 'esp32-power-management-pcb',
      title: 'ESP32 Power Management PCB',
      description: 'Designed a 2-layer LiFePO4 battery management board for ESP32 IoT nodes. A P-channel MOSFET (Si2307DS) cuts load power at 2.5 V undervoltage lockout. A 100 k/47 kΩ voltage divider scales battery voltage into the ESP32 ADC range (0–1.2 V). Hysteresis firmware deadband (150 mV) prevents chattering at the cutoff threshold. Verified divider ratio to 0.01% accuracy in Ngspice simulation with a PWL LiFePO4 discharge profile.',
      category: 'PCB Design',
      technologies: ['KiCad 7', 'LTspice', 'Ngspice', 'LiFePO4', 'MOSFET', 'Battery Management', 'ESP32'],
      completion_date: '2024-04-02',
      featured: true,
      image_url: '/images/hardware-p2/schematic_preview.svg'
    },
    {
      id: 'analog-filter-simulation',
      title: 'Analog Low-Pass Filter Simulation Study',
      description: 'SPICE simulation study of first-order RC and second-order Sallen-Key low-pass filters for sensor noise reduction. Demonstrated −16 dB rejection at 1 kHz with the RC filter (fc = 159 Hz) and −32 dB with the Sallen-Key (fc = 112 Hz). Ngspice Bode plot measurements matched theory within 0.01 dB. ASCII terminal plots and Python post-processor included for toolchain-free result review.',
      category: 'Circuit Simulation',
      technologies: ['LTspice XVII', 'Ngspice 40', 'Python', 'RC Filter', 'Sallen-Key', 'Bode Analysis'],
      completion_date: '2024-04-07',
      image_url: '/images/hardware-p3/filter_preview.svg'
    }
  ];

  return (
    <div className="bg-gray-900 min-h-screen">
      <ProjectsGrid projects={projects} />
      <ContactSection />
    </div>
  );
}
