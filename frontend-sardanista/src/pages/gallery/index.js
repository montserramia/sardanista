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
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKButton from "components/MKButton";

// Material Kit 2 React examples
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import DefaultFooter from "examples/Footers/DefaultFooter";

// Gallery images
import bgImage from "assets/images/nouCollage.jpg";

// Routes
import routes from "routes";
import footerRoutes from "footer.routes";

function GalleryPage() {
  const location = useLocation();
  const [galleries, setGalleries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedGallery, setSelectedGallery] = useState(null);
  const [openLightbox, setOpenLightbox] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  {
    /* Navbar flotant */
  }
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
  </MKBox>;

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
          setCurrentImageIndex(0);
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
    setCurrentImageIndex(0);
    setOpenLightbox(true);
  };

  const closeLightbox = () => {
    setOpenLightbox(false);
    setSelectedGallery(null);
  };

  const goToPreviousImage = () => {
    if (selectedGallery && currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    } else if (selectedGallery) {
      setCurrentImageIndex(selectedGallery.images.length - 1);
    }
  };

  const goToNextImage = () => {
    if (selectedGallery && currentImageIndex < selectedGallery.images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    } else if (selectedGallery) {
      setCurrentImageIndex(0);
    }
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
        <DefaultNavbar routes={routes} />
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
            Galeria de Fotos
          </MKTypography>
          <MKTypography
            variant="body3"
            color="white"
            sx={{ textShadow: "2px 2px 8px rgba(0,0,0,0.7)" }}
          >
            Descobreix els nostres moments més especials
          </MKTypography>
        </MKBox>
      </MKBox>
      <Card
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
            <Grid container spacing={4}>
              {galleries.map((gallery) => {
                // Genera el slug de la galeria
                const gallerySlug = gallery.title.toLowerCase().replace(/\s+/g, "-");
                const galleryUrl = `${window.location.origin}/galeria/${gallerySlug}`;
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
                      <MKBox mt={2} width="100%" display="flex" justifyContent="center">
                        <input
                          type="text"
                          value={galleryUrl}
                          readOnly
                          style={{
                            width: "1px",
                            height: "1px",
                            opacity: 0,
                            position: "absolute",
                            left: "-9999px",
                          }}
                          id={`gallery-url-${gallery.id}`}
                        />
                        <MKButton
                          variant="outlined"
                          color="info"
                          size="small"
                          onClick={() => {
                            const input = document.getElementById(`gallery-url-${gallery.id}`);
                            input.select();
                            document.execCommand("copy");
                          }}
                        >
                          Veure la galeria
                        </MKButton>
                      </MKBox>
                    </MKBox>
                  </Grid>
                );
              })}
            </Grid>
          )}
        </Container>
      </Card>

      {/* Lightbox Modal */}
      <Dialog
        open={openLightbox}
        onClose={closeLightbox}
        fullScreen
        PaperProps={{
          style: {
            backgroundColor: "rgba(0, 0, 0, 0.9)",
            boxShadow: "none",
          },
        }}
      >
        {selectedGallery && (
          <>
            <DialogContent sx={{ p: 0, textAlign: "center" }}>
              <MKBox
                component="img"
                src={selectedGallery.images[currentImageIndex]?.url}
                alt={selectedGallery.images[currentImageIndex]?.alt}
                sx={{
                  width: { xs: "100vw", sm: "auto" },
                  maxWidth: { xs: "100vw", sm: "90vw" },
                  maxHeight: { xs: "60vh", sm: "80vh" },
                  objectFit: "contain",
                  margin: "0 auto",
                  display: "block",
                  borderRadius: "8px",
                  background: "#222",
                }}
              />
              <MKBox
                sx={{
                  position: "absolute",
                  top: "20px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  color: "white",
                  background: "rgba(0,0,0,0.6)",
                  padding: "5px 15px",
                  borderRadius: "20px",
                }}
              >
                <MKTypography variant="body2" color="white">
                  {currentImageIndex + 1} de {selectedGallery.images.length}:{" "}
                  {selectedGallery.title}
                </MKTypography>
              </MKBox>
              <MKBox
                sx={{
                  position: "absolute",
                  top: { xs: "auto", sm: "50%" },
                  bottom: { xs: 10, sm: "auto" },
                  left: 0,
                  right: 0,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  px: 2,
                  transform: { xs: "none", sm: "translateY(-50%)" },
                  width: "100%",
                  zIndex: 2,
                }}
              >
                <MKButton
                  onClick={goToPreviousImage}
                  variant="gradient"
                  color="info"
                  size="large"
                  circular
                  iconOnly
                  sx={{
                    minWidth: "auto",
                    width: { xs: "40px", sm: "60px" },
                    height: { xs: "40px", sm: "60px" },
                    mr: 2,
                    boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
                    "&:hover": {
                      transform: "scale(1.1)",
                      transition: "transform 0.2s ease",
                    },
                  }}
                >
                  <i
                    className="fas fa-chevron-left"
                    style={{ fontSize: "1.2rem", color: "white" }}
                  />
                </MKButton>
                <MKButton
                  onClick={goToNextImage}
                  variant="gradient"
                  color="info"
                  size="large"
                  circular
                  iconOnly
                  sx={{
                    minWidth: "auto",
                    width: { xs: "40px", sm: "60px" },
                    height: { xs: "40px", sm: "60px" },
                    ml: 2,
                    boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
                    "&:hover": {
                      transform: "scale(1.1)",
                      transition: "transform 0.2s ease",
                    },
                  }}
                >
                  <i
                    className="fas fa-chevron-right"
                    style={{ fontSize: "1.2rem", color: "white" }}
                  />
                </MKButton>
              </MKBox>
              <MKBox
                sx={{
                  position: "absolute",
                  bottom: "20px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  display: "flex",
                  gap: 1,
                }}
              >
                {selectedGallery.images.map((image, index) => (
                  <MKBox
                    key={image.id}
                    component="img"
                    src={image.url}
                    alt={`Miniatura ${index + 1}`}
                    width="60px"
                    height="60px"
                    sx={{
                      objectFit: "cover",
                      border: index === currentImageIndex ? "3px solid #4285f4" : "1px solid #fff",
                      opacity: index === currentImageIndex ? 1 : 0.6,
                      cursor: "pointer",
                      borderRadius: "4px",
                    }}
                    onClick={() => setCurrentImageIndex(index)}
                  />
                ))}
              </MKBox>
            </DialogContent>
            <MKBox
              sx={{
                position: "absolute",
                top: "20px",
                right: "20px",
              }}
            >
              {" "}
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
