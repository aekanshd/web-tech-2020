import React from "react";

import Book from "./Book";
import classes from "./Books.module.css";

const Books = ({ list }) => {
	let cards = <h3>Loading...</h3>;

	if (list) {
		cards = list.map((m, i) => <Book key={i} item={m} />);
	}

	return (
		<div className={classes.Container}>
			<div className={classes.ContainerInner}>{cards}</div>
		</div>
	);
};

export default Books;