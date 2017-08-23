import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchBooks from './SearchBooks'
import ListBooks from './ListBooks'

class BooksApp extends Component {

  state = {
    books:[]
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }


    changeShelf = (e, book) => {
    BooksAPI.update(book, e.target.value).then(
      BooksAPI.get(book.id).then((book) =>
      this.setState((state) => ({
        books: state.books.filter((b) => (b.id !== book.id)).concat([book])
      }))
    ))
  }

  searchAllBooks = (query, numOfBooks) => {

  }
//instead of state renders Components using react-router-dom
  render() {
    return (
      <div className="app">
        <Route exact path="/"
          render={() => (
            <ListBooks
              books={this.state.books}
              changeShelf={this.changeShelf}
              />

          )}
          />
        <Route exact path="/search"
          render={() => (
            <SearchBooks
              books={this.state.books}
              searchAllBooks={this.searchAllBooks}
              changeShelf={this.changeShelf}
              />
          )}
          />
      </div>
    )
  }
}

export default BooksApp
