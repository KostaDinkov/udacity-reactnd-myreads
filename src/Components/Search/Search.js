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
      query = query.trim();
      BooksAPI.search(query)
              .then((results) => {
                if (Array.isArray(results)) {
                  this.setState({ searchResults: results, query: query });
                }
                else {
                  this.setState({ searchResults: [], query: query });
                }
              });
    }
    else {
      this.setState({ searchResults: [], query: query });
    }
  };

  getBookIfCollected(resultBook) {
    let collection = this.props.collected;
    for (let shelf in collection) {
      for (let book in collection[shelf]) {
        if (collection[shelf][book].id === resultBook.id) {
          return collection[shelf][book];
        }
      }
    }
    return resultBook;
  }

  render() {
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

            {(this.state.searchResults.length > 0 && this.state.query !== '') ? this.state.searchResults.map((book) =>

              (<li key={book.id}>
                <Book
                  book={this.getBookIfCollected(book)}
                  onShelfChange={this.props.onShelfChange}/>
              </li>))
              :
              (this.state.query === '') ? (<div>Start typing to search for books</div>) : (<div>No results found</div>)
            }

          </ol>
        </div>
      </div>
    );
  }

}

export default Search;