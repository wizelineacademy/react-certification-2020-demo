import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Video from '../../pages/Video';
import Home from '../../pages/Home';
import Favorites from '../../pages/Favorites';
import PrivateRoute from '../PrivateRoute';
import Layout from '../Layout';

function Router() {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <PrivateRoute component={Favorites} path="/favorites" exact />
          <PrivateRoute component={Video} path="/favorites/:id" exact />
          <Route component={Video} path="/:id" exact />
          <Route component={Home} path="/" />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}

export default Router;
