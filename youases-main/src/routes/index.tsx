import { useEffect, useState, type ReactNode } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  BrainCircuit,
  ChevronRight,
  Facebook,
  Globe2,
  Instagram,
  Linkedin,
  Mail,
  Menu,
  MoveUpRight,
  Network,
  Orbit,
  Quote,
  Rocket,
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

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [path, setPath] = useState(() => window.location.pathname);
  useReveal();
  useEffect(() => {
    const onPopState = () => setPath(window.location.pathname);
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);
  function navigate(to: string) {
    window.history.pushState({}, "", to);
    setPath(to);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  const page = ["/company", "/platforms", "/journal", "/contact"].includes(path)
    ? path
    : "/";

  return (
    <div className="min-h-screen overflow-hidden bg-[#050b18] text-white">
      <Nav
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        currentPath={page}
        navigate={navigate}
      />
      <main>
        {page === "/" && <HomePage navigate={navigate} />}
        {page === "/company" && <CompanyPage navigate={navigate} />}
        {page === "/platforms" && <PlatformsPage navigate={navigate} />}
        {page === "/journal" && <JournalPage />}
        {page === "/contact" && <Invitation />}
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
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="menu-trigger fixed right-5 top-5 z-[60] flex items-center gap-3 rounded-full border border-white/15 bg-[#071226]/80 px-4 py-3 text-xs font-semibold uppercase tracking-[.18em] text-white backdrop-blur-xl sm:right-8 sm:top-8"
        aria-label={menuOpen ? "Close menu" : "Open menu"}
      >
        <span>{menuOpen ? "Close" : "Menu"}</span>
        {menuOpen ? <X size={17} /> : <Menu size={17} />}
      </button>
      {menuOpen && (
        <div className="menu-overlay fixed inset-0 z-50">
          <button
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
            className="absolute inset-0 cursor-default bg-[#020611]/75 backdrop-blur-sm"
          />
          <aside className="menu-panel absolute right-0 top-0 flex h-full w-full max-w-[430px] flex-col justify-between border-l border-white/10 bg-[#071226] p-7 pt-28 shadow-2xl sm:p-10 sm:pt-32">
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
                  <button
                    key={href}
                    onClick={() => navigate(href)}
                    className={`menu-link ${currentPath === href ? "menu-link-active" : ""}`}
                  >
                    <span className="font-mono text-xs text-[#82aaff]">
                      0{index + 1}
                    </span>
                    <span>{label}</span>
                    <ArrowUpRight size={18} />
                  </button>
                ))}
                <button
                  onClick={() => navigate("/contact")}
                  className="menu-link menu-link-contact"
                >
                  <span className="font-mono text-xs">04</span>
                  <span>Start a conversation</span>
                  <Mail size={18} />
                </button>
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
      <HomeIntro navigate={navigate} />
      <HomeFocus />
      <YNote navigate={navigate} />
      <NewsPreview navigate={navigate} />
      <Invitation />
    </>
  );
}

function CompanyPage({ navigate }: { navigate: (to: string) => void }) {
  return (
    <>
      <PageIntro
        eyebrow="The company"
        title={
          <>
            Technology with
            <br />
            <span className="text-gradient">a point of view.</span>
          </>
        }
        copy="YouAses is an AI-first technology company building intelligent software and knowledge platforms for people and organizations shaping what comes next."
      />
      <Manifesto />
      <CompanyStory />
      <Intelligence />
      <Work navigate={navigate} />
    </>
  );
}

function PlatformsPage({ navigate }: { navigate: (to: string) => void }) {
  return (
    <>
      <PageIntro
        eyebrow="Platforms & initiatives"
        title={
          <>
            The ideas we are
            <br />
            <span className="text-gradient">turning into reality.</span>
          </>
        }
        copy="Some are already taking shape. Others are still being named. Every initiative starts with the same ambition: expand what people can understand and create."
      />
      <Intelligence />
      <YNote navigate={navigate} />
      <Work navigate={navigate} />
    </>
  );
}

function JournalPage() {
  return (
    <>
      <PageIntro
        eyebrow="YouAses Journal"
        title={
          <>
            Signals from
            <br />
            <span className="text-gradient">the studio.</span>
          </>
        }
        copy="A living record of the questions, systems, and ambitious experiments guiding YouAses forward."
      />
      <News />
      <JournalFeature />
    </>
  );
}

