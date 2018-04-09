import React, {Component} from 'react';
import Modal from 'material-ui/Modal';
import Tooltip from 'material-ui/Tooltip';
import * as Utils from '../../Utils/Utils';
import * as appConfig from '../../Config/appConfig';
import './Book.css';

class Book extends Component {
  state = { detailsOpen: false };

  handleDetailView = () => {
    this.setState((oldState) => ({ detailsOpen: !oldState.detailsOpen }));
  };

  handleShelfChange = (e) => {
    this.props.onShelfChange(this.props.book, e.target.value);
  };

  showBadge(book) {
    // show the badge only if in search mode
    return window.location.pathname === '/search' && book.hasOwnProperty('shelf');
  }

  render() {
    const book = this.props.book;
    const coverImageUrl = `url(${Utils.getProp(['book', 'imageLinks', 'smallThumbnail'], this.props, '')})`;
    const width = this.props.width || 128;
    const height = this.props.height || 193;
    const showBadge = this.showBadge(book);
    const shelves = Object.keys(appConfig.shelves);

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
          <Tooltip title={`In Collection: ${Utils.getShelfName(book.shelf)}`}>
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
              {shelves.map(shelf => {
                return (<option key={shelf} value={shelf}>{Utils.getShelfName(shelf)}</option>);
              })}
              <option value="none">None</option>
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