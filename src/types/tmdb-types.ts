export type PageResponse<TResult> = {
  page: number;
  results: TResult[];
  total_pages: number;
  total_results: number;
};

export type MovieDetails = {
  id: number;
  title: string;
  overview: string;
  popularity: number;
  genres: Genre[];
  vote_average: number;
  vote_count: number;
  backdrop_path?: string | null;
  poster_path?: string | null;
};

export type MoviesFilters = {
  keywords?: number[];
  genres?: number[];
};

export type MoviesQuery = {
  page: number;
  filters: MoviesFilters;
};

export type Genre = {
  id: number;
  name: string;
};

export type Configuration = {
  images: {
    base_url: string;
  };
};

export type KeywordItem = {
  id: number;
  name: string;
};

export type MoviesState = {
  results: MovieDetails[];
  lastPage: number;
  hasMorePages: boolean;
};
