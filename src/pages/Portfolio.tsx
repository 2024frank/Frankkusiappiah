import ProjectsGrid from '../components/portfolio/ProjectsGrid';
import ContactSection from '../components/portfolio/ContactSection';

export default function Portfolio() {
  const projects = [
    // ── IoT / Data ──────────────────────────────────────────────────────────
    {
      id: 'data-science-agriculture',
      title: 'Data Science for Micro-Agriculture',
      description: 'Built ML models on soil and environmental sensor data to predict crop and weather conditions. Developed machine learning models in Scikit-learn to predict future weather and crop conditions. Stored 5,000+ daily data points in a MySQL database and visualized insights in Grafana dashboards for farmers.',
      category: 'IoT',
      technologies: ['Python', 'Scikit-learn', 'MySQL', 'Grafana', 'Machine Learning'],
      completion_date: '2025-01-31',
      image_url: '/images/research/microagric.png',
      featured: true,
    },
    {
      id: 'air-quality-monitor',
      title: 'Air Quality Monitoring Station',
      description: 'Built autonomous air quality monitoring station using PurpleAir sensor with weatherproof outdoor deployment. Designed solar panel charging system with battery management for continuous operation. Automated daily transfer of 1,440 air quality readings from local MySQL database to remote engineering teams.',
      category: 'Embedded Systems',
      technologies: ['IoT', 'PurpleAir', 'Solar Power', 'MySQL', 'Battery Management'],
      completion_date: '2025-05-31',
      featured: true,
      gallery_images: [
        '/images/air-quality/IMG_6354.jpg',
        '/images/air-quality/IMG_6355.jpg',
        '/images/air-quality/IMG_6356.jpg',
        '/images/air-quality/IMG_6358.jpg',
      ],
    },
    {
      id: 'carbon-neutral-stories',
      title: 'Carbon Neutral Stories',
      description:
        "Designed and built an interactive exhibition showcasing Oberlin College's sustainable infrastructure systems. Created comprehensive visualizations demonstrating real-time water and electricity metering systems across campus buildings. Developed educational displays explaining the campus-wide geothermal heating and cooling system, making complex sustainability concepts accessible.",
      category: 'IoT',
      technologies: ['Data Visualization', 'Sustainability', 'IoT Sensors', 'Educational Design'],
      completion_date: '2025-03-31',
      gallery_images: [
        '/images/carbon/IMG_6357.jpg',
        '/images/carbon/IMG_6359.jpg',
        '/images/carbon/IMG_6360.jpg',
      ],
    },
    // ── AR / Mobile ──────────────────────────────────────────────────────────
    {
      id: 'ar-memory-journal',
      title: 'AR Memory Journal',
      description:
        'Built an augmented reality app that anchors personal notes and memories to real-world locations, allowing users to revisit emotions and experiences through their phone cameras. Designed and deployed a fully functional AR prototype in 36 hours with a 3-person team at HackHarvard, mastering ARKit and Xcode without prior experience. Integrated Firebase for real-time spatial data storage and Unity for immersive 3D visualization.',
      category: 'AR / Mobile',
      technologies: ['ARKit', 'Xcode', 'Firebase', 'Unity', '3D Visualization'],
      completion_date: '2025-10-31',
      image_url: '/images/AR/ar.mov',
    },
    // ── PCB Design ───────────────────────────────────────────────────────────
    {
      id: 'sensor-signal-conditioning-pcb',
      title: 'Sensor Signal Conditioning PCB',
      description:
        'Designed a 4-layer PCB for reading millivolt-level analog sensor signals using an INA333 instrumentation amplifier (gain 1–1000×). Features a 2-stage RC filter chain (fc = 159 Hz input, 15.9 Hz output), REF3033 precision voltage reference, and a solid GND plane on layer 2 for <5 mΩ return resistance. Ngspice simulation confirmed −16 dB noise rejection at 1 kHz and gain accuracy within 0.5% of theory. Fabrication-ready Gerbers generated in KiCad 7.',
      category: 'PCB Design',
      technologies: ['KiCad 7', 'LTspice', 'Ngspice', 'INA333', 'Analog Design', '4-Layer PCB'],
      completion_date: '2024-03-15',
      featured: true,
      image_url: '/images/hardware-p1/schematic_preview.svg',
    },
    {
      id: 'esp32-power-management-pcb',
      title: 'ESP32 Power Management PCB',
      description:
        'Designed a 2-layer LiFePO4 battery management board for ESP32 IoT nodes. A P-channel Si2307DS MOSFET cuts load power at 2.5 V UVLO threshold. A 100 k / 47 kΩ resistor divider scales battery voltage into the ESP32 ADC range (0–1.2 V). 150 mV hysteresis deadband in firmware prevents chattering. Ngspice PWL discharge simulation verified divider ratio to 0.01% and UVLO accuracy to ±0.1 V.',
      category: 'PCB Design',
      technologies: ['KiCad 7', 'LTspice', 'Ngspice', 'LiFePO4', 'MOSFET', 'Battery Management', 'ESP32'],
      completion_date: '2024-04-02',
      image_url: '/images/hardware-p2/schematic_preview.svg',
    },
    {
      id: 'analog-filter-simulation',
      title: 'Analog Low-Pass Filter Simulation',
      description:
        'SPICE simulation study of 1st-order RC and 2nd-order Sallen-Key Butterworth low-pass filters. RC filter (fc = 159 Hz) delivers −16 dB at 1 kHz; Sallen-Key (fc = 112 Hz) doubles that to −32 dB at the same frequency. Ngspice Bode measurements matched theory within 0.01 dB across 1 Hz – 100 kHz. ASCII terminal plots and Python post-processor included for toolchain-free review.',
      category: 'PCB Design',
      technologies: ['LTspice XVII', 'Ngspice 40', 'Python', 'RC Filter', 'Sallen-Key', 'Bode Analysis'],
      completion_date: '2024-04-07',
      image_url: '/images/hardware-p3/filter_preview.svg',
    },
    // ── CAD / 3D Design ──────────────────────────────────────────────────────
    {
      id: 'parametric-battery-holder',
      title: 'Parametric Battery Holder (OpenSCAD)',
      description:
        'Fully parametric 3D-printable battery holder designed in OpenSCAD. A single file targets any cylindrical cell — swap battery_diameter and battery_length to generate 18650, AA, AAA, or 26650 variants without touching the geometry. Features a semi-cylindrical cradle, top-insertion slot, contact slots at both ends for spring contacts, triangular side ribs for stiffness, and M4 mounting holes on 50 mm centres. Printed in PETG at 3 perimeters / 20% infill; verified on FDM printer.',
      category: 'CAD / 3D',
      technologies: ['OpenSCAD', '3D Printing', 'PETG', 'Parametric Design', 'FDM'],
      completion_date: '2024-02-10',
      featured: true,
      gallery_images: [
        '/images/cad-battery/battery_holder_18650.png',
        '/images/cad-battery/battery_holder_AA.png',
      ],
    },
    {
      id: 'universal-mounting-bracket',
      title: 'Universal Sensor Mounting Bracket (OpenSCAD)',
      description:
        'L-shaped mounting bracket with vertical plate, base flange, diagonal stiffener ribs, and multi-pattern hole layout. Vertical plate carries M5 holes at 20/45/70 mm for standard DIN rail accessories. Base flange has oblong slots (±18 mm) for fine positional adjustment. Two 24 × 6 mm strap slots on the upper section allow pole mounting on Ø30–50 mm masts. All corners filleted at R4 mm via hull() for clean FDM bridging. Designed for outdoor sensor mast attachment.',
      category: 'CAD / 3D',
      technologies: ['OpenSCAD', '3D Printing', 'ASA', 'Structural Design', 'FDM'],
      completion_date: '2024-02-20',
      gallery_images: [
        '/images/cad-bracket/mounting_bracket.png',
      ],
    },
    {
      id: 'sensor-enclosure',
      title: 'IP-Rated Sensor Enclosure (OpenSCAD)',
      description:
        'Two-part weatherproof sensor enclosure (120 × 80 × 45 mm) designed in OpenSCAD with separate housing, lid, and assembly export modes. Internal PCB standoffs at 58 × 28 mm bolt pattern with M3 threaded holes. Corner screw bosses accept M3 self-tapping screws; 8 mm lid overlap and internal lip improve weather resistance. Five vent slots per side near top (rain-shielded by lip). Two 8 mm cable glands on opposite end walls. Side mounting tabs with M5 holes. Modelled as multi-body assembly with colour-coded preview.',
      category: 'CAD / 3D',
      technologies: ['OpenSCAD', '3D Printing', 'PETG', 'Enclosure Design', 'IP Rating', 'FDM'],
      completion_date: '2024-03-01',
      gallery_images: [
        '/images/cad-enclosure/sensor_enclosure_assembly.png',
        '/images/cad-enclosure/sensor_enclosure_housing.png',
        '/images/cad-enclosure/sensor_enclosure_lid.png',
      ],
    },
  ];

  return (
    <div className="bg-gray-900 min-h-screen">
      <ProjectsGrid projects={projects} />
      <ContactSection />
    </div>
  );
}
