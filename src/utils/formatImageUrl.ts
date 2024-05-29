import { Configuration } from '../types/tmdb-types';

export function formatImageUrl(
  imagePath?: string | null,
  configuration?: Configuration,
) {
  return imagePath && configuration
    ? `${configuration.images.secure_base_url}w780${imagePath}`
    : undefined;
}
