import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
// import authApi from '../services/authApi';
import { kfiapi } from './../services/KFI';
import { authApi } from '../services/authApi';
import genreOrCategoryReducer from '../features/currentGenreOrCategory';
import authReducer from '../features/auth';

export default configureStore({
	reducer: {
		[kfiapi.reducerPath]: kfiapi.reducer,
		[authApi.reducerPath]: authApi.reducer,
		currentGenreOrCategory: genreOrCategoryReducer,
		auth: authReducer,
	},

	middleware: (
		getDefaultMiddleware // Getting TS2322 error: type is not assignable to type...
	) => getDefaultMiddleware().concat(kfiapi.middleware),
});
