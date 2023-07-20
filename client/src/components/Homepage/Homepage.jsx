import React, { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import { Box, Button, Alert, useMediaQuery } from '@mui/material';

import MoviesFlix from '../../assets/Moviesflix.jpg';
import { useContext } from 'react';
import useStyles from './styles';
import { AuthContext } from './../../contexts/authContext';
import { useDispatch } from 'react-redux';
import { currentUser, userLogin, userId } from '../../features/auth';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Homepage = () => {
	const [login, setLogin] = useState(true);
	const [firstname, setFirstname] = useState('');
	const [lastname, setLastname] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [style, setStyle] = useState('visible');
	const [error, setError] = useState('');
	const dispatch = useDispatch();
	const isMobile = useMediaQuery('(max-width:600px)');
	const [success, setSuccess] = useState(false);

	const setLoggedIn = useContext(AuthContext);

	useEffect(() => {
		if (localStorage.getItem('token') !== null) {
			const authToken = JSON.parse(localStorage.getItem('token'));
			const user = jwt_decode(authToken);
			dispatch(userLogin(user.loggedIn));
			dispatch(currentUser(user.name));
			dispatch(userId(user.userId));
		}
	}, []);

	function isValidEmail(email) {
		// Regular expression pattern for email validation
		const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

		return emailPattern.test(email);
	}

	const handleSubmit = async () => {
		setError(false);

		if (login) {
			if (!email || !password) {
				toast.error('Email or Password cannot be empty');
				return;
			}
			if (!isValidEmail(email)) {
				toast.error('Email format is not correct');
				return;
			}
			if (password.length < 6) {
				toast.info('Please enter a password with at least 6 characters');
				return;
			}
			try {
				const { data } = await axios.post(
					'http://localhost:3000/kfi-api/v1/user/login',
					{
						email,
						password,
					},
					{
						headers: {
							authorization:
								'Bearer ' + JSON.parse(localStorage.getItem('token')),
						},
					}
				);
				if (data.success) {
					const user = jwt_decode(data.token);

					dispatch(userLogin(user.loggedIn));
					dispatch(currentUser(user.name));
					dispatch(userId(user.userId));

					localStorage.setItem('token', JSON.stringify(data.token));
				} else {
					dispatch(userLogin(false));
				}
			} catch (error) {
				console.log(error);
				toast.error('Invalid credentials');
				return;
			}
		} else {
			if (!email || !password || !firstname || !lastname) {
				toast.error('Fieds cannot be empty');

				return;
			}
			try {
				const result = await axios.post(
					'http://localhost:3000/kfi-api/v1/user/register',
					{
						firstname,
						lastname,
						email,
						password,
					}
				);
				if (result?.data?.msg == 'Successs') {
					localStorage.setItem('token', JSON.stringify(result?.data?.token));
					setSuccess(true);
				}
			} catch (error) {
				console.log(error);
				if (error?.response?.data?.error?.details[0]?.message) {
					toast.error(error.response.data.error.details[0].message);
				} else {
					toast.error('Something went wrong please try again later');
				}
			}
		}
	};

	const handleRegister = () => {
		setLogin(false);
		setSuccess(false);
		setFirstname('');
		setLastname('');
		setEmail('');
		setPassword('');
	};

	const handleLogin = () => {
		setLogin(true);
		setEmail('');
		setPassword('');
	};

	const classes = useStyles();
	return (
		<div
			className={classes.root}
			style={{
				backgroundImage: 'url(' + require('../../assets/hero.webp') + ')',
			}}
		>
			<Box className={classes.navbar}>
				<div onClick={handleRegister}>
					<img className={classes.logo} src={MoviesFlix} />
				</div>

				<Box className={classes.buttonContainer}>
					<Button
						size="small"
						variant="outlined"
						sx={{ color: 'white', border: '1px solid white' }}
						onClick={handleLogin}
					>
						Sign In
					</Button>

					<Button
						size="small"
						variant="outlined"
						onClick={handleRegister}
						sx={{ color: 'white', border: '1px solid white' }}
					>
						Register
					</Button>
				</Box>
			</Box>
			<div className={classes.mainContainer}>
				{login ? (
					<Box
						className={classes.loginBox}
						style={{
							padding: !isMobile ? '30px 60px 30px 30px' : '0px',
							border: !isMobile ? '2px solid white' : 'none',
							borderRadius: '10px',
						}}
					>
						<h2 style={{ color: 'white' }}>Sign In</h2>
						<div>
							<input
								type="text"
								className={classes.input}
								placeholder="Email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
						<div>
							<input
								type="text"
								className={classes.input}
								placeholder="Password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>
						{error && (
							<div>
								<Alert severity="error">{error}</Alert>
							</div>
						)}
						<div>
							<button
								className={classes.button}
								style={{ visibility: style, marginLeft: '15px' }}
								onClick={handleSubmit}
							>
								Submit
							</button>
						</div>
					</Box>
				) : (
					<Box
						className={classes.loginBox}
						style={{
							padding: !isMobile ? '30px 60px 30px 30px' : '0px',
							border: !isMobile ? '2px solid white' : 'none',
							borderRadius: '10px',
						}}
					>
						<h2 style={{ color: 'white' }}>Register</h2>
						<div>
							<input
								type="text"
								className={classes.input}
								placeholder="Firstname"
								value={firstname}
								onChange={(e) => setFirstname(e.target.value)}
							/>
						</div>
						<div>
							<input
								type="text"
								className={classes.input}
								placeholder="Lastname"
								value={lastname}
								onChange={(e) => setLastname(e.target.value)}
							/>
						</div>
						<div>
							<input
								type="text"
								className={classes.input}
								placeholder="Email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
						<div>
							<input
								type="text"
								className={classes.input}
								placeholder="Password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>
						{error && (
							<div>
								<Alert severity="error">{error}</Alert>
							</div>
						)}
						{success && (
							<div>
								<Alert
									severity="success"
									style={{ display: 'flex', alignItems: 'center' }}
								>
									You've Successfully Registered !
									<Button
										sx={{ ml: 2 }}
										size="small"
										variant="outlined"
										onClick={handleLogin}
									>
										Log in
									</Button>
								</Alert>
							</div>
						)}
						<div>
							<button
								className={classes.button}
								onClick={handleSubmit}
								style={{ marginLeft: '15px' }}
							>
								Submit
							</button>
						</div>
					</Box>
				)}
			</div>
		</div>
	);
};

export default Homepage;
