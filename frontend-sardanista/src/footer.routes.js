// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import GitHubIcon from "@mui/icons-material/GitHub";
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
      icon: <FacebookIcon />,
      link: "https://www.facebook.com/",
    },
    {
      icon: <TwitterIcon />,
      link: "https://twitter.com/",
    },
    {
      icon: <GitHubIcon />,
      link: "https://github.com/",
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
        {
          name: "contacte'ns",
          href: "https://www.castelldefels.org/es/servicios/cultura/cultura-popular-tradicional/bailes-populares/la-sardana",
        },
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
        { name: "Esports", href: "https://www.castelldefels.org/esports" },
        { name: "Agenda", href: "https://www.castelldefels.org/agenda" },
      ],
    },
    {
      name: "legal",
      items: [
        { name: "terms & conditions", href: "https://www.creative-tim.com/terms" },
        { name: "privacy policy", href: "https://www.creative-tim.com/privacy" },
        { name: "licenses (EULA)", href: "https://www.creative-tim.com/license" },
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
