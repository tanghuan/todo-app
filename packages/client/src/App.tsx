import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import AuthGithub from './components/AuthGithub';
import AuthGoogle from './components/AuthGoogle';
import Login from './pages/Login';
import Main from './pages/Main';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/auth/github" component={AuthGithub} />
        <Route path="/auth/google" component={AuthGoogle} />
        <Route path="/login" component={Login} />
        <Route path="/">
          <Main />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
