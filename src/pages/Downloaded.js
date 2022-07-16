import { useContext } from 'react';
import { UserContext } from '../components/UserContext';
import useFetch from '../hooks/useFetch';
import { databaseURLs } from '../URLConstants';
import CardList from '../components/CardList';
import PaginationBar from '../components/PaginationBar';
import { useSearchParams } from 'react-router-dom';
import { Container, Spinner } from 'react-bootstrap';

const Downloaded = () => {
  const { user } = useContext(UserContext);
  const [searchParams] = useSearchParams();
  const pageNum = searchParams.get('page-num') || 1;
  const pageSize = searchParams.get('page-size') || 6;
  const { data, loading, error } = useFetch(
    databaseURLs.downloadHist + `/${user.email}?page-num=${pageNum}`
  );

  // data &&
  //   data.data &&
  //   data.data.downloadHistory &&
  //   console.log('data', data.data.downloadHistory);
  // // console.log('loading', loading);
  // // console.log('error', error);

  let notesArray = [];
  if (data && data.data && data.data.downloadHistory) {
    let objectsArr = data.data.downloadHistory;
    objectsArr.forEach((element) => {
      notesArray.push(element.note);
    });
  }

  return (
    <div className="downloaded-notes">
      {loading && (
        <div className="loading">
          <Container>
            <Spinner animation="grow" variant="info" />
          </Container>
        </div>
      )}
      {error && <div>{error}</div>}
      {data && !loading && !error && (
        <>
          {data && data.data && data.data.downloadHistory && (
            <>
              <div className="search-header">
                <h1>Downloaded Notes ({data.data.numberOfNotes})</h1>
                <PaginationBar
                  activePage={pageNum}
                  pageSize={pageSize}
                  totalPosts={data.data.numberOfNotes}
                />
              </div>
              <CardList notes={notesArray} />
              {/* <CardList notes={data.data.notes} /> */}
              <PaginationBar
                activePage={pageNum}
                pageSize={pageSize}
                totalPosts={data.data.numberOfNotes}
              />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Downloaded;
