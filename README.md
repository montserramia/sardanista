# Agrupació Sardanista Castelldefels — Web amb Drupal 11

Aquest és el repositori del projecte Drupal 11 per a la nova web de l’Agrupació Sardanista Castelldefels.

## 📦 Requisits

- Docker
- Docker Compose
- Composer (opcional, si treballes fora de contenidors)
- Visual Studio Code (opcional, però recomanat)

## 🚀 Posada en marxa

```bash
docker compose up -d --build
```

La web estarà disponible a: [http://localhost:8080](http://localhost:8080)

L'accés a phpMyAdmin és: [http://localhost:8081](http://localhost:8081)

Credencials de base de dades (per defecte):
- **Usuari**: `drupal`
- **Contrasenya**: `drupal`
- **Base de dades**: `drupal`

## 🛠️ Estructura del projecte

```text
drupal-local/
├── drupal11/                  <- Arrel de la instal·lació Drupal
│   ├── config/                <- Configuració exportada (git versionada)
│   ├── recipes/               <- Receptes de Composer
│   ├── vendor/                <- Dependències (excloses de Git)
│   └── web/                   <- Document root de Drupal
├── docker-compose.yml        <- Servei de Docker
├── Dockerfile                <- Imatge personalitzada amb PHP 8.3
├── .gitignore                <- Fitxers exclosos del repositori
├── php.ini                   <- Configuració PHP
├── backup-db.sh              <- Script per fer còpia de la base de dades
└── restore-db.sh             <- Script per restaurar la base de dades
```

## 🧹 Mòduls contribuïts actius

- `admin_toolbar`
- `pathauto`
- `token`
- `metatag`
- `redirect`
- `google_analytics`
- `devel` (només en desenvolupament)

## 🦮 Configuració exportada

Utilitzem `drush cex` i `drush cim` per exportar i importar configuració des de:

```
drupal11/config/sync/
```

## 🗃️ Versionament

Aquesta carpeta **és gestionada per Git**. S’han ignorat:
- `/vendor/`
- `/web/sites/default/files/`
- `settings.local.php`
- Fitxers temporals i de backup

## ✨ Objectiu del projecte

Crear una web pública per difondre esdeveniments, notícies i continguts rellevants de l’Agrupació Sardanista Castelldefels, amb un backend Drupal i un frontend (React o similar) a través de **JSON:API**.

