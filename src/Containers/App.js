import React, { Component } from 'react';
import Layout from '../Components/Layout/Layout';
import PizzaBuilder from './PizzaBuilder/PizzaBuilder';
import Checkout from './Checkout/Checkout';
import{Route,Switch} from 'react-router-dom';
import Orders from './Orders/Orders';

class App extends Component {
  render() {
    return(
      <div>
        <Layout>
          <Switch>
            <Route path="/Orders"  component={Orders}/>
            <Route path="/Checkout"  component={Checkout}/>
            <Route path="/" exact  component={PizzaBuilder}/>
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