function PageIntro({
  eyebrow,
  title,
  copy,
}: {
  eyebrow: string;
  title: ReactNode;
  copy: string;
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
      "Understand",
      "We turn complex information into systems people can actually navigate.",
    ],
    [
      "02",
      "Augment",
      "We build AI that extends human judgment instead of replacing the human point of view.",
    ],
    [
      "03",
      "Advance",
      "We create software with the ambition to move industries, not just screens.",
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
          <NewsCard
            date="Coming soon / 01"
            title="Y-note is getting ready to open its first door."
            copy="A new environment for ideas, context, and discovery."
            featured
          />
          <NewsCard
            date="The long horizon / 02"
            title="We are building an intelligence layer of our own."
            copy="A different approach to software that understands direction."
          />
          <NewsCard
            date="Studio notes / 03"
            title="The quiet revolution is already underway."
            copy="Why the next interface may feel less like a machine."
          />
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
            We build intelligent systems, software, and new interfaces that help
            humanity move through the next era with more clarity.
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
            Y-note is our first doorway into a larger idea: a living knowledge
            environment that helps you connect thought, discover relationships,
            and turn information into momentum.
          </p>
          <div className="reveal mt-9 flex items-center gap-4">
            <button
              onClick={() => navigate("/contact")}
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-[#071226] hover:bg-[#9ac7ff]"
            >
              Get the first signal <ArrowUpRight size={16} />
            </button>
            <span className="text-xs uppercase tracking-[.18em] text-slate-600">
              In development / 2026
            </span>
          </div>
        </div>
        <div className="reveal relative mx-auto aspect-[.82] w-full max-w-[430px]">
          <div className="absolute inset-0 rotate-6 rounded-[2.6rem] border border-[#82aaff]/20 bg-[#0b1c39]/70 shadow-[0_30px_100px_rgba(0,0,0,.4)]" />
          <div className="absolute inset-5 -rotate-3 rounded-[2.3rem] border border-white/10 bg-[#071329] p-6 shadow-2xl sm:p-8">
            <div className="flex items-center justify-between text-[10px] uppercase tracking-[.28em] text-slate-600">
              <span>Y-note / 01</span>
              <span className="flex items-center gap-2">
                <i className="h-1.5 w-1.5 rounded-full bg-cyan-300" /> Live idea
              </span>
            </div>
            <div className="mt-24 font-display text-4xl leading-[.95] tracking-[-.05em] sm:text-5xl">
              The future
              <br />
              <span className="text-[#82aaff]">is connected.</span>
            </div>
            <div className="mt-20 space-y-3">
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
      tone: "work-blue",
    },
    {
      number: "02",
      label: "Applied AI",
      title: "Tools that meet you at the edge of your ability.",
      copy: "Adaptive systems that make complex work feel less like friction and more like flow.",
      tone: "work-violet",
    },
    {
      number: "03",
      label: "Digital futures",
      title: "Interfaces for the things we have not named yet.",
      copy: "Experiments across language, learning, and the next generation of digital life.",
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
                <div className="flex justify-start lg:justify-end">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 transition group-hover:bg-white group-hover:text-[#071226]">
                    <ArrowUpRight size={18} />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function News() {
  return (
    <section
      id="journal"
      className="border-t border-white/10 px-5 py-28 sm:px-8 sm:py-40"
    >
      <div className="mx-auto max-w-[1400px]">
        <Heading
          eyebrow="05 / Journal"
          title={
            <>
              Signals from
              <br />
              <span className="text-gradient">the studio.</span>
            </>
          }
        />
        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          <NewsCard
            date="Coming soon / 01"
            title="Y-note: the first doorway into a larger world of knowledge."
            copy="We are preparing the first public signal from our technology studio — a new kind of environment for ideas, context, and discovery."
            featured
          />
          <NewsCard
            date="The long horizon / 02"
            title="Why we are building our own intelligence layer."
            copy="The most important technology should not be rented from the future. We are exploring what it means to build with intention."
          />
          <NewsCard
            date="Studio notes / 03"
            title="The quiet revolution is already underway."
            copy="A field note on designing AI systems that feel less like machines and more like extensions of human thought."
          />
        </div>
      </div>
    </section>
  );
}

function JournalFeature() {
  return (
    <section className="journal-feature px-5 pb-28 sm:px-8 sm:pb-40">
      <div className="mx-auto max-w-[1400px]">
        <div className="eyebrow">Two ideas we are following</div>
        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          <article className="feature-article">
            <div className="flex items-center justify-between text-xs uppercase tracking-[.2em] text-[#82aaff]">
              <span>Field note / 01</span>
              <BrainCircuit size={18} />
            </div>
            <h2 className="mt-20 max-w-lg font-display text-3xl leading-tight tracking-[-.04em] sm:text-5xl">
              The next generation of software will understand the space between
              your words.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-8 text-slate-400">
              Interfaces are moving from commands to context. At YouAses, we are
              exploring how AI can recognize intent, protect attention, and make
              the right next step feel obvious.
            </p>
          </article>
          <article className="feature-article feature-article-alt">
            <div className="flex items-center justify-between text-xs uppercase tracking-[.2em] text-cyan-200">
              <span>Studio letter / 02</span>
              <Rocket size={18} />
            </div>
            <h2 className="mt-20 max-w-lg font-display text-3xl leading-tight tracking-[-.04em] sm:text-5xl">
              We are building a doorway to knowledge, not another place to store
              it.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-8 text-slate-300/70">
              Y-note is being shaped around a simple belief: the most valuable
              ideas are not isolated. They are connected, evolving, and waiting
              for the right system to bring them into focus.
            </p>
          </article>
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
}: {
  date: string;
  title: string;
  copy: string;
  featured?: boolean;
}) {
  return (
    <article className={`reveal news-card ${featured ? "news-featured" : ""}`}>
      <div className="flex items-center justify-between text-[10px] uppercase tracking-[.2em] text-[#82aaff]">
        <span>{date}</span>
        <ChevronRight size={16} />
      </div>
      <h3 className="mt-16 font-display text-2xl leading-[1.1] tracking-[-.03em]">
        {title}
      </h3>
      <p className="mt-5 text-sm leading-7 text-slate-500">{copy}</p>
      <div className="mt-9 flex items-center gap-2 text-xs font-semibold text-slate-300">
        Read the signal <ArrowUpRight size={14} />
      </div>
    </article>
  );
}

function Invitation() {
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
            <h2 className="mt-5 max-w-4xl font-display text-5xl font-medium leading-[.92] tracking-[-.06em] sm:text-8xl">
              The next chapter
              <br />
              <span className="text-gradient">is being written.</span>
            </h2>
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
  return (
    <footer className="border-t border-white/10 px-5 py-9 sm:px-8">
      <div className="mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-7 text-xs text-slate-500 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <img src={logo} alt="" className="h-7 w-7 rounded-lg" />
          <span className="font-display font-semibold text-slate-300">
            YouAses
          </span>
          <span className="hidden text-slate-700 sm:inline">
            / Because you are Aces.
          </span>
        </div>
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
