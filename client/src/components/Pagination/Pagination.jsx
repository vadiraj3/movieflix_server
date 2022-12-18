import React, { useState } from 'react';
import { Typography, Button } from '@mui/material';
import useStyles from './style';

const Pagination = ({ page, totalPages, setPage }) => {
	const classes = useStyles();
	const handleNext = () => {
		if (page < totalPages) {
			setPage((prevPage) => prevPage + 1);
		}
	};
	const handlePrev = () => {
		if (page > 1) {
			setPage((prevPage) => prevPage - 1);
		}
	};
	return (
		<div className={classes.container}>
			{page > 1 && (
				<Button
					className={classes.button}
					variant="contained"
					color="primary"
					type="button"
					onClick={handlePrev}
				>
					Prev
				</Button>
			)}
			{totalPages > 1 && (
				<Typography variant="h5" className={classes.pageNumber}>
					{page}
				</Typography>
			)}
			{page < totalPages && (
				<Button
					onClick={handleNext}
					className={classes.button}
					variant="contained"
					color="primary"
					type="button"
				>
					Next
				</Button>
			)}
		</div>
	);
};

export default Pagination;
