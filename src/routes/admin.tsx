import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { getLeadsFn } from "@/components/site/quote";
import { Users, Car, Bike, Home, HeartPulse, Briefcase, Calendar, Phone, Mail, ArrowLeft, ShieldCheck, Download } from "lucide-react";

export const Route = createFileRoute("/admin")({
  // Le loader s'exécute côté serveur/client avant l'affichage de la page
  loader: async () => {
    const leads = await getLeadsFn();
    return { leads };
  },
  component: AdminDashboard,
});

const iconMap: Record<string, any> = {
  auto: Car,
  moto: Bike,
  habitation: Home,
  sante: HeartPulse,
  pro: Briefcase,
};

function AdminDashboard() {
  const { leads } = Route.useLoaderData();

  return (
    <div className="min-h-screen bg-surface text-foreground font-sans antialiased">
      {/* Topbar Admin */}
      <header className="bg-background border-b border-border sticky top-0 z-30">
        <div className="mx-auto max-w-7xl px-5 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-emerald/10 text-emerald shadow-soft">
              <ShieldCheck className="h-4.5 w-4.5" strokeWidth={2.2} />
            </span>
            <span className="font-display text-xl font-medium tracking-tight">Integra Admin</span>
            <span className="ml-2 inline-flex items-center rounded-full bg-foreground/[0.04] px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground border border-border">Beta</span>
          </div>
          <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-foreground inline-flex items-center gap-2 transition-colors bg-surface hover:bg-accent px-3 py-1.5 rounded-lg border border-border">
            <ArrowLeft className="h-4 w-4" />
            Retour au site
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-display font-medium tracking-tight">Leads générés</h1>
            <p className="text-muted-foreground text-sm mt-1">Gérez les demandes de devis soumises via le tunnel interactif.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center gap-2 bg-background border border-border rounded-xl px-4 py-2.5 text-sm font-medium shadow-soft">
              <Users className="h-4 w-4 text-emerald" />
              {leads.length} demande{leads.length > 1 ? 's' : ''}
            </div>
            <button className="inline-flex items-center gap-2 bg-foreground text-background rounded-xl px-4 py-2.5 text-sm font-medium shadow-soft hover:opacity-90 transition-opacity">
              <Download className="h-4 w-4" />
              Exporter CSV
            </button>
          </div>
        </div>

        <div className="bg-background border border-border rounded-2xl shadow-soft overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-surface/50 border-b border-border">
                <tr>
                  <th className="px-6 py-4 font-medium text-muted-foreground">Type de produit</th>
                  <th className="px-6 py-4 font-medium text-muted-foreground">Contact</th>
                  <th className="px-6 py-4 font-medium text-muted-foreground">Coordonnées</th>
                  <th className="px-6 py-4 font-medium text-muted-foreground">Profil client</th>
                  <th className="px-6 py-4 font-medium text-muted-foreground">Reçu le</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {leads.map((lead, i) => {
                  const Icon = iconMap[lead.insuranceType] || Car;
                  return (
                    <motion.tr
                      key={lead.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.35,
                        delay: Math.min(i, 12) * 0.035,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="hover:bg-surface/30 transition-colors group"
                    >
                      <td className="px-6 py-5">
                        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-medium capitalize shadow-sm">
                          <Icon className="h-3.5 w-3.5 text-emerald" />
                          {lead.insuranceType}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <div className="font-semibold text-foreground">{lead.firstName} {lead.lastName}</div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex flex-col gap-2">
                          <a href={`tel:${lead.phone}`} className="inline-flex items-center gap-2 text-muted-foreground hover:text-emerald transition-colors font-mono text-xs">
                            <Phone className="h-3 w-3" /> {lead.phone}
                          </a>
                          <a href={`mailto:${lead.email}`} className="inline-flex items-center gap-2 text-muted-foreground hover:text-emerald transition-colors text-xs">
                            <Mail className="h-3 w-3" /> {lead.email}
                          </a>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <span className="inline-flex items-center rounded-md bg-foreground/[0.03] px-2.5 py-1 text-xs font-medium text-foreground/80">{lead.profile}</span>
                      </td>
                      <td className="px-6 py-5">
                        <div className="inline-flex items-center gap-2 text-muted-foreground text-xs">
                          <Calendar className="h-3.5 w-3.5" />
                          {new Date(lead.createdAt).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
                {leads.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-16 text-center text-muted-foreground">
                      <div className="flex flex-col items-center justify-center gap-3">
                        <div className="grid h-12 w-12 place-items-center rounded-full bg-surface border border-border">
                          <Users className="h-5 w-5 opacity-50" />
                        </div>
                        <p>Aucune demande pour le moment.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}