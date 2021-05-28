import React, { FC, useState, useEffect } from 'react';
import Axios from 'axios';

import CircularProgress from '@material-ui/core/CircularProgress';
import { useLocation, useHistory } from 'react-router-dom';
import { setToken, clearToken } from '../token.storage';

const AuthGoogle: FC = () => {
  const location = useLocation();
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const { search } = location;

  useEffect(() => {
    const handleCodeAuth = async (query: string) => {
      try {
        setLoading(true);
        const res = await Axios({
          url: `/api/auth/google${query}`,
          method: 'GET',
        });
        setLoading(false);
        setToken(res.data?.access_token);
        history.push('/');
      } catch (err) {
        setLoading(false);
        clearToken();
        history.push('/login');
      }
    };
    handleCodeAuth(search);
  }, [history, search]);
  return <div>{loading && <CircularProgress />}</div>;
};

export default AuthGoogle;
