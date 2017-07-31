import React from 'react'
import Book from './Book'
import PropTypes from 'prop-types'

const BookShelf = props => {
  const { title, books, updateShelf, handleClick } = props
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map((book) => (
            <Book
              key={`${book.id}-${title}`}
              book={book}
              updateShelf={updateShelf}
              handleClick={handleClick}
            />
          ))}
        </ol>
      </div>
    </div>
  )
}

BookShelf.propTypes = {
  title: PropTypes.string.isRequired,
  books: PropTypes.array.isRequired,
  updateShelf: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
}

export default BookShelf
