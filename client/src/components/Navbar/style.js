import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
	toolbar: {
		marginLeft: '240px',
		height: '80px',
		display: 'flex',
		padding: '0px 20px',
		alignItems: 'center',
		justifyContent: 'space-between',
		[theme.breakpoints.down('sm')]: {
			marginLeft: '0px',
			padding: '0px ',
		},
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	menuSubButtons: {
		padding: ' 5px 17px',
		'&:hover': {
			background: '#1976d2',
			color: 'white',
		},
	},
}));
