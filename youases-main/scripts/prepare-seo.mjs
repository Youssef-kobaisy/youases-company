import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const dist = join(root, "..", "dist");
const site = "https://youases.work";

const pages = [
  {
    path: "/",
    title: "AI Software & Knowledge Platforms for the Future | YouAses",
    description:
      "YouAses builds AI systems, software products, and connected knowledge platforms that help people think further, create faster, and move with clarity.",
    type: "WebSite",
  },
  {
    path: "/company",
    title: "About Our AI Technology Company | YouAses Technology",
    description:
      "Meet YouAses Technology, an independent AI company combining software engineering and product design to build useful tools for people shaping what comes next.",
    type: "AboutPage",
  },
  {
    path: "/platforms",
    title: "AI Products & Knowledge Platforms in Development | YouAses",
    description:
      "Explore YouAses AI products and knowledge platforms in development, including Y-note, a connected environment for ideas, context, discovery, and momentum.",
    type: "CollectionPage",
  },
  {
    path: "/journal",
    title: "Ideas on AI, Software & Knowledge | YouAses Journal",
    description:
      "Read the YouAses Journal for clear ideas on artificial intelligence, human-centered software, knowledge systems, and products taking shape in our studio.",
    type: "CollectionPage",
  },
  {
    path: "/contact",
    title: "Contact an Independent AI Technology Company | YouAses",
    description:
      "Contact YouAses Technology to follow upcoming AI products, discuss software and knowledge systems, or start a conversation with our independent studio.",
    type: "ContactPage",
  },
  {
    path: "/journal/why-we-are-building-y-note",
    title: "Why We Are Building Y-note: A New Platform | YouAses",
    description:
      "Discover why YouAses is building Y-note as a new knowledge platform where ideas, context, and discovery become useful momentum for clearer, better work.",
    type: "Article",
    article: "We are building a doorway to knowledge.",
  },
  {
    path: "/journal/the-human-side-of-ai",
    title: "The Human Side of AI: Useful Intelligence | YouAses",
    description:
      "YouAses explores why useful AI should be measured by the clarity, capability, and agency it gives back to the people using it in daily life.",
    type: "Article",
    article: "The future of AI will be measured by what it gives back.",
  },
  {
    path: "/journal/inside-the-youases-studio",
    title: "From Questions to AI Systems | YouAses Studio Journal",
    description:
      "See how YouAses moves from difficult human problems to useful AI systems, software products, and knowledge platforms through research, design, and engineering.",
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
      name: "YouAses Technology",
      alternateName: "YouAses",
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
      name: "YouAses Technology",
      alternateName: "YouAses",
      publisher: { "@id": `${site}/#organization` },
      inLanguage: "en",
      potentialAction: {
        "@type": "SearchAction",
        target: `${site}/?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
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
        {
          "@type": "ListItem",
          position: 1,
          name: "YouAses Technology",
          item: site,
        },
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
  const fallback = fallbackFor(page);
  return html
    .replace(
      /<title>[\s\S]*?<\/title>/,
      `<title>${escapeHtml(page.title)}</title>`,
    )
    .replace(
      /<meta\s+name="description"[\s\S]*?\/>/,
      `<meta name="description" content="${escapeHtml(page.description)}" />`,
    )
    .replace(
      /<meta\s+property="og:title"[\s\S]*?\/>/,
      `<meta property="og:title" content="${escapeHtml(page.title)}" />`,
    )
    .replace(
      /<meta\s+property="og:description"[\s\S]*?\/>/,
      `<meta property="og:description" content="${escapeHtml(page.description)}" />`,
    )
    .replace(
      /<meta property="og:url" content="[^"]*"/,
      `<meta property="og:url" content="${url}"`,
    )
    .replace(
      /<meta\s+property="og:type"\s+content="[^"]*"\s*\/>/,
      `<meta property="og:type" content="${page.type === "Article" ? "article" : "website"}" />`,
    )
    .replace(
      /<meta\s+property="og:image"[\s\S]*?\/>/,
      `<meta property="og:image" content="${site}/youases-social.png" />`,
    )
    .replace(
      /<meta\s+name="twitter:title"[\s\S]*?\/>/,
      `<meta name="twitter:title" content="${escapeHtml(page.title)}" />`,
    )
    .replace(
      /<meta\s+name="twitter:description"[\s\S]*?\/>/,
      `<meta name="twitter:description" content="${escapeHtml(page.description)}" />`,
    )
    .replace(
      /<meta\s+name="twitter:image"[\s\S]*?\/>/,
      `<meta name="twitter:image" content="${site}/youases-social.png" />`,
    )
    .replace(
      /<link rel="canonical" href="[^"]*"/,
      `<link rel="canonical" href="${url}"`,
    )
    .replace(
      /<script type="application\/ld\+json">[\s\S]*?<\/script>/,
      `<script type="application/ld+json">${graphFor(page)}</script>`,
    )
    .replace(/<div id="root"><\/div>/, `<div id="root">${fallback}</div>`);
}

function fallbackFor(page) {
  const labels = {
    "/": {
      heading: "Technology for what comes next.",
      intro:
        "YouAses Technology is an independent AI and software company building intelligent systems, useful products, and connected knowledge platforms.",
      links: [
        ["/company", "Discover the company"],
        ["/platforms", "Explore platforms"],
        ["/journal", "Read the Journal"],
        ["/contact", "Start a conversation"],
      ],
    },
    "/company": {
      heading: "We build with intention.",
      intro:
        "YouAses combines artificial intelligence, software engineering, and product design to create technology that gives people more clarity, capability, and room to think.",
      links: [
        ["/platforms", "See what we are building"],
        ["/journal", "Read our thinking"],
        ["/contact", "Contact YouAses"],
      ],
    },
    "/platforms": {
      heading: "The next layer is forming.",
      intro:
        "Explore the AI products and knowledge platforms taking shape at YouAses, including Y-note, a new environment for ideas, context, discovery, and momentum.",
      links: [
        ["/journal/why-we-are-building-y-note", "Why Y-note"],
        ["/company", "How we work"],
        ["/contact", "Follow the next release"],
      ],
    },
    "/journal": {
      heading: "Ideas worth following.",
      intro:
        "The YouAses Journal shares clear perspectives on artificial intelligence, human-centered software, knowledge systems, and products being built in our studio.",
      links: [
        ["/journal/why-we-are-building-y-note", "Why we are building Y-note"],
        ["/journal/the-human-side-of-ai", "The human side of AI"],
        ["/journal/inside-the-youases-studio", "Inside the YouAses studio"],
      ],
    },
  };
  const article = page.article
    ? {
        heading: page.article,
        intro: page.description,
        links: [
          ["/journal", "Back to the Journal"],
          ["/platforms", "Explore YouAses platforms"],
          ["/contact", "Stay close to what is next"],
        ],
      }
    : null;
  const content = article ||
    labels[page.path] || {
      heading: "Start a conversation with YouAses.",
      intro: page.description,
      links: [
        ["/", "Return home"],
        ["/company", "Learn about YouAses"],
        ["/platforms", "Explore our platforms"],
      ],
    };
  return `<main class="seo-fallback"><p>${escapeHtml(page.path === "/journal" ? "YouAses Journal" : "YouAses Technology")}</p><h1>${escapeHtml(content.heading)}</h1><p>${escapeHtml(content.intro)}</p><nav aria-label="Related pages"><ul>${content.links.map(([href, label]) => `<li><a href="${href}">${escapeHtml(label)}</a></li>`).join("")}</ul></nav></main>`;
}

const source = await readFile(join(dist, "index.html"), "utf8");
const lastModified = "2026-11-14";
const urls = pages.map(
  (page) => `${site}${page.path === "/" ? "" : page.path}`,
);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages.map((page) => `  <url><loc>${site}${page.path === "/" ? "" : page.path}</loc><lastmod>${page.lastModified ?? lastModified}</lastmod></url>`).join("\n")}\n</urlset>\n`;

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

const notFound = updateHtml(source, {
  path: "/404",
  title: "Page Not Found | YouAses Technology",
  description: "The requested YouAses page could not be found.",
  type: "WebPage",
});
await writeFile(
  join(dist, "404.html"),
  notFound
    .replace(
      /<meta name="robots" content="[^"]*"/,
      '<meta name="robots" content="noindex, follow"',
    )
    .replace(
      /<div id="root">[\s\S]*?<\/div>/,
      `<div id="root">${fallbackFor({
        path: "/404",
        description:
          "The page may have moved, but the YouAses story is still unfolding.",
      })}</div>`,
    ),
);

console.log(
  `Prepared SEO metadata for ${pages.length} routes: ${urls.join(", ")}`,
);
