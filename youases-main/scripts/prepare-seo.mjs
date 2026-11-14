import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const dist = join(root, "..", "dist");
const site = "https://youases.work";

const pages = [
  {
    path: "/",
    title: "YouAses | AI, software, and knowledge platforms",
    description:
      "YouAses is an independent technology company building AI systems, software products, and knowledge platforms for a more intelligent future.",
    type: "WebSite",
  },
  {
    path: "/company",
    title: "About YouAses | Independent AI technology company",
    description:
      "Learn how YouAses combines artificial intelligence, software engineering, and product design to build useful technology for people shaping what comes next.",
    type: "AboutPage",
  },
  {
    path: "/platforms",
    title: "YouAses Platforms | Y-note and intelligent software",
    description:
      "Explore the AI systems, knowledge environments, and software products YouAses is building, including Y-note, a connected knowledge platform in development.",
    type: "CollectionPage",
  },
  {
    path: "/journal",
    title: "YouAses Journal | Ideas behind AI and software",
    description:
      "Read the YouAses Journal for clear thinking on artificial intelligence, human-centered software, knowledge systems, and the products taking shape in our studio.",
    type: "CollectionPage",
  },
  {
    path: "/contact",
    title: "Contact YouAses | Start a conversation",
    description:
      "Contact YouAses at hello@youases.work to follow our product releases, discuss technology, or start a conversation with the studio.",
    type: "ContactPage",
  },
  {
    path: "/journal/why-we-are-building-y-note",
    title: "Why YouAses Is Building Y-note | YouAses Journal",
    description:
      "Y-note began with a question about what knowledge software could become when ideas, context, and discovery are connected.",
    type: "Article",
    article: "We are building a doorway to knowledge.",
  },
  {
    path: "/journal/the-human-side-of-ai",
    title: "The Human Side of AI | YouAses Journal",
    description:
      "YouAses explores why the future of AI should be measured by the clarity, capability, and agency it gives back to people.",
    type: "Article",
    article: "The future of AI will be measured by what it gives back.",
  },
  {
    path: "/journal/inside-the-youases-studio",
    title: "Inside the YouAses Studio | YouAses Journal",
    description:
      "How YouAses moves from difficult human problems to useful AI systems, software products, and knowledge platforms.",
    type: "Article",
    article:
      "Inside the YouAses studio: from impossible questions to useful systems.",
  },
];

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function graphFor(page) {
  const url = `${site}${page.path === "/" ? "" : page.path}`;
  const graph = [
    {
      "@type": "Organization",
      "@id": `${site}/#organization`,
      name: "YouAses",
      url: site,
      logo: `${site}/youases-logo.png`,
      slogan: "Because you are Aces.",
      description:
        "Independent technology company building AI systems, software products, and knowledge platforms.",
      email: "hello@youases.work",
      knowsAbout: [
        "Artificial intelligence",
        "Software engineering",
        "Knowledge platforms",
        "Human-centered technology",
      ],
      sameAs: [
        "https://www.facebook.com/profile.php?id=61590554395056",
        "https://www.instagram.com/youases.official",
        "https://www.linkedin.com/company/youases",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${site}/#website`,
      url: site,
      name: "YouAses",
      publisher: { "@id": `${site}/#organization` },
      inLanguage: "en",
    },
    {
      "@type": page.type,
      "@id": `${url}#page`,
      url,
      name: page.title,
      description: page.description,
      isPartOf: { "@id": `${site}/#website` },
      about: { "@id": `${site}/#organization` },
      inLanguage: "en",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "YouAses", item: site },
        ...(page.path !== "/"
          ? [
              {
                "@type": "ListItem",
                position: 2,
                name: page.path.includes("/journal/")
                  ? "Journal"
                  : page.title.split(" | ")[0],
                item: `${site}${page.path.includes("/journal/") ? "/journal" : page.path}`,
              },
            ]
          : []),
        ...(page.article
          ? [
              {
                "@type": "ListItem",
                position: 3,
                name: page.article,
                item: url,
              },
            ]
          : []),
      ],
    },
  ];

  if (page.path === "/platforms") {
    graph.push({
      "@type": "SoftwareApplication",
      "@id": `${site}/#y-note`,
      name: "Y-note",
      applicationCategory: "Knowledge management software",
      operatingSystem: "Web",
      description:
        "A connected knowledge environment in development by YouAses.",
      creator: { "@id": `${site}/#organization` },
      url: `${site}/platforms`,
    });
  }

  if (page.article) {
    graph.push({
      "@type": "Article",
      headline: page.article,
      description: page.description,
      mainEntityOfPage: { "@id": `${url}#page` },
      author: { "@id": `${site}/#organization` },
      publisher: { "@id": `${site}/#organization` },
      datePublished: "2026-11-14",
      dateModified: "2026-11-14",
      inLanguage: "en",
    });
  }

  return JSON.stringify({ "@context": "https://schema.org", "@graph": graph });
}

function updateHtml(html, page) {
  const url = `${site}${page.path === "/" ? "" : page.path}`;
  return html
    .replace(
      /<title>[\s\S]*?<\/title>/,
      `<title>${escapeHtml(page.title)}</title>`,
    )
    .replace(
      /<meta name="description" content="[^"]*"/,
      `<meta name="description" content="${escapeHtml(page.description)}"`,
    )
    .replace(
      /<meta property="og:title" content="[^"]*"/,
      `<meta property="og:title" content="${escapeHtml(page.title)}"`,
    )
    .replace(
      /<meta property="og:description" content="[^"]*"/,
      `<meta property="og:description" content="${escapeHtml(page.description)}"`,
    )
    .replace(
      /<meta property="og:url" content="[^"]*"/,
      `<meta property="og:url" content="${url}"`,
    )
    .replace(
      /<meta property="og:type" content="[^"]*"/,
      `<meta property="og:type" content="${page.type === "Article" ? "article" : "website"}"`,
    )
    .replace(
      /<meta name="twitter:title" content="[^"]*"/,
      `<meta name="twitter:title" content="${escapeHtml(page.title)}"`,
    )
    .replace(
      /<meta name="twitter:description" content="[^"]*"/,
      `<meta name="twitter:description" content="${escapeHtml(page.description)}"`,
    )
    .replace(
      /<link rel="canonical" href="[^"]*"/,
      `<link rel="canonical" href="${url}"`,
    )
    .replace(
      /<script type="application\/ld\+json">[\s\S]*?<\/script>/,
      `<script type="application/ld+json">${graphFor(page)}</script>`,
    );
}

const source = await readFile(join(dist, "index.html"), "utf8");
const today = new Date().toISOString().slice(0, 10);
const urls = pages.map(
  (page) => `${site}${page.path === "/" ? "" : page.path}`,
);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages.map((page) => `  <url><loc>${site}${page.path === "/" ? "" : page.path}</loc><lastmod>${today}</lastmod><changefreq>${page.path === "/" ? "weekly" : page.article ? "monthly" : "monthly"}</changefreq><priority>${page.path === "/" ? "1.0" : page.article ? "0.7" : "0.8"}</priority></url>`).join("\n")}\n</urlset>\n`;

await writeFile(join(dist, "sitemap.xml"), sitemap);
await writeFile(
  join(dist, "llms.txt"),
  await readFile(join(dist, "llms.txt"), "utf8").catch(() => ""),
);

for (const page of pages) {
  const target = join(
    dist,
    page.path === "/" ? "index.html" : page.path,
    page.path === "/" ? "" : "index.html",
  );
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, updateHtml(source, page));
}

console.log(
  `Prepared SEO metadata for ${pages.length} routes: ${urls.join(", ")}`,
);
