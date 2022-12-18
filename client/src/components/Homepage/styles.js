import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
	root: {
		height: '100vh',
		width: '100%',
		padding: '0px',
		margin: '0px',
		[theme.breakpoints.down('sm')]: {},
	},
	navbar: {
		height: '70px',
		padding: '0px 40px',
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		background: 'transparent',
		[theme.breakpoints.down('sm')]: {
			padding: '0px 10px',
		},
	},
	buttonContainer: {
		display: 'flex',
		justifyContent: 'flex-end',
		gap: '15px',
	},
	logo: {
		height: '70px',
		width: '220px',
		[theme.breakpoints.down('sm')]: {
			width: '70px',
			height: '30px',
		},
	},
	heroImage: {
		width: '100%',
		height: '90vh',
	},
	mainContainer: {
		height: '80vh',
		display: 'grid',
		placeItems: 'center',
		placeContent: 'center',
		[theme.breakpoints.down('sm')]: {
			padding: '0px',
			textAlign: 'center',
		},
	},
	loginBox: {
		textAlign: 'center',
		width: '400px',
		display: 'flex',
		flexDirection: 'column',
		gap: '15px',

		[theme.breakpoints.down('sm')]: {
			width: '240px',
		},
	},
	input: {
		padding: '10px',

		borderRadius: '5px',
		borderColor: 'white',
		width: '100%',
		[theme.breakpoints.down('sm')]: {
			width: '80%',
		},
	},
	button: {
		color: 'white',
		padding: '10px 40px',
		borderRadius: '5px',
		border: '2px solid white',
		backgroundColor: 'red',
		fontWeight: 'bold',
		margin: 'auto',
		[theme.breakpoints.down('sm')]: {
			padding: '10px 30px',
		},
	},
}));
