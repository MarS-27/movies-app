import {
  Box,
  Container,
  Divider,
  Grid,
  LinearProgress,
  Typography,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import {
  useGetConfigurationQuery,
  useGetMovieByIdQuery,
} from '../services/tmdbApi';
import { WarningMessage } from '../components/ui/WarningMessage';
import { formatImageUrl } from '../utils/formatImageUrl';
import StarsIcon from '@mui/icons-material/Stars';
import { FavoriteButton } from '../components/ui/FavoriteButton';
import useFavoriteMovies from '../hooks/useFavoriteMovies';

const Movie = () => {
  const { movieId } = useParams();

  const { data: configuration } = useGetConfigurationQuery();
  const { data: movie, isFetching } = useGetMovieByIdQuery(movieId || '');

  const { favoriteMovies, handleAddToFavorites, handleRemoveFromFavorites } =
    useFavoriteMovies();

  return (
    <>
      {!isFetching && !movie && (
        <WarningMessage message="The movie you requested was not found." />
      )}
      {isFetching && <LinearProgress color="secondary" sx={{ mt: 1 }} />}
      {movie && (
        <Grid
          container
          spacing={{ xs: 1, md: 2 }}
          sx={{ flexWrap: 'nowrap' }}
          direction={{ xs: 'column', sm: 'row' }}
        >
          <Grid item xs={6}>
            <img
              style={{
                width: '100%',
                height: 'auto',
                objectFit: 'cover',
                borderRadius: '8px',
              }}
              src={
                movie?.poster_path
                  ? formatImageUrl(movie.poster_path, configuration)
                  : '/movie-thumb.png'
              }
              alt={movie?.title}
            />
          </Grid>
          <Grid item xs={12}>
            <Container maxWidth="lg">
              <Typography variant="h5" gutterBottom>
                {movie?.title}
              </Typography>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Box display="flex" gap={1}>
                  <StarsIcon color="success" width={4} />
                  <Typography variant="body1">
                    {movie?.vote_average.toFixed(1)} / {movie?.vote_count}
                  </Typography>
                </Box>
                <FavoriteButton
                  isFavoriteMovie={favoriteMovies.includes(movie.id)}
                  onClick={
                    favoriteMovies.includes(movie.id)
                      ? () => handleRemoveFromFavorites(movie.id)
                      : () => handleAddToFavorites(movie.id)
                  }
                />
              </Box>
              <Divider
                variant="fullWidth"
                sx={{
                  marginY: 2,
                  borderColor: (theme) => theme.palette.background.paper,
                  borderBottomWidth: '2px',
                }}
              />
              <Typography variant="body1">{movie?.overview}</Typography>
              <Box
                display="flex"
                gap={1}
                alignItems="center"
                marginTop={2}
                flexWrap="wrap"
              >
                {movie?.genres.map((g) => (
                  <Box
                    key={g.id}
                    color="secondary"
                    sx={{
                      borderRadius: '20px',
                      borderWidth: '2px',
                      borderColor: (theme) => theme.palette.secondary.main,
                      borderStyle: 'solid',
                      padding: '4px 8px',
                    }}
                  >
                    <Typography
                      variant="body2"
                      whiteSpace="nowrap"
                      color="secondary"
                    >
                      {g.name}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Container>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default Movie;
