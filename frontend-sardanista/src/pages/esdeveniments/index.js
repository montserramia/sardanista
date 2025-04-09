import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Grid, Card, CardMedia, CardContent } from "@mui/material";
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import DefaultFooter from "examples/Footers/DefaultFooter";
import routes from "routes";
import footerRoutes from "footer.routes";

const imatgePerDefecte = "https://placehold.co/400x200?text=Sense+imatge";

export default function Esdeveniments() {
  const [esdeveniments, setEsdeveniments] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/jsonapi/node/esdeveniment")
      .then(async (response) => {
        const events = await Promise.all(
          response.data.data.map(async (item) => {
            let imageUrl = null;

            if (item.relationships.field_imatge?.data?.id) {
              const imageId = item.relationships.field_imatge.data.id;
              try {
                const imageRes = await axios.get(
                  `http://localhost:8080/jsonapi/file/file/${imageId}`
                );
                imageUrl = imageRes.data.data.attributes.uri.url;
              } catch (error) {
                console.error("Error carregant imatge:", error);
              }
            }

            return {
              id: item.id,
              title: item.attributes.title,
              lloc: item.attributes.field_lloc,
              dataInici: item.attributes.field_data_inici,
              imageUrl,
            };
          })
        );
        setEsdeveniments(events);
      })
      .catch((error) => {
        console.error("Error carregant esdeveniments:", error);
      });
  }, []);

  return (
    <>
      <DefaultNavbar routes={routes} transparent light />

      {/* Hero amb imatge de fons */}
      <MKBox
        minHeight="45vh"
        width="100%"
        sx={{
          backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
            `${linearGradient(
              rgba(gradients.info.main, 0.6),
              rgba(gradients.info.state, 0.6)
            )}, url('/img/header-event.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "grid",
          placeItems: "center",
        }}
      >
        <MKTypography variant="h2" color="white">
          Esdeveniments
        </MKTypography>
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
            <Grid container spacing={4}>
              {esdeveniments.map((event) => (
                <Grid item key={event.id} xs={12} sm={6} md={4}>
                  <Card>
                    <CardMedia
                      component="img"
                      height="200"
                      image={`http://localhost:8080${event.imageUrl || ""}` || imatgePerDefecte}
                      alt={event.title}
                    />
                    <CardContent>
                      <MKTypography variant="h5" gutterBottom>
                        {event.title}
                      </MKTypography>
                      <MKTypography variant="body2" color="text">
                        📅{" "}
                        {new Date(event.dataInici).toLocaleString("ca-ES", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </MKTypography>
                      <MKTypography variant="body2" color="text">
                        📍 {event.lloc || "Lloc no especificat"}
                      </MKTypography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </MKBox>
      </Card>

      <MKBox pt={6} px={1} mt={6}>
        <DefaultFooter content={footerRoutes} />
      </MKBox>
    </>
  );
}
