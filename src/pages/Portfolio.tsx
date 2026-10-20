import { useEffect, useState } from 'react'
import {
  ArrowRight,
  ArrowUpRight,
  Download,
  Github,
  Linkedin,
  Mail,
  Menu,
  Minus,
  Plus,
  X,
} from 'lucide-react'
import {
  capabilities,
  education,
  experiences,
  projects,
  recognition,
  type Project,
} from '../data/portfolio'

const asset = (p: string) => `${import.meta.env.BASE_URL}${p.replace(/^\//, '')}`

const navItems = [
  { label: 'Work', href: '#work' },
  { label: 'Bench', href: '#bench' },
  { label: 'Experience', href: '#experience' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

const benchShots = [
  { src: '/images/bench/workbench-band.jpg', caption: 'Circuit boards, wires and a laptop on the bench.', tall: false },
  { src: '/images/bench/sensor-in-hand.jpg', caption: 'A current transformer, checked by hand before it goes on a panel.', tall: true },
  { src: '/images/bench/controller-board-wired.jpg', caption: 'Controller and relay boards wired on a wooden panel.', tall: true },
  { src: '/images/bench/build-soldering-robot.jpg', caption: 'Soldering under deadline. The robot does not care.', tall: true },
]

const proofStats = [
  { value: '1,600+', label: 'people read documents through my Even G2 app' },
  { value: '10,000+', label: 'sensor readings processed every day at Oberlin' },
  { value: '30+', label: 'IoT nodes kept alive across one campus' },
  { value: '23', label: 'public display signs fed by the community calendar' },
]

function ProjectRow({ project, index }: { project: Project; index: number }) {
  const [open, setOpen] = useState(false)
  const panelId = `case-${project.id}`

  return (
    <article className="project" id={project.id}>
      <div className="project__head">
        <span className="project__index">{String(index + 1).padStart(2, '0')}</span>
        <span className="project__eyebrow">{project.eyebrow}</span>
      </div>

      <div className="project__grid">
        <div className="project__main">
          <h3 className="project__name">{project.name}</h3>
          <p className="project__headline">{project.headline}</p>
          <p className="project__summary">{project.summary}</p>

          <dl className="project__metrics">
            {project.metrics.map((metric) => (
              <div key={metric.label}>
                <dt>{metric.label}</dt>
                <dd>{metric.value}</dd>
              </div>
            ))}
          </dl>

          <div className="project__actions">
            <button
              type="button"
              className="btn btn--ghost"
              aria-expanded={open}
              aria-controls={panelId}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <Minus aria-hidden="true" /> : <Plus aria-hidden="true" />}
              {open ? 'Close case study' : 'Read case study'}
            </button>
            {project.githubUrl && (
              <a className="btn btn--link" href={project.githubUrl} target="_blank" rel="noreferrer">
                <Github aria-hidden="true" /> GitHub <ArrowUpRight aria-hidden="true" />
              </a>
            )}
            {project.liveUrl && (
              <a className="btn btn--link" href={project.liveUrl} target="_blank" rel="noreferrer">
                {project.externalLabel ?? 'Live'} <ArrowUpRight aria-hidden="true" />
              </a>
            )}
          </div>
        </div>

        {project.image && (
          <figure className="project__figure">
            <img src={asset(project.image)} alt={project.imageAlt ?? ''} loading="lazy" />
            <figcaption>{project.stack.join(' · ')}</figcaption>
          </figure>
        )}
      </div>

      {open && (
        <div className="case" id={panelId}>
          <div className="case__col">
            <h4>The constraint</h4>
            <p>{project.challenge}</p>
          </div>
          <div className="case__col">
            <h4>The decision</h4>
            <p>{project.approach}</p>
          </div>
          <div className="case__col">
            <h4>The result</h4>
            <p>{project.outcome}</p>
          </div>
          <div className="case__own">
            <h4>What I built and owned</h4>
            <ul>
              {project.contribution.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </article>
  )
}

export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const id = new URL(window.location.href).searchParams.get('project')
    if (id) document.getElementById(id)?.scrollIntoView()
  }, [])

  return (
    <div className="shell" id="top">
      <a className="skip" href="#work">Skip to work</a>

      <header className="topbar">
        <a className="brand" href="#top" aria-label="Frank Kusi Appiah, top of page">
          <span className="brand__mark">FKA</span>
          <span className="brand__name">Frank Kusi Appiah</span>
        </a>
        <nav className="nav" aria-label="Primary">
          {navItems.map((item) => (
            <a key={item.href} href={item.href}>{item.label}</a>
          ))}
        </nav>
        <div className="topbar__end">
          <span className="status"><span className="status__dot" aria-hidden="true" /> Open to internships</span>
          <a className="btn btn--small" href={asset('/documents/Frank-Kusi-Appiah-Resume.pdf')} target="_blank" rel="noreferrer">
            Resume <Download aria-hidden="true" />
          </a>
          <button
            type="button"
            className="menu-btn"
            aria-expanded={menuOpen}
            aria-label="Toggle navigation"
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
        {menuOpen && (
          <nav className="mobile-nav" aria-label="Mobile">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>{item.label}</a>
            ))}
          </nav>
        )}
      </header>

      <main>
        <section className="hero">
          <div className="hero__copy">
            <p className="hero__route">Kumasi, Ghana <ArrowRight aria-hidden="true" /> Oberlin, Ohio</p>
            <h1 className="hero__name">
              <span>Frank Kusi</span>
              <span>Appiah</span>
            </h1>
            <p className="hero__tag">I build robots, sensors <em>and apps.</em></p>
            <p className="hero__dek">
              I build sensor systems and software for Oberlin&rsquo;s Environmental Dashboard and founded
              the club that became Makers and Engineers @Oberlin. Engineering student in Oberlin&rsquo;s
              3-2 program, headed to Columbia.
            </p>
            <div className="hero__actions">
              <a className="btn btn--primary" href="#work">See the work <ArrowRight aria-hidden="true" /></a>
              <a className="btn btn--ghost" href="mailto:fkusiappiah@oberlin.edu"><Mail aria-hidden="true" /> fkusiappiah@oberlin.edu</a>
            </div>
            <dl className="hero__spec">
              <div><dt>Now</dt><dd>Hardware &amp; Software Manager, Oberlin Environmental Dashboard</dd></div>
              <div><dt>Ships</dt><dd>LoRaWAN platforms · Even G2 apps · Civic AI</dd></div>
            </dl>
          </div>

          <figure className="hero__photo">
            <img src={asset('/images/bench/hero-kusi.jpg')} alt="Frank Kusi Appiah outdoors" />
            <figcaption>
              <span>Frank Kusi Appiah</span>
              <span>Oberlin, Ohio</span>
            </figcaption>
          </figure>
        </section>

        <section className="proof" aria-label="Selected results">
          {proofStats.map((stat) => (
            <div className="proof__item" key={stat.label}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </section>

        <section className="section" id="work">
          <div className="section__head">
            <h2>Work</h2>
            <p>Six systems, built around real constraints. Open a case study for the constraint, the decision, and what changed.</p>
          </div>
          <div className="projects">
            {projects.map((project, index) => (
              <ProjectRow key={project.id} project={project} index={index} />
            ))}
          </div>
        </section>

        <section className="section bench" id="bench">
          <div className="section__head">
            <h2>Bench</h2>
            <p>Sensors fail in winter. Someone has to find out why. Most of my software starts here, with a board that will not behave.</p>
          </div>
          <div className="bench__grid">
            {benchShots.map((shot) => (
              <figure key={shot.src} className={`bench__shot ${shot.tall ? 'bench__shot--tall' : 'bench__shot--wide'}`}>
                <img src={asset(shot.src)} alt={shot.caption} loading="lazy" />
                <figcaption>{shot.caption}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="section" id="experience">
          <div className="section__head">
            <h2>Experience</h2>
            <p>Hardware, software, and the operations work in between.</p>
          </div>
          <div className="ledger">
            {experiences.map((exp) => (
              <article className="ledger__row" key={exp.role}>
                <span className="ledger__period">{exp.period}</span>
                <div className="ledger__main">
                  <h3>{exp.role}</h3>
                  <span className="ledger__org">{exp.organization}</span>
                </div>
                <p className="ledger__desc">{exp.description}</p>
              </article>
            ))}
          </div>
          <p className="section__more">
            <a className="btn btn--link" href={asset('/documents/Frank-Kusi-Appiah-Resume.pdf')} target="_blank" rel="noreferrer">
              Download full resume <ArrowUpRight aria-hidden="true" />
            </a>
          </p>
        </section>

        <section className="section" id="about">
          <div className="section__head">
            <h2>How I work</h2>
            <p>Technical enough to see the risk. Hands-on enough to fix it.</p>
          </div>
          <div className="capabilities">
            {capabilities.map((cap, i) => (
              <div className="capabilities__row" key={cap.title}>
                <span className="capabilities__index">{String(i + 1).padStart(2, '0')}</span>
                <h3>{cap.title}</h3>
                <p>{cap.description}</p>
              </div>
            ))}
          </div>
          <div className="credentials">
            <div>
              <h3>Education</h3>
              {education.map((item) => <p key={item}>{item}</p>)}
            </div>
            <div>
              <h3>Recognition</h3>
              <ul className="credentials__list">
                {recognition.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
          </div>
        </section>

        <section className="contact" id="contact">
          <h2>Say hi.</h2>
          <p className="contact__copy">
            I love building. If your team ships real systems across software, hardware, and data,
            I want to help. Internships and collaborations welcome.
          </p>
          <a className="contact__mail" href="mailto:fkusiappiah@oberlin.edu">fkusiappiah@oberlin.edu</a>
          <div className="contact__links">
            <a className="btn btn--on-dark" href="https://github.com/2024frank" target="_blank" rel="noreferrer">
              <Github aria-hidden="true" /> GitHub
            </a>
            <a className="btn btn--on-dark" href="https://www.linkedin.com/in/frank-kusi-appiah-260a95237/" target="_blank" rel="noreferrer">
              <Linkedin aria-hidden="true" /> LinkedIn
            </a>
            <a className="btn btn--on-dark" href={asset('/documents/Frank-Kusi-Appiah-Resume.pdf')} target="_blank" rel="noreferrer">
              <Download aria-hidden="true" /> Resume
            </a>
          </div>
        </section>
      </main>

      <footer className="footer">
        <span>Frank Kusi Appiah · {new Date().getFullYear()}</span>
        <span>Kumasi to Oberlin. Robots, sensors, apps.</span>
      </footer>
    </div>
  )
}

