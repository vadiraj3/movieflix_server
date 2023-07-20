import React, { useState, useEffect } from 'react';
import {
	Modal,
	Box,
	Rating,
	CircularProgress,
	useMediaQuery,
	Typography,
	Button,
	ButtonGroup,
	Grid,
} from '@mui/material';
import {
	Movie as MovieIcon,
	FavoriteBorderOutlined,
	ArrowBack,
	Theaters,
	Language,
	PlusOne,
	Remove,
	Favorite,
} from '@mui/icons-material';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import {
	useGetMovieRecommendationQuery,
	useGetUserFavoritesQuery,
	useGetMovieInfoQuery,
	useGetUserWatchlistedQuery,
} from '../../services/KFI';
import { selectGenreOrCategory } from '../../features/currentGenreOrCategory';
import { useDispatch, useSelector } from 'react-redux';
import { icons } from '../../assets';

import useStyles from './style';
import MovieList from './../MovieList/MovieList';

const MovieInformation = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const classes = useStyles();
	const isMobile = useMediaQuery('(max-width:600px)');
	const dispatch = useDispatch();
	const { data, error, isFetching } = useGetMovieInfoQuery(id);
	const [open, setOpen] = useState(false);

	useEffect(() => {}, []);
	const { data: recommended, isFetching: isRecommendedFetching } =
		useGetMovieRecommendationQuery(id);

	const { userId } = useSelector((state) => state.auth);

	const {
		data: favorites,
		isFetching: isFavoritesFetcing,
		error: FavoritesError,
	} = useGetUserFavoritesQuery(userId);

	const [isMovieFavorited, setIsMovieFavorited] = useState(
		favorites?.result?.includes(id)
	);

	const { data: watchlisted } = useGetUserWatchlistedQuery(userId);

	const [isMovieWatchListed, setIsMovieWatchListed] = useState(
		watchlisted?.result?.includes(id)
	);

	const addToFavorites = async () => {
		setIsMovieFavorited((prev) => !prev);
		try {
			const favorites = await axios.post(
				`http://localhost:3000/kfi-api/v1/user/add-to-favorites`,
				{ movie_id: id, user_id: userId },
				{
					headers: {
						authorization: `Bearer ${JSON.parse(
							localStorage.getItem('token')
						)}`,
					},
				}
			);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		setIsMovieFavorited(favorites?.result?.includes(id));
		setIsMovieWatchListed(watchlisted?.result?.includes(id));
	}, [favorites, watchlisted]);

	const addToWatchList = async () => {
		setIsMovieWatchListed((prev) => !prev);
		try {
			const watchlist = await axios.post(
				`http://localhost:3000/kfi-api/v1/user/add-to-watchlisted`,
				{ movie_id: id, user_id: userId },
				{
					headers: {
						authorization: `Bearer ${JSON.parse(
							localStorage.getItem('token')
						)}`,
					},
				}
			);
		} catch (error) {
			console.log(error);
		}
	};

	if (isFetching) {
		return (
			<Box display="flex" justifyContent="center" alignItems="center">
				<CircularProgress size="8rem" />
			</Box>
		);
	}

	if (error) {
		return (
			<Box display="flex" justifyContent="center" alignItems="center">
				<Link to="/">Something has gone wrong. Go back</Link>{' '}
			</Box>
		);
	}
	return (
		<Grid container className={classes.containerSpaceAround}>
			<Grid item lg={4} sm={12} style={{ textAlign: 'center' }}>
				<img className={classes.poster} src={data?.movieInfo[0]?.poster_path} />
			</Grid>
			<Grid item container direction="column" lg={7}>
				<Typography
					variant={isMobile ? 'h5' : 'h4'}
					align="center"
					gutterBottom
				>
					{data?.movieInfo[0]?.title} ({data?.movieInfo[0]?.release_date})
				</Typography>

				<Grid item className={classes.containerSpaceAround}>
					<Box display="flex" align="center">
						<Rating readOnly value={data?.movieInfo[0]?.vote_average ?? null} />
						<Typography
							variant="subtitle1"
							gutterBottom
							style={{ marginLeft: '10px' }}
						>
							{data?.movieInfo[0]?.vote_average} / 5
						</Typography>
					</Box>
					<Typography variant="subtitle1" gutterBottom>
						{' '}
						{data?.movieInfo[0]?.length} min / Kannada
					</Typography>
				</Grid>
				<Grid item className={classes.genresContainer}>
					{data?.genreInfo?.map((genre, i) => {
						return (
							<Link
								key={i}
								className={classes.links}
								onClick={() => {
									dispatch(selectGenreOrCategory(genre.id));
								}}
								to="/"
							>
								<img
									src={icons[genre.name]}
									className={classes.genreImage}
									height={25}
									width={25}
								/>
								<Typography variant="subtitle1" color="gray">
									{genre.name}
								</Typography>
							</Link>
						);
					})}
				</Grid>
				<Typography
					variant="h5"
					gutterBottom
					style={{ marginTop: '10px', textAlign: 'left' }}
				>
					Overview
				</Typography>
				<Typography variant="subtitle1" align="left" gutterBottom>
					{data?.movieInfo[0]?.overview}
				</Typography>
				<Typography variant="h5" gutterBottom align="left">
					Top Cast
				</Typography>
				<Grid container item spacing={2}>
					{data &&
						data?.actorInfo
							?.map(
								(actor, i) =>
									actor.profile_pic && (
										<Grid
											key={i}
											item
											xs={4}
											md={2}
											component={Link}
											to={`/actor/${actor.id}`}
											style={{ textDecoration: 'none' }}
										>
											<img
												src={`${actor.profile_pic}`}
												className={classes.castImage}
											/>
											<Typography color="textPrimary" align="center">
												{actor.firstname} {actor.lastname}
											</Typography>
											{data?.movieCast.map((cast) => {
												if (cast?.actor_id == actor?.id) {
													return (
														<Typography color="textSecondary" align="center">
															{cast?.role}
														</Typography>
													);
												}
											})}
										</Grid>
									)
							)
							.slice(0, 6)}
				</Grid>
				<Grid item container style={{ marginTop: '2rem' }}>
					<div className={classes.buttonsContainer}>
						<Grid item xs={12} sm={4} className={classes.buttonContainer}>
							<ButtonGroup variant="outlined" size="small">
								<Button
									target="_blank"
									rel="noreferrer noopener"
									href={`https://www.imdb.com/title/${data?.movieInfo[0].imdb}/`}
									endIcon={<Language />}
								>
									IMDB
								</Button>
								<Button
									target="_blank"
									rel="noreferrer noopener"
									href={data?.trailer}
									endIcon={<Theaters />}
									onClick={() => setOpen(true)}
								>
									Trailer
								</Button>
							</ButtonGroup>
						</Grid>
						<Grid
							item
							xs={12}
							sm={8}
							className={classes.buttonContainer}
							style={{ textAlign: 'end' }}
						>
							<ButtonGroup variant="outlined" size="small">
								<Button
									onClick={addToFavorites}
									endIcon={
										isMovieFavorited ? <FavoriteBorderOutlined /> : <Favorite />
									}
								>
									{isMovieFavorited ? 'Unlike' : 'Like'}
								</Button>
								<Button
									onClick={addToWatchList}
									endIcon={
										watchlisted?.result?.includes(id) ? <Remove /> : <PlusOne />
									}
									style={{ whiteSpace: 'nowrap' }}
								>
									Watchlist
								</Button>
								<Button
									endIcon={<ArrowBack />}
									sx={{ borderColor: 'primary.main' }}
									onClick={() => navigate(-1)}
								>
									Back
								</Button>
							</ButtonGroup>
						</Grid>
					</div>
				</Grid>
			</Grid>
			<Box marginTop="50px" width="100%">
				<Typography variant="h4" align="center" gutterBottom>
					You Might Also Like
				</Typography>
				{recommended ? (
					<MovieList movies={recommended.result} />
				) : (
					<Box>Sorry, Nothing to find</Box>
				)}
			</Box>
			<Modal
				closeAfterTransition
				className={classes.modal}
				open={open}
				onClose={() => setOpen(false)}
			>
				<iframe
					className={classes.video}
					src={`https://www.youtube.com/embed/${data?.movieInfo[0]?.trailer}`}
					title="Trailer"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowFullScreen
				></iframe>
			</Modal>
		</Grid>
	);
};

export default MovieInformation;
