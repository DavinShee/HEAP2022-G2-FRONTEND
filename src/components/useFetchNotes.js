import axios from 'axios';
import { useState, useEffect } from 'react';

const useFetchNotes = (baseURL, modId, profId) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  let query = [];
  if (modId.trim() !== '') {
    query.push(`mod-id=${modId}`);
  }
  if (profId.trim() !== '') {
    query.push(`prof-name=${profId}`);
  }
  query = query.join('&');
  if (query !== '') {
    query = '?' + query;
  }
  const queryURL = baseURL + query;

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async (url) => {
      setLoading(true);
      await axios
        .get(url, {
          signal: controller.signal
        })
        .then((response) => {
          setData(response.data.data.notes);
          setLoading(false);
          setError(null);
        })
        .catch((err) => {
          if (err.name === 'CanceledError' || err.name === 'AbortError') {
            console.log('Canceled/Aborted');
          } else {
            // auto catches network / connection error
            setError(err.message);
            setLoading(false);
          }
        });
    };

    fetchData(queryURL);

    return () => controller.abort();
  }, [queryURL]);

  return { data, loading, error };
};

export default useFetchNotes;
