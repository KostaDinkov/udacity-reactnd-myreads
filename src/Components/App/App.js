import React from 'react';
import * as BooksAPI from '../../BackendAPI/BooksAPI';
import './App.css';
import BookShelf from '../BookShelf/BookShelf';
import Search from '../Search/Search';
import {Route, Link} from 'react-router-dom';

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    currentlyReading: [],
    wantToRead: [],
    read: [],
    showSearchPage: false
  };

  componentDidMount() {

    // load users books from a remote store
    BooksAPI.getAll()
            .then((data) => this.setState(() => {
              data.forEach(book => {
                this.state[book.shelf].push(book);

              });
              console.log(this.state);
            }));
  }

  render() {
    return (
      <div className="app">

        <Route exact path="/search" component={Search}/>

        <Route exact path="/" render={() =>
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <BookShelf books={this.state.currentlyReading} shelfName='Currently Reading'/>
                <BookShelf books={this.state.wantToRead} shelfName='Want to Read'/>
                <BookShelf books={this.state.read} shelfName='Read'/>
              </div>
            </div>
            <div className="open-search">
              <Link to='/search'>Add a book</Link>
            </div>
          </div>
        }/>
      </div>
    );
  }
}

export default BooksApp;
