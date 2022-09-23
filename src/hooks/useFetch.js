import { useEffect, useState } from 'react';

function useFetch(url) {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      try {
        setIsPending(true);
        const res = await fetch(url, { signal: controller.signal });
        if (!res.ok) {
          throw Error(res.statusText);
        }
        const data = await res.json();
        setData(data);
        setIsPending(false);
        setError(null);
      } catch (error) {
        if (error.name === 'AbortError') {
          console.log('fetch data aborted');
        }
        setError('Could not fetch data');
        setIsPending(false);
      }
    };
    fetchData();
    return () => controller.abort();
  }, [url]);

  return { data, isPending, error };
}

export default useFetch;
