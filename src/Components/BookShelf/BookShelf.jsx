import React, {Component} from 'react';
import Book from '../Book/Book';
import './BookShelf.css';

class BookShelf extends Component {

  render() {
    const shelfName = this.props.shelfName;
    const books = this.props.books;
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{shelfName}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map((book) =>
              (<li key={book.id}><Book book={book} onShelfChange={this.props.onShelfChange}/></li>)
            )}
          </ol>
        </div>
      </div>
    );
  }
}
export default BookShelf;