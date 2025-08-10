import Link from 'next/link'
import { FileText, Target, Sparkles } from 'lucide-react'

export default function Navbar(){
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="group flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="font-black text-xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                ResumeAI
              </div>
              <div className="text-xs text-slate-500 -mt-1">Professional Builder</div>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            <Link href="/builder" className="group flex items-center px-4 py-2 rounded-lg text-slate-700 hover:bg-slate-50 transition-all duration-200">
              <FileText className="w-4 h-4 mr-2 text-indigo-600" />
              <span className="font-medium">Builder</span>
            </Link>
            <Link href="/ats-check" className="group flex items-center px-4 py-2 rounded-lg text-slate-700 hover:bg-slate-50 transition-all duration-200">
              <Target className="w-4 h-4 mr-2 text-emerald-600" />
              <span className="font-medium">ATS Check</span>
            </Link>
          </div>

          {/* CTA Button */}
          <div className="flex items-center space-x-3">
            <Link href="/builder" className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2.5 rounded-lg font-semibold shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5">
              Get Started
            </Link>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex justify-center space-x-6 mt-4 pt-4 border-t border-slate-100">
          <Link href="/builder" className="flex flex-col items-center text-slate-600 hover:text-indigo-600 transition-colors">
            <FileText className="w-5 h-5 mb-1" />
            <span className="text-xs font-medium">Builder</span>
          </Link>
          <Link href="/ats-check" className="flex flex-col items-center text-slate-600 hover:text-emerald-600 transition-colors">
            <Target className="w-5 h-5 mb-1" />
            <span className="text-xs font-medium">ATS Check</span>
          </Link>
        </div>
      </div>
    </nav>
  )
}