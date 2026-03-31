/**
 * @file Credits.tsx
 * @description The page that displays all third-party attributions for libraries,
 * assets, and frameworks used in the application.
 */

import { Typography, Link, Box, Container } from '@mui/material';
import { ExternalLink } from 'lucide-react';
import { PageHeader } from '@/components/common/PageHeader';
import { NestCard } from '@/components/common/NestCard';
import { getCredits } from '@/services/creditsService';
import { useTranslation } from 'react-i18next';
import { PageSEO } from '@/components/common/PageSEO.tsx';

/**
 * The Credits page component.
 *
 * This component is responsible for rendering a list of all third-party resources
 * that require attribution. It fetches the credit data from the `getCredits` service
 * and displays each item in a `NestCard`.
 *
 * The page is structured with a `PageHeader` and a responsive grid of cards,
 * making it easy to browse the different resources used in the project.
 *
 * @component
 * @returns {React.ReactElement} The rendered credits page.
 */
const Credits = (): React.ReactElement => {
  const { t } = useTranslation();
  const credits = getCredits();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <PageSEO titleKey={'seo.credits.title'} descriptionKey={'seo.credits.description'} />

      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 }, flexGrow: 1 }}>
        <PageHeader zone="INFRA" title={t('credits.title')} description={t('credits.desc')} />

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' },
            gap: 3,
            mt: 4,
          }}
        >
          {credits.map((item) => (
            <Box key={item.id} sx={{ display: 'flex' }}>
              <NestCard
                title={item.name}
                subtitle={`${item.category} · ${item.license}`}
                sx={{ width: '100%' }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    justifyContent: 'space-between',
                  }}
                >
                  <Typography variant="body2" sx={{ mb: 2, minHeight: '40px' }}>
                    {t(item.descriptionKey)}
                  </Typography>

                  <Link
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      textDecoration: 'none',
                      fontWeight: 700,
                      fontSize: '0.8rem',
                      color: 'secondary.main',
                      '&:hover': { textDecoration: 'underline' },
                    }}
                  >
                    {t('credits.site')} <ExternalLink size={14} />
                  </Link>
                </Box>
              </NestCard>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default Credits;
