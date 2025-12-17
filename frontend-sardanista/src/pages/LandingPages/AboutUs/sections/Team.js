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
import MKTypography from "components/MKTypography";

// Material Kit 2 React examples
import HorizontalTeamCard from "examples/Cards/TeamCards/HorizontalTeamCard";

// Images
import team1 from "assets/images/sardana/som/pilar.jpeg";
import team2 from "assets/images/sardana/som/pepa.jpeg";
import team3 from "assets/images/sardana/som/elvira.jpg";
import team4 from "assets/images/sardana/som/gloria.jpeg";
import team5 from "assets/images/sardana/som/jesus.jpg";
import team6 from "assets/images/sardana/som/quim.jpg";

function Team() {
  return (
    <MKBox
      component="section"
      variant="gradient"
      bgColor="dark"
      position="relative"
      py={6}
      px={{ xs: 2, lg: 0 }}
      mx={-2}
    >
      <Container>
        <Grid container>
          <Grid item xs={12} md={8} sx={{ mb: 6 }}>
            <MKTypography variant="h3" color="white">
              Un equip que balla al ritme de la tradició
            </MKTypography>
            <MKTypography variant="body2" color="white" opacity={0.8}>
              La nostra raó de ser és promoure la sardana com un pont d&apos;unió entre generacions
              i cultures. Som un grup apassionat que comparteix la seva passió per la dansa i la
              música, i estem compromesos a fer créixer aquesta tradició a través de
              l&apos;ensenyament i la participació activa.
            </MKTypography>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={6}>
            <MKBox mb={1}>
              <HorizontalTeamCard
                image={team1}
                name="Pilar"
                position={{ color: "info", label: "Presidenta" }}
                description="Lidera l'agrupació amb dedicació i impulsant el creixement de la sardana a la comunitat."
              />
            </MKBox>
          </Grid>
          <Grid item xs={12} lg={6}>
            <MKBox mb={{ xs: 1, lg: 0 }}>
              <HorizontalTeamCard
                image={team4}
                name="Glòria"
                position={{ color: "info", label: "Vicepresidenta" }}
                description="La seva experiència és clau per mantenir viva la tradició sardanista."
              />
            </MKBox>
          </Grid>
          <Grid item xs={12} lg={6}>
            <MKBox mb={1}>
              <HorizontalTeamCard
                image={team2}
                name="Pepa"
                position={{ color: "info", label: "Secretària" }}
                description="S'assegura que tot estigui en ordre vetllant pel bon funcionament de l'entitat."
              />
            </MKBox>
          </Grid>
          <Grid item xs={12} lg={6}>
            <MKBox mb={{ xs: 1, lg: 0 }}>
              <HorizontalTeamCard
                image={team5}
                name="Jesus"
                position={{ color: "info", label: "Tresorer" }}
                description="Gràcies a la seva gestió permet mantenir les activitats i invertir en el futur de la sardana."
              />
            </MKBox>
          </Grid>
          <Grid item xs={12} lg={6}>
            <MKBox mb={1}>
              <HorizontalTeamCard
                image={team3}
                name="Elvira"
                position={{ color: "info", label: "Monitora" }}
                description="Ensenya els passos i la tècnica de la sardana amb el compromís de transmetre la tradició."
              />
            </MKBox>
          </Grid>
          <Grid item xs={12} lg={6}>
            <MKBox mb={{ xs: 1, lg: 0 }}>
              <HorizontalTeamCard
                image={team6}
                name="Quim"
                position={{ color: "info", label: "Monitor" }}
                description="El seu entusiasme fa que aprendre sardana sigui una experiència gratificant."
              />
            </MKBox>
          </Grid>
        </Grid>
      </Container>
    </MKBox>
  );
}

export default Team;
