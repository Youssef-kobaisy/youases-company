import { useEffect, useState, type ReactNode } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  BrainCircuit,
  Facebook,
  Globe2,
  Instagram,
  LockKeyhole,
  Linkedin,
  Mail,
  Menu,
  MoveUpRight,
  Network,
  Orbit,
  Quote,
  X,
} from "lucide-react";
import logo from "@/assets/youases-logo.png";
import { useReveal } from "@/hooks/use-reveal";
import appIcon from "@/assets/youases-app-icon.jpg";

const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/youases.official",
    icon: Instagram,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61590554395056",
    icon: Facebook,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/youases",
    icon: Linkedin,
  },
];

const routeMetadata: Record<
  string,
  { title: string; description: string; type?: string }
> = {
  "/": {
    title: "AI Software & Knowledge Platforms for the Future | YouAses",
    description:
      "YouAses is an independent technology company building AI systems, software products, and knowledge platforms for a more intelligent future.",
  },
  "/company": {
    title: "About Our AI Technology Company | YouAses Technology",
    description:
      "Learn how YouAses combines artificial intelligence, software engineering, and product design to build useful technology for people shaping what comes next.",
    type: "AboutPage",
  },
  "/platforms": {
    title: "AI Products & Knowledge Platforms in Development | YouAses",
    description:
      "Explore the AI systems, knowledge environments, and software products YouAses is building, including Y-note, a connected knowledge platform in development.",
    type: "CollectionPage",
  },
  "/journal": {
    title: "Ideas on AI, Software & Knowledge | YouAses Journal",
    description:
      "Read the YouAses Journal for clear thinking on artificial intelligence, human-centered software, knowledge systems, and the products taking shape in our studio.",
    type: "CollectionPage",
  },
  "/contact": {
    title: "Contact an Independent AI Technology Company | YouAses",
    description:
      "Contact YouAses at hello@youases.work to follow our product releases, discuss technology, or start a conversation with the studio.",
    type: "ContactPage",
  },
};

function getMetadata(path: string) {
  if (routeMetadata[path]) return routeMetadata[path];
  if (path === "/journal/why-we-are-building-y-note") {
    return {
      title: "Why We Are Building Y-note: A New Platform | YouAses",
      description:
        "Y-note began with a question about what knowledge software could become when ideas, context, and discovery are connected.",
      type: "Article",
    };
  }
  if (path === "/journal/the-human-side-of-ai") {
    return {
      title: "The Human Side of AI: Useful Intelligence | YouAses",
      description:
        "YouAses explores why the future of AI should be measured by the clarity, capability, and agency it gives back to people.",
      type: "Article",
    };
  }
  if (path === "/journal/inside-the-youases-studio") {
    return {
      title: "From Questions to AI Systems | YouAses Studio Journal",
      description:
        "How YouAses moves from difficult human problems to useful AI systems, software products, and knowledge platforms.",
      type: "Article",
    };
  }
  return routeMetadata["/"];
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [path, setPath] = useState(() => window.location.pathname);
  const [scrollProgress, setScrollProgress] = useState(0);
  useReveal();
  useEffect(() => {
    const onPopState = () => setPath(window.location.pathname);
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);
  useEffect(() => {
    const metadata = getMetadata(path);
    document.title = metadata.title;
    document.documentElement.lang = "en";
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", metadata.description);
    document
      .querySelector('meta[property="og:title"]')
      ?.setAttribute("content", metadata.title);
    document
      .querySelector('meta[property="og:description"]')
      ?.setAttribute("content", metadata.description);
    document
      .querySelector('meta[name="twitter:title"]')
      ?.setAttribute("content", metadata.title);
    document
      .querySelector('meta[name="twitter:description"]')
      ?.setAttribute("content", metadata.description);
    document
      .querySelector('meta[property="og:type"]')
      ?.setAttribute(
        "content",
        metadata.type === "Article" ? "article" : "website",
      );
    const canonical = document.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]',
    );
    if (canonical) {
      canonical.href = `${window.location.origin}${path === "/" ? "" : path}`;
    }
  }, [path]);
  useEffect(() => {
    const updateProgress = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(max > 0 ? (window.scrollY / max) * 100 : 0);
    };
    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, [path]);
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);
  function navigate(to: string) {
    if (to === path) {
      setMenuOpen(false);
      return;
    }
    window.history.pushState({}, "", to);
    setPath(to);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  const isKnownArticle =
    path.startsWith("/journal/") &&
    journalArticles.some((article) => `/journal/${article.slug}` === path);
  const page = ["/company", "/platforms", "/journal", "/contact"].includes(path)
    ? path
    : isKnownArticle
      ? "/journal-article"
      : path === "/"
        ? "/"
        : "/404";

  return (
    <div className="min-h-screen overflow-hidden bg-[#050b18] text-white">
      <div
        className="scroll-progress"
        aria-hidden="true"
        style={{ width: `${scrollProgress}%` }}
      />
      <Nav
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        currentPath={page}
        navigate={navigate}
      />
      <main key={path} className="page-transition">
        {page === "/" && <HomePage navigate={navigate} />}
        {page === "/company" && <CompanyPage navigate={navigate} />}
        {page === "/platforms" && <PlatformsPage navigate={navigate} />}
        {page === "/journal" && <JournalPage navigate={navigate} />}
        {page === "/journal-article" && (
          <JournalArticlePage path={path} navigate={navigate} />
        )}
        {page === "/contact" && <Invitation standalone />}
        {page === "/404" && <NotFoundPage navigate={navigate} />}
      </main>
      <Footer />
    </div>
  );
}

