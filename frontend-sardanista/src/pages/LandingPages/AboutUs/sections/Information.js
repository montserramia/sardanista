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

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// Material Kit 2 React components
import MKBox from "components/MKBox";

// Material Kit 2 React examples
import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";
import CenteredBlogCard from "examples/Cards/BlogCards/CenteredBlogCard";

import imgActuacio from "assets/images/actuacio-diada.jpeg";

function Information() {
  return (
    <MKBox component="section" py={12}>
      <Container>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} lg={6}>
            <Grid container justifyContent="flex-start">
              <Grid item xs={12} md={6}>
                <MKBox mb={5}>
                  <DefaultInfoCard
                    icon="castle"
                    title="Tradició que inspira"
                    description="Celebrem la cultura catalana a cada pas.
Ballar sardanes és mantenir viva una tradició que ens uneix i ens emociona."
                  />
                </MKBox>
              </Grid>
              <Grid item xs={12} md={6}>
                <MKBox mb={5}>
                  <DefaultInfoCard
                    icon="diversity_3"
                    title="Comunitat acollidora"
                    description="Som més que un grup, som una família.
Tothom hi és benvingut, ja siguis nou o sardanista de tota la vida."
                  />
                </MKBox>
              </Grid>
              <Grid item xs={12} md={6}>
                <MKBox mb={{ xs: 5, md: 0 }}>
                  <DefaultInfoCard
                    icon="sentiment_satisfied"
                    title="Passió per créixer"
                    description="Creiem en el poder de la cultura per transformar.
Cada activitat és una oportunitat per créixer, compartir i fer pinya."
                  />
                </MKBox>
              </Grid>
              <Grid item xs={12} md={6}>
                <MKBox mb={{ xs: 5, md: 0 }}>
                  <DefaultInfoCard
                    icon="handshake"
                    title="Espirit col·laboratiu"
                    description="Creixem plegats, des del respecte i el compromís.
L’agrupació és possible gràcies a l’esforç conjunt de persones que comparteixen la mateixa passió."
                  />
                </MKBox>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} lg={4} sx={{ ml: "auto", mt: { xs: 3, lg: 0 } }}>
            <CenteredBlogCard
              image={imgActuacio}
              title="Viu la sardana amb nosaltres"
              description="T’hi esperem amb els braços oberts!"
              action={{
                type: "internal",
                route: "pages/neta",
                color: "info",
                label: "Com ser part",
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </MKBox>
  );
}

export default Information;
