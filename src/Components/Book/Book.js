import React, {Component} from 'react';
import * as Utils from '../../Utils/Utils';
import * as BooksAPI from '../../BackendAPI/BooksAPI';
import Modal from 'material-ui/Modal';
import Tooltip from 'material-ui/Tooltip';

//TODO refactor / extract component styling

const dialogStyle = function () {

  let top = 50;
  let left = 50;

  return {
    position: 'absolute',
    width: '80%',
    top: top + '%', left: left + '%',
    transform: `translate(-${top}%, -${left}%)`,
    border: '1px solid #e5e5e5',
    backgroundColor: 'white',
    boxShadow: '0 5px 15px rgba(0,0,0,.5)',
    padding: 20
  };
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
            }}/>
          <Tooltip title={`In Collection: ${book.shelf}`}>
            {/* TODO fix book shelf name inside the tooltip from camelcase to title */}
            <div style={{ display: showBadge ? '' : 'none' }} className='book-badge'/>
          </Tooltip>


          <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"

            open={this.state.detailsOpen}
            onClose={this.handleDetailView}
          >
            <div style={dialogStyle()}>

              <div
                style={{
                  width: width,
                  height: height,
                  backgroundImage: coverImageUrl,
                  display: 'inline-block',
                  margin: '0px 10px 0px 0px'

                }}/>
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
            <select onChange={this.handleShelfChange} value={book.shelf}>
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