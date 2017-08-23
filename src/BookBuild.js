import React, { Component }  from 'react'




class BookBuild extends Component {
    render() {
    const { showingBooks, changeShelf, shelf, query } = this.props
    return(
      <ol className='books-grid'>
      {showingBooks.filter((book) => (book.shelf === shelf || shelf === "search")).map((book) => (
        <li key={book.id} className='book'>
          <div className='book-top'>
            <div className='book-cover' style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
            <div className="book-shelf-changer">
              <select value={book.shelf} onChange={(e) => changeShelf(e, book)}>
                <option value="none" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="archive">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">{book.authors}</div>
        </li>
      ))}
    </ol>
    )}
}

export default BookBuild
