import { useState, useEffect, useRef } from "react";

const useFetch = (url) => {
  const cache = useRef({});
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (cache.current[url]) {
      const data = cache.current[url];
      setResponse(data);
    } else {
      fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        mode: "no-cors",
      })
        .then((res) => res.json())
        .then((data) => {
          setResponse(data);
          cache.current[url] = data;
        })
        .catch((err) => setError(err))
        .finally(() => setIsLoading(false));
    }
  }, [url]);
  return { response, error, isLoading };
};

export default useFetch;
