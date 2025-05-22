import { Component } from "react";
import CommentList from "./CommentList";
import AddComment from "./AddComment";
import Loading from "./Loading";
import Error from "./Error";

class CommentArea extends Component {
  // Stato locale: contiene i commenti, lo stato di caricamento e di errore
  state = {
    comments: [],
    isLoading: false,
    isError: false,
  };

  // Funzione per recuperare i commenti dal server per il libro selezionato
  fetchComments = async () => {
    // Se non c'è un asin selezionato, non faccio nulla
    if (!this.props.asin) return;
    // Imposto lo stato di caricamento e svuoto i commenti
    this.setState({ isLoading: true, isError: false, comments: [] });
    try {
      // Faccio la chiamata API per ottenere i commenti del libro selezionato
      let response = await fetch("https://striveschool-api.herokuapp.com/api/comments/" + this.props.asin, {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODE0NzllZDFjMjUwNDAwMTUxYWI2NTAiLCJpYXQiOjE3NDc2NTYzODMsImV4cCI6MTc0ODg2NTk4M30.kpeEBD-MBYYLp2MzRzJMGOb-UcGHEGyevhKZBZ0x5xg",
        },
      });
      // Se la risposta è ok, aggiorno i commenti nello stato
      if (response.ok) {
        let comments = await response.json();
        this.setState({ comments, isLoading: false, isError: false });
      } else {
        // Se la risposta non è ok, imposto errore
        this.setState({ isLoading: false, isError: true });
      }
    } catch (error) {
      // In caso di errore nella fetch, imposto errore
      this.setState({ isLoading: false, isError: true });
    }
  };

  // Quando il componente viene montato, se c'è un asin selezionato, carico i commenti
  componentDidMount() {
    if (this.props.asin) {
      this.fetchComments();
    }
  }

  // Quando il componente riceve nuove props, controllo se è cambiato l'asin
  componentDidUpdate(prevProps) {
    // Se è stato selezionato un nuovo libro, ricarico i commenti
    if (this.props.asin && this.props.asin !== prevProps.asin) {
      this.fetchComments();
    }
    // Se è stato deselezionato il libro, svuoto i commenti e resetto lo stato
    if (!this.props.asin && prevProps.asin) {
      this.setState({ comments: [], isLoading: false, isError: false });
    }
  }

  render() {
    // Se non c'è un libro selezionato, mostro un messaggio
    if (!this.props.asin) {
      return <div className="text-center text-muted">Seleziona un libro per vedere i commenti</div>;
    }
    // Altrimenti mostro l'area commenti con eventuale loading o error
    return (
      <div className="text-center">
        {this.state.isLoading && <Loading />}
        {this.state.isError && <Error />}
        {/* Form per aggiungere un nuovo commento */}
        <AddComment asin={this.props.asin} />
        {/* Lista dei commenti */}
        <CommentList commentsToShow={this.state.comments} />
      </div>
    );
  }
}

export default CommentArea;
