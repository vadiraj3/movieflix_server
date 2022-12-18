import React from 'react';
import { Typography, Box } from '@mui/material';
import useStyles from '../style.js';
import Movie from '../Movie/Movie.jsx';
import MovieList from '../MovieList/MovieList.jsx';

const RatedCards = ({ title, data }) => {
	const classes = useStyles();
	return (
		<Box sx={{ marginBottom: '30px' }}>
			<Typography
				variant="h5"
				gutterBottom
				fontWeight="500"
				sx={{ marginBottom: '15px' }}
			>
				{title}
			</Typography>
			<Box className={classes.container}>
				<MovieList movies={data?.result} />
			</Box>
		</Box>
	);
};

export default RatedCards;
