# Galeria d'Imatges - Configuració del Tipus de Contingut a Drupal

## 1. Crear el Tipus de Contingut "Galeria"

1. Anar a Structure > Content Types > Add content type
2. Omplir els camps:
   - Name: "Galeria"
   - Description: "Contingut per a galeries d'imatges"
3. Guardar

## 2. Afegir camps al tipus de contingut

### Camp de títol
- Ja creat automàticament

### Camp d'imatges (multiple)
1. Anar a Structure > Content Types > Galeria > Manage Fields
2. Afegir camp:
   - Label: "Imatges"
   - Field name: field_images
   - Type: Image
   - Number of values: Unlimited
3. Configurar:
   - Allowed file extensions: png, gif, jpg, jpeg
   - Maximum file size: 5 MB
   - Alt and Title fields: Required
   - Width and height restrictions: None

### Camp de descripció
1. Anar a Structure > Content Types > Galeria > Manage Fields
2. Afegir camp:
   - Label: "Descripció"
   - Field name: field_description
   - Type: Text (formatted, long)
   - Widget: Textarea

### Camp de categoria
1. Anar a Structure > Content Types > Galeria > Manage Fields
2. Afegir camp:
   - Label: "Categoria"
   - Field name: field_category
   - Type: List (text)
   - Widget: Select list
   - Number of values: 1
   - Allowed values:
     ```
     events|Esdeveniments
     activities|Activitats
     members|Societat
     performances|Actuacions
     rehearsals|Assajos
     ```

## 3. Configurar la visualització (Display)

Anar a Structure > Content Types > Galeria > Manage Display

### Vista per defecte (Full content)
- Titular: Visible, format: Large
- field_images: Visible, format: Image (scale to 800x600), multiple: Display all values
- field_description: Visible, format: Default
- field_category: Visible, format: Default

### Vista resumida (Teaser)
- Titular: Visible, format: Medium
- field_images: Visible, format: Image (scale to 300x200), multiple: First value only
- field_description: Visible, format: Summary or trimmed
- field_category: Visible, format: Default

## 4. Crear contingut de prova

Crear un contingut de tipus "Galeria" amb:
- Títol: "Actuació de Nadal"
- Descripció: "Fotografies de la nostra actuació de Nadal"
- Categoria: events
- 5-10 imatges com a mínim

## 5. Exposar les galeries via JSON:API

1. Assegurar-se que el mòdul JSON:API està habilitat
2. Anar a Structure > JSON:API > Resources
3. Activar el recurs per a "node--gallery" (node--galeria)
4. Verificar que es pot accedir a les galeries a través de:
   - GET /jsonapi/node/gallery