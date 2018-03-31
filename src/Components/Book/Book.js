import React, {Component} from 'react';

class Book extends Component {

  //initialize component fields
  title = this.props.title;
  author = this.props.author;
  coverImage = this.props.coverImage;
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
              backgroundImage: this.coverImage
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
        <div className="book-title">{this.title}</div>
        <div className="book-authors">{this.author}</div>
      </div>
    );
  }

}

export default Book;