import { Container, Spinner } from 'react-bootstrap';
import { useSearchParams, useLocation } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { databaseURLs } from '../URLConstants';
import CardList2 from '../components/CardList2';
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
  const { data, loading, error } = useFetch(
    databaseURLs.search + location.search
  );
  console.log(data);

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
                <div className='search-results-text'>
                  {searchDetails} ({data.data.numberOfNotes})
                </div>
                <div className='pagination-bar'>
                <PaginationBar
                  activePage={pageNum}
                  pageSize={pageSize}
                  totalPosts={data.data.numberOfNotes}
                />
                </div>
              </div>
              <CardList2 notes={data.data.notes} />
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
