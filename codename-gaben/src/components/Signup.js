import React, { Component } from 'react';
import axios from 'axios';
import logo from '../logo.svg';
import { Link } from 'react-router-dom';

class Signup extends Component {
	state = {
		username: '',
		name: '',
		email: '',
		password: '',
		registerDate: Date.now(),
		interests: 'Reading',
		image: Object,
		imageString: String,
	};

	handleSubmit = (event) => {
		event.preventDefault();
		const signup = this.state;
		const file = this.state.image;
		const reader = new FileReader();
		reader.addEventListener(
			'load',
			() => {
				// localStorage.setItem('image', reader.result);
				signup.imageString = reader.result;
				console.log(signup.imageString);
				axios
					.put('http://localhost:62020/api/v1/user', signup)
					.then((res) => {
						console.log(res);
						// console.log(res.data);
						window.location = '/login'; // This line of code will redirect you once the submission is succeed
					});
			},
			false
		);
		if (document.getElementById('profile').value != '') {
			reader.readAsDataURL(file);
		} else {
			axios
				.put('http://localhost:62020/api/v1/user', signup)
				.then((res) => {
					console.log(res);
					// console.log(res.data);
					window.location = '/login'; // This line of code will redirect you once the submission is succeed
				});
		}
	};

	render() {
		return (
			<div className='min-h-full flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
				<div className='max-w-md w-full'>
					<div>
						<img
							className='mx-auto h-12 w-auto'
							src={logo}
							alt='Workflow'
						/>
						<h2 className='mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900'>
							Sign Up for a new account
						</h2>
						<p className='mt-2 text-center text-sm leading-5 text-gray-600'>
							Or&nbsp;
							<Link
								to='login'
								className='font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150'
							>
								log in instead
							</Link>
						</p>
					</div>
					<form
						className='mt-8'
						action='#'
						method='POST'
						onSubmit={this.handleSubmit}
					>
						<input type='hidden' name='remember' value='true' />
						<div className='rounded-md shadow-sm'>
							<div>
								<input
									aria-label='Username'
									name='username'
									type='text'
									required
									pattern='[a-zA-Z0-9_]{8,25}'
									className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5'
									placeholder='Username'
									onChange={(event) => {
										this.setState({
											username: event.target.value,
										});
									}}
								/>
							</div>
							<div>
								<input
									aria-label='Full Name'
									name='fullname'
									type='text'
									required
									pattern="[\w .'-]+"
									className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5'
									placeholder='Full Name'
									onChange={(event) => {
										this.setState({
											name: event.target.value,
										});
									}}
								/>
							</div>
							<div>
								<input
									aria-label='Email address'
									name='email'
									type='email'
									required
									className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5'
									placeholder='Email address'
									onChange={(event) => {
										this.setState({
											email: event.target.value,
										});
									}}
								/>
							</div>
							<div className='-mt-px'>
								<input
									aria-label='Password'
									name='password'
									type='password'
									required
									pattern='(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}'
									className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5'
									placeholder='Password'
									onChange={(event) => {
										this.setState({
											password: event.target.value,
										});
									}}
								/>
							</div>
						</div>
						<br />
						<input
							id='profile'
							type='file'
							onChange={(event) => {
								this.setState({ image: event.target.files[0] });
								console.log(event.target.files[0]);
							}}
						/>
						<div className='mt-6'>
							<button
								type='submit'
								className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out'
							>
								<span className='absolute left-0 inset-y-0 flex items-center pl-3'>
									<svg
										className='h-5 w-5 text-indigo-500 group-hover:text-indigo-400 transition ease-in-out duration-150'
										fill='currentColor'
										viewBox='0 0 20 20'
									>
										<path
											fill-rule='evenodd'
											d='M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z'
											clip-rule='evenodd'
										/>
									</svg>
								</span>
								Sign Up
							</button>
						</div>
					</form>
				</div>
			</div>
		);
	}
}

export default Signup;
