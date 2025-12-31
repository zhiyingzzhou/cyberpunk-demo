# cyberpunk-demo

一个基于 **Vite + React + TypeScript + Tailwind** 的「Cyberpunk / Glitch」风格 UI Demo：设计 Token、角切面板、霓虹发光、扫描线/噪声、终端交互与多页面路由都已落地。

## 技术栈
- Vite 5 / React 18 / TypeScript
- TailwindCSS（颜色/字体/阴影通过 CSS 变量做语义映射）
- React Router（多页面）

## 页面
- `/`：首页
- `/components`：组件库 + Button Playground
- `/tokens`：Token 展示 + 一键复制
- `/console`：终端页（历史/补全/过滤/`fx` 命令）

## 快速开始
```bash
npm install
npm run dev
```

构建：
```bash
npm run build
```

## 交互与开关（System 面板）
右下角 `system` 面板支持全局 FX 控制，并持久化到 `localStorage`：
- `scanlines`：扫描线/扫光层
- `glitch`：标题 RGB/切片 glitch
- `transitions`：路由切换转场（默认关闭）
- `neon/noise`：发光/噪声强度

Console 也可以直接输入命令控制（示例）：
```text
fx status
fx transitions on
fx neon 70%
fx noise 0.6
fx boost
```

## 设计 Token 与全局样式入口
- `src/index.css`：CSS 变量（颜色/字体/阴影）+ scanlines/grid/noise/glitch + reduced-motion 处理
- `tailwind.config.cjs`：把 CSS 变量映射为 Tailwind 语义色/阴影/动效

## 组件
- `src/components/ui/Button.tsx`
- `src/components/ui/Card.tsx`
- `src/components/ui/Input.tsx`

## GitHub Pages 自动部署
已内置 GitHub Actions 工作流：`.github/workflows/pages.yml`（默认在 `main` 分支 push 后发布）。

要启用 Pages：
1) GitHub 仓库：`Settings → Pages → Build and deployment → Source` 选择 `GitHub Actions`
2) push 到 `main` 触发部署

说明：
- Vite `base` 会自动适配 `/<repo>/` 子路径（也可用环境变量 `VITE_BASE` 覆盖）：`vite.config.ts`
- 为了 SPA 刷新不 404：构建后会生成 `dist/404.html`（`scripts/postbuild.mjs`），并在 `index.html` 注入回退解码脚本

