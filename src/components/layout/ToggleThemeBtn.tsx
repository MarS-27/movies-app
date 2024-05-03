import { useTheme } from '@mui/material/styles';
import { IconButton } from '@mui/material';
import ModeNightIcon from '@mui/icons-material/ModeNight';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import { useContext } from 'react';
import ColorModeContext from '../../context/themeContext';

export const ToggleThemeBtn = () => {
  const theme = useTheme();
  const { toggleColorMode } = useContext(ColorModeContext);

  return (
    <IconButton
      sx={{
        width: '50px',
        height: '50px',
        marginLeft: '10px',
        color: (theme) => theme.palette.primary.contrastText,
      }}
      size="large"
      onClick={toggleColorMode}
    >
      {theme.palette.mode === 'dark' ? (
        <WbSunnyIcon fontSize="medium" />
      ) : (
        <ModeNightIcon fontSize="medium" />
      )}
    </IconButton>
  );
};
