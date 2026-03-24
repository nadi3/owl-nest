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
            color: currentLang === lng ? 'primary.main' : 'primary.light',
            fontSize: '1rem',
            '&:hover': { color: 'primary.main', backgroundColor: 'transparent' },
          }}
        >
          {lng.toUpperCase()}
        </Button>
      ))}
    </Stack>
  );
};

export default LangSwitcher;
