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
import bgFront from "assets/images/sardana/pilar-pepa.jpeg";
import bgBack from "assets/images/sardana/actuacio.jpeg";

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
                    <br />
                    Castelldefels
                  </>
                }
                description={
                  <>
                    Mantenim viva la cultura catalana a través de la sardana, amb passió i
                    comunitat.
                    <br />
                    Ens adaptantem als nous temps sense perdre l’essència.
                    <br />
                    Tu pots ser-ne part
                  </>
                }
              />
              <RotatingCardBack
                color="groc"
                image={bgBack}
                title="Uneix-te a nosaltres"
                description={
                  <>
                    Gaudir de la sardana és millor en companyia.
                    <br />
                    T’esperem amb els braços oberts!
                  </>
                }
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
                  description="Les nostres classes de sardana estan dissenyades per ensenyar als participants els passos i la coreografia d’aquesta dansa tradicional, fomentant la inclusió i l’aprenentatge col·laboratiu."
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <DefaultInfoCard
                  icon="people"
                  title="Trobades i Esdeveniments"
                  description="Les nostres trobades i esdeveniments són oportunitats excelents per gaudir de la sardana, així com per conèixer a altres ballarins, compartir experiències i reforçar la comunitat sardanista."
                />
              </Grid>
            </Grid>
            <Grid container spacing={3} sx={{ mt: { xs: 0, md: 6 } }}>
              <Grid item xs={12} md={6}>
                <DefaultInfoCard
                  icon="event"
                  title="Aplecs i actuacions"
                  description="Els espectacles de sardana que organitzem destaquen no només la dansa, sinó també la música tradicional, i solen atraure un públic divers, contribuint a la difusió de la cultura catalana."
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <DefaultInfoCard
                  icon="favorite"
                  title="Tradició i comunitat"
                  description="Realitzem diverses activitats culturals al voltant de la sardana, incloent conferències i tallers, per enriquir el coneixement i apreciació d’aquesta disciplina musical i de dansa."
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
