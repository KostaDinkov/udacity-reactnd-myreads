import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Debounce} from 'react-throttle';
import * as  BooksAPI from '../../BackendAPI/BooksAPI';

import Book from '../Book/Book';

class Search extends Component {

  state = {
    searchResults: [],
    query: ''
  };

  updateQuery = (query) => {
    console.log(`search input query : ${query}`);
    if (query) {

      BooksAPI.search(query)
              .then((results) => this.setState((prevState) => {
                return { searchResults: results, query: query };
              }));
    }
  };

  render() {
    //console.log(this.state.searchResults);
    return (

      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">

            {/*
            *  Add debouncing on the input, so that we can limit the
            *  number of search API calls to the server
            *  */}
            <Debounce time="800" handler="onChange">
              <input
                onChange={(event) => this.updateQuery(event.target.value)}
                //value={query}
                type="text"
                placeholder="Search by title or author"/>
            </Debounce>

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {console.log(this.state.searchResults)}
            {this.state.searchResults.map((book) =>
              (<li key={book.id}><Book book={book}/></li>))
            }

          </ol>
        </div>
      </div>
    );
  }

}

export default Search;