import React, {Component} from 'react';
import Book from '../Book/Book';

class BookShelf extends Component {

  books = this.props.books;

  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">Currently Reading</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.books.map((book) =>
              (<li key={book.id}><Book book={book}/></li>)
            )}
          </ol>
        </div>
      </div>
    );
  }

}

export default BookShelf;