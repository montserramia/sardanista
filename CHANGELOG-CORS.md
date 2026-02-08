# Changelog - Actualització CORS i Configuració Servidor

**Data:** 8 de febrer del 2026  
**Autor:** Actualització configuració producció

## 🎯 Canvis principals

### 1. Configuració CORS (Drupal 11)

**Abans:**
- Codi PHP manual a `settings.php` amb headers CORS
- Origens antics: `sardana.newwweb.cat`
- Interferia amb la configuració nativa de Drupal

**Després:**
- ✅ Configuració CORS nativa a `services.yml`
- ✅ Origens actualitzats: `grupsardanistacastelldefels.cat`, `www.grupsardanistacastelldefels.cat`, `sardanista.pages.dev`
- ✅ Codi PHP manual comentat/eliminat
- ✅ `settings.php` carrega `services.yml` via `container_yamls`

**Fitxers modificats:**
- `drupal11/web/sites/default/services.yml` → Configuració CORS definitiva
- `drupal11/web/sites/default/settings.php` → Afegida línia `container_yamls`

### 2. Configuració Drush al servidor

**Abans:**
- Cal executar drush amb path complet: `./vendor/bin/drush` o `/usr/local/lsws/lsphp83/bin/php8.3 vendor/drush/drush/drush.php`
- Cal configurar manualment cada vegada que es fa SSH

**Després:**
- ✅ Alias `drush` configurat a `~/.bashrc`
- ✅ `~/.bash_profile` creat per carregar automàticament `.bashrc`
- ✅ Funciona automàticament a cada connexió SSH

**Configuració:**
```bash
# ~/.bashrc
export PATH=~/bin:$PATH
alias drush='cd ~/sardanista/drupal11 && /usr/local/lsws/lsphp83/bin/php8.3 vendor/drush/drush/drush.php'

# ~/.bash_profile
if [ -f ~/.bashrc ]; then
    source ~/.bashrc
fi
```

### 3. Actualització de dominis

**Abans:**
- Frontend: `sardana.newwweb.cat`
- Backend: `sardana.newwweb.cat`

**Després:**
- ✅ Frontend: `grupsardanistacastelldefels.cat`
- ✅ Backend API: `admin.sardana.newwweb.cat`
- ✅ Staging: `sardanista.pages.dev` (Cloudflare Pages)

## 📝 Documentació actualitzada

### Nous fitxers
- ✅ `CORS-CONFIG.md` - Documentació completa de CORS
- ✅ `CHANGELOG-CORS.md` - Aquest fitxer

### Fitxers actualitzats
- ✅ `README.md` - Informació del servidor de producció i dominis
- ✅ `DEPLOYMENT-local.md` - Procediment amb alias drush i verificació CORS
- ✅ `INSTRUCCIONS.md` - Configuració inicial servidor i desplegament
- ✅ `GALERIA-API.md` - URLs i dominis actualitzats

## ✅ Verificació

### Test CORS funcional

```bash
curl -H "Origin: https://grupsardanistacastelldefels.cat" \
  -H "Access-Control-Request-Method: GET" \
  -X OPTIONS \
  https://admin.sardana.newwweb.cat/jsonapi/node/article \
  -v 2>&1 | grep -i "access-control"
```

**Resultat esperat:**
```
< access-control-allow-origin: https://grupsardanistacastelldefels.cat
< access-control-allow-credentials: true
< access-control-allow-methods: GET, POST, OPTIONS, PUT, DELETE
< access-control-allow-headers: content-type, authorization, accept, x-requested-with
< access-control-max-age: 86400
```

### Test Drush

```bash
ssh sarda1219@65.109.231.124
drush status  # Funciona directament sense path complet
```

## 🔧 Manteniment futur

### Afegir nou domini CORS

1. Edita `drupal11/web/sites/default/services.yml`
2. Afegeix el domini a `allowedOrigins`
3. Executa `drush cr`

### Modificar alias drush

1. Edita `~/.bashrc` al servidor
2. Executa `source ~/.bashrc`

## 📚 Referències

- [Drupal CORS API](https://www.drupal.org/docs/develop/api/cors-api)
- [Bash Profile vs Bashrc](https://linuxize.com/post/bashrc-vs-bash-profile/)
- [MDN CORS Documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)

---

**Status:** ✅ Tots els canvis aplicats i verificats  
**Pendent:** Cap
