import Grid from "@mui/material/Grid";
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import DefaultFooter from "examples/Footers/DefaultFooter";
import Newsletter from "pages/LandingPages/AboutUs/sections/Newsletter";

import routes from "routes";
import footerRoutes from "footer.routes";

import bgImage from "assets/images/sardana/junts-gegants.jpeg";

function PaginaCurset() {
  return (
    <>
      {/* Navbar flotant */}
      <MKBox position="fixed" top="0.5rem" width="100%" center={false} zIndex={999}>
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

      {/* Contingut estructurat igual que ContactUs */}
      <Grid container spacing={3} alignItems="center">
        <Grid item xs={12} lg={6}>
          <MKBox
            display={{ xs: "none", lg: "flex" }}
            width="calc(100% - 2rem)"
            height="calc(100vh - 2rem)"
            borderRadius="lg"
            ml={2}
            mt={"6rem"}
            sx={{
              backgroundImage: `url(${bgImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={10}
          md={7}
          lg={6}
          xl={4}
          ml={{ xs: "auto", lg: 6 }}
          mr={{ xs: "auto", lg: 6 }}
        >
          <MKBox
            bgColor="white"
            borderRadius="xl"
            shadow="lg"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            mt={{ xs: 20, sm: 18, md: 20 }}
            mb={{ xs: 20, sm: 18, md: 20 }}
            mx={3}
          >
            <MKBox
              variant="gradient"
              bgColor="info"
              coloredShadow="info"
              borderRadius="lg"
              p={2}
              mx={2}
              mt={-3}
            >
              <MKTypography variant="h3" color="white">
                Vols aprendre a ballar sardanes?
              </MKTypography>
            </MKBox>
            <MKBox p={3}>
              <MKTypography variant="h5" color="dark" mb={2}>
                No t&apos;ho pensis més i apunta&apos;t al nostre curset gratuït
              </MKTypography>

              <MKTypography variant="body2" color="text" mb={2}>
                T&apos;esperem:
              </MKTypography>

              <MKBox mb={2}>
                <MKTypography variant="body2" color="text" fontWeight="bold">
                  📅 Dimecres 1 d&apos;octubre a les 17h
                </MKTypography>
                <MKTypography variant="body2" color="text" fontWeight="bold">
                  📅 Dissabte 4 d&apos;octubre a les 11h
                </MKTypography>
              </MKBox>

              <MKBox mb={3}>
                <MKTypography variant="body2" color="text">
                  📍 <strong>Lloc:</strong> Local de l&apos;Agrupació de Cultura Popular
                </MKTypography>
                <MKTypography variant="body2" color="text" pl={3}>
                  Av. Lluís Companys, 16
                </MKTypography>
              </MKBox>

              <MKTypography variant="body2" color="text" mb={1}>
                Si vols més informació,{" "}
                <MKTypography
                  component="a"
                  href="/contacte"
                  variant="body2"
                  color="info"
                  fontWeight="bold"
                >
                  contacta&apos;ns!
                </MKTypography>
              </MKTypography>
            </MKBox>
          </MKBox>
        </Grid>
      </Grid>

      <Newsletter />

      <MKBox pt={6} px={1} mt={6}>
        <DefaultFooter content={footerRoutes} />
      </MKBox>
    </>
  );
}

export default PaginaCurset;
