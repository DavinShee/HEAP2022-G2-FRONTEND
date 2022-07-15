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
import { createSearchParams, useNavigate, useParams } from 'react-router-dom';
import { databaseURLs } from '../URLConstants';
import DocumentPreviewCarousel from '../components/DocumentPreviewCarousel';
import useFetchNotes from '../hooks/useFetchNotes';
import { UserContext } from '../components/UserContext';
import CardList from '../components/CardList';

function NoteDetails() {
  const { id } = useParams();
  const { data, loading, error } = useFetchNotes(
    databaseURLs.search + `/${id}`
  );
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

  // const handleSubmitSearch = (e) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   handleCloseSearch();
  //   navigate({
  //     pathname: '/search',
  //     search: `?${createSearchParams({
  //       'mod-id': modId,
  //       'prof-name': profName,
  //       'author-name': authorName
  //     })}`
  //   });
  //   setModId('');
  //   setProfName('');
  //   setAuthorName('');
  // };

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
                                'author-name': data.data.note.authorName
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
                  </div>
                </div>
                <div className="button-or-login mt-auto ms-auto">
                  {user ? (
                    <Button>Download</Button>
                  ) : (
                    <p>Please login to view/download</p>
                  )}
                </div>
              </Col>
              <Col>
                <DocumentPreviewCarousel imageURLArray={data.data.note.image} />
              </Col>
            </Row>
          </Container>
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
                COMMENTS COME HERE
              </Tab>
            </Tabs>
          </Container>
        </>
      )}
    </div>
  );
}

export default NoteDetails;
