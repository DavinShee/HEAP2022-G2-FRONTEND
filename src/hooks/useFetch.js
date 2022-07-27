import axios from 'axios';
import { useState, useEffect } from 'react';

const useFetch = (queryURL) => {
  // Initialise states
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    // Define fetchData function
    const fetchData = async (url) => {
      setLoading(true);
      await axios
        .get(url, {
          signal: controller.signal
        })
        .then((response) => {
          setData(response.data);
          setLoading(false);
          setError(null);
        })
        .catch((err) => {
          if (err.name === 'CanceledError' || err.name === 'AbortError') {
            console.log('Fetch Canceled/Aborted');
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

export default useFetch;
