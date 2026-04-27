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
import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKButton from "components/MKButton";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import DefaultFooter from "examples/Footers/DefaultFooter";
import routes from "routes";
import footerRoutes from "footer.routes";
import bgImage from "assets/images/nouCollage.jpg";

// Igual que titleToSlug a GalleryDetail.js — han de ser idèntiques
function titleToSlug(title) {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

function GalleryPage() {
  const navigate = useNavigate();
  const [galleries, setGalleries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

        const processedGalleries = data.data
          .map((item) => ({
            id: item.id,
            title: item.attributes.title,
            slug: titleToSlug(item.attributes.title),
            description: item.attributes.field_description?.processed || "",
            images:
              item.relationships.field_images?.data
                ?.map((imgRef) => ({
                  id: imgRef?.id,
                  url: imgRef?.id && imageMap[imgRef.id] ? imageMap[imgRef.id] : null,
                  alt: imgRef?.meta?.alt || `Imatge de ${item.attributes.title}`,
                }))
                .filter((img) => img.url) || [],
          }))
          .filter((g) => g.images.length > 0);

        setGalleries(processedGalleries);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error carregant galeries:", err);
        setError(`Error carregant les galeries: ${err.message}`);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <MKBox display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <MKTypography variant="h5">Carregant galeries...</MKTypography>
      </MKBox>
    );
  }

  if (error) {
    return (
      <MKBox display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
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
        <MKBox textAlign="center" px={3}>
          <MKTypography
            variant="h2"
            color="white"
            sx={{ textShadow: "2px 2px 8px rgba(0,0,0,0.7)" }}
          >
            Galeria d&apos;imatges
          </MKTypography>
          <MKTypography
            variant="body1"
            color="white"
            mt={1}
            sx={{ textShadow: "2px 2px 8px rgba(0,0,0,0.7)" }}
          >
            Recull de fotografies dels actes i activitats de l&apos;Agrupació Sardanista de
            Castelldefels.
          </MKTypography>
        </MKBox>
      </MKBox>

      <Card
        sx={{
          p: 2,
          mx: { xs: 2, lg: 3 },
          mt: -8,
          mb: 4,
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
              {galleries.map((gallery) => (
                <Grid item xs={12} md={6} lg={4} key={gallery.id}>
                  <MKBox
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    sx={{ cursor: "pointer" }}
                    onClick={() => navigate(`/galeria/${gallery.slug}`)}
                  >
                    <MKBox
                      component="img"
                      src={gallery.images[0]?.url}
                      alt={gallery.title}
                      borderRadius="lg"
                      shadow="lg"
                      width="100%"
                      sx={{
                        objectFit: "cover",
                        aspectRatio: "4 / 3",
                        mb: 2,
                        transition: "transform 0.2s ease, box-shadow 0.2s ease",
                        "&:hover": {
                          transform: "scale(1.02)",
                          boxShadow: "0 12px 32px rgba(0,0,0,0.18)",
                        },
                      }}
                    />
                    <MKTypography variant="h5" fontWeight="bold" textAlign="center">
                      {gallery.title}
                    </MKTypography>
                    {gallery.description && (
                      <MKTypography variant="body2" color="text" textAlign="center" mt={0.5}>
                        <span dangerouslySetInnerHTML={{ __html: gallery.description }} />
                      </MKTypography>
                    )}
                    <MKTypography variant="caption" color="info" fontWeight="bold" mt={1}>
                      {gallery.images.length} imatges
                    </MKTypography>
                    <MKButton
                      variant="gradient"
                      color="info"
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/galeria/${gallery.slug}`);
                      }}
                      sx={{ mt: 2 }}
                    >
                      Veure la galeria
                    </MKButton>
                  </MKBox>
                </Grid>
              ))}
            </Grid>
          )}
        </Container>
      </Card>

      <MKBox pt={6} px={1} mt={6}>
        <DefaultFooter content={footerRoutes} />
      </MKBox>
    </>
  );
}

export default GalleryPage;
