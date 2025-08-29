import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Grid, Card, CardMedia, CardContent } from "@mui/material";
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import DefaultFooter from "examples/Footers/DefaultFooter";
import routes from "routes";
import footerRoutes from "footer.routes";

import bgImage from "assets/images/sardana/db/mans.jpeg";

const imatgePerDefecte = "https://placehold.co/400x200?text=Sense+imatge";

export default function Esdeveniments() {
  const [esdeveniments, setEsdeveniments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const API_BASE = process.env.REACT_APP_API_BASE;
    
    console.log('Loading esdeveniments from API_BASE:', API_BASE); // Debug
    
    axios
      .get(`${API_BASE}/jsonapi/node/esdeveniment?include=field_imatge`)
      .then((response) => {
        console.log('Esdeveniments API Response:', response.data); // Debug
        
        const included = response.data.included || [];
        const imageMap = {};

        // Construir mapa d'imatges
        included.forEach((item) => {
          if (item.type === "file--file") {
            console.log('Event image file found:', item); // Debug
            imageMap[item.id] = item.attributes.uri.url;
          }
        });

        console.log('Event image map:', imageMap); // Debug

        const events = response.data.data.map((item) => {
          const imageId = item.relationships?.field_imatge?.data?.id;
          let imageUrl = imatgePerDefecte;
          
          if (imageId && imageMap[imageId]) {
            const rawImageUrl = imageMap[imageId];
            console.log('Raw event image URL from API:', rawImageUrl); // Debug
            
            // Verificar si la URL ja és absoluta
            if (rawImageUrl.startsWith('http://') || rawImageUrl.startsWith('https://')) {
              imageUrl = rawImageUrl;
            } else {
              // Si és relativa, construir URL absoluta amb el path correcte
              // Drupal retorna URLs com "/2025-06/event-image.jpg"
              // Però necessitem "/sites/default/files/2025-06/event-image.jpg"
              const cleanUrl = rawImageUrl.startsWith('/') ? rawImageUrl.substring(1) : rawImageUrl;
              imageUrl = `${API_BASE}/sites/default/files/${cleanUrl}`;
            }
            
            console.log('Final event image URL:', imageUrl); // Debug
          }

          return {
            id: item.id,
            title: item.attributes.title,
            lloc: item.attributes.field_lloc,
            dataInici: item.attributes.field_data_inici,
            imageUrl,
          };
        });

        setEsdeveniments(events);
        setError(null);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error carregant esdeveniments:", error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  // Funció per gestionar errors d'imatges
  const handleImageError = (event, eventId) => {
    console.warn(`Error carregant imatge per esdeveniment ${eventId}`);
    event.target.src = imatgePerDefecte;
  };

  if (loading) {
    return (
      <MKBox display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <MKTypography variant="h4">Carregant esdeveniments...</MKTypography>
      </MKBox>
    );
  }

  if (error) {
    return (
      <MKBox display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <MKTypography variant="h4" color="error">Error: {error}</MKTypography>
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
            route: "/neta",
            label: "Subscriu-te",
            color: "info",
          }}
        />
      </MKBox>

      {/* Hero amb imatge fixe d'esdeveniment */}
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
            Esdeveniments
          </MKTypography>
          <MKTypography
            variant="body3"
            color="white"
            sx={{ textShadow: "2px 2px 8px rgba(0,0,0,0.7)" }}
          >
            Ballades, àplecs i trobades sardanistes.
          </MKTypography>
        </MKBox>
      </MKBox>

      {/* Contingut principal */}
      <Card
        sx={{
          p: 3,
          mx: { xs: 2, lg: 3 },
          mt: -6,
          mb: 6,
          boxShadow: ({ boxShadows: { xxl } }) => xxl,
        }}
      >
        <MKBox component="section" py={3}>
          <Container>
            {esdeveniments.length === 0 ? (
              <MKBox textAlign="center" py={6}>
                <MKTypography variant="h4" color="text">
                  No s'han trobat esdeveniments
                </MKTypography>
              </MKBox>
            ) : (
              <Grid container spacing={4}>
                {esdeveniments.map((event) => (
                  <Grid item key={event.id} xs={12} sm={6} md={4}>
                    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                      <CardMedia
                        component="img"
                        height="200"
                        image={event.imageUrl}
                        alt={event.title}
                        onError={(e) => handleImageError(e, event.id)}
                        sx={{
                          objectFit: 'cover',
                        }}
                      />
                      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                        <MKTypography variant="h5" gutterBottom>
                          {event.title}
                        </MKTypography>
                        <MKTypography variant="body2" color="text" sx={{ mb: 1 }}>
                          📅{" "}
                          {event.dataInici ? new Date(event.dataInici).toLocaleString("ca-ES", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          }) : "Data no especificada"}
                        </MKTypography>
                        <MKTypography variant="body2" color="text">
                          📍 {event.lloc || "Lloc no especificat"}
                        </MKTypography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </Container>
        </MKBox>
      </Card>

      <MKBox pt={6} px={1} mt={6}>
        <DefaultFooter content={footerRoutes} />
      </MKBox>
    </>
  );
}
