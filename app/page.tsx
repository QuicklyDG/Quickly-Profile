"use client";
import { useState, useEffect, useRef } from "react";
import Particles from "./_components/particles";

const skills = [
  { name: "React / Next.js", icon: "⚛️", level: 95 },
  { name: "Tailwind CSS",     icon: "🎨", level: 92 },
  { name: "Laravel",              icon: "🌿", level: 72 },
];

const projects = [
  {
    title: "StreamFlow",
    description:
      "Real-time collaborative workspace with live cursors, shared whiteboards, and video conferencing built on WebSockets and WebRTC.",
    tags: ["Next.js", "WebSockets", "WebRTC", "Redis"],
    gradient: "from-violet-600 to-indigo-600",
    link: "#",
    demo: "#",
  },
  {
    title: "CartIQ",
    description:
      "AI-powered e-commerce platform with personalised recommendations, dynamic pricing engine, and sub-100 ms checkout.",
    tags: ["React", "Node.js", "PostgreSQL", "Stripe"],
    gradient: "from-pink-600 to-rose-600",
    link: "#",
    demo: "#",
  },
  {
    title: "PulseMetrics",
    description:
      "Full-stack analytics dashboard ingesting millions of events per day with live charts, custom funnels, and export pipelines.",
    tags: ["TypeScript", "ClickHouse", "D3.js", "AWS"],
    gradient: "from-orange-500 to-amber-500",
    link: "#",
    demo: "#",
  },
  {
    title: "DevDock",
    description:
      "CLI + web UI for spinning up reproducible dev environments via Docker Compose profiles, with one-command setup.",
    tags: ["Docker", "Go", "React", "SQLite"],
    gradient: "from-teal-500 to-cyan-600",
    link: "#",
    demo: "#",
  },
];

const navLinks = ["About", "Skills", "Projects", "Contact"];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function SkillBar({ name, icon, level, delay }: { name: string; icon: string; level: number; delay: number }) {
  const { ref, visible } = useInView();
  return (
    <div ref={ref} className={`opacity-0-init ${visible ? "animate-fade-in-up" : ""}`} style={{ animationDelay: `${delay}ms` }}>
      <div className="flex justify-between mb-1 text-sm font-medium">
        <span className="flex items-center gap-2">{icon} {name}</span>
        <span className="text-indigo-400">{level}%</span>
      </div>
      <div className="h-2 rounded-full bg-zinc-800 overflow-hidden">
        <div
          className="h-full rounded-full gradient-bg transition-all duration-1000 ease-out"
          style={{ width: visible ? `${level}%` : "0%" }}
        />
      </div>
    </div>
  );
}

