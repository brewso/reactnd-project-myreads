import React, { Component }  from 'react'
import { Link } from 'react-router-dom'
import BookBuild from './BookBuild.js'
import Scroll from 'react-scroll'



class SearchBooks extends Component {

  state = {
    query: '',
  };

  searchQuery = [ 'Android', 'Artificial Intelligence', 'Astronomy', 'Austen', 'Baseball', 'Basketball',
                  'Bhagat', 'Biography', 'Brief', 'Business', 'Camus', 'Cervantes', 'Christie', 'Classics',
                  'Comics', 'Cook', 'Cricket', 'Cycling', 'Desai', 'Design', 'Development', 'Digital Marketing',
                  'Drama', 'Drawing', 'Dumas', 'Education', 'Everything', 'Fantasy', 'Film', 'Finance', 'First',
                  'Fitness', 'Football', 'Future', 'Games', 'Gandhi', 'History', 'History', 'Homer', 'Horror',
                  'Hugo', 'Ibsen', 'Journey', 'Kafka', 'King', 'Lahiri', 'Larsson', 'Learn', 'Literary Fiction',
                  'Make', 'Manage', 'Marquez', 'Money', 'Mystery', 'Negotiate', 'Painting', 'Philosophy', 'Photography',
                  'Poetry', 'Production', 'Program Javascript', 'Programming', 'React', 'Redux', 'River', 'Robotics',
                  'Rowling', 'Satire', 'Science Fiction', 'Shakespeare', 'Singh', 'Swimming', 'Tale', 'Thrun', 'Time',
                  'Tolstoy', 'Travel', 'Ultimate', 'Virtual Reality', 'Web Development', 'iOS' ];
  page = 0;

  componentDidMount() {
    this.props.searchAllBooks(this.searchQuery[this.page]);
    Scroll.animateScroll.scrollToTop('smooth');
  };

  changePage = (className) => {
    const firstPage = 0;
    const lastPage = this.searchQuery.length - 1;
    (className === 'forward') ? this.page++ : this.page--;
    // page carousel logic
    if (this.page < firstPage) { this.page = lastPage };
    if (this.page > lastPage) { this.page = firstPage };
    this.props.searchAllBooks(this.searchQuery[this.page])
    Scroll.animateScroll.scrollToTop('smooth');
  };

  updateQuery = (query) => {
    this.setState({ query: query.trim() });
    if(query.length > 0) {
      this.props.searchAllBooks(query)
    } else {
      this.props.searchAllBooks(this.searchQuery[this.page])
    }
  };

  render(){
    //passing props down the tree
    // eslint-disable-next-line
    const { books, searchAllBooks, searched, error, changeShelf, page } = this.props;
    const { query } = this.state;


    return(
    <div className="search-books">
      <div className="search-books-bar">
        <Link to="/"
          className="close-search">Close</Link>
        <div className="search-books-input-wrapper">
          <input type="text"
            placeholder="Search database by Category"
            value={ query }
            onChange={ (event) => {
              this.updateQuery(event.target.value);
             }
           }
           />

        </div>
      </div>
      <div className="search-books-results">
        { this.props.error.length > 0 &&
          <h2 className="error">{ error }</h2>
        }
        { query.length === 0 &&
          <div className="page-controls">
            <button className="previous" onClick={( event) => this.changePage('previous') }>{ "<" }</button>
            <h2 className="category">Category : { this.searchQuery[this.page] }</h2>
            <button className="forward" onClick={ (event) => this.changePage('forward') }>{ ">" }</button>
          </div>
        }
        <BookBuild
          showingBooks={ this.props.searched }
          changeShelf={ this.props.changeShelf }
          shelf={ "search" }
          query={ this.state.query }
          />
      </div>
      { query.length === 0 &&
        <div className="page-controls">
          <button className="previous" onClick={( event) => this.changePage('previous') }>{ "<" }</button>
          <h2 className="category">Category : { this.searchQuery[this.page] }</h2>
          <button className="forward" onClick={ (event) => this.changePage('forward') }>{ ">" }</button>
        </div>
      }
    </div>
  )}
}

export default SearchBooks;
