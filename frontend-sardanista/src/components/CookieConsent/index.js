import React, { useState, useEffect } from "react";
import MKBox from "components/MKBox";
import MKButton from "components/MKButton";
import MKTypography from "components/MKTypography";

function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setShowBanner(false);

    // Enable Matomo tracking after user consent
    if (window._paq) {
      window._paq.push(["setConsentGiven"]);
    }
  };

  const declineCookies = () => {
    localStorage.setItem("cookie-consent", "declined");
    setShowBanner(false);
  };

  if (!showBanner) {
    return null;
  }

  return (
    <MKBox
      position="fixed"
      bottom="20px"
      left="20px"
      width="320px"
      zIndex={9999}
      bgcolor="white"
      p={2}
      borderRadius="10px"
      shadow="md"
      sx={{
        border: "1px solid #ccc",
        maxWidth: "90%",
      }}
    >
      <MKBox display="flex" flexDirection="column" gap={1.5}>
        <MKTypography variant="body2" color="text">
          Aquest lloc web utilitza cookies per analitzar el tràfic i millorar la vostra experiència.
          En continuar navegant accepteu la nostra política de cookies.
        </MKTypography>

        <MKBox display="flex" gap={1} justifyContent="flex-end">
          <MKButton variant="outlined" color="secondary" size="small" onClick={declineCookies}>
            Rebutjar
          </MKButton>
          <MKButton variant="gradient" color="info" size="small" onClick={acceptCookies}>
            Acceptar
          </MKButton>
        </MKBox>
      </MKBox>
    </MKBox>
  );
}

export default CookieConsent;
