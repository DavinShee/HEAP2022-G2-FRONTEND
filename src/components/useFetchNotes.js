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
  baseURL = baseURL + query;

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async (url) => {
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

    fetchData(baseURL);

    return () => controller.abort();
  }, [baseURL]);

  return { data, loading, error };
};

export default useFetchNotes;
