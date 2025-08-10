import { Palette } from 'lucide-react'

export default function TemplateSelector({value, onChange}){
  const templates = [
    { 
      id: 'modern', 
      name: 'Modern', 
      description: 'Colorful header with gradient design',
      preview: 'bg-gradient-to-r from-indigo-500 to-purple-500'
    },
    { 
      id: 'minimal', 
      name: 'Minimal', 
      description: 'Clean and simple layout',
      preview: 'bg-slate-900'
    },
    { 
      id: 'classic', 
      name: 'Classic', 
      description: 'Traditional professional format',
      preview: 'bg-slate-700'
    }
  ]

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
      <div className="flex items-center">
        <Palette className="w-4 h-4 text-indigo-600 mr-2" />
        <label className="text-sm font-medium text-slate-700">Template:</label>
      </div>
      <div className="flex gap-2">
        {templates.map(template => (
          <button
            key={template.id}
            onClick={() => onChange(template.id)}
            className={`group relative px-4 py-2 rounded-lg border-2 transition-all ${
              value === template.id 
                ? 'border-indigo-500 bg-indigo-50' 
                : 'border-slate-200 hover:border-slate-300 bg-white'
            }`}
          >
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${template.preview}`}></div>
              <span className={`text-sm font-medium ${
                value === template.id ? 'text-indigo-700' : 'text-slate-700'
              }`}>
                {template.name}
              </span>
            </div>
            
            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-slate-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
              {template.description}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-slate-900"></div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}