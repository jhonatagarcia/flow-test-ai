"use client"
import Link from 'next/link'
import { useEffect, useState } from 'react'

function Card({children, title}) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-semibold mb-2">{title}</h3>
      {children}
    </div>
  )
}

export default function Dashboard(){
  const [user, setUser] = useState(null)
  useEffect(()=> {
    setUser(JSON.parse(localStorage.getItem('user') || 'null'))
  }, [])
  return (
    <div>
      <header className="bg-white shadow-sm mb-6">
        <div className="max-w-5xl mx-auto p-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold">Playwright SaaS (MVP)</h1>
          <nav className="space-x-4">
            <Link href="/dashboard">Home</Link>
            <Link href="/recorder">Recorder</Link>
          </nav>
        </div>
      </header>

      <main className="max-w-5xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card title="Bem-vindo">
          <p>Usuário: <strong>{user?.email || 'anônimo'}</strong></p>
          <p className="text-sm text-slate-500 mt-2">Este é um dashboard MVP. Integrações com backend e billing ainda não implementadas.</p>
        </Card>

        <Card title="Métricas">
          <ul className="text-sm space-y-2">
            <li>Requests IA este mês: <strong>120</strong></li>
            <li>Testes criados: <strong>18</strong></li>
            <li>Execuções falhas: <strong>2</strong></li>
          </ul>
        </Card>

        <Card title="Últimos testes">
          <ol className="list-decimal ml-5 text-sm space-y-1">
            <li>Login flow — stable</li>
            <li>Checkout flow — flaky</li>
            <li>Payment redirect — stable</li>
          </ol>
        </Card>
      </main>
    </div>
  )
}
