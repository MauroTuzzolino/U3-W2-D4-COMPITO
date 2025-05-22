import { Component } from "react";
import { Card } from "react-bootstrap";
import CommentArea from "./CommentArea";

class SingleBook extends Component {
  // Stato locale: non lo uso più per la selezione, la selezione ora è gestita dal padre (BookList)
  state = {
    selected: false,
  };

  render() {
    return (
      <>
        {/* Quando clicco sulla card, chiamo la funzione passata dal padre per selezionare il libro */}
        <div
          onClick={() => this.props.onBookSelect(this.props.book.asin)}
          style={{
            // Se il libro è selezionato, bordo rosso, altrimenti nessun bordo
            border: this.props.isSelected ? "2px solid red" : "none",
            cursor: "pointer",
          }}
        >
          {/* Mostro l'immagine del libro */}
          <Card.Img variant="top" src={this.props.book.img} />
          <Card.Body>
            {/* Mostro il titolo del libro */}
            <Card.Title style={{ color: "black" }}>{this.props.book.title}</Card.Title>
          </Card.Body>
        </div>
        {/* NB: Non mostro più qui CommentArea, ora è sempre visibile nella colonna destra di BookList */}
      </>
    );
  }
}

export default SingleBook;
