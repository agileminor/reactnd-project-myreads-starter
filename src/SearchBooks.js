import React, {Component} from 'react';
import * as BooksAPI from './BooksAPI';

class SearchBooks extends Component {
    constructor(props) {
        super(props)
        this.state= {
            query: '',
            search_books: []
        }
        this.updateQuery = (query) => {
            this.setState(() => ({
                query: query.trim()
            }) )
            BooksAPI.search(query).then((search_books) => {
                this.setState(() => ({
                    search_books: search_books
                }))
            })
        }
        this.clearQuery = this.clearQuery.bind(this);
    }
    clearQuery = () => {
        this.updateQuery('');
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
                      <ol className="books-grid"></ol>
                    </div>
            </div>
    )
    }
}

export default SearchBooks;