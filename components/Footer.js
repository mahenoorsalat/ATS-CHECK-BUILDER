import Link from 'next/link'
import { Heart, Github, Twitter, Linkedin, Mail } from 'lucide-react'

export default function Footer(){
  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">RA</span>
              </div>
              <div>
                <div className="font-bold text-lg">ResumeAI</div>
                <div className="text-xs text-slate-400">Professional Builder</div>
              </div>
            </div>
            <p className="text-slate-300 mb-6 max-w-md">
              The fastest way to create ATS-optimized resumes that land interviews. 
              Built with modern AI technology and loved by professionals worldwide.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-slate-300">
              <li>
                <Link href="/builder" className="hover:text-white transition-colors">
                  Resume Builder
                </Link>
              </li>
              <li>
                <Link href="/ats-check" className="hover:text-white transition-colors">
                  ATS Checker
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Templates
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Examples
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-white mb-4">Resources</h3>
            <ul className="space-y-2 text-slate-300">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Career Tips
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Interview Guide
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Cover Letters
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Job Search
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-slate-400 text-sm mb-4 md:mb-0">
            © 2024 ResumeAI. All rights reserved.
          </div>
          <div className="flex items-center text-slate-400 text-sm">
            <span>Made with</span>
            <Heart className="w-4 h-4 mx-2 text-red-500" />
            <span>for job seekers everywhere</span>
          </div>
        </div>
      </div>
    </footer>
  )
}