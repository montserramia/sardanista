# Galeria API - Documentació

## Endpoint JSON:API

**Base URL (Producció):** `https://admin.sardana.newwweb.cat`  
**Endpoint:** `GET /jsonapi/node/galeria_item`

**Mètode:** GET  
**CORS:** Habilitat via `services.yml` per als dominis:
- `https://grupsardanistacastelldefels.cat`
- `https://www.grupsardanistacastelldefels.cat`
- `https://sardanista.pages.dev`
- `http://localhost:3000` (desenvolupament)

Documentació CORS: Vegeu [CORS-CONFIG.md](CORS-CONFIG.md)

## Paràmetres Query

### Paginació
- `page[offset]=0` (per defecte: 0)
- `page[limit]=30` (per defecte: 30, màxim 100)

### Filtres
- `filter[field_is_public.value]=1` → només imatges públiques
- `filter[field_categoria.name][operator]=CONTAINS&filter[field_categoria.name][value]=curset` → filtrar per categoria
- `filter[title][operator]=CONTAINS&filter[title][value]=ballada` → cerca per títol

### Include Related Data
- `include=field_categoria` → incluir etiquetes de categoria

## Resposta Esperada

```json
{
  "data": [
    {
      "id": "123",
      "type": "node--galeria_item",
      "attributes": {
        "title": "Ballada d'estiu 2025",
        "field_caption": "Cobla local tocant a la plaça",
        "field_author": "Fotògraf local",
        "field_event_date": "2025-06-10T18:00:00+00:00",
        "field_is_public": true,
        "created": "2025-01-15T10:00:00+00:00",
        "changed": "2025-01-15T10:30:00+00:00",
        "path": {
          "alias": "/galeria/ballada-destiu-2025",
          "pid": null,
          "langcode": "ca"
        }
      },
      "relationships": {
        "field_categoria": {
          "data": [
            {
              "id": "5",
              "type": "taxonomy_term--galeria_categoria"
            }
          ]
        },
        "field_image": {
          "data": {
            "id": "456",
            "type": "file--file",
            "meta": {
              "alt": "Cobla a la plaça",
              "title": "",
              "width": 1920,
              "height": 1280
            }
          }
        }
      }
    }
  ],
  "included": [
    {
      "id": "5",
      "type": "taxonomy_term--galeria_categoria",
      "attributes": {
        "name": "Ballades d'estiu"
      }
    },
    {
      "id": "456",
      "type": "file--file",
      "attributes": {
        "filename": "ballada-2025.jpg",
        "uri": {
          "url": "/sites/default/files/2025-01/ballada-2025.jpg"
        },
        "filesize": 245678,
        "filemime": "image/jpeg"
      }
    }
  ],
  "meta": {
    "count": 125
  },
  "links": {
    "self": "/jsonapi/node/galeria_item?page[offset]=0&page[limit]=30",
    "next": "/jsonapi/node/galeria_item?page[offset]=30&page[limit]=30"
  }
}
```

## Exemple de Crides

### Obtenir 30 imatges públiques
```
GET /jsonapi/node/galeria_item?page[limit]=30&filter[field_is_public.value]=1
```

### Filtrar per categoria "Curset"
```
GET /jsonapi/node/galeria_item?page[limit]=30&filter[field_is_public.value]=1&include=field_categoria&filter[field_categoria.name][operator]=CONTAINS&filter[field_categoria.name][value]=curset
```

### Cercar per títol
```
GET /jsonapi/node/galeria_item?page[limit]=30&filter[field_is_public.value]=1&filter[title][operator]=CONTAINS&filter[title][value]=ballada
```

### Amb paginació
```
GET /jsonapi/node/galeria_item?page[offset]=30&page[limit]=30&filter[field_is_public.value]=1
```

## Notes de Privacitat

- **Només imatges públiques:** L'endpoint sempre filtra `field_is_public=1`, evitant exposar imatges no autoritzades.
- **Sense metadades EXIF:** JSON:API per defecte no exposa EXIF; les dimensions venen del camp `meta` del fitxer.
- **URL segura:** Retorna l'URL pública estàndard, sense paths interns.
- **Consentiment:** Cada imatge té el flag `field_is_public` que l'administrador pot marcar. Implementar botó de retirada/contacte al frontend si cal.

## Configuració Drupal Requerida

1. **JSON:API ja habilitat** (`core.extension.yml` actualitzat)
2. **Vocabulari de categories:** `galeria_categoria` amb etiquetes (Ballades d'estiu, Curset, Actuacions, ...)
3. **Credentials/CORS:** Si el frontend està en domini diferent, afegir `cors` module o configurar al servidor.

## TODO Frontend

- Hook `useJustifiedLayout(images)` → calcula files i posicions
- Component `<Gallery>` amb lazy-load, placeholders i aspect-ratio box
- Filtres per categoria + cerca per títol, preservant estat a URL
- Lightbox amb navegació (←/→), zoom, swipe, ESC per tancar
- Text d'avís de privacitat i botó de contacte per retirada
- Infinite scroll o paginació "Carrega més"

---

**Última actualització:** 17 de desembre del 2025
