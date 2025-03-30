#!/bin/bash

DATA_DIR="./db_backups"
DATE=$(date +%Y%m%d-%H%M%S)
FILE="$DATA_DIR/backup-$DATE.sql"

mkdir -p "$DATA_DIR"

echo "🔄 Fent còpia de seguretat de la base de dades..."
docker exec drupal_db mysqldump -udrupal -pdrupal drupal > "$FILE"

if [ $? -eq 0 ]; then
  echo "✅ Còpia feta amb èxit: $FILE"
else
  echo "❌ Error durant la còpia"
fi
