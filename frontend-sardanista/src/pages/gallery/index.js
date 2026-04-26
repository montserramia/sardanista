/*
=========================================================
* Material Kit 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

// @mui material components
import Container from "@mui/material/Container"; // Used for layout
import Grid from "@mui/material/Grid"; // Used for grid layout
import ImageGallery from "react-image-gallery";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKButton from "components/MKButton";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

// Material Kit 2 React examples
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import DefaultFooter from "examples/Footers/DefaultFooter";

// Gallery images
import bgImage from "assets/images/nouCollage.jpg";

// Routes
import routes from "routes";
import footerRoutes from "footer.routes";

// Helper functions for videos
function getYoutubeId(url) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
}

function getVideoEmbedUrl(url) {
  if (url.includes("youtube.com") || url.includes("youtu.be")) {
    const id = getYoutubeId(url);
    return id ? `https://www.youtube.com/embed/${id}` : url;
  }
  if (url.includes("vimeo.com")) {
    const vimeoId = url.split("/").pop();
    return `https://player.vimeo.com/video/${vimeoId}`;
  }
  return url;
}

function GalleryPage() {
  const location = useLocation();
  const [galleries, setGalleries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedGallery, setSelectedGallery] = useState(null);
  const [openLightbox, setOpenLightbox] = useState(false);
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // Function to fetch galleries from Drupal JSON:API
  const fetchGalleriesFromDrupal = async () => {
    try {
      // Using the same API_BASE as the blog implementation
      const API_BASE = process.env.REACT_APP_API_BASE;

      // Include the related files in the response
      const response = await fetch(`${API_BASE}/jsonapi/node/galeria?include=field_images`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const included = data.included || [];

      // Create a map of file IDs to their URIs
      const imageMap = {};
      included.forEach((item) => {
        if (item.type === "file--file") {
          // Convert public:// to actual file path
          const imageUrl = item.attributes.uri.url.replace("public://", "/sites/default/files/");
          // Construct the full image URL using the API_BASE
          imageMap[item.id] = `${API_BASE}${imageUrl}`;
        }
      });

      // Process the JSON:API response according to our data contract
      const processedGalleries = data.data
        .map((item) => ({
          id: item.id,
          title: item.attributes.title,
          description: item.attributes.field_description?.processed || "",
          category: item.attributes.field_category || "",
          images:
            item.relationships.field_images?.data
              ?.map((imgRef) => {
                // Get the image URL from the image map
                const imageUrl = imgRef?.id && imageMap[imgRef.id] ? imageMap[imgRef.id] : null;

                return {
                  id: imgRef?.id,
                  url: imageUrl,
                  alt: imgRef?.meta?.alt || `Imatge de galeria ${item.attributes.title}`,
                };
              })
              .filter((img) => img.url) || [], // Filter out any invalid images
        }))
        .filter((gallery) => gallery.images.length > 0); // Filter out galleries without images

      setGalleries(processedGalleries);

      // Check if there's a gallery slug in the URL to open automatically
      const pathSegments = location.pathname.split("/");
      if (pathSegments.length >= 3 && pathSegments[1] === "galeria") {
        const gallerySlug = pathSegments[2];
        const galleryToOpen = processedGalleries.find(
          (gallery) => gallery.title.toLowerCase().replace(/\s+/g, "-") === gallerySlug
        );

        if (galleryToOpen) {
          setSelectedGallery(galleryToOpen);
          setOpenLightbox(true);
        }
      }

      setLoading(false);
    } catch (err) {
      console.error("Error fetching galleries:", err);
      setError(`Error carregant galeries: ${err.message}`);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGalleriesFromDrupal();
  }, [location.pathname]);

  const openGallery = (gallery) => {
    setSelectedGallery(gallery);
    setCurrentGalleryIndex(0);
    setOpenLightbox(true);
  };

  const closeLightbox = () => {
    setOpenLightbox(false);
    setSelectedGallery(null);
  };

  if (loading) {
    return (
      <MKBox display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <MKTypography variant="h5">Carregant galeries...</MKTypography>
      </MKBox>
    );
  }

  if (error) {
    return (
      <MKBox display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <MKTypography variant="h5" color="error">
          {error}
        </MKTypography>
      </MKBox>
    );
  }

  return (
    <>
      <MKBox position="fixed" top="0" width="100%" zIndex={999}>
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

      <MKBox
        minHeight="60vh"
        width="100%"
        sx={{
          backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
            `${linearGradient(
              rgba(gradients.info.main, 0.1),
              rgba(gradients.info.state, 0.1)
            )}, url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "grid",
          placeItems: "center",
        }}
      >
        <MKBox>
          <MKTypography
            variant="h2"
            color="white"
            textAlign="center"
            sx={{ textShadow: "2px 2px 8px rgba(0,0,0,0.7)" }}
          >
            Galeria d&apos;imatges
          </MKTypography>
          <MKTypography
            variant="body3"
            color="white"
            sx={{ textShadow: "2px 2px 8px rgba(0,0,0,0.7)" }}
          >
            Recull de fotografies dels actes i activitats realitzades per l&apos;Agrupació
            Sardanista de Castelldefels.
          </MKTypography>
        </MKBox>
      </MKBox>

      <Container>
        <MKBox
          sx={{
            p: 2,
            mx: { xs: 2, lg: 3 },
            mt: -8,
            mb: 4,
            backgroundColor: ({ palette: { white }, functions: { rgba } }) => rgba(white.main, 0.8),
            backdropFilter: "saturate(200%) blur(30px)",
            boxShadow: ({ boxShadows: { xxl } }) => xxl,
          }}
        >
          <Container sx={{ py: 6 }}>
            {galleries.length === 0 ? (
              <MKBox display="flex" justifyContent="center" alignItems="center" py={6}>
                <MKTypography variant="h5">Encara no hi ha galeries disponibles</MKTypography>
              </MKBox>
            ) : (
              <Grid container spacing={3} mt={-12}>
                {/* Adjusted negative margin since we moved the header outside */}
                {galleries.map((gallery) => {
                  return (
                    <Grid item xs={12} md={6} lg={4} key={gallery.id}>
                      <MKBox
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        sx={{ cursor: "pointer", position: "relative" }}
                      >
                        <MKBox
                          component="img"
                          src={gallery.images[0]?.url || bgImage}
                          alt={gallery.title}
                          borderRadius="lg"
                          shadow="lg"
                          width="100%"
                          maxHeight="250px"
                          sx={{ objectFit: "cover", mb: 2 }}
                          onClick={() => openGallery(gallery)}
                        />
                        <MKTypography variant="h5" fontWeight="bold" textAlign="center">
                          {gallery.title}
                        </MKTypography>
                        <MKTypography variant="body2" color="text" textAlign="center">
                          <div dangerouslySetInnerHTML={{ __html: gallery.description }} />
                        </MKTypography>
                        <MKTypography variant="caption" color="info" fontWeight="bold" mt={1}>
                          {gallery.images.length} imatges
                        </MKTypography>
                        <MKButton
                          variant="gradient"
                          color="info"
                          size="small"
                          onClick={() => {
                            const gallerySlug = gallery.title.toLowerCase().replace(/\s+/g, "-");
                            window.history.pushState({}, "", `/galeria/${gallerySlug}`);
                            openGallery(gallery);
                          }}
                          sx={{ mt: 2 }}
                        >
                          Veure la galeria
                        </MKButton>
                      </MKBox>
                    </Grid>
                  );
                })}
              </Grid>
            )}
          </Container>
        </MKBox>
      </Container>

      {/* Lightbox Modal */}
      <Dialog
        open={openLightbox}
        onClose={closeLightbox}
        maxWidth="md"
        fullWidth
        fullScreen
        PaperProps={{
          style: {
            backgroundColor: "transparent",
            boxShadow: "none",
            margin: 0,
          },
        }}
      >
        {selectedGallery && (
          <>
            <DialogContent
              dividers
              sx={{ padding: isMobile ? "10px !important" : "20px !important" }}
            >
              <MKButton
                variant="gradient"
                color="error"
                size="small"
                circular
                onClick={closeLightbox}
                sx={{
                  position: "absolute",
                  top: "20px",
                  left: "20px",
                  zIndex: 9999,
                  minWidth: "40px",
                  height: "40px",
                }}
              >
                Tancar
              </MKButton>
              <MKTypography variant="h4" color="white" mb={2} mt={2}>
                {selectedGallery.title}
              </MKTypography>
              <MKTypography variant="body2" color="white" mb={2}>
                <span dangerouslySetInnerHTML={{ __html: selectedGallery.description }} />
              </MKTypography>
              <MKBox width={isMobile ? "90vw" : "60vw"}>
                <ImageGallery
                  items={selectedGallery.images.map((img) => {
                    // Si la imatge és vídeo (YouTube/Vimeo), afegeix renderItem
                    if (
                      img.url &&
                      (img.url.includes("youtube.com") ||
                        img.url.includes("youtu.be") ||
                        img.url.includes("vimeo.com"))
                    ) {
                      return {
                        thumbnail: `https://img.youtube.com/vi/${getYoutubeId(
                          img.url
                        )}/default.jpg`,
                        original: img.url,
                        renderItem: () => (
                          <div
                            className="video-wrapper"
                            style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}
                          >
                            <iframe
                              src={getVideoEmbedUrl(img.url)}
                              frameBorder="0"
                              allow="autoplay; fullscreen"
                              allowFullScreen
                              title="Vídeo de galeria"
                              style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "100%",
                              }}
                            />
                          </div>
                        ),
                      };
                    }
                    return {
                      original: img.url,
                      thumbnail: img.url,
                      description: img.alt,
                    };
                  })}
                  showPlayButton={false}
                  showFullscreenButton={true}
                  startIndex={currentGalleryIndex}
                  onSlide={(idx) => setCurrentGalleryIndex(idx)}
                  additionalClass="custom-gallery"
                  infinite={true}
                  autoPlay={false}
                />
              </MKBox>
            </DialogContent>
            <MKBox
              sx={{
                position: "absolute",
                top: "20px",
                right: "20px",
              }}
            >
              <IconButton
                aria-label="close"
                onClick={closeLightbox}
                sx={{
                  color: "white",
                  background: "rgba(0,0,0,0.6)",
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  ml: 2,
                  "&:hover": {
                    background: "rgba(0,0,0,0.8)",
                  },
                }}
              >
                <i className="fas fa-times" style={{ fontSize: "1.2rem", color: "white" }} />
              </IconButton>
            </MKBox>
          </>
        )}
      </Dialog>

      <MKBox pt={6} px={1} mt={6}>
        <DefaultFooter content={footerRoutes} />
      </MKBox>
    </>
  );
}

export default GalleryPage;
