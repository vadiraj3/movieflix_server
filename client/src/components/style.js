import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
	root: {
		[theme.breakpoints.up('sm')]: {
			display: 'flex',
			marginLeft: '240px',
			padding: '0',
			margin: '0',
		},
	},
	content: {
		flexGrow: '1',
		padding: '2em',
	},
	toolbar: {
		height: '70px',
	},
}));
