import { useSearchParams } from 'react-router-dom';
import useFetchNotes from '../useFetchNotes';
import { databaseURLs } from '../../URLConstants';
import CardList from '../CardList';

function Buyer() {
  const [searchParams] = useSearchParams();
  const modId = searchParams.get('mod-id');
  const profId = searchParams.get('prof-id');

  const { data, loading, error } = useFetchNotes(
    databaseURLs.BUYER /* ngrok link */,
    modId /* modId */,
    profId /* profId */
  );

  return (
    <div className="search-results">
      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {data && !loading && !error && (
        <>
          {/* <h1>Search results ({data.length})</h1> */}
          <br />
          <br />
          <CardList notes={data} />
        </>
      )}
    </div>
  );
}

export default Buyer;
