import { useEffect, useState } from 'react';
import React from 'react';
import axios from 'axios';
import { Card } from 'react-bootstrap';

function PostList2() {
  const [modId, setModId] = useState('');
  const [profName, setProfName] = useState('');
  const [dataNotes, setDataNotes] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    let response = await axios.get(
      'https://34ec-2406-3003-206f-4ac0-d964-8197-7036-9d9.ap.ngrok.io /routes/buyer?mod-id=' +
        modId +
        '&prof-name=' +
        profName
    );
    const data = response.data.data.notes;
    setDataNotes(data);
    //console.log(data[0].modId);
    //console.log(modId);
    //console.log(profName);
    //console.log(response)
  };

  const renderCard = (notes, index) => {
    return (
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src="" />
        <Card.Body>
          <Card.Title>{notes.modId}</Card.Title>
          <Card.Text>
            <ul>
              <li>{notes.profName}</li>
              <li>{notes.authorName}</li>
            </ul>
          </Card.Text>
        </Card.Body>
      </Card>
    );
  };

  return (
    <div className="test">
      Attempt
      <form onSubmit={handleSubmit}>
        <label>
          Mod:
          <input
            type="text"
            name="mod_id"
            value={modId}
            onChange={(event) => setModId(event.target.value)}
          />
        </label>
        <label>
          Prof:
          <input
            type="text"
            name="prof_name"
            value={profName}
            onChange={(event) => setProfName(event.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
      <div className="results">{dataNotes.map(renderCard)}</div>
    </div>
  );
}

export default PostList2;
