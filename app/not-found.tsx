import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container">
      <header className="page-header">
        <h1>Página não encontrada</h1>
        <p className="muted-sm">A rota que você tentou acessar não existe.</p>
      </header>

      <section className="card">
        <p className="muted-sm">
          Voltar para o <Link href="/dashboard">Dashboard</Link>.
        </p>
      </section>
    </div>
  );
}
