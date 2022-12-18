import React, { useState } from 'react';
import {
	AppBar,
	IconButton,
	Toolbar,
	Drawer,
	Button,
	Avatar,
	useMediaQuery,
	Select,
	Box,
	MenuItem,
	Tooltip,
	Typography,
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
// import DropDownMenu from '@mui/material/DropDownMenu';

import {
	Menu,
	AccountCircle,
	Brightness4,
	Brightness7,
} from '@mui/icons-material';
import Sidebar from '../../Sidebar.jsx/Sidebar';
import { Link } from 'react-router-dom';
import useStyles from './style';
import { useTheme } from '@mui/material/styles';
import Search from '../Search/Search';
import { useSelector } from 'react-redux';

const Navbar = () => {
	const [mobileOpen, setMobileOpen] = useState(false);
	const isMobile = useMediaQuery('(max-width:600px');
	const theme = useTheme();
	const classes = useStyles();
	const { username, loggedIn, userId } = useSelector((state) => state.auth);

	const [submenuDisplay, setSubmenuDisplay] = useState(false);

	return (
		<>
			<AppBar position="fixed">
				<Toolbar className={classes.toolbar}>
					{isMobile && (
						<IconButton
							edge="end"
							color="inherit"
							style={{ outline: 'none' }}
							className={classes.menuButton}
							onClick={() => {
								setMobileOpen((prev) => !prev);
							}}
						>
							<Menu />
						</IconButton>
					)}
					<IconButton></IconButton>
					{isMobile ? <Search width="70%" /> : <Search width="100%" />}

					{loggedIn && (
						<>
							<Button color="inherit">
								<Link
									to={`/profile/${userId}`}
									style={{
										textDecoration: 'none',
										display: 'flex',
										align: 'center',
										marginTop: '5px',
										color: 'white',
									}}
								>
									{username}
									<Avatar
										style={{ width: '30px', height: '30px' }}
										src="https://avatars.githubusercontent.com/u/34541797?v=4"
										sx={{ mx: 1 }}
									/>
								</Link>
							</Button>
						</>
					)}
				</Toolbar>
			</AppBar>
			<div>
				<nav>
					{isMobile ? (
						<Drawer
							variant="temporary"
							anchor="right"
							open={mobileOpen}
							onClose={() => setMobileOpen((prev) => !prev)}
							classes={{ paper: classes.drawerPaper }}
							ModalProps={{ keepMounted: true }}
						>
							<Sidebar setMobileOpen={setMobileOpen} />
						</Drawer>
					) : (
						<Drawer
							variant="permanent"
							classes={{ paper: classes.drawerPaper }}
						>
							<Sidebar setMobileOpen={setMobileOpen} />
						</Drawer>
					)}
				</nav>
			</div>
		</>
	);
};

export default Navbar;
