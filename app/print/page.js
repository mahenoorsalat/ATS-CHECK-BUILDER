'use client'
import { useEffect, useRef, useState } from 'react'
import ResumePreview from '../../components/ResumePreview'

export default function PrintPage() {
  const [data, setData] = useState(null)
  const [showExport, setShowExport] = useState(false)
  const previewRef = useRef(null)

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem('resume_print_data')
      const exportFlag = sessionStorage.getItem('resume_export_flag') === 'true'
      sessionStorage.removeItem('resume_export_flag') // reset

      setData(saved ? JSON.parse(saved) : {})
      setShowExport(exportFlag)
    } catch {
      setData({})
    }
  }, [])

  useEffect(() => {
    if (!data) return

    const timer = setTimeout(() => {
      setShowExport(false)
      setTimeout(() => window.print(), 300) // give time to render actual content
    }, showExport ? 1200 : 300) // export animation delay

    const handleAfterPrint = () => window.close()
    window.addEventListener('afterprint', handleAfterPrint)
    return () => {
      clearTimeout(timer)
      window.removeEventListener('afterprint', handleAfterPrint)
    }
  }, [data, showExport])

  return (
    <div className="bg-white mx-auto" style={{ width: '210mm', minHeight: '297mm' }}>
      <style>{`
        @page { size: A4; margin: 12mm; }
        html, body { background: white; }
        body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      `}</style>
      {data ? (
        <ResumePreview ref={previewRef} data={data} isExport={showExport} />
      ) : (
        <div style={{ padding: 24 }}>Preparing preview…</div>
      )}
    </div>
  )
}
