import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

interface PageSEOProps {
  titleKey: string;
  descriptionKey?: string;
  image?: string;
}

/**
 * Component to handle dynamic SEO and OpenGraph tags per page.
 * @param titleKey - i18n key for the page title
 * @param descriptionKey - i18n key for the meta description
 * @param image - Optional specific image for social sharing
 */
export const PageSEO = ({ titleKey, descriptionKey, image = '/og-image.png' }: PageSEOProps) => {
  const { t } = useTranslation();
  const fullTitle = `${t(titleKey)} | Owl Nest`;
  const description = descriptionKey ? t(descriptionKey) : t('common.description');

  return (
    <Helmet>
      {/* Standard Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />

      {/* OpenGraph Tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:type" content="website" />
    </Helmet>
  );
};
