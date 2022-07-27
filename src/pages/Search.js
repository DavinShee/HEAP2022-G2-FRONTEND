import { Col, Container, Row, Spinner } from 'react-bootstrap';
import { useSearchParams, useLocation, Link } from 'react-router-dom';
import { databaseURLs } from '../URLConstants';
import CardList from '../components/CardList';
import PaginationBar from '../components/PaginationBar';
import useFetch from '../hooks/useFetch';
import signInBackground from '../images/Search_bg.png';

function Search() {
  // Get the url of current
  const location = useLocation();
  // Get query variables
  const [searchParams] = useSearchParams();
  const searchParamObject = Object.fromEntries([...searchParams]);
  const query = [
    searchParamObject.modId,
    searchParamObject.profId,
    searchParamObject.authorName
  ];
  const pageNum = searchParams.get('page-num') || 1;
  const pageSize = searchParams.get('page-size') || 6;
  // Fetch the notes
  const { data, loading, error } = useFetch(
    databaseURLs.search + location.search
  );

  // Get query variables to display to the user. "Search results for (Mod/Author/Prof)"
  let details = [];
  query.forEach((item) => {
    if (item) {
      details.push(item);
    }
  });
  let searchDetails =
    details.length > 0
      ? 'Search results for ' + details.join(', ')
      : 'Search results';

  return (
    <div
      style={{
        backgroundImage: `url(${signInBackground})`,
        height: '100vh',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
      }}
    >
      <div className="search-results">
        <Container>
          {/* To be displayed while loading */}
          {loading && (
            <div className="loading">
              <Spinner animation="grow" variant="info" />
            </div>
          )}
          {/* To be displayed when an error has occurred fetching data */}
          {error && <div>{error}</div>}
          {/* Display once data has been fetched */}
          {data && !loading && !error && (
            <>
              {data && data.data && data.data.notes.length ? (
                // To be displayed when there are notes in the DB
                <>
                  <div className="search-header">
                    <div className="search-results-text">
                      {searchDetails} ({data.data.numberOfNotes})
                    </div>
                    <div className="pagination-bar">
                      <PaginationBar
                        activePage={pageNum}
                        pageSize={pageSize}
                        totalPosts={data.data.numberOfNotes}
                      />
                    </div>
                  </div>
                  <CardList notes={data.data.notes} />
                </>
              ) : (
                // To be displayed when there are NO notes in the DB
                <>
                  <h1>
                    <Row>
                      <Col xs={3}>
                        <img
                          src="https://cdn-icons-png.flaticon.com/512/7465/7465691.png"
                          alt="No Results!"
                          height={'100px'}
                        />
                      </Col>
                      <Col>
                        No results! <br />
                        Upload now by clicking{' '}
                        <Link
                          to="/account/upload"
                          style={{ textDecoration: 'none' }}
                        >
                          this
                        </Link>
                        !
                      </Col>
                    </Row>
                  </h1>
                </>
              )}
            </>
          )}
        </Container>
      </div>
    </div>
  );
}

export default Search;
