# 📚 Instruccions de desenvolupament✅ Fes un commit i un push pas a pas amb GitLens i VS Code

🧩 1. Fer canvis al projecte

Aquest fitxer conté guies ràpides per a tasques habituals del projecte Sardanista.Modifica algun fitxer del teu projecte. Per exemple, canvia un text al README.md o una línia al teu component React.



## ✅ Fer commit i push amb VS Code i GitLens🔍 2. Revisa els canvis

Ves al panell esquerre i obre la pestanya de Control d’Origen (icona de branques o símbol “<>” amb línies).

### 🧩 1. Fer canvis al projecte

Modifica algun fitxer del teu projecte. Per exemple, canvia un text al `README.md` o una línia al teu component React.Aquí veuràs la llista de fitxers modificats.



### 🔍 2. Revisa els canvisClica sobre un fitxer per veure:

Ves al panell esquerre i obre la pestanya de **Control d'Origen** (icona de branques o símbol "<>" amb línies).

a l’esquerra el contingut abans

Aquí veuràs la llista de fitxers modificats.

a la dreta el contingut després

Clica sobre un fitxer per veure:

- A l'esquerra: el contingut **abans**💬 3. Escriu un missatge de commit

- A la dreta: el contingut **després**A la part superior del panell de Control d’Origen (just a sobre del botó blau), escriu un missatge curt i clar:



### 💬 3. Escriu un missatge de commitAfegit enllaç als esdeveniments al footer

A la part superior del panell de Control d'Origen (just a sobre del botó blau), escriu un missatge curt i clar:

✅ 4. Confirma el commit

```Prem el botó blau de sota que diu Confirmació (pot aparèixer com “✔ Confirmació” o en anglès “Commit”).

Afegit enllaç als esdeveniments al footer

```🚀 5. Puja els canvis a GitHub (push)

Després de fer el commit, VS Code t’ofereix fer el push.

### ✅ 4. Confirma el commit

Prem el botó blau de sota que diu **Confirmació** (pot aparèixer com "✔ Confirmació" o en anglès "Commit").Si no surt, fes-ho així:



### 🚀 5. Puja els canvis a GitHub (push)Ves a la barra inferior (abaix de tot), i clica on diu main

Després de fer el commit, VS Code t'ofereix fer el push.

O bé obre la paleta de comandes amb ⌘⇧P (Command + Shift + P)

Si no surt, fes-ho així:

- Ves a la barra inferior (abaix de tot), i clica on diu `main`Escriu: Git: Push i prem Enter

- O bé obre la paleta de comandes amb `⌘⇧P` (Command + Shift + P)

- Escriu: **Git: Push** i prem Enter🧠 Opcional: amb GitLens

Si fas servir GitLens, pots fer:

### 🧠 Opcional: amb GitLens

Si fas servir GitLens, pots fer:Clic dret sobre un fitxer → GitLens: Commit

- Clic dret sobre un fitxer → **GitLens: Commit**

- O obrir el panell GitLens > Commits i arrossegar-hi fitxersO obrir el panell GitLens > Commits i arrossegar-hi fitxers



---

## 🐳 Treballar amb DDEV

El projecte utilitza **DDEV** per gestionar l'entorn de desenvolupament local. Els fitxers Docker manuals (`Dockerfile`, `docker-compose.yml`) ja no s'utilitzen.

### Ordres bàsiques
```bash
ddev start              # Inicia el projecte
ddev stop               # Para el projecte
ddev restart            # Reinicia el projecte
ddev poweroff           # Para tots els projectes DDEV i allibera recursos
```

### Drupal / Drush
```bash
ddev drush status       # Estat del Drupal
ddev drush cr           # Neteja de memòria cau
ddev drush cex          # Exporta configuració
ddev drush cim          # Importa configuració
ddev drush uli          # Genera enllaç de login d'administrador
```

### Composer
```bash
ddev composer install   # Instal·la dependències
ddev composer require drupal/module_name
ddev composer update
```

### Bases de dades
```bash
ddev import-db --src=backup.sql.gz
ddev export-db > backup.sql
ddev snapshot           # Crea snapshot de la BD
ddev snapshot restore   # Recupera snapshot
```

### Accés SSH al contenidor
```bash
ddev ssh                # Entra al contenidor web
```

---

## 🎨 Frontend React

### Iniciar desenvolupament
```bash
cd frontend-sardanista
nvm use                 # Utilitza la versió Node correcta
npm install             # Instal·la dependències
npm start               # Inicia servidor de desenvolupament (port 3000)
```

### Linter i formatació
```bash
npm run lint            # Comprova errors de codi
npm run prettify        # Formata el codi
```

---

## 📝 Flux de treball Git

1. Crea una branca de treball:
   ```bash
   git checkout -b feature/nom-descriptiu
   ```

2. Fes els canvis necessaris

3. Si has modificat configuració de Drupal:
   ```bash
   ddev drush cex
   ```

4. Commit i push:
   ```bash
   git add .
   git commit -m "Descripció clara dels canvis"
   git push origin feature/nom-descriptiu
   ```

5. Crea una Pull Request a GitHub

---

## 🔧 Personalització PHP

Si necessites ajustar la configuració PHP (memòria, temps d'execució, límits d'upload), edita:

```
.ddev/php/my-php.ini
```

Després reinicia DDEV:
```bash
ddev restart
```

---

Per més detalls, consulta el [README.md](README.md) principal del projecte.
