import React from 'react';
import { Grid, Typography, Grow, Tooltip, Rating, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import useStyles from './style';

const Movie = ({ movie, index }) => {
	const classes = useStyles();
	return (
		<Grid item xs={12} sm={6} md={3} lg={2} xl={2} className={classes.movie}>
			<Grow in timeout={(index + 1) * 250}>
				<Link className={classes.link} to={`/movie-information/${movie.id}`}>
					<img
						className={classes.image}
						alt={movie.title}
						src={movie.poster_path}
					/>
				</Link>
			</Grow>
			<Box>
				<Typography
					className={classes.title}
					align="center"
					variant="subtitle1"
					fontSize="20px"
					style={{ margin: 'auto' }}
				>
					{movie.title}
				</Typography>

				<Tooltip disableTouchListener title={movie.vote_average}>
					<Rating value={movie.vote_average} precision={0.1} />
				</Tooltip>
			</Box>
		</Grid>
	);
};

export default Movie;
