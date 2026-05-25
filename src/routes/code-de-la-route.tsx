import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Car, CheckCircle2, XCircle, ArrowRight, RotateCcw, ArrowLeft, GraduationCap } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Reveal } from "@/components/site/Reveal";
import { ScrollProgress } from "@/components/site/ScrollProgress";
import { QuoteFunnel } from "@/components/site/QuoteFunnel";

export const Route = createFileRoute("/code-de-la-route")({
  head: () => ({
    meta: [
      { title: "Quiz Code de la Route & Assurance | Integra CC" },
      { name: "description", content: "Testez vos connaissances sur le code de la route et les règles d'assurance auto. Un quiz interactif pensé pour les jeunes conducteurs." },
    ],
  }),
  component: QuizPage,
});

const QUESTIONS = [
  {
    q: "Quelle est la vitesse maximale autorisée pour un jeune conducteur sur autoroute par temps sec ?",
    opts: ["130 km/h", "110 km/h", "100 km/h"],
    ans: 1,
    exp: "Pendant la période probatoire, la vitesse est abaissée à 110 km/h sur autoroute pour limiter les risques.",
  },
  {
    q: "Une assurance auto au tiers (Responsabilité Civile) est-elle obligatoire pour une voiture qui reste dans un garage privé ?",
    opts: ["Oui", "Non", "Seulement si elle possède une plaque"],
    ans: 0,
    exp: "Même stationné dans un lieu privé, un véhicule terrestre à moteur doit être assuré au tiers (sauf s'il est vidé de ses fluides et monté sur cales).",
  },
  {
    q: "Quel est le taux d'alcoolémie maximum autorisé pour un conducteur en période probatoire ?",
    opts: ["0,5 g/L de sang", "0,2 g/L de sang", "0 g/L de sang"],
    ans: 1,
    exp: "La limite est de 0,2 g/L, ce qui équivaut dans la pratique à zéro verre d'alcool pour les jeunes conducteurs.",
  },
];

