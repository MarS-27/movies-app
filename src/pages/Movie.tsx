import {
  Box,
  Container,
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

const Movie = () => {
  const { movieId } = useParams();

  const { data: configuration } = useGetConfigurationQuery();
  const { data: movie, isFetching } = useGetMovieByIdQuery(movieId || '');

  return (
    <Box sx={{}}>
      {!isFetching && !movie && (
        <WarningMessage message="The movie you requested was not found." />
      )}
      {isFetching && <LinearProgress color="secondary" sx={{ mt: 1 }} />}
      <Grid
        container
        spacing={2}
        sx={{ flexWrap: 'nowrap' }}
        direction={{ xs: 'column', md: 'row' }}
      >
        <Grid item xs="auto" maxWidth="sm">
          <img
            src={formatImageUrl(movie?.poster_path, configuration)}
            alt={movie?.title}
          />
        </Grid>
        <Grid item xs={12}>
          <Container maxWidth="lg">
            <Typography variant="h3">{movie?.title}</Typography>
          </Container>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Movie;
