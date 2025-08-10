'use client'
import { useEffect, useRef, useState } from 'react'
import ResumePreview from '../../components/ResumePreview'

export default function PrintPage() {
  const [data, setData] = useState(null)
  const previewRef = useRef(null)

  useEffect(() => {
    try {
      const saved = localStorage.getItem('resume_data')
      setData(saved ? JSON.parse(saved) : {})
    } catch {
      setData({})
    }
  }, [])

  useEffect(() => {
    if (!data) return
    const timer = setTimeout(() => {
      window.print()
    }, 400)

    const handleAfterPrint = () => {
      window.close()
    }

    window.addEventListener('afterprint', handleAfterPrint)
    return () => {
      clearTimeout(timer)
      window.removeEventListener('afterprint', handleAfterPrint)
    }
  }, [data])

  return (
    <div className="bg-white mx-auto" style={{ width: '210mm', minHeight: '297mm' }}>
      <style>{`
        @page { size: A4; margin: 12mm; }
        html, body { background: white; }
        body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      `}</style>
      {data ? (
        <ResumePreview ref={previewRef} data={data} />
      ) : (
        <div style={{ padding: 24 }}>Preparing preview…</div>
      )}
    </div>
  )
}