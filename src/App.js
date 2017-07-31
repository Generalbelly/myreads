import React, { Component } from 'react'
import { Route, history, Redirect } from 'react-router-dom';
import SearchBooks from './SearchBooks'
import ListBooks from './ListBooks'
import ShowDetail from './ShowDetail'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends Component {

  state = {
    book: {},
    books: [],
    query: '',
    searchResult: [],
  }

  componentDidMount() {
    BooksAPI.getAll().then(data => {
      const books = data.map(item => this.convertToBook(item))
      this.setState({ books: books })
    })
  }

  convertToBook = (data) => ({
    author: (data.authors) ? data.authors[0] : 'Unknown',
    title: data.title,
    previewLink: data.previewLink,
    cover: (data.imageLinks) ? data.imageLinks.thumbnail : 'https://dummyimage.com/128x193/fff/bcbcbc&text=No+image',
    shelf: data.shelf,
    description: data.description,
    id: data.id,
  })

  updateShelf = (book, shelf) => {
    const bookToUpdate = { ...book, shelf: shelf }
    this.setState((prevState) => {
      const index = prevState.books.findIndex(book => (book.id === bookToUpdate.id))
      let books = null
      if (index != -1) {
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

  goToDetail = (book, history) => {
    this.setState({ book: book })
    history.push({
      pathname: '/detail'
    })
  }

  updateQuery = (query) => {
    this.setState({ query: query })
    if (query != '') {
      BooksAPI.search(query, 10).then((data) => {
        if (data && !data.error) {
          const books = data.map(item => this.convertToBook(item))
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
        <Route exact path="/" render={ ({ history }) => (
          <ListBooks
            books={this.state.books}
            updateShelf={this.updateShelf}
            handleClick={(book) => {
              this.goToDetail(book, history)
            }}
          />
        )} />
        <Route path="/search" render={ ({ history }) => (
          <SearchBooks
            books={this.state.searchResult}
            query={this.state.query}
            updateQuery={this.updateQuery}
            updateShelf={this.updateShelf}
            handleClick={(book) => {
              this.goToDetail(book, history)
            }}
          />
        )} />
        <Route path="/detail" render={() => (
          (Object.keys(this.state.book).length === 0) ? (<Redirect to='/' />) : (<ShowDetail book={this.state.book} />)
        )} />
      </div>
    )
  }
}

export default BooksApp
