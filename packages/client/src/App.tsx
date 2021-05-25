import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Greeting from './components/Greeting';
import GithubAuth from './components/AuthGithub';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/auth/github" component={GithubAuth} />
        <Route path="/">
          <div>
            Hello React!
            <Greeting />
            <a href="/api/auth/github">Github Login</a>
          </div>
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
