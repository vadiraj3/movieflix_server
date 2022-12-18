import { createSlice } from '@reduxjs/toolkit';

export const genreIdOrCategory = createSlice({
	name: 'genreOrCategory',
	initialState: {
		genreIdOrCategoryName: '',
		page: 1,
		searchQuery: '',
	},
	reducers: {
		selectGenreOrCategory: (state, action) => {
			state.genreIdOrCategoryName = action.payload;
			state.searchQuery = '';
		},
		searchMovie: (state, action) => {
			state.searchQuery = action.payload;
		},
	},
});

export const { selectGenreOrCategory, searchMovie } = genreIdOrCategory.actions;

export default genreIdOrCategory.reducer;
