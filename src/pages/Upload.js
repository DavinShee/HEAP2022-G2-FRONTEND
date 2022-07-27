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
import LoadingModal from '../components/LoadingModal';
import AlertModal from '../components/AlertModal';

function Upload() {
  const id = useContext(UserContext);
  const [pdfFile, setPdfFile] = useState(null);
  const [loadingPage, setLoadingPage] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [sendHomePage, setSendHomePage] = useState('');
  const [uploadFormValues, setUploadFormValues] = useState({
    description: '',
    mod: '',
    prof: '',
    year: '2022'
  });
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  const requestHeader = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  };

  const [validated, setValidated] = useState(false);

  //On form submit, check if all inputs are filled. If so, sends data to backend while displaying loading screen. Displays success and fail messages upon return.
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }

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
      setLoadingPage(true);
      axios
        .post(databaseURLs.upload, uploadData, {
          headers: requestHeader
        })
        .then(() => {
          setLoadingPage(false);
          setSendHomePage(true);
          setShowAlert(true);
          setAlertMsg('Your notes has been posted!');
        })
        .catch((error) => {
          setLoadingPage(false);
          setShowAlert(true);
          setSendHomePage(false);
          setAlertMsg('Your upload has failed.');
        });
    }
  };

  //seperate onChange for pdf input for converting into DataURL format.
  const handleImgChange = (e) => {
    var selectedFile = e.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onloadend = (e) => {
      setPdfFile(e.target.result);
    };
  };

  //onChange for all other form inputs.
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
                placeholder="Description (400 Characters Max)"
                value={uploadFormValues.description}
                onChange={handleChange}
                isInvalid={uploadFormValues.description.length > 400}
              />
              <Form.Control.Feedback type="invalid">
                <h5>Type something...but don't type too much!</h5>
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
                        Please indicate your prof.
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
                      isInvalid={
                        uploadFormValues.year <= 2009 ||
                        2023 <= uploadFormValues.year
                      }
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
                      Please attach your PDF.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
            </div>
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
      <LoadingModal LoadingModal={loadingPage} />
      <AlertModal
        alertMsg={alertMsg}
        sendHomePage={sendHomePage}
        setShowAlert={setShowAlert}
        showAlert={showAlert}
      />
    </Container>
  );
}

export default Upload;
