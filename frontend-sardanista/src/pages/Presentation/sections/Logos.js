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
import Divider from "@mui/material/Divider";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

// Images
import cultura from "assets/images/logos/suport/Cultura.svg";
import ajuntament from "assets/images/logos/suport/Ajuntament.svg";
import somsardana from "assets/images/logos/suport/SomSardana.svg";

function Information() {
  return (
    <MKBox component="section" py={12}>
      <Container>
        <Divider sx={{ mb: 6 }} />
        <Grid
          container
          item
          xs={12}
          lg={6}
          justifyContent="center"
          sx={{ mx: "auto", textAlign: "center" }}
        >
          <MKTypography variant="h2">La sardana és patrimoni de tots</MKTypography>
          <MKTypography variant="h2" color="info" textGradient mb={2}>
            Amb el suport de:
          </MKTypography>
        </Grid>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={6} md={4} lg={2}>
            <MKBox component="img" src={cultura} alt="Cultura Castelldefels" width="100%" />
          </Grid>
          <Grid item xs={6} md={4} lg={2}>
            <MKBox
              component="img"
              src={ajuntament}
              alt="Ajuntament de Castelldefels"
              width="100%"
              opacity={0.6}
            />
          </Grid>
          <Grid item xs={6} md={4} lg={2}>
            <MKBox component="img" src={somsardana} alt="Som Sardana" width="100%" opacity={0.6} />
          </Grid>
        </Grid>
        <Grid
          container
          item
          xs={12}
          lg={10}
          justifyContent="center"
          sx={{ mx: "auto", textAlign: "center", mt: 6 }}
        >
          <MKTypography variant="body1" color="text" mb={2}>
            Aquesta tasca no seria possible sense el seu suport. Moltes gràcies per creure en la
            nostra missió.
          </MKTypography>
        </Grid>
      </Container>
    </MKBox>
  );
}

export default Information;
