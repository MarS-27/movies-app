import { Container, Grid, LinearProgress, Typography } from '@mui/material';
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

const initialQuery = {
  page: 1,
  filters: {},
};

const Movies = () => {
  const [query, setQuery] = useState<MoviesQuery>(initialQuery);

  const { data: configuration } = useGetConfigurationQuery();
  const { data, isFetching } = useGetMoviesQuery(query);
  const movies = data?.results;
  const hasMorePages = data?.hasMorePages;

  function formatImageUrl(imagePath?: string | null) {
    return imagePath && configuration
      ? `${configuration.images.base_url}w780${imagePath}`
      : undefined;
  }

  const onIntersect = useCallback(() => {
    if (hasMorePages) {
      setQuery((q) => ({ ...q, page: q.page + 1 }));
    }
  }, [hasMorePages]);

  const [targetRef] = useIntersectionObserver({ onIntersect });

  const handleAddToFavorites = useCallback(
    (id: number): void =>
      alert(`Not implemented! Movie ${id} is adding  to favorites.`),
    [],
  );

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
    <Grid container spacing={2} sx={{ flexWrap: 'nowrap' }}>
      <Grid item xs="auto">
        <MoviesFilter onApply={applyFilters} />
      </Grid>
      <Grid item xs={12}>
        <Container maxWidth="lg">
          {!isFetching && !movies?.length && (
            <Typography variant="h6">
              No movies were found that match your query.
            </Typography>
          )}
          <Grid container spacing={4}>
            {movies?.map((m) => (
              <Grid item key={m.id} xs={12} sm={6} md={4}>
                <MovieCard
                  key={m.id}
                  id={m.id}
                  title={m.title}
                  overview={m.overview}
                  popularity={m.popularity}
                  image={formatImageUrl(m.backdrop_path)}
                  onAddToFavorite={handleAddToFavorites}
                />
              </Grid>
            ))}
          </Grid>
          <div ref={targetRef}>
            {isFetching && <LinearProgress color="secondary" sx={{ mt: 3 }} />}
          </div>
        </Container>
      </Grid>
    </Grid>
  );
};

export default Movies;
