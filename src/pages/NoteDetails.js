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
import { useNavigate, useParams } from 'react-router-dom';
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

  let display = (
    <>
      {loading && (
        <>
          <Container>
            <Spinner animation="grow" variant="info" />
          </Container>
        </>
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
              <Col xs={4} className='d-flex flex-column'>
                <div className="note-details">
                  <div className="note-description">
                    <h3>Description</h3>
                    <p>{data.data.note.description}</p>
                  </div>
                  <div className="note-other-details">
                    <Row>
                      <Col>Module: </Col>
                      <Col>{data.data.note.modId}</Col>
                    </Row>
                    <Row>
                      <Col>Prof: </Col>
                      <Col>{data.data.note.profName}</Col>
                    </Row>
                    <Row>
                      <Col>Author: </Col>
                      <Col>{data.data.note.authorName}</Col>
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
    </>
  );

  return <>{display}</>;
}

export default NoteDetails;
