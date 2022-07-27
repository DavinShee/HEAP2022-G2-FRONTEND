import { useContext, useEffect, useState } from 'react';
import {
  Button,
  Col,
  Container,
  Row,
  Spinner,
  Tab,
  Tabs
} from 'react-bootstrap';
import {
  createSearchParams,
  useNavigate,
  useParams,
  Link
} from 'react-router-dom';
import { databaseURLs } from '../URLConstants';
import useFetch from '../hooks/useFetch';
import { UserContext } from '../components/UserContext';
import CardList from '../components/CardList';
import axios from 'axios';
import Comments from '../components/Comments';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { saveAs } from 'file-saver';
import { Rating } from 'react-simple-star-rating';

function NoteDetails() {
  // Get note ID
  const { id } = useParams();
  // Fetch note based on ID
  const { data, loading, error } = useFetch(databaseURLs.search + `/${id}`);
  // Gets the user from Context
  const { user } = useContext(UserContext);
  // Defaults the tab to "Related", among "Related" and "Review"
  const [key, setKey] = useState('related');

  const [noRelated, setNoRelated] = useState(false);
  const navigate = useNavigate();

  // If there are no related notes, block the tab, and default to "Reviews"
  useEffect(() => {
    if (data && data.data && data.data.relatedNotes.length === 0) {
      setKey('comments');
      setNoRelated(true);
    }
  }, [data]);

  // Checks if user viewing the note is the uploader, assigns a boolean value
  let uploader = false;
  if (user && user.email && data && data.data && data.data.note) {
    uploader = user.email === data.data.note.email;
  }

  // When download button is clicked, downloads the file to the user's computer
  const handleDownload = () => {
    const requestHeader = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    };
    saveAs(
      data.data.note.url,
      `${data.data.note.modId}-${data.data.note.authorName}.pdf`
    );
    // Sends the current node that the user has downloaded to backend
    axios
      .post(
        databaseURLs.downloadHist,
        JSON.stringify({
          email: user.email,
          noteId: data.data.note._id
        }),
        { headers: requestHeader }
      )
      .then((_postResponse) => {
        // console.log(_postResponse);
      })
      .catch((_postError) => {
        // console.log(_postError);
      });

    // increases download count
    axios
      .patch(
        databaseURLs.search + `/${id}`,
        JSON.stringify({
          increaseDownload: true
        }),
        { headers: requestHeader }
      )
      .then((_postResponse) => {
        // console.log(_postResponse);
      })
      .catch((_postError) => {
        // console.log(_postError);
      });
  };

  // Changes what is shown to the user depending on the user's status -> Either uploader/logged-in user/logged-out user
  let downloadButton = <p>Please login to view/download</p>;
  if (uploader) {
    downloadButton = (
      <Button variant className="edit-btn" as={Link} to={`/update/${id}`}>
        Edit
      </Button>
    );
  } else if (user) {
    downloadButton = (
      <Button variant className="download-btn" onClick={handleDownload}>
        Download
      </Button>
    );
  }

  return (
    <div className="note-details">
      {/* To be displayed while loading */}
      {loading && (
        <div className="loading">
          <Container>
            <Spinner animation="grow" variant="info" />
          </Container>
        </div>
      )}
      {/* To be displayed when an error has occurred fetching data */}
      {error && (
        <>
          <div>
            Oops... An error has occurred. Click{' '}
            <button className="link-button" onClick={() => navigate(-1)}>
              Here
            </button>{' '}
            to go back.
          </div>
        </>
      )}
      {/* Display once data has been fetched */}
      {data && data.data && data.data.note && !loading && !error && (
        <>
          <Container>
            <Row>
              <Col xs={4} className="d-flex flex-column">
                <div className="note-details">
                  <Row style={{ marginBottom: '2rem' }}>
                    <Col
                      style={{ textAlign: 'center', verticalAlign: 'center' }}
                    >
                      {!data.data.note.rating ? (
                        <h2>No ratings yet!</h2>
                      ) : (
                        <div
                          className="ratings"
                          // style={{ textAlign: 'center' }}
                        >
                          <h2>{data.data.note.rating.toFixed(1)} out of 5</h2>
                          <Rating
                            initialValue={data.data.note.rating}
                            allowHalfIcon={true}
                            readonly
                            size={'25px'}
                          />
                        </div>
                      )}
                    </Col>
                    <Col style={{ textAlign: 'center' }}>
                      <h2>
                        <img
                          src="https://cdn-icons-png.flaticon.com/512/8083/8083574.png"
                          alt="downloads"
                          height="45px"
                        />{' '}
                        &nbsp;
                        {data.data.note.download}
                      </h2>
                    </Col>
                  </Row>
                  <Row>
                    <div className="note-description">
                      <p style={{ wordBreak: 'break-words' }}>
                        {data.data.note.description}
                      </p>
                    </div>
                  </Row>
                  <div className="note-other-details">
                    <Row>
                      <Col>Module: </Col>
                      <Col>
                        <button
                          type="button"
                          className="link-button"
                          onClick={() => {
                            navigate({
                              pathname: '/search',
                              search: `?${createSearchParams({
                                'mod-id': data.data.note.modId
                              })}`
                            });
                          }}
                        >
                          {data.data.note.modId}
                        </button>
                      </Col>
                    </Row>
                    <Row>
                      <Col>Prof: </Col>
                      <Col>
                        <button
                          type="button"
                          className="link-button"
                          onClick={() => {
                            navigate({
                              pathname: '/search',
                              search: `?${createSearchParams({
                                'prof-name': data.data.note.profName
                              })}`
                            });
                          }}
                        >
                          {data.data.note.profName}
                        </button>
                      </Col>
                    </Row>
                    <Row>
                      <Col>Author: </Col>
                      <Col>
                        <button
                          type="button"
                          className="link-button"
                          onClick={() => {
                            navigate({
                              pathname: '/search',
                              search: `?${createSearchParams({
                                email: data.data.note.email
                              })}`
                            });
                          }}
                        >
                          {data.data.note.authorName}
                        </button>
                      </Col>
                    </Row>
                    <Row>
                      <Col>Year: </Col>
                      <Col>{data.data.note.year}</Col>
                    </Row>
                    <br />
                  </div>
                </div>
                <div className="button-or-login mt-auto ms-auto">
                  {downloadButton}
                </div>
              </Col>
              <Col>
                <Row>
                  <div className="pdfText-noteDetail">
                    <h5>PDF Preview</h5>
                  </div>
                  <div
                    className="viewer2"
                    style={{
                      border: '1px solid rgba(0, 0, 0, 0.3)',
                      height: '750px'
                    }}
                  >
                    <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.14.305/build/pdf.worker.min.js">
                      <Viewer
                        fileUrl={data.data.note.image}
                        plugins={[]}
                      ></Viewer>
                    </Worker>
                  </div>
                </Row>
              </Col>
            </Row>
          </Container>
          <br />
          <Container>
            <Tabs
              id="relatedNotes-comments"
              activeKey={key}
              onSelect={(k) => setKey(k)}
              className="mb-3"
            >
              <Tab eventKey="related" title="Related" disabled={noRelated}>
                <CardList notes={data.data.relatedNotes} />
              </Tab>
              <Tab eventKey="comments" title="Reviews">
                <Comments commentsArray={data.data.note.comments} user={user} />
              </Tab>
            </Tabs>
          </Container>
        </>
      )}
    </div>
  );
}

export default NoteDetails;
