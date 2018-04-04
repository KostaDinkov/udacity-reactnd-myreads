import React, {Component} from 'react';

class BookShelfChanger extends Component {

  handleShelfChange(event) {

  }

  render() {
    return (
      <div className="book-shelf-changer">
        <select onChange={this.handleShelfChange}>
          <option value="none" disabled>Move to...</option>
          <option style={{ background: this.props.book.shelf === 'currentlyReading' ? '#acaf46' : '#fff' }}
                  value="currentlyReading">Currently Reading
          </option>
          <option style={{ background: this.props.book.shelf === 'wantToRead' ? '#acaf46' : '#fff' }}
                  value="wantToRead">Want to Read
          </option>
          <option style={{ background: this.props.book.shelf === 'read' ? '#acaf46' : '#fff' }} value="read">Read
          </option>
          <option style={{ background: this.props.book.shelf === 'none' ? '#acaf46' : '#fff' }} value="none">None
          </option>
        </select>
      </div>
    );
  }
}

export default BookShelfChanger;