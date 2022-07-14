import { Link } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';

const CardList = ({ notes }) => {
  return (
    <div className="card-list">
      {notes.map((note, index) => (
        <Card style={{ width: '20rem' }} border="" key={index}>
          <Card.Img
            className="card-img"
            variant="top"
            src="https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350"
          />
          <Card.Body className="card-textbox">
            <Card.Title>{note.description}</Card.Title>
            <Card.Text>
              Module: {note.modId}
              <br />
              Professor: {note.profName}
              <br />
              Author: {note.authorName}
            </Card.Text>
            <Button variant="primary" as={Link} to={`/note/${note._id}`}>
              View Note
            </Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default CardList;
