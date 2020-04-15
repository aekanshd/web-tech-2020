import React from "react";
import Modal from "./Modal";
import classes from "./Book.module.css";
import { truncStr } from "../utils";
import { Link } from "react-router-dom";

const BookCard = props => {
	const { image_url, title, authors, isbn } = props.item;
	let show = false;
	let res = '';
	return (
		<Link to="/book" isbn={isbn}>
			<div
				className={classes.Container}
				style={{
					backgroundImage:
						image_url && `url(${image_url})`
				}}
			>
				{/* <Modal className="modal hidden" /> */}
				<div className={classes.VoteContainer}>
					<span className={classes.Vote}>{isbn}</span>
				</div>

				<div className={classes.Bottom}>
					<h3 className={classes.Title}>{truncStr(title, 19)}<br />{authors}</h3>
				</div>
			</div>
		</Link>
	);
};

export default BookCard;