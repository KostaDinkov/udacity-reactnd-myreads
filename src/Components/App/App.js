import React from 'react';
import {Route, Link} from 'react-router-dom';
import * as BooksAPI from '../../BackendAPI/BooksAPI';
import BookShelf from '../BookShelf/BookShelf';
import Search from '../Search/Search';
import * as appConfig from '../../Config/appConfig';
import Toast from '../Toast/Toast';
import './App.css';

class BooksApp extends React.Component {
  state = {
    books: [],
    toastOpen: false,
    toastMsg: ''
  };

  onShelfChange = (book, newShelf) => {
    // Note: To maximize user experience do not wait for API response
    // the other option is to make the state updates after the API promise resolves

    // if the book is not in the collection, add it
    if (!book.hasOwnProperty('shelf')) {
      book.shelf = newShelf;
      this.setState((prevState) => {
        return { books: [...prevState.books, book] };
      });
    }
    else {
      // if the book is in the collection, just change the shelf
      this.setState((prevState) => {
        return {
          books: prevState.books.map(b => {
            if (b.id === book.id) {
              b.shelf = newShelf;
            }
            return b;
          })
        };
      });
    }

    BooksAPI.update(book, newShelf)
            .then(() => {
              // notify if the changes were succesfully synced with the backend
              this.showToast(`Update successful!`);
            })
            .catch((error) => {
              //handle fetch error here
              this.showToast(error.message);
            });
  };

  componentDidMount() {
    //let myCollection=this.loadMyBooks();
    this.loadMyBooks();
  }

  onToastClose = () => {
    this.setState({ toastOpen: false, toastMsg: '' });
  };

  loadMyBooks() {
    return BooksAPI.getAll()
                   .then((books) => {
                     this.setState({ books });
                   });
  }

  showToast(msg) {
    this.setState({ toastOpen: true, toastMsg: msg });
  }

  render() {
    const shelves = Object.keys(appConfig.shelves);
    const books = this.state.books;
    return (
      <div className="app">
        <Route exact path="/search" render={() =>
          <Search collected={books} onShelfChange={this.onShelfChange}/>}/>
        <Route exact path="/" render={() =>
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                {shelves.map(shelf => {
                  return (<BookShelf key={shelf}
                                     shelfName={appConfig.shelves[shelf]}
                                     books={books.filter((b) => b.shelf === shelf)}
                                     onShelfChange={this.onShelfChange}/>);
                })}

              </div>
            </div>
            <div className="open-search">
              <Link to='/search'>Add a book</Link>
            </div>
          </div>
        }/>
        <Toast toastOpen={this.state.toastOpen} message={this.state.toastMsg} onToastClose={this.onToastClose}/>
      </div>
    );
  }
}
export default BooksApp;
