import { type FC, type ReactNode } from 'react';
import { Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

type HeaderLinkProps = {
  to: string;
  children: ReactNode;
};

export const HeaderLink: FC<HeaderLinkProps> = ({ to, children }) => {
  return (
    <Link
      component={RouterLink}
      to={to}
      variant="button"
      color="inherit"
      sx={{ my: 1, mx: 1.5 }}
    >
      {children}
    </Link>
  );
};
