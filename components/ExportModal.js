'use client'
import ResumePreview from './ResumePreview'

export default function ExportModal({ data, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-5xl w-full overflow-auto max-h-[90vh]">

        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">Export Resume Preview</h2>
          <button
            onClick={onClose}
            className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
          >
            Close
          </button>
        </div>

        {/* Resume Preview */}
        <div className="p-4 print-area">
          <ResumePreview data={data} />
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 p-4 border-t">
          <button
            onClick={() => window.print()}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Print / Download PDF
          </button>
        </div>
      </div>
    </div>
  )
}
