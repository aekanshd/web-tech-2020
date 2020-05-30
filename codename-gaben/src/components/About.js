import React, { Component } from 'react';

class About extends Component {
	render() {
		return (
			// <div>
			// 	<h1 className='mt-6 mb-6 text-center leading-9 text-6xl font-extrabold text-gray-800'>
			// 		Developed by...
			// 	</h1>
			// 	<h2 className='mt-10 border-4 border-gray-700 border-dashed text-center leading-9 text-3xl font-bold text-gray-900'>
			// 		Varun R Gupta
			// 	</h2>
			// 	<h2 className='mt-10 border-4 border-gray-700 border-dashed text-center leading-9 text-3xl font-bold text-gray-900'>
			// 		Ravendra Singh
			// 	</h2>
			// 	<h2 className='mt-10 border-4 border-gray-700 border-dashed text-center leading-9 text-3xl font-bold text-gray-900'>
			// 		Aekansh Dixit
			// 	</h2>
			// 	<h2 className='mt-10 border-4 border-gray-700 border-dashed text-center leading-9 text-3xl font-bold text-gray-900'>
			// 		Hrishikesh V
			// 	</h2>
			// </div>
			<div className='py-12 bg-white'>
				<div className='max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='lg:text-center'>
						<p className='text-base leading-6 text-indigo-600 font-semibold tracking-wide uppercase'>
							About Us
						</p>
						<h3 className='mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10'>
							Happy to Book
						</h3>
						<p className='mt-4 max-w-2xl text-xl leading-7 text-gray-500 lg:mx-auto'>
							A Personalized Book Recommendation Store created by
							the Students of PES University for PES University.
						</p>
					</div>

					<div className='mt-10'>
						<ul className='md:grid md:grid-cols-2 md:col-gap-8 md:row-gap-10'>
							<li>
								<div className='flex'>
									<div className='flex-shrink-0'>
										<div className='flex items-center justify-center h-32 w-32 rounded-lg bg-indigo-500 text-white'>
											<img
												className='rounded-lg'
												src='https://avatars3.githubusercontent.com/u/16451006'
												alt='VRG'
											/>
										</div>
									</div>
									<div className='ml-4'>
										<h5 className='text-lg leading-6 font-medium text-gray-900'>
											Varun R. Gupta
										</h5>
										<p className='mt-2 text-base leading-6 text-gray-500'>
											PES1201700652
											<br />
											Department of Computer Science and
											Engineering
											<br />
											PES University
											<br />
										</p>
									</div>
								</div>
							</li>
							<li className='mt-10 md:mt-0'>
								<div className='flex'>
									<div className='flex-shrink-0'>
										<div className='flex items-center justify-center h-32 w-32 rounded-lg bg-indigo-500 text-white'>
											<img
												className='rounded-lg'
												src='https://avatars2.githubusercontent.com/u/32922340'
												alt='Ravinder'
											/>
										</div>
									</div>
									<div className='ml-4'>
										<h5 className='text-lg leading-6 font-medium text-gray-900'>
											Ravendra Singh
										</h5>
										<p className='mt-2 text-base leading-6 text-gray-500'>
											PES1201700706
											<br />
											Department of Computer Science and
											Engineering
											<br />
											PES University
											<br />
										</p>
									</div>
								</div>
							</li>
							<li className='mt-10 md:mt-0'>
								<div className='flex'>
									<div className='flex-shrink-0'>
										<div className='flex items-center justify-center h-32 w-32 rounded-lg bg-indigo-500 text-white'>
											<img
												className='rounded-lg'
												src='https://avatars2.githubusercontent.com/u/30038178'
												alt='Akenksh'
											/>
										</div>
									</div>
									<div className='ml-4'>
										<h5 className='text-lg leading-6 font-medium text-gray-900'>
											Aekansh Dixit
										</h5>
										<p className='mt-2 text-base leading-6 text-gray-500'>
											PES1201701808
											<br />
											Department of Computer Science and
											Engineering
											<br />
											PES University
											<br />
										</p>
									</div>
								</div>
							</li>
							<li className='mt-10 md:mt-0'>
								<div className='flex'>
									<div className='flex-shrink-0'>
										<div className='flex items-center justify-center h-32 w-32 rounded-lg bg-indigo-500 text-white'>
											<img
												className='rounded-lg'
												src='https://avatars0.githubusercontent.com/u/38471846'
												alt='Hrishi'
											/>
										</div>
									</div>
									<div className='ml-4'>
										<h5 className='text-lg leading-6 font-medium text-gray-900'>
											Hrishikesh V
										</h5>
										<p className='mt-2 text-base leading-6 text-gray-500'>
											PES1201700276
											<br />
											Department of Computer Science and
											Engineering
											<br />
											PES University
											<br />
										</p>
									</div>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</div>
		);
	}
}

export default About;
