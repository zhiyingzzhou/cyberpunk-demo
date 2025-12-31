import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { copyText } from "../lib/clipboard";
import { useToast } from "../state/toast";

type TokenRow = {
  name: string;
  value: string;
  swatchClass: string;
};

const colorTokens: TokenRow[] = [
  { name: "background", value: "#0a0a0f", swatchClass: "bg-background" },
  { name: "foreground", value: "#e0e0e0", swatchClass: "bg-foreground" },
  { name: "card", value: "#12121a", swatchClass: "bg-card" },
  { name: "muted", value: "#1c1c2e", swatchClass: "bg-muted" },
  { name: "mutedForeground", value: "#6b7280", swatchClass: "bg-mutedForeground" },
  { name: "accent", value: "#00ff88", swatchClass: "bg-accent" },
  { name: "accentSecondary", value: "#ff00ff", swatchClass: "bg-accentSecondary" },
  { name: "accentTertiary", value: "#00d4ff", swatchClass: "bg-accentTertiary" },
  { name: "border", value: "#2a2a3a", swatchClass: "bg-border" },
  { name: "destructive", value: "#ff3366", swatchClass: "bg-destructive" },
];

function CodeBlock({ children }: { children: string }) {
  const { push } = useToast();
  return (
    <div className="relative">
      <pre className="cyber-chamfer-sm overflow-x-auto border border-border bg-background/60 p-4 pr-16 text-sm text-foreground/90 shadow-neon-sm">
        <code className="font-body">{children}</code>
      </pre>
      <Button
        size="sm"
        variant="outline"
        className="absolute right-3 top-3 h-9 px-3 text-xs"
        onClick={async () => {
          const ok = await copyText(children);
          push({
            title: ok ? "COPIED" : "FAILED",
            description: ok ? "代码片段已复制" : "无法访问剪贴板",
            tone: ok ? "ok" : "err",
          });
        }}
      >
        copy
      </Button>
    </div>
  );
}

export function TokensPage() {
  const { push } = useToast();
  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <div className="flex items-end justify-between gap-6">
        <div>
          <div className="text-tech text-xs text-mutedForeground">design tokens</div>
          <h1 className="mt-3 font-heading text-4xl font-bold uppercase tracking-wide sm:text-5xl">
            Tokens
          </h1>
        </div>
        <div className="hidden max-w-md text-right text-sm text-mutedForeground md:block">
          所有 Token 以 CSS 变量为单一真相；Tailwind 仅做语义映射，避免散落 magic value。
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="-skew-y-1 lg:col-span-2">
          <div className="text-tech text-xs text-accent">colors</div>
          <div className="mt-3 font-heading text-2xl uppercase tracking-wide">Palette</div>
          <div className="mt-6 overflow-hidden border border-border cyber-chamfer-sm">
            <div className="divide-y divide-border">
              {colorTokens.map((t) => (
                <div key={t.name} className="flex items-center gap-4 bg-background/30 px-4 py-3">
                  <div className={`h-8 w-8 border border-border ${t.swatchClass}`} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-4">
                      <div className="text-tech text-xs text-foreground/90">{t.name}</div>
                      <div className="font-body text-xs text-mutedForeground">{t.value}</div>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-9 px-3 text-xs"
                    onClick={async () => {
                      const ok = await copyText(t.value);
                      push({
                        title: ok ? "COPIED" : "FAILED",
                        description: ok ? `${t.name} = ${t.value}` : "无法访问剪贴板",
                        tone: ok ? "ok" : "err",
                      });
                    }}
                  >
                    copy
                  </Button>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-6 text-sm text-mutedForeground">
            颜色在 `src/index.css` 定义为 RGB 变量（便于透明度），在 `tailwind.config.cjs`
            映射为语义色。
          </div>
        </Card>

        <Card variant="holographic" className="rotate-1">
          <div className="text-tech text-xs text-accentSecondary">effects</div>
          <div className="mt-3 font-heading text-2xl uppercase tracking-wide">Glow</div>
          <div className="mt-5 space-y-3 text-sm text-foreground/85">
            <div className="cyber-chamfer-sm border border-accent/30 bg-background/50 p-4 shadow-neon-sm">
              <div className="text-tech text-xs text-mutedForeground">shadow-neon-sm</div>
              <div className="mt-2 font-body text-xs text-mutedForeground">
                --box-shadow-neon-sm
              </div>
            </div>
            <div className="cyber-chamfer-sm border border-accent/30 bg-background/50 p-4 shadow-neon">
              <div className="text-tech text-xs text-mutedForeground">shadow-neon</div>
              <div className="mt-2 font-body text-xs text-mutedForeground">--box-shadow-neon</div>
            </div>
            <div className="cyber-chamfer-sm border border-accent/30 bg-background/50 p-4 shadow-neon-lg">
              <div className="text-tech text-xs text-mutedForeground">shadow-neon-lg</div>
              <div className="mt-2 font-body text-xs text-mutedForeground">
                --box-shadow-neon-lg
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="-skew-y-1">
          <div className="text-tech text-xs text-accentTertiary">usage</div>
          <div className="mt-3 font-heading text-2xl uppercase tracking-wide">How to use</div>
          <div className="mt-5 space-y-4">
            <CodeBlock>
              {`// 语义色：来自 tailwind.config.cjs 的映射
<div className="bg-card border border-border text-foreground">
  <span className="text-accent">NEON</span>
</div>`}
            </CodeBlock>
            <CodeBlock>
              {`// 角切 + 发光：来自 src/index.css 的组件类 & Tailwind shadow
<div className="cyber-chamfer border border-accent/30 shadow-neon-sm" />`}
            </CodeBlock>
          </div>
        </Card>

        <Card variant="terminal" className="-skew-y-1">
          <div className="text-tech text-xs text-accent">sources</div>
          <div className="mt-3 font-heading text-2xl uppercase tracking-wide">Single truth</div>
          <div className="mt-5 space-y-3 text-sm text-foreground/85">
            <div className="flex gap-3">
              <span className="font-label text-accent">&gt;</span>
              <div>
                <div className="text-tech text-xs text-mutedForeground">CSS variables</div>
                <div className="font-body text-sm">src/index.css</div>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="font-label text-accent">&gt;</span>
              <div>
                <div className="text-tech text-xs text-mutedForeground">Tailwind mapping</div>
                <div className="font-body text-sm">tailwind.config.cjs</div>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="font-label text-accent">&gt;</span>
              <div>
                <div className="text-tech text-xs text-mutedForeground">UI components</div>
                <div className="font-body text-sm">src/components/ui/*</div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
