import React from "react";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import DefaultFooter from "examples/Footers/DefaultFooter";
import routes from "routes";
import footerRoutes from "footer.routes";
import calendariImage from "assets/images/sardana/calendari.jpg";

function CalendariPage() {
  return (
    <>
      <MKBox position="fixed" top="0.5rem" width="100%" zIndex={999}>
        <DefaultNavbar
          routes={routes}
          action={{
            type: "internal",
            route: "/contacte",
            label: "Contacta'ns",
            color: "info",
          }}
        />
      </MKBox>

      <MKBox pt={16} pb={8} px={2}>
        <Container>
          <Card
            sx={{
              p: { xs: 2, md: 4 },
              boxShadow: ({ boxShadows: { xxl } }) => xxl,
            }}
          >
            <MKTypography variant="h3" mb={2}>
              Calendari
            </MKTypography>
            <MKTypography variant="body2" color="text" mb={3}>
              Consulta el calendari complet de les activitats.
            </MKTypography>
            <MKBox
              component="img"
              src={calendariImage}
              alt="Calendari d'activitats sardanistes"
              width="100%"
              sx={{ borderRadius: "lg" }}
            />
          </Card>
        </Container>
      </MKBox>

      <MKBox pt={6} px={1} mt={6}>
        <DefaultFooter content={footerRoutes} />
      </MKBox>
    </>
  );
}

export default CalendariPage;