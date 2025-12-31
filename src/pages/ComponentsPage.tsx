import { NavLink } from "react-router-dom";
import { useMemo, useState } from "react";

import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { copyText } from "../lib/clipboard";
import { useToast } from "../state/toast";

function SectionTitle({
  label,
  title,
  description,
}: {
  label: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-end justify-between gap-6">
      <div>
        <div className="text-tech text-xs text-mutedForeground">{label}</div>
        <h1 className="mt-3 font-heading text-4xl font-bold uppercase tracking-wide sm:text-5xl">
          {title}
        </h1>
      </div>
      <div className="hidden max-w-md text-right text-sm text-mutedForeground md:block">
        {description}
      </div>
    </div>
  );
}

export function ComponentsPage() {
  const { push } = useToast();
  const [buttonVariant, setButtonVariant] = useState<
    "default" | "secondary" | "outline" | "ghost" | "glitch"
  >("default");
  const [buttonSize, setButtonSize] = useState<"sm" | "md" | "lg">("md");
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const snippet = useMemo(() => {
    const props = [
      `variant="${buttonVariant}"`,
      `size="${buttonSize}"`,
      disabled ? "disabled" : null,
    ]
      .filter(Boolean)
      .join(" ");
    return `<Button ${props}>${loading ? "loading…" : "press"}</Button>`;
  }, [buttonVariant, buttonSize, disabled, loading]);

  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <SectionTitle
        label="ui kit"
        title="组件库"
        description="把 Cyberpunk 视觉约束封装进可复用组件，减少一次性样式。"
      />

      <div className="mt-8 flex flex-wrap gap-3">
        <NavLink to="/tokens">
          <Button variant="outline">查看 tokens</Button>
        </NavLink>
        <NavLink to="/console">
          <Button variant="secondary">打开 console</Button>
        </NavLink>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="-skew-y-1 lg:col-span-2">
          <div className="text-tech text-xs text-accent">buttons</div>
          <div className="mt-3 font-heading text-2xl uppercase tracking-wide">Variants</div>
          <div className="mt-5 flex flex-wrap gap-3">
            <Button variant="default">default</Button>
            <Button variant="secondary">secondary</Button>
            <Button variant="outline">outline</Button>
            <Button variant="ghost">ghost</Button>
            <Button variant="glitch">glitch</Button>
          </div>
          <div className="mt-6 text-sm text-mutedForeground">
            focus-visible 使用 ring + ring-offset，同时叠加 neon shadow，键盘操作可见且符合风格。
          </div>
        </Card>

        <Card variant="holographic" className="rotate-1">
          <div className="text-tech text-xs text-accentTertiary">typography</div>
          <div className="mt-3 font-heading text-2xl uppercase tracking-wide">Scale</div>
          <div className="mt-5 space-y-3">
            <div className="font-heading text-3xl uppercase tracking-widest">H2 SAMPLE</div>
            <div className="text-sm text-mutedForeground">
              body 使用 JetBrains Mono，heading 使用 Orbitron，label 使用 Share Tech Mono。
            </div>
            <div className="text-tech text-xs text-accentSecondary">label / timestamp / badge</div>
          </div>
        </Card>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="-skew-y-1">
          <div className="text-tech text-xs text-accent">playground</div>
          <div className="mt-3 font-heading text-2xl uppercase tracking-wide">Button Lab</div>
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="space-y-2">
              <div className="text-tech text-xs text-mutedForeground">variant</div>
              <select
                className="cyber-chamfer-sm h-11 w-full border border-border bg-background/60 px-3 text-tech text-sm text-foreground/90 shadow-neon-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                value={buttonVariant}
                onChange={(e) => setButtonVariant(e.currentTarget.value as typeof buttonVariant)}
              >
                <option value="default">default</option>
                <option value="secondary">secondary</option>
                <option value="outline">outline</option>
                <option value="ghost">ghost</option>
                <option value="glitch">glitch</option>
              </select>
            </label>

            <label className="space-y-2">
              <div className="text-tech text-xs text-mutedForeground">size</div>
              <select
                className="cyber-chamfer-sm h-11 w-full border border-border bg-background/60 px-3 text-tech text-sm text-foreground/90 shadow-neon-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                value={buttonSize}
                onChange={(e) => setButtonSize(e.currentTarget.value as typeof buttonSize)}
              >
                <option value="sm">sm</option>
                <option value="md">md</option>
                <option value="lg">lg</option>
              </select>
            </label>

            <label className="flex items-center justify-between gap-4 cyber-chamfer-sm border border-border bg-background/40 px-4 py-3">
              <div>
                <div className="text-tech text-xs text-mutedForeground">disabled</div>
                <div className="mt-1 text-xs text-foreground/80">禁用态仍保留结构</div>
              </div>
              <input
                type="checkbox"
                checked={disabled}
                onChange={(e) => setDisabled(e.currentTarget.checked)}
                className="h-5 w-5 accent-[rgb(var(--c-accent))]"
              />
            </label>

            <label className="flex items-center justify-between gap-4 cyber-chamfer-sm border border-border bg-background/40 px-4 py-3">
              <div>
                <div className="text-tech text-xs text-mutedForeground">loading</div>
                <div className="mt-1 text-xs text-foreground/80">模拟异步</div>
              </div>
              <input
                type="checkbox"
                checked={loading}
                onChange={(e) => setLoading(e.currentTarget.checked)}
                className="h-5 w-5 accent-[rgb(var(--c-accent))]"
              />
            </label>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Button
              variant={buttonVariant}
              size={buttonSize}
              disabled={disabled || loading}
              onClick={() => {
                if (!loading) return;
                push({ title: "EXEC", description: "模拟执行中…", tone: "warn" });
                window.setTimeout(() => push({ title: "DONE", description: "已完成", tone: "ok" }), 650);
              }}
            >
              {loading ? (
                <>
                  <span className="inline-block h-4 w-4 animate-spin border-2 border-background/30 border-t-background" />
                  loading
                </>
              ) : (
                "press"
              )}
            </Button>

            <Button
              variant="outline"
              size="sm"
              className="h-10 px-4"
              onClick={async () => {
                const ok = await copyText(snippet);
                push({
                  title: ok ? "COPIED" : "FAILED",
                  description: ok ? "用法片段已复制" : "无法访问剪贴板",
                  tone: ok ? "ok" : "err",
                });
              }}
            >
              copy snippet
            </Button>
          </div>

          <pre className="mt-5 cyber-chamfer-sm overflow-x-auto border border-border bg-background/60 p-4 text-sm text-foreground/90 shadow-neon-sm">
            <code className="font-body">{snippet}</code>
          </pre>
        </Card>

        <Card variant="terminal" className="-skew-y-1">
          <div className="text-tech text-xs text-accentSecondary">forms</div>
          <div className="mt-3 font-heading text-2xl uppercase tracking-wide">Input Demo</div>
          <div className="mt-5 space-y-4">
            <Input placeholder="例如: breach --silent" aria-label="命令输入" />
            <Input prefix="$" placeholder="例如: runner_07" aria-label="用户输入" />
            <div className="text-xs text-mutedForeground">
              tip: 试试键盘 Tab 到输入框/按钮，focus 会触发一次 neon pulse。
            </div>
          </div>
        </Card>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="-skew-y-1">
          <div className="text-tech text-xs text-accentTertiary">micro fx</div>
          <div className="mt-3 font-heading text-2xl uppercase tracking-wide">Interactions</div>
          <div className="mt-5 space-y-3 text-sm text-foreground/85">
            <div className="cyber-chamfer-sm border border-border bg-background/50 p-4">
              <div className="text-tech text-xs text-mutedForeground">hover</div>
              <div className="mt-2 font-heading text-lg uppercase tracking-wide">corners</div>
              <div className="mt-2 text-sm text-mutedForeground">卡片/按钮 hover 会出现角标。</div>
            </div>
            <div className="cyber-chamfer-sm border border-border bg-background/50 p-4">
              <div className="text-tech text-xs text-mutedForeground">border</div>
              <div className="mt-2 font-heading text-lg uppercase tracking-wide">pulse</div>
              <div className="mt-2 text-sm text-mutedForeground">
                hover 时边框在 accent / cyan / magenta 间跳变。
              </div>
            </div>
            <div className="cyber-chamfer-sm border border-border bg-background/50 p-4">
              <div className="text-tech text-xs text-mutedForeground">focus</div>
              <div className="mt-2 font-heading text-lg uppercase tracking-wide">neon pulse</div>
              <div className="mt-2 text-sm text-mutedForeground">
                focus-visible 触发一次脉冲（键盘用户可见）。
              </div>
            </div>
          </div>
        </Card>

        <Card variant="terminal" className="-skew-y-1">
          <div className="text-tech text-xs text-accent">cards</div>
          <div className="mt-3 font-heading text-2xl uppercase tracking-wide">Panels</div>
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="cyber-chamfer-sm border border-border bg-background/50 p-4">
              <div className="text-tech text-xs text-mutedForeground">corner cut</div>
              <div className="mt-2 font-heading text-lg uppercase tracking-wide">chamfer</div>
              <div className="mt-2 text-sm text-foreground/80">clip-path 角切，而非圆角。</div>
            </div>
            <div className="cyber-chamfer-sm border border-accent/30 bg-background/50 p-4 shadow-neon-sm">
              <div className="text-tech text-xs text-mutedForeground">neon</div>
              <div className="mt-2 font-heading text-lg uppercase tracking-wide">glow</div>
              <div className="mt-2 text-sm text-foreground/80">多层阴影形成真实发光。</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
