import * as React from "react";

import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import { cn } from "../../lib/cn";
import { copyText } from "../../lib/clipboard";
import { useToast } from "../../state/toast";
import { useUISettings } from "../../state/uiSettings";

function Toggle({
  label,
  description,
  checked,
  onCheckedChange,
}: {
  label: string;
  description?: string;
  checked: boolean;
  onCheckedChange: (v: boolean) => void;
}) {
  const id = React.useId();
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="min-w-0">
        <label htmlFor={id} className="text-tech text-xs text-foreground/90">
          {label}
        </label>
        {description ? (
          <div className="mt-1 text-xs leading-relaxed text-mutedForeground">{description}</div>
        ) : null}
      </div>

      <div className="pt-0.5">
        <label
          htmlFor={id}
          className={cn(
            "relative inline-flex h-7 w-12 cursor-pointer items-center",
            "cyber-chamfer-sm border border-border bg-background/60 transition-[box-shadow,border-color] duration-150",
            "focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-background",
            checked ? "border-accent/60 shadow-neon-sm" : "",
          )}
        >
          <input
            id={id}
            type="checkbox"
            className="sr-only"
            checked={checked}
            onChange={(e) => onCheckedChange(e.currentTarget.checked)}
          />
          <span
            className={cn(
              "absolute left-1 top-1 h-5 w-5 cyber-chamfer-sm transition-[transform,background-color,box-shadow] duration-150",
              checked ? "translate-x-5 bg-accent shadow-neon-sm" : "translate-x-0 bg-border",
            )}
          />
        </label>
      </div>
    </div>
  );
}

function Slider({
  label,
  value,
  onChange,
  min = 0,
  max = 1,
  step = 0.05,
  valueLabel,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  step?: number;
  valueLabel?: string;
}) {
  const id = React.useId();
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-4">
        <label htmlFor={id} className="text-tech text-xs text-foreground/90">
          {label}
        </label>
        <div className="font-body text-xs text-mutedForeground">{valueLabel ?? value.toFixed(2)}</div>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.currentTarget.value))}
        className={cn(
          "h-2 w-full cursor-pointer appearance-none rounded-none bg-border/60",
          "[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5",
          "[&::-webkit-slider-thumb]:cyber-chamfer-sm [&::-webkit-slider-thumb]:bg-accent [&::-webkit-slider-thumb]:shadow-neon-sm",
          "[&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:border-0",
          "[&::-moz-range-thumb]:cyber-chamfer-sm [&::-moz-range-thumb]:bg-accent [&::-moz-range-thumb]:shadow-neon-sm",
        )}
      />
    </div>
  );
}

export function SystemPanel() {
  const { settings, setPartial, reset } = useUISettings();
  const { push } = useToast();
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <>
      <div className="fixed bottom-5 right-5 z-[60]">
        <Button
          variant={open ? "secondary" : "outline"}
          className="h-12 px-5"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="system-panel"
        >
          system
        </Button>
      </div>

      <div
        className={cn(
          "fixed inset-0 z-[59] bg-background/60 backdrop-blur-sm transition-opacity duration-150",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={() => setOpen(false)}
        aria-hidden={!open}
      />

      <div
        id="system-panel"
        className={cn(
          "fixed right-5 top-20 z-[60] w-[min(440px,calc(100vw-2.5rem))] origin-top-right transition-[opacity,transform] duration-150",
          open ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0",
        )}
      >
        <Card variant="holographic" hoverEffect={false} className="shadow-neon-lg">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-tech text-xs text-accent">system</div>
              <div className="mt-2 font-heading text-2xl uppercase tracking-wide">
                FX CONTROL
              </div>
              <div className="mt-2 text-sm text-mutedForeground">
                这些开关直接驱动全局 CSS 变量/类名，并持久化到 localStorage。
              </div>
            </div>
            <Button variant="ghost" onClick={() => setOpen(false)}>
              close
            </Button>
          </div>

          <div className="mt-7 space-y-5">
            <Toggle
              label="scanlines"
              description="全局 CRT 扫描线与扫光层"
              checked={settings.scanlines}
              onCheckedChange={(v) => setPartial({ scanlines: v })}
            />
            <Toggle
              label="glitch"
              description="标题 chromatic + slice glitch"
              checked={settings.glitch}
              onCheckedChange={(v) => setPartial({ glitch: v })}
            />
            <Toggle
              label="transitions"
              description="路由切换的扫描线转场"
              checked={settings.transitions}
              onCheckedChange={(v) => setPartial({ transitions: v })}
            />

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Slider
                label="neon intensity"
                value={settings.neon}
                onChange={(v) => setPartial({ neon: v })}
                valueLabel={`${Math.round(settings.neon * 100)}%`}
              />
              <Slider
                label="noise intensity"
                value={settings.noise}
                onChange={(v) => setPartial({ noise: v })}
                valueLabel={`${Math.round(settings.noise * 100)}%`}
              />
            </div>

            <div className="flex flex-wrap gap-3 border-t border-border/70 pt-5">
              <Button
                variant="outline"
                onClick={() => {
                  reset();
                  push({ title: "RESET", description: "已恢复默认 FX 配置", tone: "ok" });
                }}
              >
                reset
              </Button>
              <Button
                variant="secondary"
                onClick={async () => {
                  const ok = await copyText(JSON.stringify(settings, null, 2));
                  push({
                    title: ok ? "COPIED" : "FAILED",
                    description: ok ? "FX settings JSON 已复制" : "无法访问剪贴板",
                    tone: ok ? "ok" : "err",
                  });
                }}
              >
                copy json
              </Button>
              <Button
                variant="glitch"
                onClick={() => {
                  setPartial({ neon: 1, noise: 1, scanlines: true, glitch: true, transitions: true });
                  push({ title: "BOOST", description: "信号增强：全部 FX 已拉满", tone: "ok" });
                }}
              >
                boost
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}
