import React, { useState, useEffect } from 'react';
import API from '../../utils/API';
import DeleteBtn from '../../components/DeleteBtn';
import { Col, Row, Container } from '../../components/Grid';
import { List, ListItem } from '../../components/List';



export default function Saved() {

  const [savedBooks, setSavedBooks] = useState({
    books: [],
    isLoading: false
  });
  const { books, isLoading } = savedBooks;

  useEffect(() => {
    loadBooks()
  }, []);

  //load saved books when mount component
  function loadBooks() {
    setSavedBooks({
      isLoading: true
    })
    API.getBooks()
      .then(res =>
        setSavedBooks({
          ...savedBooks,
          books: res.data,
          isLoading: false
        }))
      .catch(err => {
        setSavedBooks({
          isLoading: false
        })
        console.log(err)
      });
  }

  // delete function
  function deleteBook(id) {
    if (!window.confirm('Are you sure delete this book?')) {
      return
    } else {
      API.deleteBook(id)
        .then(
          res => {
            loadBooks();
            alert(`"${res.data.title}" has been deleted!!`)
          }
        )
        .catch(err => console.log(err))
    }

  }

  return (
    <Container fluid>
      {isLoading ?
        <h2>Loading...</h2> :
        books ?
          (
            <List>
              {books.map(book => (
                <ListItem key={book.id}>
                  <Row>
                    <Col size="md-2">
                    </Col>
                    <Col size="md-10">
                      <h4 className="font-bold">{book.title}</h4>
                    </Col>
                    <Col size="12 sm-4 md-4">
                      <img
                        className="img-thumbnail img-fluid w-35"
                        src={book.image}
                        alt={book.title}
                      />
                    </Col>
                    <Col size="12 sm-8 md-8">
                      <p className="author">Written by {book.authors ? book.authors.join(`, `) : "Unknown author"}</p>
                      <p>{book.description}</p>
                    </Col>
                  </Row>
                  <DeleteBtn onClick={() => deleteBook(book.id)} />
                  <div className="btn-container">
                    <a id="space"
                      className="btn btn-success mr-1 float-right"
                      target="_blank"
                      rel="noopener noreferrer"
                      href={book.infoLink}
                    >
                      View
                    </a>
                  </div>
                </ListItem>
              ))}
            </List>
          ) : (
            <h3>No Results to Display</h3>
          )}

    </Container>

  )
}
