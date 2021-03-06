import React from 'react'
import PropTypes from 'prop-types'

const Book = props => {
  const { updateShelf, handleClick, book } = props
  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div onClick={() => { handleClick(book) }} className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.cover})` }}></div>
          <div className="book-shelf-changer">
            <select value={book.shelf} onChange={(event) => {
              updateShelf(book, event.target.value)
            }}>
              <option value="none" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.author}</div>
      </div>
    </li>
  )
}

Book.propTypes = {
  book: PropTypes.shape({
    author: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    previewLink: PropTypes.string.isRequired,
    cover: PropTypes.string.isRequired,
    shelf: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
  updateShelf: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
}


export default Book
