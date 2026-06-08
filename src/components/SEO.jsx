import { Helmet } from "react-helmet-async";
import { useLanguage } from "../context/LanguageContext";

export const SEO = ({
  title,
  description,
  image,
  url = "/",
  type = "website",
}) => {
  const { language } = useLanguage();
  const locale = language === "fr" ? "fr_FR" : "en_US";
  const siteUrl = "https://freearcs-pharma.com";
  const fullUrl = url.startsWith("http") ? url : `${siteUrl}${url}`;
  const defaultImage = "/freearcs-pharma-services_logo-white.svg";
  const fullImage = image
    ? image.startsWith("http")
      ? image
      : `${siteUrl}${image}`
    : `${siteUrl}${defaultImage}`;

  return (
    <Helmet>
      <title>{title} | Freearcs Pharma Services</title>
      <meta name="description" content={description} />
      <meta property="og:locale" content={locale} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Freearcs Pharma Services" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />

      <link rel="canonical" href={fullUrl} />
      <link rel="alternate" hrefLang="fr" href={fullUrl} />
      <link rel="alternate" hrefLang="en" href={`${siteUrl}/en${url}`} />
      <link rel="alternate" hrefLang="x-default" href={fullUrl} />
    </Helmet>
  );
};

export default SEO;
