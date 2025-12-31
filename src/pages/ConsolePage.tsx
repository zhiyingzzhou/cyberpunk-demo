import { useEffect, useMemo, useRef, useState } from "react";

import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { useToast } from "../state/toast";
import { useUISettings } from "../state/uiSettings";

type LogLevel = "info" | "ok" | "warn" | "err";
type LogLine = { id: string; level: LogLevel; text: string };

function levelClass(level: LogLevel) {
  switch (level) {
    case "ok":
      return "text-accent";
    case "warn":
      return "text-accentSecondary";
    case "err":
      return "text-destructive";
    default:
      return "text-foreground/90";
  }
}

function nowId() {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function sleep(ms: number) {
  return new Promise<void>((resolve) => window.setTimeout(resolve, ms));
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function ConsolePage() {
  const { push: toast } = useToast();
  const { settings, setPartial } = useUISettings();
  const [command, setCommand] = useState("");
  const [lines, setLines] = useState<LogLine[]>([
    { id: nowId(), level: "info", text: "boot:// terminal session attached" },
    { id: nowId(), level: "ok", text: "tokens:// loaded" },
    { id: nowId(), level: "warn", text: "signal:// minor rgb drift detected" },
  ]);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const logRef = useRef<HTMLDivElement | null>(null);
  const [followTail, setFollowTail] = useState(true);
  const [compact, setCompact] = useState(true);
  const [enabled, setEnabled] = useState<Record<LogLevel, boolean>>({
    info: true,
    ok: true,
    warn: true,
    err: true,
  });

  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);

  const commandCatalog = useMemo(
    () => [
      "help",
      "deploy --night",
      "trace --rgb",
      "scan --grid",
      "panic",
      "clear",
      "fx status",
      "fx scanlines on|off",
      "fx glitch on|off",
      "fx transitions on|off",
      "fx neon 0..1|%",
      "fx noise 0..1|%",
      "fx boost",
    ],
    [],
  );

  const helpText = useMemo(() => commandCatalog.join(" / "), [commandCatalog]);

  function push(level: LogLevel, text: string) {
    setLines((prev) => [...prev, { id: nowId(), level, text }]);
  }

  async function run(cmdRaw: string) {
    const cmd = cmdRaw.trim();
    if (!cmd) return;

    push("info", `> ${cmd}`);
    setHistory((prev) => (prev[prev.length - 1] === cmd ? prev : [...prev, cmd]));
    setHistoryIndex(null);

    if (cmd === "help") {
      push("info", `commands: ${helpText}`);
      return;
    }
    if (cmd === "clear") {
      setLines([{ id: nowId(), level: "info", text: "boot:// cleared" }]);
      return;
    }
    if (cmd === "panic") {
      push("err", "panic:// trace overflow — aborting");
      if (!prefersReducedMotion()) await sleep(200);
      push("warn", "recovery:// rerouting to safe channel");
      if (!prefersReducedMotion()) await sleep(240);
      push("ok", "status:// stabilized");
      return;
    }
    if (cmd.startsWith("deploy")) {
      push("ok", "deploy:// initiating breach");
      if (!prefersReducedMotion()) await sleep(220);
      push("info", "uplink:// negotiating");
      if (!prefersReducedMotion()) await sleep(360);
      push("ok", "deploy:// complete");
      return;
    }
    if (cmd.startsWith("trace")) {
      push("warn", "trace:// rgb shift + glitch slices engaged");
      push("info", "note:// (视觉层面已在标题 glitch 中演示)");
      return;
    }
    if (cmd.startsWith("scan")) {
      push("info", "scan:// grid + scanlines overlay active");
      push("ok", "scan:// ok");
      return;
    }

    if (cmd.startsWith("fx")) {
      const parts = cmd.split(/\s+/);
      const action = parts[1];
      const arg = parts[2];

      const onOff = (v: string | undefined) =>
        v === "on" ? true : v === "off" ? false : null;

      const parseUnit = (v: string | undefined) => {
        if (!v) return null;
        if (v.endsWith("%")) {
          const n = Number(v.slice(0, -1));
          if (Number.isNaN(n)) return null;
          return Math.min(1, Math.max(0, n / 100));
        }
        const n = Number(v);
        if (Number.isNaN(n)) return null;
        return Math.min(1, Math.max(0, n));
      };

      if (!action || action === "help") {
        push("info", `fx:// usage: fx status | fx scanlines on|off | fx glitch on|off | fx transitions on|off | fx neon 0..1|% | fx noise 0..1|% | fx boost`);
        return;
      }

      if (action === "status") {
        push(
          "info",
          `fx:// scanlines=${settings.scanlines ? "on" : "off"} glitch=${settings.glitch ? "on" : "off"} transitions=${settings.transitions ? "on" : "off"} neon=${Math.round(settings.neon * 100)}% noise=${Math.round(settings.noise * 100)}%`,
        );
        return;
      }

      if (action === "boost") {
        setPartial({ scanlines: true, glitch: true, transitions: true, neon: 1, noise: 1 });
        push("ok", "fx:// BOOSTED (all systems online)");
        toast({ title: "BOOST", description: "已拉满 FX", tone: "ok" });
        return;
      }

      if (action === "scanlines") {
        const v = onOff(arg);
        if (v === null) {
          push("err", `fx:// invalid value "${arg ?? ""}" (expected on|off)`);
          return;
        }
        setPartial({ scanlines: v });
        push("ok", `fx:// scanlines ${v ? "on" : "off"}`);
        return;
      }

      if (action === "glitch") {
        const v = onOff(arg);
        if (v === null) {
          push("err", `fx:// invalid value "${arg ?? ""}" (expected on|off)`);
          return;
        }
        setPartial({ glitch: v });
        push("ok", `fx:// glitch ${v ? "on" : "off"}`);
        return;
      }

      if (action === "transitions") {
        const v = onOff(arg);
        if (v === null) {
          push("err", `fx:// invalid value "${arg ?? ""}" (expected on|off)`);
          return;
        }
        setPartial({ transitions: v });
        push("ok", `fx:// transitions ${v ? "on" : "off"}`);
        return;
      }

      if (action === "neon") {
        const v = parseUnit(arg);
        if (v === null) {
          push("err", `fx:// invalid neon "${arg ?? ""}" (expected 0..1 or %)`);
          return;
        }
        setPartial({ neon: v });
        push("ok", `fx:// neon ${Math.round(v * 100)}%`);
        return;
      }

      if (action === "noise") {
        const v = parseUnit(arg);
        if (v === null) {
          push("err", `fx:// invalid noise "${arg ?? ""}" (expected 0..1 or %)`);
          return;
        }
        setPartial({ noise: v });
        push("ok", `fx:// noise ${Math.round(v * 100)}%`);
        return;
      }

      push("err", `fx:// unknown action "${action}"`);
      push("info", `hint:// try "fx status"`);
      return;
    }

    push("err", `error:// unknown command "${cmd}"`);
    push("info", `hint:// type "help"`);
  }

  const visibleLines = useMemo(() => {
    const filtered = lines.filter((l) => enabled[l.level]);
    const limit = compact ? 18 : 60;
    return filtered.slice(-limit);
  }, [lines, enabled, compact]);

  useEffect(() => {
    if (!followTail) return;
    const el = logRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [followTail, visibleLines]);

  const autocompleteCatalog = useMemo(
    () => [
      "help",
      "deploy --night",
      "trace --rgb",
      "scan --grid",
      "panic",
      "clear",
      "fx status",
      "fx boost",
      "fx scanlines on",
      "fx scanlines off",
      "fx glitch on",
      "fx glitch off",
      "fx transitions on",
      "fx transitions off",
      "fx neon 100%",
      "fx neon 70%",
      "fx noise 100%",
      "fx noise 60%",
    ],
    [],
  );

  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <div className="flex items-end justify-between gap-6">
        <div>
          <div className="text-tech text-xs text-mutedForeground">live console</div>
          <h1 className="mt-3 font-heading text-4xl font-bold uppercase tracking-wide sm:text-5xl">
            Console
          </h1>
        </div>
        <div className="hidden max-w-md text-right text-sm text-mutedForeground md:block">
          输入命令并生成日志：保持“终端感”但依然可访问、可维护、可复用。
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Button
          variant="outline"
          onClick={() => {
            inputRef.current?.focus();
            push("info", "focus:// input");
          }}
        >
          focus input
        </Button>
        <Button
          variant="secondary"
          onClick={() => {
            push("ok", "signal:// boosted");
            toast({ title: "SIGNAL", description: "已写入日志", tone: "ok" });
          }}
        >
          boost signal
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            setPartial({ neon: 1, noise: 1 });
            push("ok", "fx:// neon=100% noise=100%");
          }}
        >
          max fx
        </Button>
        <Button
          variant="ghost"
          onClick={() => {
            setLines((prev) => prev.slice(-12));
            push("info", "trim:// keeping last 12 lines");
          }}
        >
          trim
        </Button>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <Card variant="terminal" className="shadow-neon-sm">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/70 pb-4">
              <div className="flex flex-wrap gap-2">
                {(["info", "ok", "warn", "err"] as const).map((lv) => (
                  <label
                    key={lv}
                    className="flex cursor-pointer items-center gap-2 cyber-chamfer-sm border border-border bg-background/40 px-3 py-2"
                  >
                    <input
                      type="checkbox"
                      checked={enabled[lv]}
                      onChange={(e) =>
                        setEnabled((prev) => ({ ...prev, [lv]: e.currentTarget.checked }))
                      }
                      className="h-4 w-4 accent-[rgb(var(--c-accent))]"
                    />
                    <span className={`text-tech text-xs ${levelClass(lv)}`}>{lv}</span>
                  </label>
                ))}
              </div>

              <div className="flex flex-wrap gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="h-10 px-4"
                  onClick={() => setCompact((v) => !v)}
                >
                  {compact ? "compact" : "full"}
                </Button>
                <Button
                  size="sm"
                  variant={followTail ? "secondary" : "outline"}
                  className="h-10 px-4"
                  onClick={() => setFollowTail((v) => !v)}
                >
                  {followTail ? "follow" : "paused"}
                </Button>
              </div>
            </div>

            <div
              ref={logRef}
              className="mt-5 max-h-[480px] space-y-2 overflow-y-auto pr-2"
              onClick={() => inputRef.current?.focus()}
            >
              {visibleLines.map((l) => (
                <div key={l.id} className="flex items-start gap-3 text-sm leading-relaxed">
                  <span className="select-none font-label text-accent">&gt;</span>
                  <span className={`font-body ${levelClass(l.level)}`}>{l.text}</span>
                </div>
              ))}
              <div className="flex items-start gap-3 text-sm leading-relaxed">
                <span className="select-none font-label text-accent">&gt;</span>
                <span className="font-body text-mutedForeground">
                  waiting<span className="ml-1 inline-block h-4 w-2 bg-accent align-[-0.15em] animate-blink" />
                </span>
              </div>
            </div>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card className="-skew-y-1">
            <div className="text-tech text-xs text-accentSecondary">input</div>
            <div className="mt-3 font-heading text-2xl uppercase tracking-wide">Command</div>

            <form
              className="mt-6 space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                void run(command);
                setCommand("");
              }}
            >
              <Input
                ref={inputRef}
                value={command}
                onChange={(e) => setCommand(e.currentTarget.value)}
                onKeyDown={(e) => {
                  if (e.key === "ArrowUp") {
                    if (history.length === 0) return;
                    e.preventDefault();
                    const nextIndex = historyIndex === null ? history.length - 1 : Math.max(0, historyIndex - 1);
                    setHistoryIndex(nextIndex);
                    setCommand(history[nextIndex] ?? "");
                    return;
                  }
                  if (e.key === "ArrowDown") {
                    if (history.length === 0) return;
                    e.preventDefault();
                    if (historyIndex === null) return;
                    const nextIndex = historyIndex + 1;
                    if (nextIndex >= history.length) {
                      setHistoryIndex(null);
                      setCommand("");
                      return;
                    }
                    setHistoryIndex(nextIndex);
                    setCommand(history[nextIndex] ?? "");
                    return;
                  }
                  if (e.key === "Tab") {
                    const current = command.trim();
                    if (!current) return;
                    const options = autocompleteCatalog.filter((c) => c.startsWith(current));
                    if (options.length === 1) {
                      e.preventDefault();
                      setCommand(options[0]);
                      return;
                    }
                    if (options.length > 1) {
                      e.preventDefault();
                      push("info", `suggest:// ${options.slice(0, 8).join(" / ")}${options.length > 8 ? " / …" : ""}`);
                      return;
                    }
                  }
                }}
                placeholder={`例如: ${helpText}`}
                aria-label="命令输入"
              />
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Button className="h-12" variant="glitch" type="submit">
                  execute
                </Button>
                <Button
                  className="h-12"
                  variant="outline"
                  type="button"
                  onClick={() => void run("help")}
                >
                  help
                </Button>
              </div>
              <div className="border-t border-border/70 pt-4 text-xs text-mutedForeground">
                tip: ↑↓ 历史 / Tab 补全 / `fx` 命令可直接改全局 FX（也可用右下角 system 面板）。
              </div>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}
