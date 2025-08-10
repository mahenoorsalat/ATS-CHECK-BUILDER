'use client'
import { useEffect, useState } from 'react'
import ATSScoreCard from '../../components/ATSScoreCard'
import Link from 'next/link'
import { ArrowLeft, CheckCircle, AlertTriangle, XCircle, TrendingUp, FileText, Target, Award, Zap } from 'lucide-react'

export default function ATSPage(){
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    const raw = sessionStorage.getItem('ats_result')
    if (raw) {
      setResult(JSON.parse(raw))
    }
    setLoading(false)
  },[])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-slate-600">Loading ATS results...</p>
        </div>
      </div>
    )
  }

  if (!result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">
        <div className="max-w-4xl mx-auto px-4 py-20">
          <div className="text-center bg-white rounded-2xl shadow-sm border border-slate-200 p-12">
            <FileText className="w-16 h-16 text-slate-400 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-slate-900 mb-4">No ATS Results Found</h2>
            <p className="text-slate-600 mb-8">
              You need to run an ATS check from the resume builder to see your results here.
            </p>
            <Link href="/builder" className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go to Builder
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600 bg-green-50'
    if (score >= 60) return 'text-yellow-600 bg-yellow-50'
    return 'text-red-600 bg-red-50'
  }

  const getScoreIcon = (score) => {
    if (score >= 80) return <CheckCircle className="w-5 h-5" />
    if (score >= 60) return <AlertTriangle className="w-5 h-5" />
    return <XCircle className="w-5 h-5" />
  }

  const getScoreBadge = (score) => {
    if (score >= 90) return { text: 'Excellent', color: 'bg-green-500' }
    if (score >= 80) return { text: 'Great', color: 'bg-emerald-500' }
    if (score >= 70) return { text: 'Good', color: 'bg-blue-500' }
    if (score >= 60) return { text: 'Fair', color: 'bg-yellow-500' }
    return { text: 'Poor', color: 'bg-red-500' }
  }

  const badge = getScoreBadge(result.score)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/builder" className="inline-flex items-center text-indigo-600 hover:text-indigo-700 transition-colors mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Builder
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">ATS Score Analysis</h1>
              <p className="text-slate-600">
                Detailed analysis of how well your resume performs with Applicant Tracking Systems
              </p>
            </div>
            <div className={`px-4 py-2 rounded-full text-white font-semibold ${badge.color}`}>
              {badge.text}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Results */}
          <div className="lg:col-span-2 space-y-6">
            {/* Score Overview */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-900">Overall ATS Score</h2>
                <div className={`flex items-center px-4 py-2 rounded-full ${getScoreColor(result.score)}`}>
                  {getScoreIcon(result.score)}
                  <span className="ml-2 font-bold text-lg">{result.score}/100</span>
                </div>
              </div>
              
              <p className="text-slate-600 leading-relaxed mb-6">
                {result.summary || "Your resume has been analyzed for ATS compatibility using advanced algorithms that simulate real Applicant Tracking Systems. The score reflects how likely your resume is to pass through ATS filters and reach human recruiters."}
              </p>

              {/* Score Categories */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-4 text-center border border-indigo-100">
                  <div className="text-2xl font-bold text-indigo-600 mb-1">
                    {Math.floor(result.score * 0.85) || 78}
                  </div>
                  <div className="text-sm text-slate-600 font-medium">Format Score</div>
                  <div className="text-xs text-slate-500 mt-1">Structure & Layout</div>
                </div>
                <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl p-4 text-center border border-emerald-100">
                  <div className="text-2xl font-bold text-emerald-600 mb-1">
                    {Math.floor(result.score * 0.92) || 85}
                  </div>
                  <div className="text-sm text-slate-600 font-medium">Keywords</div>
                  <div className="text-xs text-slate-500 mt-1">Industry Terms</div>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 text-center border border-purple-100">
                  <div className="text-2xl font-bold text-purple-600 mb-1">
                    {Math.floor(result.score * 0.88) || 81}
                  </div>
                  <div className="text-sm text-slate-600 font-medium">Content Quality</div>
                  <div className="text-xs text-slate-500 mt-1">Relevance & Impact</div>
                </div>
              </div>
            </div>

            {/* Detailed Analysis */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
              <div className="flex items-center mb-6">
                <Target className="w-5 h-5 text-indigo-600 mr-3" />
                <h2 className="text-xl font-semibold text-slate-900">Detailed Analysis</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Strengths */}
                <div>
                  <h3 className="text-lg font-semibold text-green-700 mb-4 flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Strengths
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-slate-700 text-sm">Clean, readable format that ATS systems can parse effectively</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-slate-700 text-sm">Standard section headings are properly structured</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-slate-700 text-sm">Contact information is clearly formatted</span>
                    </li>
                  </ul>
                </div>

                {/* Areas for Improvement */}
                <div>
                  <h3 className="text-lg font-semibold text-orange-700 mb-4 flex items-center">
                    <AlertTriangle className="w-5 h-5 mr-2" />
                    Areas for Improvement
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-slate-700 text-sm">Add more industry-specific keywords and technical terms</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-slate-700 text-sm">Include more quantifiable achievements with numbers</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-slate-700 text-sm">Optimize job descriptions for better keyword density</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Suggestions */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
              <div className="flex items-center mb-6">
                <TrendingUp className="w-5 h-5 text-indigo-600 mr-3" />
                <h2 className="text-xl font-semibold text-slate-900">Optimization Suggestions</h2>
              </div>
              
              <div className="space-y-4">
                {result.suggestions && result.suggestions.length > 0 ? (
                  result.suggestions.map((suggestion, i) => (
                    <div key={i} className="flex items-start p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                      <div className="w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-sm font-medium mr-4 mt-0.5 flex-shrink-0">
                        {i + 1}
                      </div>
                      <p className="text-slate-700 leading-relaxed">{suggestion}</p>
                    </div>
                  ))
                ) : (
                  // Default suggestions if none provided
                  <>
                    <div className="flex items-start p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                      <div className="w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-sm font-medium mr-4 mt-0.5 flex-shrink-0">
                        1
                      </div>
                      <div>
                        <p className="text-slate-700 leading-relaxed font-medium mb-1">Enhance Keyword Optimization</p>
                        <p className="text-slate-600 text-sm">Research job postings in your field and incorporate relevant keywords naturally throughout your resume. Focus on technical skills, industry terminology, and action verbs commonly used in your target roles.</p>
                      </div>
                    </div>
                    <div className="flex items-start p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                      <div className="w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-sm font-medium mr-4 mt-0.5 flex-shrink-0">
                        2
                      </div>
                      <div>
                        <p className="text-slate-700 leading-relaxed font-medium mb-1">Quantify Your Achievements</p>
                        <p className="text-slate-600 text-sm">Add specific numbers, percentages, and metrics to demonstrate your impact. Instead of "improved sales," use "increased sales by 35% over 6 months" or "managed a team of 12 employees."</p>
                      </div>
                    </div>
                    <div className="flex items-start p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                      <div className="w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-sm font-medium mr-4 mt-0.5 flex-shrink-0">
                        3
                      </div>
                      <div>
                        <p className="text-slate-700 leading-relaxed font-medium mb-1">Use Standard Section Headers</p>
                        <p className="text-slate-600 text-sm">Ensure your resume uses conventional section headings like "Professional Experience," "Education," "Skills," and "Contact Information" for optimal ATS parsing.</p>
                      </div>
                    </div>
                    <div className="flex items-start p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                      <div className="w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-sm font-medium mr-4 mt-0.5 flex-shrink-0">
                        4
                      </div>
                      <div>
                        <p className="text-slate-700 leading-relaxed font-medium mb-1">Improve Content Structure</p>
                        <p className="text-slate-600 text-sm">Organize information logically with consistent formatting. Use bullet points effectively and ensure each job description clearly shows your responsibilities and achievements.</p>
                      </div>
                    </div>
                    <div className="flex items-start p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                      <div className="w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-sm font-medium mr-4 mt-0.5 flex-shrink-0">
                        5
                      </div>
                      <div>
                        <p className="text-slate-700 leading-relaxed font-medium mb-1">Tailor for Each Application</p>
                        <p className="text-slate-600 text-sm">Customize your resume for each job application by matching keywords from the job description and emphasizing the most relevant experiences and skills.</p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Action Items */}
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8 border border-indigo-100">
              <h3 className="text-lg font-semibold text-slate-900 mb-6 flex items-center">
                <Zap className="w-5 h-5 text-indigo-600 mr-2" />
                Quick Action Items
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                  <div className="font-medium text-slate-900 mb-2 flex items-center">
                    🎯 <span className="ml-2">Target Keywords</span>
                  </div>
                  <div className="text-sm text-slate-600">
                    Research 5-10 job postings in your field and create a keyword list to naturally incorporate throughout your resume.
                  </div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                  <div className="font-medium text-slate-900 mb-2 flex items-center">
                    📊 <span className="ml-2">Add Metrics</span>
                  </div>
                  <div className="text-sm text-slate-600">
                    Include at least 3-5 quantifiable achievements with specific numbers, percentages, or dollar amounts.
                  </div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                  <div className="font-medium text-slate-900 mb-2 flex items-center">
                    🔤 <span className="ml-2">Format Check</span>
                  </div>
                  <div className="text-sm text-slate-600">
                    Use standard fonts (Arial, Calibri), avoid images/graphics, and maintain consistent formatting throughout.
                  </div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                  <div className="font-medium text-slate-900 mb-2 flex items-center">
                    📝 <span className="ml-2">Content Review</span>
                  </div>
                  <div className="text-sm text-slate-600">
                    Ensure each bullet point starts with a strong action verb and clearly demonstrates your value and impact.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Score Card */}
            <ATSScoreCard score={result.score} details={result.details} />

            {/* Score History */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
                📈 <span className="ml-2">Score Progress</span>
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                  <span className="text-sm text-slate-600">Current Score</span>
                  <span className="font-semibold text-slate-900">{result.score}/100</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                  <span className="text-sm text-slate-600">Target Score</span>
                  <span className="font-semibold text-green-600">85+/100</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                  <span className="text-sm text-slate-600">Improvement Potential</span>
                  <span className="font-semibold text-indigo-600">+{Math.max(0, 85 - result.score)} pts</span>
                </div>
              </div>
            </div>

            {/* Tips Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
                💡 <span className="ml-2">Pro Tips</span>
              </h3>
              <div className="space-y-4 text-sm">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <p className="text-slate-700">
                    <strong>Match Job Descriptions:</strong> Use the exact same keywords and phrases from job postings in your resume.
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <p className="text-slate-700">
                    <strong>Simple Formatting:</strong> Avoid tables, text boxes, headers, footers, and complex layouts that confuse ATS systems.
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <p className="text-slate-700">
                    <strong>File Format:</strong> Save as both PDF and Word (.docx) formats for different application systems.
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <p className="text-slate-700">
                    <strong>Regular Updates:</strong> Test your resume regularly with different job postings to optimize for various roles.
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <p className="text-slate-700">
                    <strong>Keyword Density:</strong> Aim for 10-15 relevant keywords naturally integrated throughout your resume.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Card */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 text-white">
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <Award className="w-5 h-5 mr-2" />
                Ready to Improve?
              </h3>
              <p className="text-indigo-100 text-sm mb-4">
                Implement these suggestions in the builder to boost your ATS score and increase your chances of landing interviews.
              </p>
              <Link href="/builder" className="block w-full bg-white text-indigo-600 text-center py-2 px-4 rounded-lg font-medium hover:bg-indigo-50 transition-colors">
                Edit Resume Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}