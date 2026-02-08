# Configuració CORS - Documentació

## 📋 Configuració actual (Drupal 11)

El projecte utilitza la configuració CORS nativa de Drupal 11 a través de `services.yml`, seguint les millors pràctiques oficials.

## 🎯 Dominis configurats

### Frontend (producció)
- **Principal:** `https://grupsardanistacastelldefels.cat`
- **WWW:** `https://www.grupsardanistacastelldefels.cat`
- **Staging:** `https://sardanista.pages.dev` (Cloudflare Pages)

### Desenvolupament
- **Local:** `http://localhost:3000` (React dev server)
- **DDEV:** `https://sardanista.ddev.site:8443`

### Backend API
- **Producció:** `https://admin.sardana.newwweb.cat`
- **Endpoints JSON:API:** `/jsonapi/*`

## ⚙️ Configuració

### 1. settings.php

Ubicació: `drupal11/web/sites/default/settings.php`

```php
// Carregar services.yml personalitzat
$settings['container_yamls'][] = DRUPAL_ROOT . '/sites/default/services.yml';
```

### 2. services.yml

Ubicació: `drupal11/web/sites/default/services.yml`

```yaml
parameters:
  # ... altres paràmetres ...
  
  cors.config:
    enabled: true
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Requested-With']
    allowedMethods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE']
    allowedOrigins:
      - 'https://grupsardanistacastelldefels.cat'
      - 'https://www.grupsardanistacastelldefels.cat'
      - 'https://sardanista.pages.dev'
      - 'http://localhost:3000'
    exposedHeaders: false
    maxAge: 86400
    supportsCredentials: true
```

## ✅ Verificació CORS

### Test local (des del terminal)

```bash
curl -H "Origin: https://grupsardanistacastelldefels.cat" \
  -H "Access-Control-Request-Method: GET" \
  -X OPTIONS \
  https://admin.sardana.newwweb.cat/jsonapi/node/article \
  -v 2>&1 | grep -i "access-control"
```

**Sortida esperada:**

```
> access-control-request-method: GET
< access-control-allow-origin: https://grupsardanistacastelldefels.cat
< access-control-allow-credentials: true
< access-control-allow-methods: GET, POST, OPTIONS, PUT, DELETE
< access-control-allow-headers: content-type, authorization, accept, x-requested-with
< access-control-max-age: 86400
```

### Test des del navegador (consola)

```javascript
fetch('https://admin.sardana.newwweb.cat/jsonapi/node/article', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/vnd.api+json',
  }
})
.then(response => response.json())
.then(data => console.log('✅ CORS funciona:', data))
.catch(error => console.error('❌ Error CORS:', error));
```

## 🔧 Manteniment

### Afegir nou origen permès

1. Edita `services.yml`:
   ```bash
   ssh sarda1219@65.109.231.124
   nano ~/sardanista/drupal11/web/sites/default/services.yml
   ```

2. Afegeix el nou origen a `allowedOrigins`:
   ```yaml
   allowedOrigins:
     - 'https://grupsardanistacastelldefels.cat'
     - 'https://nou-domini.cat'  # ← AFEGEIX AQUÍ
   ```

3. Neteja caché:
   ```bash
   drush cr
   ```

### Desactivar CORS temporalment

```yaml
cors.config:
  enabled: false  # ← Canvia a false
```

## 📝 Notes importants

- ✅ **Codi PHP manual CORS eliminat** - Ja no fem servir headers PHP manuals a settings.php
- ✅ **Configuració centralitzada** - Tot es gestiona des de services.yml
- ✅ **Credentials habilitades** - Permet cookies i autenticació cross-origin
- ✅ **Cache de preflight** - 24h (86400s) per optimitzar rendiment
- ⚠️ **No usar paths** - Els origens només poden ser dominis (sense `/path`)

## 🔗 Referències

- [Drupal CORS Documentation](https://www.drupal.org/docs/develop/api/cors-api)
- [MDN CORS Guide](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
