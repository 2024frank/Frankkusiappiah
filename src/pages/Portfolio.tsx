import { useEffect, useRef, useState } from 'react'
import {
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  Check,
  Copy,
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

type BenchShot = (typeof benchShots)[number]

const projectTags: Record<string, string[]> = {
  fieldline: ['open-source', 'infrastructure'],
  'pdf-reader-even-g2': ['shipped'],
  'ai-community-calendar': ['shipped'],
  'environmental-dashboard': ['infrastructure'],
  'chirpstack-deploy': ['open-source', 'infrastructure'],
  'ar-memory-journal': ['shipped'],
}

const workFilters = [
  { id: 'all', label: 'All work' },
  { id: 'shipped', label: 'Shipped products' },
  { id: 'open-source', label: 'Open source' },
  { id: 'infrastructure', label: 'Infrastructure' },
] as const

function useClocks() {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const t = window.setInterval(() => setNow(new Date()), 30_000)
    return () => window.clearInterval(t)
  }, [])
  const fmt = (tz: string) =>
    new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: tz }).format(now)
  return { kumasi: fmt('Africa/Accra'), oberlin: fmt('America/New_York') }
}

function usePageChrome() {
  const [progress, setProgress] = useState(0)
  const [active, setActive] = useState('')

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.href.slice(1)))
      .filter((el): el is HTMLElement => el !== null)
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id)
      },
      { rootMargin: '-38% 0px -52% 0px' },
    )
    sections.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    document.documentElement.classList.add('js-rv')
    const els = document.querySelectorAll<HTMLElement>('[data-rv], .section__head, .proof__item, .ledger__row, .capabilities__row')
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      els.forEach((el) => el.classList.add('in'))
      return
    }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) }
      }),
      { threshold: 0.12 },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return { progress, active }
}

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
    <article className={`project ${index % 2 === 1 ? 'project--flip' : ''}`} id={project.id}>
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

      <div className={`case-wrap ${open ? 'case-wrap--open' : ''}`}>
        <div className="case" id={panelId} aria-hidden={!open}>
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
      </div>
    </article>
  )
}

function Lightbox({ shot, onClose }: { shot: BenchShot; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const prev = document.body.style.overflow
    const prevFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
      prevFocus?.focus()
    }
  }, [onClose])

  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={shot.caption} onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <figure className="lightbox__frame">
        <img src={asset(shot.src)} alt={shot.caption} />
        <figcaption>{shot.caption}</figcaption>
      </figure>
      <button type="button" className="lightbox__close" onClick={onClose} aria-label="Close photo" ref={closeRef}>
        <X aria-hidden="true" />
      </button>
    </div>
  )
}

export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [filter, setFilter] = useState<(typeof workFilters)[number]['id']>('all')
  const [lightbox, setLightbox] = useState<BenchShot | null>(null)
  const [copied, setCopied] = useState(false)
  const clocks = useClocks()
  const { progress, active } = usePageChrome()

  const visibleProjects = projects.filter(
    (p) => filter === 'all' || (projectTags[p.id] ?? []).includes(filter),
  )

  const copyEmail = async () => {
    try { await navigator.clipboard.writeText('fkusiappiah@oberlin.edu') } catch { /* clipboard unavailable */ }
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2000)
  }

  useEffect(() => {
    const id = new URL(window.location.href).searchParams.get('project')
    if (id) document.getElementById(id)?.scrollIntoView()
  }, [])

  return (
    <div className="shell" id="top">
      <a className="skip" href="#work">Skip to work</a>

      <div className="progress" style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Frank Kusi Appiah, top of page">
          <span className="brand__mark" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor"><path d="M12 1.8l3.1 6.9 7.5.7-5.6 5 1.6 7.4L12 18l-6.6 3.8L7 14.4 1.4 9.4l7.5-.7z" /></svg>
          </span>
          <span className="brand__name">Frank Kusi Appiah</span>
        </a>
        <nav className="nav" aria-label="Primary">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={active === item.href.slice(1) ? 'on' : ''}
              aria-current={active === item.href.slice(1) ? 'true' : undefined}
            >
              {item.label}
            </a>
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
          <div className="hero__topline">
            <p className="hero__route">Kumasi, Ghana <ArrowRight aria-hidden="true" /> Oberlin, Ohio</p>
            <p className="hero__clocks" aria-label={`Kumasi ${clocks.kumasi}, Oberlin ${clocks.oberlin}`}>
              <span>Kumasi <b>{clocks.kumasi}</b></span>
              <span>Oberlin <b>{clocks.oberlin}</b></span>
            </p>
          </div>
          <h1 className="hero__name">
            <span>Frank Kusi</span>
            <span>Appiah</span>
          </h1>
          <div className="hero__lower">
          <div className="hero__copy">
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
            <img src={asset('/images/bench/hero-kusi.jpg')} alt="Frank Kusi Appiah outdoors" fetchPriority="high" />
            <figcaption>
              <span>Frank Kusi Appiah</span>
              <span>Oberlin, Ohio</span>
            </figcaption>
          </figure>
          </div>
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
          <div className="section__head" data-rv>
            <h2>Work</h2>
            <p>Six systems, built around real constraints. Open a case study for the constraint, the decision, and what changed.</p>
          </div>
          <div className="filters" role="group" aria-label="Filter projects">
            {workFilters.map((f) => (
              <button
                key={f.id}
                type="button"
                className={`filter ${filter === f.id ? 'filter--on' : ''}`}
                aria-pressed={filter === f.id}
                onClick={() => setFilter(f.id)}
              >
                {f.label}
                <span>{f.id === 'all' ? projects.length : projects.filter((p) => (projectTags[p.id] ?? []).includes(f.id)).length}</span>
              </button>
            ))}
          </div>
          <div className="projects">
            {visibleProjects.map((project) => (
              <ProjectRow key={project.id} project={project} index={projects.indexOf(project)} />
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
                <button type="button" className="bench__open" onClick={() => setLightbox(shot)} aria-label={`Enlarge photo: ${shot.caption}`}>
                  <img src={asset(shot.src)} alt={shot.caption} loading="lazy" />
                </button>
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
          <div>
            <button type="button" className="btn btn--on-dark contact__copybtn" onClick={copyEmail} aria-live="polite">
              {copied ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
              {copied ? 'Email copied' : 'Copy email'}
            </button>
          </div>
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
        <span>Kumasi {clocks.kumasi} · Oberlin {clocks.oberlin}</span>
        <a href="#top" className="footer__top">Back to top <ArrowUp aria-hidden="true" /></a>
      </footer>

      {lightbox && <Lightbox shot={lightbox} onClose={() => setLightbox(null)} />}
    </div>
  )
}

