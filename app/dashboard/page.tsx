"use client"
import Link from 'next/link'
import { useEffect, useState } from 'react'

function Card({children, title}) {
  return (
    <div className="card">
      <h3 className="card-title">{title}</h3>
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
      <header className="page-header">
        <div className="container">
          <h1 className="page-title">Playwright SaaS (MVP)</h1>
          <nav>
            <Link href="/dashboard">Home</Link>
            {' '}
            <Link href="/recorder">Recorder</Link>
          </nav>
        </div>
      </header>

      <main className="container grid-3">
        <Card title="Bem-vindo">
          <p>Usuário: <strong>{user?.email || 'anônimo'}</strong></p>
          <p className="muted-sm" style={{marginTop:8}}>Este é um dashboard MVP. Integrações com backend e billing ainda não implementadas.</p>
        </Card>

        <Card title="Métricas">
          <ul className="space-y-2">
            <li>Requests IA este mês: <strong>120</strong></li>
            <li>Testes criados: <strong>18</strong></li>
            <li>Execuções falhas: <strong>2</strong></li>
          </ul>
        </Card>

        <Card title="Últimos testes">
          <ol className="list-decimal space-y-1">
            <li>Login flow — stable</li>
            <li>Checkout flow — flaky</li>
            <li>Payment redirect — stable</li>
          </ol>
        </Card>

        <Card title="Testes realizados">
          <ul className="space-y-2">
            <li>Requests IA este mês: <strong>120</strong></li>
            <li>Testes criados: <strong>18</strong></li>
            <li>Execuções falhas: <strong>2</strong></li>
          </ul>
        </Card>
      </main>
    </div>
  )
}
