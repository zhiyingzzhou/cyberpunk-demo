import { NavLink } from "react-router-dom";

import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";

export function NotFoundPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <Card className="-skew-y-1 border-destructive/40">
        <div className="text-tech text-xs text-destructive">404</div>
        <h1 className="mt-3 font-heading text-4xl font-black uppercase tracking-widest sm:text-5xl">
          SIGNAL LOST
        </h1>
        <div className="mt-4 text-sm leading-relaxed text-mutedForeground">
          你访问的路径不在当前网络映射中。
        </div>
        <div className="mt-7 flex flex-wrap gap-3">
          <NavLink to="/">
            <Button variant="glitch">back to base</Button>
          </NavLink>
          <NavLink to="/components">
            <Button variant="outline">components</Button>
          </NavLink>
        </div>
      </Card>
    </div>
  );
}

