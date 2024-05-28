import { Box, Container, Grid, LinearProgress } from '@mui/material';
import { useState, useCallback } from 'react';
import {
  useGetConfigurationQuery,
  useGetMoviesQuery,
} from '../services/tmdbApi';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { MoviesFilter } from '../components/movies/MoviesFilter';
import MovieCard from '../components/movies/MovieCard';
import { type MoviesQuery } from '../types/tmdb-types';
import { Filters } from '../types/types';
import useFavoriteMovies from '../hooks/useFavoriteMovies';
import { formatImageUrl } from '../utils/formatImageUrl';
import { WarningMessage } from '../components/ui/WarningMessage';

const initialQuery = {
  page: 1,
  filters: {},
};

const Movies = () => {
  const [query, setQuery] = useState<MoviesQuery>(initialQuery);

  const { favoriteMovies, handleAddToFavorites, handleRemoveFromFavorites } =
    useFavoriteMovies();

  const { data: configuration } = useGetConfigurationQuery();
  const { data, isFetching } = useGetMoviesQuery(query);
  const movies = data?.results;
  const hasMorePages = data?.hasMorePages;

  const onIntersect = useCallback(() => {
    if (hasMorePages) {
      setQuery((q) => ({ ...q, page: q.page + 1 }));
    }
  }, [hasMorePages]);

  const [targetRef] = useIntersectionObserver({ onIntersect });

  const applyFilters = (filters: Filters) => {
    const moviesFilters = {
      keywords: filters?.keywords.map((k) => k.id),
      genres: filters?.genres,
    };

    setQuery({
      page: 1,
      filters: moviesFilters,
    });
  };

  return (
    <Grid
      container
      spacing={2}
      sx={{ flexWrap: 'nowrap' }}
      direction={{ xs: 'column', md: 'row' }}
    >
      <Grid item xs="auto">
        <MoviesFilter onApply={applyFilters} />
      </Grid>
      <Grid item xs={12}>
        <Container maxWidth="lg">
          {!isFetching && !movies?.length && (
            <WarningMessage message="No movies were found that match your query." />
          )}
          <Grid container spacing={2}>
            {movies?.map((m) => (
              <Grid item key={m.id} xs={12} sm={6} md={4}>
                <MovieCard
                  key={m.id}
                  id={m.id}
                  title={m.title}
                  isFavoriteMovie={favoriteMovies.includes(m.id)}
                  image={formatImageUrl(m.backdrop_path, configuration)}
                  toggleFavorite={
                    favoriteMovies.includes(m.id)
                      ? handleRemoveFromFavorites
                      : handleAddToFavorites
                  }
                />
              </Grid>
            ))}
          </Grid>
          <Box ref={targetRef}>
            {isFetching && <LinearProgress color="secondary" sx={{ mt: 3 }} />}
          </Box>
        </Container>
      </Grid>
    </Grid>
  );
};

export default Movies;
