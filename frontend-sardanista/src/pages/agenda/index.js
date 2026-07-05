import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Container, Grid, Card, CardMedia, CardContent } from "@mui/material";
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKButton from "components/MKButton";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import DefaultFooter from "examples/Footers/DefaultFooter";
import routes from "routes";
import footerRoutes from "footer.routes";
import bgImage from "assets/images/sardana/mans.jpg";

const imatgePerDefecte = "https://placehold.co/400x200?text=Sense+imatge";

const imatgeCardSx = {
  width: "100%",
  height: 200,
  objectFit: "cover",
  display: "block",
};

function parseLlocAmbEnllac(lloc) {
  if (!lloc) return { label: "Lloc no especificat", url: null };

  const text = lloc.trim();
  const match = text.match(/https?:\/\/\S+/i);

  if (!match) return { label: text, url: null };

  const url = match[0];
  const label = text.replace(/\s*[-–—]?\s*https?:\/\/\S+/i, "").trim() || "Ubicació";

  return { label, url };
}

export default function agenda() {
  const [esdeveniments, setagenda] = useState([]);

  useEffect(() => {
    const API_BASE = process.env.REACT_APP_API_BASE;
    axios
      .get(`${API_BASE}/jsonapi/node/esdeveniment`, {
        params: { sort: "field_data_inici" },
      })
      .then(async (response) => {
        const events = await Promise.all(
          response.data.data.map(async (item) => {
            let imageUrl = null;

            if (item.relationships?.field_imatge?.data?.id) {
              const imageId = item.relationships.field_imatge.data.id;
              try {
                const imageRes = await axios.get(`${API_BASE}/jsonapi/file/file/${imageId}`);
                imageUrl = imageRes.data.data.attributes.uri.url;
              } catch (error) {
                console.error("Error carregant imatge:", error);
              }
            }

            return {
              id: item.id,
              title: item.attributes.title,
              slug: item.attributes.field_slug,
              lloc: item.attributes.field_lloc,
              dataInici: item.attributes.field_data_inici,
              imageUrl,
            };
          })
        );

        const sortedEvents = events.sort(
          (a, b) => new Date(a.dataInici).getTime() - new Date(b.dataInici).getTime()
        );

        const now = new Date();
        const upcomingEvents = sortedEvents.filter((event) => {
          const eventDate = new Date(event.dataInici);
          // Comparar només la data sense hora per incloure esdeveniments del dia actual
          const eventDateOnly = new Date(
            eventDate.getFullYear(),
            eventDate.getMonth(),
            eventDate.getDate()
          );
          const todayDateOnly = new Date(now.getFullYear(), now.getMonth(), now.getDate());

          return eventDateOnly >= todayDateOnly;
        });

        setagenda(upcomingEvents);
      })
      .catch((error) => {
        console.error("Error carregant esdeveniments:", error);
      });
  }, []);

  return (
    <>
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
            Agenda
          </MKTypography>
          <MKTypography
            variant="body3"
            color="white"
            sx={{ textShadow: "2px 2px 8px rgba(0,0,0,0.7)" }}
          >
            Ballades, àplecs i trobades sardanistes.
          </MKTypography>
          <MKBox mt={2} textAlign="center">
            <MKButton component={Link} to="/calendari" variant="gradient" color="info" size="small">
              Porta&apos;m al calendari
            </MKButton>
          </MKBox>
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
        <MKBox component="section" py={3}>
          <Container>
            <Grid container spacing={4}>
              {esdeveniments.map((event) => (
                <Grid item key={event.id} xs={12} sm={6} md={4}>
                  <Card>
                    {event.slug ? (
                      <MKBox
                        component={Link}
                        to={`/agenda/${event.slug}`}
                        sx={{ display: "block", lineHeight: 0, width: "100%" }}
                      >
                        <CardMedia
                          component="img"
                          height="200"
                          sx={imatgeCardSx}
                          image={
                            event.imageUrl
                              ? event.imageUrl.startsWith("http")
                                ? event.imageUrl
                                : `${process.env.REACT_APP_API_BASE}${event.imageUrl}`
                              : imatgePerDefecte
                          }
                          alt={event.title}
                        />
                      </MKBox>
                    ) : (
                      <CardMedia
                        component="img"
                        height="200"
                        sx={imatgeCardSx}
                        image={
                          event.imageUrl
                            ? event.imageUrl.startsWith("http")
                              ? event.imageUrl
                              : `${process.env.REACT_APP_API_BASE}${event.imageUrl}`
                            : imatgePerDefecte
                        }
                        alt={event.title}
                      />
                    )}
                    <CardContent>
                      {(() => {
                        const lloc = parseLlocAmbEnllac(event.lloc);

                        return (
                          <>
                            {event.slug ? (
                              <MKTypography
                                component={Link}
                                to={`/agenda/${event.slug}`}
                                variant="h5"
                                gutterBottom
                                sx={{ textDecoration: "none", color: "inherit" }}
                              >
                                {event.title}
                              </MKTypography>
                            ) : (
                              <MKTypography variant="h5" gutterBottom>
                                {event.title}
                              </MKTypography>
                            )}
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
                              📍 {lloc.label}
                              {lloc.url && (
                                <>
                                  {" - "}
                                  <MKBox
                                    component="a"
                                    href={lloc.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    sx={{ color: "info.main", textDecoration: "underline" }}
                                  >
                                    Obrir mapa
                                  </MKBox>
                                </>
                              )}
                            </MKTypography>
                          </>
                        );
                      })()}
                      {event.slug && (
                        <MKBox mt={2}>
                          <MKButton
                            component={Link}
                            to={`/agenda/${event.slug}`}
                            variant="text"
                            size="small"
                            color="info"
                          >
                            Veure esdeveniment
                          </MKButton>
                        </MKBox>
                      )}
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
