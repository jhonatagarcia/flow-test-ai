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
    <aside className="sidebar">
      <h2>FlowTest AI</h2>
      <nav className="nav">
        {routes.map((r) => {
          const isActive = pathname?.startsWith(r.path);
          return (
            <div key={r.path}>
              <Link href={r.path} className={isActive ? "active" : ""}>
                {r.label}
              </Link>
            </div>
          );
        })}
      </nav>
    </aside>
  );
}