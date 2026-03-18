"use client"
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { getStoredUserSession } from '@/lib/auth'
import { dashboardMetrics, recentTests } from '@/lib/mock-data'
import type { UserSession } from '@/lib/types'

function Card({ children, title }: { children: React.ReactNode; title: string }) {
  return (
    <div className="card">
      <h3 className="card-title">{title}</h3>
      {children}
    </div>
  )
}

export default function Dashboard() {
  const [user, setUser] = useState<UserSession | null>(null)
  useEffect(() => {
    setUser(getStoredUserSession())
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
          <p className="muted-sm" style={{ marginTop: 8 }}>Este é um dashboard MVP. Integrações com backend e billing ainda não implementadas.</p>
        </Card>

        <Card title="Métricas">
          <ul className="space-y-2">
            <li>Requests IA este mês: <strong>{dashboardMetrics.aiRequests}</strong></li>
            <li>Testes criados: <strong>{dashboardMetrics.testsCreated}</strong></li>
            <li>Execuções falhas: <strong>{dashboardMetrics.failedRuns}</strong></li>
          </ul>
        </Card>

        <Card title="Últimos testes">
          <ol className="list-decimal space-y-1">
            {recentTests.map((t) => (
              <li key={t.name}>{t.name} — {t.status}</li>
            ))}
          </ol>
        </Card>

        <Card title="Testes realizados">
          <ul className="space-y-2">
            <li>Requests IA este mês: <strong>{dashboardMetrics.aiRequests}</strong></li>
            <li>Testes criados: <strong>{dashboardMetrics.testsCreated}</strong></li>
            <li>Execuções falhas: <strong>{dashboardMetrics.failedRuns}</strong></li>
          </ul>
        </Card>
      </main>
    </div>
  )
}
