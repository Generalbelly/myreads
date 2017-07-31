import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import BookShelf from './BookShelf'

class ListBooks extends Component {

  static propTypes = {
    books: PropTypes.array.isRequired,
    updateShelf: PropTypes.func.isRequired,
    handleClick: PropTypes.func.isRequired,
  }

  render() {
    const { books, updateShelf, handleClick } = this.props
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <BookShelf
              key={'currentlyReading'}
              title={'Currently Reading'}
              books={books.filter(book => (book.shelf === 'currentlyReading'))}
              updateShelf={updateShelf}
              handleClick={handleClick}
            />
            <BookShelf
              key={'wantToRead'}
              title={'Want to Read'}
              books={books.filter(book => (book.shelf === 'wantToRead'))}
              updateShelf={updateShelf}
              handleClick={handleClick}
            />
            <BookShelf
              key={'read'}
              title={'Read'}
              books={books.filter(book => (book.shelf === 'read'))}
              updateShelf={updateShelf}
              handleClick={handleClick}
            />
          </div>
        </div>
        <div className="open-search">
          <Link className="close-search" to={'/search'} >Add a book</Link>
        </div>
      </div>
    )
  }
}

export default ListBooks;
