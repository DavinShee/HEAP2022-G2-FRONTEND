import { useState } from 'react';
import { useContext } from 'react';
import {
  Button,
  Col,
  Container,
  Row,
  Spinner,
  Stack,
  Tab,
  Tabs
} from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { databaseURLs } from '../../URLConstants';
import DocumentPreviewCarousel from '../DocumentPreviewCarousel';
import useFetchNotes from '../useFetchNotes';
import { UserContext } from '../UserContext';
import CardList from '../CardList';

function NoteDetails() {
  const { id } = useParams();
  const { data, loading, error } = useFetchNotes(
    databaseURLs.search + `/${id}`
  );
  const { user } = useContext(UserContext);
  const [key, setKey] = useState('related');

  let display = (
    <>
      {loading && (
        <>
          <Container>
            <Spinner animation="grow" variant="info" />
          </Container>
        </>
      )}
      {error && <div>{error}</div>}
      {data && data.data && data.data.note && !loading && !error && (
        <>
          <Container>
            <Row>
              <Col xs={4}>
                <Stack gap={2}>
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
                </Stack>
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
              <Tab eventKey="related" title="Related">
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
