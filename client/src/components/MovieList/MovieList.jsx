import React from 'react';
import { Grid } from '@mui/material';
import Movie from '../Movie/Movie';
import useStyles from './style';
import Pagination from '../Pagination/Pagination';

const MovieList = ({ movies }) => {
	const classes = useStyles();
	return (
		<>
			<Grid container className={classes.moviesContainer}>
				{movies &&
					movies?.map((movie, index) => {
						return <Movie key={index} movie={movie} index={index} />;
					})}
			</Grid>
		</>
	);
};

export default MovieList;
