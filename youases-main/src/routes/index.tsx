import { useState } from "react";
import {
  ArrowUpRight,
  BrainCircuit,
  Check,
  ChevronDown,
  Facebook,
  Globe2,
  Instagram,
  Layers3,
  Linkedin,
  Mail,
  Menu,
  MoveUpRight,
  Orbit,
  Rocket,
  ShieldCheck,
  Sparkles,
  X,
  Zap,
} from "lucide-react";
import logo from "@/assets/youases-logo.png";
import { useReveal } from "@/hooks/use-reveal";

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
  useReveal();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/10 bg-[#071226]/75 px-4 py-3 shadow-2xl shadow-black/20 backdrop-blur-xl sm:px-5">
          <a
            href="#home"
            className="flex items-center gap-3"
            aria-label="YouAses home"
          >
            <img
              src={logo}
              alt=""
              className="h-9 w-9 rounded-xl object-cover shadow-[0_0_24px_rgba(87,151,255,.35)]"
            />
            <span className="font-display text-lg font-bold tracking-tight">
              You<span className="text-primary">Ases</span>
            </span>
          </a>
          <nav className="hidden items-center gap-8 md:flex">
            {["About", "Products", "Approach", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm text-slate-400 transition hover:text-white"
              >
                {item}
              </a>
            ))}
          </nav>
          <a
            href="#products"
            className="hidden items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#071226] transition hover:bg-primary hover:text-white sm:inline-flex"
          >
            Explore Y-note <ArrowUpRight size={15} />
          </a>
          <button
            className="rounded-full p-2 text-slate-200 md:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
        {menuOpen && (
          <nav className="mx-1 mt-2 flex flex-col gap-1 rounded-3xl border border-white/10 bg-[#071226]/95 p-3 backdrop-blur-xl md:hidden">
            {["About", "Products", "Approach", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setMenuOpen(false)}
                className="rounded-2xl px-4 py-3 text-sm text-slate-300 hover:bg-white/5"
              >
                {item}
              </a>
            ))}
          </nav>
        )}
      </header>

      <main>
        <Hero />
        <Marquee />
        <About />
        <Products />
        <Approach />
        <Waitlist />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

