import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchBooks from './SearchBooks'
import ListBooks from './ListBooks'

class BooksApp extends Component {

  state = {
    books:[],
    searched: [],
    error: ''
  };

    booksOnShelf = [];


  componentDidMount() {
    BooksAPI.getAll().then( (books) => {
      this.setState({ books: this.sortByName(books) })
    })
  };

  changeShelf = (e, book, shelf) => {
    BooksAPI.update(book, e.target.value).then(
      BooksAPI.get(book.id).then((book) => {
        this.setState( (state) => ({
          books: this.sortByName(state.books.filter( (b) => (b.id !== book.id)).concat([book]))
        }));
        if(shelf === "search"){
        this.setState( (state) => ({
            searched: this.sortByName(state.searched.filter( (b) => (b.id !== book.id)).concat([book]))
          }));
        };
      })
    )
  };

//alphabatize books using sort function
sortByName = ( books ) => {
  return books.sort(function(a, b) {
    var titleA = a.title.toUpperCase(); // ignore upper and lowercase
    var titleB = b.title.toUpperCase(); // ignore upper and lowercase
    if (titleA < titleB) {
      return -1;
    }
    if (titleA > titleB) {
      return 1;
    }
    // names must be equal
    return 0;
  })
}

  //use api to search query
  searchAllBooks = (query) => {
      BooksAPI.search(query).then((books) => {
        (books.error) ?
        this.setState({ error: 'No results for that search!', searched: []}) :
        this.setState({ error: '' }); this.booksOnShelf=[]; this.bookOnShelf(books);
      });
    }

/*reference raw searched books with stored books on shelfs*/
  bookOnShelf = (search) => {
    if(this.state.error === ""){
      search.map( book => {
        if(this.state.books.filter( b => (b.id === book.id)).length === 0){
          /*DOES NOT MATCH book on shelf*/
          this.booksOnShelf.push(book);
          return 0;
        }else{
          /*DOES MATCH book on shelf*/
          this.state.books.filter( b => b.id === book.id ).map( b => this.booksOnShelf.push(b) );
          return 1;
        }
      })
      this.setState({ searched: this.sortByName(this.booksOnShelf) });
    };
  };

//instead of state renders Components using react-router-dom
  render() {

    return (
      <div className="app">
        <Route exact path="/"
          render={ () => (
            <ListBooks
              books={ this.state.books }
              changeShelf={ this.changeShelf }
              />
          )}
        />
        <Route exact path="/search"
          render={ () => (
            <SearchBooks
              books={ this.state.books }
              searched={ this.state.searched }
              searchAllBooks={ this.searchAllBooks }
              changeShelf={ this.changeShelf }
              error={ this.state.error }
              />
          )}
        />
      </div>
    )
  }
}

export default BooksApp;
