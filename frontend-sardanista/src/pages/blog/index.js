import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKButton from "components/MKButton";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import DefaultFooter from "examples/Footers/DefaultFooter";
import routes from "routes";
import footerRoutes from "footer.routes";
import bgImage from "assets/images/sardana/db/mans.jpeg";

const imatgePerDefecte = "https://source.unsplash.com/random/800x600?culture";

function BlogPage() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const API_BASE = "http://localhost:8080";

    fetch(`${API_BASE}/jsonapi/node/article?include=field_image`)
      .then((res) => res.json())
      .then((data) => {
        const included = data.included || [];
        const imageMap = {};

        included.forEach((item) => {
          if (item.type === "file--file") {
            imageMap[item.id] = item.attributes.uri.url;
          }
        });

        const formatted = data.data.map((item) => {
          const imageId = item.relationships?.field_image?.data?.id;
          const imageUrl =
            imageId && imageMap[imageId] ? `${API_BASE}${imageMap[imageId]}` : imatgePerDefecte;

          return {
            id: item.id,
            title: item.attributes.title,
            summary: item.attributes.body?.summary || "",
            imageUrl,
            route: `/blog${item.attributes.path.alias}`,
          };
        });

        setArticles(formatted);
      })
      .catch((error) => {
        console.error("Error carregant articles:", error);
      });
  }, []);

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
            Últims articles
          </MKTypography>
          <MKTypography
            variant="body3"
            color="white"
            sx={{ textShadow: "2px 2px 8px rgba(0,0,0,0.7)" }}
          >
            Reflexions, notícies i cultura sardanista.
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
            <Grid container spacing={4}>
              {articles.map((article) => (
                <Grid item key={article.id} xs={12} sm={6} md={4}>
                  <Card>
                    <CardMedia
                      component="img"
                      height="200"
                      image={article.imageUrl}
                      alt={article.title}
                    />
                    <CardContent>
                      <MKTypography variant="h5" gutterBottom>
                        {article.title}
                      </MKTypography>
                      <MKTypography variant="body2" color="text">
                        {article.summary || "Sense descripció"}
                      </MKTypography>

                      <MKBox mt={2}>
                        <MKButton
                          variant="text"
                          size="small"
                          color="info"
                          component="a"
                          href={article.route}
                        >
                          Llegir més
                        </MKButton>
                      </MKBox>
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

export default BlogPage;
