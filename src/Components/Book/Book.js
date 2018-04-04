import React, {Component} from 'react';
import * as Utils from '../../Utils/Utils';
import * as BooksAPI from '../../BackendAPI/BooksAPI';

class Book extends Component {

  handleShelfChange = (e) => {
    BooksAPI.update(this.props.book, e.target.value)
            .then(() => this.props.onShelfChange());
  };

  render() {
    //initialize component fields
    const book = this.props.book;
    const coverImageUrl = `url(${Utils.getProp(['book', 'imageLinks', 'smallThumbnail'], this.props, '')})`;
    const width = this.props.width || 128;
    const height = this.props.height || 193;

    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: width,
              height: height,
              backgroundImage: coverImageUrl
            }}/>

          <div className="book-shelf-changer">
            <select onChange={this.handleShelfChange} defaultValue={'none'}>
              <option value="none" disabled>Move to...</option>
              <option style={{ background: book.shelf === 'currentlyReading' ? '#acaf46' : '#fff' }}
                      value="currentlyReading">Currently Reading
              </option>
              <option style={{ background: book.shelf === 'wantToRead' ? '#acaf46' : '#fff' }}
                      value="wantToRead">Want to Read
              </option>
              <option style={{ background: book.shelf === 'read' ? '#acaf46' : '#fff' }} value="read">Read</option>
              <option style={{ background: book.shelf === 'none' ? '#acaf46' : '#fff' }} value="none">None</option>
            </select>
          </div>

        </div>
        <div className="book-title">{Utils.getProp(['book', 'title'], this.props, 'No title information')}</div>
        <div className="book-authors">{Utils.getProp(['book', 'authors'], this.props, 'No author information')}</div>
      </div>
    );
  }

}

export default Book;