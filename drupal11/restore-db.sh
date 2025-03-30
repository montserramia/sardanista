#!/bin/bash

if [ -z "$1" ]; then
  echo "❌ Indica el fitxer de còpia: ./restore-db.sh db_backups/backup-YYYYMMDD-HHMMSS.sql"
  exit 1
fi

echo "⚠️ Això esborrarà les dades actuals de la base de dades 'drupal'. Vols continuar? (sí/no)"
read CONFIRM

if [ "$CONFIRM" != "sí" ]; then
  echo "⏹️ Cancel·lat."
  exit 0
fi

echo "💣 Eliminant totes les taules existents..."
docker exec -i drupal_db mysql -udrupal -pdrupal -e "DROP DATABASE drupal; CREATE DATABASE drupal;"

echo "♻️ Important dades des de $1 ..."
docker exec -i drupal_db mysql -udrupal -pdrupal drupal < "$1"

echo "✅ Restauració finalitzada."
