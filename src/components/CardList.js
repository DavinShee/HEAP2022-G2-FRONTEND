import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const CardList = ({ notes }) => {
  return (
    <div className="card-list">
      {notes.map((note, index) => (
        <div className="note-preview" key={index}>
          <Card style={{ width: '18rem' }} border="primary">
            <Card.Img variant="top" src="https://via.placeholder.com/250x150" />
            <Card.Body>
              <Card.Title>NOTE {index + 1} DESCRIPTION GOES HERE</Card.Title>
              <Card.Text>
                <ul>
                  <li>Mod ID: {note.modId}</li>
                  <li>Prof Name: {note.profName}</li>
                </ul>
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
          <br />
        </div>
      ))}
    </div>
  );
};

export default CardList;
