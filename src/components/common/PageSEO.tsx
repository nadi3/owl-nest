import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

interface PageSEOProps {
  titleKey: string;
  descriptionKey?: string;
}

export const PageSEO = ({ titleKey, descriptionKey }: PageSEOProps) => {
  const { t } = useTranslation();

  return (
    <Helmet>
      <title>{`${t(titleKey)} | Owl Nest`}</title>
      {descriptionKey && <meta name="description" content={t(descriptionKey)} />}
    </Helmet>
  );
};
