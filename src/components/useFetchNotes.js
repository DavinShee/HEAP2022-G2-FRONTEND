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
    const source = axios.CancelToken.source();

    const fetchData = async (url) => {
      await axios
        .get(url, {
          cancelToken: source.token
        })
        .then((response) => {
          setData(response.data.data);
          setLoading(false);
          setError(null);
        })
        .catch((err) => {
          if (err.name === 'AbortError') {
            console.log('fetch aborted');
          } else {
            // auto catches network / connection error
            setLoading(false);
            setError(err.message);
          }
        });
    };

    fetchData(baseURL);

    return () => {
      source.cancel();
    };
  }, [baseURL]);

  return { data, loading, error };
};

export default useFetchNotes;
