import { useCallback, useEffect, useState } from 'react';

export default function useFavoriteMovies() {
  const [favoriteMovies, setFavoriteMovies] = useState<number[]>([]);

  const handleAddToFavorites = useCallback(
    (id: number): void => {
      const updatedFavoriteMovies = [...favoriteMovies, id];

      setFavoriteMovies(updatedFavoriteMovies);
      localStorage.setItem(
        'favoriteMovies',
        JSON.stringify(updatedFavoriteMovies),
      );
    },
    [favoriteMovies],
  );

  const handleRemoveFromFavorites = useCallback(
    (id: number): void => {
      const updatedFavoriteMovies = favoriteMovies.filter(
        (item) => item !== id,
      );

      setFavoriteMovies(updatedFavoriteMovies);
      localStorage.setItem(
        'favoriteMovies',
        JSON.stringify(updatedFavoriteMovies),
      );
    },
    [favoriteMovies],
  );

  useEffect(() => {
    const localFavoriteMovies = localStorage.getItem('favoriteMovies');

    if (localFavoriteMovies) {
      setFavoriteMovies(JSON.parse(localFavoriteMovies));
    }
  }, []);

  return { favoriteMovies, handleAddToFavorites, handleRemoveFromFavorites };
}
