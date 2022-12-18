import React, { useState } from 'react';
import { CssBaseline } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import { Actors, Movies, MovieInformation, Profile, Navbar } from './index';
import useStyles from './style';
import Homepage from './Homepage/Homepage';
import { AuthContext } from '../contexts/authContext';
import { useSelector } from 'react-redux';
import FileUpload from './FileUpload';

const App = () => {
	const classes = useStyles();
	const { loggedIn } = useSelector((state) => state.auth);
	const auth = useSelector((state) => state.auth);
	return (
		<>
			{!loggedIn ? (
				<Homepage />
			) : (
				<div className={classes.root}>
					<CssBaseline />

					<Navbar />
					<main className={classes.content}>
						<div className={classes.toolbar} />
						<Routes>
							<Route path="/" element={<Movies />} />{' '}
							<Route path="/file" element={<FileUpload />} />{' '}
							<Route path="/actor/:id" element={<Actors />} />{' '}
							<Route
								path="/movie-information/:id"
								element={<MovieInformation />}
							/>{' '}
							<Route path="/profile/:id" element={<Profile />} />{' '}
						</Routes>
					</main>
				</div>
			)}
		</>
	);
};

export default App;
