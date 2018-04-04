import React, {Component} from 'react';
import * as Utils from '../../Utils/Utils';

class Book extends Component {

  //initialize component fields
  book = this.props.book;
  coverImageUrl = `url(${Utils.getProp(['book', 'imageLinks', 'smallThumbnail'], this.props, '')})`;
  width = this.props.width || 128;
  height = this.props.height || 193;

  render() {
    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: this.width,
              height: this.height,
              backgroundImage: this.coverImageUrl
            }}/>
          <div className="book-shelf-changer">
            <select>
              <option value="none" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{Utils.getProp(['book', 'title'], this.props, 'No title information')}</div>
        <div className="book-authors">{Utils.getProp(['book', 'authors'], this.props, 'No author information')
                                            .join('\n')}</div>
      </div>
    );
  }

}

export default Book;