# Déploiement Integra Assurance — Hostinger shared hosting

Guide pas-à-pas pour mettre integra-assurance.com en ligne sur ton compte Hostinger existant.

---

## Architecture cible

```
integracc.fr           → WordPress (Hostinger, déjà en place)
                         Source des articles blog via REST API
                         ↓
integra-assurance.com  → Site React V2 statique (Hostinger shared, ce projet)
                         Consomme blog d'integracc.fr au build
                         Lead capture via /api/submit-lead.php
```

---

## Pré-requis

- Domaine `integra-assurance.com` ajouté à ton compte Hostinger (ou alias)
- Accès FTP/SFTP à `public_html/integra-assurance.com/` (ou la racine selon ton plan)
- Compte [Resend](https://resend.com) (gratuit, 100 emails/jour) pour les emails de leads
- Node.js 20+ installé localement pour les builds

---

## Première mise en ligne — étapes

### 1. Builder le site statique

```bash
# Régénère sitemap + crawl tous les routes + génère HTML statique
npm run build:static
```

Le dossier `dist-static/` est créé avec :
- Tous les fichiers HTML pré-rendus (17 routes + 65 articles blog)
- Les assets minifiés (CSS, JS, images, fonts) dans `assets/`
- `robots.txt`, `sitemap.xml`, `favicon.svg`, `apple-touch-icon.svg`
- `api/submit-lead.php` + `api/.htaccess`
- `.htaccess` racine (HTTPS + SPA fallback + cache + sécurité)

### 2. Configurer Resend (5 min)

1. Crée un compte sur [resend.com](https://resend.com)
2. Va dans **Domains → Add Domain**, ajoute `integra-assurance.com`
3. Suis les instructions pour ajouter les DNS records (TXT + MX) dans Hostinger → DNS Zone
4. Attends la vérification (~5 min)
5. Va dans **API Keys → Create API Key**, donne-lui un nom "Integra production", scope `Sending access`
6. **Copie la clé `re_xxxxxxxxxxxx`** — elle ne s'affiche qu'une fois

### 3. Uploader sur Hostinger

#### Via le File Manager (le plus simple) :

1. Connecte-toi à [hPanel Hostinger](https://hpanel.hostinger.com)
2. **Hosting → Manage** sur le plan qui héberge integra-assurance.com
3. **File Manager** → ouvre `public_html/integra-assurance.com/` (ou `public_html/` si c'est le domaine principal)
4. Sélectionne tous les fichiers dans ton `dist-static/` local
5. Glisse-dépose dans File Manager (ou utilise **Upload Files**)

#### Via FTP (recommandé pour les ré-uploads) :

```bash
# Avec FileZilla ou WinSCP — récupère les credentials dans hPanel → FTP Accounts
# Upload le CONTENU de dist-static/ (pas le dossier lui-même) vers public_html/integra-assurance.com/
```

### 4. Configurer l'endpoint lead capture

Une fois les fichiers uploadés, crée le fichier `.env` côté serveur :

1. File Manager → `public_html/integra-assurance.com/api/`
2. Crée un nouveau fichier `.env` (avec le point devant)
3. Contenu :

```bash
RESEND_API_KEY=re_xxxxxxxxxxxx
RESEND_FROM_EMAIL=Integra Assurance <devis@integra-assurance.com>
LEAD_NOTIFICATION_EMAIL=integra.cc@outlook.com
```

4. Clic droit sur `.env` → **Change Permissions** → mets `600` (lecture propriétaire uniquement)
5. Vérifie que `api/.htaccess` est aussi uploadé (il bloque l'accès au `.env` et au `leads.log` depuis le navigateur)

### 5. Tester en production

Ouvre dans un navigateur :

| URL | Doit afficher |
|---|---|
| `https://integra-assurance.com/` | Home avec hero, services, blog preview |
| `https://integra-assurance.com/a-propos` | Page À propos avec portrait fondateur |
| `https://integra-assurance.com/blog` | Liste des 65 articles |
| `https://integra-assurance.com/blog/loi-hamon-assurance-guide` | Article complet |
| `https://integra-assurance.com/robots.txt` | Le fichier robots |
| `https://integra-assurance.com/sitemap.xml` | Le sitemap XML |

Test du formulaire de devis :

1. Click sur "Devis gratuit" dans le header
2. Remplis les 3 étapes
3. Clic "Envoyer"
4. Tu dois recevoir 2 emails :
   - Notification à `integra.cc@outlook.com`
   - Confirmation à l'adresse email saisie

Si pas reçus : check `public_html/integra-assurance.com/api/leads.log` (le PHP loggue tout lead reçu, même si Resend a échoué).

---

## Mise à jour du site (re-deploy)

Quand tu modifies le site ou publies un nouvel article WP :

```bash
# 1. Régénère tout
npm run build:static

# 2. Re-upload dist-static/ vers Hostinger
#    (File Manager ou FTP — n'écrase QUE les fichiers du site,
#     NE PAS toucher à api/.env qui contient ta Resend key)
```

**Automatisation** (optionnel) — pour rebuild auto quand WP publie :
- Cron WP (plugin WP-Cron) qui POST à un webhook GitHub Actions
- GitHub Actions exécute `npm run build:static` + upload SFTP

---

## Structure des fichiers déployés

```
public_html/integra-assurance.com/
├── .htaccess                  # Apache config (HTTPS, gzip, cache, SPA fallback)
├── robots.txt
├── sitemap.xml
├── favicon.svg
├── apple-touch-icon.svg
├── index.html                 # Home
├── a-propos/
│   └── index.html
├── blog/
│   ├── index.html             # Liste articles
│   └── {slug}/index.html      # 65 articles individuels
├── service/
│   ├── assurance-auto/
│   │   └── index.html
│   └── ...
├── mentions-legales/index.html
├── politique-cookies/index.html
├── politique-de-confidentialite/index.html
├── calculateur-bonus-malus/index.html
├── code-de-la-route/index.html
├── espace-client/index.html
├── admin/index.html
├── assets/                    # JS/CSS/images bundlés par Vite (hashed)
│   ├── index-{hash}.js
│   ├── index-{hash}.css
│   └── ...
└── api/
    ├── submit-lead.php        # Endpoint PHP de capture lead
    ├── .htaccess              # Protège .env et leads.log
    ├── .env                   # Resend API key (À CRÉER sur le serveur)
    └── leads.log              # Audit trail créé automatiquement
```

---

## Troubleshooting

### Le formulaire renvoie "Envoi impossible"
- Check les DevTools du navigateur → onglet Network → request `submit-lead.php`
- Si HTTP 403 : `.htaccess` du dossier `api/` mal uploadé, ré-upload
- Si HTTP 500 : check le fichier `error_log` dans hPanel pour voir l'erreur PHP
- Si HTTP 200 mais pas d'email : Resend API key invalide, ou domaine pas vérifié, ou tu as dépassé les 100 emails/jour du free tier

### Les URLs blog/article-xxx donnent 404
- Vérifie que `.htaccess` est bien uploadé à la racine
- Vérifie qu'Apache `mod_rewrite` est actif (Hostinger l'active par défaut)
- Test direct : `https://integra-assurance.com/blog/loi-hamon-assurance-guide/index.html` doit marcher

### Le sitemap est obsolète après publication d'un article WP
- Lance `npm run build:static` en local, re-upload
- Ou automatise via GitHub Actions + webhook WP

### Les images du blog ne chargent pas
- Elles sont servies par integracc.fr (WordPress)
- Vérifie que Cloudflare devant integracc.fr autorise CORS (déjà OK testé en dev)
- Si problème : ajoute dans hPanel WP → CORS plugin l'origine `https://integra-assurance.com`

---

## Sécurité — checklist déploiement

- [ ] `.env` permissions 600 (proprio seul)
- [ ] `api/.htaccess` uploadé et actif
- [ ] HTTPS forcé via `.htaccess` racine (déjà inclus)
- [ ] Headers de sécurité actifs (X-Frame-Options, HSTS, etc. — déjà inclus)
- [ ] Resend API key régénérée si elle a transité par un canal non-sécurisé
- [ ] CORS de `submit-lead.php` restreint à `integra-assurance.com` (vérifie la liste `$ALLOWED_ORIGINS`)
- [ ] Sitemap soumis à Google Search Console (https://search.google.com/search-console)
- [ ] Test du formulaire de bout en bout en prod après chaque déploiement

---

## Variables d'environnement résumé

### Build local (`.env.local`, gitignored)
```bash
VITE_WP_API_URL=https://integracc.fr
VITE_WP_USE_RANK_MATH=false
VITE_PLAUSIBLE_DOMAIN=integra-assurance.com    # Optionnel
```

### Runtime serveur Hostinger (`public_html/integra-assurance.com/api/.env`)
```bash
RESEND_API_KEY=re_xxxxxxxxxxxx
RESEND_FROM_EMAIL=Integra Assurance <devis@integra-assurance.com>
LEAD_NOTIFICATION_EMAIL=integra.cc@outlook.com
```
