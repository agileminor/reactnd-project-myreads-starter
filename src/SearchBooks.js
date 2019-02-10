import React, {Component} from 'react';
import * as BooksAPI from './BooksAPI';
import Book from './Book'

class SearchBooks extends Component {
    constructor(props) {
        super(props)
        this.state= {
            query: '',
            search_books: []
        }
        this.updateShelf = (book, shelf) => {
            this.props.updateBook(book, shelf)
            const new_search_books = [...this.state.search_books]
            const book_position = new_search_books.findIndex(b => b.id === book.id)
            const updatedBook = {
                ...book,
                shelf: shelf
            }
            new_search_books[book_position] = updatedBook
            this.setState(() => ({
                search_books: new_search_books
            }))
        }
        this.updateQuery = (query) => {
            this.setState(() => ({
                query: query
            }) )
            if (query.length===0) {
                this.setState(() => ({
                    search_books: []
                }))
            } else {
                BooksAPI.search(query).then((search_books) => {
                    if (search_books.error) {
                        this.setState(() => ({
                            search_books: []
                        }))
                    } else  {
                        this.setState(() => ({
                            search_books: search_books
                        }))
                    }
                })
            }
        }
    }

    getShelf = (shelved_books, search_book) => {
        const match_book = shelved_books.filter(book => book.id === search_book.id)
        const result = match_book.length > 0 ? {id: match_book[0].shelf, title: this.props.shelves[match_book[0].shelf]} : {id: 'none', title: 'None'}
        return result
    }
    render() {
        const {query} = this.state
        const changePage = this.props.changePage
        return(
            <div className="search-books">
                <div className="search-books-bar">
                    <button className="close-search" onClick={() => changePage()}>Close</button>
                        <div className="search-books-input-wrapper">
                            {/*
                              NOTES: The search from BooksAPI is limited to a particular set of search terms.
                              You can find these search terms here:
                              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                              you don't find a specific author or title. Every search is limited by search terms.
                            */}
                            <input
                                className='search-books-input'
                                type="text"
                                placeholder="Search by title or author"
                                value={query}
                                onChange={(event) => this.updateQuery(event.target.value)}
                                />
                        </div>
                </div>
                    <div className="search-books-results">
                      <ol className="books-grid">
                          {this.state.search_books.map((search_book) => (
                            <li key={search_book.id} className='book-item'>
                                <Book
                                    book={search_book}
                                    shelf={this.getShelf(this.props.shelved_books, search_book)}
                                    updateBook={this.updateShelf}/>
                            </li>
                            ))}
                      </ol>
                    </div>
            </div>
    )
    }
}

export default SearchBooks;