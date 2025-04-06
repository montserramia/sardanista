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
import RotatingCard from "examples/Cards/RotatingCard";
import RotatingCardFront from "examples/Cards/RotatingCard/RotatingCardFront";
import RotatingCardBack from "examples/Cards/RotatingCard/RotatingCardBack";
import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";

// Images
import bgFront from "assets/images/rotating-card-bg-front.jpeg";
import bgBack from "assets/images/rotating-card-bg-back.jpeg";

function Information() {
  return (
    <MKBox component="section" py={6} my={6}>
      <Container>
        <Grid container item xs={11} spacing={3} alignItems="center" sx={{ mx: "auto" }}>
          <Grid item xs={12} lg={4} sx={{ mx: "auto" }}>
            <RotatingCard>
              <RotatingCardFront
                color="groc"
                image={bgFront}
                icon="touch_app"
                title={
                  <>
                    Agrupació
                    <br />
                    Sardanista
                  </>
                }
                description="Mantenim viva la cultura catalana a través de la sardana, amb passió i comunitat."
              />
              <RotatingCardBack
                color="groc"
                image={bgBack}
                title="Descobreix-nos"
                description="Som més de 900 socis i 30 anys de trajectòria compartint dansa i tradició."
                action={{
                  type: "internal",
                  route: "/contacte",
                  label: "Contacta'ns",
                }}
              />
            </RotatingCard>
          </Grid>
          <Grid item xs={12} lg={7} sx={{ ml: "auto" }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <DefaultInfoCard
                  icon="school"
                  color="info"
                  title="Classes de sardanes"
                  description="Aprèn a ballar sardanes des de zero o perfecciona els teus passos. Classes per a totes les edats."
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <DefaultInfoCard
                  icon="people"
                  title="Trobades socials"
                  description="Compartim dansa, menjar i rialles en trobades que enforteixen la comunitat."
                />
              </Grid>
            </Grid>
            <Grid container spacing={3} sx={{ mt: { xs: 0, md: 6 } }}>
              <Grid item xs={12} md={6}>
                <DefaultInfoCard
                  icon="event"
                  title="Aplecs i actuacions"
                  description="Actuem a festes majors, concursos i esdeveniments arreu de Catalunya."
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <DefaultInfoCard
                  icon="favorite"
                  title="Tradició i comunitat"
                  description="Som una gran família que estima la cultura i la fa créixer cada dia."
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </MKBox>
  );
}

export default Information;
