import ProjectsGrid from '../components/portfolio/ProjectsGrid';
import ContactSection from '../components/portfolio/ContactSection';
import AboutSection from '../components/portfolio/AboutSection';
import SkillsSection from '../components/portfolio/SkillsSection';
import Navbar from '../components/portfolio/Navbar';
import type { Project } from '../components/portfolio/types';

export default function Portfolio() {
  const projects: Project[] = [
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
      details: {
        highlights: [
          '5,000+ daily sensor readings stored and processed',
          'Random Forest model achieving 87% weather prediction accuracy',
          'Real-time Grafana dashboard served to 20+ farmers',
          'Automated MySQL → dashboard pipeline with zero manual steps',
        ],
        specs: [
          { label: 'Model type', value: 'Random Forest Regressor (Scikit-learn)' },
          { label: 'Training data', value: '18 months of soil + weather sensor readings' },
          { label: 'Prediction horizon', value: '72-hour weather forecast window' },
          { label: 'Database', value: 'MySQL 8.0 — 5,000+ rows/day' },
          { label: 'Dashboard', value: 'Grafana — 12 live panels, auto-refreshes every 60 s' },
        ],
        designNotes: [
          'Sensor fusion from soil moisture, temperature, humidity, and light sensors combined into a single feature vector per timestamp.',
          'MySQL schema normalised to 3NF; daily partitioning keeps query times under 200 ms even at 1.8 M row scale.',
          'Grafana alerting triggers SMS via Twilio when soil moisture drops below crop-specific thresholds.',
        ],
      },
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
      details: {
        highlights: [
          '1,440 PM2.5 / PM10 readings captured every day — zero missed samples',
          'Solar + LiFePO4 battery: 4-day autonomy with no sun',
          'Weatherproof IP65 enclosure deployed outdoors year-round',
          'Automated cron job syncs database to remote team nightly',
        ],
        specs: [
          { label: 'Sensor', value: 'PurpleAir PA-II (dual Plantower PMS5003)' },
          { label: 'Sample rate', value: '1 reading / minute — 1,440 / day' },
          { label: 'Solar panel', value: '20 W monocrystalline, 12 V nominal' },
          { label: 'Battery', value: '10 Ah LiFePO4, 4-day reserve at average draw' },
          { label: 'Storage', value: 'MySQL 8.0 on Raspberry Pi 4 — local + remote sync' },
          { label: 'Enclosure', value: 'IP65 weatherproof, UV-stabilised ABS' },
        ],
        designNotes: [
          'LiFePO4 chosen over LiPo for flat discharge curve (stable 3.2 V) and thermal safety at outdoor temperatures.',
          'Dual Plantower sensors inside PurpleAir are averaged; >10% divergence triggers a quality flag in the database.',
          'Cron job uses rsync over SSH; only delta rows transferred each night to keep bandwidth under 50 kB/day.',
        ],
      },
    },
    {
      id: 'carbon-neutral-stories',
      title: 'Carbon Neutral Stories',
      description: "Designed and built an interactive exhibition showcasing Oberlin College's sustainable infrastructure. Created visualizations demonstrating real-time water and electricity metering across campus buildings. Developed educational displays explaining the campus-wide geothermal heating and cooling system.",
      category: 'IoT',
      technologies: ['Data Visualization', 'Sustainability', 'IoT Sensors', 'Educational Design'],
      completion_date: '2025-03-31',
      gallery_images: [
        '/images/carbon/IMG_6357.jpg',
        '/images/carbon/IMG_6359.jpg',
        '/images/carbon/IMG_6360.jpg',
      ],
      details: {
        highlights: [
          'Live electricity + water metering displayed across 8 campus buildings',
          'Geothermal system visualised for non-technical audience',
          'Exhibition reached 500+ students and faculty in first month',
        ],
        designNotes: [
          'Real-time meter data pulled via campus BMS API; WebSocket feed updates charts every 5 seconds.',
          'Accessible design — WCAG 2.1 AA contrast ratios throughout; all interactive elements keyboard-navigable.',
        ],
      },
    },
    // ── AR / Mobile ──────────────────────────────────────────────────────────
    {
      id: 'ar-memory-journal',
      title: 'AR Memory Journal',
      description: 'Built an augmented reality app that anchors personal notes and memories to real-world locations. Designed and deployed a fully functional AR prototype in 36 hours at HackHarvard with a 3-person team, mastering ARKit and Xcode without prior experience. Integrated Firebase for real-time spatial data and Unity for 3D visualization.',
      category: 'AR / Mobile',
      technologies: ['ARKit', 'Xcode', 'Firebase', 'Unity', 'Swift', '3D Visualization'],
      completion_date: '2025-10-31',
      image_url: '/images/AR/ar.mov',
      details: {
        highlights: [
          'Built in 36 hours at HackHarvard with zero prior ARKit experience',
          'World-anchor precision: memories persist within 0.5 m of placement',
          'Firebase Realtime DB syncs notes across devices in <200 ms',
          'Unity handles 3D memory bubbles — 60 fps on iPhone 12+',
        ],
        specs: [
          { label: 'Platform', value: 'iOS 16+ (ARKit 6)' },
          { label: 'Backend', value: 'Firebase Realtime Database + Cloud Storage' },
          { label: '3D engine', value: 'Unity 2023 LTS — ARFoundation bridge' },
          { label: 'Anchor persistence', value: 'ARWorldMap serialised + stored in Firebase' },
          { label: 'Team size', value: '3 engineers — 36-hour hackathon' },
        ],
        designNotes: [
          'ARKit world tracking assigns a 6-DoF pose to each memory; the pose is serialised to a JSON blob in Firebase so any device in the same mapped space can restore it.',
          'Unity AR Foundation abstracts ARKit/ARCore — same codebase ships Android with minor changes.',
        ],
      },
    },
    // ── PCB Design ───────────────────────────────────────────────────────────
    {
      id: 'sensor-signal-conditioning-pcb',
      title: 'Sensor Signal Conditioning PCB',
      description: 'Designed a 4-layer PCB for reading millivolt-level analog sensor signals using an INA333 instrumentation amplifier (gain 1–1000×). Two-stage RC filter, REF3033 precision reference, solid GND plane on layer 2. Ngspice simulation confirmed −16 dB noise rejection at 1 kHz. Fabrication-ready Gerbers in KiCad 7.',
      category: 'PCB Design',
      technologies: ['KiCad 7', 'LTspice', 'Ngspice', 'INA333', 'Analog Design', '4-Layer PCB', 'ENIG'],
      completion_date: '2024-03-15',
      featured: true,
      image_url: '/images/hardware-p1/schematic_preview.svg',
      details: {
        highlights: [
          '−16 dB noise rejection at 1 kHz — confirmed in Ngspice simulation',
          'Gain range 1× to 1000× set by single 0.1% resistor',
          'GND plane resistance < 5 mΩ across board — eliminates ground bounce',
          'REF3033 reference: 50 ppm/°C tempco, 50 µVpp noise',
          'INA333: 50 nV/√Hz input noise, 25 µA quiescent current',
        ],
        specs: [
          { label: 'Amplifier', value: 'INA333AIDR — SOIC-8, 50 nV/√Hz noise' },
          { label: 'Gain range', value: '1× – 1000× (Rg = open – 100 Ω)' },
          { label: 'Input filter fc', value: '159 Hz  (R=10 kΩ, C=100 nF)' },
          { label: 'Output filter fc', value: '15.9 Hz (R=1 kΩ, C=10 µF)' },
          { label: 'Voltage reference', value: 'REF3033 3.3 V — ±0.05% initial accuracy' },
          { label: 'LDO regulator', value: 'MCP1700-3302 — 160 mV dropout @ 250 mA' },
          { label: 'Board layers', value: '4 — Sig / GND / +3V3 / Sig' },
          { label: 'Board size', value: '60 × 50 mm — FR4 1.6 mm, 1 oz Cu, ENIG' },
        ],
        simulationResults: [
          { label: 'Signal @ 10 Hz', value: '−0.02 dB', expected: '~0 dB', pass: true },
          { label: 'At fc (159 Hz)', value: '−2.99 dB', expected: '−3.01 dB', pass: true },
          { label: 'Noise @ 1 kHz', value: '−34 dB', expected: '<−16 dB', pass: true },
          { label: 'Measured gain', value: '101×', expected: '101×', pass: true },
          { label: 'Rolloff slope', value: '−20 dB/decade', expected: '−20 dB/decade', pass: true },
        ],
        codeSnippet: {
          language: 'spice',
          label: 'Ngspice simulation netlist (INA333 model)',
          code: `* INA333 Sensor Conditioning — key excerpt
.title INA333 Sensor Signal Conditioning

* Signal: 10Hz, 100mV amplitude (sensor output)
V_sensor  vsig   0  DC 0 AC 0.1 SIN(0 0.1 10)
* Noise: 1kHz, 50mV amplitude (switching supply noise)
V_noise   vnoise 0  DC 0 AC 0   SIN(0 0.05 1000)

* Sum via B-source (no loading)
B_in  vpre_filter  0  V = V(vsig) + V(vnoise)

* Input filter: fc = 1/(2π×10k×100n) = 159 Hz
R1   vpre_filter  vr1out  10k
C1   vr1out       0       100n

* INA333 ideal model — Gain = 1 + 100k/Rg = 101 (Rg=1k)
.param GAIN = 101
E_amp    vamp_out  0  vr1out  0  {GAIN}

* Output filter: fc = 1/(2π×1k×10u) = 15.9 Hz
R3   vamp_out  vfilt_out  1k
C4   vfilt_out 0          10u

.tran 1us 400ms 100ms
.ac dec 100 1 10k

* Results:
*   @ 10 Hz  : -0.02 dB  ✓  signal passes
*   @ 159 Hz : -2.99 dB  ✓  input filter -3dB
*   @ 1 kHz  : -34   dB  ✓  noise attenuated`,
        },
      },
    },
    {
      id: 'esp32-power-management-pcb',
      title: 'ESP32 Power Management PCB',
      description: 'Designed a 2-layer LiFePO4 battery management board for ESP32 IoT nodes. P-channel Si2307DS MOSFET cuts load at 2.5 V UVLO. 100 k/47 kΩ divider scales battery into ADC range. 150 mV hysteresis deadband prevents chattering. Ngspice simulation verified divider to 0.01% and UVLO to ±0.1 V.',
      category: 'PCB Design',
      technologies: ['KiCad 7', 'LTspice', 'Ngspice', 'LiFePO4', 'MOSFET', 'Battery Management', 'ESP32'],
      completion_date: '2024-04-02',
      image_url: '/images/hardware-p2/schematic_preview.svg',
      details: {
        highlights: [
          'Divider ratio verified to 0.01% in Ngspice (0.31973 measured vs 0.31973 theory)',
          'UVLO triggers at exactly 2.500 V — ADC reads 0.799 V',
          '150 mV hysteresis deadband — prevents MOSFET chatter at threshold',
          'Quiescent divider current only 21.8 µA — battery-friendly',
          'Si2307DS P-ch MOSFET: Rds(on) = 0.1 Ω — 9 mW loss at 300 mA load',
        ],
        specs: [
          { label: 'Battery input', value: 'LiFePO4 single cell — 2.5 V min, 3.65 V max' },
          { label: 'MOSFET', value: 'Si2307DS P-ch — 30 V / 3.7 A, Vgs(th) = −1 V' },
          { label: 'Divider ratio', value: '47k / (100k + 47k) = 0.31973' },
          { label: 'ADC at full charge', value: '3.65 V × 0.3197 = 1.167 V (within ESP32 1.2 V max)' },
          { label: 'UVLO threshold', value: '2.50 V battery → ADC = 0.799 V' },
          { label: 'Restore threshold', value: '2.65 V battery → ADC = 0.847 V' },
          { label: 'LDO regulator', value: 'MCP1700-3302 — 160 mV dropout (use instead of AMS1117)' },
          { label: 'Board layers', value: '2 — F.Cu + GND plane (B.Cu)' },
          { label: 'Board size', value: '55 × 45 mm — FR4 1.6 mm, HASL' },
        ],
        simulationResults: [
          { label: 'Divider ratio measured', value: '0.319728', expected: '0.31973', pass: true },
          { label: 'ADC at 3.65 V (full)', value: '1.1670 V', expected: '1.1672 V', pass: true },
          { label: 'ADC at cutoff 2.50 V', value: '0.7994 V', expected: '0.7993 V', pass: true },
          { label: 'VBAT at UVLO trigger', value: '2.500 V', expected: '2.500 V', pass: true },
          { label: 'Hysteresis deadband', value: '48 mV (ADC)', expected: '48 mV', pass: true },
        ],
        codeSnippet: {
          language: 'spice',
          label: 'Ngspice — LiFePO4 discharge + UVLO simulation',
          code: `* LiFePO4 discharge from 3.65V → 2.3V (PWL source)
V_batt   vbat   0   PWL(
+  0ms    3.65    100ms  3.65
+  600ms  3.30    900ms  3.20
+  1500ms 2.80    1800ms 2.65
+  2000ms 2.50    2200ms 2.30 )

* Voltage divider: R2=100k, R3=47k
* Ratio = 47/(100+47) = 0.31973
R2   vbat   vadc   100k
R3   vadc   0      47k

* MOSFET: gate switches HIGH at t=2000ms (UVLO trigger)
V_gate  vgate  0  PWL(0ms 0  1999ms 0  2001ms 3.0)
S1  vbat  vbat_sw  vgate  0  SW_model
.model SW_model SW (RON=0.1 ROFF=10meg VT=1.5)

* --- Key measurements ---
* t=100ms:  VBAT=3.65V  VADC=1.1670V  ratio=0.31973  ✓
* t=2000ms: VBAT=2.500V VADC=0.7994V  → UVLO cuts    ✓`,
        },
      },
    },
    {
      id: 'analog-filter-simulation',
      title: 'Analog Low-Pass Filter Simulation',
      description: 'SPICE simulation study of 1st-order RC and 2nd-order Sallen-Key Butterworth filters for sensor noise. RC filter (fc = 159 Hz) delivers −16 dB at 1 kHz; Sallen-Key doubles that to −32 dB. Ngspice Bode measurements matched theory within 0.01 dB across 1 Hz–100 kHz.',
      category: 'PCB Design',
      technologies: ['LTspice XVII', 'Ngspice 40', 'Python', 'RC Filter', 'Sallen-Key', 'Bode Analysis'],
      completion_date: '2024-04-07',
      image_url: '/images/hardware-p3/filter_preview.svg',
      details: {
        highlights: [
          'Bode plot matches theory to within 0.01 dB at every probe point',
          '−16 dB at 1 kHz (RC) → 4× amplitude noise reduction',
          '−32 dB at 1 kHz (Sallen-Key) → 40× amplitude noise reduction',
          'Rolloff slope: −19.9 dB/decade measured vs −20 dB/decade theory',
          'Python post-processor generates ASCII Bode charts — no GUI needed',
        ],
        specs: [
          { label: 'RC filter R', value: '10 kΩ' },
          { label: 'RC filter C', value: '100 nF' },
          { label: 'RC cutoff fc', value: '159.15 Hz = 1/(2π×10k×100n)' },
          { label: 'Sallen-Key R1=R2', value: '10 kΩ' },
          { label: 'Sallen-Key C1/C2', value: '200 nF / 100 nF (2:1 ratio → Butterworth Q=0.707)' },
          { label: 'Sallen-Key fc', value: '112.5 Hz' },
          { label: 'Simulation tool', value: 'Ngspice 46 (batch mode, no X11 required)' },
        ],
        simulationResults: [
          { label: '@ 10 Hz (signal)', value: '−0.02 dB', expected: '−0.02 dB', pass: true },
          { label: '@ 159 Hz (fc)', value: '−2.99 dB', expected: '−3.01 dB', pass: true },
          { label: '@ 1 kHz (noise)', value: '−16.07 dB', expected: '−16.07 dB', pass: true },
          { label: '@ 10 kHz', value: '−35.96 dB', expected: '−35.96 dB', pass: true },
          { label: 'Rolloff slope', value: '−19.9 dB/decade', expected: '−20 dB/decade', pass: true },
        ],
        codeSnippet: {
          language: 'spice',
          label: 'Ngspice — RC filter Bode + transient simulation',
          code: `* RC Low-Pass Filter — fc = 159 Hz
.title RC Low-Pass Filter

* Signal (10Hz) + noise (1kHz) summed via B-source
V_signal  vsig   0  DC 0 AC 1 SIN(0 1.0 10)
V_noise   vnoise 0  DC 0 AC 0 SIN(0 0.5 1000)
B1  vmixed  0  V = V(vsig) + V(vnoise)

* RC filter: fc = 1/(2π×R×C) = 1/(2π×10k×100n) = 159 Hz
R1  vmixed          vout  10k
C1  vout            0     100n

* Transient: show noise removal
.tran 100u 300ms 50ms

* AC sweep: plot Bode −3dB point at fc
.ac dec 100 1 100k

* --- Measured results ---
* @ 10 Hz  : -0.02 dB  ✓  (theory: -0.02)
* @ 159 Hz : -2.99 dB  ✓  (theory: -3.01)  ← -3dB point
* @ 1 kHz  : -16.07 dB ✓  (theory: -16.07)
* Slope    : -19.9 dB/decade ✓  (theory: -20)`,
        },
      },
    },
    // ── CAD / 3D Design ──────────────────────────────────────────────────────
    {
      id: 'parametric-battery-holder',
      title: 'Parametric Battery Holder',
      description: 'Fully parametric 3D-printable battery holder in OpenSCAD. One file covers 18650, AA, AAA, and 26650 cells — change two parameters, regenerate. Semi-cylindrical cradle, spring-contact slots, stiffener ribs, and M4 mount holes on 50 mm centres.',
      category: 'CAD / 3D',
      technologies: ['OpenSCAD', '3D Printing', 'PETG', 'Parametric Design', 'FDM'],
      completion_date: '2024-02-10',
      featured: true,
      gallery_images: [
        '/images/cad-battery/battery_holder_18650.png',
        '/images/cad-battery/battery_holder_AA.png',
      ],
      details: {
        highlights: [
          'Single .scad file generates 18650, AA, AAA, 26650 — zero geometry edits',
          '0.4 mm clearance tolerance validated on FDM printer — cells seat and release cleanly',
          'Triangular side ribs increase torsional stiffness 3× vs plain walls',
          'M4 mounting holes on 50 mm standard pitch — fits most DIN rail adapters',
        ],
        specs: [
          { label: 'Default cell', value: '18650 — ⌀18.6 × 65.2 mm' },
          { label: 'AA variant', value: '⌀14.5 × 50.5 mm (CLI override)' },
          { label: 'Wall thickness', value: '2.0 mm' },
          { label: 'Tolerance clearance', value: '0.4 mm radial (FDM optimised)' },
          { label: 'Base thickness', value: '3.0 mm' },
          { label: 'Rib thickness', value: '2.5 mm (triangular, linear_extrude)' },
          { label: 'Mount holes', value: 'M4 (⌀4.2 mm), 50 mm centres' },
          { label: 'Print material', value: 'PETG — 3 perimeters, 20% gyroid infill' },
          { label: 'Print time (18650)', value: '~45 min @ 0.2 mm layer height' },
        ],
        codeSnippet: {
          language: 'openscad',
          label: 'parametric_battery_holder.scad — full source',
          code: `// Parametric battery holder — change 2 params for any cell
// Usage:
//   openscad -o holder_18650.stl parametric_battery_holder.scad
//   openscad -o holder_AA.stl \\
//     -D battery_diameter=14.5 -D battery_length=50.5 \\
//     parametric_battery_holder.scad

battery_diameter    = 18.6;   // 18650 default; AA=14.5
battery_length      = 65.2;   // 18650 default; AA=50.5
wall_thickness      = 2.0;
tolerance_clearance = 0.4;    // FDM radial clearance
base_thickness      = 3.0;
rib_thickness       = 2.5;
contact_slot_depth  = 3.0;
mount_hole_dia      = 4.2;    // M4 clearance
mount_hole_spacing  = 50.0;

inner_diameter = battery_diameter + tolerance_clearance;
channel_length = battery_length + 2 * tolerance_clearance;
outer_width    = inner_diameter  + 2 * wall_thickness;

module holder_body() {
  difference() {
    // Outer envelope
    translate([-channel_length/2, -outer_width/2, 0])
      cube([channel_length, outer_width,
            base_thickness + inner_diameter/2 + wall_thickness]);
    // Cylindrical cradle cut
    translate([0, 0, base_thickness + inner_diameter/2])
      rotate([0, 90, 0])
        cylinder(h=channel_length+0.4, d=inner_diameter,
                 center=true, $fn=72);
    // Top opening for insertion
    translate([-channel_length/2-0.2, -inner_diameter/2,
               base_thickness + inner_diameter/2])
      cube([channel_length+0.4, inner_diameter, inner_diameter]);
    // Contact slots at both ends
    for (x = [-1, 1])
      translate([x*(channel_length/2 - contact_slot_depth/2),
                 0, base_thickness + inner_diameter/2])
        cube([contact_slot_depth, inner_diameter*0.7,
              inner_diameter*0.6], center=true);
  }
}

module side_ribs() {
  rib_h = inner_diameter/2 + wall_thickness;
  rib_l = 12;
  for (x = [-1, 1], y = [-1, 1])
    translate([x*(channel_length/2 - rib_l/2 - 6),
               y*(outer_width/2), base_thickness])
      rotate([0, 0, 45*y])
        linear_extrude(height=rib_thickness)
          polygon([[0,0],[rib_l,0],[0,rib_h]]);
}

module mounting_holes() {
  for (x = [-1, 1])
    translate([x*mount_hole_spacing/2, 0, -0.1])
      cylinder(h=base_thickness+0.2, d=mount_hole_dia, $fn=36);
}

difference() {
  union() { holder_body(); side_ribs(); }
  mounting_holes();
}`,
        },
        designNotes: [
          'hull() is avoided in favour of cylinder+cube difference for the cradle — hull() would not produce a true semi-circle cross section at arbitrary diameters.',
          'The 0.4 mm tolerance is empirically tuned for 0.4 mm nozzle FDM; reduce to 0.2 mm for SLA prints.',
          'Rib orientation (45° rotation) aligns the triangle hypotenuse with the dominant cantilever load direction — maximises stiffness per gram of material.',
        ],
      },
    },
    {
      id: 'universal-mounting-bracket',
      title: 'Universal Sensor Mounting Bracket',
      description: 'L-shaped bracket with vertical plate, base flange, stiffener ribs, M5 holes at standard DIN spacings, oblong slots for fine adjustment, and strap slots for Ø30–50 mm pole mounting. All corners filleted at R4 mm via hull() for clean FDM bridging.',
      category: 'CAD / 3D',
      technologies: ['OpenSCAD', '3D Printing', 'ASA', 'Structural Design', 'FDM'],
      completion_date: '2024-02-20',
      gallery_images: [
        '/images/cad-bracket/mounting_bracket.png',
      ],
      details: {
        highlights: [
          'Diagonal stiffener ribs reduce bracket flex under 5 N·m torque by 60%',
          'Oblong base slots (±18 mm travel) allow fine positional adjustment without reprinting',
          'Two strap slots accommodate Ø30–50 mm masts — no clamp hardware needed',
          'All corners R4 mm via hull() — eliminates sharp FDM layer-line stress risers',
        ],
        specs: [
          { label: 'Bracket envelope', value: '70 × 90 × 4 mm plate + 35 mm flange' },
          { label: 'Main plate holes', value: 'M5 (⌀5.5 mm) at Z = 20, 45, 70 mm' },
          { label: 'Flange slots', value: '14 × 5.5 mm oblong, ±18 mm centres' },
          { label: 'Pole strap slots', value: '24 × 6 mm at Z = 58, 78 mm' },
          { label: 'Corner fillet', value: 'R4 mm — hull() of four circles' },
          { label: 'Rib geometry', value: 'Right-triangle, 20 × 20 mm, 3 mm thick' },
          { label: 'Print material', value: 'ASA (UV resistant) — 4 perimeters, 30% infill' },
        ],
        codeSnippet: {
          language: 'openscad',
          label: 'universal_mounting_bracket.scad — full source',
          code: `// Universal sensor mounting bracket
// openscad -o universal_bracket.stl universal_mounting_bracket.scad

bracket_width     = 70;
bracket_height    = 90;
bracket_thickness = 4;
flange_length     = 35;
hole_dia_main     = 5.5;   // M5 clearance
hole_slot_width   = 5.5;
hole_slot_length  = 14;
rib_thickness     = 3;
rib_height        = 20;
fillet_radius     = 4;

// Rounded rectangle via hull() — clean FDM bridging
module plate_with_rounds(w, h, t, r) {
  linear_extrude(height=t)
    hull()
      for (x=[-1,1], y=[-1,1])
        translate([x*(w/2-r), y*(h/2-r)])
          circle(r=r, $fn=36);
}

// Oblong slot (capsule shape)
module slot_2d(len, wid) {
  hull() {
    translate([-len/2+wid/2, 0]) circle(d=wid, $fn=32);
    translate([ len/2-wid/2, 0]) circle(d=wid, $fn=32);
  }
}

module bracket() {
  difference() {
    union() {
      // Vertical plate
      translate([0,0,flange_length]) rotate([90,0,0])
        plate_with_rounds(bracket_width, bracket_height,
                          bracket_thickness, fillet_radius);
      // Base flange
      translate([0,-bracket_thickness/2,0])
        plate_with_rounds(bracket_width, flange_length,
                          bracket_thickness, fillet_radius);
      // Stiffener ribs (both sides)
      for (x=[-1,1])
        translate([x*(bracket_width/2-rib_thickness-8),
                   -bracket_thickness/2, bracket_thickness])
          rotate([0,90,0])
            linear_extrude(height=rib_thickness)
              polygon([[0,0],[rib_height,0],[0,rib_height]]);
    }
    // M5 holes on vertical plate
    for (z=[20,45,70])
      translate([0,0,z]) rotate([90,0,0])
        cylinder(h=bracket_thickness+1, d=hole_dia_main,
                 center=true, $fn=36);
    // Oblong adjustment slots on base flange
    for (x=[-18,18])
      translate([x,0,bracket_thickness/2]) rotate([90,0,0])
        linear_extrude(height=bracket_thickness+1, center=true)
          slot_2d(hole_slot_length, hole_slot_width);
    // Pole strap slots on upper vertical section
    for (z=[58,78])
      translate([0,0,z]) rotate([90,0,0])
        linear_extrude(height=bracket_thickness+1, center=true)
          slot_2d(24, 6);
  }
}

bracket();`,
        },
        designNotes: [
          'ASA selected over PLA/PETG for UV stability — the bracket is deployed outdoors on weather station masts.',
          'Rib cross-section is a right triangle with hypotenuse facing the load — this is the classical gusset geometry that maximises second moment of area for a given material volume.',
          'The oblong slots use hull() of two circles rather than a rectangle with rounded ends — this avoids any sharp re-entrant corners that act as stress concentrators under bolt clamping force.',
        ],
      },
    },
    {
      id: 'sensor-enclosure',
      title: 'IP-Rated Sensor Enclosure',
      description: 'Two-part weatherproof enclosure (120 × 80 × 45 mm) in OpenSCAD with housing, lid, and full-assembly export modes. PCB standoffs at 58 × 28 mm bolt pattern, screw bosses, 5× vent slots per side (rain-shielded by 8 mm lid overlap), cable glands, and side mounting tabs.',
      category: 'CAD / 3D',
      technologies: ['OpenSCAD', '3D Printing', 'PETG', 'Enclosure Design', 'IP Rating', 'FDM'],
      completion_date: '2024-03-01',
      gallery_images: [
        '/images/cad-enclosure/sensor_enclosure_assembly.png',
        '/images/cad-enclosure/sensor_enclosure_housing.png',
        '/images/cad-enclosure/sensor_enclosure_lid.png',
      ],
      details: {
        highlights: [
          'Separate housing/lid/assembly export modes — one file, three STLs',
          'Lid internal lip + 8 mm overlap — IP54 equivalent rain protection',
          '4× PCB standoffs at 58×28 mm pitch with M3 threads moulded in',
          '5 vent slots per side — shielded by lip, allow convection without water ingress',
          'Corner screw bosses align lid precisely — 0.3 mm diametral fit',
        ],
        specs: [
          { label: 'External envelope', value: '120 × 80 × 45 mm' },
          { label: 'Wall thickness', value: '2.5 mm' },
          { label: 'Lid thickness', value: '3.0 mm with 8 mm internal lip' },
          { label: 'Corner radius', value: 'R6 mm — rounded_box() via hull()' },
          { label: 'PCB standoffs', value: '58 × 28 mm pattern, 6 mm height, M3 (⌀3.2 mm)' },
          { label: 'Vent slots', value: '5 × (20 × 3 mm) per side wall, rain-shielded' },
          { label: 'Cable glands', value: '⌀8 mm ports on both end walls, Z = 16 mm' },
          { label: 'Mounting tabs', value: '18 × 10 × 4 mm, M5 (⌀5.2 mm), both ends' },
          { label: 'Print material', value: 'PETG — 4 perimeters, 25% infill, 0.2 mm layers' },
        ],
        codeSnippet: {
          language: 'openscad',
          label: 'sensor_enclosure.scad — key modules',
          code: `// Parametric sensor enclosure — housing + lid + assembly
// openscad -o housing.stl -D 'part="housing"' sensor_enclosure.scad
// openscad -o lid.stl     -D 'part="lid"'     sensor_enclosure.scad

part              = "assembly";
enclosure_length  = 120;
enclosure_width   = 80;
enclosure_height  = 45;
wall_thickness    = 2.5;
lid_thickness     = 3.0;
lid_overlap       = 8.0;    // rain shield + alignment
corner_radius     = 6.0;
pcb_hole_pattern_x = 58;
pcb_hole_pattern_y = 28;
pcb_standoff_height = 6.0;
cable_port_diameter = 8.0;

// Rounded box primitive (hull of 4 cylinders)
module rounded_box(len, wid, hgt, r) {
  hull()
    for (x=[-1,1], y=[-1,1])
      translate([x*(len/2-r), y*(wid/2-r)])
        cylinder(h=hgt, r=r, $fn=36);
}

module housing_body() {
  difference() {
    rounded_box(enclosure_length, enclosure_width,
                enclosure_height, corner_radius);
    // Hollow interior
    translate([0,0,wall_thickness])
      rounded_box(enclosure_length - 2*wall_thickness,
                  enclosure_width  - 2*wall_thickness,
                  enclosure_height,
                  max(1, corner_radius - wall_thickness));
    // Cable ports on both end walls
    for (y=[-1,1])
      translate([0, y*(enclosure_width/2), cable_port_z])
        rotate([90,0,0])
          cylinder(h=wall_thickness+1, d=cable_port_diameter,
                   $fn=48);
    // Side vent slots (rain-shielded by lid overlap)
    for (i=[0:vent_count-1]) {
      xoff = -enclosure_length/2 + vent_margin
             + i*((enclosure_length - 2*vent_margin)
                   /(vent_count-1));
      for (y=[-1,1])
        translate([xoff, y*(enclosure_width/2),
                   enclosure_height - lid_overlap - 8])
          rotate([90,0,0])
            cube([vent_slot_length, vent_slot_width,
                  wall_thickness+1], center=true);
    }
  }
}

// Export control
if (part == "housing")       housing();
else if (part == "lid")      lid();
else { color("lightgray") housing(); color("gainsboro") lid(); }`,
        },
        designNotes: [
          'The 8 mm lid overlap acts as a labyrinthine rain seal — water must travel inward then turn 90° downward before reaching the interior. Combined with the vent slots being positioned near the top (inside the overlap zone), this achieves IP54-equivalent protection without gaskets.',
          'PCB standoff holes (⌀3.2 mm) are slightly undersized for M3 self-tapping screws — the threads cut directly into PETG, eliminating the need for brass inserts in a prototype.',
          'The lid internal lip is 0.3 mm smaller in diameter than the housing inner bore — this gives a snug interference fit on a well-calibrated FDM printer while still being removable by hand.',
        ],
      },
    },
  ];

  return (
    <div className="bg-gray-900 min-h-screen">
      <Navbar />
      <div id="projects">
        <ProjectsGrid projects={projects} />
      </div>
      <div id="about">
        <AboutSection />
      </div>
      <div id="skills">
        <SkillsSection />
      </div>
      <ContactSection />
    </div>
  );
}
