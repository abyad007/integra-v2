import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { ShieldCheck, AlertOctagon, ArrowRight, ArrowLeft, Calculator } from "lucide-react";
import * as Slider from "@radix-ui/react-slider";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Reveal } from "@/components/site/Reveal";
import { ScrollProgress } from "@/components/site/ScrollProgress";
import { QuoteFunnel } from "@/components/site/QuoteFunnel";

export const Route = createFileRoute("/calculateur-bonus-malus")({
  head: () => ({
    meta: [
      { title: "Calculateur Bonus/Malus (CRM) | Integra Assurance" },
      { name: "description", content: "Calculez instantanément votre Coefficient de Réduction Majoration (CRM). Simulateur gratuit." },
    ],
  }),
  component: CalculatorPage,
});

function CalculatorPage() {
  const [years, setYears] = useState<number[]>([0]);
  const [accidents, setAccidents] = useState<number>(0);

  // Logique métier CRM (Coefficient Réduction Majoration)
  // CRM de base = 1.00. Chaque année sans accident = baisse de 5% (x 0.95). Min 0.50.
  // Chaque accident responsable = hausse de 25% (x 1.25). Max 3.50.
  const calculateCRM = () => {
    let crm = 1.00;
    
    // Application des années sans accident
    for (let i = 0; i < years[0]; i++) {
      crm = crm * 0.95;
    }
    
    // Application des accidents responsables
    for (let i = 0; i < accidents; i++) {
      crm = crm * 1.25;
    }

    // Limites légales du CRM
    if (crm < 0.50) crm = 0.50;
    if (crm > 3.50) crm = 3.50;

    return crm;
  };

  const currentCRM = calculateCRM();
  const isMalus = currentCRM > 1.00;
  const isBonus = currentCRM < 1.00;

  // FM10 — Smooth spring on CRM value change
  const springCRM = useSpring(currentCRM, { stiffness: 120, damping: 18, mass: 0.6 });
  const displayedCRM = useTransform(springCRM, (v) => v.toFixed(2));
  useEffect(() => {
    springCRM.set(currentCRM);
  }, [currentCRM, springCRM]);

  // Gauge progress (0 = 0.50 CRM bonus max, 1 = 3.50 CRM malus max)
  const gaugeProgress = Math.max(0, Math.min(1, (currentCRM - 0.5) / 3));

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col antialiased">
      <ScrollProgress />
      <Header />
      <main className="flex-1 py-20 lg:py-32 relative">
        <div className="absolute top-0 inset-x-0 h-[50vh] bg-gradient-to-b from-surface/60 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-grid opacity-[0.12] pointer-events-none [mask-image:radial-gradient(ellipse_55%_45%_at_50%_15%,black,transparent)]" />

        <div className="mx-auto max-w-4xl px-5 lg:px-8 relative z-10">
          <Reveal>
            <Link to="/" className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground mb-8 transition-colors">
              <ArrowLeft className="h-3.5 w-3.5" />
              Retour à l'accueil
            </Link>
          </Reveal>

          <Reveal delay={80}>
            <div className="text-center max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald/20 bg-emerald/10 px-3 py-1 text-[11px] uppercase tracking-wider font-medium text-emerald mb-6 shadow-soft">
                <Calculator className="h-3.5 w-3.5" />
                Outil gratuit · 100 % anonyme
              </div>
              <h1 className="font-display text-[clamp(2.25rem,5vw,3.75rem)] tracking-[-0.03em] leading-[1.05] text-balance mb-6">
                Calculez votre <span className="text-gradient-emerald">Bonus-Malus.</span>
              </h1>
              <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
                Le Coefficient de Réduction Majoration (CRM) impacte directement le prix de votre assurance.
                Découvrez le vôtre en quelques clics.
              </p>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div className="mt-14 bg-surface border border-border rounded-[2rem] p-6 sm:p-10 shadow-soft">
              <div className="grid md:grid-cols-2 gap-12">
                
                {/* Colonne Gauche : Contrôles */}
                <div className="space-y-10">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <label className="font-medium text-sm">Années sans accident</label>
                      <span className="font-mono text-emerald bg-emerald/10 px-2 py-0.5 rounded-md text-sm">{years[0]} an(s)</span>
                    </div>
                    <Slider.Root 
                      className="relative flex items-center select-none touch-none w-full h-5"
                      value={years} 
                      onValueChange={setYears} 
                      max={15} 
                      step={1}
                    >
                      <Slider.Track className="bg-border relative grow rounded-full h-[6px]">
                        <Slider.Range className="absolute bg-emerald rounded-full h-full" />
                      </Slider.Track>
                      <Slider.Thumb className="block w-6 h-6 bg-background border-2 border-emerald shadow-sm rounded-full hover:bg-emerald/5 focus:outline-none focus:ring-4 focus:ring-emerald/20 transition-all cursor-grab active:cursor-grabbing" />
                    </Slider.Root>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <label className="font-medium text-sm">Accidents responsables (sur les 3 dernières années)</label>
                      <span className="font-mono text-destructive bg-destructive/10 px-2 py-0.5 rounded-md text-sm">{accidents}</span>
                    </div>
                    <div className="flex gap-2">
                      {[0, 1, 2, 3, 4].map((num) => (
                        <button
                          key={num}
                          onClick={() => setAccidents(num)}
                          className={`flex-1 py-3 rounded-xl border text-sm font-medium transition-all ${
                            accidents === num ? "bg-destructive/10 border-destructive/30 text-destructive shadow-soft" : "bg-background border-border text-foreground/70 hover:bg-accent"
                          }`}
                        >
                          {num}{num === 4 ? "+" : ""}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Colonne Droite : Résultat */}
                <div className="relative overflow-hidden rounded-3xl bg-navy text-navy-foreground p-8 flex flex-col justify-center items-center text-center">
                  <div className="absolute inset-0 bg-noise opacity-20" />
                  <motion.div
                    className={`absolute inset-0 ${isMalus ? "bg-destructive" : "bg-emerald"}`}
                    style={{ filter: "blur(60px)", transform: "scale(1.2)" }}
                    animate={{ opacity: isMalus ? 0.5 : isBonus ? 0.4 : 0.25 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  />

                  <div className="relative w-full">
                    <motion.div
                      key={isMalus ? "malus" : isBonus ? "bonus" : "neutral"}
                      initial={{ scale: 0.7, opacity: 0, rotate: -8 }}
                      animate={{ scale: 1, opacity: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 220, damping: 16 }}
                      className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/10 mb-4 border border-white/20 backdrop-blur-sm"
                    >
                      {isMalus ? <AlertOctagon className="h-5 w-5" /> : <ShieldCheck className="h-5 w-5" />}
                    </motion.div>
                    <p className="text-sm text-navy-foreground/80 uppercase tracking-widest font-mono mb-2">Votre CRM estimé</p>
                    <motion.div
                      className="font-display text-6xl tracking-tight mb-3 tabular-nums"
                      animate={{ scale: [1, 1.06, 1] }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      key={`crm-${currentCRM}`}
                    >
                      <motion.span>{displayedCRM}</motion.span>
                    </motion.div>

                    {/* Animated gauge */}
                    <div className="relative h-1.5 w-full max-w-[220px] mx-auto bg-white/15 rounded-full overflow-hidden mb-4">
                      <motion.div
                        className={`absolute inset-y-0 left-0 ${isMalus ? "bg-destructive" : "bg-emerald"}`}
                        animate={{ width: `${gaugeProgress * 100}%` }}
                        transition={{ type: "spring", stiffness: 140, damping: 20 }}
                      />
                    </div>
                    <div className="flex justify-between text-[10px] text-navy-foreground/60 font-mono tabular-nums max-w-[220px] mx-auto mb-7">
                      <span>0.50</span>
                      <span>1.00</span>
                      <span>3.50</span>
                    </div>

                    <AnimatePresence mode="wait">
                      <motion.p
                        key={isMalus ? "malus" : isBonus ? "bonus" : "neutral"}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                        className="text-navy-foreground/75 text-sm mb-8"
                      >
                        {isMalus ? "Vous avez un profil malussé." : isBonus ? "Vous avez un profil bonussé." : "Vous êtes au coefficient de base."}
                      </motion.p>
                    </AnimatePresence>

                    <QuoteFunnel>
                      <button className="inline-flex items-center gap-2 rounded-full bg-emerald text-emerald-foreground px-6 py-3.5 text-sm font-semibold hover:scale-105 transition-transform shadow-elev w-full justify-center">
                        Obtenir un devis avec ce CRM <ArrowRight className="h-4 w-4" />
                      </button>
                    </QuoteFunnel>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </main>
      <Footer />
    </div>
  );
}