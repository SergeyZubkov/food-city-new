import React, { Component } from 'react';

import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';

import Header from './commons/header/Header';
import Footer from './commons/footer/Footer';

import Main from './pages/main/Main';
import Menu from './pages/menu/Menu';
import Order from './pages/order/Order';
import OrderHandle from './pages/orderHandle/OrderHandle';
import Delivery from './pages/delivery/Delivery';
import ScrollToTop from './ScrollToTop';
import Contacts from './pages/contacts/Contacts';

import NoWork from './pages/noWork/NoWork';


class App extends Component {
  render() {
    return (
      <Router onUpdate={() => console.log('dfsdf')}>
          <ScrollToTop>
          <Header />
          <Switch>
          <Route exact path='/' component={Main} />
          <Route path='/menu' component={Menu} />
          <Route onUpdate={() => window.scrollTo(0, 0)} path='/order' component={Order} />
          <Route path='/orderHandle' component={OrderHandle} />
          <Route path='/delivery' component={Delivery} />
          <Route path='/contacts' component={Contacts} />

{/*          <Route exact path='/' component={NoWork} />*/}
          <Redirect to='/'/>
          </Switch>
          <Footer />
          </ScrollToTop>
      </Router>
    );
  }
}

export default App;
