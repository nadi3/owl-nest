import { Paper, Box, Typography, styled } from '@mui/material';

interface AcademicCardProps {
  title: string;
  children: React.ReactNode;
  severity?: 'primary' | 'success' | 'error';
}

const StyledPaper = styled(Paper, {
  shouldForwardProp: (prop) => prop !== 'severity',
})<{ severity: string }>(({ theme, severity }) => ({
  padding: theme.spacing(3),
  borderLeft: `4px solid ${theme.palette[severity as 'primary'].main}`,
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
}));

export const AcademicCard = ({ title, children, severity = 'primary' }: AcademicCardProps) => {
  return (
    <StyledPaper severity={severity}>
      <Typography variant="h6" color="primary.main">
        {title}
      </Typography>
      <Box>{children}</Box>
    </StyledPaper>
  );
};
