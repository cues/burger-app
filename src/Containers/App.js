import React, { Component } from 'react';
import Layout from '../Components/Layout/Layout';
import PizzaBuilder from './PizzaBuilder/PizzaBuilder';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <PizzaBuilder/>
        </Layout>
      </div>
    );
  }
}

export default App;
