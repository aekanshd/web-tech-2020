import React, { Component } from "react";
import axios from "axios";

class Profile extends Component {
	state = {
		// books: null,
		// loading: false,
		// value: "",
	};

	render() {
		return (
			<div class="min-h-full flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
				<div class="max-w-md w-full">
					<div>
						<img
							class="mx-auto h-64 w-64 rounded-full border-solid border-8 border-gray-600"
							src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80"
							alt="Profile"
						/>
						<h2 class="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
							{localStorage.getItem("name")}
						</h2>
						<h2 class="mt-2 text-center text-xl leading-9 text-gray-900">
							{localStorage.getItem("email")}
						</h2>
					</div>
				</div>
			</div>
		);
	}
}

export default Profile;