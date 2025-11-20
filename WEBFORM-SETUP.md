# Configuració de Webforms

## Instal·lació de mòduls

Al servidor de producció (o local amb ddev):

```bash
cd ~/sardanista/drupal11
./vendor/bin/drush en webform webform_rest webform_ui -y
./vendor/bin/drush cr
```

## Opció 1: Crear webforms via interfície web

1. Ves a **Estructura → Webforms → Add webform** (`/admin/structure/webform`)
2. Per al formulari de contacte:
   - ID: `contacte`
   - Títol: `Formulari de contacte`
   - Afegeix camps:
     - `nom` (Textfield, requerit)
     - `email` (Email, requerit)
     - `missatge` (Textarea, requerit)
   - Confirmació: "Gràcies! El teu missatge s'ha enviat correctament."

3. Per al newsletter:
   - ID: `newsletter`
   - Títol: `Butlletí de notícies`
   - Afegeix camp:
     - `email` (Email, requerit)
   - Confirmació: "Gràcies per subscriure't al nostre butlletí!"

## Opció 2: Importar webforms des de fitxers YAML

```bash
cd ~/sardanista/drupal11

# Copiar els fitxers de configuració
cp webform-contacte.yml config/sync/webform.webform.contacte.yml
cp webform-newsletter.yml config/sync/webform.webform.newsletter.yml

# Importar configuració
./vendor/bin/drush config:import --partial --source=config/sync -y
./vendor/bin/drush cr
```

## Configuració de REST API

1. Habilitar CORS al `.htaccess` o `settings.php`:

```php
// A web/sites/default/settings.php
if (PHP_SAPI !== 'cli') {
  header('Access-Control-Allow-Origin: *');
  header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
  header('Access-Control-Allow-Headers: Content-Type');
}
```

2. Configurar permisos:
   - Ves a **Configuració → Permisos** (`/admin/people/permissions`)
   - Assegura't que "Anonymous user" pot "Submit webform"

## Verificar funcionament

1. Prova l'endpoint REST:
```bash
curl -X POST https://sardanista.cat/webform_rest/submit \
  -H "Content-Type: application/json" \
  -d '{
    "webform_id": "contacte",
    "nom": "Prova",
    "email": "prova@test.cat",
    "missatge": "Missatge de prova"
  }'
```

2. Revisa les submissions:
   - Ves a **Estructura → Webforms** (`/admin/structure/webform`)
   - Clica "Results" al webform corresponent

## Endpoints disponibles

- Contacte: `POST /webform_rest/submit` amb `webform_id: "contacte"`
- Newsletter: `POST /webform_rest/submit` amb `webform_id: "newsletter"`
