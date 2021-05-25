import React, { FC } from 'react';
import { useLocation } from 'react-router-dom';

const AuthGithub: FC = () => {
  const location = useLocation();
  console.log('pathname:', location.pathname);
  console.log('search:', location.search);
  console.log('state:', location.state);
  window.location.href = `/api${location.pathname}${location.search}`;
  return <div>login...</div>;
};

export default AuthGithub;
