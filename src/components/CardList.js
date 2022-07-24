import { Link } from 'react-router-dom';
import { Card, Container } from 'react-bootstrap';
import { Document, Page, pdfjs } from 'react-pdf';

const CardList = ({ notes }) => {
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  return (
    <Container>
      <div className="card-list">
        {notes.map((note) => (
          <Card
            as={Link}
            to={`/note/${note._id}`}
            style={{ width: '20rem', textDecoration: 'none' }}
            border=""
            key={note._id}
          >
            {/* <Card.Img className="card-img" variant="top" src={note.image} />  */}
            <div className="card-img-top card-img">
              <Document
                file={`https://cors-anywhere.herokuapp.com/${note.url}`}
              >
                <Page pageNumber={1} />
              </Document>
            </div>
            <Card.Body className="card-textbox">
              <Card.Title>Module: {note.modId}</Card.Title>
              <Card.Text>
                Professor: {note.profName}
                <br />
                Author: {note.authorName}
                <br />
                Year: {note.year}
              </Card.Text>
            </Card.Body>
          </Card>
        ))}
        <Card
          className="filler-card"
          style={{ width: '20rem', textDecoration: 'none' }}
        ></Card>
      </div>
    </Container>
  );
};

export default CardList;
