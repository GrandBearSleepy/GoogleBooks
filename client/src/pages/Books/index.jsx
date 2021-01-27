import React, { useState } from 'react';
import { Input, SearchBtn } from '../../components/SearchForm';
import API from '../../utils/API';
import { List, ListItem } from '../../components/List';
import { Col, Row, Container } from '../../components/Grid';
import SaveBtn from '../../components/SaveBtn';



export default function Books() {

  const [searchedBooks, setSearchedBooks] = useState({
    books: [],
    isLoading: false
  });

  const [search, setSearch] = useState('');

  //destructure searchedBooks
  const { books, isLoading } = searchedBooks


  //handle input change function, update input state
  function handleInputChange(event) {
    const value = event.target.value
    setSearch(value);

  }

  //save book function
  async function saveBook(id) {
    //find the book want to be saved from searchedBooks state
    const book = books.find(book => book.id === id)
    console.log(book)
    await API.getBook(book.id)
      .then(res => {
        console.log(res)
        if (!res.data) {
          API.saveBook({
            id: book.id,
            title: book.volumeInfo.title,
            author: book.volumeInfo.authors[0],
            description: book.volumeInfo.description,
            image: book.volumeInfo.imageLinks.thumbnail,
            link: book.volumeInfo.infoLink,
          })
            .then((res) => {
              if (res.data.status === 'error') {
                throw new Error(res.data.message);
              }
              else {
                console.log(res);
                alert(`"${res.data.title}" has been saved`)
              }
            })
            .catch((err) => console.log(err.response));
        }
        else { alert(`"${res.data.title}" is already in your list`) }
      })
      .catch((err) => console.log(err))
  }


  function handleSearch(event) {
    setSearchedBooks({
      isLoading: true
    })
    event.preventDefault();
    API.searchBooks(search)
      .then(res => {
        console.log(res.data.items)
        setSearchedBooks({
          ...searchedBooks,
          books: res.data.items,
          isLoading: false
        })
      })
      .catch(err => {
        setSearchedBooks({
          isLoading: false
        })
      })
  }
  return (
    <Container fluid>
      <Input handleInputChange={handleInputChange} />
      <SearchBtn
        disabled={!search}
        onClick={handleSearch}>Search</SearchBtn>
      {isLoading ? <h2>Loading...</h2> :
        <List>
          {books.map(book => (
            <ListItem key={book.id}>
              <Row>
                <Col size="md-2">
                </Col>
                <Col size="md-10">
                  <h4 className="font-bold">{book.volumeInfo.title}</h4>
                </Col>
                <Col size="12 sm-4 md-4">
                  <img
                    className="img-thumbnail img-fluid w-35"
                    src={book.volumeInfo.imageLinks.thumbnail}
                    alt={book.volumeInfo.title}
                  />
                </Col>
                <Col size="12 sm-8 md-8">
                  <p className="author">Written by {book.volumeInfo.authors ? book.volumeInfo.authors.join(`, `) : "Unknown author"}</p>
                  <p>{book.volumeInfo.description}</p>
                </Col>
              </Row>
              <SaveBtn onClick={() => saveBook(book.id)} />
              <div className="btn-container">
                <a id="space"
                  className="btn btn-success mr-1 float-right"
                  target="_blank"
                  rel="noopener noreferrer"
                  href={book.volumeInfo.infoLink}
                >
                  View
                        </a>
              </div>
            </ListItem>
          ))}
        </List>
      }
    </Container>
  )
}
