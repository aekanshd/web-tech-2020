import React, { Component } from 'react';
import Books from './Books';
import { search } from '../utils';

class Profile extends Component {
	state = {};

	getBooks = async (val) => {
		this.setState({ loading: true });
		const results = await search(
			`http://localhost:62020/api/v1/user/books/${val}`
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
			<div className='min-h-full flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
				<div className='max-w-md w-full'>
					<div>
						<img
							className='mx-auto h-64 w-64 rounded-full border-solid border-8 border-gray-600'
							src={localStorage.getItem('image')}
							alt='Profile'
						/>
						<h2 className='mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900'>
							{localStorage.getItem('name')}
						</h2>
						<h2 className='mt-2 text-center text-xl leading-9 text-gray-900'>
							{localStorage.getItem('email')}
						</h2>
						{this.state.loading ? (
							<h1 className='mt-6 mb-6 text-center leading-9 text-3xl text-gray-500'>
								Loading...
							</h1>
						) : (
							this.renderBooks
						)}
					</div>
				</div>
			</div>
		);
	}
}

export default Profile;
