# Configuració de Formularis (Contact Storage)

## ✅ Implementació completada

El sistema de formularis està implementat amb un mòdul custom de Drupal que proporciona endpoints REST per:
- Formulari de contacte: `/api/contact`
- Subscripció newsletter: `/api/newsletter`

## Estructura del mòdul

```
drupal11/web/modules/custom/sardanista_forms/
├── sardanista_forms.info.yml       # Definició del mòdul
├── sardanista_forms.module          # Hook implementations
├── sardanista_forms.routing.yml     # Definició de rutes
└── src/
    └── Controller/
        └── FormsController.php      # Controlador amb endpoints
```

## Instal·lació a producció

### 1. Copiar el mòdul al servidor

```bash
# Des del teu laptop
cd /Users/montse/Docker/sardanista
git add drupal11/web/modules/custom/sardanista_forms
git commit -m "Add custom forms module"
git push origin main

# Al servidor
ssh sarda1219@65.109.231.124
cd ~/sardanista
git pull origin main
```

### 2. Instal·lar dependències i habilitar mòdul

```bash
cd ~/sardanista/drupal11
composer require drupal/contact_storage
./vendor/bin/drush en contact contact_storage sardanista_forms -y
./vendor/bin/drush cr
```

### 3. Verificar que funciona

```bash
# Test contacte
curl -X POST https://65.109.231.124/drupal11/web/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "nom": "Prova",
    "email": "prova@test.cat",
    "missatge": "Missatge de prova"
  }'

# Test newsletter
curl -X POST https://65.109.231.124/drupal11/web/api/newsletter \
  -H "Content-Type: application/json" \
  -d '{
    "email": "newsletter@test.cat"
  }'
```

Hauria de retornar: `{"message":"Form submitted successfully","id":X}`

## Endpoints disponibles

### POST /api/contact
**Request body:**
```json
{
  "nom": "Nom complet",
  "email": "email@example.com",
  "missatge": "Text del missatge"
}
```

**Response (200):**
```json
{
  "message": "Form submitted successfully",
  "id": 123
}
```

### POST /api/newsletter
**Request body:**
```json
{
  "email": "email@example.com"
}
```

**Response (200):**
```json
{
  "message": "Subscription successful",
  "id": 124
}
```

## Veure les submissions

1. Accedeix a l'administració de Drupal
2. Ves a **Estructura → Formularis de contacte** (`/admin/structure/contact`)
3. Clica **List messages** per veure totes les submissions
4. O consulta els logs: **Reports → Recent log messages** (`/admin/reports/dblog`)

## Característiques

✅ **CORS configurat** - Accepta peticions des del frontend
✅ **Validació d'email** - Comprova format vàlid
✅ **Camps requerits** - Valida que no faltin dades
✅ **Logging** - Registra totes les submissions
✅ **Storage persistent** - Guarda missatges a la base de dades
✅ **Errors controlats** - Retorna missatges d'error adequats

## Solució de problemes

Si els endpoints no funcionen:

1. Verifica que el mòdul està habilitat:
   ```bash
   ./vendor/bin/drush pm:list | grep sardanista_forms
   ```

2. Neteja la cache:
   ```bash
   ./vendor/bin/drush cr
   ```

3. Comprova els permisos:
   - A **People → Permissions** (`/admin/people/permissions`)
   - Assegura't que "Anonymous" té "Access content"

4. Revisa els logs:
   ```bash
   ./vendor/bin/drush watchdog:show --filter=sardanista_forms
   ```