function QuizPage() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    if (idx === QUESTIONS[current].ans) setScore(s => s + 1);
  };

  const nextQuestion = () => {
    if (current < QUESTIONS.length - 1) {
      setCurrent(c => c + 1);
      setSelected(null);
    } else {
      setShowResult(true);
    }
  };

  const reset = () => {
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setShowResult(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col antialiased">
      <ScrollProgress />
      <Header />
      <main className="flex-1 py-20 lg:py-32 relative">
        <div className="absolute top-0 inset-x-0 h-[50vh] bg-gradient-to-b from-surface/60 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-grid opacity-[0.15] pointer-events-none [mask-image:radial-gradient(ellipse_60%_50%_at_50%_20%,black,transparent)]" />

        <div className="mx-auto max-w-2xl px-5 lg:px-8 relative z-10">
          <Reveal>
            <Link to="/" className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground mb-8 transition-colors">
              <ArrowLeft className="h-3.5 w-3.5" />
              Retour à l'accueil
            </Link>
          </Reveal>

          <Reveal delay={80}>
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald/20 bg-emerald/10 px-3 py-1 text-[11px] uppercase tracking-wider font-medium text-emerald mb-6 shadow-soft">
                <GraduationCap className="h-3.5 w-3.5" />
                Quiz interactif · gratuit
              </div>
              <h1 className="font-display text-[clamp(2.25rem,5vw,3.75rem)] tracking-[-0.03em] leading-[1.05] text-balance">
                Êtes-vous incollable sur <span className="text-gradient-emerald">la route ?</span>
              </h1>
              <p className="mt-5 text-muted-foreground text-base sm:text-lg leading-relaxed max-w-lg mx-auto">
                Testez vos connaissances code & assurance en 3 questions et obtenez un tarif jeune conducteur adapté.
              </p>
            </div>
          </Reveal>

          <div className="bg-surface border border-border rounded-[2rem] p-6 sm:p-10 shadow-soft relative overflow-hidden min-h-[420px] flex flex-col">
            <AnimatePresence mode="wait">
              {showResult ? (
                <motion.div key="result" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex-1 flex flex-col items-center justify-center text-center">
                  <div className="grid h-20 w-20 place-items-center rounded-full bg-emerald/10 text-emerald mb-6">
                    <Car className="h-10 w-10" />
                  </div>
                  <h3 className="font-display text-3xl mb-2">Quiz terminé !</h3>
                  <p className="text-muted-foreground text-lg mb-8">Votre score : <strong className="text-foreground">{score} / {QUESTIONS.length}</strong></p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                    <button onClick={reset} className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background px-6 py-3.5 text-sm font-medium hover:bg-accent transition-all">
                      <RotateCcw className="h-4 w-4" /> Recommencer
                    </button>
                    <QuoteFunnel defaultType="auto">
                      <button className="inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3.5 text-sm font-medium shadow-elev hover:shadow-premium hover:-translate-y-0.5 transition-all">
                        Obtenir mon tarif Jeune Conducteur <ArrowRight className="h-4 w-4" />
                      </button>
                    </QuoteFunnel>
                  </div>
                </motion.div>
              ) : (
                <motion.div key={current} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="flex-1 flex flex-col">
                  <div className="mb-6 flex items-center justify-between text-sm font-medium text-emerald">
                    <span>Question {current + 1} / {QUESTIONS.length}</span>
                    <span className="text-muted-foreground">Score : {score}</span>
                  </div>
                  <h3 className="font-display text-2xl leading-snug mb-8">{QUESTIONS[current].q}</h3>
                  
                  <div className="space-y-3 flex-1">
                    {QUESTIONS[current].opts.map((opt, i) => {
                      const isSelected = selected === i;
                      const isCorrect = i === QUESTIONS[current].ans;
                      const showState = selected !== null;
                      const wrongPicked = isSelected && !isCorrect;

                      let stateClass = "border-border bg-background hover:border-emerald/30";
                      if (showState) {
                        if (isCorrect) stateClass = "border-emerald bg-emerald/10 text-emerald";
                        else if (isSelected) stateClass = "border-destructive bg-destructive/10 text-destructive";
                        else stateClass = "border-border bg-background opacity-50";
                      }

                      return (
                        <motion.button
                          key={opt}
                          disabled={showState}
                          onClick={() => handleAnswer(i)}
                          className={`relative w-full text-left p-4 rounded-2xl border transition-colors duration-300 flex items-center justify-between overflow-hidden ${stateClass}`}
                          // Shake on wrong selection
                          animate={wrongPicked ? { x: [0, -8, 8, -6, 6, -3, 0] } : { x: 0 }}
                          transition={wrongPicked ? { duration: 0.45, ease: "easeInOut" } : { duration: 0 }}
                        >
                          {/* Emerald halo pulse on correct */}
                          {showState && isCorrect && (
                            <motion.span
                              aria-hidden="true"
                              className="pointer-events-none absolute inset-0 rounded-2xl"
                              style={{ boxShadow: "0 0 0 0 color-mix(in srgb, var(--emerald) 60%, transparent)" }}
                              initial={{ boxShadow: "0 0 0 0 color-mix(in srgb, var(--emerald) 60%, transparent)" }}
                              animate={{ boxShadow: "0 0 0 14px color-mix(in srgb, var(--emerald) 0%, transparent)" }}
                              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                            />
                          )}
                          <span className="relative font-medium">{opt}</span>
                          {showState && isCorrect && (
                            <motion.span
                              initial={{ scale: 0, rotate: -90 }}
                              animate={{ scale: 1, rotate: 0 }}
                              transition={{ type: "spring", stiffness: 320, damping: 18 }}
                              className="relative"
                            >
                              <CheckCircle2 className="h-5 w-5 text-emerald" />
                            </motion.span>
                          )}
                          {wrongPicked && (
                            <motion.span
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: "spring", stiffness: 320, damping: 18 }}
                              className="relative"
                            >
                              <XCircle className="h-5 w-5 text-destructive" />
                            </motion.span>
                          )}
                        </motion.button>
                      );
                    })}
                  </div>

                  {selected !== null && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <p className="text-sm text-muted-foreground flex-1"><strong className="text-foreground">Explication :</strong> {QUESTIONS[current].exp}</p>
                      <button onClick={nextQuestion} className="shrink-0 inline-flex items-center gap-2 rounded-full bg-foreground text-background px-6 py-2.5 text-sm font-medium hover:opacity-90">
                        Suivant <ArrowRight className="h-4 w-4" />
                      </button>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}