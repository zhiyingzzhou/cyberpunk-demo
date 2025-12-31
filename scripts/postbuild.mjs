import fs from "node:fs/promises";
import path from "node:path";

function inferBaseFromBuiltHtml(html) {
  const match = html.match(/(?:href|src)="([^"]+?)assets\//);
  if (!match) return "/";
  const prefix = match[1];
  if (prefix.startsWith("http://") || prefix.startsWith("https://")) {
    return new URL(prefix).pathname;
  }
  return prefix.startsWith("/") ? prefix : `/${prefix}`;
}

function baseSegmentsCount(basePath) {
  const normalized = basePath.endsWith("/") ? basePath : `${basePath}/`;
  return normalized.split("/").filter(Boolean).length;
}

function spa404Html(pathSegmentsToKeep) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Redirecting...</title>
    <script>
      (function () {
        var pathSegmentsToKeep = ${pathSegmentsToKeep};
        var l = window.location;
        l.replace(
          l.protocol +
            "//" +
            l.hostname +
            (l.port ? ":" + l.port : "") +
            l.pathname.split("/").slice(0, 1 + pathSegmentsToKeep).join("/") +
            "/?/" +
            l.pathname.slice(1).split("/").slice(pathSegmentsToKeep).join("/") +
            l.search.replace(/&/g, "~and~") +
            l.hash
        );
      })();
    </script>
  </head>
  <body></body>
</html>
`;
}

async function main() {
  const distDir = path.resolve("dist");
  const indexPath = path.join(distDir, "index.html");
  const html = await fs.readFile(indexPath, "utf8");
  const base = inferBaseFromBuiltHtml(html);
  const segments = baseSegmentsCount(base);
  await fs.writeFile(path.join(distDir, "404.html"), spa404Html(segments), "utf8");
}

await main();

