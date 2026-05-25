import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X, ShieldCheck, BarChart3, Target } from "lucide-react";
import { Link } from "@tanstack/react-router";
import {
  acceptAll,
  rejectAll,
  setConsent,
  needsConsentPrompt,
} from "@/lib/consent";

/**
 * CNIL-compliant cookie consent banner.
 *
 * Rules implemented (CNIL recommendation, RGPD Art. 7):
 *   - "Refuser tout" is as easy to find as "Accepter tout" (same visual weight)
 *   - "Personnaliser" lets the user toggle each non-essential category
 *   - Necessary cookies are always on (legitimate interest, not asked)
 *   - User decision persisted in localStorage; not re-asked unless policy version bumps
 *   - Link to /politique-cookies for full transparency
 *   - 'integra:consent-change' CustomEvent fired so analytics/marketing modules can react
 */
export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [showCustomize, setShowCustomize] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    // Delay slightly so the banner doesn't slam on first paint
    const t = window.setTimeout(() => {
      if (needsConsentPrompt()) setIsVisible(true);
    }, 1500);
    return () => window.clearTimeout(t);
  }, []);

  const handleAcceptAll = () => {
    acceptAll();
    setIsVisible(false);
    setShowCustomize(false);
  };

  const handleRejectAll = () => {
    rejectAll();
    setIsVisible(false);
    setShowCustomize(false);
  };

  const handleSavePreferences = () => {
    setConsent({ analytics, marketing });
    setIsVisible(false);
    setShowCustomize(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Modal "Personnaliser" — overlay */}
          <AnimatePresence>
            {showCustomize && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-[60] bg-foreground/60 backdrop-blur-sm flex items-center justify-center p-4"
                onClick={() => setShowCustomize(false)}
              >
                <motion.div
                  initial={{ y: 12, opacity: 0, scale: 0.98 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  exit={{ y: 12, opacity: 0, scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 280, damping: 28 }}
                  className="bg-surface rounded-2xl border border-border shadow-premium w-full max-w-lg overflow-hidden"
                  onClick={(e) => e.stopPropagation()}
                  role="dialog"
                  aria-labelledby="cookie-customize-title"
                  aria-modal="true"
                >
                  <div className="flex items-center justify-between p-5 border-b border-border">
                    <div className="flex items-center gap-2.5">
                      <span className="grid h-9 w-9 place-items-center rounded-full bg-emerald/10 text-emerald">
                        <Cookie className="h-4 w-4" />
                      </span>
                      <h2 id="cookie-customize-title" className="font-display text-lg">
                        Personnaliser mes choix
                      </h2>
                    </div>
                    <button
                      onClick={() => setShowCustomize(false)}
                      aria-label="Fermer"
                      className="grid h-8 w-8 place-items-center rounded-full hover:bg-accent transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="p-5 space-y-4 max-h-[60vh] overflow-y-auto">
                    {/* Necessary (always on) */}
                    <CategoryRow
                      icon={ShieldCheck}
                      title="Strictement nécessaires"
                      description="Indispensables au fonctionnement du site (sauvegarde de votre avancement dans le devis, sécurité, préférences d'affichage). Pas de consentement requis."
                      checked
                      disabled
                      onChange={() => undefined}
                    />

                    {/* Analytics */}
                    <CategoryRow
                      icon={BarChart3}
                      title="Mesure d'audience"
                      description="Cookies anonymisés pour comprendre comment les visiteurs naviguent (pages vues, taux de conversion). Aucune donnée personnelle, conforme aux recommandations CNIL."
                      checked={analytics}
                      onChange={setAnalytics}
                    />

                    {/* Marketing */}
                    <CategoryRow
                      icon={Target}
                      title="Personnalisation & retargeting"
                      description="Cookies tiers pour vous proposer des offres adaptées sur d'autres sites (Meta Pixel, Google Ads). Optionnel."
                      checked={marketing}
                      onChange={setMarketing}
                    />

                    <p className="text-[11px] text-muted-foreground pt-2 border-t border-border/60">
                      Vous pouvez modifier ces choix à tout moment depuis la{" "}
                      <Link
                        to="/politique-cookies"
                        className="text-emerald hover:underline"
                        onClick={() => setShowCustomize(false)}
                      >
                        politique des cookies
                      </Link>
                      .
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 p-5 border-t border-border bg-surface/50">
                    <button
                      onClick={handleRejectAll}
                      className="flex-1 min-w-[120px] rounded-full border border-border bg-surface px-4 py-2.5 text-xs font-medium hover:bg-accent transition-colors"
                    >
                      Tout refuser
                    </button>
                    <button
                      onClick={handleSavePreferences}
                      className="flex-1 min-w-[120px] rounded-full bg-foreground text-background px-4 py-2.5 text-xs font-medium hover:opacity-90 transition-opacity"
                    >
                      Enregistrer
                    </button>
                    <button
                      onClick={handleAcceptAll}
                      className="flex-1 min-w-[120px] rounded-full bg-primary text-primary-foreground px-4 py-2.5 text-xs font-semibold shadow-soft hover:shadow-elev transition-all"
                    >
                      Tout accepter
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Banner — bottom-right card */}
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0, transition: { ease: "easeIn" } }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-4 sm:bottom-6 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50"
            role="region"
            aria-label="Bandeau de gestion des cookies"
          >
            <div className="bg-surface/95 backdrop-blur-xl border border-border shadow-premium rounded-2xl p-5 relative overflow-hidden">
              <div className="absolute inset-0 bg-noise opacity-10 pointer-events-none" />
              <div className="flex gap-4 relative z-10">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-emerald/10 text-emerald">
                  <Cookie className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold text-foreground">Cookies & vie privée</h3>
                  <p className="mt-1 text-[12.5px] text-muted-foreground leading-relaxed">
                    Nous utilisons des cookies strictement nécessaires au fonctionnement du site,
                    et avec votre consentement, des cookies de mesure d'audience.{" "}
                    <Link to="/politique-cookies" className="text-emerald hover:underline">
                      En savoir plus
                    </Link>
                    .
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <button
                      onClick={handleRejectAll}
                      className="flex-1 min-w-[100px] rounded-full border border-border bg-background px-3 py-2 text-[11.5px] font-medium hover:bg-accent transition-colors"
                    >
                      Tout refuser
                    </button>
                    <button
                      onClick={() => setShowCustomize(true)}
                      className="flex-1 min-w-[100px] rounded-full border border-border bg-background px-3 py-2 text-[11.5px] font-medium hover:bg-accent transition-colors"
                    >
                      Personnaliser
                    </button>
                    <button
                      onClick={handleAcceptAll}
                      className="flex-1 min-w-[100px] rounded-full bg-primary text-primary-foreground px-3 py-2 text-[11.5px] font-semibold shadow-soft hover:shadow-elev transition-all"
                    >
                      Tout accepter
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ────────────────────────────────────────────────────────── */

function CategoryRow({
  icon: Icon,
  title,
  description,
  checked,
  disabled = false,
  onChange,
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  title: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="rounded-xl border border-border bg-background p-4">
      <div className="flex items-start gap-3">
        <span
          className={`grid h-9 w-9 flex-shrink-0 place-items-center rounded-lg border ${
            disabled
              ? "bg-muted text-muted-foreground border-border"
              : "bg-emerald/10 text-emerald border-emerald/15"
          }`}
        >
          <Icon className="h-4 w-4" strokeWidth={1.6} />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <p className="text-sm font-medium text-foreground">{title}</p>
            <Toggle checked={checked} disabled={disabled} onChange={onChange} />
          </div>
          <p className="mt-1 text-[12px] text-muted-foreground leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
}

function Toggle({
  checked,
  disabled = false,
  onChange,
}: {
  checked: boolean;
  disabled?: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => !disabled && onChange(!checked)}
      className={`relative inline-flex h-5 w-9 flex-shrink-0 items-center rounded-full transition-colors duration-300 ${
        disabled
          ? "bg-muted cursor-not-allowed opacity-70"
          : checked
            ? "bg-emerald"
            : "bg-border hover:bg-muted-foreground/40"
      }`}
    >
      <span
        className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform duration-300 ${
          checked ? "translate-x-[18px]" : "translate-x-[3px]"
        }`}
      />
    </button>
  );
}
