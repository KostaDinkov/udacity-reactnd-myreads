import React from 'react';
import Book from '../Book/Book';
import './BookShelf.css';

const BookShelf = (props) => {

  const shelfName = props.shelfName;
  const books = props.books;
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{shelfName}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map((book) =>
            (<li key={book.id}><Book book={book} onShelfChange={props.onShelfChange}/></li>)
          )}
        </ol>
      </div>
    </div>
  );

};
export default BookShelf;