import { createSlice } from '@reduxjs/toolkit';

export const auth = createSlice({
	name: 'auth',
	initialState: {
		userId: '',
		username: '',
		loggedIn: false,
		favoritedMovies: [],
		watchListedMovies: [],
	},
	reducers: {
		userLogin: (state, action) => {
			state.loggedIn = action.payload;
		},
		currentUser: (state, action) => {
			state.username = action.payload;
		},
		userId: (state, action) => {
			state.userId = action.payload;
		},
		addFavoritedMovies: (state, action) => {
			state.favoritedMovies.push(action.payload);
		},
		addWatchListedMovies: (state, action) => {
			state.watchListedMovies.push(action.payload);
		},
	},
});

export const {
	addFavoritedMovies,
	addWatchListedMovies,
	currentUser,
	userLogin,
	userId,
} = auth.actions;

export default auth.reducer;
