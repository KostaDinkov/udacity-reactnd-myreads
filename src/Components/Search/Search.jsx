import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Debounce} from 'react-throttle';
import * as  BooksAPI from '../../BackendAPI/BooksAPI';
import Book from '../Book/Book';
import './Search.css';

class Search extends Component {
  state = {
    searchResults: [],
    query: ''
  };

  updateQuery = (query) => {
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
    return this.props.collected.find((book) => book.id === resultBook.id) || resultBook;
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <Debounce time="800" handler="onChange">
              <input
                onChange={(e) => this.updateQuery(e.target.value)}
                //value={query} //not working with debouncing?
                type="text"
                placeholder="Search by title or author"
              />
            </Debounce>

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {(this.state.searchResults.length > 0 && this.state.query !== '') ? this.state.searchResults.map((book) =>
                (<li key={book.id}>
                  <Book
                    book={this.getBookIfCollected(book)}
                    onShelfChange={this.props.onShelfChange}
                  />
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