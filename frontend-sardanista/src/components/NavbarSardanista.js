import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Container from "@mui/material/Container";
import Icon from "@mui/material/Icon";

import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKButton from "components/MKButton";

import DefaultNavbarMobile from "examples/Navbars/DefaultNavbar/DefaultNavbarMobile";

import breakpoints from "assets/theme/base/breakpoints";

function NavbarSardanista({ brand, routes, transparent, light, sticky, relative }) {
  const [mobileNavbar, setMobileNavbar] = useState(false);
  const [mobileView, setMobileView] = useState(false);

  const openMobileNavbar = () => setMobileNavbar(!mobileNavbar);

  useEffect(() => {
    function displayMobileNavbar() {
      if (window.innerWidth < breakpoints.values.lg) {
        setMobileView(true);
        setMobileNavbar(false);
      } else {
        setMobileView(false);
        setMobileNavbar(false);
      }
    }

    window.addEventListener("resize", displayMobileNavbar);
    displayMobileNavbar();
    return () => window.removeEventListener("resize", displayMobileNavbar);
  }, []);

  return (
    <Container sx={sticky ? { position: "sticky", top: 0, zIndex: 10 } : null}>
      <MKBox
        py={1}
        px={{ xs: 4, sm: transparent ? 2 : 3, lg: transparent ? 0 : 2 }}
        my={relative ? 0 : 2}
        mx={relative ? 0 : 3}
        width={relative ? "100%" : "calc(100% - 48px)"}
        borderRadius="xl"
        shadow={transparent ? "none" : "md"}
        color={light ? "white" : "dark"}
        position={relative ? "relative" : "absolute"}
        left={0}
        zIndex={3}
        sx={({ palette: { transparent: transparentColor, white }, functions: { rgba } }) => ({
          backgroundColor: transparent ? transparentColor.main : rgba(white.main, 0.8),
          backdropFilter: transparent ? "none" : `saturate(200%) blur(30px)`,
        })}
      >
        <MKBox display="flex" alignItems="center" width="100%">
          {/* Logo / Marca */}
          <MKBox
            flexGrow={0}
            component={Link}
            to="/"
            lineHeight={1}
            py={transparent ? 1.5 : 0.75}
            pl={relative || transparent ? 0 : { xs: 0, lg: 1 }}
            pr={2}
          >
            <MKTypography variant="button" fontWeight="bold" color={light ? "white" : "dark"}>
              {brand}
            </MKTypography>
          </MKBox>

          {/* Menú + Botó a la dreta */}
          <MKBox
            display={{ xs: "none", lg: "flex" }}
            justifyContent="flex-end"
            alignItems="center"
            flexGrow={1}
            ml="auto"
            mr={2}
          >
            {routes.map(({ name, route }) => (
              <MKTypography
                key={name}
                component={Link}
                to={route}
                variant="button"
                color="text"
                fontWeight="regular"
                sx={{ px: 2 }}
              >
                {name}
              </MKTypography>
            ))}

            <MKButton
              component={Link}
              to="/neta"
              variant="gradient"
              color="info"
              size="small"
              sx={{ ml: 2 }}
            >
              Subscriu-te
            </MKButton>
          </MKBox>

          {/* Menú mòbil */}
          <MKBox
            display={{ xs: "inline-block", lg: "none" }}
            lineHeight={0}
            py={1.5}
            pl={1.5}
            color={transparent ? "white" : "inherit"}
            sx={{ cursor: "pointer" }}
            onClick={openMobileNavbar}
          >
            <Icon fontSize="default">{mobileNavbar ? "close" : "menu"}</Icon>
          </MKBox>
        </MKBox>

        <MKBox
          bgColor={transparent ? "white" : "transparent"}
          shadow={transparent ? "lg" : "none"}
          borderRadius="xl"
          px={transparent ? 2 : 0}
        >
          {mobileView && <DefaultNavbarMobile routes={routes} open={mobileNavbar} />}
        </MKBox>
      </MKBox>
    </Container>
  );
}

NavbarSardanista.defaultProps = {
  brand: "Sardanistes Castelldefels",
  transparent: false,
  light: false,
  sticky: false,
  relative: false,
};

NavbarSardanista.propTypes = {
  brand: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.shape).isRequired,
  transparent: PropTypes.bool,
  light: PropTypes.bool,
  sticky: PropTypes.bool,
  relative: PropTypes.bool,
};

export default NavbarSardanista;
