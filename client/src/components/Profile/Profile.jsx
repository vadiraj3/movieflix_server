import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Typography, Button, Box } from '@mui/material';
import {
	useGetUserFavoriteMovieDataQuery,
	useGetUserWatchlistedMovieDataQuery,
} from '../../services/KFI';
import { ExitToApp } from '@mui/icons-material';
import RatedCards from '../RatedCards/RatedCards';

const Profile = () => {
	const { username, userId } = useSelector((state) => state.auth);

	const {
		data: favorites,
		refetch: refetchedFavorites,
		error: FavoritesError,
	} = useGetUserFavoriteMovieDataQuery(userId);

	const { data: watchlisted, refetch: refetchedWatchlist } =
		useGetUserWatchlistedMovieDataQuery(userId);

	const logout = () => {
		localStorage.removeItem('token');
		localStorage.clear();
		window.location.href = '/';
	};

	useEffect(() => {
		refetchedFavorites();
		refetchedWatchlist();
	}, []);
	return (
		<Box style={{ padding: '10px' }}>
			<Box
				display="flex"
				justifyContent="space-between"
				flexWrap="wrap"
				alignItems="center"
			>
				<Typography variant="h4" gutterBottom>
					Dashboard
				</Typography>
				<Button color="inherit" onClick={logout}>
					Logout &nbsp; <ExitToApp />
				</Button>
			</Box>
			{!favorites?.result?.length && !watchlisted?.result?.length ? (
				<Typography variant="h5">
					Your Favorite and Watchlisted Movies Will Appear Here
				</Typography>
			) : (
				<>
					{!favorites?.result?.length ? (
						<Typography variant="h5">
							Movies You Liked Will Appear Here
						</Typography>
					) : (
						<Box>
							<RatedCards title="Favorites" data={favorites} />
						</Box>
					)}
					{!watchlisted?.result?.length ? (
						<Typography variant="h5">
							Watchlist Some Movies to see them here
						</Typography>
					) : (
						<Box>
							<RatedCards title="Watchlisted" data={watchlisted} />
						</Box>
					)}
				</>
			)}
		</Box>
	);
};

export default Profile;
