import React, { FC, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Axios from 'axios';

import Button from '@material-ui/core/Button';

import { getToken, clearToken } from '../token.storage';

const Main: FC = () => {
  const history = useHistory();
  const [profile, setProfile] = useState();

  const fetchProfile = async () => {
    try {
      const token = getToken();
      const res = await Axios({
        url: '/api/auth/profile',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProfile(res.data);
    } catch (err) {
      setProfile(undefined);
      clearToken();
      history.push('/login');
    }
  };

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
      <Button onClick={fetchProfile} variant="contained" color="primary">
        Fetch Profile
      </Button>
      <div>{profile ? JSON.stringify(profile, null, 2) : '{}'}</div>
      <div>
        <Button onClick={handleLogout} variant="contained" color="secondary">
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Main;
