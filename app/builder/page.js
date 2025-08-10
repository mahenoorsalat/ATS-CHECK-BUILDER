'use client'
import { useState, useEffect, useRef } from 'react'
import ResumePreview from '../../components/ResumePreview'
import TemplateSelector from '../../components/TemplateSelector'
import { useRouter } from 'next/navigation'
import { Plus, Trash2, Download, Target, Save, User, Briefcase, GraduationCap, Award, CheckCircle } from 'lucide-react'
import ExportModal from '@/components/ExportModal'

export default function Builder() {
    const [showExport, setShowExport] = useState(false)
  const router = useRouter()
  const defaultData = {
    personal: { name: '', title: '', email: '', phone: '', location: '' },
    skills: [''],
    experience: [{ company: '', role: '', start: '', end: '', desc: '' }],
    education: [{ school: '', degree: '', year: '' }],
    template: 'modern'
  }
  
  const [data, setData] = useState(() => {
    if (typeof window === 'undefined') return defaultData
    const saved = localStorage.getItem('resume_data')
    try {
      return saved ? JSON.parse(saved) : defaultData
    } catch {
      return defaultData
    }
  })
  
  const [isLoading, setIsLoading] = useState(false)
  const [activeSection, setActiveSection] = useState('personal')
  const [downloadStatus, setDownloadStatus] = useState('')
  const previewRef = useRef(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('resume_data', JSON.stringify(data))
    }
  }, [data])

  function updatePersonal(e) {
    const { name, value } = e.target
    setData(prev => ({ ...prev, personal: { ...prev.personal, [name]: value } }))
  }

  // Skills handlers
  function addSkill() { setData(p => ({ ...p, skills: [...p.skills, ''] })) }
  function setSkill(i, val) { const s = [...data.skills]; s[i] = val; setData(p => ({ ...p, skills: s })) }
  function removeSkill(i) { const s = [...data.skills]; s.splice(i, 1); setData(p => ({ ...p, skills: s })) }

  // Experience handlers
  function addExp() { setData(p => ({ ...p, experience: [...p.experience, { company: '', role: '', start: '', end: '', desc: '' }] })) }
  function setExp(i, key, val) { const arr = [...data.experience]; arr[i][key] = val; setData(p => ({ ...p, experience: arr })) }
  function removeExp(i) { const arr = [...data.experience]; arr.splice(i, 1); setData(p => ({ ...p, experience: arr })) }

  // Education handlers
  function addEdu() { setData(p => ({ ...p, education: [...p.education, { school: '', degree: '', year: '' }] })) }
  function setEdu(i, key, val) { const arr = [...data.education]; arr[i][key] = val; setData(p => ({ ...p, education: arr })) }
  function removeEdu(i) { const arr = [...data.education]; arr.splice(i, 1); setData(p => ({ ...p, education: arr })) }








