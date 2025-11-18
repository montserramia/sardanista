# 🚦 Procediment privat de desplegament a producció

## 📂 Rutes docRoot de producció

- **Frontend (React build):**
  - `/home/sardana.newwweb.cat/sardanista/frontend-sardanista/build`
- **Backend (Drupal):**
  - `/home/sardana.newwweb.cat/sardanista/drupal11/web`

## Procediment net per portar canvis a producció

1. **Connecta't al servidor per SSH**
   ```bash
   ssh sarda1219@IP_DEL_SERVIDOR
   cd ~/sardanista
   ```

2. **Fes còpia de seguretat abans de desplegar**
   ```bash
   cd drupal11
   # Base de dades
   ./vendor/bin/drush sql:dump --result-file=../backups/prod-$(date +%F-%H%M).sql.gz
   # Fitxers
   rsync -av web/sites/default/files/ ../backups/files-$(date +%F-%H%M)/
   ```

3. **Guarda la configuració local sensible**
   ```bash
   cp drupal11/web/sites/default/settings.php drupal11/web/sites/default/settings.php.local
   cp drupal11/web/sites/default/services.yml drupal11/web/sites/default/services.yml.local
   ```

4. **Stasha els canvis locals**
   ```bash
   git stash push -m "Config local Drupal"
   ```

5. **Actualitza el codi**
   ```bash
   git pull
   ```

6. **Recupera la configuració local**
   ```bash
   mv drupal11/web/sites/default/settings.php.local drupal11/web/sites/default/settings.php
   mv drupal11/web/sites/default/services.yml.local drupal11/web/sites/default/services.yml
   ```

7. **Instal·la dependències i aplica actualitzacions Drupal**
   ```bash
   cd drupal11
   composer install --no-dev --optimize-autoloader
   ./vendor/bin/drush updb -y
   ./vendor/bin/drush cim -y
   ./vendor/bin/drush cr
   ```

8. **Rebuild del frontend React**
   ```bash
   cd ~/sardanista/frontend-sardanista
   npm ci
   npm run build
   ```

9. **Verifica que el lloc funcioni correctament**
   ```bash
   cd ~/sardanista/drupal11
   ./vendor/bin/drush status
   ./vendor/bin/drush core:requirements --severity=2
   ```
   - Accedeix al web i revisa els logs: `/var/log/nginx/` i `web/sites/default/files/php/logs/`

> 💡 **Important:** No restauris ni facis checkout de `settings.php` ni `services.yml` des de Git si són específics de producció. Mantingues sempre una còpia local abans de fer canvis.
