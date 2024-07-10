import { useState } from 'react';
import axios from 'axios';

//Fetch data from the api

export function useRequest(url) {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  const doRequest = (params = [], headers = {}) => {
    setIsPending(true);
    const queryParams = params.join('&');
    axios.get(`https://apis.orbiapp.io/v1${url}?${queryParams}`, {
      headers: {
        'x-api-key': 'efe04a0c-77dd-4d8e-8ce2-3107b1e64c8d',
        ...headers
      }
    })
    .then(response => {
      setData(response.data);
      setIsPending(false);
    })
    .catch(err => {
      setError(err.message);
      setIsPending(false);
    });
  };

  return [data, isPending, error, doRequest];
}