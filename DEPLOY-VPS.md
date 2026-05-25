# Déploiement depuis un VPS Hostinger — Scénario A

> **Scénario A** = VPS comme serveur de build. Le VPS rebuild puis push le `dist-static/` vers ton hébergement Hostinger shared via rsync. Le site est servi par le shared (cheap + fast + SEO).
>
> Workflow final :
> ```
> Git push   →   VPS (cron)   →   npm run build:static   →   rsync   →   Hostinger shared
> ```

---

## Pré-requis

- VPS Hostinger actif (KVM 1 ou plus — 1 CPU, 4 GB RAM suffit largement)
- Hébergement shared Hostinger où sera servi integra-assurance.com
- Domaine integra-assurance.com pointé vers le shared (déjà fait)
- Repo Git de ce projet accessible (GitHub, GitLab, Bitbucket — privé OK)
- Accès SSH à ton VPS (que tu as déjà)

---

## Étape 1 — Bootstrap du VPS (one-time, ~10 min)

Connecte-toi en SSH à ton VPS :

```bash
ssh -p 65002 root@<IP_DU_VPS>
```

Puis exécute (copie-colle dans l'ordre) :

```bash
# Installer Node.js 22 + git + rsync (si pas déjà là)
apt update && apt install -y curl git rsync
curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
apt install -y nodejs

# Vérifier
node --version    # doit afficher v22.x (requis par Wrangler/Cloudflare)
npm --version
git --version
rsync --version

# Créer un user dédié au déploiement (sécurité — pas de root pour ça)
adduser deploy --disabled-password --gecos ""
usermod -aG sudo deploy
su - deploy
```

Tu es maintenant en `deploy@vps`. Ne quitte pas — continue avec l'étape 2.

---

## Étape 2 — Cloner le repo (~2 min)

Toujours en `deploy@vps` :

```bash
cd ~
git clone https://github.com/<ton-org>/<ton-repo>.git integra-v2
# OU avec une clé SSH si repo privé (recommandé) :
# git clone git@github.com:<ton-org>/<ton-repo>.git integra-v2

cd integra-v2
npm install --no-audit --no-fund    # installe les dépendances (~3 min)
```

> **Repo privé sur GitHub ?** Génère une SSH key pour le user deploy :
> ```bash
> ssh-keygen -t ed25519 -C "deploy@vps-integra" -f ~/.ssh/id_ed25519 -N ""
> cat ~/.ssh/id_ed25519.pub
> # Copie cette clé publique → GitHub.com → Settings → SSH Keys → Add
> ```

---

## Étape 3 — Générer une SSH key pour pousser vers Hostinger shared

Toujours en `deploy@vps` :

```bash
ssh-keygen -t ed25519 -C "vps-deploy-to-shared" -f ~/.ssh/integra_shared -N ""
cat ~/.ssh/integra_shared.pub
```

→ Copie la clé publique affichée (commence par `ssh-ed25519 AAAA...`)

Ajoute-la à ton hébergement **shared** :

1. hPanel Hostinger → ton plan shared → **Avancé** → **Accès SSH**
2. Active SSH si pas déjà actif
3. **Clés SSH** → **Ajouter clé** → colle la clé publique
4. Note l'utilisateur SSH affiché (ex: `u1234567`), le host (ex: `integra-assurance.com` ou IP), et le port (généralement `65002`)

Configure SSH côté VPS pour utiliser cette clé :

```bash
cat >> ~/.ssh/config <<'EOF'
Host hostinger-shared
    HostName integra-assurance.com
    Port 65002
    User u1234567
    IdentityFile ~/.ssh/integra_shared
    StrictHostKeyChecking accept-new
EOF
chmod 600 ~/.ssh/config

# Test la connexion (doit s'ouvrir sans demander de mot de passe)
ssh hostinger-shared "pwd && ls"
```

Si la commande répond `OK + liste des fichiers` → SSH est en place. Sinon → check que tu as bien ajouté la clé publique côté hPanel.

---

## Étape 4 — Créer le fichier de config deploy

Crée le fichier d'environnement (jamais commité au git) :

```bash
nano ~/.integra-deploy.env
```

Contenu (adapte avec tes vraies valeurs notées étape 3) :

```bash
SHARED_SSH_USER=u1234567
SHARED_SSH_HOST=integra-assurance.com
SHARED_SSH_PORT=65002
SHARED_REMOTE_PATH=domains/integra-assurance.com/public_html
```

> **Comment trouver `SHARED_REMOTE_PATH` ?**
> Depuis le VPS : `ssh hostinger-shared "pwd"` te donne le home directory du user FTP. Le chemin du site est généralement :
> - `public_html/` (si integra-assurance.com est le domaine principal)
> - `domains/integra-assurance.com/public_html/` (si addon domain)
>
> Tu peux explorer avec `ssh hostinger-shared "ls"` puis `"ls domains/"`.

Sauvegarde (`Ctrl+O` puis `Ctrl+X`), puis sécurise les permissions :

```bash
chmod 600 ~/.integra-deploy.env
```

---

## Étape 5 — Premier déploiement manuel

```bash
cd ~/integra-v2
chmod +x scripts/vps-deploy.sh
./scripts/vps-deploy.sh
```

Tu devrais voir :
```
[deploy] 1/4 — Pulling latest code from git…
[deploy] 2/4 — Lockfile unchanged, skipping npm install
[deploy] 3/4 — Building static site (npm run build:static)…
[static] 82 routes to crawl
[static] ✓ 82 saved, 0 failed
[deploy] 4/4 — Rsyncing to Hostinger shared…
sending incremental file list
...
[deploy] ✓ Deploy completed in 123s
```

Le site doit être live sur `https://integra-assurance.com/` immédiatement (rsync est instantané côté serveur).

---

## Étape 6 — Configurer api/.env sur le shared (one-time, pour Resend)

⚠ Le rsync **exclut volontairement** `api/.env` pour ne jamais écraser la prod par accident. Tu dois le créer une fois manuellement sur le shared :

```bash
# Depuis le VPS, SSH dans le shared
ssh hostinger-shared

# Aller dans le bon dossier
cd domains/integra-assurance.com/public_html/api

# Créer le .env
cat > .env <<'EOF'
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxx
RESEND_FROM_EMAIL=Integra Assurance <devis@integra-assurance.com>
LEAD_NOTIFICATION_EMAIL=integra.cc@outlook.com
EOF

chmod 600 .env
exit
```

---

## Étape 7 — Automatiser via cron (optionnel)

Pour rebuild + deploy auto toutes les 15 minutes (utile si tu publies souvent sur WP) :

```bash
crontab -e
```

Ajoute la ligne :
```cron
*/15 * * * * /home/deploy/integra-v2/scripts/vps-deploy.sh >> /home/deploy/integra-deploy.log 2>&1
```

Ou seulement une fois par heure :
```cron
0 * * * * /home/deploy/integra-v2/scripts/vps-deploy.sh >> /home/deploy/integra-deploy.log 2>&1
```

Vérifier les logs :
```bash
tail -50 ~/integra-deploy.log
```

---

## Étape 8 — (Optionnel) Webhook depuis WordPress

Pour rebuild **instantanément** quand tu publies un article WP, sans attendre le cron :

1. Installer le plugin WP **"WP Webhooks"** ou **"Auto Post Scheduler"**
2. Configurer un webhook qui déclenche sur **"Post published"**
3. URL du webhook = un script PHP sur ton VPS qui lance `vps-deploy.sh` en background

Exemple de script PHP minimal à mettre sur le VPS (via nginx ou apache) :

```php
<?php
// /var/www/webhook.php
$expectedToken = 'changez-moi-token-secret-long-aleatoire';
if (($_GET['token'] ?? '') !== $expectedToken) {
    http_response_code(403);
    exit('Forbidden');
}
exec('sudo -u deploy /home/deploy/integra-v2/scripts/vps-deploy.sh >> /var/log/integra-deploy.log 2>&1 &');
echo 'Deploy triggered';
```

Puis ajoute l'URL dans le webhook WP : `https://ton-vps.com/webhook.php?token=changez-moi-...`

---

## Commandes utiles au quotidien

```bash
# Re-déployer maintenant
ssh -p 65002 root@vps-ip   # ou directement en tant que deploy si SSH config
su - deploy
cd ~/integra-v2 && ./scripts/vps-deploy.sh

# Voir les logs cron
tail -f ~/integra-deploy.log

# Modifier un fichier en local + push :
# 1. Sur ton ordi Windows : modifie le code → git commit → git push
# 2. Sur VPS : ./scripts/vps-deploy.sh (ou attends le cron)

# Voir les leads soumis (le PHP les loggue) :
ssh hostinger-shared "tail -20 domains/integra-assurance.com/public_html/api/leads.log"

# Désactiver le cron temporairement
crontab -l > /tmp/cron.bak && crontab -r
# Pour réactiver : crontab /tmp/cron.bak
```

---

## Troubleshooting

| Symptôme | Cause / Fix |
|---|---|
| `Permission denied (publickey)` lors du rsync | La clé `~/.ssh/integra_shared` n'est pas ajoutée côté hPanel SSH Keys |
| `rsync: failed to send: Connection refused` | Le port SSH du shared est mauvais. Hostinger utilise généralement `65002`, pas `22` |
| Build prend > 10 min sur le VPS | KVM 1 a 1 CPU. Soit upgrade vers KVM 2, soit accepte la durée (toujours plus rapide que ton Windows local) |
| `dist-static/` est vide | `wrangler dev` n'a pas pu démarrer — check `node_modules/.bin/wrangler --version`. Réinstalle si manquant : `npm ci` |
| Cron ne tourne pas | Vérifier que le service cron est actif : `systemctl status cron`. Vérifier que la ligne est bien dans `crontab -l` |
| Le site shared ne se met pas à jour après rsync | Probablement un cache. Test en navigation privée. Si OK = cache navigateur. Si KO = check que `SHARED_REMOTE_PATH` pointe au bon endroit |

---

## Architecture finale

```
┌─────────────────────────┐
│ Ton ordi Windows        │
│ - dev local             │
│ - git commit / push     │
└──────────┬──────────────┘
           │ git push
           ▼
┌─────────────────────────┐         ┌────────────────────────┐
│ GitHub / GitLab         │ ──────► │ VPS Hostinger          │
│ - repo source           │  (pull) │ - deploy@vps           │
└─────────────────────────┘         │ - ~/integra-v2/        │
                                    │ - cron */15 min        │
                                    │ - vps-deploy.sh        │
                                    └──────────┬─────────────┘
                                               │ rsync over SSH
                                               ▼
                                    ┌─────────────────────────┐
                                    │ Hostinger SHARED        │
                                    │ public_html/...         │
                                    │ Servi à integra-...com  │
                                    │ + api/submit-lead.php   │
                                    └─────────────────────────┘
                                               ▲
                                               │ (POST lead form)
                                               │
                                    ┌─────────────────────────┐
                                    │ Visiteurs               │
                                    └─────────────────────────┘

┌─────────────────────────┐         ┌─────────────────────────┐
│ WordPress integracc.fr  │ ──────► │ VPS pull articles       │
│ (sur shared aussi)      │   API   │ via fetch au build      │
└─────────────────────────┘         └─────────────────────────┘
```

---

## Sécurité — checklist

- [ ] User `deploy` (pas root) utilisé pour les opérations courantes
- [ ] Clé SSH du VPS pour shared : passphrase optionnelle, mais 600 sur les permissions
- [ ] `~/.integra-deploy.env` en chmod 600
- [ ] Token webhook (si utilisé) : 32+ caractères aléatoires
- [ ] `api/.env` côté shared en chmod 600
- [ ] Firewall VPS : ferme tous les ports sauf 22 (SSH) et 80/443 (si webhook public)
- [ ] Garde `unattended-upgrades` actif sur le VPS pour les patches sécu auto

---

## Bonus : retirer Hostinger shared plus tard

Si un jour tu veux **tout migrer sur le VPS** (Scénario B), on convertit la stack en SSR Node.js + nginx reverse proxy. Le `dist-static/` devient inutile, on bascule sur `npm start`. Tu m'écris quand tu veux.
