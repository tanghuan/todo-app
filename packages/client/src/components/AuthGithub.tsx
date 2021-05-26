import { decode } from 'querystring';
import React, { FC, useState, useEffect } from 'react';
import Axios, { AxiosResponse, AxiosError } from 'axios';

import CircularProgress from '@material-ui/core/CircularProgress';
import { useLocation, useHistory } from 'react-router-dom';
import { setToken, clearToken } from '../token.storage';

const AuthGithub: FC = () => {
  const location = useLocation();
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  // console.log('pathname:', location.pathname);
  // console.log('search:', location.search);
  // console.log('state:', location.state);
  // location.key
  // window.location.href = `/api${location.pathname}${location.search}`;

  const result = decode(location.search?.replace('?', '')).code as string;

  useEffect(() => {
    const handleCodeAuth = async (code: string) => {
      setLoading(true);
      const res = await Axios({
        url: '/api/auth/github',
        method: 'GET',
        params: {
          code,
        },
      });
      setLoading(false);
      console.log(res.data);
      if (res.status === 200) {
        setToken(res.data?.access_token);
        history.push('/');
        return;
      }

      clearToken();
      history.push('/login');
    };
    handleCodeAuth(result);
  }, [history, result]);
  return <div>{loading && <CircularProgress />}</div>;
};

export default AuthGithub;