function ProjectCard({ project, delay }: { project: typeof projects[0]; delay: number }) {
  const { ref, visible } = useInView();
  return (
    <div
      ref={ref}
      className={`glass rounded-2xl overflow-hidden card-hover opacity-0-init ${visible ? "animate-scale-in" : ""}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className={`h-2 bg-linear-to-r ${project.gradient}`} />
      <div className="p-6 flex flex-col gap-4">
        <h3 className="text-xl font-bold text-white">{project.title}</h3>
        <p className="text-zinc-400 text-sm leading-relaxed">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <span key={t} className="px-2 py-0.5 rounded-full text-xs font-medium bg-zinc-800 text-zinc-300 border border-zinc-700">
              {t}
            </span>
          ))}
        </div>
        <div className="flex gap-3 pt-1">
          <a href={project.link} className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors font-medium flex items-center gap-1">
            GitHub →
          </a>
          <a href={project.demo} className="text-sm text-pink-400 hover:text-pink-300 transition-colors font-medium flex items-center gap-1">
            Live Demo →
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [formSent, setFormSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans">
      <div className="fixed inset-0 z-0">
        <Particles
          className="w-full h-full"
          particleCount={300}
          particleSpread={12}
          speed={0.08}
          particleBaseSize={400}
          sizeRandomness={1.2}
          alphaParticles
          moveParticlesOnHover
          particleHoverFactor={0.5}
          particleColors={["#818cf8", "#a78bfa", "#f472b6", "#38bdf8", "#ffffff"]}
        />
      </div>
      <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "glass shadow-lg" : "bg-transparent"}`}>
        <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="text-xl font-bold gradient-text">Quickly.dev</span>

          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((l) => (
              <li key={l}>
                <a
                  href={`#${l.toLowerCase()}`}
                  className="text-sm font-medium text-zinc-400 hover:text-white transition-colors"
                >
                  {l}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#contact"
                className="px-4 py-2 rounded-full text-sm font-semibold gradient-bg text-white hover:opacity-90 transition-opacity"
              >
                Hire Me
              </a>
            </li>
          </ul>

          <button
            className="md:hidden flex flex-col gap-1.5 p-1"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`block h-0.5 w-6 bg-zinc-300 transition-transform duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block h-0.5 w-6 bg-zinc-300 transition-opacity duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-6 bg-zinc-300 transition-transform duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </nav>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden glass border-t border-zinc-800 px-6 py-4 flex flex-col gap-4">
            {navLinks.map((l) => (
              <a
                key={l}
                href={`#${l.toLowerCase()}`}
                onClick={() => setMenuOpen(false)}
                className="text-sm font-medium text-zinc-300 hover:text-white transition-colors"
              >
                {l}
              </a>
            ))}
          </div>
        )}
      </header>

      <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6">
        {/* Background glow blobs */}
        <div className="absolute -top-32 -left-32 w-150 h-150 rounded-full bg-indigo-600/20 blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-125 h-125 rounded-full bg-pink-600/20 blur-[120px] pointer-events-none" />

        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <p className="animate-fade-in-up delay-100 opacity-0-init inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/40 bg-indigo-500/10 text-indigo-300 text-sm font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" /> Available for work
          </p>

          <h1 className="animate-fade-in-up delay-200 opacity-0-init text-5xl sm:text-7xl font-extrabold tracking-tight leading-tight mb-6">
            Hi, I&apos;m{" "}
            <span className="gradient-text">Quickly</span>
            <br />
            Full-Stack Developer
          </h1>

          <p className="animate-fade-in-up delay-300 opacity-0-init text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed mb-10">
            I design and build fast, beautiful, and scalable digital products — from pixel-perfect UIs to rock-solid APIs.
          </p>

          <div className="animate-fade-in-up delay-400 opacity-0-init flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#projects"
              className="px-8 py-3.5 rounded-full font-semibold gradient-bg text-white hover:opacity-90 transition-opacity shadow-lg shadow-indigo-500/30"
            >
              View My Work
            </a>
            <a
              href="#contact"
              className="px-8 py-3.5 rounded-full font-semibold border border-zinc-700 text-zinc-300 hover:border-indigo-500 hover:text-white transition-all"
            >
              Get In Touch
            </a>
          </div>

          {/* Social icons row */}
          <div className="animate-fade-in delay-800 opacity-0-init flex items-center justify-center gap-6 mt-14">
            {[
              { label: "GitHub",   href: "#", icon: "⌥" },
              { label: "LinkedIn", href: "#", icon: "in" },
              { label: "Twitter",  href: "#", icon: "𝕏" },
            ].map(({ label, href, icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="w-10 h-10 rounded-full glass flex items-center justify-center text-zinc-400 hover:text-white hover:border-indigo-500 transition-all text-sm font-bold"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-zinc-500 text-xs animate-float">
          <span>Scroll</span>
          <span className="text-base">↓</span>
        </div>
      </section>

      <section id="about" className="py-24 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          {/* Avatar placeholder */}
          <div className="flex justify-center animate-float">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80">
              <div className="absolute inset-0 rounded-3xl gradient-bg opacity-20 blur-xl" />
              <div className="relative w-full h-full rounded-3xl glass flex items-center justify-center text-8xl border border-zinc-700">
                👨‍💻
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <h2 className="text-4xl font-bold">
              About <span className="gradient-text">Me</span>
            </h2>
            <p className="text-zinc-400 leading-relaxed">
              I&apos;m a passionate full-stack developer with 5+ years of experience turning ideas into polished digital experiences. I thrive in the intersection of great design and pragmatic engineering.
            </p>
            <p className="text-zinc-400 leading-relaxed">
              When I&apos;m not coding, you&apos;ll find me contributing to open-source, writing technical articles, or exploring new frameworks. I care deeply about performance, accessibility, and developer experience.
            </p>
            <div className="grid grid-cols-2 gap-4 mt-2">
              {[
                { value: "50+", label: "Projects Shipped" },
                { value: "5+",  label: "Years Experience" },
                { value: "20+", label: "Happy Clients" },
                { value: "12K", label: "GitHub Stars" },
              ].map(({ value, label }) => (
                <div key={label} className="glass rounded-xl p-4 text-center border border-zinc-800">
                  <div className="text-2xl font-bold gradient-text">{value}</div>
                  <div className="text-xs text-zinc-500 mt-1">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="skills" className="py-24 px-6 bg-zinc-900/40">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold mb-3">
              My <span className="gradient-text">Skills</span>
            </h2>
            <p className="text-zinc-400">Technologies I work with on a daily basis</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-8">
            {skills.map((s, i) => (
              <SkillBar key={s.name} {...s} delay={i * 80} />
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold mb-3">
              Featured <span className="gradient-text">Projects</span>
            </h2>
            <p className="text-zinc-400">A selection of things I&apos;ve built recently</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {projects.map((p, i) => (
              <ProjectCard key={p.title} project={p} delay={i * 100} />
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-24 px-6 bg-zinc-900/40">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-3">
            Let&apos;s <span className="gradient-text">Connect</span>
          </h2>
          <p className="text-zinc-400 mb-10">Have a project in mind or just want to say hi? My inbox is always open.</p>

          {formSent ? (
            <div className="glass rounded-2xl p-10 border border-green-500/30 text-green-400 text-lg font-medium animate-scale-in">
              ✅ Message sent! I&apos;ll get back to you soon.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 flex flex-col gap-5 text-left border border-zinc-800">
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm text-zinc-400 font-medium">Name</label>
                  <input
                    required
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2.5 text-sm text-white outline-none focus:border-indigo-500 transition-colors"
                    placeholder="Jane Doe"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm text-zinc-400 font-medium">Email</label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2.5 text-sm text-white outline-none focus:border-indigo-500 transition-colors"
                    placeholder="jane@example.com"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm text-zinc-400 font-medium">Message</label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2.5 text-sm text-white outline-none focus:border-indigo-500 transition-colors resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>
              <button
                type="submit"
                className="self-center px-10 py-3 rounded-full font-semibold gradient-bg text-white hover:opacity-90 transition-opacity shadow-lg shadow-indigo-500/30"
              >
                Send Message →
              </button>
            </form>
          )}
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────── */}
      <footer className="py-8 px-6 border-t border-zinc-800 text-center text-zinc-500 text-sm">
        <p>© {new Date().getFullYear()} Alex Dev. Built with Next.js &amp; Tailwind CSS.</p>
      </footer>
    </div>
  );
}

