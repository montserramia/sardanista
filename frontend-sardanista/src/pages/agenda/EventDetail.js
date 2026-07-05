import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKButton from "components/MKButton";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import DefaultFooter from "examples/Footers/DefaultFooter";
import routes from "routes";
import footerRoutes from "footer.routes";
import bgImage from "assets/images/sardana/mans.jpg";

function parseLlocAmbEnllac(lloc) {
  if (!lloc) return { label: "Lloc no especificat", url: null };

  const text = lloc.trim();
  const match = text.match(/https?:\/\/\S+/i);

  if (!match) return { label: text, url: null };

  const url = match[0];
  const label = text.replace(/\s*[-–—]?\s*https?:\/\/\S+/i, "").trim() || "Ubicació";

  return { label, url };
}

function EventDetail() {
  const { slug } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const API_BASE = process.env.REACT_APP_API_BASE;

    axios
      .get(`${API_BASE}/jsonapi/node/esdeveniment`, {
        params: {
          "filter[field_slug]": slug,
          include: "field_imatge",
          sort: "-changed",
          "page[limit]": 1,
          _: Date.now(),
        },
      })
      .then((res) => {
        const node = res.data.data[0];

        if (!node) {
          setEvent(null);
          return;
        }

        const fileId = node.relationships?.field_imatge?.data?.id;
        const imageFile = res.data.included?.find(
          (item) => item.type === "file--file" && item.id === fileId
        );
        const imageUri = imageFile?.attributes?.uri?.url;
        const imageUrl = imageUri
          ? imageUri.startsWith("http")
            ? imageUri
            : `${API_BASE}${imageUri}`
          : bgImage;

        setEvent({
          title: node.attributes.title,
          body: node.attributes.body?.processed || "Contingut no disponible",
          lloc: node.attributes.field_lloc,
          dataInici: node.attributes.field_data_inici,
          image: imageUrl,
        });
      })
      .catch((err) => {
        console.error("Error carregant esdeveniment:", err);
        setEvent(null);
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <MKTypography>Carregant...</MKTypography>;
  if (!event) return <MKTypography>Esdeveniment no trobat</MKTypography>;

  const lloc = parseLlocAmbEnllac(event.lloc);

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

      <MKBox
        minHeight="60vh"
        width="100%"
        sx={{
          backgroundImage: `url(${event.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "grid",
          placeItems: "center",
        }}
      >
        <MKBox sx={{ px: 3, py: 2, borderRadius: "lg" }}>
          <MKTypography
            variant="h2"
            color="white"
            textAlign="center"
            sx={{ textShadow: "2px 2px 8px rgba(0,0,0,0.7)" }}
          >
            {event.title}
          </MKTypography>
        </MKBox>
      </MKBox>

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
            <Grid container justifyContent="center">
              <Grid item xs={12} md={10}>
                <MKBox mb={2}>
                  <MKButton
                    component={Link}
                    to="/agenda"
                    variant="outlined"
                    color="info"
                    size="small"
                  >
                    Tornar a l&apos;agenda
                  </MKButton>
                </MKBox>

                <CardContent>
                  <MKTypography variant="body2" color="text" mb={1}>
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
                  <MKTypography variant="body2" color="text" mb={3}>
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

                  <div
                    dangerouslySetInnerHTML={{ __html: event.body }}
                    style={{
                      fontSize: "1.125rem",
                      lineHeight: 1.8,
                      color: "#444",
                    }}
                  />
                </CardContent>
              </Grid>
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

export default EventDetail;
