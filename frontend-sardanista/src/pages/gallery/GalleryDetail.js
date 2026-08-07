import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKButton from "components/MKButton";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import DefaultFooter from "examples/Footers/DefaultFooter";
import routes from "routes";
import footerRoutes from "footer.routes";
import SEO from "components/SEO";
// Ja no cal importar bgImage perquè el farem dinàmic
// import bgImage from "assets/images/sardana/Collage-galeria.jpg";

// Helper per normalitzar el títol a slug (igual que generateGallerySlug)
function titleToSlug(title) {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // elimina accents
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

function GalleryDetail() {
  const { gallerySlug } = useParams();
  const navigate = useNavigate();

  const [gallery, setGallery] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [heroImage, setHeroImage] = useState(null); // ← NOU: estat per la imatge de fons

  // Lightbox
  const [openLightbox, setOpenLightbox] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const API_BASE = process.env.REACT_APP_API_BASE;

    fetch(`${API_BASE}/jsonapi/node/galeria?include=field_images,field_images.field_media_image`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        const included = data.included || [];

        // Mapa fileId -> URL
        const fileMap = {};
        included.forEach((item) => {
          if (item.type === "file--file") {
            const rawUrl = item.attributes.uri.url;
            fileMap[item.id] = rawUrl.startsWith("http") ? rawUrl : `${API_BASE}${rawUrl}`;
          }
        });

        // Mapa mediaId -> URL (via field_media_image)
        const imageMap = {};
        included.forEach((item) => {
          if (item.type === "media--image") {
            const fileRef = item.relationships?.field_media_image?.data;
            if (fileRef && fileMap[fileRef.id]) {
              imageMap[item.id] = fileMap[fileRef.id];
            }
          }
        });

        // Buscar la galeria que coincideixi amb el slug de la URL
        const found = data.data.find((item) => {
          return titleToSlug(item.attributes.title) === gallerySlug;
        });

        if (!found) {
          setError("Galeria no trobada");
          setLoading(false);
          return;
        }

        const images =
          found.relationships.field_images?.data
            ?.map((imgRef) => ({
              id: imgRef?.id,
              url: imgRef?.id && imageMap[imgRef.id] ? imageMap[imgRef.id] : null,
              alt: imgRef?.meta?.alt || `Imatge de ${found.attributes.title}`,
            }))
            .filter((img) => img.url) || [];

        // ← NOU: La primera imatge és la portada / hero
        const coverImage = images.length > 0 ? images[0] : null;

        setGallery({
          id: found.id,
          title: found.attributes.title,
          description: found.attributes.field_description?.processed || "",
          images,
          coverImage, // ← Guardem la portada
        });

        // ← NOU: Establim la imatge de fons de l'hero
        if (coverImage) {
          setHeroImage(coverImage.url);
        }

        setLoading(false);
      })
      .catch((err) => {
        console.error("Error carregant la galeria:", err);
        setError(`Error carregant la galeria: ${err.message}`);
        setLoading(false);
      });
  }, [gallerySlug]);

  const openImage = (index) => {
    setCurrentIndex(index);
    setOpenLightbox(true);
  };

  const closeLightbox = () => setOpenLightbox(false);

  const goToPrev = () =>
    setCurrentIndex((prev) => (prev === 0 ? gallery.images.length - 1 : prev - 1));

  const goToNext = () =>
    setCurrentIndex((prev) => (prev === gallery.images.length - 1 ? 0 : prev + 1));

  // Navegació amb teclat
  useEffect(() => {
    if (!openLightbox) return;
    const handleKey = (e) => {
      if (e.key === "ArrowLeft") goToPrev();
      if (e.key === "ArrowRight") goToNext();
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [openLightbox, gallery]);

  if (loading) {
    return (
      <>
        <MKBox position="fixed" top="0.5rem" width="100%" zIndex={999}>
          <DefaultNavbar routes={routes} />
        </MKBox>
        <MKBox display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
          <MKTypography variant="h5">Carregant galeria...</MKTypography>
        </MKBox>
      </>
    );
  }

  if (error || !gallery) {
    return (
      <>
        <MKBox position="fixed" top="0.5rem" width="100%" zIndex={999}>
          <DefaultNavbar routes={routes} />
        </MKBox>
        <MKBox
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          minHeight="80vh"
          gap={2}
        >
          <MKTypography variant="h5" color="error">
            {error || "Galeria no trobada"}
          </MKTypography>
          <MKButton variant="gradient" color="info" onClick={() => navigate("/galeria")}>
            Tornar a les galeries
          </MKButton>
        </MKBox>
      </>
    );
  }

  return (
    <>
      <SEO
        title={`${gallery.title} | Galeria | Grup Sardanista Castelldefels`}
        description={`Galeria d'imatges de ${gallery.title}. ${gallery.images.length} fotografies de l'activitat.`}
        image={heroImage || undefined}
        canonical={`/galeria/${gallerySlug}`}
      />

      <MKBox position="fixed" top="0.5rem" width="100%" zIndex={999}>
        <DefaultNavbar
          routes={routes}
          action={{
            type: "internal",
            route: "/contacte",
            label: "Contacta'ns",
            color: "info",
          }}
        />
      </MKBox>

      {/* Hero - Ara amb la imatge de portada com a fons */}
      <MKBox
        minHeight="60vh"
        width="100%"
        sx={{
          backgroundImage: heroImage
            ? ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
                `${linearGradient(
                  rgba(gradients.info.main, 0.1),
                  rgba(gradients.info.state, 0.1)
                )}, url(${heroImage})`
            : ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
                `${linearGradient(
                  rgba(gradients.info.main, 0.1),
                  rgba(gradients.info.state, 0.1)
                )}`, // Fallback si no hi ha imatge
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "grid",
          placeItems: "center",
        }}
      >
        <MKBox textAlign="center" px={3}>
          <MKTypography
            variant="h2"
            color="white"
            sx={{ textShadow: "2px 2px 8px rgba(0,0,0,0.7)" }}
          >
            {gallery.title}
          </MKTypography>
          <MKTypography
            variant="caption"
            color="white"
            mt={1}
            display="block"
            sx={{ textShadow: "1px 1px 4px rgba(0,0,0,0.7)" }}
          >
            {gallery.images.length} imatges
          </MKTypography>
        </MKBox>
      </MKBox>

      {/* Contingut principal */}
      <Card
        sx={{
          p: 3,
          mx: { xs: 2, lg: 3 },
          mt: -8,
          mb: 6,
          boxShadow: ({ boxShadows: { xxl } }) => xxl,
        }}
      >
        <MKBox py={2} px={1} mb={2} display="flex" alignItems="center" gap={2}>
          <MKButton
            variant="outlined"
            color="info"
            size="small"
            onClick={() => navigate("/galeria")}
          >
            ← Tornar a les galeries
          </MKButton>
        </MKBox>

        {gallery.description && (
          <MKBox px={1} mb={3}>
            <MKTypography variant="body1" color="text" component="div">
              <span dangerouslySetInnerHTML={{ __html: gallery.description }} />
            </MKTypography>
          </MKBox>
        )}

        <Container>
          <Grid container spacing={2}>
            {gallery.images.map((image, index) => (
              <Grid item xs={6} sm={4} md={3} key={image.id || index}>
                <MKBox
                  component="img"
                  src={image.url}
                  alt={image.alt}
                  borderRadius="lg"
                  shadow="md"
                  width="100%"
                  sx={{
                    objectFit: "cover",
                    aspectRatio: "1 / 1",
                    cursor: "pointer",
                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
                    "&:hover": {
                      transform: "scale(1.03)",
                      boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
                    },
                  }}
                  onClick={() => openImage(index)}
                />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Card>

      {/* Lightbox - sense react-image-gallery, tot manual */}
      <Dialog
        open={openLightbox}
        onClose={closeLightbox}
        fullScreen
        PaperProps={{
          style: {
            backgroundColor: "rgba(0, 0, 0, 0.92)",
            boxShadow: "none",
          },
        }}
      >
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            p: 0,
            height: "100%",
            position: "relative",
          }}
        >
          {/* Botó tancar */}
          <MKBox sx={{ position: "absolute", top: 16, right: 16, zIndex: 10 }}>
            <IconButton
              onClick={closeLightbox}
              sx={{
                color: "white",
                background: "rgba(0,0,0,0.5)",
                "&:hover": { background: "rgba(0,0,0,0.8)" },
              }}
            >
              <i className="fas fa-times" style={{ fontSize: "1.2rem" }} />
            </IconButton>
          </MKBox>

          {/* Comptador */}
          <MKBox
            sx={{
              position: "absolute",
              top: 16,
              left: "50%",
              transform: "translateX(-50%)",
              background: "rgba(0,0,0,0.5)",
              px: 2,
              py: 0.5,
              borderRadius: "20px",
              zIndex: 10,
            }}
          >
            <MKTypography variant="body2" color="white">
              {currentIndex + 1} / {gallery.images.length}
            </MKTypography>
          </MKBox>

          {/* Imatge principal */}
          <MKBox
            component="img"
            src={gallery.images[currentIndex]?.url}
            alt={gallery.images[currentIndex]?.alt}
            sx={{
              maxWidth: "90vw",
              maxHeight: "80vh",
              objectFit: "contain",
              borderRadius: "8px",
            }}
          />

          {/* Alt text */}
          {gallery.images[currentIndex]?.alt && (
            <MKTypography variant="caption" color="white" mt={1} sx={{ opacity: 0.7 }}>
              {gallery.images[currentIndex].alt}
            </MKTypography>
          )}

          {/* Navegació esquerra/dreta */}
          {gallery.images.length > 1 && (
            <>
              <MKBox
                sx={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)" }}
              >
                <IconButton
                  onClick={goToPrev}
                  sx={{
                    color: "white",
                    background: "rgba(0,0,0,0.5)",
                    width: 48,
                    height: 48,
                    "&:hover": { background: "rgba(0,0,0,0.8)" },
                  }}
                >
                  <i className="fas fa-chevron-left" />
                </IconButton>
              </MKBox>
              <MKBox
                sx={{ position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)" }}
              >
                <IconButton
                  onClick={goToNext}
                  sx={{
                    color: "white",
                    background: "rgba(0,0,0,0.5)",
                    width: 48,
                    height: 48,
                    "&:hover": { background: "rgba(0,0,0,0.8)" },
                  }}
                >
                  <i className="fas fa-chevron-right" />
                </IconButton>
              </MKBox>
            </>
          )}

          {/* Miniatures */}
          <MKBox
            sx={{
              position: "absolute",
              bottom: 16,
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              gap: 1,
              maxWidth: "90vw",
              overflowX: "auto",
              pb: 1,
            }}
          >
            {gallery.images.map((img, idx) => (
              <MKBox
                key={img.id || idx}
                component="img"
                src={img.url}
                alt={`Miniatura ${idx + 1}`}
                onClick={() => setCurrentIndex(idx)}
                sx={{
                  width: 56,
                  height: 56,
                  objectFit: "cover",
                  borderRadius: "4px",
                  cursor: "pointer",
                  flexShrink: 0,
                  border:
                    idx === currentIndex ? "3px solid #4285f4" : "2px solid rgba(255,255,255,0.3)",
                  opacity: idx === currentIndex ? 1 : 0.55,
                  transition: "opacity 0.2s, border 0.2s",
                  "&:hover": { opacity: 1 },
                }}
              />
            ))}
          </MKBox>
        </DialogContent>
      </Dialog>

      <MKBox pt={6} px={1} mt={6}>
        <DefaultFooter content={footerRoutes} />
      </MKBox>
    </>
  );
}

export default GalleryDetail;
