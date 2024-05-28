import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { type FC, memo } from 'react';
import { FavoriteButton } from '../ui/FavoriteButton';

type MovieCardProps = {
  id: number;
  title: string;
  isFavoriteMovie: boolean;
  toggleFavorite(id: number): void;
  image?: string;
};

const MovieCard: FC<MovieCardProps> = ({
  id,
  title,
  isFavoriteMovie,
  toggleFavorite,
  image = '/movie-thumb.png',
}) => {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia component="div" sx={{ pt: '56.25%' }} image={image} />
      <CardContent sx={{ flexGrow: 1, padding: 1 }}>
        <Typography variant="body1" component="p">
          {title}
        </Typography>
      </CardContent>
      <CardActions
        sx={{ paddingTop: 0, display: 'flex', justifyContent: 'space-between' }}
      >
        <Button component={RouterLink} to={`/movie/${id}`} color="secondary">
          Details
        </Button>
        <FavoriteButton
          isFavoriteMovie={isFavoriteMovie}
          onClick={() => toggleFavorite(id)}
        />
      </CardActions>
    </Card>
  );
};

export default memo(MovieCard);
