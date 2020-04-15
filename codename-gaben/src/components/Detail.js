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
		let book = <h1 className="mt-6 mb-6 text-center leading-9 text-3xl text-gray-500">Prices</h1>;
		axios.get('http://localhost:62020/api/v1/book/moredetails?q=9782266139816')
			.then(function (response) {
				// state.book = response.data;
				// state.loaded = false;
				console.log(response.data);
			})
			.catch(function (error) {
				console.log(error);
			})
		if (this.state.book) {
			book = this.state.book
		}
		return book;
	}

	render() {
		return (
			<div>
				{this.renderBooks}
			</div>
		);
	}
}

export default Detail;