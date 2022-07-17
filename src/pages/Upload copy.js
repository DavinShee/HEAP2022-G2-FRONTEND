import { useState } from 'react';
import { Alert, Button, FloatingLabel, Form, Modal } from 'react-bootstrap';
import axios from 'axios';
import { databaseURLs } from '../URLConstants';
import { upload } from '@testing-library/user-event/dist/upload';

function Upload() {
  const handleUpload = (e) => {
    //forward to listings page?
    //submit info via axios
  };

  const [submitDisabled, setSubmitDisabled] = useState(true);

  const [uploadFormValues, setUploadFormValues] = useState({
    description: '',
    mod: '',
    prof: '',
    year: '',
    image: ''
  });

  const handleChange = (e) => {
    let value = e.target.value;
    let name = e.target.name;

    setUploadFormValues((preValue) => {
      return {
        ...preValue,
        [name]: value
      };
    });

    if (
      !uploadFormValues.description ||
      !uploadFormValues.mod ||
      !uploadFormValues.prof ||
      !uploadFormValues.year||
      !uploadFormValues.image
    ) {
      setSubmitDisabled(true);
    } else {
      setSubmitDisabled(false);
    }
  };

  return (
    <Form onSubmit={handleUpload}>
      <h1>Description</h1>
      <FloatingLabel label="I got a F for this module">
        <Form.Control
          type="text"
          placeholder="Description"
          onChange={handleChange}
          name="description"
        ></Form.Control>
      </FloatingLabel>
      <h1>Mod:</h1>
      <FloatingLabel label="IS111">
        <Form.Control
          type="text"
          placeholder="Mod"
          onChange={handleChange}
          name="mod"
        />
      </FloatingLabel>
      <h1>Prof:</h1>
      <FloatingLabel label="Dr example test">
        <Form.Control
          type="text"
          placeholder="Prof"
          onChange={handleChange}
          name="prof"
        />
      </FloatingLabel>
      <h1>Year:</h1>
      <FloatingLabel label="2022">
        <Form.Control
          type="number"
          placeholder="Year"
          onChange={handleChange}
          name="year"
        />
      </FloatingLabel>
      <Form.Control
        type="file"
        placeholder="notes-image"
        onChange={handleChange}
        name="image"
      />

      <Button
        className="temp-upload-btn"
        type="submit"
        disabled={submitDisabled}
      >
        Upload
      </Button>
    </Form>
  );
}

export default Upload;
