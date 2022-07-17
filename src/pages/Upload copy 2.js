import { useState } from 'react';
import {
  Alert,
  Button,
  FloatingLabel,
  Form,
  Modal,
  Row,
  Col,
  InputGroup
} from 'react-bootstrap';
import axios from 'axios';
import { databaseURLs } from '../URLConstants';
import { upload } from '@testing-library/user-event/dist/upload';
import { useContext } from 'react';
import { UserContext } from '../components/UserContext';

function Upload() {
  const id = useContext(UserContext);
  const [uploadFormValues, setUploadFormValues] = useState({
    description: '',
    mod: '',
    prof: '',
    year: '',
    image: ''
  });

  const requestHeader = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  };

  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    event.preventDefault();
    setValidated(true);
    if (form.checkValidity() === true) {
      const uploadData = {
        authorName: id.user.fullname,
        comments: [],
        description: uploadFormValues.description,
        email: id.user.email,
        image: uploadFormValues.image[0],
        modId: uploadFormValues.mod,
        price: '5',
        profName: uploadFormValues.prof,
        year: uploadFormValues.year
      };

      console.log(databaseURLs.upload + JSON.stringify(uploadData));
      axios.post(databaseURLs.upload, JSON.stringify(uploadData), {
        headers: requestHeader
      });
      event.preventDefault();
    }
  };

  const handleImgChange = (e) => {
    setUploadFormValues((preValue) => {
      return {
        ...preValue,
        image: e.target.files
      };
    });
  };

  const handleChange = (e) => {
    let value = e.target.value;
    let name = e.target.name;
    console.log(uploadFormValues.image[0]);
    setUploadFormValues((preValue) => {
      return {
        ...preValue,
        [name]: value
      };
    });
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>Description:</Form.Label>
          <Form.Control
            required
            type="text"
            name="description"
            placeholder="Description"
            value={uploadFormValues.description}
            onChange={handleChange}
          />
          <Form.Control.Feedback type="invalid">
            Type something here lah...
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>Mod:</Form.Label>
          <Form.Control
            required
            type="text"
            name="mod"
            placeholder="IS111"
            value={uploadFormValues.mod}
            onChange={handleChange}
          />
          <Form.Control.Feedback type="invalid">
            Please indicate the mod.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustomUsername">
          <Form.Label>Prof:</Form.Label>
          <InputGroup hasValidation>
            <Form.Control
              required
              type="text"
              name="prof"
              placeholder="Dr test example"
              value={uploadFormValues.prof}
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              Please choose the prof.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId="validationCustom03">
          <Form.Label>Year:</Form.Label>
          <Form.Control
            required
            type="number"
            name="year"
            placeholder="2010-2022"
            value={uploadFormValues.year}
            onChange={handleChange}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid year.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="3" controlId="validationCustom04">
          <Form.Label>Img:</Form.Label>
          <Form.Control
            required
            type="file"
            name="notes-img"
            onChange={handleImgChange}
          />
          <Form.Control.Feedback type="invalid">
            Please attach your notes.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Button type="submit">Upload</Button>
    </Form>
  );
}

export default Upload;
