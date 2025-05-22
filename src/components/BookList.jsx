import { Component } from "react";
import SingleBook from "./SingleBook";
import CommentArea from "./CommentArea";
import { Col, Form, Row, Container } from "react-bootstrap";

class BookList extends Component {
  // Stato locale: searchQuery serve per filtrare i libri, selectedBook tiene traccia del libro selezionato
  state = {
    searchQuery: "",
    selectedBook: null,
  };

  // Quando seleziono un libro, aggiorno selectedBook con il suo asin
  handleBookSelect = (asin) => {
    this.setState({ selectedBook: asin });
  };

  render() {
    return (
      // Uso Container fluid per avere un layout che si adatta a tutta la larghezza
      <Container fluid>
        {/* Prima riga: campo di ricerca */}
        <Row className="justify-content-center mt-5">
          <Col xs={12} md={4} className="text-center">
            <Form.Group>
              {/* Input di ricerca: aggiorna searchQuery nello stato ogni volta che scrivo */}
              <Form.Control
                type="search"
                placeholder="Cerca un libro"
                value={this.state.searchQuery}
                onChange={(e) => this.setState({ searchQuery: e.target.value })}
              />
            </Form.Group>
          </Col>
        </Row>
        {/* Seconda riga: due colonne principali */}
        <Row className="mt-3">
          {/* Colonna sinistra: griglia dei libri */}
          <Col xs={12} md={8}>
            <Row className="g-2">
              {/* Filtro i libri in base al testo cercato (case insensitive) */}
              {this.props.books
                .filter((b) => b.title.toLowerCase().includes(this.state.searchQuery.toLowerCase()))
                .map((b) => (
                  // Ogni libro è in una colonna, passo le props a SingleBook
                  <Col xs={12} md={4} key={b.asin}>
                    <SingleBook
                      book={b}
                      isSelected={this.state.selectedBook === b.asin} // true se il libro è selezionato
                      onBookSelect={this.handleBookSelect} // funzione per selezionare il libro
                    />
                  </Col>
                ))}
            </Row>
          </Col>
          {/* Colonna destra: area commenti */}
          <Col xs={12} md={4}>
            {/* Passo l'asin del libro selezionato a CommentArea */}
            <CommentArea asin={this.state.selectedBook} />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default BookList;
