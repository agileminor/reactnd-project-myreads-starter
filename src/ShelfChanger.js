import React, {Component} from 'react';


class ShelfChanger extends Component {
    handleChange = (e) => {
    e.preventDefault()

    if (this.props.updateBook) {
      this.props.updateBook(this.props.book, e.target.value)
    }
  }
    render() {
        return (
            <div className="book-shelf-changer">
              <select value={this.props.shelf.id} onChange={this.handleChange}>
                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
        )
    }
}

export default ShelfChanger;