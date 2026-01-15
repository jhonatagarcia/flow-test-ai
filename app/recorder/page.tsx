"use client"
import { useState } from "react"

const SAMPLE_UI = [
  { id: 'btn-login', label: 'Clicar em Entrar' },
  { id: 'input-email', label: 'Preencher email' },
  { id: 'input-pass', label: 'Preencher senha' },
  { id: 'btn-submit', label: 'Submit' },
]

export default function Recorder(){
  const [recording, setRecording] = useState(false)
  const [steps, setSteps] = useState([])

  function toggle(){
    setRecording(!recording)
    if(!recording){
      setSteps([])
    }
  }

  function addStep(item){
    if(!recording) return
    const step = { ts: Date.now(), action: item.label, selector: `#${item.id}` }
    setSteps(s => [...s, step])
  }

  function exportSnippet(){
    const lines = [
      "import { test, expect } from '@playwright/test';",
      "",
      "test('recorded flow', async ({ page }) => {",
      ...steps.map(s => `  // ${new Date(s.ts).toLocaleTimeString()} — ${s.action}\n  await page.click('${s.selector}');`),
      "});"
    ]
    const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'recorded_playwright_test.js'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="container grid-2">
      <div className="card">
        <h2 className="card-title">Recorder (MVP)</h2>
        <p className="muted-sm">Clique em Start e depois clique nas ações simuladas à direita. O recorder cria passos e exporta um snippet Playwright.</p>
        <div style={{display:'flex',gap:8,marginTop:12,marginBottom:12}}>
          <button onClick={toggle} className="btn" style={{background:'#10b981',color:'#fff',padding:'8px 12px',borderRadius:6}}>{recording ? 'Stop' : 'Start recording'}</button>
          <button onClick={exportSnippet} className="btn" style={{background:'#0ea5e9',color:'#fff',padding:'8px 12px',borderRadius:6}} disabled={steps.length===0}>Export Playwright Snippet</button>
        </div>

        <div>
          <h4 style={{fontWeight:600,marginBottom:8}}>Steps</h4>
          <ol className="list-decimal space-y-1">
            {steps.map((s, i) => <li key={i}>{new Date(s.ts).toLocaleTimeString()} — {s.action} <span style={{fontSize:12,color:'#9ca3af'}}>({s.selector})</span></li>)}
          </ol>
        </div>
      </div>

      <div className="card">
        <h3 style={{fontWeight:600,marginBottom:8}}>Simulated App (click targets)</h3>
        <div>
          {SAMPLE_UI.map(item => (
            <div key={item.id} style={{padding:12,border:'1px solid #e5e7eb',borderRadius:8,display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:8}}>
              <div>
                <div style={{fontWeight:600}}>{item.label}</div>
                <div style={{fontSize:12,color:'#6b7280'}}>Selector: <code>#{item.id}</code></div>
              </div>
              <button onClick={()=>addStep(item)} className="btn" style={{padding:'6px 10px',borderRadius:6,background:recording? '#f59e0b':'#e5e7eb'}}>{recording? 'Record' : 'Click'}</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
