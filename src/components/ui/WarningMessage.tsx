import { Typography } from '@mui/material';
import { type FC } from 'react';

type WarningMessageProps = {
  message: string;
};

export const WarningMessage: FC<WarningMessageProps> = ({ message }) => {
  return (
    <Typography
      variant="h6"
      sx={{ color: (theme) => theme.palette.error.main }}
    >
      {message}
    </Typography>
  );
};
