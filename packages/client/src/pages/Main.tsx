import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';

import Button from '@material-ui/core/Button';

import { getToken, clearToken } from '../token.storage';

const Main: FC = () => {
  const history = useHistory();

  const handleLogout = () => {
    clearToken();
    history.push('/login');
  };

  if (!getToken()) {
    history.push('/login');
  }

  return (
    <div>
      <h1>Hello Developer！</h1>
      <div>
        <Button onClick={handleLogout} variant="contained" color="secondary">
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Main;
