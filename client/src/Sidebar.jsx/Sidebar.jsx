import React, { useEffect } from 'react';
import {
	Divider,
	List,
	ListItem,
	ListItemText,
	ListSubheader,
	ListItemIcon,
	Box,
	CircularProgress,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/styles';
import useStyles from './styles';
import { useGetGenresQuery, useGetMoviesQuery } from '../services/KFI';
import { icons } from '../assets/index';
import { selectGenreOrCategory } from '../features/currentGenreOrCategory';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import MOVIEFLIX from '../assets/MOVIEFLIX.png';
//const redLogo = 'https://fontmeme.com/permalink/201930/6854ae5c7f7659'
const blueLogo = `https://fontmeme.com/permalink/210930/8531c658a743debe1e1aa1a2fc82006e.png`;

const categories = [
	{ label: 'Popular', value: 'popular' },
	{ label: 'Top Rated', value: 'top_rated' },
	{ label: 'Upcoming', value: 'upcoming' },
];

function Sidebar({ setMobileOpen }) {
	const { genreIdOrCategoryName } = useSelector(
		(state) => state.currentGenreOrCategory
	);
	const theme = useTheme();
	const classes = useStyles();
	const navigate = useNavigate();

	const dispatch = useDispatch();
	const { data, isFetching, error } = useGetGenresQuery();

	const handleClick = () => {
		dispatch(useGetMoviesQuery());
	};

	useEffect(() => {
		setMobileOpen(false);
	}, [genreIdOrCategoryName]);

	return (
		<>
			<Link to="/" className={classes.imageLink} onClick={handleClick}>
				<img className={classes.image} src={MOVIEFLIX} alt="filmpire logo" />
			</Link>
			<Divider />
			<List>
				<ListSubheader>Categories</ListSubheader>
				{categories.map(({ label, value }) => (
					<Link key={value} className={classes.links} to="/">
						<ListItem
							onClick={() => {
								dispatch(selectGenreOrCategory(value));
							}}
						>
							<ListItemIcon sx={{ minWidth: '40px' }}>
								<img
									src={icons[label]}
									className={classes.genreImages}
									height={30}
								/>
							</ListItemIcon>
							<ListItemText primary={label} />
						</ListItem>
					</Link>
				))}
			</List>
			<Divider />
			<List>
				<ListSubheader>Genres</ListSubheader>
				{/* {isFetching ? (
					<Box display="flex" justifyContent="center">
						<CircularProgress />
					</Box>
				) : ( */}
				{data?.result?.map(({ name, id }) => (
					<Link key={id} className={classes.links} to="/">
						<ListItem
							onClick={() => {
								dispatch(selectGenreOrCategory(id));
							}}
							alignItems="center"
						>
							<ListItemIcon sx={{ minWidth: '40px' }}>
								<img
									src={icons[name]}
									className={classes.genreImages}
									height={25}
									width={25}
								/>
							</ListItemIcon>
							<ListItemText primary={name} />
						</ListItem>
					</Link>
				))}
			</List>
		</>
	);
}

export default Sidebar;
