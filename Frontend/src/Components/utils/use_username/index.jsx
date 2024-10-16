import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const useUsername = () => {
  const { user } = useSelector((state) => state.auth);
  const [username, setUsername] = useState(user?.userName || '');

  useEffect(() => {
    if (user) {
      setUsername(user.userName);
    }
  }, [user]);

  return [username, setUsername];
};

export default useUsername;