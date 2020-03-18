import React from 'react';
import { BrowserRouter,Route,Redirect,Switch } from 'react-router-dom';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route path='/build' component={BurgerBuilder}/>
          <Route path='/checkout' component={Checkout}/>
          <Route path='/orders' component={Orders}/>
          <Redirect from='/' to='/build'/>
        </Switch>
      </Layout>
    </BrowserRouter>
    
  );
}

export default App;
