import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import useFetchNotes from '../useFetchNotes';
import { databaseURLs } from '../../URLConstants';
import CardList from '../CardList';

function Buyer() {
  const [searchParams, setSearchParams] = useSearchParams();
  const modId = searchParams.get('mod-id');
  const profId = searchParams.get('prof-id');

  const [notes, setNotes] = useState({});
  const { data, loading, error } = useFetchNotes(
    databaseURLs.BUYER /* ngrok link */,
    modId /* modId */,
    profId /* profId */
  );
  useEffect(() => {
    setNotes(data.notes);
    console.log(notes);
  }, [data]);

  return (
    <div className="search-results">
      {loading && <h1>Loading...</h1>}
      {error && <h1>{error}</h1>}
      {notes && !loading && !error && (
        <>
          <h1>Search results ({notes.length})</h1>
          <CardList notes={notes} />
        </>
      )}
    </div>
  );
}

export default Buyer;
