import React from "react";

import Grid from "@mui/material/Grid";
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import DefaultFooter from "examples/Footers/DefaultFooter";

import routes from "routes";
import footerRoutes from "footer.routes";

import bgImage from "assets/images/sardana/2.jpeg";

function PaginaNeta() {
  return (
    <>
      {/* Navbar flotant com a ContactUs */}
      <MKBox position="fixed" top="0.5rem" width="100%" zIndex={999}>
        <DefaultNavbar
          routes={routes}
          center={false}
          action={{
            type: "external",
            route: "assets/images/sardana/2.jpg",
            label: "Viu la sardana",
            color: "groc",
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
            mt={2}
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
            py={6}
          >
            <MKTypography variant="h4" textAlign="center" color="info" mt={-1}>
              Aquesta és una pàgina neta
            </MKTypography>
          </MKBox>
        </Grid>
      </Grid>

      <MKBox pt={6} px={1} mt={6}>
        <DefaultFooter content={footerRoutes} />
      </MKBox>
    </>
  );
}

export default PaginaNeta;
