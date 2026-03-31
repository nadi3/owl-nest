import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

/**
 * Props for the PageSEO component.
 */
interface PageSEOProps {
  /**
   * The translation key for the page title.
   */
  titleKey: string;
  /**
   * The translation key for the meta description.
   * If not provided, no description will be used.
   */
  descriptionKey?: string;
  /**
   * The URL of the image to use for social sharing (OpenGraph).
   * Defaults to '/og-image.png'.
   */
  image?: string;
}

/**
 * A component that dynamically sets SEO-related meta tags for a page.
 * It uses `react-helmet-async` to manage the document head, setting the title,
 * meta description, and OpenGraph tags for social sharing.
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
