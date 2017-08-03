import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import SearchBooks from './SearchBooks'
import ListBooks from './ListBooks'
import ShowDetail from './ShowDetail'
import * as BooksAPI from './BooksAPI'
import Constant from './Constant'
import './App.css'

class BooksApp extends Component {

  state = {
    book: {},
    books: [],
    query: '',
    searchResult: [],
    fromSearch: false,
  }

  componentDidMount() {
    BooksAPI.getAll().then(data => {
      const books = data.map(item => this.convertToBook(item))
      this.setState({ books: books })
    })
  }

  convertToBook = (data, forSearch = false) => ({
    author: (data.authors) ? data.authors[0] : 'Unknown',
    title: data.title,
    previewLink: data.previewLink,
    cover: (data.imageLinks) ? data.imageLinks.thumbnail : 'https://dummyimage.com/128x193/fff/bcbcbc&text=No+image',
    shelf: (forSearch) ? 'None' : data.shelf,
    description: (data.description) ? data.description : 'No description is available.',
    id: data.id,
  })

  updateShelf = (book, shelf) => {
    const bookToUpdate = { ...book, shelf: shelf }
    this.setState((prevState) => {
      const index = prevState.books.findIndex(book => (book.id === bookToUpdate.id))
      let books = null
      if (index !== -1) {
        books = [
          ...prevState.books.slice(0, index),
          bookToUpdate,
          ...prevState.books.slice(index + 1),
        ]
      } else {
        books = [
          ...prevState.books.slice(),
          bookToUpdate,
        ]
      }
      return { books: books }
    });

    BooksAPI.update(bookToUpdate, shelf)
  }

  goToDetail = (book, history, fromSearch) => {
    this.setState({ book: book, fromSearch: fromSearch })
    history.push({
      pathname: '/detail'
    })
  }

  updateQuery = (value) => {
    this.setState({ query: value })
    const query = value.trim()
    if (query !== '') {
      BooksAPI.search(query, Constant.searchMaxResults).then((data) => {
        if (data && !data.error) {
          const books = data.map(item => {
            let book = this.state.books.find(book => (book.id === item.id))
            return (book) ? book : this.convertToBook(item, true)
          })
          this.setState({ searchResult: books})
        } else {
          this.setState({ searchResult: []})
        }
      })
    } else {
      // I don't know why but sometimes I saw previous result staying when the query is empty string.
      // To get rid of that kind of result, I needed setTimeout function.
      window.setTimeout(() => {
        this.setState({ searchResult: []})
      }, 1000);
    }
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={({ history }) => (
          <ListBooks
            books={this.state.books}
            updateShelf={this.updateShelf}
            handleClick={(book) => {
              this.goToDetail(book, history, false)
            }}
          />
        )} />
        <Route path="/search" render={({ history }) => (
          <SearchBooks
            books={this.state.searchResult}
            query={this.state.query}
            updateQuery={this.updateQuery}
            updateShelf={this.updateShelf}
            handleClick={(book) => {
              this.goToDetail(book, history, true)
            }}
          />
        )} />
        <Route path="/detail" render={() => (
          (Object.keys(this.state.book).length === 0) ? (<Redirect to='/' />) : (<ShowDetail book={this.state.book} fromSearch={this.state.fromSearch} />)
        )} />
      </div>
    )
  }
}

export default BooksApp
