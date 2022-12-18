import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useGetActorInfoQuery } from '../../services/KFI';
import { useGetActorMoviesQuery } from '../../services/KFI';
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
import useStyles from '../MovieInformation/style';
import MovieList from '../MovieList/MovieList';

const Actors = () => {
	const classes = useStyles();
	const { id } = useParams();
	const isMobile = useMediaQuery('(max-width:600px)');
	const navigate = useNavigate();
	const { data, isFetching, error } = useGetActorInfoQuery(id);

	const {
		data: result,
		isFetching: isFetchingActorMovies,
		error: actorError,
	} = useGetActorMoviesQuery(id);

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
		<>
			<Grid container className={classes.containerSpaceAround}>
				<Grid item lg={4} sm={12} style={{ textAlign: 'center' }}>
					<img className={classes.poster} src={data?.result[0]?.profile_pic} />
				</Grid>
				<Grid item container direction="column" lg={7}>
					<Typography
						textAlign="start"
						variant={isMobile ? 'h5' : 'h4'}
						align="center"
						gutterBottom
					>
						{data?.result[0]?.firstname} {data?.result[0]?.lastname}
					</Typography>

					<Typography
						textAlign="start"
						variant={isMobile ? 'h6' : 'h6'}
						align="center"
						gutterBottom
					>
						Born : {data?.result[0]?.dob}
					</Typography>

					<Typography
						variant="h5"
						gutterBottom
						style={{ marginTop: '10px' }}
						textAlign="start"
					>
						About
					</Typography>
					<Typography
						variant="subtitle1"
						align="center"
						gutterBottom
						textAlign="start"
					>
						{data?.result[0]?.about}
					</Typography>

					<Box display="flex" justifyContent="space-between">
						<>
							<Button
								target="_blank"
								rel="noreferrer noopener"
								href={`https://www.imdb.com/name/${data?.result[0].imdb}/`}
								endIcon={<Language />}
								variant="contained"
							>
								IMDB
							</Button>
						</>
						<>
							<Button
								endIcon={<ArrowBack />}
								sx={{ borderColor: 'primary.main' }}
								variant="outlined"
								onClick={() => navigate(-1)}
							>
								Back
							</Button>
						</>
					</Box>
				</Grid>
			</Grid>
			<Typography
				variant="h4"
				gutterBottom
				align="center"
				style={{ marginTop: '30px' }}
			>
				Movies
			</Typography>
			<MovieList movies={result?.result} />
		</>
	);
};

export default Actors;
