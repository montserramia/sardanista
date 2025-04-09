import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";

import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import BlogCard from "components/BlogCard";

function BlogPage() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    // URL base del Drupal (podria venir de .env més endavant)
    const API_BASE = "http://localhost:8080";

    fetch(`${API_BASE}/jsonapi/node/article?include=field_image`)
      .then((res) => res.json())
      .then((data) => {
        const included = data.included || [];
        const imageMap = {};

        // Crear mapa d’imatges relacionades
        included.forEach((item) => {
          if (item.type === "file--file") {
            imageMap[item.id] = item.attributes.uri.url;
          }
        });

        // Processar cada article
        const formatted = data.data.map((item) => {
          const imageId = item.relationships?.field_image?.data?.id;
          const imageUrl =
            imageId && imageMap[imageId]
              ? `${API_BASE}${imageMap[imageId]}`
              : "https://source.unsplash.com/random/800x600?culture";

          return {
            id: item.id,
            title: item.attributes.title,
            summary: item.attributes.body?.summary || "",
            image: imageUrl,
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
    <MKBox component="section" py={2}>
      <Container>
        <Grid
          container
          item
          xs={12}
          lg={6}
          flexDirection="column"
          justifyContent="center"
          mx="auto"
          mb={6}
        >
          <MKBox py={2} px={6} textAlign="center">
            <MKBox
              width="4rem"
              height="4rem"
              display="flex"
              alignItems="center"
              justifyContent="center"
              variant="gradient"
              bgColor="info"
              color="white"
              shadow="md"
              borderRadius="lg"
              mx="auto"
            >
              <Icon fontSize="medium">article</Icon>
            </MKBox>
            <MKTypography variant="h2" mt={2} mb={1}>
              Últims articles
            </MKTypography>
            <MKTypography variant="body2" color="text">
              Reflexions, notícies i cultura sardanista.
            </MKTypography>
          </MKBox>
        </Grid>

        <Grid container spacing={3} mb={6}>
          {articles.map((article) => (
            <Grid item xs={12} md={6} lg={4} key={article.id}>
              <BlogCard
                image={article.image}
                title={article.title}
                description={article.summary}
                route={article.route}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </MKBox>
  );
}

export default BlogPage;
