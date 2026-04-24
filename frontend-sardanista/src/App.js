/**
=========================================================
* Material Kit 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useEffect } from "react";

// react-router components
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// Material Kit 2 React themes
import theme from "assets/theme";
import Presentation from "layouts/pages/presentation";
import ArticleDetail from "pages/blog/ArticleDetail";
import SignIn from "layouts/pages/authentication/sign-in";
import PaginaNeta from "pages/neta";
import ContactUs from "layouts/pages/landing-pages/contact-us";
import AgendaPage from "pages/agenda";
import TermsPage from "pages/legal/terms";
import PrivacyPage from "pages/legal/privacy";
import LicensesPage from "pages/legal/licenses";
import GdprPage from "pages/legal/gdpr";
import CookiesPage from "pages/legal/cookies";
import CookieConsent from "components/CookieConsent";

// Material Kit 2 React routes
import routes from "routes";

export default function App() {
  const { pathname } = useLocation();

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes) =>
    allRoutes.flatMap((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }
      if (route.route) {
        return <Route exact path={route.route} element={route.component} key={route.route} />;
      }
      return [];
    });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        {getRoutes(routes)}
        <Route path="/" element={<Presentation />} />
        <Route path="/presentation" element={<Navigate to="/" />} />
        <Route path="/neta" element={<PaginaNeta />} />
        <Route path="/contacte" element={<ContactUs />} />
        <Route path="/agenda" element={<AgendaPage />} />
        <Route path="/legal/terms" element={<TermsPage />} />
        <Route path="/legal/privacy" element={<PrivacyPage />} />
        <Route path="/legal/licenses" element={<LicensesPage />} />
        <Route path="/legal/gdpr" element={<GdprPage />} />
        <Route path="/legal/cookies" element={<CookiesPage />} />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/blog/:slug" element={<ArticleDetail />} />
        <Route path="/pages/authentication/sign-in" element={<SignIn />} />
      </Routes>
      <CookieConsent />
    </ThemeProvider>
  );
}
