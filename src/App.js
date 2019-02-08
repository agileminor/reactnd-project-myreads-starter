import React from 'react';
// import * as BooksAPI from './BooksAPI'
import './App.css';
import SearchBooks from './SearchBooks';
import * as BooksAPI from './BooksAPI';
import Shelf from './Shelf';
import {Route, Link} from 'react-router-dom';

class BooksApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      /**
       * TODO: Instead of using this state variable to keep track of which page
       * we're on, use the URL in the browser's address bar. This will ensure that
       * users can use the browser's back and forward buttons to navigate between
       * pages, as well as provide a good URL they can bookmark and share.
       */
      showSearchPage: false,
      books: [],
      shelves: [{id: 'currentlyReading', title: 'Currently Reading'},
                  {id: 'wantToRead', title: "Want to Read"},
                  {id: 'read', title: 'Read'}
                  ]

    };
    this.changePage = () => {
      this.setState({ showSearchPage: false })
    }
  }
updateBook = (book, shelf) => {
    BooksAPI.update(book, shelf)
    .then(() => {
        this.setState(() => {
    BooksAPI.getAll()
    .then((books) => {
      this.setState(() => ({
        books
      }))
    })

        })
    })
  }
  componentDidMount() {
    BooksAPI.getAll()
    .then((books) => {
      this.setState(() => ({
        books
      }))
    })
  }


  render() {
    return (
      <div className="app">
        <Route path='/search' render={({history}) => (
          <SearchBooks
            changePage={() => {
              this.changePage()
              history.push('/')
            }}
            />
            )}/>
        <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                {this.state.shelves.map((shelf) => (
                  <Shelf key={shelf.id} shelf={shelf} books={this.state.books.filter(book => book.shelf === shelf.id)}/>
                  ))}
              </div>
            </div>
            <div className="open-search">
              <Link
                to='/search' className='search-link'>
                <button >Add a book</button>
              </Link>
            </div>
          </div>
        )}/>
      </div>
    )
  }
}

export default BooksApp
