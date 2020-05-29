import React from 'react';
import classes from './Book.module.css';
import { truncStr } from '../utils';
import { Link } from 'react-router-dom';

const Book = (props) => {
	const { title, average_rating, isbn13 } = props.item;
	// let image_url = `http://covers.openlibrary.org/b/isbn/${isbn13}-M.jpg`
	let image_url = `https://pictures.abebooks.com/isbn/${isbn13}.jpg`;
	return (
		<Link to={`/book/${isbn13}`}>
			<div
				className={classes.Container}
				style={{
					backgroundImage: image_url && `url(${image_url})`,
				}}
			>
				<div className={classes.VoteContainer}>
					<span className={classes.Vote}>{average_rating + '★'}</span>
				</div>

				<div className={classes.Bottom + ' bg-gray-800'}>
					<h3 className={classes.Title + ' text-gray-300'}>
						{truncStr(title, 60)}
						{/* <br /> */}
						{/* {authors} */}
					</h3>
				</div>
			</div>
		</Link>
	);
};

export default Book;