function Nav({
  menuOpen,
  setMenuOpen,
  currentPath,
  navigate,
}: {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  currentPath: string;
  navigate: (to: string) => void;
}) {
  const links = [
    ["Home", "/"],
    ["Company", "/company"],
    ["Platforms", "/platforms"],
    ["Journal", "/journal"],
  ];
  return (
    <>
      <a
        href="/"
        onClick={(event) => {
          event.preventDefault();
          navigate("/");
        }}
        className="brand-lockup fixed left-5 top-5 z-[55] flex items-center gap-3 sm:left-8 sm:top-8"
        aria-label="Go to YouAses home"
      >
        <img src={logo} alt="" className="h-9 w-9 rounded-xl object-cover" />
        <span className="hidden text-left sm:block">
          <strong className="block font-display text-sm tracking-tight">
            You<span className="text-[#82aaff]">Ases</span>
          </strong>
          <small className="block text-[9px] uppercase tracking-[.2em] text-slate-500">
            Because you are Aces
          </small>
        </span>
      </a>
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="menu-trigger fixed right-5 top-5 z-[60] flex items-center gap-3 rounded-full border border-white/15 bg-[#071226]/80 px-4 py-3 text-xs font-semibold uppercase tracking-[.18em] text-white backdrop-blur-xl sm:right-8 sm:top-8"
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
        aria-controls="site-menu"
      >
        <span>{menuOpen ? "Close" : "Menu"}</span>
        {menuOpen ? <X size={17} /> : <Menu size={17} />}
      </button>
      <div className="social-dock fixed bottom-4 left-4 z-40 flex items-center gap-2 sm:bottom-6 sm:left-8">
        {socialLinks.map(({ label, href, icon: Icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label={`YouAses on ${label}`}
            title={label}
            className="social-dock-link"
          >
            <Icon size={15} />
          </a>
        ))}
      </div>
      {menuOpen && (
        <div className="menu-overlay fixed inset-0 z-50">
          <button
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
            className="absolute inset-0 cursor-default bg-[#020611]/75 backdrop-blur-sm"
          />
          <aside
            id="site-menu"
            className="menu-panel absolute right-0 top-0 flex h-full w-full max-w-[430px] flex-col justify-between border-l border-white/10 bg-[#071226] p-7 pt-28 shadow-2xl sm:p-10 sm:pt-32"
            aria-label="YouAses navigation"
          >
            <div>
              <div className="flex items-center gap-3 border-b border-white/10 pb-7">
                <img
                  src={logo}
                  alt="YouAses"
                  className="h-11 w-11 rounded-xl object-cover"
                />
                <div>
                  <div className="font-display text-xl font-bold">
                    You<span className="text-[#82aaff]">Ases</span>
                  </div>
                  <div className="mt-1 text-[10px] uppercase tracking-[.25em] text-slate-500">
                    Because you are Aces.
                  </div>
                </div>
              </div>
              <nav className="mt-10 flex flex-col">
                {links.map(([label, href], index) => (
                  <a
                    key={href}
                    href={href}
                    onClick={(event) => {
                      event.preventDefault();
                      navigate(href);
                    }}
                    className={`menu-link ${currentPath === href ? "menu-link-active" : ""}`}
                  >
                    <span className="font-mono text-xs text-[#82aaff]">
                      0{index + 1}
                    </span>
                    <span>{label}</span>
                    <ArrowUpRight size={18} />
                  </a>
                ))}
                <a
                  href="/contact"
                  onClick={(event) => {
                    event.preventDefault();
                    navigate("/contact");
                  }}
                  className="menu-link menu-link-contact"
                >
                  <span className="font-mono text-xs">04</span>
                  <span>Start a conversation</span>
                  <Mail size={18} />
                </a>
              </nav>
            </div>
            <div className="border-t border-white/10 pt-6 text-sm leading-7 text-slate-500">
              Independent technology company
              <br />
              AI, software & knowledge platforms
              <br />
              <a href="mailto:hello@youases.work" className="text-[#9fc3ff]">
                hello@youases.work
              </a>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}

function HomePage({ navigate }: { navigate: (to: string) => void }) {
  return (
    <>
      <Hero navigate={navigate} />
      <SignalBar />
      <WhoWeAre navigate={navigate} />
      <HomeIntro navigate={navigate} />
      <HomeFocus />
      <YNote navigate={navigate} />
      <NewsPreview navigate={navigate} />
      <Invitation />
    </>
  );
}

function WhoWeAre({ navigate }: { navigate: (to: string) => void }) {
  return (
    <section className="who-we-are border-y border-white/10 px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
        <div>
          <div className="eyebrow">Start here / Who we are</div>
          <h2 className="mt-5 max-w-xl font-display text-4xl leading-[.98] tracking-[-.05em] sm:text-6xl">
            YouAses is a technology company building{" "}
            <span className="text-gradient">what comes next.</span>
          </h2>
        </div>
        <div className="max-w-2xl">
          <p className="text-lg leading-8 text-slate-200 sm:text-2xl sm:leading-10">
            We combine artificial intelligence, software engineering, and
            thoughtful product design to create tools that help people
            understand more, create faster, and move with confidence.
          </p>
          <p className="mt-6 text-base leading-8 text-slate-500">
            We are an independent studio behind new AI products and knowledge
            platforms. Our first public platform, Y-note, is being built as a
            doorway into connected knowledge — not another place to collect
            disconnected notes.
          </p>
          <div className="mt-8 flex flex-wrap gap-5">
            <button
              onClick={() => navigate("/company")}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#9fc3ff]"
            >
              Read our story <ArrowUpRight size={16} />
            </button>
            <button
              onClick={() => navigate("/platforms")}
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 transition hover:text-white"
            >
              Explore what we build <ArrowUpRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function CompanyPage({ navigate }: { navigate: (to: string) => void }) {
  return (
    <>
      <PageIntro
        eyebrow="The company"
        title={
          <>
            We build technology
            <br />
            <span className="text-gradient">with a human point of view.</span>
          </>
        }
        copy="YouAses is an independent technology company. We use artificial intelligence, software, and design to create products that make knowledge more useful and ambitious work more possible."
      />
      <Manifesto />
      <CompanyStory />
      <CompanyPrinciples />
      <CompanyNextStep navigate={navigate} />
    </>
  );
}

function PlatformsPage({ navigate }: { navigate: (to: string) => void }) {
  return (
    <>
      <PageIntro
        eyebrow="What we are building"
        title={
          <>
            Products for a
            <br />
            <span className="text-gradient">more intelligent future.</span>
          </>
        }
        copy="This is the YouAses product space: AI systems, knowledge environments, and software experiments designed to expand what people can understand, create, and become."
      />
      <Intelligence />
      <YNote navigate={navigate} />
      <Work navigate={navigate} />
    </>
  );
}

const journalArticles = [
  {
    slug: "why-we-are-building-y-note",
    category: "Product signal",
    number: "01",
    title: "We are building a doorway to knowledge.",
    excerpt:
      "Y-note began with a question: what if the next generation of software did more than store what you know?",
    intro:
      "The internet gave the world access to more information than any generation before it. The next challenge is not access. It is making meaning from the enormous amount already around us.",
    sections: [
      {
        heading: "The problem is not a blank page",
        copy: "Most tools ask people to capture more, organise more, and remember more. But a growing archive is not the same as a growing mind. We believe software should help ideas meet, evolve, and become useful at the moment they matter.",
      },
      {
        heading: "A different kind of beginning",
        copy: "Y-note is being shaped around the space between a thought and its next possibility. We are exploring an environment that can recognise context, surface relationships, and make discovery feel natural — without turning curiosity into another task list.",
      },
      {
        heading: "The first signal is coming",
        copy: "We are still building the pieces that make the experience feel unmistakably YouAses. We are not ready to reveal every door yet. For now, know this: Y-note is being made for people who do not want to leave their best ideas behind.",
      },
    ],
  },
  {
    slug: "the-human-side-of-ai",
    category: "Point of view",
    number: "02",
    title: "The future of AI will be measured by what it gives back.",
    excerpt:
      "At YouAses, we are not interested in making intelligence feel louder. We are interested in making people feel more capable.",
    intro:
      "Artificial intelligence is often described through scale: larger models, faster answers, more automation. Those things matter. But they are not the measure we care about most.",
    sections: [
      {
        heading: "Capability without clarity is friction",
        copy: "A powerful system can still leave people overwhelmed. Our work starts with a more human question: does this technology help someone see the situation more clearly, make a better decision, or move from intention to action?",
      },
      {
        heading: "Design is part of the intelligence",
        copy: "Trust is not added after the model is built. It is shaped through language, restraint, transparent behaviour, and interfaces that respect attention. We bring engineering and product thinking together because intelligence only matters when it can be understood.",
      },
      {
        heading: "Building with a long horizon",
        copy: "YouAses is building for more than a launch moment. We want our products to become dependable layers in the way people learn, create, and work — technology that expands agency rather than quietly taking it away.",
      },
    ],
  },
  {
    slug: "inside-the-youases-studio",
    category: "Studio letter",
    number: "03",
    title:
      "Inside the YouAses studio: from impossible questions to useful systems.",
    excerpt:
      "Every YouAses idea starts as a question about what people could do if technology understood the direction, not just the command.",
    intro:
      "YouAses is an independent technology company, but we think like a studio: curious at the beginning, rigorous in the middle, and ambitious about the final experience.",
    sections: [
      {
        heading: "Start with the human tension",
        copy: "Before a feature, a roadmap, or a name, we look for the tension people are already living with: too much information, too little context, or a promising idea trapped inside a difficult workflow.",
      },
      {
        heading: "Make the invisible understandable",
        copy: "Our work crosses artificial intelligence, software engineering, and product design. The goal is not to show how complicated the system is. The goal is to make the value feel immediate, clear, and worth returning to.",
      },
      {
        heading: "A portfolio with a point of view",
        copy: "The products we build will look different from one another, but they share a belief: technology should create momentum. That is the standard we are bringing to Y-note and everything that follows.",
      },
    ],
  },
];

function JournalPage({ navigate }: { navigate: (to: string) => void }) {
  const [featured, ...stories] = journalArticles;
  return (
    <>
      <PageIntro
        eyebrow="YouAses / Journal"
        title={
          <>
            A clear view of
            <br />
            <span className="text-gradient">what we are building.</span>
          </>
        }
        copy="The YouAses Journal is where we publish the thinking behind our company: the problems we are exploring, the products taking shape, and the ideas guiding our work in artificial intelligence and software."
      />
      <section className="journal-index px-5 pb-28 sm:px-8 sm:pb-40">
        <div className="mx-auto max-w-[1400px]">
          <div className="journal-featured">
            <div className="max-w-2xl">
              <div className="eyebrow">Featured / {featured.category}</div>
              <h2 className="mt-6 font-display text-4xl leading-[.98] tracking-[-.05em] sm:text-6xl">
                {featured.title}
              </h2>
              <p className="mt-6 text-lg leading-8 text-slate-300">
                {featured.excerpt}
              </p>
              <button
                onClick={() => navigate(`/journal/${featured.slug}`)}
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-[#071226] transition hover:bg-[#9ac7ff]"
              >
                Read the feature <ArrowUpRight size={16} />
              </button>
            </div>
            <div className="journal-featured-mark">
              <img src={appIcon} alt="Y-note" loading="lazy" decoding="async" />
              <span>Y-note / First signal</span>
            </div>
          </div>
          <div className="mt-20 flex items-end justify-between gap-6">
            <div>
              <div className="eyebrow">All stories</div>
              <h2 className="mt-4 font-display text-3xl tracking-[-.04em] sm:text-5xl">
                Ideas worth following.
              </h2>
            </div>
            <span className="hidden text-sm text-slate-600 sm:block">
              {stories.length} stories / more to come
            </span>
          </div>
          <div className="mt-8 divide-y divide-white/10 border-y border-white/10">
            {stories.map((article) => (
              <button
                key={article.slug}
                onClick={() => navigate(`/journal/${article.slug}`)}
                className="journal-row text-left"
              >
                <div className="font-mono text-xs text-[#82aaff]">
                  {article.number}
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-[.2em] text-[#82aaff]">
                    {article.category}
                  </div>
                  <h3 className="mt-3 font-display text-2xl tracking-[-.03em] sm:text-3xl">
                    {article.title}
                  </h3>
                  <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500">
                    {article.excerpt}
                  </p>
                </div>
                <ArrowUpRight
                  className="text-slate-500 transition group-hover:text-white"
                  size={20}
                />
              </button>
            ))}
          </div>
          <div className="mt-20 grid gap-8 border-t border-white/10 pt-10 md:grid-cols-[1fr_auto] md:items-center">
            <p className="max-w-2xl text-base leading-8 text-slate-500">
              The Journal is not separate from the work. It is the clearest way
              to follow how a YouAses question becomes a product, and how our
              products become useful in the real world.
            </p>
            <button
              onClick={() => navigate("/contact")}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#9fc3ff]"
            >
              Stay close to the next release <ArrowUpRight size={16} />
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

function JournalArticlePage({
  path,
  navigate,
}: {
  path: string;
  navigate: (to: string) => void;
}) {
  const slug = path.replace("/journal/", "");
  const article = journalArticles.find((item) => item.slug === slug);

  if (!article) {
    return (
      <PageIntro
        eyebrow="Journal / 404"
        title={
          <>
            This signal
            <br />
            <span className="text-gradient">has moved.</span>
          </>
        }
        copy="The article you are looking for is not available, but there is more to discover in the YouAses Journal."
      />
    );
  }

  return (
    <article className="journal-article px-5 pb-32 pt-44 sm:px-8 sm:pb-48">
      <div className="mx-auto max-w-[1000px]">
        <button
          onClick={() => navigate("/journal")}
          className="reveal inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[.2em] text-[#9fc3ff]"
        >
          <ArrowDownRight className="rotate-90" size={15} /> Back to Journal
        </button>
        <div className="reveal mt-14 eyebrow">
          {article.category} / {article.number}
        </div>
        <h1 className="reveal mt-6 max-w-5xl font-display text-5xl font-medium leading-[.9] tracking-[-.07em] sm:text-8xl">
          {article.title}
        </h1>
        <p className="reveal mt-10 max-w-3xl text-xl leading-9 text-slate-300 sm:text-2xl sm:leading-10">
          {article.intro}
        </p>
        <div className="article-rule mt-16" />
        <div className="mt-16 max-w-2xl space-y-14">
          {article.sections.map((section, index) => (
            <section key={section.heading} className="reveal">
              <div className="font-mono text-xs text-[#82aaff]">
                0{index + 1}
              </div>
              <h2 className="mt-4 font-display text-3xl tracking-[-.04em] sm:text-4xl">
                {section.heading}
              </h2>
              <p className="mt-5 text-base leading-8 text-slate-400">
                {section.copy}
              </p>
            </section>
          ))}
        </div>
        <div className="article-cta mt-24 rounded-[2rem] p-8 sm:p-12">
          <div className="eyebrow">Stay close to the next signal</div>
          <h2 className="mt-5 max-w-2xl font-display text-3xl leading-tight tracking-[-.04em] sm:text-5xl">
            The most interesting part is still ahead.
          </h2>
          <p className="mt-5 max-w-xl leading-8 text-slate-400">
            Follow YouAses as we turn these ideas into products, platforms, and
            experiences you can use.
          </p>
          <button
            onClick={() => navigate("/contact")}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-[#071226] transition hover:bg-[#9ac7ff]"
          >
            Get the next signal <ArrowUpRight size={16} />
          </button>
        </div>
      </div>
    </article>
  );
}

function NotFoundPage({ navigate }: { navigate: (to: string) => void }) {
  return (
    <PageIntro
      eyebrow="404 / Page not found"
      title={
        <>
          This page is
          <br />
          <span className="text-gradient">not here.</span>
        </>
      }
      copy="The page may have moved, but the YouAses story is still unfolding. Return home or explore the Journal."
    >
      <div className="mt-8 flex flex-wrap gap-5">
        <a
          href="/"
          onClick={(event) => {
            event.preventDefault();
            navigate("/");
          }}
          className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-[#071226]"
        >
          Return home <ArrowUpRight size={16} />
        </a>
        <a
          href="/journal"
          onClick={(event) => {
            event.preventDefault();
            navigate("/journal");
          }}
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#9fc3ff]"
        >
          Read the Journal <ArrowUpRight size={16} />
        </a>
      </div>
    </PageIntro>
  );
}

function PageIntro({
  eyebrow,
  title,
  copy,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  copy: string;
  children?: ReactNode;
}) {
  return (
    <section className="page-intro px-5 pb-24 pt-44 sm:px-8 sm:pb-32">
      <div className="mx-auto max-w-[1400px]">
        <div className="reveal eyebrow">{eyebrow}</div>
        <h1 className="reveal mt-6 max-w-5xl font-display text-5xl font-medium leading-[.9] tracking-[-.07em] sm:text-8xl">
          {title}
        </h1>
        <p className="reveal mt-8 max-w-2xl text-lg leading-8 text-slate-400 sm:text-xl">
          {copy}
        </p>
        {children}
      </div>
    </section>
  );
}

function HomeIntro({ navigate }: { navigate: (to: string) => void }) {
  return (
    <section className="border-y border-white/10 px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-[1fr_.65fr] lg:items-end">
        <div>
          <div className="eyebrow">01 / The signal</div>
          <h2 className="mt-5 max-w-3xl font-display text-4xl leading-[.98] tracking-[-.05em] sm:text-6xl">
            We make advanced technology feel{" "}
            <span className="text-gradient">human.</span>
          </h2>
        </div>
        <div>
          <p className="text-base leading-8 text-slate-400">
            YouAses creates AI systems, software, and knowledge platforms for
            people who are ready to move first.
          </p>
          <button
            onClick={() => navigate("/company")}
            className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[#9fc3ff]"
          >
            Meet the company <ArrowUpRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}

function HomeFocus() {
  const items = [
    [
      "01",
      "Artificial intelligence",
      "We design useful AI systems that understand context, support decisions, and make difficult work feel more natural.",
    ],
    [
      "02",
      "Software products",
      "We turn ambitious ideas into clear, reliable digital products people return to because they make progress visible.",
    ],
    [
      "03",
      "Knowledge platforms",
      "We connect ideas, information, and people in new environments built for learning, discovery, and momentum.",
    ],
  ];
  return (
    <section className="home-focus px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-[1400px]">
        <div className="eyebrow">How we create value</div>
        <div className="mt-8 grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 md:grid-cols-3">
          {items.map(([number, title, copy]) => (
            <article key={number} className="focus-card">
              <span className="font-mono text-xs text-[#82aaff]">{number}</span>
              <h3 className="mt-14 font-display text-2xl">{title}</h3>
              <p className="mt-4 max-w-xs text-sm leading-7 text-slate-500">
                {copy}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function NewsPreview({ navigate }: { navigate: (to: string) => void }) {
  const cards = [
    {
      date: "Product signal / 01",
      title: "Y-note is getting ready to open its first door.",
      copy: "A new environment for ideas, context, and discovery.",
      slug: "why-we-are-building-y-note",
      featured: true,
    },
    {
      date: "Point of view / 02",
      title: "The future of AI will be measured by what it gives back.",
      copy: "Why useful intelligence should leave people more capable.",
      slug: "the-human-side-of-ai",
    },
    {
      date: "Studio letter / 03",
      title: "From impossible questions to useful systems.",
      copy: "How a YouAses idea moves from tension to product.",
      slug: "inside-the-youases-studio",
    },
  ];
  return (
    <section className="px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex items-end justify-between gap-5">
          <div>
            <div className="eyebrow">02 / From the studio</div>
            <h2 className="mt-4 font-display text-4xl tracking-[-.04em] sm:text-6xl">
              What&apos;s taking shape.
            </h2>
          </div>
          <button
            onClick={() => navigate("/journal")}
            className="hidden items-center gap-2 text-sm font-semibold text-[#9fc3ff] sm:inline-flex"
          >
            Open Journal <MoveUpRight size={16} />
          </button>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {cards.map((card) => (
            <NewsCard key={card.slug} {...card} navigate={navigate} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Hero({ navigate }: { navigate: (to: string) => void }) {
  return (
    <section
      id="top"
      className="hero-section relative flex min-h-screen items-end overflow-hidden px-5 pb-20 pt-40 sm:px-8 sm:pb-24"
    >
      <div className="hero-noise absolute inset-0 -z-10" />
      <div className="hero-sun absolute left-[52%] top-[35%] -z-10 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full" />
      <div className="absolute inset-0 -z-10 opacity-60 [background-image:linear-gradient(rgba(138,180,255,.06)_1px,transparent_1px),linear-gradient(90deg,rgba(138,180,255,.06)_1px,transparent_1px)] [background-size:80px_80px] [mask-image:radial-gradient(ellipse_at_center,black_5%,transparent_72%)]" />
      <div className="mx-auto grid w-full max-w-[1400px] items-end gap-14 lg:grid-cols-[1.25fr_.75fr]">
        <div>
          <div className="reveal flex items-center gap-3 text-xs uppercase tracking-[.32em] text-[#91b9ff]">
            <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-300 shadow-[0_0_14px_#67e8f9]" />{" "}
            YouAses / Independent AI company
          </div>
          <h1 className="reveal mt-8 max-w-5xl font-display text-[clamp(4rem,11vw,10rem)] font-medium leading-[.82] tracking-[-.08em]">
            Intelligence
            <br />
            <span className="hero-word">with intent.</span>
          </h1>
          <p className="reveal mt-9 max-w-xl text-lg leading-8 text-slate-400 sm:text-xl">
            YouAses is an independent technology company focused on artificial
            intelligence, intelligent software, and knowledge platforms. We
            build the products that help people think further and act with more
            clarity.
          </p>
          <div className="reveal mt-10 flex flex-wrap items-center gap-4">
            <button
              onClick={() => navigate("/company")}
              className="group inline-flex items-center gap-3 rounded-full bg-[#82aaff] px-6 py-3.5 text-sm font-bold text-[#061125] transition hover:-translate-y-1 hover:bg-white"
            >
              Enter YouAses{" "}
              <ArrowDownRight
                size={17}
                className="transition group-hover:translate-y-1"
              />
            </button>
            <button
              onClick={() => navigate("/platforms")}
              className="inline-flex items-center gap-2 px-4 py-3.5 text-sm font-semibold text-slate-300 hover:text-white"
            >
              See what&apos;s forming <MoveUpRight size={16} />
            </button>
          </div>
        </div>
        <div className="reveal relative hidden min-h-[410px] lg:block">
          <div className="absolute right-8 top-2 h-72 w-72 rounded-full border border-[#82aaff]/25" />
          <div className="absolute right-20 top-14 h-56 w-56 animate-spin rounded-full border border-dashed border-cyan-300/25 [animation-duration:30s]" />
          <div className="absolute right-32 top-28 h-32 w-32 rounded-full bg-[#82aaff]/15 blur-3xl" />
          <img
            src={logo}
            alt="YouAses symbol"
            className="absolute right-28 top-24 z-10 w-40 rounded-[28%] shadow-[0_0_90px_rgba(97,153,255,.5)]"
          />
          <div className="absolute bottom-1 right-0 max-w-[220px] border-l border-[#82aaff]/50 pl-4 text-sm leading-6 text-slate-500">
            A new layer of technology is taking shape. You are early.
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3 text-[10px] uppercase tracking-[.35em] text-slate-600">
        <span>Scroll to explore</span>
        <span className="h-12 w-px bg-gradient-to-b from-[#82aaff] to-transparent" />
      </div>
    </section>
  );
}

function SignalBar() {
  return (
    <div className="border-y border-white/10 bg-white/[.025] px-5 py-5 sm:px-8">
      <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-5 text-[10px] uppercase tracking-[.26em] text-slate-500">
        <span>AI systems</span>
        <span className="text-[#82aaff]">✦</span>
        <span>Human knowledge</span>
        <span className="text-[#82aaff]">✦</span>
        <span>Frontier software</span>
        <span className="text-[#82aaff]">✦</span>
        <span>Global by design</span>
      </div>
    </div>
  );
}

function Heading({
  eyebrow,
  title,
  copy,
}: {
  eyebrow: string;
  title: ReactNode;
  copy?: string;
}) {
  return (
    <div className="reveal max-w-3xl">
      <div className="eyebrow">{eyebrow}</div>
      <h2 className="mt-5 font-display text-4xl font-medium leading-[.98] tracking-[-.055em] sm:text-7xl">
        {title}
      </h2>
      {copy && (
        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-400">
          {copy}
        </p>
      )}
    </div>
  );
}

function Manifesto() {
  return (
    <section id="company" className="px-5 py-28 sm:px-8 sm:py-40">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-16 lg:grid-cols-[.8fr_1.2fr] lg:gap-28">
          <Heading
            eyebrow="01 / Why we exist"
            title={
              <>
                A company for the
                <br />
                <span className="text-gradient">impossible middle.</span>
              </>
            }
          />
          <div>
            <p className="reveal text-2xl leading-[1.35] text-slate-200 sm:text-4xl">
              YouAses exists to turn machine intelligence into human
              possibility.
            </p>
            <p className="reveal mt-8 max-w-2xl text-base leading-8 text-slate-500">
              We are not building technology for the sake of novelty. We are
              building the layer between a difficult question and a better
              answer: systems that understand context, software that creates
              momentum, and products that give ambitious people more room to
              think.
            </p>
            <div className="reveal mt-10 flex items-center gap-4 text-sm text-[#9fc3ff]">
              <Quote size={20} /> Because you are Aces.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CompanyStory() {
  const chapters = [
    [
      "01",
      "The question",
      "What if advanced technology felt less like a tool you operate and more like an intelligence you could think with?",
    ],
    [
      "02",
      "The discipline",
      "We bring together AI, product engineering, and editorial clarity — because powerful systems only matter when people can use them with confidence.",
    ],
    [
      "03",
      "The horizon",
      "Our ambition is to create a family of platforms that expands access to understanding, helping more people learn faster, build boldly, and see further.",
    ],
  ];
  return (
    <section className="company-story px-5 py-20 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-8 lg:grid-cols-[.55fr_1.45fr]">
          <div>
            <div className="eyebrow">The YouAses point of view</div>
            <h2 className="mt-5 max-w-sm font-display text-4xl leading-[.98] tracking-[-.05em] sm:text-6xl">
              Build the layer people{" "}
              <span className="text-gradient">build on.</span>
            </h2>
          </div>
          <div className="grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 md:grid-cols-3">
            {chapters.map(([number, title, copy]) => (
              <article key={number} className="story-card">
                <span className="font-mono text-xs text-[#82aaff]">
                  {number}
                </span>
                <h3 className="mt-16 font-display text-xl">{title}</h3>
                <p className="mt-4 text-sm leading-7 text-slate-500">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CompanyPrinciples() {
  const principles = [
    [
      "01",
      "Useful over impressive",
      "We judge technology by the clarity and capability it gives back to the people using it.",
    ],
    [
      "02",
      "Human by design",
      "Our systems are built around real attention, real context, and the way people actually think.",
    ],
    [
      "03",
      "Long-term by default",
      "We build foundations that can grow into lasting products, not short-lived demonstrations.",
    ],
  ];
  return (
    <section className="company-principles px-5 py-24 sm:px-8 sm:py-36">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-12 lg:grid-cols-[.65fr_1.35fr]">
          <div>
            <div className="eyebrow">How we work</div>
            <h2 className="mt-5 max-w-sm font-display text-4xl leading-[.98] tracking-[-.05em] sm:text-6xl">
              A clear standard for{" "}
              <span className="text-gradient">ambitious technology.</span>
            </h2>
          </div>
          <div className="divide-y divide-white/10 border-y border-white/10">
            {principles.map(([number, title, copy]) => (
              <article
                key={number}
                className="principle-row grid gap-5 py-7 sm:grid-cols-[3rem_1fr_1.2fr] sm:items-start"
              >
                <span className="font-mono text-xs text-[#82aaff]">
                  {number}
                </span>
                <h3 className="font-display text-2xl tracking-[-.03em]">
                  {title}
                </h3>
                <p className="max-w-md text-sm leading-7 text-slate-500">
                  {copy}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CompanyNextStep({ navigate }: { navigate: (to: string) => void }) {
  return (
    <section className="company-next px-5 pb-28 sm:px-8 sm:pb-40">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-8 rounded-[2rem] border border-white/10 bg-[#091226] p-8 sm:p-12 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="eyebrow">What comes next</div>
          <h2 className="mt-5 max-w-2xl font-display text-4xl leading-[.98] tracking-[-.05em] sm:text-6xl">
            The company is the beginning.
          </h2>
          <p className="mt-5 max-w-xl text-base leading-8 text-slate-500">
            Our next chapter is being built through products, research, and
            ideas that make intelligence more useful in everyday life.
          </p>
        </div>
        <button
          onClick={() => navigate("/platforms")}
          className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-[#071226] transition hover:-translate-y-1 hover:bg-[#9ac7ff]"
        >
          Explore our platforms <ArrowUpRight size={16} />
        </button>
      </div>
    </section>
  );
}

function Intelligence() {
  const pillars = [
    {
      icon: BrainCircuit,
      index: "01",
      title: "Intelligence, made human",
      copy: "We design AI that earns trust through context, restraint, and a deep respect for the person using it.",
    },
    {
      icon: Network,
      index: "02",
      title: "Knowledge, set free",
      copy: "We are exploring new ways to connect ideas, people, and the world’s most valuable resource: understanding.",
    },
    {
      icon: Globe2,
      index: "03",
      title: "Built for the long horizon",
      copy: "Every decision is measured against a bigger question: does this expand what people can become?",
    },
  ];
  return (
    <section id="intelligence" className="relative px-5 py-28 sm:px-8 sm:py-40">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_75%_50%,rgba(55,109,203,.16),transparent_55%)]" />
      <div className="mx-auto max-w-[1400px]">
        <Heading
          eyebrow="02 / The intelligence layer"
          title={
            <>
              We are building
              <br />
              <span className="text-gradient">beyond the interface.</span>
            </>
          }
          copy="From foundational AI research to software that disappears into the way you think, our work is focused on one shift: technology that understands the direction you are going."
        />
        <div className="mt-16 grid gap-px overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 md:grid-cols-3">
          {pillars.map(({ icon: Icon, index, title, copy }) => (
            <article
              key={index}
              className="reveal group bg-[#091226] p-7 transition hover:bg-[#0d1d39] sm:p-9"
            >
              <div className="flex items-center justify-between">
                <Icon className="text-[#82aaff]" size={25} />
                <span className="font-mono text-xs text-slate-600">
                  {index}
                </span>
              </div>
              <h3 className="mt-20 max-w-xs font-display text-2xl font-medium">
                {title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-slate-500">{copy}</p>
              <div className="mt-10 h-px w-12 bg-[#82aaff] transition-all group-hover:w-24" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function YNote({ navigate }: { navigate: (to: string) => void }) {
  return (
    <section
      id="y-note"
      className="relative overflow-hidden px-5 py-28 sm:px-8 sm:py-40"
    >
      <div className="absolute right-[-10%] top-1/2 h-[600px] w-[600px] -translate-y-1/2 rounded-full bg-[#1f6bff]/15 blur-[120px]" />
      <div className="mx-auto grid max-w-[1400px] items-center gap-16 lg:grid-cols-[1fr_.85fr]">
        <div>
          <div className="reveal flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl bg-white/10 p-1">
              <img
                src={appIcon}
                alt="Y-note icon"
                loading="lazy"
                decoding="async"
                className="h-full w-full rounded-lg object-cover"
              />
            </span>
            <span className="eyebrow">03 / A YouAses platform</span>
          </div>
          <h2 className="reveal mt-8 max-w-2xl font-display text-5xl font-medium leading-[.95] tracking-[-.06em] sm:text-8xl">
            A new way to
            <br />
            <span className="text-gradient">know more.</span>
          </h2>
          <p className="reveal mt-7 max-w-xl text-lg leading-8 text-slate-400">
            Y-note is the first doorway into a larger idea: a living knowledge
            environment for connecting thought, discovering relationships, and
            turning information into momentum.
          </p>
          <div className="reveal mt-9 flex items-center gap-4">
            <button
              onClick={() => navigate("/contact")}
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-[#071226] hover:bg-[#9ac7ff]"
            >
              Join the first signal <ArrowUpRight size={16} />
            </button>
            <span className="text-xs uppercase tracking-[.18em] text-slate-600">
              Coming soon / private build
            </span>
          </div>
        </div>
        <div className="reveal relative mx-auto aspect-[.82] w-full max-w-[430px]">
          <div className="absolute inset-0 rotate-6 rounded-[2.6rem] border border-[#82aaff]/20 bg-[#0b1c39]/70 shadow-[0_30px_100px_rgba(0,0,0,.4)]" />
          <div className="absolute inset-5 -rotate-3 overflow-hidden rounded-[2.3rem] border border-white/10 bg-[#071329] p-6 shadow-2xl sm:p-8">
            <div className="flex items-center justify-between text-[10px] uppercase tracking-[.28em] text-slate-500">
              <span>Y-note / Private build</span>
              <span className="flex items-center gap-2">
                <i className="h-1.5 w-1.5 rounded-full bg-amber-300" /> Locked
              </span>
            </div>
            <div className="relative mt-20">
              <div className="font-display text-4xl leading-[.95] tracking-[-.05em] blur-[5px] select-none sm:text-5xl">
                The future
                <br />
                <span className="text-[#82aaff]">is connected.</span>
              </div>
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#071329]/55 text-center backdrop-blur-[2px]">
                <span className="flex h-14 w-14 items-center justify-center rounded-full border border-[#82aaff]/40 bg-[#0b1d3d] text-[#9fc3ff] shadow-[0_0_35px_rgba(130,170,255,.25)]">
                  <LockKeyhole size={22} />
                </span>
                <span className="mt-4 text-[10px] font-bold uppercase tracking-[.28em] text-white">
                  Coming soon
                </span>
                <span className="mt-2 text-xs text-slate-500">
                  The first door opens soon.
                </span>
              </div>
            </div>
            <div className="mt-16 space-y-3 opacity-40">
              <div className="h-1.5 w-28 rounded-full bg-[#82aaff]" />
              <div className="h-1.5 w-48 rounded-full bg-white/10" />
              <div className="h-1.5 w-36 rounded-full bg-white/10" />
            </div>
            <div className="mt-10 flex items-center justify-between border-t border-white/10 pt-5 text-xs text-slate-600">
              <span>Ideas / Context / Direction</span>
              <Orbit size={18} className="text-[#82aaff]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Work({ navigate }: { navigate: (to: string) => void }) {
  const projects = [
    {
      number: "01",
      label: "Knowledge systems",
      title: "The architecture of a more curious world.",
      copy: "An intelligence layer for turning scattered information into a map you can move through.",
      status: "In development",
      tone: "work-blue",
    },
    {
      number: "02",
      label: "Applied AI",
      title: "Tools that meet you at the edge of your ability.",
      copy: "Adaptive systems that make complex work feel less like friction and more like flow.",
      status: "Research direction",
      tone: "work-violet",
    },
    {
      number: "03",
      label: "Digital futures",
      title: "Interfaces for the things we have not named yet.",
      copy: "Experiments across language, learning, and the next generation of digital life.",
      status: "Long-term horizon",
      tone: "work-cyan",
    },
  ];
  return (
    <section id="work" className="px-5 py-28 sm:px-8 sm:py-40">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
          <Heading
            eyebrow="04 / The work"
            title={
              <>
                Not projects.
                <br />
                <span className="text-gradient">Possibilities.</span>
              </>
            }
          />
          <button
            onClick={() => navigate("/contact")}
            className="reveal inline-flex items-center gap-2 text-sm font-semibold text-[#9fc3ff]"
          >
            Explore our thinking <MoveUpRight size={16} />
          </button>
        </div>
        <div className="mt-16 space-y-5">
          {projects.map((project) => (
            <article
              key={project.number}
              className={`reveal project-card ${project.tone}`}
            >
              <div className="flex items-start justify-between">
                <span className="font-mono text-xs text-white/50">
                  {project.number}
                </span>
                <span className="rounded-full border border-white/15 px-3 py-1 text-[10px] uppercase tracking-[.2em] text-white/60">
                  {project.label}
                </span>
              </div>
              <div className="mt-20 grid gap-8 lg:grid-cols-[.95fr_1fr_.4fr] lg:items-end">
                <h3 className="font-display text-3xl leading-[1.05] tracking-[-.04em] sm:text-5xl">
                  {project.title}
                </h3>
                <p className="max-w-md text-sm leading-7 text-white/60">
                  {project.copy}
                </p>
                <div className="project-status">
                  <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_14px_#67e8f9]" />
                  {project.status}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function NewsCard({
  date,
  title,
  copy,
  featured,
  slug,
  navigate,
}: {
  date: string;
  title: string;
  copy: string;
  featured?: boolean;
  slug: string;
  navigate: (to: string) => void;
}) {
  return (
    <button
      onClick={() => navigate(`/journal/${slug}`)}
      className={`reveal news-card text-left ${featured ? "news-featured" : ""}`}
    >
      <div className="flex items-center justify-between text-[10px] uppercase tracking-[.2em] text-[#82aaff]">
        <span>{date}</span>
        <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
      </div>
      <h3 className="mt-16 font-display text-2xl leading-[1.1] tracking-[-.03em]">
        {title}
      </h3>
      <p className="mt-5 text-sm leading-7 text-slate-500">{copy}</p>
      <div className="mt-9 flex items-center gap-2 text-xs font-semibold text-slate-300">
        Read the signal <ArrowUpRight size={14} />
      </div>
    </button>
  );
}

function Invitation({ standalone = false }: { standalone?: boolean }) {
  const [email, setEmail] = useState("");
  function submit(event: React.FormEvent) {
    event.preventDefault();
    if (!email) return;
    window.location.href = `mailto:hello@youases.work?subject=${encodeURIComponent("YouAses / I want to be early")}&body=${encodeURIComponent(`Please keep me close to the YouAses journey. My email is ${email}.`)}`;
  }
  return (
    <section id="contact" className="relative px-5 py-28 sm:px-8 sm:py-40">
      <div className="absolute inset-x-0 bottom-0 -z-10 h-96 bg-[radial-gradient(ellipse_at_bottom,rgba(50,102,211,.25),transparent_68%)]" />
      <div className="mx-auto max-w-[1400px] border-t border-white/10 pt-14">
        <div className="grid gap-14 lg:grid-cols-[1fr_.8fr] lg:items-end">
          <div>
            <div className="eyebrow">06 / The invitation</div>
            {standalone ? (
              <h1 className="mt-5 max-w-4xl font-display text-5xl font-medium leading-[.92] tracking-[-.06em] sm:text-8xl">
                The next chapter
                <br />
                <span className="text-gradient">is being written.</span>
              </h1>
            ) : (
              <h2 className="mt-5 max-w-4xl font-display text-5xl font-medium leading-[.92] tracking-[-.06em] sm:text-8xl">
                The next chapter
                <br />
                <span className="text-gradient">is being written.</span>
              </h2>
            )}
            <p className="mt-7 max-w-lg text-lg leading-8 text-slate-400">
              If you are building, thinking, or simply curious about what comes
              next — stay close.
            </p>
          </div>
          <div className="reveal">
            <form onSubmit={submit} className="border-b border-white/25 pb-3">
              <label htmlFor="email" className="sr-only">
                Your email
              </label>
              <div className="flex items-center gap-3">
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Your email address"
                  className="min-w-0 flex-1 bg-transparent text-lg text-white outline-none placeholder:text-slate-600"
                />
                <button
                  aria-label="Join the YouAses list"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#82aaff] text-[#071226] transition hover:bg-white"
                >
                  <ArrowUpRight size={18} />
                </button>
              </div>
            </form>
            <p className="mt-4 text-xs text-slate-600">
              No noise. Only meaningful signals from YouAses.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const footerLinks = [
    ["Company", "/company"],
    ["Platforms", "/platforms"],
    ["Journal", "/journal"],
    ["Contact", "/contact"],
  ];
  return (
    <footer className="border-t border-white/10 px-5 py-9 sm:px-8">
      <div className="mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-7 text-xs text-slate-500 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <img
            src={logo}
            alt=""
            loading="lazy"
            decoding="async"
            className="h-7 w-7 rounded-lg"
          />
          <span className="font-display font-semibold text-slate-300">
            YouAses Technology
          </span>
          <span className="hidden text-slate-700 sm:inline">
            / Because you are Aces.
          </span>
        </div>
        <nav
          className="flex flex-wrap items-center gap-x-5 gap-y-3"
          aria-label="Footer navigation"
        >
          {footerLinks.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="transition hover:text-[#82aaff]"
            >
              {label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-5">
          {socialLinks.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="transition hover:text-[#82aaff]"
            >
              <Icon size={16} />
            </a>
          ))}
          <a
            href="mailto:hello@youases.work"
            className="ml-2 inline-flex items-center gap-2 transition hover:text-[#82aaff]"
          >
            <Mail size={15} /> hello@youases.work
          </a>
        </div>
        <span>© {new Date().getFullYear()} YouAses</span>
      </div>
    </footer>
  );
}
