import React, { Component } from 'react';
import Books from './components/Books';
import { search } from './utils';

class App extends Component {
	state = {
		books: null,
		loading: false,
		value: '',
	};

	componentDidMount() {
		setInterval((event) => {
			console.log('Refreshing...');
		}, 5000);
	}

	getBooks = async (val) => {
		this.setState({ loading: true });
		const results = await search(
			`http://localhost:62020/api/v1/book/search?q=${val}&n=13`
		);
		const books = results;
		this.setState({ books, loading: false });
	};

	onChangeHandler = async (e) => {
		this.getBooks(e.target.value.trim());
		this.setState({ value: e.target.value });
		console.log(this.state.books);
	};

	get renderBooks() {
		let books = (
			<h1 className='mt-6 mb-6 text-center leading-9 text-3xl text-gray-600'>
				Try searching for a book...
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
							<div className='md:w-1/2 mx-auto'>
								<label
									className='block text-gray-700 text-lg font-bold mb-4'
									htmlFor='search'
								>
									Search
								</label>
								<input
									className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'
									id='search'
									type='text'
									value={this.state.value}
									onChange={(e) => this.onChangeHandler(e)}
									placeholder='Find your next book...'
								/>
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

export default App;
