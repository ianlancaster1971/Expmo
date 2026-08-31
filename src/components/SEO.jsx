import { Helmet } from "react-helmet-async";

const SITE_NAME = "Ex-Ford PMO Meet Up";
const SITE_URL = "https://fordpmomeetup.example.com";

/**
 * Per-page SEO: title, meta description, canonical, Open Graph/Twitter tags,
 * and optional JSON-LD structured data (e.g. schema.org Event listings).
 */
export default function SEO({ title, description, path = "/", jsonLd }) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
  const url = `${SITE_URL}${path}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />

      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />

      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </Helmet>
  );
}
