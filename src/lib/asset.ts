/**
 * Prefix root-relative public assets with the deployment base path.
 *
 * Next.js adds `basePath` to its own scripts, styles, and links, but raw
 * static image sources need the prefix applied explicitly when the site is
 * hosted under a GitHub Pages project path (e.g. `/Prince-barber`).
 */
const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/$/, "");

export function asset(path: string) {
  if (!path.startsWith("/")) return path;
  return `${basePath}${path}`;
}
