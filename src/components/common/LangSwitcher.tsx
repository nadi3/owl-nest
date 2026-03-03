import { Button, Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface LangSwitcherProps {
  isOpen: boolean;
}

const LangSwitcher = ({ isOpen }: LangSwitcherProps) => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;

  return (
    <Stack
      direction={isOpen ? 'row' : 'column'}
      spacing={1}
      alignItems="center"
      justifyContent={isOpen ? 'flex-start' : 'center'}
    >
      {['fr', 'en'].map((lng) => (
        <Button
          key={lng}
          onClick={() => i18n.changeLanguage(lng)}
          sx={{
            minWidth: 40,
            p: 0.5,
            fontWeight: currentLang === lng ? 800 : 400,
            color: currentLang === lng ? 'secondary.main' : 'primary.contrastText',
            fontSize: '1rem',
            '&:hover': { color: 'secondary.light', backgroundColor: 'transparent' },
          }}
        >
          {lng.toUpperCase()}
        </Button>
      ))}
    </Stack>
  );
};

export default LangSwitcher;
