import './globals.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export const metadata = {
  title: 'AI Resume Builder',
  description: 'Create and optimize resumes with an ATS checker',
}

export default function RootLayout({ children }){
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="min-h-[80vh] container mx-auto px-4 py-8">{children}</main>
        <Footer />
      </body>
    </html>
  )
}