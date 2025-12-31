import { NavLink } from "react-router-dom";
import type { ReactNode } from "react";

import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <div className="text-tech text-xs text-mutedForeground">{label}</div>
      <div className="font-heading text-lg tracking-wide text-foreground">{value}</div>
    </div>
  );
}

function PromptLine({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-start gap-3 text-sm leading-relaxed text-foreground/90">
      <span className="select-none font-label text-accent">&gt;</span>
      <span className="font-body">{children}</span>
    </div>
  );
}

export function HomePage() {
  return (
    <>
      <section className="relative">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -left-32 -top-24 h-[520px] w-[520px] rounded-full bg-accent/10 blur-3xl" />
          <div className="absolute -right-40 top-10 h-[560px] w-[560px] rounded-full bg-accentSecondary/10 blur-3xl" />
          <div className="absolute right-10 top-56 h-[440px] w-[440px] rounded-full bg-accentTertiary/10 blur-3xl" />
        </div>

        <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-10 px-6 py-20 lg:grid-cols-5 lg:py-28">
          <div className="lg:col-span-3">
            <div className="text-tech text-xs text-accent/80">high-tech // low-life</div>
            <h1
              className="mt-4 font-heading text-5xl font-black uppercase tracking-widest text-foreground sm:text-6xl lg:text-7xl"
              style={{ textShadow: "0 0 20px rgba(0, 255, 136, 0.25)" }}
            >
              <span className="cyber-glitch" data-text="GLITCHED INTERFACE">
                GLITCHED INTERFACE
              </span>
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-foreground/85 sm:text-lg">
              <span className="cyber-type inline-block align-bottom [--tw-type-width:34ch] animate-typing">
                Token / 发光 / 角切 / 扫描线：已接入。
              </span>
              <span className="ml-1 inline-block h-5 w-2 bg-accent align-[-0.15em] animate-blink" />
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <NavLink to="/console">
                <Button variant="glitch" size="lg">
                  initiate breach
                </Button>
              </NavLink>
              <NavLink to="/components">
                <Button variant="secondary" size="lg">
                  view components
                </Button>
              </NavLink>
              <NavLink to="/tokens">
                <Button variant="ghost" size="lg">
                  read tokens
                </Button>
              </NavLink>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-6 border-t border-border/70 pt-8 sm:grid-cols-4">
              <Stat label="signal" value="88.1%" />
              <Stat label="latency" value="13ms" />
              <Stat label="nodes" value="2,048" />
              <Stat label="risk" value="HIGH" />
            </div>
          </div>

          <div className="lg:col-span-2 lg:pt-12">
            <Card variant="holographic" className="rotate-1">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <div className="text-tech text-xs text-accent">hud panel</div>
                  <div className="mt-2 font-heading text-2xl uppercase tracking-wide">status</div>
                  <div className="mt-2 text-sm text-mutedForeground">
                    系统在低亮度雨幕中运行，注意信号漂移。
                  </div>
                </div>
                <div className="cyber-chamfer-sm h-12 w-12 border border-accent/40 bg-background/60 shadow-neon-sm" />
              </div>

              <div className="mt-6 space-y-4">
                {[
                  { k: "core", v: "ONLINE", c: "text-accent" },
                  { k: "uplink", v: "DEGRADED", c: "text-accentTertiary" },
                  { k: "trace", v: "UNSTABLE", c: "text-accentSecondary" },
                ].map((row) => (
                  <div key={row.k} className="flex items-center justify-between gap-4">
                    <div className="text-tech text-xs text-mutedForeground">{row.k}</div>
                    <div className={`text-tech text-xs ${row.c}`}>{row.v}</div>
                  </div>
                ))}
              </div>

              <div className="mt-7 grid grid-cols-2 gap-4">
                <div className="cyber-chamfer-sm border border-border bg-background/50 p-4">
                  <div className="text-tech text-xs text-mutedForeground">bandwidth</div>
                  <div className="mt-2 font-heading text-lg">7.2Gb/s</div>
                  <div className="mt-3 h-1.5 w-full overflow-hidden bg-border/60">
                    <div className="h-full w-[72%] bg-accent shadow-neon-sm" />
                  </div>
                </div>
                <div className="cyber-chamfer-sm border border-border bg-background/50 p-4">
                  <div className="text-tech text-xs text-mutedForeground">heat</div>
                  <div className="mt-2 font-heading text-lg">63°C</div>
                  <div className="mt-3 h-1.5 w-full overflow-hidden bg-border/60">
                    <div className="h-full w-[63%] bg-accentSecondary shadow-neon-secondary" />
                  </div>
                </div>
              </div>
            </Card>

            <div className="-mt-6 ml-10 hidden lg:block">
              <Card className="-skew-y-1 border-accent/30 bg-card/70">
                <div className="text-tech text-xs text-mutedForeground">overlay</div>
                <div className="mt-2 font-heading text-xl uppercase tracking-wide">circuit map</div>
                <div className="mt-3 text-sm text-foreground/80">
                  一层网格 + 噪声 + 扫描线把页面“焊”在同一种材质里。
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="relative">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="flex items-end justify-between gap-6">
            <div>
              <div className="text-tech text-xs text-mutedForeground">quick entry</div>
              <h2 className="mt-3 font-heading text-4xl font-bold uppercase tracking-wide sm:text-5xl">
                下一步去哪？
              </h2>
            </div>
            <div className="hidden max-w-md text-right text-sm text-mutedForeground md:block">
              这是一个多页面示例：组件库、Token 说明、终端交互各自独立，便于扩展。
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
            <Card className="-skew-y-1">
              <div className="text-tech text-xs text-accent">components</div>
              <div className="mt-3 font-heading text-2xl uppercase tracking-wide">UI Arsenal</div>
              <div className="mt-3 text-sm leading-relaxed text-foreground/80">
                Button/Card/Input 变体、可访问性 focus、发光层级演示。
              </div>
              <NavLink to="/components" className="mt-6 inline-flex">
                <Button variant="default">open</Button>
              </NavLink>
            </Card>

            <Card className="-skew-y-1 border-accentSecondary/30">
              <div className="text-tech text-xs text-accentSecondary">tokens</div>
              <div className="mt-3 font-heading text-2xl uppercase tracking-wide">System DNA</div>
              <div className="mt-3 text-sm leading-relaxed text-foreground/80">
                颜色/字体/阴影/动效约定与使用方式，确保一致性与可维护。
              </div>
              <NavLink to="/tokens" className="mt-6 inline-flex">
                <Button variant="secondary">inspect</Button>
              </NavLink>
            </Card>

            <Card className="-skew-y-1 border-accentTertiary/30">
              <div className="text-tech text-xs text-accentTertiary">console</div>
              <div className="mt-3 font-heading text-2xl uppercase tracking-wide">Live Terminal</div>
              <div className="mt-3 text-sm leading-relaxed text-foreground/80">
                终端感交互：输入命令、生成日志、模拟 glitch 信号漂移。
              </div>
              <NavLink to="/console" className="mt-6 inline-flex">
                <Button variant="outline">run</Button>
              </NavLink>
            </Card>
          </div>
        </div>
      </section>

      <section className="relative">
        <div className="mx-auto max-w-7xl px-6 pb-20">
          <Card variant="terminal" className="shadow-neon-sm">
            <div className="space-y-3">
              <PromptLine>提示：你现在已经是多页面路由结构。</PromptLine>
              <PromptLine>
                目标：把“风格”变成“系统”，让所有页面共享 Token 与组件。
              </PromptLine>
              <PromptLine>
                下一步：继续补充页面，或把现有业务页面逐个迁移到这些组件上。
              </PromptLine>
            </div>
          </Card>
        </div>
      </section>

      <footer className="border-t border-border/70">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="font-heading text-xl uppercase tracking-wide">SPRAWL//UI</div>
            <div className="mt-3 max-w-md text-sm leading-relaxed text-mutedForeground">
              Vite + React + TS + Tailwind，多页面 demo。所有页面共享 scanlines / grid / noise /
              chamfer / neon 这套“材质”。
            </div>
          </div>
          <div>
            <div className="text-tech text-xs text-mutedForeground">pages</div>
            <ul className="mt-3 space-y-2 text-sm text-foreground/80">
              <li>
                <NavLink className="hover:text-accent" to="/components">
                  components
                </NavLink>
              </li>
              <li>
                <NavLink className="hover:text-accent" to="/tokens">
                  tokens
                </NavLink>
              </li>
              <li>
                <NavLink className="hover:text-accent" to="/console">
                  console
                </NavLink>
              </li>
            </ul>
          </div>
          <div>
            <div className="text-tech text-xs text-mutedForeground">status</div>
            <div className="mt-3 text-sm text-foreground/80">
              signal: <span className="text-accent">stable</span>
            </div>
            <div className="mt-2 text-sm text-foreground/80">
              trace: <span className="text-accentSecondary">active</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
