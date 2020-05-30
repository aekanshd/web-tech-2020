import React from 'react';
import Book from './Book';
import classes from './Books.module.css';

const Books = ({ list }) => {
	let cards = (
		<h1 className='mt-6 mb-6 text-center leading-9 text-3xl text-gray-500'>
			Loading...
		</h1>
	);

	if (list) {
		console.log(list);
		cards = list.map((m, i) => <Book key={i} item={m} />);
	}

	return (
		<div className={classes.Container}>
			<div className={classes.ContainerInner}>{cards}</div>
		</div>
	);
};

export default Books;
