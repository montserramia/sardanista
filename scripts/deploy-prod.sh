#!/bin/bash

# 🚀 Script de desplegament automàtic a producció
# Segueix el procediment definit a DEPLOYMENT-local.md

set -e  # Sortir si hi ha errors

# Colors per la sortida
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 Iniciant desplegament a producció...${NC}"

# Variables
BACKUP_DIR="$HOME/sardanista/backups"
TIMESTAMP=$(date +%F-%H%M)

# 1. Assegurar-nos que estem al directori correcte
cd ~/sardanista
echo -e "${GREEN}✓ Directori: $(pwd)${NC}"

# 2. Crear directori de backups si no existeix
mkdir -p "$BACKUP_DIR"

# 3. Backup de la base de dades
echo -e "${YELLOW}📦 Creant backup de la base de dades...${NC}"
cd drupal11
./vendor/bin/drush sql:dump --result-file=$BACKUP_DIR/prod-$TIMESTAMP.sql --gzip
echo -e "${GREEN}✓ Backup creat: $BACKUP_DIR/prod-$TIMESTAMP.sql.gz${NC}"

# 4. Backup dels fitxers (opcional, pot ser lent)
# echo -e "${YELLOW}📦 Creant backup dels fitxers...${NC}"
# rsync -av web/sites/default/files/ ../$BACKUP_DIR/files-$TIMESTAMP/
# echo -e "${GREEN}✓ Backup de fitxers completat${NC}"

cd ~/sardanista

# 5. Guardar configuració local sensible
echo -e "${YELLOW}💾 Guardant configuració local...${NC}"
if [ -f "drupal11/web/sites/default/settings.php" ]; then
    cp -f drupal11/web/sites/default/settings.php drupal11/web/sites/default/settings.php.local 2>/dev/null || true
fi
if [ -f "drupal11/web/sites/default/services.yml" ]; then
    cp -f drupal11/web/sites/default/services.yml drupal11/web/sites/default/services.yml.local 2>/dev/null || true
fi
echo -e "${GREEN}✓ Configuració guardada${NC}"

# 6. Stash dels canvis locals
echo -e "${YELLOW}📝 Fent stash dels canvis locals...${NC}"
git stash push -m "Config local Drupal - $TIMESTAMP" || echo "No hi ha canvis per fer stash"

# 7. Actualitzar el codi
echo -e "${YELLOW}⬇️  Baixant canvis de GitHub...${NC}"
git pull origin main
echo -e "${GREEN}✓ Codi actualitzat${NC}"

# 8. Recuperar configuració local
echo -e "${YELLOW}🔧 Recuperant configuració local...${NC}"
if [ -f "drupal11/web/sites/default/settings.php.local" ]; then
    mv -f drupal11/web/sites/default/settings.php.local drupal11/web/sites/default/settings.php
fi
if [ -f "drupal11/web/sites/default/services.yml.local" ]; then
    mv -f drupal11/web/sites/default/services.yml.local drupal11/web/sites/default/services.yml
fi
echo -e "${GREEN}✓ Configuració restaurada${NC}"

# 9. Actualitzar dependències Drupal
echo -e "${YELLOW}📚 Actualitzant dependències Drupal...${NC}"
cd drupal11
# Primer provem install, si falla fem update
# NOTA: No usem --no-dev perquè necessitem drush a producció
if ! composer install --optimize-autoloader 2>&1 | tee /tmp/composer-output.log | grep -q "lock file is not up to date"; then
    echo -e "${GREEN}✓ Dependències instal·lades${NC}"
else
    echo -e "${YELLOW}⚠️  Lock file desactualitzat, fent composer update...${NC}"
    composer update --optimize-autoloader
    echo -e "${GREEN}✓ Dependències actualitzades${NC}"
fi

# 10. Actualitzar Drupal
echo -e "${YELLOW}🔄 Aplicant actualitzacions Drupal...${NC}"
./vendor/bin/drush updb -y || echo "No hi ha actualitzacions de BD"
./vendor/bin/drush cim -y || echo "No hi ha canvis de configuració"
./vendor/bin/drush cr
echo -e "${GREEN}✓ Drupal actualitzat${NC}"

# 11. Rebuild del frontend React
echo -e "${YELLOW}⚛️  Compilant frontend React...${NC}"
cd ~/sardanista/frontend-sardanista
npm ci
npm run build
echo -e "${GREEN}✓ Frontend compilat${NC}"

# 12. Verificar estat de Drupal
echo -e "${YELLOW}🔍 Verificant estat del sistema...${NC}"
cd ~/sardanista/drupal11
./vendor/bin/drush status
echo ""
./vendor/bin/drush core:requirements --severity=2 || echo "Hi ha alguns avisos, revisa'ls"

echo ""
echo -e "${GREEN}✅ Desplegament completat amb èxit!${NC}"
echo -e "${YELLOW}📋 Recorda verificar:${NC}"
echo "   - Accedeix al web i comprova que tot funcioni"
echo "   - Revisa els logs si cal: /var/log/nginx/"
echo "   - Backup creat a: $BACKUP_DIR/prod-$TIMESTAMP.sql.gz"
