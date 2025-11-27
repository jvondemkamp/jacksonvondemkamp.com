import { useState, useEffect } from 'react'

function LeftNav({ contact, contactOpen, setContactOpen }) {
  return (
    <nav className="left-nav">
      <div className="logo">Jackson Vondemkamp</div>
      <ul>
        <li><a className="nav-link" href="#about">About</a></li>
        <li><a className="nav-link" href="#projects">Projects</a></li>
        <li><a className="nav-link" href="#resume">Resume</a></li>
        <li>
          <button
            onClick={() => setContactOpen(!contactOpen)}
            className="nav-link nav-contact"
            aria-expanded={contactOpen}
          >
            Contact
          </button>

          <div className={`nav-contact-list ${contactOpen ? 'open' : ''}`}>
            {contact?.github && <a href={contact.github} target="_blank" rel="noreferrer">Github</a>}
            {contact?.linkedin && <a href={contact.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>}
            {contact?.email && <a href={`mailto:${contact.email}`}>Email</a>}
          </div>
        </li>
      </ul>
    </nav>
  )
}

const PROFILE = {
  title: '3rd Year @ CU Boulder | B.S Computer Science + Minor in Engineering Entrepreneurship',
  location: 'Boulder, Colorado, United States',
  openTo: 'Open to work for SWE internships and Product Management Internships',
  about: `Hi! I’m a third-year Computer Science student at the University of Colorado Boulder with a minor in Engineering Entrepreneurship. I’m passionate about turning everyday problems into practical solutions by applying the skills I’ve gained through my coursework and projects.

In Fall 2025, I’m studying abroad in Madrid at Universidad Carlos III de Madrid. This experience has inspired me to adapt my work for a broader global audience and strengthened my excitement to collaborate with others as I prepare to enter the workforce.

I thrive on building, learning, and sharing ideas that bridge technology and real-world impact. Looking ahead, I’m eager to apply my technical background, entrepreneurial mindset, and global perspective to innovative projects in software development and beyond.`
}

export default function Home() {
  const [resumeText, setResumeText] = useState('')
  const [projects, setProjects] = useState([])
  const [contact, setContact] = useState({})
  const [contactOpen, setContactOpen] = useState(false)

  useEffect(() => {
    let mounted = true
    fetch('/api/resume').then(r => r.json()).then(data => {
      if (!mounted) return
      setResumeText(data.resumeText || '')
      setProjects(data.projects || [])
      setContact(data.contact || {})
    }).catch(() => {})
    return () => { mounted = false }
  }, [])

  return (
    <div className="page">
      <LeftNav contact={contact} contactOpen={contactOpen} setContactOpen={setContactOpen} />
      <main className="content">
        <section className="hero">
          <h1 className="hero-title">Jackson Vondemkamp</h1>
          <p className="hero-sub">{PROFILE.title} — {PROFILE.location}</p>
        </section>

        <section id="about" className="about">
          <div className="about-row">
            <div className="about-text">
              <h2>About</h2>
              <p className="muted">{PROFILE.openTo}</p>
            </div>
            <img src="/me_again.jpeg" alt="Profile" className="profile-img" onError={(e) => { e.target.style.display = 'none' }} />
          </div>
          {PROFILE.about.split('\n\n').map((p, i) => <p key={i}>{p}</p>)}
        </section>

        <section id="projects" className="projects">
          <h2>Projects</h2>
          <div className="timeline">
            {projects && projects.length > 0 ? projects.map((proj, i) => (
              <div className="timeline-item" key={i}>
                <div className="timeline-date">{proj.date || ''}</div>
                <div className="timeline-body">
                  <h3>{proj.title}</h3>
                  {proj.tech && <div className="muted">{proj.tech}</div>}
                  {proj.description && proj.description.filter(Boolean).length > 0 && (
                    <ul>
                      {proj.description.filter(d => d && d.replace(/^[\u2022\s\-]+/, '').trim()).map((d, idx) => (
                        <li key={idx}>{d.replace(/^[\u2022\s\-]+/, '').trim()}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            )) : (
              <p className="muted">No projects parsed from resume.</p>
            )}
          </div>
        </section>

        <section id="resume" className="resume">
          <h2>Resume</h2>
          <p className="muted">PDF / image provided — embedded below. You can download it <a href="/resume.pdf" target="_blank" rel="noreferrer">here</a>.</p>
          <div className="resume-embed">
            <iframe src="/resume.pdf" title="Resume" frameBorder="0" width="100%" height="900px"></iframe>
          </div>
        </section>

        {/* Inline contact list is now rendered inside LeftNav; drawer removed */}
      </main>
    </div>
  )
}
