// @mui icons
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import YouTubeIcon from "@mui/icons-material/YouTube";

// Material Kit 2 React components
import MKTypography from "components/MKTypography";

// Images
import logoCT from "assets/images/sardana.png";

const date = new Date().getFullYear();

export default {
  brand: {
    name: "Grup Sardanista Castelldefels",
    image: logoCT,
    route: "/",
  },
  socials: [
    {
      icon: <InstagramIcon />,
      link: "https://www.instagram.com/grup_sardanista_castelldefels/",
    },
    {
      icon: <WhatsAppIcon />,
      link: "https://wa.me/34616430148",
    },
    {
      icon: <WhatsAppIcon />,
      link: "https://wa.me/34699098028",
    },
    {
      icon: <YouTubeIcon />,
      link: "https://www.youtube.com/",
    },
  ],
  menus: [
    {
      name: "Nosaltres",
      items: [
        { name: "Qui som", href: "/quisom" },
        { name: "Agenda", href: "/agenda" },
        { name: "Glòria: 616 43 01 48", href: "tel:+34616430148" },
        { name: "Pepa: 699 09 80 28", href: "tel:+34699098028" },
      ],
    },
    {
      name: "Som Sardana",
      items: [
        { name: "qui som", href: "https://somsardana.cat/somsardana" },
        { name: "història", href: "https://somsardana.cat/somsardana" },
        { name: "objectius", href: "https://somsardana.cat/somsardana" },
        { name: "projectes", href: "https://somsardana.cat/somsardana" },
      ],
    },
    {
      name: "Ajuntament de Castelldefels",
      items: [
        { name: "Ajuntament", href: "https://www.castelldefels.org/" },
        { name: "Cultura", href: "https://www.castelldefels.org/cultura" },
        { name: "Agenda", href: "https://www.castelldefels.org/agenda" },
      ],
    },
    {
      name: "legal",
      items: [
        { name: "terms & conditions", href: "/neta" },
        { name: "privacy policy", href: "/neta" },
        { name: "licenses (EULA)", href: "/neta" },
      ],
    },
  ],
  copyright: (
    <MKTypography variant="button" fontWeight="regular">
      All rights reserved. Copyright &copy; {date} Grup Sardanista Castelldefels{" "}
      <MKTypography
        component="a"
        href="https://newwweb.cat"
        target="_blank"
        variant="button"
        fontWeight="regular"
      >
        newWweb
      </MKTypography>
      .
    </MKTypography>
  ),
};
