import React, { Component }  from 'react'
import { Link } from 'react-router-dom'
import BookBuild from './BookBuild.js'

class ListBooks extends Component {

  render() {
    // eslint-disable-next-line
    const { books, changeShelf } = this.props;

    return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Currently Reading</h2>
            <div className="bookshelf-books">
                <BookBuild
                  showingBooks={ this.props.books }
                  changeShelf={ this.props.changeShelf }
                  shelf={ "currentlyReading" }
                  />
            </div>
          </div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Want to Read</h2>
            <div className="bookshelf-books">
              <BookBuild
                showingBooks={ this.props.books }
                changeShelf={ this.props.changeShelf }
                shelf={ "wantToRead" }
                />
            </div>
          </div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Read</h2>
            <div className="bookshelf-books">
              <BookBuild
                showingBooks={ this.props.books }
                changeShelf={ this.props.changeShelf }
                shelf={ "read" }
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

export default ListBooks;
