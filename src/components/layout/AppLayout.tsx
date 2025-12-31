import type { ReactNode } from "react";
import { NavLink, Outlet } from "react-router-dom";

import { Button } from "../ui/Button";
import { cn } from "../../lib/cn";
import { RouteTransition } from "../system/RouteTransition";
import { SystemPanel } from "../system/SystemPanel";
import { ToastViewport } from "../system/ToastViewport";

function Brand() {
  return (
    <div className="flex items-center gap-3">
      <div className="cyber-chamfer-sm h-9 w-9 border border-accent/60 bg-muted/30 shadow-neon-sm" />
      <div className="leading-none">
        <div className="font-heading text-sm tracking-[0.24em]">SPRAWL//UI</div>
        <div className="text-xs text-mutedForeground">design system / demo</div>
      </div>
    </div>
  );
}

function TopLink({
  to,
  children,
}: {
  to: string;
  children: ReactNode;
}) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "text-tech text-sm text-foreground/80 hover:text-accent",
          isActive && "text-accent",
        )
      }
    >
      {children}
    </NavLink>
  );
}

export function AppLayout() {
  return (
    <div className="relative min-h-screen">
      <div className="pointer-events-none absolute inset-0 -z-10 cyber-grid opacity-60" />

      <header className="sticky top-0 z-30 border-b border-border/70 bg-background/70 backdrop-blur">
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:cyber-chamfer-sm focus:bg-background focus:px-4 focus:py-2 focus:text-tech focus:text-sm focus:text-accent focus:shadow-neon focus:outline-none"
        >
          跳到主要内容
        </a>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <NavLink to="/" className="focus-visible:outline-none">
            <Brand />
          </NavLink>

          <nav className="hidden items-center gap-6 md:flex" aria-label="主导航">
            <TopLink to="/components">components</TopLink>
            <TopLink to="/tokens">tokens</TopLink>
            <TopLink to="/console">console</TopLink>
          </nav>

          <div className="flex items-center gap-3">
            <NavLink to="/tokens" className="hidden sm:inline-flex">
              <Button variant="outline">docs</Button>
            </NavLink>
            <NavLink to="/console">
              <Button variant="glitch">connect</Button>
            </NavLink>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-6 pb-4 md:hidden">
          <nav className="flex gap-3 overflow-x-auto" aria-label="主导航（移动端）">
            <TopLink to="/components">components</TopLink>
            <TopLink to="/tokens">tokens</TopLink>
            <TopLink to="/console">console</TopLink>
          </nav>
        </div>
      </header>

      <main id="content" className="relative">
        <Outlet />
      </main>

      <RouteTransition />
      <ToastViewport />
      <SystemPanel />
    </div>
  );
}
