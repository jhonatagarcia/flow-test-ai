"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import routes from "../routes";

export default function Sidebar() {
  const pathname = usePathname();

  const hideOn = ["/", "/login"]
  if (!pathname) return null
  if (hideOn.includes(pathname)) return null

  return (
    <aside className="w-64 h-screen bg-zinc-900 text-white p-4">
      <h2 className="text-xl font-bold mb-6">FlowTest AI</h2>
      <nav className="space-y-2">
        {routes.map((r) => {
          const isActive = pathname?.startsWith(r.path);
          return (
            <div key={r.path}>
              <Link
                href={r.path}
                className={
                  "block px-2 py-1 rounded " + (isActive ? "font-semibold bg-zinc-700" : "hover:bg-zinc-800")
                }
              >
                {r.label}
              </Link>
            </div>
          );
        })}
      </nav>
    </aside>
  );
}