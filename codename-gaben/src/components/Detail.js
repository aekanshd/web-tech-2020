import React, { Component } from 'react';
import axios from 'axios';

class Detail extends Component {
	state = {
		book: Object,
	};

	componentDidMount() {
		console.log(this.props.match.params.isbn);
		axios
			.get(
				`http://localhost:62020/api/v1/book?id=${this.props.match.params.isbn}`
			)
			.then((res) => {
				const book = res.data;
				this.setState({ book });
				console.log(book);
				if (localStorage.getItem('loggedin'))
					axios
						.get(
							`http://localhost:62020/api/v1/storeHistory?username=${localStorage.getItem(
								'username'
							)}&isbn=${this.state.book.isbn13}`
						)
						.then(() => console.log('History Stored.'));
			});
	}

	render() {
		return (
			<div className='bg-gray-100'>
				<div className='max-w-7xl mx-auto py-12 sm:px-6 lg:px-8'>
					<img
						className='max-h-4xl mx-auto mb-8'
						src={`http://covers.openlibrary.org/b/isbn/${this.state.book.isbn13}-M.jpg`}
						alt='Book Cover'
					/>
					<div className='max-w-4xl mx-auto'>
						<div className='bg-white shadow overflow-hidden sm:rounded-lg'>
							<div className='px-4 py-5 border-b border-gray-200 sm:px-6'>
								<h3 className='text-lg leading-6 font-medium text-gray-900'>
									Book Details
								</h3>
								<p className='mt-1 max-w-2xl text-sm leading-5 text-gray-500'>
									ID: {this.state.book._id}
								</p>
							</div>
							<div>
								<dl>
									<div className='bg-gray-100 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
										<dt className='text-sm leading-5 font-medium text-gray-600'>
											Title
										</dt>
										<dd className='mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2'>
											{this.state.book.title}
										</dd>
									</div>
									<div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
										<dt className='text-sm leading-5 font-medium text-gray-600'>
											Author/s
										</dt>
										<dd className='mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2'>
											{this.state.book.authors}
										</dd>
									</div>
									<div className='bg-gray-100 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
										<dt className='text-sm leading-5 font-medium text-gray-600'>
											Number of Pages
										</dt>
										<dd className='mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2'>
											{this.state.book.num_pages}
										</dd>
									</div>
									<div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
										<dt className='text-sm leading-5 font-medium text-gray-600'>
											Average Rating
										</dt>
										<dd className='mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2'>
											{this.state.book.average_rating}
										</dd>
									</div>
									<div className='bg-gray-100 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
										<dt className='text-sm leading-5 font-medium text-gray-600'>
											ISBN
										</dt>
										<dd className='mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2'>
											{this.state.book.isbn}
										</dd>
									</div>
									<div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
										<dt className='text-sm leading-5 font-medium text-gray-600'>
											ISBN 13
										</dt>
										<dd className='mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2'>
											{this.state.book.isbn13}
										</dd>
									</div>
									<div className='bg-gray-100 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
										<dt className='text-sm leading-5 font-medium text-gray-600'>
											Date Published
										</dt>
										<dd className='mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2'>
											{this.state.book.publication_date}
										</dd>
									</div>
									<div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
										<dt className='text-sm leading-5 font-medium text-gray-600'>
											Publisher
										</dt>
										<dd className='mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2'>
											{this.state.book.publisher}
										</dd>
									</div>
									<div className='bg-gray-100 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
										<dt className='text-sm leading-5 font-medium text-gray-600'>
											Number of Ratings
										</dt>
										<dd className='mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2'>
											{this.state.book.ratings_count}
										</dd>
									</div>
									<div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
										<dt className='text-sm leading-5 font-medium text-gray-600'>
											Number of Text Reviews
										</dt>
										<dd className='mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2'>
											{this.state.book.text_reviews_count}
										</dd>
									</div>
									<div className='bg-gray-100 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
										<dt className='text-sm leading-5 font-medium text-gray-600'>
											Purchase From Amazon
										</dt>
										<dd className='mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2'>
											{/* <a href={`https://www.amazon.in/s?i=stripbooks&rh=p_66%3A${this.state.book.isbn13}&s=relevanceexprank&Adv-Srch-Books-Submit.x=41&Adv-Srch-Books-Submit.y=6&unfiltered=1`}>
												<img src="https://onlineandyou.com/wp-content/uploads/2015/02/Amazon.in-logo.jpg" />
											</a> */}
											<a
												href={`https://www.amazon.in/dp/${this.state.book.isbn}`}
												target='_blank'
												rel='noopener noreferrer'
											>
												<img
													src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/175px-Amazon_logo.svg.png'
													width='100px'
													alt='Go to Amazon'
												/>
											</a>
										</dd>
									</div>
									<div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
										<dt className='text-sm leading-5 font-medium text-gray-600'>
											Purchase From Reddit Books
										</dt>
										<dd className='mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2'>
											<a
												href={`http://books.rediff.com/book/${this.state.book.isbn13}`}
												target='_blank'
												rel='noopener noreferrer'
											>
												<img
													src='http://books.rediff.com/booksrediff/pix/rediff.png'
													width='100px'
													alt='Go to Reddit Books'
												/>
											</a>
										</dd>
									</div>
									<div className='bg-gray-100 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
										<dt className='text-sm leading-5 font-medium text-gray-600'>
											Purchase From Sapna
										</dt>
										<dd className='mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2'>
											<a
												href={`https://www.sapnaonline.com/general-search?searchkey=${this.state.book.isbn13}`}
												target='_blank'
												rel='noopener noreferrer'
											>
												<img
													src='https://rescdn.sapnaonline.com/common/sapna/images/common_images/logo.png'
													width='100px'
													alt='Go to Sapna'
												/>
											</a>
										</dd>
									</div>
								</dl>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Detail;
