import React, { forwardRef } from 'react';


const ResumePreview = forwardRef(({ data }, ref) => {
  const p = data.personal || {};
  const template = data.template || 'modern';

  if (template === 'modern') {
    return (
      <div ref={ref}  className="max-w-[21cm] mx-auto bg-white text-slate-900 font-sans">
        {/* Header */}
        <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-8 rounded-t-lg">
          <h1 className="text-3xl font-bold mb-2">{p.name || 'Your Full Name'}</h1>
          <p className="text-xl text-indigo-100 mb-3">{p.title || 'Professional Title'}</p>
          <div className="flex flex-wrap gap-4 text-sm">
            <span className="flex items-center">
              📧 {p.email || 'your.email@example.com'}
            </span>
            <span className="flex items-center">
              📱 {p.phone || '+1 (555) 123-4567'}
            </span>
            <span className="flex items-center">
              📍 {p.location || 'City, State'}
            </span>
          </div>
        </header>

        <div className="p-8 space-y-6">
          {/* Skills */}
          {data.skills && data.skills.filter(Boolean).length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4 pb-2 border-b-2 border-indigo-600">
                Core Skills
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {data.skills.filter(Boolean).map((skill, i) => (
                  <div key={i} className="bg-indigo-50 text-indigo-700 px-3 py-2 rounded-lg text-sm font-medium">
                    {skill}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Experience */}
          {data.experience && data.experience.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4 pb-2 border-b-2 border-indigo-600">
                Professional Experience
              </h2>
              <div className="space-y-5">
                {data.experience.map((exp, i) => (
                  <div key={i} className="relative pl-6 before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-indigo-600 before:rounded-full">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900">
                          {exp.role || 'Job Title'}
                        </h3>
                        <p className="text-indigo-600 font-medium">
                          {exp.company || 'Company Name'}
                        </p>
                      </div>
                      <span className="text-sm text-slate-500 bg-slate-100 px-3 py-1 rounded-full mt-1 md:mt-0">
                        {exp.start || 'Start'} - {exp.end || 'End'}
                      </span>
                    </div>
                    <p className="text-slate-700 leading-relaxed">
                      {exp.desc || 'Describe your key achievements and responsibilities in this role.'}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {data.education && data.education.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4 pb-2 border-b-2 border-indigo-600">
                Education
              </h2>
              <div className="space-y-3">
                {data.education.map((edu, i) => (
                  <div key={i} className="flex flex-col md:flex-row md:justify-between">
                    <div>
                      <h3 className="font-semibold text-slate-900">
                        {edu.degree || 'Degree/Program'}
                      </h3>
                      <p className="text-indigo-600">
                        {edu.school || 'School/University Name'}
                      </p>
                    </div>
                    <span className="text-sm text-slate-500 bg-slate-100 px-3 py-1 rounded-full self-start mt-1 md:mt-0">
                      {edu.year || 'Year'}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    )
  }

  if (template === 'minimal') {
    return (
      <div ref={ref}  className="max-w-[21cm] mx-auto bg-white text-slate-900 font-sans">
        {/* Header */}
        <header className="border-b-4 border-slate-900 pb-6 mb-8">
          <h1 className="text-4xl font-light mb-2">{p.name || 'Your Full Name'}</h1>
          <p className="text-lg text-slate-600 mb-4">{p.title || 'Professional Title'}</p>
          <div className="flex flex-wrap gap-6 text-sm text-slate-600">
            <span>{p.email || 'your.email@example.com'}</span>
            <span>{p.phone || '+1 (555) 123-4567'}</span>
            <span>{p.location || 'City, State'}</span>
          </div>
        </header>

        <div className="space-y-8">
          {/* Skills */}
          {data.skills && data.skills.filter(Boolean).length > 0 && (
            <section>
              <h2 className="text-lg font-medium text-slate-900 mb-3 uppercase tracking-wider">
                Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {data.skills.filter(Boolean).map((skill, i) => (
                  <span key={i} className="text-sm text-slate-700">
                    {skill}{i < data.skills.filter(Boolean).length - 1 ? ' •' : ''}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Experience */}
          {data.experience && data.experience.length > 0 && (
            <section>
              <h2 className="text-lg font-medium text-slate-900 mb-4 uppercase tracking-wider">
                Experience
              </h2>
              <div className="space-y-6">
                {data.experience.map((exp, i) => (
                  <div key={i}>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium text-slate-900">
                          {exp.role || 'Job Title'}
                        </h3>
                        <p className="text-slate-600">
                          {exp.company || 'Company Name'}
                        </p>
                      </div>
                      <span className="text-sm text-slate-500">
                        {exp.start || 'Start'} - {exp.end || 'End'}
                      </span>
                    </div>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      {exp.desc || 'Describe your key achievements and responsibilities.'}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {data.education && data.education.length > 0 && (
            <section>
              <h2 className="text-lg font-medium text-slate-900 mb-4 uppercase tracking-wider">
                Education
              </h2>
              <div className="space-y-2">
                {data.education.map((edu, i) => (
                  <div key={i} className="flex justify-between">
                    <div>
                      <span className="font-medium text-slate-900">
                        {edu.degree || 'Degree'}
                      </span>
                      <span className="text-slate-600 ml-2">
                        {edu.school || 'School'}
                      </span>
                    </div>
                    <span className="text-sm text-slate-500">
                      {edu.year || 'Year'}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    )
  }

  // Classic template (default)
  return (


    <div ref={ref} className="max-w-[21cm] mx-auto bg-white text-slate-900 font-serif">
      {/* Header */}
      <header className="text-center border-b-2 border-slate-300 pb-6 mb-8">
        <h1 className="text-3xl font-bold mb-2">{p.name || 'Your Full Name'}</h1>
        <p className="text-lg text-slate-600 mb-3">{p.title || 'Professional Title'}</p>
        <div className="flex justify-center gap-4 text-sm text-slate-600">
          <span>{p.email || 'your.email@example.com'}</span>
          <span>|</span>
          <span>{p.phone || '+1 (555) 123-4567'}</span>
          <span>|</span>
          <span>{p.location || 'City, State'}</span>
        </div>
      </header>

      <div className="space-y-6">
        {/* Skills */}
        {data.skills && data.skills.filter(Boolean).length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3 border-b border-slate-300 pb-1">
              SKILLS
            </h2>
            <p className="text-slate-700">
              {data.skills.filter(Boolean).join(' • ')}
            </p>
          </section>
        )}

        {/* Experience */}
        {data.experience && data.experience.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4 border-b border-slate-300 pb-1">
              PROFESSIONAL EXPERIENCE
            </h2>
            <div className="space-y-5">
              {data.experience.map((exp, i) => (
                <div key={i}>
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h3 className="font-bold text-slate-900">
                        {exp.role || 'Job Title'}
                      </h3>
                      <p className="italic text-slate-700">
                        {exp.company || 'Company Name'}
                      </p>
                    </div>
                    <span className="text-sm text-slate-600">
                      {exp.start || 'Start'} - {exp.end || 'End'}
                    </span>
                  </div>
                  <p className="text-slate-700 leading-relaxed">
                    {exp.desc || 'Describe your key achievements and responsibilities.'}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {data.education && data.education.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3 border-b border-slate-300 pb-1">
              EDUCATION
            </h2>
            <div className="space-y-2">
              {data.education.map((edu, i) => (
                <div key={i} className="flex justify-between">
                  <div>
                    <span className="font-bold text-slate-900">
                      {edu.degree || 'Degree'}
                    </span>
                    <span className="text-slate-700 ml-2">
                      - {edu.school || 'School'}
                    </span>
                  </div>
                  <span className="text-slate-600">
                    {edu.year || 'Year'}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
});

export default ResumePreview;