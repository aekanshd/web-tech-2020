import React, { Component } from "react";
import axios from "axios";
import Books from "./components/Books";
import { search } from "./utils";

class App extends Component {
  state = {
    books: null,
    loading: false,
    value: "",
  };

  componentDidMount() {

  }

  search = async (val) => {
    this.setState({ loading: true });
    const results = await search(
      `https://api.themoviedb.org/3/search/movie?query=${val}&api_key=dbc0a6d62448554c27b6167ef7dabb1b`
    );
    const books = results;

    this.setState({ books, loading: false });
  };

  onChangeHandler = async (e) => {
    this.search(e.target.value);
    this.setState({ value: e.target.value });
  };

  get renderBooks() {
    let books = <h1></h1>;
    if (this.state.books) {
      books = <Books list={this.state.books} />;
    }

    return books;
  }

  render() {
    return (
      <div>
        <main>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="px-4 py-6 sm:px-0">
              <div className="md:w-1/2 mx-auto">
                <label
                  className="block text-gray-700 text-lg font-bold mb-4"
                  for="search"
                >
                  Search
								</label>
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="search"
                  type="text"
                  value={this.state.value}
                  onChange={(e) => this.onChangeHandler(e)}
                  placeholder="Find your next book..."
                />
              </div>
            </div>
            {this.renderBooks}
          </div>
        </main>
      </div>
    );
  }
}

export default App;
