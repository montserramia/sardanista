# Integració de la Galeria amb Drupal

## 1. Configuració del backend (Drupal)

### Habilitar mòduls necessaris

Assegura't que tens els següents mòduls instal·lats i habilitats a Drupal:

```bash
# A dins del contenidor de Drupal
ddev exec drush en jsonapi image styles
```

### Crear el tipus de contingut "Galeria"

Segueix les instruccions detallades a [GALLERY-SETUP.md](./GALLERY-SETUP.md).

### Crear un View per exposar les galeries via API

1. Anar a Structure > Views > Add new view
2. Configurar:
   - View name: "galleries_api"
   - Show: Content of type "gallery"
   - Create a page: Yes
   - Path: /api/galleries
   - Format: JSON: Content

3. Als camps, afegir:
   - Content: Title
   - Content: Images (with custom alias "images")
   - Content: Description
   - Content: Category

4. A la configuració de camp d'imatges:
   - Formatter: JSON
   - Image Style: Large (or crea un nou estil de 800x600)

5. Guardar la vista

## 2. Actualitzar el component de galeria per consumir dades de Drupal

Actualment, el component [src/pages/gallery/index.js](file:///Users/montse/Docker/sardanista/frontend-sardanista/src/pages/gallery/index.js) utilitza dades de mostra. Per connectar-lo amb Drupal, has de modificar la funció `useEffect`:

```javascript
useEffect(() => {
  // Fetch galleries from Drupal JSON:API
  fetch('https://admin.sardana.newwweb.cat/jsonapi/node/gallery')
    .then(response => response.json())
    .then(data => {
      const processedGalleries = data.data.map(item => ({
        id: item.id,
        title: item.attributes.title,
        description: item.attributes.field_description?.processed || '',
        category: item.attributes.field_category || '',
        images: item.relationships.field_images.data.map(imgRef => {
          const imgData = data.included.find(img => img.id === imgRef.id);
          return {
            id: imgData.id,
            url: imgData.attributes.uri.url, // Potser cal transformar aquesta URL
            alt: imgData.attributes.alt
          };
        })
      }));
      
      setGalleries(processedGalleries);
    })
    .catch(error => console.error('Error fetching galleries:', error));
}, []);
```

## 3. Configuració de CORS

Per permetre que el frontend accedeixi a les dades del backend, has d'afegir la configuració CORS a Drupal (`sites/default/services.yml`):

```yaml
cors.config:
  enabled: true
  # Llista de dominis permesos (afegeix el teu domini de frontend)
  allowedOrigins:
    - 'https://sardana.newwweb.cat'
    - 'http://localhost:3000'  # per a desenvolupament
  allowedMethods:
    - 'GET'
    - 'POST'
    - 'PUT'
    - 'PATCH'
    - 'DELETE'
    - 'HEAD'
    - 'OPTIONS'
  allowedHeaders:
    - 'Content-Type'
    - 'Authorization'
    - 'X-Requested-With'
  maxAge: 86400
```

## 4. Actualització de variables d'entorn

Afegeix a [.env](file:///Users/montse/Docker/sardanista/frontend-sardanista/src/pages/Presentation/index.js#L45-L137) (frontend):

```
REACT_APP_DRUPAL_API_URL=https://admin.sardana.newwweb.cat/jsonapi
```

I utilitza aquesta variable dins del component de galeria:

```javascript
const DRUPAL_API_URL = process.env.REACT_APP_DRUPAL_API_URL || 'http://localhost:3000/mock-api';
```

## 5. Consideracions de seguretat

- No exposis credencials al codi del client
- Considera l'ús de tokens JWT si cal autenticació
- Limita l'accés a recursos només a dominis autoritzats

## 6. Proves

Després de completar la configuració:

1. Prova accedir a l'endpoint de JSON:API directament
2. Verifica que es mostrin les galeries al frontend
3. Comprova que la galeria lightbox funcioni correctament
4. Assegura't que les imatges es carreguin correctament