import React from "react";
import { Link } from "react-router-dom";
import MKButton from "components/MKButton";

const generateGallerySlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')  // Elimina caràcters especials
    .replace(/\s+/g, '-');     // Substitueix espais per guions
};

const GalleryLink = ({ title, children, ...props }) => {
  const slug = generateGallerySlug(title);
  
  return (
    <Link to={`/galeria/${slug}`} {...props}>
      {children}
    </Link>
  );
};

const GalleryButton = ({ title, children, ...otherProps }) => {
  const slug = generateGallerySlug(title);
  
  return (
    <MKButton
      component={Link}
      to={`/galeria/${slug}`}
      variant="gradient"
      color="info"
      {...otherProps}
    >
      {children}
    </MKButton>
  );
};

export { GalleryLink, GalleryButton, generateGallerySlug };