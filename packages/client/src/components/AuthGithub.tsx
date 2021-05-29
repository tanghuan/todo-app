import React, { FC, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Axios from 'axios';
import { setToken, clearToken } from '../token.storage';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

const AuthGithub: FC = () => {
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();
  const { search } = location;

  useEffect(() => {
    const handleCodeAuth = async (query: string) => {
      try {
        const res = await Axios({
          url: `/api/auth/github${query}`,
          method: 'GET',
        });
        setToken(res.data?.access_token);
        history.push('/');
      } catch (err) {
        clearToken();
        history.push('/login');
      }
    };
    handleCodeAuth(search);
  }, [history, search]);
  return (
    <Container maxWidth="xs" className={classes.root}>
      <CircularProgress />
    </Container>
  );
};

export default AuthGithub;
