import { NavLink } from "react-router-dom";

import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Input } from "../components/ui/Input";

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
          <div className="text-tech text-xs text-accentSecondary">inputs</div>
          <div className="mt-3 font-heading text-2xl uppercase tracking-wide">Terminal Input</div>
          <div className="mt-5 space-y-4">
            <Input placeholder="输入命令，例如: trace --rgb" aria-label="命令输入" />
            <Input prefix="$" placeholder="输入用户名，例如: runner_07" aria-label="用户名输入" />
          </div>
          <div className="mt-6 text-sm text-mutedForeground">
            输入框默认 text-accent、placeholder 低对比；focus 时边框变 accent 并出现 neon glow。
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

