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
//import DocumentPreviewCarousel from '../components/DocumentPreviewCarousel';
import useFetch from '../hooks/useFetch';
import { UserContext } from '../components/UserContext';
import CardList from '../components/CardList';
import axios from 'axios';
import Comments from '../components/Comments';
import { Worker } from '@react-pdf-viewer/core';
import { Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { saveAs } from 'file-saver';

function NoteDetails() {
  //const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const { id } = useParams();
  const { data, loading, error } = useFetch(databaseURLs.search + `/${id}`);
  const ratingData = useFetch(databaseURLs.rating + `/${id}`);
  const { user } = useContext(UserContext);
  const [key, setKey] = useState('related');
  const [noRelated, setNoRelated] = useState(false);
  const navigate = useNavigate();
  const [ratings, setRatings] = useState(0);

  useEffect(() => {
    if (ratingData && ratingData.data && ratingData.data.data) {
      setRatings(ratingData.data.data);
    }

    if (data && data.data && data.data.relatedNotes.length === 0) {
      setKey('comments');
      setNoRelated(true);
    }
  }, [data, ratingData]);

  let uploader = false;
  if (user && user.email && data && data.data && data.data.note) {
    uploader = user.email === data.data.note.email;
  }

  const handleDownload = () => {
    const requestHeader = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    };
    saveAs(data.data.note.url, 'Notes.pdf');

    axios
      .post(
        databaseURLs.downloadHist,
        JSON.stringify({
          email: user.email,
          note: data.data.note
        }),
        { headers: requestHeader }
      )
      .then((postResponse) => {
        console.log(postResponse);
      })
      .catch((postError) => {
        console.log(postError);
      });
  };

  return (
    <div className="note-details">
      {loading && (
        <div className="loading">
          <Container>
            <Spinner animation="grow" variant="info" />
          </Container>
        </div>
      )}
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
      {data && data.data && data.data.note && !loading && !error && (
        <>
          <Container>
            <Row>
              <Col xs={4} className="d-flex flex-column">
                <div className="note-details">
                  <div className="note-description">
                    <h3>Description</h3>
                    <p>{data.data.note.description}</p>
                  </div>
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
                    <Row>
                      <Col>Ratings:</Col>
                      <Col>
                        {ratings.averageRating === 0 ? (
                          <p>No ratings yet!</p>
                        ) : (
                          <p>{Object.values(ratings)} / 5</p>
                        )}
                      </Col>
                    </Row>
                  </div>
                </div>
                <div className="button-or-login mt-auto ms-auto">
                  {uploader ? (
                    <Button
                      variant
                      className="upload-download-btn"
                      as={Link}
                      to={`/update/${id}`}
                    >
                      Edit
                    </Button>
                  ) : user ? (
                    <Button
                      variant
                      className="upload-download-btn"
                      onClick={handleDownload}
                    >
                      Download
                    </Button>
                  ) : (
                    <p>Please login to view/download</p>
                  )}
                </div>
              </Col>
              <Col>
                {/* <DocumentPreviewCarousel imageURLArray={data.data.note.url} />  */}
                <div
                  className="viewer"
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
              <Tab eventKey="comments" title="Comments">
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
