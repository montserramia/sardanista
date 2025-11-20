# Configuració dels Webforms al Drupal

## 1. Instal·lar els mòduls necessaris

Connecta't al servidor i executa:

```bash
ssh sarda1219@65.109.231.124
cd ~/sardanista/drupal11
./vendor/bin/drush en webform webform_rest -y
./vendor/bin/drush cr
```

## 2. Configurar permisos REST

### Opció A: Via interfície Drupal (recomanat)

1. Ves a **Configuration → Web Services → REST**
2. Activa l'endpoint `webform_rest`
3. A **People → Permissions**:
   - Marca "Submit webform" per a **Anonymous user**
   - Marca "Submit webform" per a **Authenticated user**

### Opció B: Via drush

```bash
./vendor/bin/drush cset rest.settings resources.webform_rest.GET.supported_formats.0 json -y
./vendor/bin/drush cset rest.settings resources.webform_rest.POST.supported_formats.0 json -y
./vendor/bin/drush pm:enable webform_rest -y
./vendor/bin/drush cr
```

## 3. Crear Webform "contacte"

### Via interfície (més fàcil):

1. Ves a **Structure → Webforms → Add webform**
2. Omple:
   - **ID**: `contacte`
   - **Title**: `Formulari de contacte`
3. Afegeix camps (clica **Build**):
   - **Nom** (`nom`): Textfield, Required
   - **Email** (`email`): Email, Required
   - **Missatge** (`missatge`): Textarea, Required, 6 rows
4. A **Settings → Confirmation**:
   - **Type**: Page
   - **Message**: `El teu missatge s'ha enviat correctament. Ens posarem en contacte aviat.`
5. A **Settings → Access**:
   - Marca "Anonymous" i "Authenticated" a **Create**
6. Desa

### Via drush (automàtic):

```bash
cat > /tmp/webform-contacte.yml << 'EOF'
id: contacte
title: 'Formulari de contacte'
status: open
elements: |
  nom:
    '#type': textfield
    '#title': 'El teu nom'
    '#required': true
  email:
    '#type': email
    '#title': Email
    '#required': true
  missatge:
    '#type': textarea
    '#title': 'En què et podem ajudar?'
    '#required': true
    '#rows': 6
settings:
  confirmation_type: page
  confirmation_title: 'Gràcies!'
  confirmation_message: 'El teu missatge s''ha enviat correctament. Ens posarem en contacte aviat.'
access:
  create:
    roles:
      - anonymous
      - authenticated
EOF

./vendor/bin/drush config:import --partial --source=/tmp webform.webform.contacte -y
./vendor/bin/drush cr
```

## 4. Crear Webform "newsletter"

### Via interfície:

1. **Structure → Webforms → Add webform**
2. Omple:
   - **ID**: `newsletter`
   - **Title**: `Newsletter`
3. Afegeix camp:
   - **Email** (`email`): Email, Required
4. A **Settings → Confirmation**:
   - **Message**: `T'has subscrit correctament a la newsletter!`
5. A **Settings → Access**:
   - Marca "Anonymous" i "Authenticated" a **Create**
6. Desa

### Via drush:

```bash
cat > /tmp/webform-newsletter.yml << 'EOF'
id: newsletter
title: Newsletter
status: open
elements: |
  email:
    '#type': email
    '#title': 'El teu email'
    '#required': true
settings:
  confirmation_type: inline
  confirmation_message: 'T''has subscrit correctament a la newsletter!'
access:
  create:
    roles:
      - anonymous
      - authenticated
EOF

./vendor/bin/drush config:import --partial --source=/tmp webform.webform.newsletter -y
./vendor/bin/drush cr
```

## 5. Configurar CORS (important!)

Edita el fitxer `~/sardanista/drupal11/web/sites/default/services.yml`:

```yaml
cors.config:
  enabled: true
  allowedHeaders: ['*']
  allowedMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
  allowedOrigins: ['https://sardanista.cat', 'http://localhost:3000']
  exposedHeaders: false
  maxAge: false
  supportsCredentials: true
```

Després:

```bash
./vendor/bin/drush cr
```

## 6. Verificar que funciona

Prova l'endpoint amb curl:

```bash
curl -X POST https://65.109.231.124/drupal11/web/webform_rest/submit \
  -H "Content-Type: application/json" \
  -d '{
    "webform_id": "contacte",
    "nom": "Test",
    "email": "test@example.com",
    "missatge": "Prova"
  }'
```

Hauria de retornar un codi 200 i un JSON amb la resposta.

## 7. Veure les submissions

A Drupal:
- **Structure → Webforms**
- Clica **Results** al webform "contacte" o "newsletter"
- Veuràs totes les submissions rebudes

## Notes importants

- Els webforms requereixen que el mòdul `webform_rest` estigui actiu
- El CORS ha d'estar ben configurat per acceptar peticions del frontend
- Les submissions es guarden a la base de dades del Drupal
- Pots configurar notificacions per email a cada webform (Settings → Emails/Handlers)
