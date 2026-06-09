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
        setScrolled(window.scrollY > 16);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      {/* Trust strip */}
      <div className="hidden md:block bg-navy text-white/70 text-[11px] border-b border-white/[0.06]">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 h-8 flex items-center justify-between">
          <span className="inline-flex items-center gap-2">
            <span className="h-1 w-1 rounded-full bg-emerald" />
            ORIAS n°25 002 890 · Supervisé par l'ACPR
          </span>
          <div className="flex items-center gap-5">
            <span className="hidden lg:inline text-white/55">4.8/5 Trustpilot</span>
            <a href="tel:+33187663942" className="hover:text-white transition-colors tabular-nums">
              01 87 66 39 42
            </a>
            <span className="text-white/45">Lun – Sam · 8h30 – 20h30</span>
          </div>
        </div>
      </div>

      <header
        className={`sticky top-0 z-50 transition-all duration-500 ease-out ${
          scrolled
            ? "bg-surface/88 backdrop-blur-xl border-b border-border/80 shadow-[0_8px_32px_-20px_rgba(11,22,35,0.18)]"
            : "bg-surface/55 backdrop-blur-md border-b border-transparent"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-5 lg:px-8">
          <div
            className={`flex items-center justify-between gap-3 transition-[height] duration-500 ease-out ${
              scrolled ? "h-[58px] lg:h-[62px]" : "h-[58px] lg:h-[72px]"
            }`}
          >
            <Link to="/" onClick={close} className="flex items-center gap-3 group min-w-0">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-navy text-white transition-transform duration-300 group-hover:scale-[1.03] flex-shrink-0">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 3l8 3v6c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V6l8-3z" />
                </svg>
              </span>
              <div className="leading-none min-w-0">
                <div className="font-display text-[1.35rem] font-semibold truncate text-foreground tracking-[-0.02em]">
                  Integra
                </div>
                <div className="hidden sm:block text-[10px] uppercase tracking-[0.2em] text-muted-foreground mt-0.5">
                  Courtier indépendant
                </div>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center gap-0.5">
              <NavLink href="/">Accueil</NavLink>
              <div
                className="relative"
                onMouseEnter={() => setShowServices(true)}
                onMouseLeave={() => setShowServices(false)}
              >
                <button
                  className={`px-3.5 py-2 text-sm inline-flex items-center gap-1 rounded-lg transition-colors ${
                    showServices ? "text-foreground bg-muted/80" : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                  }`}
                  aria-expanded={showServices}
                >
                  Assurances
                  <ChevronDown className={`h-3.5 w-3.5 opacity-50 transition-transform duration-300 ${showServices ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {showServices && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute left-1/2 top-full -translate-x-1/2 pt-3 w-[760px]"
                    >
                      <div className="rounded-2xl border border-border/80 bg-surface/98 backdrop-blur-xl shadow-elev p-3 grid grid-cols-[1fr_200px] gap-3">
                        <div className="grid grid-cols-2 gap-0.5">
                          {services.map(({ icon: Icon, title, desc, href }, i) => (
                            <motion.a
                              key={title}
                              href={href}
                              initial={{ opacity: 0, y: 4 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.02 + i * 0.02, duration: 0.22 }}
                              className="group/item flex items-start gap-3 p-3 rounded-xl hover:bg-muted/70 transition-colors"
                            >
                              <span className="grid h-9 w-9 place-items-center rounded-lg bg-emerald/10 text-emerald flex-shrink-0">
                                <Icon className="h-4 w-4" strokeWidth={1.8} />
                              </span>
                              <div className="min-w-0">
                                <div className="text-sm font-semibold flex items-center gap-1">
                                  {title}
                                  <ArrowRight className="h-3 w-3 opacity-0 -translate-x-1 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all text-emerald" />
                                </div>
                                <div className="text-xs text-muted-foreground mt-0.5">{desc}</div>
                              </div>
                            </motion.a>
                          ))}
                        </div>
                        <motion.a
                          href="#devis"
                          initial={{ opacity: 0, x: 6 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1, duration: 0.25 }}
                          className="relative overflow-hidden rounded-xl bg-navy text-white p-4 flex flex-col justify-between group/cta"
                        >
                          <div>
                            <div className="text-[10px] uppercase tracking-[0.18em] text-white/55">Gratuit</div>
                            <div className="mt-2 font-display text-xl leading-tight italic">Devis en 2 min</div>
                            <p className="mt-2 text-[12px] text-white/65 leading-snug">40+ assureurs comparés pour vous.</p>
                          </div>
                          <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-emerald">
                            Commencer
                            <ArrowRight className="h-4 w-4 transition-transform group-hover/cta:translate-x-0.5" />
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

            <div className="hidden lg:flex items-center gap-2.5">
              <Link
                to="/espace-client"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground px-3 py-2 rounded-lg hover:bg-muted/60 transition-colors"
              >
                <UserRound className="h-4 w-4" />
                Espace client
              </Link>
              <a
                href="tel:+33187663942"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground px-3 py-2 rounded-lg hover:bg-muted/60 transition-colors tabular-nums"
              >
                <Phone className="h-4 w-4 text-emerald" />
                01 87 66 39 42
              </a>
              <a
                href="#devis"
                data-magnetic="true"
                className="inline-flex items-center gap-1.5 rounded-full bg-emerald px-5 py-2.5 text-sm font-semibold text-white shadow-soft hover:shadow-premium hover:-translate-y-0.5 transition-all"
              >
                Devis gratuit
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>

            <div className="flex items-center gap-2 lg:hidden">
              <a
                href="tel:+33187663942"
                aria-label="Appeler"
                className="grid h-10 w-10 place-items-center rounded-full border border-border bg-surface text-foreground active:scale-95 transition"
              >
                <Phone className="h-4 w-4 text-emerald" />
              </a>
              <button
                aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
                aria-expanded={open}
                onClick={() => setOpen((v) => !v)}
                className="h-10 w-10 grid place-items-center rounded-full border border-border bg-surface text-foreground active:scale-95 transition relative"
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

      {/* Mobile drawer — unchanged structure, updated colors */}
      <div
        className={`lg:hidden fixed inset-0 z-[60] transition-all duration-300 ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div className="absolute inset-0 bg-navy/30 backdrop-blur-sm" onClick={close} />
        <div
          className={`absolute right-0 top-0 h-full w-full sm:max-w-[400px] bg-surface border-l border-border shadow-elev flex flex-col transition-transform duration-[450ms] ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
          style={{ transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)" }}
        >
          <div className="flex items-center justify-between px-5 h-[58px] border-b border-border">
            <span className="font-display text-lg">Menu</span>
            <button aria-label="Fermer" onClick={close} className="h-10 w-10 grid place-items-center rounded-full border border-border">
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
                  style={{ transitionDelay: open ? `${80 + i * 50}ms` : "0ms" }}
                  className={`group flex items-center justify-between py-4 border-b border-border/60 text-[16px] font-medium transition-all duration-500 ${
                    open ? "opacity-100 translate-x-0" : "opacity-0 translate-x-3"
                  }`}
                >
                  {l.label}
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-emerald transition-all" />
                </a>
              ))}

              <button
                onClick={() => setMobileServicesOpen((v) => !v)}
                aria-expanded={mobileServicesOpen}
                className="flex items-center justify-between py-4 border-b border-border/60 text-[16px] font-medium"
              >
                Nos assurances
                <ChevronDown className={`h-4 w-4 transition-transform ${mobileServicesOpen ? "rotate-180 text-emerald" : "text-muted-foreground"}`} />
              </button>
              <div className={`grid transition-all ${mobileServicesOpen ? "grid-rows-[1fr] opacity-100 py-3" : "grid-rows-[0fr] opacity-0"}`}>
                <div className="overflow-hidden">
                  <div className="grid grid-cols-2 gap-2">
                    {services.map(({ icon: Icon, title, desc, href }) => (
                      <a key={title} href={href} onClick={close} className="flex flex-col gap-2 p-3 rounded-xl border border-border bg-background hover:border-emerald/30 transition-all">
                        <span className="grid h-8 w-8 place-items-center rounded-lg bg-emerald/10 text-emerald">
                          <Icon className="h-4 w-4" />
                        </span>
                        <div>
                          <div className="text-sm font-semibold">{title}</div>
                          <div className="text-[11px] text-muted-foreground mt-0.5">{desc}</div>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </nav>
          </div>

          <div className="border-t border-border p-4 pb-[max(1rem,env(safe-area-inset-bottom))] flex flex-col gap-2">
            <Link to="/espace-client" onClick={close} className="flex items-center justify-center gap-2 rounded-xl border border-border py-3.5 text-sm font-medium">
              <UserRound className="h-4 w-4 text-emerald" />
              Mon espace client
            </Link>
            <a href="#devis" onClick={close} className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald text-white py-3.5 text-sm font-semibold shadow-soft">
              Devis gratuit · 2 min
              <ArrowRight className="h-4 w-4" />
            </a>
            <div className="grid grid-cols-2 gap-2">
              <a href="tel:+33187663942" className="inline-flex items-center justify-center gap-2 rounded-full border border-border py-3 text-sm font-medium">
                <Phone className="h-4 w-4 text-emerald" />
                Appeler
              </a>
              <a href="https://wa.me/33755533466" className="inline-flex items-center justify-center gap-2 rounded-full border border-border py-3 text-sm font-medium">
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
      className={`lg:hidden fixed left-3 right-3 bottom-3 z-30 transition-all duration-500 ${
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6 pointer-events-none"
      }`}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="relative flex items-center gap-2 rounded-full bg-surface/95 backdrop-blur-xl border border-border shadow-elev p-1.5">
        <a
          href="tel:+33187663942"
          className="inline-flex items-center gap-1.5 rounded-full bg-muted text-foreground h-11 px-3.5 flex-shrink-0 border border-border/60"
        >
          <Phone className="h-4 w-4 text-emerald" />
          <span className="text-[12px] font-medium">Appeler</span>
        </a>
        <a
          href="#devis"
          className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-emerald text-white h-11 text-sm font-semibold shadow-soft"
        >
          Devis · 2 min
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="px-3.5 py-2 text-sm text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted/60 transition-colors"
    >
      {children}
    </a>
  );
}
