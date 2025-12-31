import * as React from "react";
import { useLocation } from "react-router-dom";

import { cn } from "../../lib/cn";
import { useUISettings } from "../../state/uiSettings";

export function RouteTransition() {
  const location = useLocation();
  const { settings } = useUISettings();
  const [active, setActive] = React.useState(false);

  React.useEffect(() => {
    if (!settings.transitions) return;
    if (document.documentElement.classList.contains("transitions-off")) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    setActive(true);
    const t = window.setTimeout(() => setActive(false), 460);
    return () => window.clearTimeout(t);
  }, [location.key, settings.transitions]);

  return (
    <div
      className={cn(
        "pointer-events-none fixed inset-0 z-[65] opacity-0",
        active ? "opacity-100" : "",
      )}
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-background/20 backdrop-blur-[1px]" />
      <div className="absolute inset-0 cyber-grid opacity-50" />
      <div className="absolute inset-0 cyber-route-wipe" />
    </div>
  );
}

