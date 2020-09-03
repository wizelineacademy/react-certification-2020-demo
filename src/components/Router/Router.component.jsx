import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Video from '../../pages/Video';
import Home from '../../pages/Home';
import Favorites from '../../pages/Favorites';
import Private from '../Private';
import Layout from '../Layout';

const Router = () => (
  <BrowserRouter>
    <Layout>
      <Switch>
        <Private component={Favorites} path="/favorites" exact />
        <Private component={Video} path="/favorites/:id" exact />
        <Route component={Video} path="/:id" exact />
        <Route component={Home} path="/" />
      </Switch>
    </Layout>
  </BrowserRouter>
);
export default Router;
