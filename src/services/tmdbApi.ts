import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import configuration from '../configuration';
import type {
  Configuration,
  Genre,
  KeywordItem,
  MovieDetails,
  MoviesQuery,
  MoviesState,
  PageResponse,
  SearchQuery,
} from '../types/tmdb-types';

export const tmdbApi = createApi({
  reducerPath: 'tmdbApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${configuration.apiUrl}/3`,
    prepareHeaders(headers) {
      headers.set('Accept', 'application/json');
      headers.set('Authorization', `Bearer ${configuration.apiToken}`);
    },
  }),
  endpoints: (builder) => ({
    getConfiguration: builder.query<Configuration, void>({
      query: () => '/configuration',
    }),
    getMovies: builder.query<MoviesState, MoviesQuery>({
      query(moviesQuery) {
        const params = new URLSearchParams({
          page: moviesQuery.page.toString(),
        });

        if (moviesQuery.filters.keywords?.length) {
          params.append(
            'with_keywords',
            moviesQuery.filters.keywords.join('|'),
          );
        }

        if (moviesQuery.filters.genres?.length) {
          params.append('with_genres', moviesQuery.filters.genres.join(','));
        }

        const query = params.toString();
        const path = `/discover/movie?${query}`;

        return path;
      },
      transformResponse(response: PageResponse<MovieDetails>, _, arg) {
        return {
          results: response.results,
          lastPage: arg.page,
          hasMorePages: arg.page < response.total_pages,
        };
      },
      serializeQueryArgs({ endpointName }) {
        return endpointName;
      },
      merge(currentCacheData, responseData) {
        if (responseData.lastPage === 1) {
          currentCacheData.results = responseData.results;
        } else {
          currentCacheData.results.push(...responseData.results);
        }

        currentCacheData.hasMorePages = responseData.hasMorePages;
        currentCacheData.lastPage = responseData.lastPage;
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),
    getKeywords: builder.query<KeywordItem[], string>({
      query: (query) => `/search/keyword?query=${query}`,
      transformResponse: (response: PageResponse<KeywordItem>) =>
        response.results,
    }),
    getGenres: builder.query<Genre[], void>({
      query: () => '/genre/movie/list',
      transformResponse: (response: { genres: Genre[] }) => response.genres,
    }),
    getMovieById: builder.query<MovieDetails, string>({
      query: (movieId) => `/movie/${movieId}`,
    }),
    searchMovies: builder.query<MoviesState, SearchQuery>({
      query: (searchQuery) =>
        `/search/movie?query=${searchQuery.query}&page=${searchQuery.page}`,
      transformResponse(response: PageResponse<MovieDetails>, _, arg) {
        return {
          results: response.results,
          lastPage: arg.page,
          hasMorePages: arg.page < response.total_pages,
        };
      },
      serializeQueryArgs({ endpointName }) {
        return endpointName;
      },
      merge(currentCacheData, responseData) {
        if (responseData.lastPage === 1) {
          currentCacheData.results = responseData.results;
        } else {
          currentCacheData.results.push(...responseData.results);
        }

        currentCacheData.hasMorePages = responseData.hasMorePages;
        currentCacheData.lastPage = responseData.lastPage;
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),
  }),
});

export const {
  useGetMoviesQuery,
  useGetConfigurationQuery,
  useGetKeywordsQuery,
  useGetGenresQuery,
  useGetMovieByIdQuery,
  useSearchMoviesQuery,
} = tmdbApi;
