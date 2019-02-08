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
      books: [
        {id: 0,
               title: 'To Kill a Mockingbird',
               imageLinks: {thumbnail: "http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api"},
               authors: ['Harper Lee'],
               shelf: "currentlyReading"
             },
        {id: 1,
               title: "Ender's Game",
               imageLinks: {thumbnail: "http://books.google.com/books/content?id=yDtCuFHXbAYC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72RRiTR6U5OUg3IY_LpHTL2NztVWAuZYNFE8dUuC0VlYabeyegLzpAnDPeWxE6RHi0C2ehrR9Gv20LH2dtjpbcUcs8YnH5VCCAH0Y2ICaKOTvrZTCObQbsfp4UbDqQyGISCZfGN&source=gbs_api"},
               authors: ['Orson Scott Card'],
               shelf: "currentlyReading"
             },
        {id:2,
                title: '1776',
                imageLinks: {thumbnail: "http://books.google.com/books/content?id=uu1mC6zWNTwC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73pGHfBNSsJG9Y8kRBpmLUft9O4BfItHioHolWNKOdLavw-SLcXADy3CPAfJ0_qMb18RmCa7Ds1cTdpM3dxAGJs8zfCfm8c6ggBIjzKT7XR5FIB53HHOhnsT7a0Cc-PpneWq9zX&source=gbs_api"},
                authors: ['David McCullough'],
                shelf: "wantToRead"
              },
        {id: 3,
                title: "Harry Potter and the Sorcerer's Stone",
                imageLinks:{thumbnail: "http://books.google.com/books/content?id=wrOQLV6xB-wC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72G3gA5A-Ka8XjOZGDFLAoUeMQBqZ9y-LCspZ2dzJTugcOcJ4C7FP0tDA8s1h9f480ISXuvYhA_ZpdvRArUL-mZyD4WW7CHyEqHYq9D3kGnrZCNiqxSRhry8TiFDCMWP61ujflB&source=gbs_api"},
                authors: 'J.K. Rowling',
                shelf: "wantToRead"
              },
        {id:4,
                title: 'The Hobbit',
                imageLinks: {thumbnail: "http://books.google.com/books/content?id=pD6arNyKyi8C&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE70Rw0CCwNZh0SsYpQTkMbvz23npqWeUoJvVbi_gXla2m2ie_ReMWPl0xoU8Quy9fk0Zhb3szmwe8cTe4k7DAbfQ45FEzr9T7Lk0XhVpEPBvwUAztOBJ6Y0QPZylo4VbB7K5iRSk&source=gbs_api"},
                authors: ['J.R.R. Tolkien'],
                shelf: 'read'
              },
        {id: 5,
                title:"Oh, the Places You'll Go!",
                imageLinks: {thumbnail:"http://books.google.com/books/content?id=1q_xAwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE712CA0cBYP8VKbEcIVEuFJRdX1k30rjLM29Y-dw_qU1urEZ2cQ42La3Jkw6KmzMmXIoLTr50SWTpw6VOGq1leINsnTdLc_S5a5sn9Hao2t5YT7Ax1RqtQDiPNHIyXP46Rrw3aL8&source=gbs_api"},
                authors: ['Seuss'],
                shelf: 'read'
              },
        {id: 6,
                title: 'The Adventures of Tom Sawyer',
                imageLinks: {thumbnail: "http://books.google.com/books/content?id=32haAAAAMAAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72yckZ5f5bDFVIf7BGPbjA0KYYtlQ__nWB-hI_YZmZ-fScYwFy4O_fWOcPwf-pgv3pPQNJP_sT5J_xOUciD8WaKmevh1rUR-1jk7g1aCD_KeJaOpjVu0cm_11BBIUXdxbFkVMdi&source=gbs_api"},
                authors: ['Mark Twain'],
                shelf: 'read'
              }
        ],
        shelves: [{id: 'currentlyReading', title: 'Currently Reading'},
                  {id: 'wantToRead', title: "Want to Read"},
                  {id: 'read', title: 'Read'}
                  ]

    };
    this.changePage = () => {
      this.setState({ showSearchPage: false })
    }
  }


  render() {
      {BooksAPI.getAll().then((books) => console.log(books))}
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
