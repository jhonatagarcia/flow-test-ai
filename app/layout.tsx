import Sidebar from "../components/Sidebar";
import "../styles/globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <div className="flex">
          <Sidebar />
          <main className="flex-1 p-6 bg-zinc-100">{children}</main>
        </div>
      </body>
    </html>
  );
}
