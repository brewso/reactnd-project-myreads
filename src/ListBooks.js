import React, { Component }  from 'react'
import { Link } from 'react-router-dom'
import BookBuild from './BookBuild.js'

class ListBooks extends Component {

  render() {
    const { books, changeShelf } = this.props

    return(
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
        { /**
          *TODO
          *DONE populate bookshelf with array of books
          *DONE filter books based on shelf attribute (api)
          *DONE use state to control which shelf book is on
          *DONE allow dropdown to setState
          *DONE get books from api instead of made array
          *DONE seperate book Component
          *
          *
          */
        }
          <div className="bookshelf">
            <h2 className="bookshelf-title">Currently Reading</h2>
            <div className="bookshelf-books">
                <BookBuild
                  books={this.props.books}
                  changeShelf={this.props.changeShelf}
                  shelf={"currentlyReading"}
                  />
            </div>
          </div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Want to Read</h2>
            <div className="bookshelf-books">
              <BookBuild
                books={this.props.books}
                changeShelf={this.props.changeShelf}
                shelf={"wantToRead"}
                />
            </div>
          </div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Read</h2>
            <div className="bookshelf-books">
              <BookBuild
                books={this.props.books}
                changeShelf={this.props.changeShelf}
                shelf={"read"}
                />
            </div>
          </div>
        </div>
      </div>
      <div className="open-search">
        <Link to="/search" className="add-book">Add a book</Link>
      </div>
    </div>
  )}
}

export default ListBooks
