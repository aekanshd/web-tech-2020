import React, { Component } from 'react';
import Books from './Books';
import { search } from '../utils';

class Recommendations extends Component {
	state = {};

	getBooks = async (val) => {
		this.setState({ loading: true });
		const results = await search(
			`http://localhost:62020/api/v1/recommend?username=${val}`
		);
		const books = results;
		this.setState({ books, loading: false });
	};

	componentDidMount() {
		this.getBooks(localStorage.getItem('username'));
		console.log(this.state.books);
	}

	get renderBooks() {
		let books = (
			<h1 className='mt-6 mb-6 text-center leading-9 text-3xl text-gray-500'>
				You haven't opened a book yet...
			</h1>
		);
		if (this.state.books) {
			books = <Books list={this.state.books} />;
		}
		return books;
	}

	render() {
		return (
			<div>
				<main>
					<div className='max-w-7xl mx-auto py-6 sm:px-6 lg:px-8'>
						<div className='px-4 py-6 sm:px-0'>
							<div className='lg:text-center'>
								<p className='text-base leading-6 text-indigo-600 font-semibold tracking-wide uppercase'>
									Not sure what to read?
								</p>
								<h3 className='mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10'>
									Find Your Next Book
								</h3>
								<p className='mt-4 max-w-2xl text-xl leading-7 text-gray-500 lg:mx-auto'>
									Juiced up just for you...
								</p>
							</div>
						</div>
						{this.state.loading ? (
							<h1 className='mt-6 mb-6 text-center leading-9 text-3xl text-gray-600'>
								Loading...
							</h1>
						) : (
							this.renderBooks
						)}
					</div>
				</main>
			</div>
		);
	}
}

export default Recommendations;
