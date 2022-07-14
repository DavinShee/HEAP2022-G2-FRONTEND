import { useEffect } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import useFetchNotes from '../hooks/useFetchNotes';
import { databaseURLs } from '../URLConstants';
import CardList from '../components/CardList';

function Search() {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const modId = searchParams.get('mod-id');
  const profId = searchParams.get('prof-name');
  const authorName = searchParams.get('author-name');
  const query = [modId, profId, authorName];

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

  let queryURL = databaseURLs.search + location.search;
  const { data, loading, error } = useFetchNotes(queryURL);
  useEffect(() => {
    data && data.data && data.data.notes && console.log(data);
  }, [data]);

  return (
    <div className="search-results">
      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {data && !loading && !error && (
        <>
          {data && data.data && data.data.notes.length ? (
            <>
              <h1>
                {searchDetails} ({data.data.numberOfNotes})
              </h1>
              <CardList notes={data.data.notes} />
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
