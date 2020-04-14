import React from "react";

import classes from "./Book.module.css";
import { truncStr } from "../utils";

const BookCard = props => {
	const { title, poster_path, vote_average } = props.item;

	return (
		<div
			className={classes.Container}
			style={{
				backgroundImage:
					poster_path && `url(http://image.tmdb.org/t/p/w185${poster_path})`
			}}
		>
			<div className={classes.VoteContainer}>
				<span className={classes.Vote}>{vote_average}</span>
			</div>

			<div className={classes.Bottom}>
				<h3 className={classes.Title}>{truncStr(title, 19)}</h3>
			</div>
		</div>
	);
};

export default BookCard;