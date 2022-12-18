import { CircularProgress, Typography, Box } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useGetMoviesQuery } from '../../services/KFI';
import { useSelector } from 'react-redux';
import MovieList from '../MovieList/MovieList';

import Pagination from '../Pagination/Pagination';

const Movies = () => {
	const [page, setPage] = useState(1);
	const { genreIdOrCategoryName, searchQuery } = useSelector(
		(state) => state.currentGenreOrCategory
	);
	const { data, error, isFetching } = useGetMoviesQuery({
		genreIdOrCategoryName,
		page,
		searchQuery,
	});

	const result = data?.result;

	const totalPages = Math.ceil(data?.result[0]?.count / 24);

	if (isFetching) {
		return (
			<Box display="flex" justifyContent="center">
				<CircularProgress size="4rem" />
			</Box>
		);
	}

	if (!result?.length) {
		return (
			<Box display="flex" alignItems="center" mt="2" mr="5">
				<Typography variant="h5">
					There are no movies that match your search
				</Typography>
			</Box>
		);
	}

	if (error) return 'There was a error. Please try again later';

	return (
		<div>
			{result && (
				<>
					<MovieList movies={result} />
					<Pagination page={page} setPage={setPage} totalPages={totalPages} />
				</>
			)}
		</div>
	);
};

export default Movies;
