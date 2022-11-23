import React from 'react';
import { CssBaseline } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import { Actors, Movies, MovieInformation, Profile, Navbar } from './index';
import useStyles from './style';
const App = () => {
	const classes = useStyles();
	return (
		<div className={classes.root}>
			<CssBaseline />
			<Navbar />
			<main className={classes.content}>
				<div className={classes.toolbar} />
				<Routes>
					<Route path="/movies" element={<Movies />} />{' '}
					<Route path="/actors" element={<Actors />} />{' '}
					<Route path="/movie-information" element={<MovieInformation />} />{' '}
					<Route path="/profile" element={<Profile />} />{' '}
				</Routes>
			</main>
		</div>
	);
};

export default App;
