import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = () => {
	const [file, setFile] = useState();
	const [title, setTitle] = useState('');
	const [overview, setOverview] = useState('');
	const [voteaverage, setvoteaverage] = useState(0);
	const [voteCount, setVoteCount] = useState(0);
	const [poster, setPoster] = useState('');
	const [length, setLength] = useState(0);
	const [date, setDate] = useState('');

	const handleChange = async () => {
		const htmlFormData = new FormData();
		htmlFormData.append('file', file);
		htmlFormData.append('upload_preset', 'kshsklo6');
		try {
			const result = await axios.post(
				'https://api.cloudinary.com/v1_1/dk01ece44/image/upload',
				htmlFormData
			);
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div>
			<input
				type="text"
				id="html"
				value={title}
				onChange={(e) => setTitle(e.target.value)}
			/>
			<label htmlFor="html">Title</label>
			<br />
			<input
				type="text"
				id="htm"
				value={overview}
				onChange={(e) => setOverview(e.target.value)}
			/>
			<label htmlFor="htm">Overview</label>
			<br />

			<input
				type="text"
				id="ht"
				value={poster}
				onChange={(e) => setPoster(e.target.value)}
			/>
			<label htmlFor="ht">Poster path</label>
			<br />

			<input
				type="text"
				id="tml"
				value={voteCount}
				onChange={(e) => setVoteCount(e.target.value)}
			/>
			<label htmlFor="tml">voteCount</label>
			<br />

			<input
				type="text"
				id="ml"
				value={voteaverage}
				onChange={(e) => setvoteaverage(e.target.value)}
			/>
			<label htmlFor="ml">Vote Average</label>
			<br />

			<input
				type="text"
				id="tl"
				value={length}
				onChange={(e) => setLength(e.target.value)}
			/>
			<label htmlFor="tl">Length</label>
			<br />

			<input
				type="text"
				id="l"
				value={date}
				onChange={(e) => setDate(e.target.value)}
			/>
			<label htmlFor="l">release date</label>
			<br />

			<input type="file" onChange={(e) => setFile(e.target.files[0])} />

			<button type="button" onClick={handleChange}>
				Submit
			</button>
		</div>
	);
};

export default FileUpload;
