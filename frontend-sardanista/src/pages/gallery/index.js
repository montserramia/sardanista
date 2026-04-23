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
import bgImage from "assets/images/bg-sardanistes.jpeg";

// Routes
import routes from "routes";
import footerRoutes from "footer.routes";

function GalleryPage() {
  const [galleries, setGalleries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedGallery, setSelectedGallery] = useState(null);
  const [openLightbox, setOpenLightbox] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Function to fetch galleries from Drupal JSON:API
  const fetchGalleriesFromDrupal = async () => {
    try {
      // Using the correct endpoint as confirmed by the user
      const apiUrl =
        process.env.REACT_APP_DRUPAL_API_URL || "https://admin.sardana.newwweb.cat/jsonapi";
      const response = await fetch(`${apiUrl}/node/galeria`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

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
                // Find the image in included array
                const imgData = data.included?.find(
                  (img) => img.id === imgRef.id && img.type === "file--file"
                );

                // Handle both cases: when image is in included and when we have to use meta data
                let imageUrl = "";
                let altText = imgRef.meta?.alt || `Imatge de galeria ${item.attributes.title}`;

                if (imgData) {
                  // Convert public:// to actual file path
                  imageUrl = imgData.attributes.uri.url.replace(
                    "public://",
                    "/sites/default/files/"
                  );

                  // If the site is configured for WebP, we might need to handle that
                  // For now, we'll use the original file path
                  imageUrl = `${window.location.protocol}//${window.location.hostname}${imageUrl}`;

                  // Use the alt text from the image data if available
                  altText = imgData.attributes?.meta?.alt || altText;
                } else if (imgRef.meta) {
                  // If we don't have the full file data in 'included', try to construct the URL from the meta info
                  // In some cases, we might be able to determine the URL from the target_id
                  imageUrl = `${
                    process.env.REACT_APP_DRUPAL_BASE_URL || "https://admin.sardana.newwweb.cat"
                  }/sites/default/files/${imgRef.meta.filename}`;
                }

                return {
                  id: imgData?.id || imgRef.id,
                  url: imageUrl,
                  alt: altText,
                };
              })
              .filter(
                (img) =>
                  img.url &&
                  img.url !==
                    `${
                      process.env.REACT_APP_DRUPAL_BASE_URL || "https://admin.sardana.newwweb.cat"
                    }/sites/default/files/`
              ) || [], // Filter out any invalid images
        }))
        .filter((gallery) => gallery.images.length > 0); // Filter out galleries without images

      setGalleries(processedGalleries);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching galleries:", err);
      setError(`Error carregant galeries: ${err.message}`);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGalleriesFromDrupal();
  }, []);

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
        minHeight="75vh"
        width="100%"
        sx={{
          backgroundImage: `linear-gradient(to bottom, rgba(3, 22, 99, 0.1), rgba(3, 22, 99, 0.4)), url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "grid",
          placeItems: "center",
        }}
      >
        <Container>
          <Grid container item xs={12} lg={7} justifyContent="center" mx="auto">
            <MKTypography
              variant="h1"
              color="white"
              mt={-6}
              mb={1}
              textAlign="center"
              sx={({ breakpoints, typography: { size } }) => ({
                textShadow: "2px 2px 4px rgba(3, 22, 99, 0.8)",
                [breakpoints.down("md")]: {
                  fontSize: size["3xl"],
                },
              })}
            >
              Galeria de Fotos
            </MKTypography>
            <MKTypography
              variant="body1"
              color="white"
              textAlign="center"
              px={{ xs: 6, lg: 12 }}
              mt={1}
            >
              Descobreix els nostres moments més especials
            </MKTypography>
          </Grid>
        </Container>
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
          <MKTypography variant="h2" textAlign="center" mb={6}>
            Les nostres galeries
          </MKTypography>

          {galleries.length === 0 ? (
            <MKBox display="flex" justifyContent="center" alignItems="center" py={6}>
              <MKTypography variant="h5">Encara no hi ha galeries disponibles</MKTypography>
            </MKBox>
          ) : (
            <Grid container spacing={4}>
              {galleries.map((gallery) => (
                <Grid item xs={12} md={6} lg={4} key={gallery.id}>
                  <MKBox
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    onClick={() => openGallery(gallery)}
                    sx={{ cursor: "pointer" }}
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
                    />
                    <MKTypography variant="h5" fontWeight="bold" textAlign="center">
                      {gallery.title}
                    </MKTypography>
                    <MKTypography variant="body2" color="text" textAlign="center">
                      {gallery.description}
                    </MKTypography>
                    <MKTypography variant="caption" color="info" fontWeight="bold" mt={1}>
                      {gallery.images.length} imatges
                    </MKTypography>
                  </MKBox>
                </Grid>
              ))}
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
                maxWidth="100%"
                maxHeight="90vh"
                sx={{ objectFit: "contain", margin: "0 auto" }}
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
                <MKTypography variant="body2">
                  {currentImageIndex + 1} de {selectedGallery.images.length}:{" "}
                  {selectedGallery.title}
                </MKTypography>
              </MKBox>
              <MKBox
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: 0,
                  right: 0,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  px: 2,
                  transform: "translateY(-50%)",
                }}
              >
                <MKButton
                  onClick={goToPreviousImage}
                  variant="gradient"
                  color="info"
                  size="large"
                  circular
                  iconOnly
                  sx={{ minWidth: "auto", width: "50px", height: "50px" }}
                >
                  <i className="fas fa-chevron-left" />
                </MKButton>
                <MKButton
                  onClick={goToNextImage}
                  variant="gradient"
                  color="info"
                  size="large"
                  circular
                  iconOnly
                  sx={{ minWidth: "auto", width: "50px", height: "50px" }}
                >
                  <i className="fas fa-chevron-right" />
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
                sx={{ color: "white", background: "rgba(0,0,0,0.6)" }}
              >
                <i className="fas fa-times" />
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
