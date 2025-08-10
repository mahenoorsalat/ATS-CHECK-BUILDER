import Link from 'next/link'
import { ArrowRight, CheckCircle, Download, FileText, Target, Zap } from 'lucide-react'

export default function Home(){
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5"></div>
        <div className="relative max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium mb-6">
            <Zap className="w-4 h-4 mr-2" />
            AI-Powered Resume Builder
          </div>
          
          <h1 className="text-5xl sm:text-7xl font-black mb-6 bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900 bg-clip-text text-transparent leading-tight">
            Land Your Dream Job
            <span className="block text-indigo-600">10x Faster</span>
          </h1>
          
          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Create ATS-optimized resumes with real-time scoring, beautiful templates, and instant PDF export. 
            Built for modern job seekers who refuse to settle.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <Link href="/builder" className="group px-8 py-4 bg-indigo-600 text-white rounded-xl shadow-lg hover:bg-indigo-700 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 font-semibold flex items-center justify-center">
              Start Building Free
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/ats-check" className="px-8 py-4 border-2 border-slate-200 text-slate-700 rounded-xl hover:border-indigo-300 hover:bg-indigo-50 transition-all duration-300 font-semibold">
              Test ATS Score
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-900">95%</div>
              <div className="text-sm text-slate-500">ATS Pass Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-900">2 Min</div>
              <div className="text-sm text-slate-500">Build Time</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-900">50K+</div>
              <div className="text-sm text-slate-500">Resumes Built</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-900">4.9★</div>
              <div className="text-sm text-slate-500">User Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-slate-900">Everything You Need to Win</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Professional features that give you the edge over other candidates
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group p-8 rounded-2xl bg-gradient-to-br from-indigo-50 to-white border border-indigo-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">Live Preview</h3>
              <p className="text-slate-600 leading-relaxed">
                Watch your resume come to life instantly as you type. No more guessing how it looks - 
                see real-time updates with pixel-perfect formatting.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-slate-500">
                <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-500" />Real-time rendering</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-500" />Multiple templates</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-500" />Mobile responsive</li>
              </ul>
            </div>

            <div className="group p-8 rounded-2xl bg-gradient-to-br from-emerald-50 to-white border border-emerald-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">ATS Optimization</h3>
              <p className="text-slate-600 leading-relaxed">
                Get an instant score out of 100 with detailed feedback. Our AI analyzes your resume 
                like real ATS systems used by Fortune 500 companies.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-slate-500">
                <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-500" />Keyword analysis</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-500" />Format validation</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-500" />Improvement tips</li>
              </ul>
            </div>

            <div className="group p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-white border border-purple-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Download className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">Perfect Export</h3>
              <p className="text-slate-600 leading-relaxed">
                Download publication-ready PDFs that maintain perfect formatting across all devices 
                and platforms. No more broken layouts or formatting issues.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-slate-500">
                <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-500" />High-quality PDF</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-500" />Print-ready format</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-500" />Universal compatibility</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Career?</h2>
          <p className="text-xl mb-8 text-indigo-100">
            Join thousands of professionals who've already landed their dream jobs with our AI-powered resume builder.
          </p>
          <Link href="/builder" className="inline-flex items-center px-8 py-4 bg-white text-indigo-600 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
            Build Your Resume Now
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
          <p className="mt-4 text-sm text-indigo-200">No credit card required • 100% free • Takes 2 minutes</p>
        </div>
      </section>
    </div>
  )
}