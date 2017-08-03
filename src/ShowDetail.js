import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const ShowDetail = (props) => {
  const { book, fromSearch } = props
  return (
    <div>
      <Link className="close-search" to={(fromSearch) ? '/search' : '/'} >Close</Link>
      <div className="show-detail">
        <h2 className="show-detail-title">{book.title}</h2>
        <p className="show-detail-author">by {book.author}</p>
        <div className="show-detail-box">
          <div className="show-detail-description">
            <p>Description</p>
            <div>{book.description}</div>
            <div className="show-detail-preview">
              <a href={book.previewLink} target="_blank">
                Preview this on Google books
              </a>
            </div>
          </div>
          <div className="show-detail-bookcover">
            <img src={book.cover} alt={book.title}/>
          </div>
        </div>
      </div>
    </div>
  )
}

ShowDetail.propTypes = {
  book: PropTypes.shape({
    author: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    previewLink: PropTypes.string.isRequired,
    cover: PropTypes.string.isRequired,
    shelf: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
}

export default ShowDetail
