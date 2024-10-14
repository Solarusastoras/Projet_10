import { useState } from 'react';

function useToken() {
  const [token, setToken] = useState(null);

  return [token, setToken];
}

export default useToken;