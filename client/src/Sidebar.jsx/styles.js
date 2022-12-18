import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
	imageLink: {
		display: 'flex',
		justifyContent: 'center',
		padding: '10px 0',
	},
	image: {
		width: '70%',
		padding: '20px 0px',
	},
	links: {
		color: theme.palette.text.primary,
		textDecoration: 'none',
	},
	genreImage: {
		filter: theme.palette.mode === 'dark' ? 'dark' : 'invert(1)',
	},
}));
