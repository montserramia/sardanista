# Scripts de Desplegament

Aquest directori conté scripts per automatitzar el desplegament del projecte Sardanista.

## 📜 Scripts disponibles

### `deploy-prod.sh`

Script automàtic per desplegar canvis a producció seguint el procediment definit a `DEPLOYMENT-local.md`.

#### Ús

Al servidor de producció:

```bash
cd ~/sardanista
git pull origin main
./scripts/deploy-prod.sh
```

#### Què fa el script

1. ✅ Crea backup de la base de dades
2. ✅ Guarda la configuració local de Drupal (settings.php, services.yml)
3. ✅ Fa stash dels canvis locals
4. ✅ Actualitza el codi des de GitHub
5. ✅ Restaura la configuració local
6. ✅ Instal·la dependències de Drupal
7. ✅ Aplica actualitzacions de Drupal (base de dades i configuració)
8. ✅ Neteja la cache de Drupal
9. ✅ Compila el frontend React
10. ✅ Verifica l'estat del sistema

#### Backups

Els backups es guarden a `~/sardanista/backups/` amb el format:
- Base de dades: `prod-YYYY-MM-DD-HHMM.sql.gz`

#### Notes importants

- El script s'atura si hi ha errors (`set -e`)
- La configuració local de Drupal sempre es preserva
- Es recomana revisar el web després del desplegament
- Els backups es mantenen automàticament per a recuperació

#### Solució de problemes

Si el script falla:
1. Revisa els missatges d'error
2. Els backups estan a `~/sardanista/backups/`
3. Pots restaurar manualment amb: `drush sql:cli < backups/prod-YYYY-MM-DD-HHMM.sql.gz`

## 🔒 Seguretat

- Mai commitejis `settings.php` ni `services.yml` amb credencials de producció
- Els backups no es pugen a GitHub (estan al `.gitignore`)
- Mantén sempre còpies de seguretat abans de desplegar
