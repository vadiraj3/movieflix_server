import { Button, Stack, TextField } from '@mui/material';
import React from 'react';

const ActorUpload = () => {
	return (
		<Stack spacing={2} width="400px" margin="auto">
			<h3>Enter Actor details</h3>
			<TextField
				id="outlined-basic-firstname"
				label="FirstName"
				variant="outlined"
			/>
			<TextField
				id="outlined-basic-lastname"
				label="Lastname"
				variant="outlined"
			/>
			<TextField id="outlined-basic-gender" label="Gender" variant="outlined" />
			<TextField
				id="outlined-basic-profile-pic"
				label="Profile Picture"
				variant="outlined"
			/>
			<TextField id="outlined-basic-about" label="About" variant="outlined" />
			<TextField
				id="outlined-basic-dob"
				label="Date of Birth"
				variant="outlined"
			/>
			<TextField id="outlined-basic-idbm" label="IMDB" variant="outlined" />
			<Button variant="contained">Add</Button>
		</Stack>
	);
};

export default ActorUpload;
