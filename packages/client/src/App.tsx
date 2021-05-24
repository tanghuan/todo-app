import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Greeting from './components/Greeting';
import Oauth from './Oauth';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/auth/github/callback" component={Oauth} />
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
