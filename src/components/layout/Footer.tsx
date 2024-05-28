import { Container, Typography } from '@mui/material';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';

export const Footer = () => {
  return (
    <Container
      maxWidth="lg"
      component="footer"
      sx={{
        borderTop: (theme) => `1px solid ${theme.palette.divider}`,
        mt: { xs: 3, sm: 5 },
        p: { xs: 2, sm: 3 },
      }}
    >
      <Typography variant="body2" color="text.secondary" align="center">
        Created by MarS{' '}
        <FavoriteRoundedIcon fontSize="small" color="secondary" />,{' '}
        {new Date().getFullYear()}
      </Typography>
    </Container>
  );
};
