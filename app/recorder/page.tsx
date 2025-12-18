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
    <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-4">Recorder (MVP)</h2>
        <p className="text-sm text-slate-500 mb-4">Clique em Start e depois clique nas ações simuladas à direita. O recorder cria passos e exporta um snippet Playwright.</p>
        <div className="flex gap-2 mb-4">
          <button onClick={toggle} className="px-3 py-2 rounded bg-emerald-500 text-white">{recording ? 'Stop' : 'Start recording'}</button>
          <button onClick={exportSnippet} className="px-3 py-2 rounded bg-sky-600 text-white" disabled={steps.length===0}>Export Playwright Snippet</button>
        </div>

        <div>
          <h4 className="font-medium mb-2">Steps</h4>
          <ol className="list-decimal ml-5 text-sm space-y-1">
            {steps.map((s, i) => <li key={i}>{new Date(s.ts).toLocaleTimeString()} — {s.action} <span className="text-xs text-slate-400">({s.selector})</span></li>)}
          </ol>
        </div>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold mb-3">Simulated App (click targets)</h3>
        <div className="space-y-3">
          {SAMPLE_UI.map(item => (
            <div key={item.id} className="p-3 border rounded flex justify-between items-center">
              <div>
                <div className="font-medium">{item.label}</div>
                <div className="text-xs text-slate-500">Selector: <code>#{item.id}</code></div>
              </div>
              <button onClick={()=>addStep(item)} className={`px-3 py-1 rounded ${recording? 'bg-amber-400':'bg-slate-200'}`}>{recording? 'Record' : 'Click'}</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
