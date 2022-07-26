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
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { saveAs } from 'file-saver';
import { Rating } from 'react-simple-star-rating';
import downloadIcon from '../images/downloadIcon.png';

function NoteDetails() {
  //const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const { id } = useParams();
  const { data, loading, error } = useFetch(databaseURLs.search + `/${id}`);
  const { user } = useContext(UserContext);
  const [key, setKey] = useState('related');
  const [noRelated, setNoRelated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (data && data.data && data.data.relatedNotes.length === 0) {
      setKey('comments');
      setNoRelated(true);
    }
  }, [data]);

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
    saveAs(
      data.data.note.url,
      `${data.data.note.modId}-${data.data.note.authorName}.pdf`
    );
    axios
      .post(
        databaseURLs.downloadHist,
        JSON.stringify({
          email: user.email,
          noteId: data.data.note._id
        }),
        { headers: requestHeader }
      )
      .then((postResponse) => {
        console.log(postResponse);
      })
      .catch((postError) => {
        console.log(postError);
      });

    axios
      .patch(
        databaseURLs.search + `/${id}`,
        JSON.stringify({
          increaseDownload: true
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
  console.log(data);

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
                    <Col
                      style={{ textAlign: 'center', verticalAlign: 'center' }}
                    >
                      <h2>
                      <img
                        src="https://cdn-icons.flaticon.com/png/128/4007/premium/4007698.png?token=exp=1658850986~hmac=22caeed498c93f5e50504ab7f3b66e23"
                        alt="downloadIcon"
                        height="45px"
                      /> &nbsp;

                      {data.data.note.download}
                      </h2>
                    </Col>
                  </Row>
                  <Row>
                    <div className="note-description">
                      <p>{data.data.note.description}</p>
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
                    <Row>
                      <Col>Downloads:</Col>
                      <Col>{data.data.note.download}</Col>
                    </Row>
                    <br />
                    {/* <Row>
                      <Col>
                        {!data.data.note.rating ? (
                          <>No ratings yet!</>
                        ) : (
                          <div
                            className="ratings"
                            style={{ textAlign: 'center' }}
                          >
                            {data.data.note.rating.toFixed(1)} out of 5
                            <br />
                            <Rating
                              initialValue={data.data.note.rating}
                              allowHalfIcon={true}
                              readonly
                              size={'18px'}
                              fillColor={'black'}
                            />
                          </div>
                        )}
                      </Col>
                    </Row> */}
                  </div>
                </div>
                <div className="button-or-login mt-auto ms-auto">
                  {uploader ? (
                    <Button
                      variant
                      className="edit-btn"
                      as={Link}
                      to={`/update/${id}`}
                    >
                      Edit
                    </Button>
                  ) : user ? (
                    <Button
                      variant
                      className="download-btn"
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
                <Row>
                  <div className='pdfText-notesdetail'>
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
