import React from 'react';
import { Router } from "@reach/router"
import SignupPage from './src/pages/signup'
import IndexPage from './src/pages/index';
import ShopPage from './src/pages/shop';
import OrderConfirmPage from './src/pages/orderConfirm';
import PrivateRoute from "./src/components/PrivateRoute";

import { NotificationProvider } from './src/context/AddItemNotificationProvider';

export const wrapRootElement = ({ element }) => (
  <NotificationProvider>
    <Router>
        <IndexPage path='/'></IndexPage>
        <SignupPage path='/signup'></SignupPage>
        <ShopPage path='/shop'></ShopPage>
        <PrivateRoute path="/product/sample" component={OrderConfirmPage} />
      </Router>
      </NotificationProvider>
);
