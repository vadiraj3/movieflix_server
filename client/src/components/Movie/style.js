import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
	movie: {
		padding: '10px',
		textAlign: 'center',
	},
	links: {
		alignItems: 'center',
		fontWeight: 'bolder',
		[theme.breakpoints.up('xs')]: {
			display: 'flex',
			flexDirection: 'column',
		},
		'&:hover': {
			cursor: 'poiner',
			textDecoration: 'none',
		},
	},
	image: {
		borderRadius: '20px',
		height: '250px',
		width: '90%',
		'&:hover': {
			transform: 'scale(1.03)',
		},
		[theme.breakpoints.down('sm')]: {
			width: '100%',
			height: '320px',
		},
	},
	title: {
		color: theme.palette.text.primary,
		textOverflow: 'ellipsis',
		width: '140px',
		whiteSpace: 'nowrap',
		overflow: 'hidden',
		marginTop: '10px',
	},
}));
