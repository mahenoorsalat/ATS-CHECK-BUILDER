import { TrendingUp, Award, CheckCircle, AlertTriangle, XCircle } from 'lucide-react'

export default function ATSScoreCard({score, details}){
  const getScoreColor = (score) => {
    if (score >= 80) return 'from-green-400 to-emerald-500'
    if (score >= 60) return 'from-yellow-400 to-orange-500'
    return 'from-red-400 to-rose-500'
  }

  const getScoreIcon = (score) => {
    if (score >= 80) return <CheckCircle className="w-6 h-6 text-green-600" />
    if (score >= 60) return <AlertTriangle className="w-6 h-6 text-yellow-600" />
    return <XCircle className="w-6 h-6 text-red-600" />
  }

  const getScoreMessage = (score) => {
    if (score >= 90) return { title: "Excellent!", message: "Your resume is highly optimized for ATS systems." }
    if (score >= 80) return { title: "Great Job!", message: "Your resume should pass most ATS filters." }
    if (score >= 70) return { title: "Good Progress", message: "A few improvements will boost your score significantly." }
    if (score >= 60) return { title: "Needs Work", message: "Consider implementing the suggestions to improve ATS compatibility." }
    return { title: "Major Issues", message: "Your resume needs significant optimization for ATS systems." }
  }

  const circumference = 2 * Math.PI * 45 // radius = 45
  const strokeDasharray = circumference
  const strokeDashoffset = circumference - (score / 100) * circumference

  const scoreInfo = getScoreMessage(score)

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
      <div className="text-center">
        {/* Circular Progress */}
        <div className="relative w-32 h-32 mx-auto mb-6">
          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              className="text-slate-200"
            />
            {/* Progress circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="url(#scoreGradient)"
              strokeWidth="8"
              fill="transparent"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
            />
            <defs>
              <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" className={`text-gradient-${getScoreColor(score).split('-')[1]}-400`} stopColor="currentColor" />
                <stop offset="100%" className={`text-gradient-${getScoreColor(score).split('-')[3]}-500`} stopColor="currentColor" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-3xl font-bold text-slate-900">{score}</div>
              <div className="text-sm text-slate-500">/ 100</div>
            </div>
          </div>
        </div>

        {/* Score Info */}
        <div className="mb-6">
          <div className="flex items-center justify-center mb-2">
            {getScoreIcon(score)}
            <h3 className="text-lg font-semibold text-slate-900 ml-2">{scoreInfo.title}</h3>
          </div>
          <p className="text-sm text-slate-600">{scoreInfo.message}</p>
        </div>

        {/* Score Breakdown */}
        <div className="space-y-3 mb-6">
          <div className="flex justify-between items-center">
            <span className="text-sm text-slate-600">Keywords</span>
            <div className="flex items-center">
              <div className="w-16 bg-slate-200 rounded-full h-2 mr-2">
                <div 
                  className={`h-2 rounded-full bg-gradient-to-r ${getScoreColor(Math.min(score + 5, 100))}`}
                  style={{ width: `${Math.min(score + 5, 100)}%` }}
                ></div>
              </div>
              <span className="text-sm font-medium text-slate-700">{Math.min(score + 5, 100)}%</span>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-slate-600">Format</span>
            <div className="flex items-center">
              <div className="w-16 bg-slate-200 rounded-full h-2 mr-2">
                <div 
                  className={`h-2 rounded-full bg-gradient-to-r ${getScoreColor(Math.max(score - 10, 0))}`}
                  style={{ width: `${Math.max(score - 10, 0)}%` }}
                ></div>
              </div>
              <span className="text-sm font-medium text-slate-700">{Math.max(score - 10, 0)}%</span>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-slate-600">Structure</span>
            <div className="flex items-center">
              <div className="w-16 bg-slate-200 rounded-full h-2 mr-2">
                <div 
                  className={`h-2 rounded-full bg-gradient-to-r ${getScoreColor(score)}`}
                  style={{ width: `${score}%` }}
                ></div>
              </div>
              <span className="text-sm font-medium text-slate-700">{score}%</span>
            </div>
          </div>
        </div>

        {/* Details */}
        {details && (
          <div className="text-left">
            <h4 className="font-semibold text-slate-900 mb-3 flex items-center">
              <TrendingUp className="w-4 h-4 mr-2" />
              Analysis Details
            </h4>
            <div className="bg-slate-50 rounded-lg p-4">
              <pre className="text-xs text-slate-600 whitespace-pre-wrap font-mono">
                {typeof details === 'object' ? JSON.stringify(details, null, 2) : details}
              </pre>
            </div>
          </div>
        )}

        {/* Badge */}
        <div className="mt-6 pt-6 border-t border-slate-200">
          <div className="flex items-center justify-center">
            <Award className="w-5 h-5 text-indigo-600 mr-2" />
            <span className="text-sm font-medium text-slate-700">
              {score >= 80 ? 'ATS Optimized' : score >= 60 ? 'Good Progress' : 'Needs Improvement'}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}