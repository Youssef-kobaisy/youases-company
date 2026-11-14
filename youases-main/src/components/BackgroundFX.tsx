export function BackgroundFX() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* base gradient */}
      <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
      {/* grid */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(oklch(0.7 0.18 250 / 0.35) 1px, transparent 1px), linear-gradient(90deg, oklch(0.7 0.18 250 / 0.35) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      />
      {/* aurora orbs */}
      <div className="absolute top-[10%] -left-32 h-[460px] w-[460px] rounded-full bg-primary/25 blur-[130px] animate-aurora" />
      <div className="absolute top-[40%] left-[40%] h-[380px] w-[380px] rounded-full bg-accent/20 blur-[150px] animate-aurora" style={{ animationDelay: "-5s" }} />
      <div className="absolute bottom-0 -right-32 h-[500px] w-[500px] rounded-full bg-accent/25 blur-[140px] animate-aurora" style={{ animationDelay: "-9s" }} />
      {/* film grain */}
      <div className="noise" />
      {/* particles */}
      {Array.from({ length: 26 }).map((_, i) => (
        <span
          key={i}
          className="absolute block rounded-full bg-primary/60"
          style={{
            width: 1 + (i % 3),
            height: 1 + (i % 3),
            top: `${(i * 37) % 100}%`,
            left: `${(i * 53) % 100}%`,
            boxShadow: "0 0 8px oklch(0.75 0.2 250 / 0.9)",
            animation: `float ${6 + (i % 5)}s ease-in-out ${i * 0.3}s infinite`,
          }}
        />
      ))}
    </div>
  );
}