/**
 * @file ErrorPage.tsx
 * @description A generic error page component used to display HTTP errors like 404 Not Found.
 */

import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '@/components/common/PageHeader';
import { AlertTriangle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { NestButton } from '@/components/common/NestButton.tsx';
import React from 'react';

/**
 * Props for the ErrorPage component.
 * @interface ErrorPageProps
 */
interface ErrorPageProps {
  /**
   * The HTTP error code to display (e.g., '404', '500').
   * This code is used to fetch the appropriate error messages from the translation files.
   * @type {string}
   * @default '404'
   */
  code?: string;
}

/**
 * A standardized page for displaying errors to the user.
 *
 * This component renders a simple, centered layout with:
 * - An error icon (`AlertTriangle`).
 * - A `PageHeader` that displays the error code, title, and a descriptive message.
 * - A "Go Back" button that navigates the user to the homepage.
 *
 * The content (title, message) is dynamically loaded from translation files
 * based on the provided `code` prop.
 *
 * @component
 * @param {ErrorPageProps} props - The props for the component.
 * @returns {React.ReactElement} The rendered error page.
 */
const ErrorPage = ({ code = '404' }: ErrorPageProps): React.ReactElement => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Box sx={{ textAlign: 'center', py: 10 }}>
      <AlertTriangle size={64} color={'secondary.main'} style={{ marginBottom: '24px' }} />
      <PageHeader
        zone={`ERR_${code}`}
        title={t(`errors.${code}.title`)}
        description={t(`errors.${code}.message`)}
        center={true}
      />
      <NestButton nestVariant="ghost" nestColor={'secondary'} onClick={() => navigate('/')}>
        {t('errors.back')}
      </NestButton>
    </Box>
  );
};

export default ErrorPage;
