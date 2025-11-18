# Projecte Sardanista

Aquest repositori conté els recursos de desenvolupament de la nova web de l'Agrupació Sardanista de Castelldefels. El backend es basa en **Drupal 11** i el frontend és una aplicació **React** (Material Kit 2) que consumeix l'API del Drupal. El projecte es treballa habitualment amb **DDEV** a l'entorn local (per exemple en un MacBook Air) i es desplega en un VPS de **Hetzner**.

## 📁 Contingut del repositori

- `drupal11/`: codi del backend Drupal, amb el document root a `web/` i la configuració exportada a `config/`.
- `frontend-sardanista/`: projecte React per al frontend públic.
- Fitxers de suport (`.nvmrc`, `.prettierrc.json`, etc.) i scripts auxiliars.

## 🧱 Requisits principals

| Ús | Eina | Notes |
| --- | --- | --- |
| Backend local | [DDEV](https://ddev.readthedocs.io/en/stable/) | Inclou Docker Desktop a macOS. Project name recomanat: `sardanista`. |
| Certificats locals | [mkcert](https://github.com/FiloSottile/mkcert) | Opcional, per tenir HTTPS automàtic amb DDEV. |
| Gestió de dependències | Composer 2 (dins DDEV) | Es fa servir via `ddev composer`. |
| Frontend | Node.js 18 LTS + npm | Segueix la versió fixada a `.nvmrc`. |
| Altres | Git, VS Code (opcional) | GitFlow senzill amb branques temàtiques. |

> 💡 Si treballes en un Mac, només cal instal·lar DDEV (que portarà Docker Desktop) i Node.js 18. La resta d'eines s'executen dins el contenidor.

## 🚀 Posada en marxa amb DDEV (Drupal)

1. **Inicialitza el projecte (només la primera vegada)**
   ```bash
   ddev config --project-type=drupal11 --docroot=drupal11/web --create-docroot
   ddev start
   ```
2. **Instal·la dependències**
   ```bash
   ddev composer install
   ```
3. **Importa la base de dades** (dump obtingut de producció o d'un company)
   ```bash
   ddev import-db --src=/path/al/dump.sql.gz
   ```
4. **Sincronitza fitxers d'usuari** (si cal)
   ```bash
   ddev auth ssh        # per fer servir rsync/ssh cap al VPS
   ddev import-files --src=/path/al/backup-files.tgz
   ```
5. **Aplica configuració exportada**
   ```bash
   ddev drush cim -y
   ddev drush cr
   ```
6. Accedeix al lloc en local: [https://sardanista.ddev.site](https://sardanista.ddev.site) (DDEV genera HTTPS amb mkcert).

### Ordres útils amb DDEV

```bash
ddev ssh                         # shell al contenidor web
ddev drush status                # estat del Drupal
ddev drush uli                  # enllaç de login com a administrador
ddev snapshot restore <nom>      # recupera snapshots locals
ddev xdebug on/off               # activa/desactiva Xdebug
```

La configuració exportada del Drupal es guarda a `drupal11/config/`. Recorda executar `ddev drush cex` abans de fer commit de canvis de configuració.

## 🎨 Frontend React

1. Entra al directori i instal·la dependències:
   ```bash
   cd frontend-sardanista
   nvm use
   npm install
   ```
2. Arrenca l'entorn de desenvolupament:
   ```bash
   npm start
   ```
   El frontend queda disponible a [http://localhost:3000](http://localhost:3000) i fa servir l'API de Drupal. Configura les variables `.env` segons correspongui (vegeu `frontend-sardanista/.env.example` si n'hi ha).
3. Linter i formatador:
   ```bash
   npm run lint
   npm run prettify
   ```

## 🔄 Flux de treball recomanat

1. Crea una branca: `git checkout -b feature/descripcio-curta`.
2. Fes els canvis al backend (`ddev`) o al frontend.
3. Executa les ordres necessàries (`ddev test`, linters, etc.).
4. Exporta la configuració (`ddev drush cex`).
5. Commit, push i Pull Request.

## 📂 Informació de desplegament

> 🔒 Per motius de seguretat, la informació detallada sobre rutes docRoot i el procediment de desplegament es troba a la documentació interna privada. Consulta la wiki o el fitxer local `DEPLOYMENT-local.md` per a més detalls.

## 🌐 Entorn de producció (VPS Hetzner)

- **Servidor**: VPS Hetzner (Ubuntu 22.04 LTS) amb un stack LEMP: Nginx + PHP-FPM 8.2 + MariaDB 10.6.
- **Ubicació del projecte**: `/var/www/sardanista` (document root a `web/`).
- **Gestió de serveis**: `systemctl` (`php8.2-fpm`, `nginx`, `mariadb`).
- **Certificats**: `certbot` amb Let's Encrypt (renovació automàtica via cron).
- **Crons**: `crontab -u www-data -l` inclou `drush cron` cada hora.

### Desplegament manual

1. Connecta't via SSH (credencials a 1Password):
   ```bash
   ssh deploy@sardanista.agrupacio.cat
   ```
2. Fes còpia de seguretat abans de desplegar:
   ```bash
   sudo -u www-data php web/core/scripts/drupal backup:db --destination="../backups/$(date +%F).sql"
   rsync -av web/sites/default/files/ ../backups/files-$(date +%F)/
   ```
3. Actualitza el codi:
   ```bash
   cd /var/www/sardanista
git pull
   ```
4. Instal·la dependències i aplica canvis:
   ```bash
   composer install --no-dev --optimize-autoloader
drush updb -y
drush cim -y
drush cr
   ```
5. Revisa que el lloc respongui i que els logs (`/var/log/nginx/` i `web/sites/default/files/php/logs/`) no mostrin errors.

### Sincronització de dades cap a local

- Base de dades: `drush sql:dump --result-file=../backups/prod-$(date +%F).sql.gz`
- Fitxers: `rsync -avz deploy@sardanista.agrupacio.cat:/var/www/sardanista/web/sites/default/files/ files-prod/`
- Importa-ho a local amb `ddev import-db` i `ddev import-files`.

## 📌 Bones pràctiques addicionals

- No facis canvis directament en producció; sempre passa per Git.
- Mantén els secrets (claus API, contrasenyes) fora del repositori; a producció estan definits a `web/sites/default/settings.php` o a fitxers inclosos locals.
- Revisa els PRs amb un altre company quan toquin la base de dades o configuració crítica.
- Documenta a la wiki interna qualsevol script o procés nou (p. ex. noves tasques cron, integracions externes).

## ❓ Suport

Per dubtes sobre DDEV o el VPS, contacta amb l'equip de sistemes o consulta la documentació interna a Notion. També pots revisar els fitxers `INSTRUCCIONS.md` i els scripts dins `drupal11/recipes/`.
