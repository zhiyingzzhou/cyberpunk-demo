import { useMemo, useRef, useState } from "react";

import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Input } from "../components/ui/Input";

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

export function ConsolePage() {
  const [command, setCommand] = useState("");
  const [lines, setLines] = useState<LogLine[]>([
    { id: nowId(), level: "info", text: "boot:// terminal session attached" },
    { id: nowId(), level: "ok", text: "tokens:// loaded" },
    { id: nowId(), level: "warn", text: "signal:// minor rgb drift detected" },
  ]);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const helpText = useMemo(
    () =>
      [
        "help",
        "deploy --night",
        "trace --rgb",
        "scan --grid",
        "panic",
        "clear",
      ].join(" / "),
    [],
  );

  function push(level: LogLevel, text: string) {
    setLines((prev) => [...prev, { id: nowId(), level, text }]);
  }

  function run(cmdRaw: string) {
    const cmd = cmdRaw.trim();
    if (!cmd) return;

    push("info", `> ${cmd}`);

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
      push("warn", "recovery:// rerouting to safe channel");
      push("ok", "status:// stabilized");
      return;
    }
    if (cmd.startsWith("deploy")) {
      push("ok", "deploy:// initiating breach");
      push("info", "uplink:// negotiating");
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

    push("err", `error:// unknown command "${cmd}"`);
    push("info", `hint:// type "help"`);
  }

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
        <Button variant="secondary" onClick={() => push("ok", "signal:// boosted")}>
          boost signal
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
            <div className="space-y-2">
              {lines.slice(-18).map((l) => (
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
                run(command);
                setCommand("");
              }}
            >
              <Input
                ref={inputRef}
                value={command}
                onChange={(e) => setCommand(e.currentTarget.value)}
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
                  onClick={() => run("help")}
                >
                  help
                </Button>
              </div>
              <div className="border-t border-border/70 pt-4 text-xs text-mutedForeground">
                提示：prefers-reduced-motion 会自动关掉 scanline sweep 与 glitch slices 动画（见
                `src/index.css`）。
              </div>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}

