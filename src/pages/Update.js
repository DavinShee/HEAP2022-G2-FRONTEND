import React, { useEffect } from 'react';
import {
  createSearchParams,
  useNavigate,
  useParams,
  Link
} from 'react-router-dom';
import { useContext, useState } from 'react';
import { Button, Col, Container, Row, Form, InputGroup } from 'react-bootstrap';
import useFetch from '../hooks/useFetch';
import { databaseURLs } from '../URLConstants';
import axios from 'axios';


function Update() {
  const { id } = useParams();
  const { data, loading, error } = useFetch(databaseURLs.search + `/${id}`);
  const [updateFormValues, setUpdateFormValues] = useState({
    description: '',
    mod: '',
    prof: '',
    year: '',
    image: ''
  });

  const [previewImage, setPreviewImage] = useState(
    'https://www.asiaoceania.org/aogs2021/img/no_uploaded.png'
  );

  useEffect(() => {
    if (JSON.stringify(data) !== '{}') {
      setUpdateFormValues({
        description: data.data.note.description,
        mod: data.data.note.modId,
        prof: data.data.note.profName,
        year: data.data.note.year,
        image: data.data.note.image  
      });
      setPreviewImage(data.data.note.image)
    }
  }, [data]);

  /*const [noteImage, setNoteImage] = useState();*/ 

  const [validated, setValidated] = useState(false);
  const requestHeader = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    event.preventDefault();
    setValidated(true);
    if (form.checkValidity() === true) {
      const updateData = {
        description: updateFormValues.description,
        image: previewImage,
        modId: updateFormValues.mod,
        profName: updateFormValues.prof,
        year: updateFormValues.year
      };


      console.log(databaseURLs.search + `/${id}`, JSON.stringify(updateData));
      axios.patch(databaseURLs.search + `/${id}`, JSON.stringify(updateData), {
        headers: requestHeader
      });
      event.preventDefault();
    }
  };

  const handleImgChange = (e) => {
    setUpdateFormValues((preValue) => {
      return {
        ...preValue,
        image: e.target.files[0]
      };
    });
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleChange = (e) => {
    let value = e.target.value;
    let name = e.target.name;
    setUpdateFormValues((preValue) => {
      return {
        ...preValue,
        [name]: value
      };
    });
  };

  const handleDelete = () => {
    axios.delete(databaseURLs.search+`/${id}`)
  }

  return (
    <Container>
      <Form
        className="upload-form"
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
      >
        <Row>
          <Col>
            <Form.Group
              className="upload-item-1"
              controlId="validationCustom01"
            >
              <Form.Label>
                <h3>Description:</h3>
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                required
                name="description"
                placeholder="Description"
                value={updateFormValues.description}
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                <h5>Type something here lah...</h5>
              </Form.Control.Feedback>
            </Form.Group>
            <br></br>
            <div className="upload-item-2">
              <Row>
                <Form.Label column lg={2}>
                  Mod:
                </Form.Label>
                <Col>
                  <Form.Group controlId="validationCustom02">
                    <Form.Control
                      required
                      type="text"
                      name="mod"
                      placeholder="IS111"
                      value={updateFormValues.mod}
                      onChange={handleChange}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please indicate the mod.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Form.Label column lg={2}>
                  Prof:
                </Form.Label>
                <Col>
                  <Form.Group controlId="validationCustomUsername">
                    <InputGroup hasValidation>
                      <Form.Control
                        required
                        type="text"
                        name="prof"
                        placeholder="Dr test example"
                        value={updateFormValues.prof}
                        onChange={handleChange}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please choose the prof.
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Form.Label column lg={2}>
                  Year:
                </Form.Label>
                <Col>
                  <Form.Group controlId="validationCustom03">
                    <Form.Control
                      required
                      type="number"
                      name="year"
                      placeholder="2010-2022"
                      value={updateFormValues.year}
                      onChange={handleChange}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid year.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Form.Label column lg={2}>
                  Image:
                </Form.Label>
                <Col>
                  <Form.Group controlId="validationCustom04">
                    <Form.Control
                      
                      accept="image*"
                      type="file"
                      name="notes-img"
                      onChange={handleImgChange}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please attach your notes.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
            </div>
            <br></br>
            <Row>
            <div className="upload-item-3">
              <Button variant className="upload-download-btn" type="submit">
                Update
              </Button>
              <Button variant className='upload-download-btn1' onClick={handleDelete}>
                Delete
              </Button>
            </div>
            </Row>
          </Col>
          <Col>
            <img className="previewimage" src={previewImage}></img>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

export default Update;
