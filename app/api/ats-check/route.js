import { NextResponse } from 'next/server'

function scoreResume(resume, jobDescription=''){
  // Simple, explainable heuristic-based ATS scoring (frontend-safe)
  let score = 50
  const suggestions = []
  const details = {}

  const text = JSON.stringify(resume).toLowerCase()
  const jd = jobDescription.toLowerCase()

  // 1) Keyword match (30 points)
  if (jd.trim()){
    const jdWords = jd.split(/\W+/).filter(Boolean)
    const unique = Array.from(new Set(jdWords)).slice(0,50)
    let matches = 0
    unique.forEach(w=>{ if (text.includes(w)) matches++ })
    const kwScore = Math.round((matches / Math.max(1, unique.length)) * 30)
    score += kwScore
    details.keyword = { matches, total: unique.length, kwScore }
    if (kwScore < 10) suggestions.push('Add more role-specific keywords from the job description.')
  } else {
    suggestions.push('Copy-paste the job description next to the builder to run a keyword check.')
  }

  // 2) Skills presence (15 points)
  const skills = (resume.skills || []).filter(Boolean)
  const skillScore = Math.min(15, skills.length * 3)
  score += skillScore
  details.skills = {count: skills.length, skillScore}
  if (skills.length < 3) suggestions.push('Add at least 3-5 core skills relevant to the role.')

  // 3) Experience blocks (15 points)
  const expCount = (resume.experience || []).length
  const expScore = Math.min(15, expCount * 5)
  score += expScore
  details.experience = {count: expCount, expScore}
  if (expCount === 0) suggestions.push('Include at least one detailed work experience entry.')

  // 4) Formatting checks (10 points)
  // simple checks: avoid images (we cannot analyze images here), headings present
  const hasName = resume.personal?.name && resume.personal.name.trim().length>0
  const hasEmail = resume.personal?.email && resume.personal.email.includes('@')
  let fmtScore = 0
  if (hasName && hasEmail) fmtScore = 10
  score += fmtScore
  if (!hasName) suggestions.push('Add a clear full name at the top.')
  if (!hasEmail) suggestions.push('Add a valid contact email.')
  details.formatting = {hasName, hasEmail, fmtScore}

  // clamp
  if (score>100) score=100
  if (score<0) score=0

  let summary = 'Overall, your resume is a good start. Follow the suggestions to improve the ATS match.'
  if (score > 85) summary = 'Great! Your resume looks ATS-friendly.'
  else if (score < 50) summary = 'You can improve readability and keyword alignment to score higher.'

  return { score, suggestions, details, summary }
}

export async function POST(request){
  try {
    const body = await request.json()
    const resume = body.resume || {}
    const jobDescription = (body.jobDescription || '')
    const result = scoreResume(resume, jobDescription)
    return NextResponse.json(result)
  } catch (err){
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
  }
}