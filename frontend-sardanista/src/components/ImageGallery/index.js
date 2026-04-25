import { useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKButton from "components/MKButton";

function ImageGallery({ title, description, images }) {
  const [openLightbox, setOpenLightbox] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openImage = (index) => {
    setCurrentImageIndex(index);
    setOpenLightbox(true);
  };

  const closeLightbox = () => {
    setOpenLightbox(false);
  };

  const goToPreviousImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    } else {
      setCurrentImageIndex(images.length - 1);
    }
  };

  const goToNextImage = () => {
    if (currentImageIndex < images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    } else {
      setCurrentImageIndex(0);
    }
  };

  return (
    <>
      {title && (
        <MKTypography variant="h4" fontWeight="bold" textAlign="center" mb={2}>
          {title}
        </MKTypography>
      )}
      {description && (
        <MKTypography variant="body2" color="text" textAlign="center" mb={4}>
          {description}
        </MKTypography>
      )}

      <Grid container spacing={3}>
        {images.map((image, index) => (
          <Grid item xs={6} md={3} key={image.id || index}>
            <MKBox
              component="img"
              src={image.url}
              alt={image.alt || `Imatge ${index + 1}`}
              borderRadius="lg"
              shadow="md"
              width="100%"
              maxHeight="200px"
              sx={{ objectFit: "cover", cursor: "pointer" }}
              onClick={() => openImage(index)}
            />
          </Grid>
        ))}
      </Grid>

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
        {images.length > 0 && (
          <>
            <DialogContent sx={{ p: 0, textAlign: "center" }}>
              <MKBox
                component="img"
                src={images[currentImageIndex]?.url}
                alt={images[currentImageIndex]?.alt}
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
                  {currentImageIndex + 1} de {images.length}: {title}
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
                {images.map((image, index) => (
                  <MKBox
                    key={image.id || index}
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
    </>
  );
}

export default ImageGallery;
