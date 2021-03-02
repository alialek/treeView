/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";

const useFetch = (url, options) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    fetch(url, options)
      .then((res) => res.json())
      .then((data) => setResponse(data))
      .catch((err) => setError(err))
      .finally(() => setIsLoading(false));
  }, []);
  return { response, error, isLoading };
};

export default useFetch;
