import fs from 'fs'
import path from 'path'

function parseResume(resumeText){
  const lines = resumeText.split(/\r?\n/).map(l=>l.trim())
  const contact = {}
  const emailLine = lines.find(l=>l.includes('@'))
  if (emailLine) {
    const m = emailLine.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i)
    if (m) contact.email = m[0]
  }
  const phoneLine = lines.find(l=>/\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}/.test(l))
  if (phoneLine) {
    const m = phoneLine.match(/\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}/)
    if (m) contact.phone = m[0].replace(/[^0-9]/g,'')
  }
  const linkedinLine = lines.find(l=>/linkedin\.com/i.test(l))
  if (linkedinLine) contact.linkedin = linkedinLine.match(/https?:\/\/.*|linkedin\.com\S*/i)[0].replace(/^/, 'https://')
  const githubLine = lines.find(l=>/github\.com/i.test(l))
  if (githubLine) contact.github = githubLine.match(/https?:\/\/.*|github\.com\S*/i)[0].replace(/^/, 'https://')
  const websiteLine = lines.find(l=>/\.[a-z]{2,}$/i.test(l) && !/linkedin|github|@/i.test(l))
  if (websiteLine) contact.website = websiteLine.startsWith('http') ? websiteLine : `https://${websiteLine}`

  const projects = []
  const startIdx = lines.findIndex(l=>/^Projects$/i.test(l) || l.startsWith('Projects'))
  if (startIdx >= 0) {
    const endIdx = lines.findIndex((l,idx)=> idx>startIdx && /^(Certificates|Education|Work Experience|Leadership & Community Development)$/i.test(l))
    const slice = lines.slice(startIdx+1, endIdx>startIdx? endIdx: undefined)
    for (let i=0;i<slice.length;i++){
      const line = slice[i]
      if (!line) continue
      if (line.includes('|') && !line.startsWith('•')){
        const [titlePart, restPart] = line.split('|')
        const title = titlePart.trim()
        const rest = (restPart||'').trim()
        const dateMatch = rest.match(/(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d{4}(\s+–\s+[^\s].*)?$/)
        let date = ''
        let tech = rest
        if (dateMatch) {
          date = dateMatch[0].trim()
          tech = rest.replace(date,'').trim()
        }
        const description = []
        let j = i+1
        while (j<slice.length && (!slice[j].includes('|') || slice[j].startsWith('•'))){
          const s = slice[j]
          if (s.startsWith('•')) description.push(s.replace(/^•\s*/,'').trim())
          else if (s) description.push(s)
          if (slice[j].includes('|') && !slice[j].startsWith('•')) break
          j++
        }
        projects.push({ title, tech, date, description })
      }
    }
  }

  return { contact, projects, resumeText }
}

export default function handler(req, res){
  const dataPath = path.join(process.cwd(), 'data', 'resume.txt')
  let resumeText = ''
  try {
    resumeText = fs.readFileSync(dataPath, 'utf8')
  } catch (e) {
    res.status(200).json({ contact:{}, projects:[], resumeText: '' })
    return
  }

  const parsed = parseResume(resumeText)
  res.status(200).json(parsed)
}
