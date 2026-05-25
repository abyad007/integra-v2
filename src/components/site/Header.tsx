import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Menu, X, Phone, MessageCircle, ChevronDown, ArrowRight,
  Car, Bike, Home, HeartPulse, Shield, Briefcase, HardHat, UserRound, BadgeCheck,
} from "lucide-react";

const services = [
  { icon: Car, title: "Auto", desc: "Résiliés, malus, jeune", href: "/service/assurance-auto/" },
  { icon: Bike, title: "Moto", desc: "Scooter, 125, grosses cyl.", href: "/service/assurance-moto/" },
  { icon: Home, title: "Habitation", desc: "Locataire ou propriétaire", href: "/service/assurance-habitation/" },
  { icon: HeartPulse, title: "Santé", desc: "Mutuelle individuelle", href: "/service/assurance-sante/" },
  { icon: Shield, title: "Prévoyance", desc: "Invalidité, incapacité", href: "/service/assurance-prevoyance/" },
  { icon: Briefcase, title: "RC Pro", desc: "Indépendants & freelances", href: "/service/assurance-pro/" },
  { icon: HardHat, title: "Décennale", desc: "Artisans BTP, 48 h", href: "/service/assurance-decennale/" },
  { icon: BadgeCheck, title: "VTC", desc: "Chauffeurs & taxis pros", href: "/service/assurance-vtc/" },
];

