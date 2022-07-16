import { Container, Spinner } from 'react-bootstrap';
import { useSearchParams, useLocation } from 'react-router-dom';
import useFetchNotes from '../hooks/useFetchNotes';
import { databaseURLs } from '../URLConstants';
import CardList from '../components/CardList';
import PaginationBar from '../components/PaginationBar';

function Search() {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const searchParamObject = Object.fromEntries([...searchParams]);
  const query = [
    searchParamObject.modId,
    searchParamObject.profId,
    searchParamObject.authorName
  ];
  const pageNum = searchParams.get('page-num') || 1;
  const pageSize = searchParams.get('page-size') || 6;
  const { data, loading, error } = useFetchNotes(
    databaseURLs.search + location.search
  );

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
    <div className="search-results">
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
          {data && data.data && data.data.notes.length ? (
            <>
              <div className="search-header">
                <h1>
                  {searchDetails} ({data.data.numberOfNotes})
                </h1>
                <PaginationBar
                  activePage={pageNum}
                  pageSize={pageSize}
                  totalPosts={data.data.numberOfNotes}
                />
              </div>
              <CardList notes={data.data.notes} />
              <PaginationBar
                activePage={pageNum}
                pageSize={pageSize}
                totalPosts={data.data.numberOfNotes}
              />
            </>
          ) : (
            <>
              <h1>No results</h1>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default Search;
