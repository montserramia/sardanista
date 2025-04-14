import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import DefaultFooter from "examples/Footers/DefaultFooter";
import routes from "routes";
import footerRoutes from "footer.routes";

function ArticleDetail() {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const API_BASE = "http://localhost:8080";

    axios
      .get(`${API_BASE}/jsonapi/node/article?filter[field_slug]=${slug}&include=field_image`)
      .then((res) => {
        const item = res.data.data?.[0];
        if (!item) throw new Error("Article no trobat");

        const imageUrl = res.data.included?.[0]?.attributes?.uri?.url
          ? `${API_BASE}${res.data.included[0].attributes.uri.url}`
          : "https://source.unsplash.com/random/800x600?culture";

        setArticle({
          title: item.attributes.title,
          body: item.attributes.body?.value || "Contingut no disponible",
          image: imageUrl,
        });
      })
      .catch((err) => {
        console.error("Error carregant article:", err);
        setArticle(null);
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <MKTypography>Carregant...</MKTypography>;
  if (!article) return <MKTypography>Article no trobat</MKTypography>;

  return (
    <>
      <MKBox position="fixed" top="0.5rem" width="100%" zIndex={999}>
        <DefaultNavbar
          routes={routes}
          action={{
            type: "internal",
            route: "/neta",
            label: "Contacta'ns",
            color: "info",
          }}
        />
      </MKBox>

      {/* Hero amb imatge de fons */}
      <MKBox
        minHeight="60vh"
        width="100%"
        sx={{
          backgroundImage: `url(${article.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "grid",
          placeItems: "center",
        }}
      >
        <MKBox
          sx={{
            backgroundColor: "rgba(0, 0, 0, 0.0)",
            px: 3,
            py: 2,
            borderRadius: "lg",
          }}
        >
          <MKTypography
            variant="h2"
            color="white"
            textAlign="center"
            sx={{ textShadow: "2px 2px 8px rgba(0,0,0,0.7)" }}
          >
            {article.title}
          </MKTypography>
        </MKBox>
      </MKBox>

      {/* Cos de l'article dins una Card */}
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
                <CardContent>
                  <div
                    dangerouslySetInnerHTML={{ __html: article.body }}
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

export default ArticleDetail;
