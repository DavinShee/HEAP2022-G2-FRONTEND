import { useSearchParams } from 'react-router-dom';
import useFetchNotes from '../useFetchNotes';
import { databaseURLs } from '../../URLConstants';
import CardList from '../CardList';
import { useEffect } from 'react';

function Buyer() {
  const [searchParams] = useSearchParams();
  const modId = searchParams.get('mod-id');
  const profId = searchParams.get('prof-id');
  const authorName = searchParams.get('author-name');

  const { data, loading, error } = useFetchNotes(
    databaseURLs.BUYER,
    modId ? modId : null,
    profId ? modId : null,
    authorName ? authorName : null
  );

  return (
    <div className="search-results">
      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {data && !loading && !error && (
        <>
          {data.length ? (
            <>
              <h1>Search results ({data.length})</h1>
              <CardList notes={data} />
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

export default Buyer;