function Hero() {
  return (
    <section
      id="home"
      className="relative isolate flex min-h-[760px] items-center overflow-hidden px-5 pb-24 pt-40 sm:px-8"
    >
      <div className="hero-grid absolute inset-0 -z-10" />
      <div className="absolute left-[8%] top-32 -z-10 h-72 w-72 rounded-full bg-primary/20 blur-[120px]" />
      <div className="absolute bottom-0 right-[4%] -z-10 h-96 w-96 rounded-full bg-cyan-400/10 blur-[130px]" />
      <div className="mx-auto grid w-full max-w-7xl items-center gap-16 lg:grid-cols-[1.05fr_.95fr]">
        <div>
          <div className="reveal inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-4 py-2 text-xs font-medium uppercase tracking-[.2em] text-blue-200">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-300" />{" "}
            Independent technology company
          </div>
          <h1 className="reveal mt-7 max-w-4xl font-display text-5xl font-semibold leading-[.98] tracking-[-.055em] sm:text-7xl lg:text-[6.6rem]">
            The next leap
            <span className="block text-gradient">starts with you.</span>
          </h1>
          <p className="reveal mt-7 max-w-xl text-base leading-8 text-slate-400 sm:text-lg">
            YouAses builds intelligent products and digital experiences that
            turn ambitious ideas into useful, beautiful momentum.
          </p>
          <div className="reveal mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#products"
              className="group inline-flex items-center gap-3 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-white shadow-[0_0_35px_rgba(76,139,255,.3)] transition hover:-translate-y-0.5 hover:bg-blue-400"
            >
              Discover what&apos;s next{" "}
              <MoveUpRight
                size={17}
                className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
            <a
              href="#about"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3.5 text-sm font-semibold text-slate-200 transition hover:border-primary/50 hover:bg-white/5"
            >
              Our point of view <ChevronDown size={16} />
            </a>
          </div>
          <div className="reveal mt-14 flex items-center gap-5 text-xs text-slate-500">
            <div className="flex -space-x-2">
              {[Sparkles, Orbit, Zap].map((Icon, index) => (
                <span
                  key={index}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-[#071226] bg-[#122a51] text-primary"
                >
                  <Icon size={14} />
                </span>
              ))}
            </div>
            <span>Ideas engineered for the real world</span>
          </div>
        </div>
        <div className="reveal relative mx-auto w-full max-w-[500px]">
          <div className="hero-orbit absolute inset-4 rounded-full border border-primary/20" />
          <div className="hero-orbit hero-orbit-reverse absolute inset-14 rounded-full border border-cyan-300/15" />
          <div className="relative mx-auto aspect-square w-[82%] rounded-[36%] border border-white/10 bg-gradient-to-br from-[#143668] via-[#0e2345] to-[#071226] p-5 shadow-[0_30px_100px_rgba(0,0,0,.4)] rotate-6">
            <div className="flex h-full flex-col justify-between rounded-[30%] border border-white/10 bg-[#09182f]/90 p-7 -rotate-6">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-[.25em] text-blue-200/70">
                  YouAses / 01
                </span>
                <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_15px_#67e8f9]" />
              </div>
              <div className="relative flex items-center justify-center">
                <div className="absolute h-44 w-44 rounded-full bg-primary/30 blur-3xl" />
                <img
                  src={logo}
                  alt="YouAses symbol"
                  className="relative w-44 rounded-[28%] shadow-[0_0_60px_rgba(80,145,255,.45)]"
                />
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <div className="font-display text-2xl font-semibold">
                    YouAses
                  </div>
                  <div className="mt-1 text-xs text-slate-500">
                    Because you are Aces.
                  </div>
                </div>
                <Globe2 className="text-primary/70" size={25} />
              </div>
            </div>
          </div>
          <div className="absolute -bottom-5 -left-3 rounded-2xl border border-white/10 bg-[#0b1c38]/90 px-4 py-3 shadow-xl backdrop-blur-md">
            <div className="text-[10px] uppercase tracking-[.2em] text-slate-500">
              Signal detected
            </div>
            <div className="mt-1 flex items-center gap-2 text-sm font-medium">
              <span className="h-2 w-2 rounded-full bg-emerald-400" /> Building
              the future
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  return (
    <div className="border-y border-white/10 bg-white/[.025] py-5">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-3 px-5 text-[10px] uppercase tracking-[.3em] text-slate-500 sm:justify-between sm:px-8">
        <span>Intelligence</span>
        <span className="text-primary">✦</span>
        <span>Product design</span>
        <span className="text-primary">✦</span>
        <span>Human potential</span>
        <span className="text-primary">✦</span>
        <span>Tomorrow, deliberately</span>
      </div>
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  copy,
}: {
  eyebrow: string;
  title: React.ReactNode;
  copy?: string;
}) {
  return (
    <div className="reveal max-w-2xl">
      <div className="text-xs font-medium uppercase tracking-[.25em] text-primary">
        {eyebrow}
      </div>
      <h2 className="mt-4 font-display text-4xl font-semibold leading-[1.05] tracking-[-.04em] sm:text-6xl">
        {title}
      </h2>
      {copy && (
        <p className="mt-5 text-base leading-8 text-slate-400">{copy}</p>
      )}
    </div>
  );
}

function About() {
  const principles = [
    {
      icon: BrainCircuit,
      title: "Think deeper",
      text: "We look beyond the obvious to find the signal that moves people forward.",
    },
    {
      icon: Layers3,
      title: "Make it useful",
      text: "Great technology earns its place by making everyday life feel more possible.",
    },
    {
      icon: ShieldCheck,
      title: "Build with care",
      text: "Trust, privacy, and craft are not features. They are the foundation.",
    },
  ];
  return (
    <section id="about" className="px-5 py-28 sm:px-8 sm:py-36">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-14 lg:grid-cols-[.8fr_1.2fr] lg:gap-28">
          <SectionHeading
            eyebrow="01 / The company"
            title={
              <>
                Small team.
                <br />
                <span className="text-gradient">Big signal.</span>
              </>
            }
          />
          <div>
            <p className="reveal text-xl leading-9 text-slate-200 sm:text-2xl">
              YouAses is a technology company for the curious, the bold, and the
              people who see a better way before it exists.
            </p>
            <p className="reveal mt-6 max-w-2xl text-base leading-8 text-slate-400">
              We combine product thinking, intelligent systems, and expressive
              design to create tools that help people learn, work, and imagine
              further. No noise. Just meaningful progress.
            </p>
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {principles.map(({ icon: Icon, title, text }) => (
                <div
                  key={title}
                  className="reveal rounded-3xl border border-white/10 bg-white/[.03] p-5 transition hover:-translate-y-1 hover:border-primary/40"
                >
                  <Icon className="text-primary" size={21} />
                  <h3 className="mt-7 font-display font-semibold">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Products() {
  return (
    <section id="products" className="relative px-5 py-28 sm:px-8 sm:py-36">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-primary/[.06] to-transparent" />
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="02 / The first signal"
          title={
            <>
              Something useful
              <br />
              <span className="text-gradient">is almost here.</span>
            </>
          }
          copy="Our first product is being shaped in the open. Built for focus, clarity, and the ideas that deserve your full attention."
        />
        <div className="reveal mt-14 overflow-hidden rounded-[2rem] border border-blue-300/20 bg-gradient-to-br from-[#102b55] via-[#0b1b38] to-[#081329] shadow-[0_30px_90px_rgba(0,0,0,.3)]">
          <div className="grid items-center gap-10 p-7 sm:p-12 lg:grid-cols-[1fr_.8fr] lg:p-16">
            <div>
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 p-2">
                  <img src={logo} alt="" className="rounded-xl" />
                </span>
                <div>
                  <span className="text-xs uppercase tracking-[.25em] text-blue-200/70">
                    YouAses presents
                  </span>
                  <h3 className="font-display text-2xl font-bold">Y-note</h3>
                </div>
              </div>
              <div className="mt-9 inline-flex items-center gap-2 rounded-full border border-cyan-200/20 bg-cyan-200/10 px-3 py-1.5 text-xs font-medium text-cyan-100">
                <Rocket size={13} /> Coming soon
              </div>
              <h3 className="mt-5 max-w-xl font-display text-4xl font-semibold tracking-[-.04em] sm:text-5xl">
                Your thoughts,
                <br />
                <span className="text-gradient">with more room to grow.</span>
              </h3>
              <p className="mt-5 max-w-lg text-base leading-8 text-slate-300/75">
                A thoughtful space for notes, ideas, and the sparks between
                them. Y-note is designed to help you capture what matters and
                return to it with a clearer mind.
              </p>
              <a
                href="#waitlist"
                className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-cyan-200"
              >
                Get launch access <ArrowUpRight size={16} />
              </a>
            </div>
            <div className="relative mx-auto w-full max-w-sm">
              <div className="absolute inset-8 rounded-full bg-cyan-300/20 blur-3xl" />
              <div className="relative rounded-[2rem] border border-white/15 bg-[#07152d]/80 p-4 shadow-2xl rotate-3">
                <div className="rounded-[1.5rem] border border-white/10 bg-[#0c1e3b] p-5">
                  <div className="flex items-center justify-between text-[10px] uppercase tracking-[.2em] text-slate-500">
                    <span>Y-note</span>
                    <span>Today</span>
                  </div>
                  <div className="mt-10 text-2xl font-semibold">
                    Make space
                    <br />
                    <span className="text-primary">for the next idea.</span>
                  </div>
                  <div className="mt-16 h-1 w-20 rounded-full bg-primary" />
                  <div className="mt-4 flex gap-2">
                    <span className="h-1.5 w-16 rounded-full bg-white/10" />
                    <span className="h-1.5 w-8 rounded-full bg-white/10" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Approach() {
  const steps = [
    "Observe the real problem",
    "Shape the simplest useful idea",
    "Build, learn, and make it matter",
  ];
  return (
    <section id="approach" className="px-5 py-28 sm:px-8 sm:py-36">
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[.9fr_1.1fr]">
        <SectionHeading
          eyebrow="03 / The approach"
          title={
            <>
              Clarity is a<br />
              <span className="text-gradient">competitive edge.</span>
            </>
          }
          copy="We work at the intersection of strategy, technology, and human behavior. Every detail has a job."
        />
        <div className="space-y-4">
          {steps.map((step, index) => (
            <div
              key={step}
              className="reveal group flex items-center gap-5 rounded-3xl border border-white/10 bg-white/[.025] p-5 transition hover:border-primary/40 hover:bg-primary/[.06] sm:p-7"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 font-display text-lg font-semibold text-primary">
                0{index + 1}
              </span>
              <span className="font-display text-lg font-medium text-slate-200 sm:text-xl">
                {step}
              </span>
              <ArrowUpRight
                className="ml-auto text-slate-600 transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-primary"
                size={19}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Waitlist() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  function submit(event: React.FormEvent) {
    event.preventDefault();
    if (!email) return;
    setStatus("loading");
    const subject = encodeURIComponent("Y-note early access");
    const body = encodeURIComponent(
      `Please add ${email} to the Y-note early access list.`,
    );
    window.location.href = `mailto:youases.official@gmail.com?subject=${subject}&body=${body}`;
    setStatus("success");
  }
  return (
    <section id="waitlist" className="px-5 py-20 sm:px-8 sm:py-28">
      <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-primary/25 bg-primary/[.08] p-8 text-center sm:p-16">
        <div className="absolute left-1/2 top-0 h-56 w-96 -translate-x-1/2 rounded-full bg-primary/20 blur-[100px]" />
        <div className="relative">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/15 text-primary">
            <Mail size={21} />
          </div>
          <h2 className="mt-6 font-display text-3xl font-semibold tracking-[-.03em] sm:text-5xl">
            Be there when it goes live.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-slate-400">
            Join the early list for Y-note updates, private previews, and launch
            access.
          </p>
          <form
            onSubmit={submit}
            className="mx-auto mt-8 flex max-w-lg flex-col gap-3 sm:flex-row"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              disabled={status === "loading" || status === "success"}
              placeholder="you@company.com"
              className="min-w-0 flex-1 rounded-full border border-white/15 bg-black/20 px-5 py-3.5 text-sm text-white outline-none placeholder:text-slate-600 focus:border-primary"
            />
            <button
              type="submit"
              disabled={status === "loading" || status === "success"}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-[#071226] transition hover:bg-cyan-200 disabled:opacity-70"
            >
              {status === "success" ? (
                <>
                  <Check size={16} /> You&apos;re on the list
                </>
              ) : status === "loading" ? (
                "Joining..."
              ) : (
                "Keep me posted"
              )}
            </button>
          </form>
          {status === "error" && (
            <p className="mt-4 text-sm text-red-300">
              We couldn&apos;t save that email. Please try again.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="px-5 py-28 sm:px-8 sm:py-36">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-10 border-t border-white/10 pt-12 sm:flex-row">
        <div>
          <div className="text-xs uppercase tracking-[.25em] text-primary">
            04 / Keep in touch
          </div>
          <h2 className="mt-4 max-w-xl font-display text-4xl font-semibold tracking-[-.04em] sm:text-5xl">
            Have a good idea?
            <br />
            <span className="text-gradient">Let&apos;s make it real.</span>
          </h2>
        </div>
        <div className="sm:text-right">
          <a
            href="mailto:youases.official@gmail.com"
            className="font-display text-lg font-medium text-white hover:text-primary"
          >
            youases.official@gmail.com
          </a>
          <div className="mt-5 flex gap-3 sm:justify-end">
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-slate-400 transition hover:border-primary/50 hover:text-primary"
              >
                <Icon size={17} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10 px-5 py-8 sm:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-xs text-slate-500 sm:flex-row">
        <div className="flex items-center gap-2">
          <img src={logo} alt="" className="h-6 w-6 rounded-lg" />
          <span className="font-display font-semibold text-slate-300">
            YouAses
          </span>
        </div>
        <span>© {new Date().getFullYear()} YouAses. Because you are Aces.</span>
        <a
          href="mailto:youases.official@gmail.com"
          className="transition hover:text-primary"
        >
          Say hello →
        </a>
      </div>
    </footer>
  );
}
