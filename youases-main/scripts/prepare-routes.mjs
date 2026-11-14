import { cp, mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const dist = join(root, "..", "dist");
const routes = [
  "company",
  "platforms",
  "journal",
  "contact",
  "journal/why-we-are-building-y-note",
  "journal/the-human-side-of-ai",
  "journal/inside-the-youases-studio",
];

await Promise.all(
  routes.map(async (route) => {
    const target = join(dist, route, "index.html");
    await mkdir(dirname(target), { recursive: true });
    await cp(join(dist, "index.html"), target);
  }),
);
