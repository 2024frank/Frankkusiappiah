import { useEffect, useMemo, useState } from 'react'
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Copy,
  Download,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Menu,
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

const navItems = [
  { label: 'Work', href: '#work' },
  { label: 'Experience', href: '#experience' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

function projectShareUrl(id: string) {
  const url = new URL(window.location.href)
  url.searchParams.set('project', id)
  url.hash = ''
  return url.toString()
}

function ProjectVisual({ project, compact = false }: { project: Project; compact?: boolean }) {
  if (project.image) {
    return (
      <div className={`project-visual project-visual--${project.accent} ${compact ? 'project-visual--compact' : ''}`}>
        <img src={project.image} alt={project.imageAlt ?? ''} loading="lazy" />
      </div>
    )
  }

  return (
    <div className={`project-visual project-visual--system project-visual--${project.accent} ${compact ? 'project-visual--compact' : ''}`} aria-hidden="true">
      <div className="system-grid" />
      <span className="system-kicker">{project.eyebrow.split('·')[0].trim()}</span>
      <strong>{project.name}</strong>
      <div className="system-readout">
        {project.metrics.map((metric) => (
          <span key={metric.label}>
            <b>{metric.value}</b>
            {metric.label}
          </span>
        ))}
      </div>
    </div>
  )
}

function ProjectCard({
  project,
  index,
  onOpen,
  onCopy,
  copied,
}: {
  project: Project
  index: number
  onOpen: (project: Project) => void
  onCopy: (project: Project) => void
  copied: boolean
}) {
  return (
    <article className={`project-card ${project.featured ? 'project-card--featured' : ''}`}>
      <ProjectVisual project={project} />
      <div className="project-card__body">
        <div className="project-card__meta">
          <span>0{index + 1}</span>
          <span>{project.eyebrow}</span>
        </div>
        <h3>{project.name}</h3>
        <p className="project-card__headline">{project.headline}</p>
        <p className="project-card__summary">{project.summary}</p>
        <div className="metric-row">
          {project.metrics.map((metric) => (
            <div key={metric.label}>
              <strong>{metric.value}</strong>
              <span>{metric.label}</span>
            </div>
          ))}
        </div>
        <div className="project-card__actions">
          <button type="button" className="text-button" onClick={() => onOpen(project)}>
            Read case study <ArrowRight aria-hidden="true" />
          </button>
          <button
            type="button"
            className={`icon-button ${copied ? 'icon-button--copied' : ''}`}
            onClick={() => onCopy(project)}
            aria-label={`Copy link to ${project.name}`}
          >
            {copied ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
            <span>{copied ? 'Copied' : 'Copy link'}</span>
          </button>
        </div>
      </div>
    </article>
  )
}

function ProjectDialog({
  project,
  copied,
  onClose,
  onCopy,
}: {
  project: Project
  copied: boolean
  onClose: () => void
  onCopy: (project: Project) => void
}) {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [onClose])

  return (
    <div className="dialog-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="case-dialog" role="dialog" aria-modal="true" aria-labelledby="case-title">
        <div className="case-dialog__topbar">
          <span>Project case study</span>
          <button type="button" className="dialog-close" onClick={onClose} aria-label="Close case study">
            <X aria-hidden="true" />
          </button>
        </div>

        <ProjectVisual project={project} compact />

        <div className="case-dialog__content">
          <div className="case-dialog__intro">
            <p className="eyebrow">{project.eyebrow}</p>
            <h2 id="case-title">{project.name}</h2>
            <p className="case-lede">{project.headline}</p>
            <div className="case-actions">
              <button type="button" className="button button--dark" onClick={() => onCopy(project)}>
                {copied ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
                {copied ? 'Project link copied' : 'Copy project link'}
              </button>
              {project.githubUrl && (
                <a className="button button--outline" href={project.githubUrl} target="_blank" rel="noreferrer">
                  <Github aria-hidden="true" /> GitHub
                </a>
              )}
              {project.liveUrl && (
                <a className="button button--outline" href={project.liveUrl} target="_blank" rel="noreferrer">
                  <ExternalLink aria-hidden="true" /> {project.externalLabel ?? 'Open project'}
                </a>
              )}
            </div>
          </div>

          <div className="case-metrics">
            {project.metrics.map((metric) => (
              <div key={metric.label}>
                <strong>{metric.value}</strong>
                <span>{metric.label}</span>
              </div>
            ))}
          </div>

          <div className="case-story-grid">
            <div>
              <span>01 · Constraint</span>
              <h3>What made the problem difficult</h3>
              <p>{project.challenge}</p>
            </div>
            <div>
              <span>02 · Decision</span>
              <h3>How I changed the shape of the problem</h3>
              <p>{project.approach}</p>
            </div>
            <div>
              <span>03 · Result</span>
              <h3>What the system now enables</h3>
              <p>{project.outcome}</p>
            </div>
          </div>

          <div className="case-contribution">
            <div>
              <p className="eyebrow">My contribution</p>
              <h3>Program ownership with technical depth</h3>
            </div>
            <ul>
              {project.contribution.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="stack-list" aria-label="Technologies used">
            {project.stack.map((technology) => <span key={technology}>{technology}</span>)}
          </div>
        </div>
      </section>
    </div>
  )
}

export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const projectMap = useMemo(() => new Map(projects.map((project) => [project.id, project])), [])

  useEffect(() => {
    const syncProjectFromUrl = () => {
      const id = new URL(window.location.href).searchParams.get('project')
      setSelectedProject(id ? projectMap.get(id) ?? null : null)
    }
    syncProjectFromUrl()
    window.addEventListener('popstate', syncProjectFromUrl)
    return () => window.removeEventListener('popstate', syncProjectFromUrl)
  }, [projectMap])

  const openProject = (project: Project) => {
    const url = new URL(window.location.href)
    url.searchParams.set('project', project.id)
    url.hash = ''
    window.history.pushState({}, '', url)
    setSelectedProject(project)
  }

  const closeProject = () => {
    const url = new URL(window.location.href)
    url.searchParams.delete('project')
    window.history.pushState({}, '', url)
    setSelectedProject(null)
  }

  const copyProjectLink = async (project: Project) => {
    const link = projectShareUrl(project.id)
    try {
      await navigator.clipboard.writeText(link)
    } catch {
      const input = document.createElement('textarea')
      input.value = link
      input.style.position = 'fixed'
      input.style.opacity = '0'
      document.body.appendChild(input)
      input.select()
      document.execCommand('copy')
      input.remove()
    }
    setCopiedId(project.id)
    window.setTimeout(() => setCopiedId((current) => current === project.id ? null : current), 1800)
  }

  return (
    <div className="portfolio-shell" id="top">
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Frank Kusi Appiah home">
          <span>FKA</span>
          <small>Systems builder</small>
        </a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
        </nav>
        <div className="header-actions">
          <a className="resume-link" href="/documents/Frank-Kusi-Appiah-Resume.pdf" target="_blank" rel="noreferrer">
            Resume <Download aria-hidden="true" />
          </a>
          <button type="button" className="menu-button" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-label="Toggle navigation">
            {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
        {menuOpen && (
          <nav className="mobile-nav" aria-label="Mobile navigation">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>{item.label}</a>
            ))}
          </nav>
        )}
      </header>

      <main>
        <section className="hero section-wrap">
          <div className="hero__copy">
            <p className="eyebrow hero__eyebrow"><span /> Technical program management · Systems engineering</p>
            <h1>I turn messy technical constraints into products people can use.</h1>
            <p className="hero__lede">
              I am Frank Kusi Appiah, an engineering student and systems builder working across wearable computing, civic AI, and campus-scale IoT infrastructure.
            </p>
            <div className="hero__actions">
              <a className="button button--primary" href="#work">Explore selected work <ArrowRight aria-hidden="true" /></a>
              <a className="button button--secondary" href="mailto:fkusiappiah@oberlin.edu">Start a conversation</a>
            </div>
            <div className="hero__proof" aria-label="Selected impact">
              <div><strong>1,600+</strong><span>product users</span></div>
              <div><strong>10,000+</strong><span>sensor readings daily</span></div>
              <div><strong>40%</strong><span>fewer system failures</span></div>
              <div><strong>50+</strong><span>pull requests reviewed</span></div>
            </div>
          </div>

          <div className="hero__portrait" aria-label="Portrait of Frank Kusi Appiah">
            <div className="portrait-frame">
              <img src="/images/profile.jpg" alt="Frank Kusi Appiah" />
              <div className="portrait-caption">
                <span><MapPin aria-hidden="true" /> Oberlin, Ohio</span>
                <strong>Open to Technical Program Management internships</strong>
              </div>
            </div>
            <div className="portrait-note portrait-note--top">
              <span>Current focus</span>
              <strong>Reliable systems at the edge</strong>
            </div>
            <div className="portrait-note portrait-note--bottom">
              <span>Working style</span>
              <strong>Requirements to release</strong>
            </div>
          </div>
        </section>

        <section className="work section-wrap" id="work">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Selected work</p>
              <h2>Systems built around real constraints.</h2>
            </div>
            <p>Each case study explains the constraint, the decision that changed the problem, and the measurable result.</p>
          </div>
          <div className="project-grid">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                onOpen={openProject}
                onCopy={copyProjectLink}
                copied={copiedId === project.id}
              />
            ))}
          </div>
        </section>

        <section className="experience-section" id="experience">
          <div className="section-wrap experience-grid">
            <div className="experience-intro">
              <p className="eyebrow">Experience</p>
              <h2>Building across hardware, software, and operations.</h2>
              <p>My strongest work happens where technical implementation and program decisions have to move together.</p>
              <a href="/documents/Frank-Kusi-Appiah-Resume.pdf" target="_blank" rel="noreferrer">
                Download full resume <ArrowUpRight aria-hidden="true" />
              </a>
            </div>
            <div className="experience-list">
              {experiences.map((experience, index) => (
                <article key={experience.role}>
                  <span>0{index + 1}</span>
                  <div>
                    <p>{experience.period}</p>
                    <h3>{experience.role}</h3>
                    <h4>{experience.organization}</h4>
                    <p>{experience.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="about section-wrap" id="about">
          <div className="section-heading section-heading--about">
            <div>
              <p className="eyebrow">How I work</p>
              <h2>Technical enough to see the risk. Structured enough to move the program.</h2>
            </div>
            <p>I use implementation as a way to sharpen product judgment, uncover hidden dependencies, and make release decisions with evidence.</p>
          </div>
          <div className="capability-grid">
            {capabilities.map((capability, index) => (
              <article key={capability.title}>
                <span>0{index + 1}</span>
                <h3>{capability.title}</h3>
                <p>{capability.description}</p>
              </article>
            ))}
          </div>
          <div className="credentials-grid">
            <div>
              <p className="eyebrow">Education</p>
              {education.map((item) => <p key={item}>{item}</p>)}
            </div>
            <div>
              <p className="eyebrow">Recognition</p>
              <div className="recognition-list">
                {recognition.map((item) => <span key={item}>{item}</span>)}
              </div>
            </div>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="section-wrap contact-grid">
            <div>
              <p className="eyebrow">Let us build something useful</p>
              <h2>Looking for a technical program manager who can work inside the system?</h2>
            </div>
            <div className="contact-copy">
              <p>I am interested in Technical Program Management internships, systems programs, and teams working across software, hardware, data, and operations.</p>
              <a className="button button--light" href="mailto:fkusiappiah@oberlin.edu"><Mail aria-hidden="true" /> fkusiappiah@oberlin.edu</a>
              <div className="social-links">
                <a href="https://github.com/2024frank" target="_blank" rel="noreferrer"><Github aria-hidden="true" /> GitHub</a>
                <a href="https://www.linkedin.com/in/frank-kusi-appiah-260a95237/" target="_blank" rel="noreferrer"><Linkedin aria-hidden="true" /> LinkedIn</a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer section-wrap">
        <span>Frank Kusi Appiah · {new Date().getFullYear()}</span>
        <span>Technical programs · Systems · Product delivery</span>
      </footer>

      {selectedProject && (
        <ProjectDialog
          project={selectedProject}
          copied={copiedId === selectedProject.id}
          onClose={closeProject}
          onCopy={copyProjectLink}
        />
      )}
    </div>
  )
}
