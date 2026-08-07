import PropTypes from "prop-types";
import { Helmet } from "react-helmet-async";

const DEFAULT_TITLE = "Grup Sardanista Castelldefels";
const DEFAULT_DESCRIPTION =
  "Web oficial del Grup Sardanista de Castelldefels: agenda, blog, galeria i activitats de cultura popular catalana.";
const DEFAULT_IMAGE = "https://grupsardanistacastelldefels.cat/apple-icon.png";
const DEFAULT_SITE_URL = "https://grupsardanistacastelldefels.cat";

function normalizeUrl(url) {
  return (url || DEFAULT_SITE_URL).replace(/\/$/, "");
}

function SEO({
  title,
  description,
  canonical,
  image,
  type,
  robots,
  locale,
  siteName,
  twitterCard,
}) {
  const resolvedTitle = title || DEFAULT_TITLE;
  const resolvedDescription = description || DEFAULT_DESCRIPTION;
  const resolvedType = type || "website";
  const resolvedSiteName = siteName || "Grup Sardanista Castelldefels";
  const resolvedLocale = locale || "ca_ES";
  const resolvedTwitterCard = twitterCard || "summary_large_image";

  const origin = typeof window !== "undefined" ? window.location.origin : DEFAULT_SITE_URL;
  const path = typeof window !== "undefined" ? window.location.pathname : "/";
  const baseUrl = normalizeUrl(process.env.REACT_APP_SITE_URL || origin);
  const canonicalInput = canonical || path;
  const canonicalUrl = canonicalInput.startsWith("http")
    ? canonicalInput
    : `${baseUrl}${canonicalInput.startsWith("/") ? canonicalInput : `/${canonicalInput}`}`;
  const imageUrl = image || DEFAULT_IMAGE;

  return (
    <Helmet>
      <html lang="ca" />
      <title>{resolvedTitle}</title>
      <meta name="description" content={resolvedDescription} />
      <meta name="robots" content={robots || "index,follow"} />

      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:type" content={resolvedType} />
      <meta property="og:title" content={resolvedTitle} />
      <meta property="og:description" content={resolvedDescription} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:site_name" content={resolvedSiteName} />
      <meta property="og:locale" content={resolvedLocale} />

      <meta name="twitter:card" content={resolvedTwitterCard} />
      <meta name="twitter:title" content={resolvedTitle} />
      <meta name="twitter:description" content={resolvedDescription} />
      <meta name="twitter:image" content={imageUrl} />
    </Helmet>
  );
}

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  canonical: PropTypes.string,
  image: PropTypes.string,
  type: PropTypes.string,
  robots: PropTypes.string,
  locale: PropTypes.string,
  siteName: PropTypes.string,
  twitterCard: PropTypes.string,
};

export default SEO;
