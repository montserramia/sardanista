import Grid from "@mui/material/Grid";
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import DefaultFooter from "examples/Footers/DefaultFooter";
import Newsletter from "pages/LandingPages/AboutUs/sections/Newsletter";

import routes from "routes";
import footerRoutes from "footer.routes";

import bgImage from "assets/images/sardana/pepa-pilar.jpeg";

function PaginaNeta() {
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

      {/* Contingut estructurat igual que ContactUs però buit */}
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
                No et perdis cap detall del món de la sardana!
              </MKTypography>
            </MKBox>
            <MKBox p={3}>
              <MKTypography variant="body2" color="text" mb={3}>
                Per a qualsevol dubte o consulta, omple el formulari i ens posarem en contacte amb
                tu.
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

export default PaginaNeta;
