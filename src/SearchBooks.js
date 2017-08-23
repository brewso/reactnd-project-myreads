import React, { Component }  from 'react'
import { Link } from 'react-router-dom'
import BookBuild from './BookBuild.js'


class SearchBooks extends Component {

  state ={
    query: ''
  }

  updateQuery = (query) => {
    this.setState({ query: query.trim() })
  }

  render(){
    const { books, searchAllBooks, changeShelf } = this.props
    const { query } = this.state

    /*TODO
      setup api search function
      DONE search updates setState
      DONE search both title and authors

    */

    let showingBooks
    if(query) {
      const match = new RegExp(query, 'i')
      showingBooks = books.filter((book) => match.test(book.authors) || match.test(book.title))
    }else{
      showingBooks = books
    }

    return(
    <div className="search-books">
      <div className="search-books-bar">
        <Link to="/"
          className="close-search">Close</Link>
        <div className="search-books-input-wrapper">
          {/*
            NOTES: The search from BooksAPI is limited to a particular set of search terms.
            You can find these search terms here:
            https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

            However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
            you don't find a specific author or title. Every search is limited by search terms.
          */}
          <input type="text"
            placeholder="Search by title or author"
            value={query}
            onChange={(event) => this.updateQuery(event.target.value)}/>

        </div>
      </div>
      <div className="search-books-results">
        <BookBuild
          showingBooks={showingBooks}
          changeShelf={this.props.changeShelf}
          shelf={"search"}
          query={this.state.query}
          />
      </div>
    </div>
  )}
}

export default SearchBooks
