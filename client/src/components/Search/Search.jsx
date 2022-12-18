import React, { useState } from 'react';
import { TextField, InputAdornment } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { searchMovie } from '../../features/currentGenreOrCategory';
import { useNavigate } from 'react-router-dom';
import useStyles from './style';

const Search = ({ width }) => {
	const classes = useStyles();
	const [query, setQuery] = useState('');
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleKeyPress = (e) => {
		if (e.key === 'Enter') {
			let copyQuery = query.slice(0, 4);
			dispatch(searchMovie(copyQuery));
			navigate('/');
		}
	};
	return (
		<div className={classes.searchContainer}>
			<TextField
				style={{ width: width }}
				variant="standard"
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				onKeyPress={handleKeyPress}
				InputProps={{
					className: classes.input,
					startAdornment: (
						<InputAdornment position="start">
							<SearchIcon />
						</InputAdornment>
					),
				}}
			/>
		</div>
	);
};

export default Search;
