import { Link } from 'react-router-dom';
import { Button, Card , Row , Col , Container } from 'react-bootstrap';

const CardList2 = ({ notes }) => {
  const shortage = 6-notes.length

  return (
    <Container>
    <div className="card-list">
      {notes.map((note) => ( 
        <Card as={Link} to={`/note/${note._id}`} style={{ width: '20rem', textDecoration: 'none'  }} border="" key={note._id}>
          <Card.Img
            className="card-img"
            variant="top"
            src={note.image}
          />
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
    <Card className='filler-card' style={{ width: '20rem', textDecoration: 'none'  }}></Card>
    </div>
    </Container>
  );
};

export default CardList2;
