import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Container from "@mui/material/Container";
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

function ArticleDetail() {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const API_BASE = "http://localhost:8080";
    console.log("Slug rebut:", slug); // 🔍 Comprovació en consola

    fetch(`${API_BASE}/jsonapi/node/article?filter[path][value]=/${slug}&include=field_image`)
      .then((res) => res.json())
      .then((data) => {
        if (data.data.length > 0) {
          const node = data.data[0];
          const imageId = node.relationships?.field_image?.data?.id;
          const image = data.included?.find((i) => i.id === imageId)?.attributes?.uri?.url;

          setArticle({
            title: node.attributes.title,
            body: node.attributes.body?.processed,
            created: node.attributes.created,
            image: image ? `${API_BASE}${image}` : null,
          });
        } else {
          console.warn("No s'ha trobat cap article per al slug:", slug);
        }
      })
      .catch((error) => {
        console.error("Error carregant l'article:", error);
      });
  }, [slug]);

  if (!article) {
    return (
      <MKBox py={6} textAlign="center">
        Carregant article...
      </MKBox>
    );
  }

  return (
    <MKBox component="section" py={6}>
      <Container>
        {article.image && (
          <MKBox
            component="img"
            src={article.image}
            alt={article.title}
            width="100%"
            borderRadius="xl"
            mb={4}
          />
        )}
        <MKTypography variant="h2" gutterBottom>
          {article.title}
        </MKTypography>
        <MKTypography
          variant="caption"
          color="text"
          mb={2}
          display="block"
        >
          Publicat el {new Date(article.created).toLocaleDateString("ca-ES")}
        </MKTypography>
        <MKTypography
          variant="body1"
          component="div"
          color="text"
          dangerouslySetInnerHTML={{ __html: article.body }}
        />
        <MKBox mt={4}>
          <MKTypography
            component={Link}
            to="/blog"
            variant="body2"
            color="info"
            sx={{ textDecoration: "none" }}
          >
            ← Tornar al blog
          </MKTypography>
        </MKBox>
      </Container>
    </MKBox>
  );
}

export default ArticleDetail;
