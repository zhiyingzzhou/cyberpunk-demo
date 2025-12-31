import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

function normalizeBasePath(base: string) {
  if (!base) return "/";
  const asPath = base.startsWith("http://") || base.startsWith("https://")
    ? new URL(base).pathname
    : base;
  return asPath.endsWith("/") ? asPath : `${asPath}/`;
}

function inferBase() {
  if (process.env.VITE_BASE) return normalizeBasePath(process.env.VITE_BASE);
  if (process.env.GITHUB_REPOSITORY) {
    const [owner, repo] = process.env.GITHUB_REPOSITORY.split("/");
    if (repo && owner && repo === `${owner}.github.io`) return "/";
    if (repo) return normalizeBasePath(`/${repo}/`);
  }
  if (process.env.CI_PAGES_URL) return normalizeBasePath(process.env.CI_PAGES_URL);
  if (process.env.GITLAB_CI && process.env.CI_PROJECT_NAME) {
    return normalizeBasePath(`/${process.env.CI_PROJECT_NAME}/`);
  }
  return "/";
}

export default defineConfig({
  base: inferBase(),
  plugins: [react()],
});
