import { useState } from 'react';
import { Button, Form, Row, Col, InputGroup, Container } from 'react-bootstrap';
import axios from 'axios';
import { databaseURLs } from '../URLConstants';
import { useContext } from 'react';
import { UserContext } from '../components/UserContext';
import { Worker } from '@react-pdf-viewer/core';
import { Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { useNavigate } from "react-router-dom";

function Upload() {
  const navigate=useNavigate();
  const id = useContext(UserContext);
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfError, setPdfError] = useState('');
  const [uploadFormValues, setUploadFormValues] = useState({
    description: '',
    mod: '',
    prof: '',
    year: ''
  });

  const defaultLayoutPluginInstance = defaultLayoutPlugin();

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
        image: pdfFile,
        modId: uploadFormValues.mod,
        price: '5',
        profName: uploadFormValues.prof,
        year: uploadFormValues.year
      };

      axios
        .post(databaseURLs.upload, uploadData, {
          headers: requestHeader
        })
        .then(() => {navigate('/')})          //possible loading? 
        .catch((error) => console.log(error)) //todo

      event.preventDefault();
    }
  };

  const handleImgChange = (e) => {
    const allowedFiles = ['application/pdf'];
    var selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && allowedFiles.includes(selectedFile.type)) {
        var reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = (e) => {
          setPdfError('');
          setPdfFile(e.target.result);
        };
      } else {
        setPdfError('Not a valid pdf: Please select only PDF');
      }
    } else {
      console.log('Please select a PDF');
    }
  };

  const handleChange = (e) => {
    let value = e.target.value;
    let name = e.target.name;
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
                  PDF:
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
          </Col>
          <Col>
            <Row>
              <h5>Preview PDF</h5>
              <div
                className="viewer"
                style={{
                  border: '1px solid rgba(0, 0, 0, 0.3)',
                  height: '750px'
                }}
              >
                {pdfFile && (
                  <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.14.305/build/pdf.worker.min.js">
                    <Viewer
                      fileUrl={pdfFile}
                      plugins={[defaultLayoutPluginInstance]}
                    ></Viewer>
                  </Worker>
                )}
                {!pdfFile && <>No File is selected yet</>}
              </div>
            </Row>
            <Row>
              <div className="upload-item-3">
                <Button variant className="upload-item-3-btn" type="submit">
                  Upload
                </Button>
              </div>
            </Row>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

export default Upload;
