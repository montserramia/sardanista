import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Grid, Card, CardMedia, CardContent, Typography } from "@mui/material";
import MKBox from "components/MKBox";

// Imatge per defecte
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
    <MKBox component="section" py={6}>
      <Container>
        <Typography variant="h4" gutterBottom align="center">
          Esdeveniments
        </Typography>

        <Grid container spacing={3}>
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
                  <Typography variant="h6">{event.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    📅{" "}
                    {new Date(event.dataInici).toLocaleString("ca-ES", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    📍 {event.lloc || "Lloc no especificat"}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </MKBox>
  );
}
