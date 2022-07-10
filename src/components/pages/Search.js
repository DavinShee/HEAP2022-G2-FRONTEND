import { useEffect } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import useFetchNotes from '../useFetchNotes';
import { databaseURLs } from '../../URLConstants';
import CardList from '../CardList';

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
  let notes = data;
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    notes = data;
  }, [data]);

  return (
    <div className="search-results">
      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {data && !loading && !error && (
        <>
          {notes.data.notes.length ? (
            <>
              <h1>
                {searchDetails} ({notes.data.notes.length})
              </h1>
              <CardList notes={notes.data.notes} />
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
