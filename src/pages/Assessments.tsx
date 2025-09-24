import { useMemo, useState } from 'react'

type AnswerMap = {
  q1?: string
  q2?: string
  q3?: string[]
  q4?: string
  q5?: string
  q6?: string
  q7?: string
  q8?: string
  q9a?: number
  q9b?: number
  q9c?: number
  q9d?: number
  q10?: string
  q11?: string
}

const riasecAreas = ['realistic','artistic','social','enterprising','investigative','conventional'] as const
type RIASEC = typeof riasecAreas[number]

export default function Assessments() {
  const [answers, setAnswers] = useState<AnswerMap>({ q3: [], q9a: 3, q9b: 3, q9c: 3, q9d: 3 })
  const [submitted, setSubmitted] = useState(false)
  const [step, setStep] = useState(0)

  const setField = (key: keyof AnswerMap, value: unknown) => {
    setAnswers((prev) => ({ ...prev, [key]: value }))
  }

  const result = useMemo(() => submitted ? analyze(answers) : null, [answers, submitted])
  const steps = useMemo(() => [
    (
      <Block title="Q1. When tackling a new project, you most often:" hint="Choose one">
        <Radio name="q1" value={answers.q1} onChange={(v)=>setField('q1', v)} options={[
          {label:'Plan & organize (planning)', value:'planning'},
          {label:'Jump in & iterate (action)', value:'action'},
          {label:'Discuss & collaborate (collaborative)', value:'collaborative'},
          {label:'Explore options & experiment (exploratory)', value:'exploratory'},
        ]} />
      </Block>
    ),
    (
      <Block title="Q2. In group discussions you usually:" hint="Choose one">
        <Radio name="q2" value={answers.q2} onChange={(v)=>setField('q2', v)} options={[
          {label:'Lead & present (energetic)', value:'energetic'},
          {label:'Listen & synthesize (listening)', value:'listening'},
          {label:'Keep to facts (focused)', value:'focused'},
          {label:'Spark creativity (creative)', value:'creative'},
        ]} />
      </Block>
    ),
    (
      <Block title="Q3. You learn best by:" hint="Pick any that apply">
        <CheckboxGroup value={answers.q3 ?? []} onChange={(v)=>setField('q3', v)} options={[
          {label:'Seeing diagrams / visuals (visual)', value:'visual'},
          {label:'Discussion / listening (auditory)', value:'auditory'},
          {label:'Writing & summarizing (reading/writing)', value:'reading/writing'},
          {label:'Doing hands-on (kinesthetic)', value:'kinesthetic'},
        ]} />
      </Block>
    ),
    (
      <Block title="Q4. Your ideal project involves:" hint="Choose one (RIASEC)">
        <Radio name="q4" value={answers.q4} onChange={(v)=>setField('q4', v)} options={[
          {label:'Building/engineering (realistic)', value:'realistic'},
          {label:'Designing/creating (artistic)', value:'artistic'},
          {label:'Helping people (social)', value:'social'},
          {label:'Leading / starting something (enterprising)', value:'enterprising'},
          {label:'Solving puzzles / researching (investigative)', value:'investigative'},
          {label:'Organizing / managing data (conventional)', value:'conventional'},
        ]} />
      </Block>
    ),
    (
      <Block title="Q5. What matters most in your job choice?" hint="Choose one">
        <Radio name="q5" value={answers.q5} onChange={(v)=>setField('q5', v)} options={[
          {label:'Financial security', value:'financial'},
          {label:'Creative freedom', value:'creative'},
          {label:'Helping others / impact', value:'impact'},
          {label:'Rapid growth & challenge', value:'growth'},
          {label:'Independence / research', value:'independence'},
        ]} />
      </Block>
    ),
    (
      <Block title="Q6. Which subject makes time fly for you?" hint="Choose one">
        <Radio name="q6" value={answers.q6} onChange={(v)=>setField('q6', v)} options={[
          {label:'Math/CS/Physics (STEM)', value:'stem'},
          {label:'Biology/Chemistry (Life sci)', value:'life'},
          {label:'Design/Arts (Creative)', value:'creative'},
          {label:'Languages/History/Law (Humanities)', value:'humanities'},
          {label:'Business/Economics (Commerce)', value:'commerce'},
        ]} />
      </Block>
    ),
    (
      <Block title="Q7. Under pressure you:" hint="Choose one">
        <Radio name="q7" value={answers.q7} onChange={(v)=>setField('q7', v)} options={[
          {label:'Stay calm & logical', value:'calm'},
          {label:'Look for support & talk it out', value:'support'},
          {label:'Jump to practical action', value:'action'},
          {label:'Reflect before acting', value:'reflect'},
        ]} />
      </Block>
    ),
    (
      <Block title="Q8. Where would you prefer to work?" hint="Choose one">
        <Radio name="q8" value={answers.q8} onChange={(v)=>setField('q8', v)} options={[
          {label:'Lab / workshop / field', value:'lab'},
          {label:'Studio / creative space', value:'studio'},
          {label:'Office / corporate', value:'office'},
          {label:'Nonprofit / community setting', value:'nonprofit'},
          {label:'Research institute / academia', value:'academia'},
        ]} />
      </Block>
    ),
    (<Block title="Q9a. Coding/technical skill" hint="Rate 1–5"><Slider label="Coding/technical skill" value={answers.q9a ?? 3} onChange={(n)=>setField('q9a', n)} /></Block>),
    (<Block title="Q9b. Communication / writing" hint="Rate 1–5"><Slider label="Communication / writing" value={answers.q9b ?? 3} onChange={(n)=>setField('q9b', n)} /></Block>),
    (<Block title="Q9c. Design / creativity" hint="Rate 1–5"><Slider label="Design / creativity" value={answers.q9c ?? 3} onChange={(n)=>setField('q9c', n)} /></Block>),
    (<Block title="Q9d. Leadership / organizing" hint="Rate 1–5"><Slider label="Leadership / organizing" value={answers.q9d ?? 3} onChange={(n)=>setField('q9d', n)} /></Block>),
    (
      <Block title="Q10. Describe one project or activity that excited you — what did you enjoy most?" hint="Max 200 characters">
        <textarea value={answers.q10 ?? ''} onChange={(e)=>setField('q10', (e.target.value.slice(0,200)))} className="w-full rounded-md border border-slate-700/70 bg-slate-900/60 text-slate-200 px-3 py-2" rows={3} maxLength={200} />
        <div className="text-xs text-slate-400 text-right">{(answers.q10?.length ?? 0)}/200</div>
      </Block>
    ),
    (
      <Block title="Q11. What’s one goal you want from a career?" hint="Max 100 characters">
        <textarea value={answers.q11 ?? ''} onChange={(e)=>setField('q11', (e.target.value.slice(0,100)))} className="w-full rounded-md border border-slate-700/70 bg-slate-900/60 text-slate-200 px-3 py-2" rows={2} maxLength={100} />
        <div className="text-xs text-slate-400 text-right">{(answers.q11?.length ?? 0)}/100</div>
      </Block>
    ),
  ], [answers])
  const total = steps.length
  const isLast = step === total - 1

  return (
    <section className="container-base py-10">
      <h1 className="section-title text-slate-100">Personalized Career Quiz</h1>
      <p className="mt-2 text-slate-300">Answer a quick set of questions. We’ll analyze your responses and propose a tailored career map.</p>

      {/* Quiz */}
      <div className="mt-6 grid lg:grid-cols-2 gap-6">
        <div className="card">
          <div className="card-body space-y-6">
            {/* Q1 */}
            <Block title="Q1. When tackling a new project, you most often:" hint="Choose one">
              <Radio name="q1" value={answers.q1} onChange={(v)=>setField('q1', v)} options={[
                {label:'Plan & organize (planning)', value:'planning'},
                {label:'Jump in & iterate (action)', value:'action'},
                {label:'Discuss & collaborate (collaborative)', value:'collaborative'},
                {label:'Explore options & experiment (exploratory)', value:'exploratory'},
              ]} />
            </Block>

            {/* Q2 */}
            <Block title="Q2. In group discussions you usually:" hint="Choose one">
              <Radio name="q2" value={answers.q2} onChange={(v)=>setField('q2', v)} options={[
                {label:'Lead & present (energetic)', value:'energetic'},
                {label:'Listen & synthesize (listening)', value:'listening'},
                {label:'Keep to facts (focused)', value:'focused'},
                {label:'Spark creativity (creative)', value:'creative'},
              ]} />
            </Block>

            {/* Q3 */}
            <Block title="Q3. You learn best by:" hint="Pick any that apply">
              <CheckboxGroup value={answers.q3 ?? []} onChange={(v)=>setField('q3', v)} options={[
                {label:'Seeing diagrams / visuals (visual)', value:'visual'},
                {label:'Discussion / listening (auditory)', value:'auditory'},
                {label:'Writing & summarizing (reading/writing)', value:'reading/writing'},
                {label:'Doing hands-on (kinesthetic)', value:'kinesthetic'},
              ]} />
            </Block>

            {/* Q4 */}
            <Block title="Q4. Your ideal project involves:" hint="Choose one (RIASEC)">
              <Radio name="q4" value={answers.q4} onChange={(v)=>setField('q4', v)} options={[
                {label:'Building/engineering (realistic)', value:'realistic'},
                {label:'Designing/creating (artistic)', value:'artistic'},
                {label:'Helping people (social)', value:'social'},
                {label:'Leading / starting something (enterprising)', value:'enterprising'},
                {label:'Solving puzzles / researching (investigative)', value:'investigative'},
                {label:'Organizing / managing data (conventional)', value:'conventional'},
              ]} />
            </Block>

            {/* Q5 */}
            <Block title="Q5. What matters most in your job choice?" hint="Choose one">
              <Radio name="q5" value={answers.q5} onChange={(v)=>setField('q5', v)} options={[
                {label:'Financial security', value:'financial'},
                {label:'Creative freedom', value:'creative'},
                {label:'Helping others / impact', value:'impact'},
                {label:'Rapid growth & challenge', value:'growth'},
                {label:'Independence / research', value:'independence'},
              ]} />
            </Block>

            {/* Q6 */}
            <Block title="Q6. Which subject makes time fly for you?" hint="Choose one">
              <Radio name="q6" value={answers.q6} onChange={(v)=>setField('q6', v)} options={[
                {label:'Math/CS/Physics (STEM)', value:'stem'},
                {label:'Biology/Chemistry (Life sci)', value:'life'},
                {label:'Design/Arts (Creative)', value:'creative'},
                {label:'Languages/History/Law (Humanities)', value:'humanities'},
                {label:'Business/Economics (Commerce)', value:'commerce'},
              ]} />
            </Block>

            {/* Q7 */}
            <Block title="Q7. Under pressure you:" hint="Choose one">
              <Radio name="q7" value={answers.q7} onChange={(v)=>setField('q7', v)} options={[
                {label:'Stay calm & logical', value:'calm'},
                {label:'Look for support & talk it out', value:'support'},
                {label:'Jump to practical action', value:'action'},
                {label:'Reflect before acting', value:'reflect'},
              ]} />
            </Block>

            {/* Q8 */}
            <Block title="Q8. Where would you prefer to work?" hint="Choose one">
              <Radio name="q8" value={answers.q8} onChange={(v)=>setField('q8', v)} options={[
                {label:'Lab / workshop / field', value:'lab'},
                {label:'Studio / creative space', value:'studio'},
                {label:'Office / corporate', value:'office'},
                {label:'Nonprofit / community setting', value:'nonprofit'},
                {label:'Research institute / academia', value:'academia'},
              ]} />
            </Block>
          </div>
        </div>

        {/* Right column */}
        <div className="card">
          <div className="card-body space-y-6">
            {/* Q9 sliders */}
            <Block title="Q9. Quick self-ratings (1–5)" hint="Drag each slider">
              <Slider label="Coding/technical skill" value={answers.q9a ?? 3} onChange={(n)=>setField('q9a', n)} />
              <Slider label="Communication / writing" value={answers.q9b ?? 3} onChange={(n)=>setField('q9b', n)} />
              <Slider label="Design / creativity" value={answers.q9c ?? 3} onChange={(n)=>setField('q9c', n)} />
              <Slider label="Leadership / organizing" value={answers.q9d ?? 3} onChange={(n)=>setField('q9d', n)} />
            </Block>

            {/* Q10 */}
            <Block title="Q10. Describe one project or activity that excited you — what did you enjoy most?" hint="Max 200 characters">
              <textarea
                value={answers.q10 ?? ''}
                onChange={(e)=>setField('q10', e.target.value.slice(0,200))}
                className="w-full rounded-md border border-slate-700/70 bg-slate-900/60 text-slate-200 px-3 py-2"
                rows={3}
                maxLength={200}
              />
              <div className="text-xs text-slate-400 text-right">{(answers.q10?.length ?? 0)}/200</div>
            </Block>

            {/* Q11 */}
            <Block title="Q11. What’s one goal you want from a career?" hint="Max 100 characters">
              <textarea
                value={answers.q11 ?? ''}
                onChange={(e)=>setField('q11', e.target.value.slice(0,100))}
                className="w-full rounded-md border border-slate-700/70 bg-slate-900/60 text-slate-200 px-3 py-2"
                rows={2}
                maxLength={100}
              />
              <div className="text-xs text-slate-400 text-right">{(answers.q11?.length ?? 0)}/100</div>
            </Block>

            <div className="flex items-center justify-between">
              <div className="text-xs text-slate-400">Your responses are stored locally.</div>
              <button className="btn-primary" onClick={()=>setSubmitted(true)}>Analyze & Generate Career Map</button>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      {result && (
        <div className="mt-8 card">
          <div className="card-body">
            <h2 className="text-xl font-semibold text-slate-100">Your Personalized Career Map</h2>
            <div className="mt-4 grid md:grid-cols-3 gap-6">
              <div>
                <h3 className="text-slate-200 font-medium">Profile Summary</h3>
                <ul className="mt-2 space-y-2 text-sm text-slate-300">
                  <li><strong className="text-slate-400">Personality:</strong> {result.personality}</li>
                  <li><strong className="text-slate-400">Communication:</strong> {result.communication}</li>
                  <li><strong className="text-slate-400">Learning style:</strong> {result.learning.join(', ') || '—'}</li>
                  <li><strong className="text-slate-400">RIASEC focus:</strong> {result.riasec.toUpperCase()}</li>
                  <li><strong className="text-slate-400">Work value:</strong> {result.value}</li>
                  <li><strong className="text-slate-400">Environment:</strong> {result.environment}</li>
                </ul>
                <div className="mt-4 space-y-2">
                  <SkillBar label="Technical" score={answers.q9a ?? 3} />
                  <SkillBar label="Communication" score={answers.q9b ?? 3} />
                  <SkillBar label="Creativity" score={answers.q9c ?? 3} />
                  <SkillBar label="Leadership" score={answers.q9d ?? 3} />
                </div>
              </div>
              <div className="md:col-span-2">
                <h3 className="text-slate-200 font-medium">Recommended Paths</h3>
                <div className="mt-3 grid sm:grid-cols-2 gap-3">
                  {result.recommendations.map((rec)=> (
                    <div key={rec.title} className="rounded-lg border border-slate-800/80 bg-slate-900/60 p-3">
                      <div className="flex items-center justify-between">
                        <div className="text-slate-100 font-semibold">{rec.title}</div>
                        <span className="text-xs text-slate-400">{rec.track}</span>
                      </div>
                      <div className="mt-2 text-sm text-slate-300">{rec.note}</div>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {rec.skills.map(s => (
                          <span key={s} className="text-xs px-2 py-0.5 rounded bg-white/5 border border-slate-700/60 text-slate-300">{s}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

// UI helpers
function Block({ title, hint, children }: { title: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h3 className="text-slate-200 font-medium">{title}</h3>
        {hint && <span className="text-xs text-slate-500">{hint}</span>}
      </div>
      <div className="mt-2">{children}</div>
    </div>
  )
}

function Radio({ name, value, onChange, options }:{ name:string; value?:string; onChange:(v:string)=>void; options:{label:string; value:string}[] }){
  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {options.map(opt => (
        <label key={opt.value} className={`flex items-center gap-2 rounded-md border px-3 py-2 cursor-pointer transition ${value===opt.value ? 'border-violet-500/60 bg-violet-500/10 text-slate-100' : 'border-slate-700/70 bg-slate-900/60 text-slate-300 hover:bg-white/5'}`}>
          <input type="radio" name={name} className="accent-violet-500" checked={value===opt.value} onChange={()=>onChange(opt.value)} />
          <span className="text-sm">{opt.label}</span>
        </label>
      ))}
    </div>
  )
}

function CheckboxGroup({ value, onChange, options }:{ value:string[]; onChange:(v:string[])=>void; options:{label:string; value:string}[] }){
  const toggle = (v:string) => {
    if (value.includes(v)) onChange(value.filter(x=>x!==v))
    else onChange([...value, v])
  }
  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {options.map(opt => (
        <label key={opt.value} className={`flex items-center gap-2 rounded-md border px-3 py-2 cursor-pointer transition ${value.includes(opt.value) ? 'border-violet-500/60 bg-violet-500/10 text-slate-100' : 'border-slate-700/70 bg-slate-900/60 text-slate-300 hover:bg-white/5'}`}>
          <input type="checkbox" className="accent-violet-500" checked={value.includes(opt.value)} onChange={()=>toggle(opt.value)} />
          <span className="text-sm">{opt.label}</span>
        </label>
      ))}
    </div>
  )
}

function Slider({ label, value, onChange }:{ label:string; value:number; onChange:(n:number)=>void }){
  return (
    <div>
      <div className="flex items-center justify-between">
        <span className="text-sm text-slate-300">{label}</span>
        <span className="text-xs text-slate-400">{value}</span>
      </div>
      <input type="range" min={1} max={5} step={1} value={value} onChange={(e)=>onChange(parseInt(e.target.value))}
        className="w-full accent-violet-500" />
    </div>
  )
}

function SkillBar({ label, score }:{ label:string; score:number }){
  const pct = Math.round((score/5)*100)
  return (
    <div>
      <div className="flex items-center justify-between text-xs text-slate-400">
        <span>{label}</span>
        <span>{pct}%</span>
      </div>
      <div className="h-2 rounded bg-slate-800 overflow-hidden">
        <div className="h-2 bg-violet-500/70" style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}

// Analysis logic
function analyze(a: AnswerMap){
  // Determine personality blend from Q1 + Q2
  const personality = a.q1 ?? 'balanced'
  const communication = a.q2 ?? 'balanced'
  const learning = (a.q3 && a.q3.length>0) ? a.q3 : ['mixed']
  const riasec = (a.q4 ?? 'investigative') as RIASEC
  const value = a.q5 ?? 'growth'
  const environment = a.q8 ?? 'office'

  // Seed tags from answers
  const tags = new Set<string>([])
  if (a.q6 === 'stem') tags.add('STEM')
  if (a.q6 === 'creative') tags.add('Design')
  if (a.q6 === 'life') tags.add('Biology')
  if (a.q6 === 'humanities') tags.add('Humanities')
  if (a.q6 === 'commerce') tags.add('Business')
  if ((a.q9a ?? 0) >= 4) tags.add('Coding')
  if ((a.q9c ?? 0) >= 4) tags.add('Creativity')
  if ((a.q9d ?? 0) >= 4) tags.add('Leadership')

  // Build recommendations based on RIASEC and strengths
  const recs = recommend(riasec, tags)

  return {
    personality,
    communication,
    learning,
    riasec,
    value,
    environment,
    recommendations: recs,
  }
}

function recommend(riasec: RIASEC, tags: Set<string>){
  const common = [
    { title:'Data Analyst', track:'Analytics', note:'Use data to drive decisions and insights.', skills:['SQL','Python','Dashboards'] },
    { title:'Product Manager', track:'Product', note:'Bridge users, design, and engineering.', skills:['Roadmaps','User Research','Leadership'] },
  ]
  const map: Record<RIASEC, { title:string; track:string; note:string; skills:string[] }[]> = {
    realistic: [
      { title:'Mechanical Engineer', track:'Engineering', note:'Design and build physical systems.', skills:['CAD','Materials','Manufacturing'] },
      { title:'Field Technician', track:'Operations', note:'Hands-on problem solving in the field.', skills:['Diagnostics','Repair','Safety'] },
    ],
    artistic: [
      { title:'UI/UX Designer', track:'Design', note:'Craft intuitive interfaces and experiences.', skills:['Wireframes','Figma','User Testing'] },
      { title:'Content Designer', track:'Creative', note:'Create visuals and narratives.', skills:['Branding','Illustration','Storytelling'] },
    ],
    social: [
      { title:'Counselor / Coach', track:'People', note:'Guide others toward goals.', skills:['Empathy','Active Listening','Programs'] },
      { title:'Community Manager', track:'People', note:'Grow and support communities.', skills:['Communication','Events','Content'] },
    ],
    enterprising: [
      { title:'Startup Founder', track:'Entrepreneurship', note:'Build and scale new ventures.', skills:['Pitching','Strategy','Leadership'] },
      { title:'Business Analyst', track:'Business', note:'Analyze markets and operations.', skills:['Research','Modeling','Presentation'] },
    ],
    investigative: [
      { title:'Research Scientist', track:'R&D', note:'Design and run experiments.', skills:['Methodology','Statistics','Papers'] },
      { title:'Software Engineer', track:'Engineering', note:'Build reliable systems and apps.', skills:['DSA','APIs','Testing'] },
    ],
    conventional: [
      { title:'Operations Analyst', track:'Ops', note:'Optimize processes and workflows.', skills:['Spreadsheets','Process','KPIs'] },
      { title:'Financial Analyst', track:'Finance', note:'Evaluate performance and risk.', skills:['Excel','Modeling','Reporting'] },
    ],
  }

  let recs = map[riasec]
  if (tags.has('Design')) recs = [...recs, { title:'Front-end Developer', track:'Web', note:'Implement delightful UIs.', skills:['React','TypeScript','CSS'] }]
  if (tags.has('Coding')) recs = [...recs, { title:'Backend Developer', track:'Software', note:'Build APIs and services.', skills:['Node.js','Express','PostgreSQL'] }]
  if (tags.has('Leadership')) recs = [...recs, { title:'Team Lead', track:'Management', note:'Coordinate people and projects.', skills:['Planning','Coaching','Delivery'] }]
  return [...recs, ...common].slice(0,6)
}
