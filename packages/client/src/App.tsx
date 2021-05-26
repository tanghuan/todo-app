import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import GithubAuth from './components/AuthGithub';
import Login from './pages/Login';
import Main from './pages/Main';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/auth/github" component={GithubAuth} />
        <Route path="/login" component={Login} />
        <Route path="/">
          <Main />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
