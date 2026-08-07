import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import MKBox from "components/MKBox";
import MKButton from "components/MKButton";
import MKTypography from "components/MKTypography";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import DefaultFooter from "examples/Footers/DefaultFooter";
import routes from "routes";
import footerRoutes from "footer.routes";
import SEO from "components/SEO";

function NotFound() {
  return (
    <>
      <SEO
        title="Pàgina no trobada | Grup Sardanista Castelldefels"
        description="La pàgina que busques no existeix o s'ha mogut."
        robots="noindex,follow"
      />

      <MKBox position="fixed" top="0.5rem" width="100%" zIndex={999}>
        <DefaultNavbar routes={routes} />
      </MKBox>

      <MKBox minHeight="65vh" display="grid" placeItems="center" px={2}>
        <Card sx={{ width: "100%", maxWidth: 760, p: 4 }}>
          <Container>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <MKTypography variant="h1" color="info">
                  404
                </MKTypography>
                <MKTypography variant="h3" mb={1}>
                  Pàgina no trobada
                </MKTypography>
                <MKTypography variant="body1" color="text" mb={3}>
                  No hem trobat aquesta URL. Pots tornar a l&apos;inici o anar a l&apos;agenda.
                </MKTypography>
                <MKBox display="flex" gap={2} flexWrap="wrap">
                  <MKButton component={Link} to="/" variant="gradient" color="info">
                    Tornar a l&apos;inici
                  </MKButton>
                  <MKButton component={Link} to="/agenda" variant="outlined" color="info">
                    Veure agenda
                  </MKButton>
                </MKBox>
              </Grid>
            </Grid>
          </Container>
        </Card>
      </MKBox>

      <MKBox pt={6} px={1} mt={6}>
        <DefaultFooter content={footerRoutes} />
      </MKBox>
    </>
  );
}

export default NotFound;