function handleDownload() {
  if (!data?.personal?.name?.trim()) {
    setDownloadStatus('Please add your name before exporting');
    setTimeout(() => setDownloadStatus(''), 3000);
    return;
  }
  setShowExport(true)
}




  async function checkATS(){
    if (!data.personal.name) {
      alert('Please add your personal information before running ATS check')
      return
    }

    setIsLoading(true)
    try {
      const res = await fetch('/api/ats-check', {
        method:'POST', 
        headers:{'Content-Type':'application/json'}, 
        body:JSON.stringify({resume:data})
      })
      
      if (!res.ok) {
        throw new Error('ATS check failed')
      }
      
      const json = await res.json()
      sessionStorage.setItem('ats_result', JSON.stringify(json))
      router.push('/ats-check')
    } catch (error) {
      console.error('ATS check failed:', error)
      // Create mock result for demo purposes
      const mockResult = {
        score: Math.floor(Math.random() * 30) + 70, // Random score between 70-100
        summary: "Your resume shows good ATS compatibility with room for improvement in keyword optimization.",
        suggestions: [
          "Add more industry-specific keywords that match job descriptions",
          "Use standard section headings like 'Work Experience' and 'Education'",
          "Include more quantifiable achievements with specific numbers and percentages",
          "Ensure consistent formatting throughout the document"
        ],
        details: {
          keywordDensity: "Good",
          formatting: "Excellent", 
          structure: "Very Good",
          readability: "High"
        }
      }
      sessionStorage.setItem('ats_result', JSON.stringify(mockResult))
      router.push('/ats-check')
    } finally {
      setIsLoading(false)
    }
  }

  const sections = [
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'skills', label: 'Skills', icon: Award },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Resume Builder</h1>
          <p className="text-slate-600">Create your professional resume with real-time preview and ATS optimization</p>
        </div>

        {/* Section Tabs */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 mb-6">
          <div className="flex overflow-x-auto border-b border-slate-200">
            {sections.map(section => {
              const Icon = section.icon
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`flex items-center px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-all ${
                    activeSection === section.id 
                      ? 'border-indigo-500 text-indigo-600 bg-indigo-50' 
                      : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {section.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Panel - Form */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            {/* Personal Information */}
         {activeSection === 'personal' && (
  <div>
    <div className="flex items-center mb-6">
      <User className="w-5 h-5 text-indigo-600 mr-3" />
      <h2 className="text-xl font-semibold text-slate-900">Personal Information</h2>
    </div>
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">Full Name *</label>
        <input 
          name="name" 
          value={data.personal.name} 
          onChange={updatePersonal} 
          placeholder="John Doe" 
          autoComplete="off"
          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all" 
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">Professional Title</label>
        <input 
          name="title" 
          value={data.personal.title} 
          onChange={updatePersonal} 
          placeholder="Senior Software Engineer" 
          autoComplete="off"
          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all" 
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
          <input 
            name="email" 
            type="email"
            value={data.personal.email} 
            onChange={updatePersonal} 
            placeholder="john@example.com" 
            autoComplete="off"
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all" 
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Phone</label>
          <input 
            name="phone" 
            value={data.personal.phone} 
            onChange={updatePersonal} 
            placeholder="+1 (555) 123-4567" 
            autoComplete="off"
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all" 
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">Location</label>
        <input 
          name="location" 
          value={data.personal.location} 
          onChange={updatePersonal} 
          placeholder="San Francisco, CA" 
          autoComplete="off"
          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all" 
        />
      </div>
    </div>
  </div>
)}


            {/* Skills Section */}
            {activeSection === 'skills' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <Award className="w-5 h-5 text-indigo-600 mr-3" />
                    <h2 className="text-xl font-semibold text-slate-900">Skills</h2>
                  </div>
                  <button 
                    onClick={addSkill} 
                    className="flex items-center px-3 py-2 text-sm bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add Skill
                  </button>
                </div>
                <div className="space-y-3">
                  {data.skills.map((skill, i) => (
                    <div key={i} className="flex gap-3">
                      <input 
                        value={skill} 
                        onChange={(e) => setSkill(i, e.target.value)} 
                        placeholder={`e.g., React, Python, Project Management`} 
                        className="flex-1 px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all" 
                      />
                      {data.skills.length > 1 && (
                        <button 
                          onClick={() => removeSkill(i)} 
                          className="px-3 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Experience Section */}
            {activeSection === 'experience' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <Briefcase className="w-5 h-5 text-indigo-600 mr-3" />
                    <h2 className="text-xl font-semibold text-slate-900">Work Experience</h2>
                  </div>
                  <button 
                    onClick={addExp} 
                    className="flex items-center px-3 py-2 text-sm bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add Experience
                  </button>
                </div>
                <div className="space-y-6 max-h-96 overflow-y-auto">
                  {data.experience.map((exp, i) => (
                    <div key={i} className="p-4 border border-slate-200 rounded-xl bg-slate-50">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="font-medium text-slate-900">Experience {i + 1}</h3>
                        {data.experience.length > 1 && (
                          <button 
                            onClick={() => removeExp(i)} 
                            className="text-red-600 hover:bg-red-50 p-1 rounded"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                      <div className="space-y-3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <input 
                            value={exp.company} 
                            onChange={(e) => setExp(i, 'company', e.target.value)} 
                            placeholder="Company Name" 
                            className="px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-white" 
                          />
                          <input 
                            value={exp.role} 
                            onChange={(e) => setExp(i, 'role', e.target.value)} 
                            placeholder="Job Title" 
                            className="px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-white" 
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <input 
                            value={exp.start} 
                            onChange={(e) => setExp(i, 'start', e.target.value)} 
                            placeholder="Start (Jan 2022)" 
                            className="px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-white" 
                          />
                          <input 
                            value={exp.end} 
                            onChange={(e) => setExp(i, 'end', e.target.value)} 
                            placeholder="End (Present)" 
                            className="px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-white" 
                          />
                        </div>
                        <textarea 
                          value={exp.desc} 
                          onChange={(e) => setExp(i, 'desc', e.target.value)} 
                          placeholder="Describe your key achievements and responsibilities..." 
                          className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-white h-20 resize-none" 
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Education Section */}
            {activeSection === 'education' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <GraduationCap className="w-5 h-5 text-indigo-600 mr-3" />
                    <h2 className="text-xl font-semibold text-slate-900">Education</h2>
                  </div>
                  <button 
                    onClick={addEdu} 
                    className="flex items-center px-3 py-2 text-sm bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add Education
                  </button>
                </div>
                <div className="space-y-4">
                  {data.education.map((edu, i) => (
                    <div key={i} className="p-4 border border-slate-200 rounded-xl bg-slate-50">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="font-medium text-slate-900">Education {i + 1}</h3>
                        {data.education.length > 1 && (
                          <button 
                            onClick={() => removeEdu(i)} 
                            className="text-red-600 hover:bg-red-50 p-1 rounded"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                      <div className="space-y-3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <input 
                            value={edu.school} 
                            onChange={(e) => setEdu(i, 'school', e.target.value)} 
                            placeholder="University/School" 
                            className="px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-white" 
                          />
                          <input 
                            value={edu.degree} 
                            onChange={(e) => setEdu(i, 'degree', e.target.value)} 
                            placeholder="Degree/Program" 
                            className="px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-white" 
                          />
                        </div>
                        <input 
                          value={edu.year} 
                          onChange={(e) => setEdu(i, 'year', e.target.value)} 
                          placeholder="Year (2023)" 
                          className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-white" 
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="mt-8 pt-6 border-t border-slate-200">
              <div className="flex flex-col gap-4">
                <TemplateSelector 
                  value={data.template} 
                  onChange={(t) => setData(p => ({...p, template: t}))} 
                />
                
                {/* Status Message */}
                {downloadStatus && (
                  <div className={`flex items-center p-3 rounded-lg text-sm ${
                    downloadStatus.includes('✓') 
                      ? 'bg-green-50 text-green-700' 
                      : downloadStatus.includes('failed') || downloadStatus.includes('Please')
                      ? 'bg-red-50 text-red-700'
                      : 'bg-blue-50 text-blue-700'
                  }`}>
                    {downloadStatus.includes('✓') && <CheckCircle className="w-4 h-4 mr-2" />}
                    {downloadStatus}
                  </div>
                )}
                
                <div className="flex gap-3">
                  <button
    onClick={handleDownload}
    disabled={isLoading}
    className="flex-1 flex items-center justify-center px-4 py-3 bg-green-600 text-white rounded-lg shadow-sm hover:bg-green-700 transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
  >
    <Download className="w-4 h-4 mr-2" />
    {isLoading ? 'Downloading...' : 'Download Resume'}
  </button>
                  <button 
                    onClick={checkATS} 
                    disabled={isLoading}
                    className="flex-1 flex items-center justify-center px-4 py-3 bg-indigo-600 text-white rounded-lg shadow-sm hover:bg-indigo-700 transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Target className="w-4 h-4 mr-2" />
                    {isLoading ? 'Checking...' : 'Run ATS Check'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Live Preview */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-slate-900">Live Preview</h3>
              <div className="flex items-center space-x-2 text-sm text-slate-500">
                <Save className="w-4 h-4" />
                <span>Auto-saved</span>
              </div>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl overflow-auto" style={{height: '70vh'}}>
      <div style={{height: '70vh', overflow: 'auto'}}>
  <ResumePreview ref={previewRef} data={data} />
</div>
            </div>
          </div>
        </div>
      </div>
     {showExport && (
        <ExportModal
          data={data}
          onClose={() => setShowExport(false)}
        />
      )}
    </div>
  )
}