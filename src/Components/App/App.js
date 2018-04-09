import React from 'react';
import {Route, Link} from 'react-router-dom';
import * as BooksAPI from '../../BackendAPI/BooksAPI';
import BookShelf from '../BookShelf/BookShelf';
import Search from '../Search/Search';
import * as appConfig from '../../Config/appConfig';
import './App.css';


class BooksApp extends React.Component {
  state = {
    myCollection: {
      currentlyReading: [],
      wantToRead: [],
      read: []
    },
    showSearchPage: false
  };

  onShelfChange = () => {
    //reload books every time a book changes shelf
    this.loadMyBooks();
  };

  componentDidMount() {

    //let myCollection=this.loadMyBooks();
    this.loadMyBooks();

  }

  loadMyBooks() {

    return BooksAPI.getAll()
                   .then((data) => {
                     let myCollection = { currentlyReading: [], wantToRead: [], read: [] };
                     data.forEach(book => myCollection[book.shelf].push(book));
                     this.setState({ myCollection });
                   });
  }

  render() {
    const currentlyReading = this.state.myCollection.currentlyReading || [];
    const wantToRead = this.state.myCollection.wantToRead || [];
    const read = this.state.myCollection.read || [];

    return (
      <div className="app">

        <Route exact path="/search" render={() =>
          <Search collected={this.state.myCollection} onShelfChange={this.onShelfChange}/>}/>

        <Route exact path="/" render={() =>
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <BookShelf shelfName={'Currently Reading'}
                           books={currentlyReading}
                           onShelfChange={this.onShelfChange}/>

                <BookShelf shelfName='Want to Read'
                           books={wantToRead}
                           onShelfChange={this.onShelfChange}/>

                <BookShelf shelfName='Read'
                           books={read}
                           onShelfChange={this.onShelfChange}/>
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
