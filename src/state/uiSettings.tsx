import * as React from "react";

type UISettings = {
  scanlines: boolean;
  glitch: boolean;
  transitions: boolean;
  neon: number; // 0..1
  noise: number; // 0..1
};

type UISettingsContextValue = {
  settings: UISettings;
  setSettings: React.Dispatch<React.SetStateAction<UISettings>>;
  setPartial: (patch: Partial<UISettings>) => void;
  reset: () => void;
};

const STORAGE_KEY = "sprawl_ui_settings_v1";

const DEFAULT_SETTINGS: UISettings = {
  scanlines: true,
  glitch: true,
  transitions: false,
  neon: 1,
  noise: 1,
};

function clamp01(n: number) {
  if (Number.isNaN(n)) return 0;
  return Math.min(1, Math.max(0, n));
}

function normalizeSettings(raw: unknown): UISettings {
  if (!raw || typeof raw !== "object") return DEFAULT_SETTINGS;
  const r = raw as Partial<Record<keyof UISettings, unknown>>;
  return {
    scanlines: typeof r.scanlines === "boolean" ? r.scanlines : DEFAULT_SETTINGS.scanlines,
    glitch: typeof r.glitch === "boolean" ? r.glitch : DEFAULT_SETTINGS.glitch,
    transitions: typeof r.transitions === "boolean" ? r.transitions : DEFAULT_SETTINGS.transitions,
    neon: typeof r.neon === "number" ? clamp01(r.neon) : DEFAULT_SETTINGS.neon,
    noise: typeof r.noise === "number" ? clamp01(r.noise) : DEFAULT_SETTINGS.noise,
  };
}

function readStoredSettings(): UISettings {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return DEFAULT_SETTINGS;
    return normalizeSettings(JSON.parse(stored));
  } catch {
    return DEFAULT_SETTINGS;
  }
}

function writeStoredSettings(settings: UISettings) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch {
    // ignore
  }
}

function applyToDocument(settings: UISettings) {
  const root = document.documentElement;
  root.classList.toggle("scanlines-off", !settings.scanlines);
  root.classList.toggle("glitch-off", !settings.glitch);
  root.classList.toggle("transitions-off", !settings.transitions);

  root.style.setProperty("--fx-neon-mult", String(settings.neon));
  root.style.setProperty("--fx-noise-mult", String(settings.noise));
}

const UISettingsContext = React.createContext<UISettingsContextValue | null>(null);

export function UISettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = React.useState<UISettings>(() => {
    if (typeof window === "undefined") return DEFAULT_SETTINGS;
    return readStoredSettings();
  });

  React.useEffect(() => {
    writeStoredSettings(settings);
    applyToDocument(settings);
  }, [settings]);

  const value = React.useMemo<UISettingsContextValue>(
    () => ({
      settings,
      setSettings,
      setPartial: (patch) => setSettings((prev) => normalizeSettings({ ...prev, ...patch })),
      reset: () => setSettings(DEFAULT_SETTINGS),
    }),
    [settings],
  );

  return <UISettingsContext.Provider value={value}>{children}</UISettingsContext.Provider>;
}

export function useUISettings() {
  const ctx = React.useContext(UISettingsContext);
  if (!ctx) throw new Error("useUISettings must be used within UISettingsProvider");
  return ctx;
}
