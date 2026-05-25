import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ArrowLeft, ArrowRight, ShieldCheck, Loader2, KeyRound } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/espace-client")({
  head: () => ({
    meta: [
      { title: "Espace Client | Integra CC" },
      { name: "description", content: "Connectez-vous à votre espace client Integra CC pour gérer vos contrats, télécharger vos attestations et déclarer un sinistre." },
    ],
  }),
  component: LoginPage,
});

const loginSchema = z.object({
  email: z.string().email("Veuillez saisir une adresse e-mail valide"),
  password: z.string().min(6, "Votre mot de passe doit contenir au moins 6 caractères"),
});

type LoginData = z.infer<typeof loginSchema>;

function LoginPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const form = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: LoginData) => {
    setIsSubmitting(true);
    setErrorMsg("");
    
    // Simulation d'un appel réseau
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    // Simulation d'une erreur d'identifiants
    setIsSubmitting(false);
    setErrorMsg("Identifiants incorrects. Veuillez réessayer.");
  };

  return (
    <div className="min-h-screen bg-background text-foreground antialiased flex flex-col lg:flex-row">
      
      {/* Left side: Form */}
      <div className="flex-1 flex flex-col justify-center px-5 sm:px-10 lg:px-20 py-12 relative z-10">
        <div className="absolute top-8 left-5 sm:left-10 lg:left-20">
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Retour au site
          </Link>
        </div>

        <div className="w-full max-w-sm mx-auto">
          <Reveal delay={100}>
            <div className="mb-8">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-soft mb-6">
                <KeyRound className="h-6 w-6" />
              </span>
              <h1 className="font-display text-3xl sm:text-4xl tracking-tight mb-2">Bienvenue.</h1>
              <p className="text-muted-foreground text-sm">Connectez-vous pour gérer vos contrats et attestations.</p>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <AnimatePresence mode="wait">
                {errorMsg && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-sm font-medium text-destructive bg-destructive/10 border border-destructive/20 rounded-xl p-3"
                  >
                    {errorMsg}
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="space-y-1.5">
                <label className="text-sm font-medium">Adresse e-mail</label>
                <input 
                  {...form.register("email")}
                  type="email" 
                  autoComplete="email"
                  className="w-full bg-surface border border-border rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-emerald/50 focus:ring-1 focus:ring-emerald/50 transition-all placeholder:text-muted-foreground/40" 
                  placeholder="jean.dupont@email.com" 
                />
                {form.formState.errors.email && <p className="text-destructive text-xs mt-1">{form.formState.errors.email.message}</p>}
              </div>
              
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Mot de passe</label>
                  <a href="#" className="text-xs font-medium text-emerald hover:underline">Oublié ?</a>
                </div>
                <input 
                  {...form.register("password")}
                  type="password" 
                  autoComplete="current-password"
                  className="w-full bg-surface border border-border rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-emerald/50 focus:ring-1 focus:ring-emerald/50 transition-all placeholder:text-muted-foreground/40" 
                  placeholder="••••••••" 
                />
                {form.formState.errors.password && <p className="text-destructive text-xs mt-1">{form.formState.errors.password.message}</p>}
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-foreground text-background py-3.5 text-sm font-medium shadow-soft hover:shadow-elev hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:pointer-events-none mt-4"
              >
                {isSubmitting ? <Loader2 className="h-5 w-5 animate-spin" /> : "Se connecter"}
                {!isSubmitting && <ArrowRight className="h-4 w-4" />}
              </button>
            </form>
          </Reveal>
          
          <Reveal delay={300}>
            <div className="mt-8 text-center text-sm text-muted-foreground border-t border-border pt-6">
              Pas encore de compte ? <a href="/#devis" className="font-medium text-foreground hover:text-emerald transition-colors">Faites un devis</a>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Right side: Editorial (Desktop only) */}
      <div className="hidden lg:flex flex-1 relative bg-primary text-primary-foreground overflow-hidden items-center justify-center p-12">
        <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_0%,rgba(255,255,255,0.08),transparent)] pointer-events-none" />
        
        <div className="max-w-md relative z-10">
          <Reveal delay={300} variant="scale">
            <div className="grid h-16 w-16 place-items-center rounded-2xl bg-white/12 text-primary-foreground mb-8 backdrop-blur-sm border border-white/15 shadow-2xl">
              <ShieldCheck className="h-8 w-8" />
            </div>
            <h2 className="font-display text-4xl leading-tight mb-4 tracking-tight">Vos documents <br/><span className="text-primary-foreground/85">à portée de main.</span></h2>
            <p className="text-primary-foreground/70 leading-relaxed text-lg">
              Téléchargez votre carte verte, modifiez vos garanties ou déclarez un sinistre en quelques clics, 24h/24 et 7j/7.
            </p>
          </Reveal>
        </div>
      </div>
    </div>
  );
}