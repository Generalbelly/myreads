import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import BookShelf from './BookShelf'
import Constant from './Constant'

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
            {Object.keys(Constant.shelves).map(shelfKey =>
              <BookShelf
                key={shelfKey}
                title={Constant.shelves[shelfKey]}
                books={books.filter(book => book.shelf === shelfKey)}
                updateShelf={updateShelf}
                handleClick={handleClick}
              />
            )
          }
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
