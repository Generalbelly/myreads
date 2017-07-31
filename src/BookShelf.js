import React from 'react'
import Book from './Book'
import PropTypes from 'prop-types'

const BookShelf = props => (
  <div className="bookshelf">
    <h2 className="bookshelf-title">{props.title}</h2>
    <div className="bookshelf-books">
      <ol className="books-grid">
        {props.books.map((book) => (
          <Book
            key={`${book.id}-${props.title}`}
            book={book}
            updateShelf={props.updateShelf}
            handleClick={props.handleClick}
          />
        ))}
      </ol>
    </div>
  </div>
)

BookShelf.propTypes = {
  title: PropTypes.string.isRequired,
  books: PropTypes.array.isRequired,
  updateShelf: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
}

export default BookShelf
