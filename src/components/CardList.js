import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const CardList = ({ notes }) => {
  return (
    <div className="card-list">
      {notes.map((note, index) => (
        <div className="card-note-preview" key={index}>
          <Card style={{ width: '20rem' }} border="primary">
            <Card.Img variant="top" src="https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350" />
            <Card.Body>
              <Card.Title>NOTE {index + 1} DESCRIPTION GOES HERE</Card.Title>
              <Card.Text>
                Mod ID: {note.modId} <br />
                Prof Name: {note.profName}
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default CardList;
