import { useEffect, useState } from 'react';

function useGapi() {
  const [gapi, setGAPI] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function initGoogle() {
      try {
        await window.gapi.client.setApiKey(process.env.REACT_APP_API_KEY);

        window.gapi.client
          .load('https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest')
          .then(
            () => {
              setGAPI(window.gapi);
            },
            (e) => {
              console.log('Error', e.message);
              setError(e.message);
            }
          );
      } catch (e) {
        setError(true);
      }
    }

    window.gapi.load('client:auth2', initGoogle);
  }, []);

  return [gapi, error];
}

export { useGapi };
