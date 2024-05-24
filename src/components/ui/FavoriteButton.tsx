import { IconButton, Tooltip } from '@mui/material';
import { type FC } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';

type FavoriteButtonProps = {
  isFavoriteMovie: boolean;
  onClick(): void;
};

export const FavoriteButton: FC<FavoriteButtonProps> = ({
  isFavoriteMovie,
  onClick,
}) => {
  return (
    <Tooltip
      title={isFavoriteMovie ? 'Remove from favorites' : 'Add to favorites'}
    >
      <IconButton
        color={isFavoriteMovie ? 'secondary' : 'default'}
        onClick={onClick}
      >
        <FavoriteIcon />
      </IconButton>
    </Tooltip>
  );
};
