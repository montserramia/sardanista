/* eslint-disable react/jsx-no-duplicate-props */
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

import { useState } from "react";

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKInput from "components/MKInput";
import MKButton from "components/MKButton";

// Images
import macbook from "assets/images/macbook.png";

function Newsletter() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("https://65.109.231.124/drupal11/web/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setEmail("");
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Error enviant subscripció:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <MKBox component="section" pt={6} my={6}>
      <Container>
        <Grid container alignItems="center">
          <Grid item sx={12} md={6} sx={{ ml: { xs: 0, lg: 3 }, mb: { xs: 12, md: 0 } }}>
            <MKTypography variant="h4">Sigues el primer a veure la notícia</MKTypography>
            <MKTypography variant="body2" color="text" mb={3}>
              Inscriu-te a la nostra newsletter i rebràs les últimes novetats de la nostra
              associació.
            </MKTypography>
            {submitStatus === "success" && (
              <MKBox mb={2} p={1} bgColor="success" borderRadius="lg">
                <MKTypography variant="body2" color="white">
                  ✓ T&apos;has subscrit correctament!
                </MKTypography>
              </MKBox>
            )}
            {submitStatus === "error" && (
              <MKBox mb={2} p={1} bgColor="error" borderRadius="lg">
                <MKTypography variant="body2" color="white">
                  ✗ Error en la subscripció. Intenta-ho més tard.
                </MKTypography>
              </MKBox>
            )}
            <Grid container spacing={1} component="form" onSubmit={handleSubmit}>
              <Grid item xs={8}>
                <MKInput
                  type="email"
                  label="El teu email aquí..."
                  fullWidth
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={4}>
                <MKButton
                  type="submit"
                  variant="gradient"
                  color="info"
                  sx={{ height: "100%" }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "..." : "Subscriu-te"}
                </MKButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={5} sx={{ ml: "auto" }}>
            <MKBox position="relative">
              <MKBox component="img" src={macbook} alt="macbook" width="100%" />
            </MKBox>
          </Grid>
        </Grid>
      </Container>
    </MKBox>
  );
}

export default Newsletter;
