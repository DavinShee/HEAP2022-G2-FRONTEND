import { useState } from 'react';
import { Button, Form, Row, Col, InputGroup, Container } from 'react-bootstrap';
import axios from 'axios';
import { databaseURLs } from '../URLConstants';
import { useContext } from 'react';
import { UserContext } from '../components/UserContext';
var lineconverter = require('arraybuffer-to-string');
//const cloudinary = require('cloudinary').v2;
//preview image ==> url.createobjecturl
//noteimage ==> readAsDataURL
//cloudinary.config({
//  cloud_name: 'ducf3tqph',
//  api_key: '123521522689914',
//  api_secret: 'LeALjMRK1sgUXPiStB7v84oILe0',
//  secure: true
//});

function Upload() {
  const reader = new FileReader();

  const id = useContext(UserContext);
  const [previewImage, setPreviewImage] = useState(
    'https://www.asiaoceania.org/aogs2021/img/no_uploaded.png'
  );
  const [noteImage, setNoteImage] = useState();
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
        image: noteImage,
        modId: uploadFormValues.mod,
        price: '5',
        profName: uploadFormValues.prof,
        year: uploadFormValues.year
      };


      console.log(databaseURLs.upload, uploadData);
      axios
        .post(databaseURLs.upload, uploadData, {
          headers: requestHeader
        })
        .then((response) => console.log(response));

      event.preventDefault();
    }
  };

  const handleImgChange = (e) => {
    setUploadFormValues((preValue) => {
      return {
        ...preValue,
        image: e.target.files[0]
      };
    });
    //setPreviewImage(URL.createObjectURL(e.target.files[0]));

    var file = e.target.files[0];
    var reader = new FileReader();
    reader.onload = function () {
      setNoteImage(reader.result);
      var blob = URL.dataURLtoBlob(reader.result);
      console.log(
        blob,
        new File([blob], 'image.png', {
          type: 'image/png'
        })
      );
    };
    reader.readAsDataURL(file);
  };

  const handleChange = (e) => {
    let value = e.target.value;
    let name = e.target.name;
    //setPreviewImage(lineconverter(noteImage));
    //console.log("This is preview image",previewImage)
    console.log(noteImage);

    setUploadFormValues((preValue) => {
      return {
        ...preValue,
        [name]: value
      };
    });
  };

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
                value={uploadFormValues.description}
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
                      value={uploadFormValues.mod}
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
                        value={uploadFormValues.prof}
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
                      value={uploadFormValues.year}
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
                      required
                      accept="application/pdf"
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
            <div className="upload-item-3">
              <Button variant className="upload-download-btn" type="submit">
                Upload
              </Button>
            </div>
          </Col>
          <Col>
            <img
              className="previewimage"
              src={previewImage}
              alt="previewImage"
            ></img>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

export default Upload;
