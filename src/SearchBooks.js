import React from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'
import PropTypes from 'prop-types'

const SearchBooks = props => {
  const { books, query, updateShelf, handleClick, updateQuery } = props
  let result = null;
  if (query != '' && books.length === 0) {
    result = (<div>{`Sorry, no matches found for ${query}`}</div>)
  } else {
    result = (<ol className="books-grid">
                {books.map((book) => (
                  <Book
                    key={`${book.id}-search-books`}
                    book={book}
                    updateShelf={updateShelf}
                    handleClick={handleClick}
                  />
                ))}
              </ol>)
  }

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to={'/'} >Close</Link>
        <div className="search-books-input-wrapper">
          {/*
            NOTES: The search from BooksAPI is limited to a particular set of search terms.
            You can find these search terms here:
            https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

            However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
            you don't find a specific author or title. Every search is limited by search terms.
          */}
          <input
            type="text"
            placeholder="Search by title or author"
            value={query}
            onChange={(event) => {
              updateQuery(event.target.value.trim())
            }}
          />
        </div>
      </div>
      <div className="search-books-results">
        {result}
      </div>
    </div>
  )
}

SearchBooks.propTypes = {
  books: PropTypes.array.isRequired,
  query: PropTypes.string.isRequired,
  updateQuery: PropTypes.func.isRequired,
  updateShelf: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
}

export default SearchBooks
