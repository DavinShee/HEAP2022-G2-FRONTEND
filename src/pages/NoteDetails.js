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
import DocumentPreviewCarousel from '../components/DocumentPreviewCarousel';
import useFetch from '../hooks/useFetch';
import { UserContext } from '../components/UserContext';
import CardList from '../components/CardList';
import axios from 'axios';
import Comments from '../components/Comments';

function NoteDetails() {
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
                      <Col>{Object.values(ratings)}/5</Col>
                    </Row>
                  </div>
                </div>
                <div className="button-or-login mt-auto ms-auto">
                  {uploader ? (
                    <Button as={Link} to={`/update/${id}`}>
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
                <DocumentPreviewCarousel imageURLArray={['https://res.cloudinary.com/ducf3tqph/image/upload/v1658644026/biincub1hgwixchnpmgd.pdf']} />
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
