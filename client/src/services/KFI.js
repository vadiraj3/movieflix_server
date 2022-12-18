import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const kfiapi = createApi({
	reducerPath: 'kfiapi',
	baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/kfi-api/v1' }),

	//get Movies
	endpoints: (builder) => ({
		getMovies: builder.query({
			query: ({ genreIdOrCategoryName, page, searchQuery }) => {
				if (searchQuery) {
					return `movies/query?query=${searchQuery}`;
				}
				if (
					genreIdOrCategoryName &&
					typeof genreIdOrCategoryName === 'string'
				) {
					return `movies/genreId/page?genreId=${genreIdOrCategoryName}&page=${page}`;
				}
				if (
					genreIdOrCategoryName &&
					typeof genreIdOrCategoryName === 'number'
				) {
					return `movies/genreId/page?genreId=${genreIdOrCategoryName}&page=${page}`;
				}

				return `movies/popular?page=${page}`;
			},
		}),
		//get genres
		getGenres: builder.query({
			query: () => 'movies/genres',
		}),

		//get single movie info
		getMovieInfo: builder.query({
			query: (id) => {
				return `movies/movie-details?id=${id}`;
			},
		}),

		//get User specific list

		//get recommendations
		getMovieRecommendation: builder.query({
			query: (id) => {
				return `movies/movie-recommendations?movieId=${id}`;
			},
		}),

		getActorInfo: builder.query({
			query: (id) => `actors/actor?id=${id}`,
		}),

		//get Actor's movies
		getActorMovies: builder.query({
			query: (id) => `actors/actor-movies?id=${id}`,
		}),

		//get Actor's movies
		getActorMovies: builder.query({
			query: (id) => `actors/actor-movies?id=${id}`,
		}),

		//get users favorites movies array
		getUserFavorites: builder.query({
			query: (id) => `user/get-favorites?id=${id}`,
		}),

		//get users watchlisted movies array
		getUserWatchlisted: builder.query({
			query: (id) => `user/get-watchlisted?id=${id}`,
		}),

		//get users favorites movies array
		getUserFavoriteMovieData: builder.query({
			query: (id) => `movies/get-favorite-movies-data?id=${id}`,
		}),

		//get users watchlisted movies array
		getUserWatchlistedMovieData: builder.query({
			query: (id) => `movies/get-watchlisted-movies-data?id=${id}`,
		}),
	}),
});

export const {
	useGetMoviesQuery,
	useGetGenresQuery,
	useGetMovieInfoQuery,
	useGetMovieRecommendationQuery,
	useGetActorInfoQuery,
	useGetActorMoviesQuery,
	useGetUserFavoritesQuery,
	useGetUserWatchlistedQuery,
	useGetUserWatchlistedMovieDataQuery,
	useGetUserFavoriteMovieDataQuery,
} = kfiapi;
