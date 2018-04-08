import React, {Component} from 'react';
import * as Utils from '../../Utils/Utils';
import * as BooksAPI from '../../BackendAPI/BooksAPI';
import Modal from 'material-ui/Modal';
import Tooltip from 'material-ui/Tooltip';
import './Book.css';

const optionText = {
  currentlyReading: 'Currently Reading',
  wantToRead: 'Want to Read',
  read: 'Read',
  none: 'None'
};


class Book extends Component {
  state = { detailsOpen: false };

  handleDetailView = () => {
    this.setState((oldState) => ({ detailsOpen: !oldState.detailsOpen }));
  };

  handleShelfChange = (e) => {
    BooksAPI.update(this.props.book, e.target.value)
            .then(() => this.props.onShelfChange());
  };

  showBadge(book) {
    // show the badge only if in search mode
    return window.location.pathname === '/search' && book.hasOwnProperty('shelf');
  }

  /*
   * Note: It seams that the check-mark that has to
   *   show in front of the select option, if the book is in a collection, is a platform
   *   feature that I have no control over. So I use this little
   *   hack to display a check-mark on windows platforms
   */
  getOptionText(value) {
    if (this.props.book.hasOwnProperty('shelf')) {
      if (this.props.book.shelf === value) {
        return `✔ ${optionText[value]}`;
      }
      else return `   ${optionText[value]}`;
    }
    if (value !== 'none') {
      return `${optionText[value]}`;
    }
    return `✔ None`;
  }

  render() {

    const book = this.props.book;
    const coverImageUrl = `url(${Utils.getProp(['book', 'imageLinks', 'smallThumbnail'], this.props, '')})`;
    const width = this.props.width || 128;
    const height = this.props.height || 193;
    const showBadge = this.showBadge(book);

    return (
      <div className="book">
        <div className="book-top">
          <div
            onClick={this.handleDetailView}
            className="book-cover"
            style={{
              width: width,
              height: height,
              backgroundImage: coverImageUrl
            }}
          />
          <Tooltip title={`In Collection: ${optionText[book.shelf]}`}>
            <div style={{ display: showBadge ? '' : 'none' }} className='book-badge'/>
          </Tooltip>
          <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={this.state.detailsOpen}
            onClose={this.handleDetailView}>
            <div className='book-dialog'>
              <div
                style={{
                  width: width,
                  height: height,
                  backgroundImage: coverImageUrl,
                  display: 'inline-block',
                  margin: '0px 10px 0px 0px'
                }}
              />
              <div style={{ display: 'inline-block' }}>
                <div>
                  <span>Title:</span><span> {Utils.getProp(['book', 'title'], this.props, 'No title information')}</span>
                </div>
                <div><p>Authors: {Utils.getProp(['book', 'authors'], this.props, 'No author information')}</p></div>
                <div><p>Published: {Utils.getProp(['book', 'publishedDate'], this.props, '---')}</p></div>
              </div>
              <div style={{ maxHeight: '30vh', overflow: 'auto' }}>
                <p>Description: {Utils.getProp(['book', 'description'], this.props, 'No description information')}</p>
              </div>

            </div>
          </Modal>
          <div className="book-shelf-changer">
            <select onChange={this.handleShelfChange} value={book.shelf || 'none'}>
              <option value="none" disabled>Move to...</option>
              <option value="currentlyReading">{this.getOptionText('currentlyReading')}</option>
              <option value="wantToRead">{this.getOptionText('wantToRead')}</option>
              <option value="read">{this.getOptionText('read')}</option>
              <option value="none">{this.getOptionText('none')}</option>
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