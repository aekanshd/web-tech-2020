import React, { Component } from "react";
import axios from "axios";

class Detail extends Component {
	state = {
		book: null,
		loaded: false,
	};

	// componentDidMount() {

	// }

	get renderBooks() {
		axios.get('http://localhost:62020/api/v1/book/moredetails?q=9782266139816')
			.then(function (response) {
				// state.book = response.data;
				// state.loaded = false;
				document.querySelector(".item").innerHTML += response.data
				console.log(response.data);
			})
			.catch(function (error) {
				console.log(error);
			})
		// if (this.state.book) {
		// 	// book = this.state.book
		// }
		// return book;
	}

	render() {
		return (
			<div>
				<h1 className="mt-6 mb-6 text-center leading-9 text-3xl text-gray-500">Prices</h1>
				<div className="item min-h-full flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
					{this.renderBooks}
				</div>
			</div>
		);
	}
}

export default Detail;