const navLinks = [
  { label: "Accueil", href: "/" },
  { label: "Blog", href: "/blog" },
  { label: "À propos", href: "/a-propos" },
  { label: "FAQ", href: "/#faq" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [showServices, setShowServices] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 12);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile drawer open
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      {/* Trust strip — desktop only */}
      <div className="hidden md:block bg-navy text-white/75 text-[11px] border-b border-white/10">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 h-9 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald animate-pulse" />
              ORIAS n°25 002 890 · Supervisé par l'ACPR
            </span>
            <span className="hidden lg:inline opacity-80">⭐ 4.8/5 sur Trustpilot</span>
          </div>
          <div className="flex items-center gap-5">
            <a href="tel:+33187663942" className="hover:text-white transition-colors">01 87 66 39 42</a>
            <span className="opacity-80">Lun – Sam · 8h30 – 20h30</span>
          </div>
        </div>
      </div>

      <header
        className={`sticky top-0 z-50 transition-all duration-500 ease-out bg-navy text-white ${
          scrolled
            ? "shadow-[0_4px_24px_-12px_rgba(10,44,74,0.45)]"
            : ""
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-5 lg:px-8">
          <div
            className={`flex items-center justify-between gap-3 transition-[height] duration-500 ease-out ${
              scrolled ? "h-[60px] lg:h-[64px]" : "h-[60px] lg:h-[76px]"
            }`}
          >
            <Link to="/" onClick={close} className="flex items-center gap-2.5 group min-w-0">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-emerald text-emerald-foreground transition-transform duration-300 group-hover:scale-105 group-hover:rotate-[-3deg] flex-shrink-0 shadow-soft">
                <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M12 3l8 3v6c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V6l8-3z" />
                </svg>
              </span>
              <div className="leading-none min-w-0">
                <div className="font-display text-2xl font-bold truncate text-white">Integra</div>
                <div className="hidden sm:block text-[10px] uppercase tracking-[0.22em] text-white/55 mt-0.5">
                  Assurance
                </div>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center gap-1">
              <NavLink href="/">Accueil</NavLink>
              <div
                className="relative"
                onMouseEnter={() => setShowServices(true)}
                onMouseLeave={() => setShowServices(false)}
              >
                <button
                  className={`px-3 py-2 text-sm inline-flex items-center gap-1 rounded-md transition-colors ${
                    showServices ? "text-white" : "text-white/80 hover:text-white"
                  }`}
                  aria-expanded={showServices}
                >
                  Assurances
                  <ChevronDown className={`h-3.5 w-3.5 opacity-60 transition-transform duration-300 ${showServices ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {showServices && (
                    <motion.div
                      initial={{ opacity: 0, y: 6, scale: 0.985 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 4, scale: 0.99 }}
                      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute left-1/2 top-full -translate-x-1/2 pt-3 w-[780px]"
                    >
                      <div className="rounded-2xl border border-border/70 bg-surface/95 backdrop-blur-xl shadow-elev p-3 grid grid-cols-[1fr_220px] gap-3 overflow-hidden">
                        <div className="grid grid-cols-2 gap-1">
                          {services.map(({ icon: Icon, title, desc, href }, i) => (
                            <motion.a
                              key={title}
                              href={href}
                              initial={{ opacity: 0, y: 4 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.03 + i * 0.025, duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                              className="group/item flex items-start gap-3 p-3 rounded-xl hover:bg-accent transition-colors"
                            >
                              <span className="grid h-9 w-9 place-items-center rounded-lg bg-cream text-emerald flex-shrink-0 transition-transform duration-300 group-hover/item:scale-110 group-hover/item:rotate-[-4deg]">
                                <Icon className="h-4 w-4" strokeWidth={1.8} />
                              </span>
                              <div className="min-w-0">
                                <div className="text-sm font-semibold flex items-center gap-1">
                                  Assurance {title}
                                  <ArrowRight className="h-3 w-3 opacity-0 -translate-x-1 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-300 text-emerald" />
                                </div>
                                <div className="text-xs text-muted-foreground mt-0.5">{desc}</div>
                              </div>
                            </motion.a>
                          ))}
                        </div>
                        {/* Featured panel */}
                        <motion.a
                          href="#devis"
                          initial={{ opacity: 0, x: 8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.12, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                          className="relative overflow-hidden rounded-xl bg-gradient-to-br from-primary to-primary/85 text-primary-foreground p-4 flex flex-col justify-between group/cta"
                        >
                          <div className="absolute inset-0 opacity-0 group-hover/cta:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.18),transparent_60%)]" />
                          <div className="relative">
                            <div className="text-[10px] uppercase tracking-[0.2em] opacity-80">Gratuit · sans engagement</div>
                            <div className="mt-2 font-display text-xl leading-tight">Devis en 2 min</div>
                            <p className="mt-1.5 text-[12px] opacity-85 leading-snug">Un courtier compare 25+ assureurs pour vous.</p>
                          </div>
                          <div className="relative mt-3 inline-flex items-center gap-1.5 text-sm font-medium">
                            Demander
                            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/cta:translate-x-1" />
                          </div>
                        </motion.a>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <NavLink href="/blog">Blog</NavLink>
              <NavLink href="/a-propos">À propos</NavLink>
              <NavLink href="/#faq">FAQ</NavLink>
            </nav>

            <div className="hidden lg:flex items-center gap-3">
              <a
                href="tel:+33187663942"
                className="group flex items-center gap-2 text-sm text-white/85 hover:text-white transition-colors"
              >
                <span className="grid h-8 w-8 place-items-center rounded-full bg-white/10 text-white transition-transform duration-300 group-hover:scale-105 group-hover:bg-white/15">
                  <Phone className="h-3.5 w-3.5" />
                </span>
                <span className="tabular-nums">01 87 66 39 42</span>
              </a>
              <span aria-hidden className="h-6 w-px bg-white/15" />
              <Link to="/espace-client" className="group flex items-center gap-2 text-sm text-white/85 hover:text-white transition-colors pr-2">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-white/10 border border-white/15 shadow-sm transition-transform duration-300 group-hover:scale-105 group-hover:border-emerald/60">
                  <UserRound className="h-4 w-4" />
                </span>
                <span className="font-medium">Espace Client</span>
              </Link>
              <a
                href="#devis"
                className="group relative inline-flex items-center gap-1.5 rounded-full bg-emerald px-5 py-2.5 text-sm font-semibold text-emerald-foreground shadow-soft hover:shadow-premium transition-all duration-300 hover:-translate-y-0.5 overflow-hidden"
              >
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-[900ms] ease-out bg-gradient-to-r from-transparent via-white/25 to-transparent" />
                <span className="relative">Devis gratuit</span>
                <ArrowRight className="relative h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
              </a>
            </div>

            {/* Mobile actions */}
            <div className="flex items-center gap-2 lg:hidden">
              <a
                href="tel:+33187663942"
                aria-label="Appeler"
                className="grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-white/10 text-white active:scale-95 transition"
              >
                <Phone className="h-4 w-4 text-emerald" />
              </a>
              <button
                aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
                aria-expanded={open}
                onClick={() => setOpen((v) => !v)}
                className="h-10 w-10 grid place-items-center rounded-full border border-white/15 bg-white/10 text-white active:scale-95 transition relative"
              >
                <span className={`absolute transition-all duration-300 ${open ? "rotate-90 opacity-0" : "rotate-0 opacity-100"}`}>
                  <Menu className="h-5 w-5" />
                </span>
                <span className={`absolute transition-all duration-300 ${open ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"}`}>
                  <X className="h-5 w-5" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={`lg:hidden fixed inset-0 z-[60] transition-all duration-300 ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div
          className={`absolute inset-0 bg-foreground/40 backdrop-blur-md transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`}
          onClick={close}
        />
        <div
          className={`absolute right-0 top-0 h-full w-full sm:max-w-[420px] bg-background border-l border-border shadow-elev flex flex-col transition-transform duration-[450ms] ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
          style={{ transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)" }}
        >
          <div className="flex items-center justify-between px-5 h-[60px] border-b border-border">
            <span className="font-display text-xl">Menu</span>
            <button
              aria-label="Fermer"
              onClick={close}
              className="h-10 w-10 grid place-items-center rounded-full border border-border active:scale-95 transition"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-4">
            <nav className="flex flex-col">
              {navLinks.map((l, i) => (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={close}
                  style={{
                    transitionDelay: open ? `${80 + i * 50}ms` : "0ms",
                  }}
                  className={`group flex items-center justify-between py-4 border-b border-border/60 text-[17px] font-medium transition-all duration-500 ${
                    open ? "opacity-100 translate-x-0" : "opacity-0 translate-x-3"
                  }`}
                >
                  <span className="group-active:text-emerald">{l.label}</span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-emerald group-hover:translate-x-0.5 transition-all" />
                </a>
              ))}

              <button
                onClick={() => setMobileServicesOpen((v) => !v)}
                aria-expanded={mobileServicesOpen}
                style={{ transitionDelay: open ? `${80 + navLinks.length * 50}ms` : "0ms" }}
                className={`flex items-center justify-between py-4 border-b border-border/60 text-[17px] font-medium transition-all duration-500 ${
                  open ? "opacity-100 translate-x-0" : "opacity-0 translate-x-3"
                }`}
              >
                Nos assurances
                <ChevronDown
                  className={`h-4 w-4 text-muted-foreground transition-transform duration-300 ${mobileServicesOpen ? "rotate-180 text-emerald" : ""}`}
                />
              </button>
              <div className={`grid transition-all duration-400 ${mobileServicesOpen ? "grid-rows-[1fr] opacity-100 py-3" : "grid-rows-[0fr] opacity-0"}`}>
                <div className="overflow-hidden">
                  <div className="grid grid-cols-2 gap-2">
                    {services.map(({ icon: Icon, title, desc, href }) => (
                      <a
                        key={title}
                        href={href}
                        onClick={close}
                        className="flex flex-col gap-2 p-3 rounded-xl border border-border bg-surface hover:border-emerald/40 hover:shadow-soft active:bg-accent transition-all"
                      >
                        <span className="grid h-9 w-9 place-items-center rounded-lg bg-cream text-emerald">
                          <Icon className="h-4 w-4" strokeWidth={1.6} />
                        </span>
                        <div>
                          <div className="text-sm font-semibold leading-tight">{title}</div>
                          <div className="text-[11px] text-muted-foreground mt-0.5 leading-snug">{desc}</div>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </nav>

            <div className="mt-6 rounded-2xl bg-cream border border-border p-4 text-[12.5px] text-foreground/75 leading-relaxed">
              <div className="flex items-center gap-2 text-foreground font-medium">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald animate-pulse" />
                Courtier indépendant
              </div>
              <p className="mt-1.5">
                ORIAS n°25 002 890 — Supervisé par l'ACPR.<br />
                Lun – Sam · 8h30 – 20h30
              </p>
            </div>
          </div>

          <div className="border-t border-border bg-surface/95 backdrop-blur p-4 pb-[max(1rem,env(safe-area-inset-bottom))] flex flex-col gap-2">
            <Link
              to="/espace-client"
              onClick={close}
              className="flex items-center justify-center gap-2 rounded-xl border border-border bg-background py-3.5 text-sm font-medium active:scale-[0.99] transition mb-2"
            >
              <UserRound className="h-4 w-4 text-emerald" />
              Mon Espace Client
            </Link>
            <a
              href="#devis"
              onClick={close}
              className="group relative inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground py-3.5 text-sm font-medium shadow-soft active:scale-[0.99] transition overflow-hidden"
            >
              <span className="absolute inset-0 -translate-x-full group-active:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/25 to-transparent" />
              <span className="relative">Devis gratuit en 2 min</span>
              <ArrowRight className="relative h-4 w-4" />
            </a>
            <div className="grid grid-cols-2 gap-2">
              <a
                href="tel:+33187663942"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background py-3 text-sm font-medium active:scale-[0.99] transition"
              >
                <Phone className="h-4 w-4 text-emerald" />
                Appeler
              </a>
              <a
                href="https://wa.me/33755533466"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background py-3 text-sm font-medium active:scale-[0.99] transition"
              >
                <MessageCircle className="h-4 w-4 text-emerald" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>

      <MobileCtaBar />
    </>
  );
}

function MobileCtaBar() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setShow(window.scrollY > 480);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div
      className={`lg:hidden fixed left-3 right-3 bottom-3 z-30 transition-all duration-500 ease-out ${
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6 pointer-events-none"
      }`}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      {/* soft glow under bar */}
      <div
        aria-hidden="true"
        className="absolute inset-x-6 -bottom-2 h-6 blur-2xl opacity-60 rounded-full"
        style={{ background: "radial-gradient(60% 100% at 50% 50%, color-mix(in oklab, var(--emerald) 35%, transparent), transparent 70%)" }}
      />
      <div className="relative flex items-center gap-2 rounded-full bg-background/92 backdrop-blur-xl border border-border/80 shadow-elev p-1.5">
        {/* live availability indicator */}
        <div className="absolute -top-2 left-4 inline-flex items-center gap-1.5 rounded-full bg-foreground text-background px-2 py-0.5 text-[9.5px] font-medium uppercase tracking-wider shadow-soft">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald opacity-70" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald" />
          </span>
          En ligne
        </div>
        <a
          href="tel:+33187663942"
          aria-label="Appeler 01 87 66 39 42"
          className="group inline-flex items-center gap-1.5 rounded-full bg-cream text-foreground h-11 px-3.5 active:scale-95 transition flex-shrink-0 border border-border/60"
        >
          <Phone className="h-4 w-4 text-emerald" />
          <span className="text-[12.5px] font-medium">Appeler</span>
        </a>
        <a
          href="#devis"
          className="group relative flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground h-11 text-sm font-medium shadow-soft active:scale-[0.99] transition overflow-hidden"
        >
          {/* shine sweep */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -translate-x-full group-active:translate-x-full transition-transform duration-700 ease-out"
            style={{ background: "linear-gradient(115deg, transparent 35%, rgba(255,255,255,0.28) 50%, transparent 65%)" }}
          />
          <span className="relative">Devis gratuit · 2 min</span>
          <ArrowRight className="relative h-4 w-4 transition-transform duration-300 group-active:translate-x-0.5" />
        </a>
      </div>
    </div>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="px-3 py-2 text-sm text-white/80 hover:text-white rounded-md transition-colors relative after:absolute after:left-3 after:right-3 after:bottom-1.5 after:h-px after:bg-emerald after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform after:duration-300"
    >
      {children}
    </a>
  );
}
