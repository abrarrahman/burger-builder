import React, { Component,Suspense } from 'react';
import { BrowserRouter,Route,Redirect,Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actionCreators from './store/actions/index'
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout';
import Spinner from './components/UI/Spinner/Spinner'

const AsyncCheckout = React.lazy(()=>import('./containers/Checkout/Checkout'))
const AsyncOrders = React.lazy(()=>import('./containers/Orders/Orders'))
const AsyncAuth = React.lazy(()=>import('./containers/Auth/Auth'));

class App extends Component {
  componentDidMount(){
    this.props.onTryReconnect();
  }
  render(){
    let routes = null;
    if(this.props.isAuthenticated){
      routes =<Switch>
        <Route path='/build' component={BurgerBuilder}/>
        <Route path='/checkout' render={()=><Suspense fallback={<Spinner/>}><AsyncCheckout/></Suspense>} />
        <Route path='/orders' render={()=><Suspense fallback={<Spinner/>}><AsyncOrders/></Suspense>} />
        <Route path='/logout' component={Logout}/>
        <Redirect to='/build'/>
      </Switch>
    }else{
      routes = <Switch>
        <Route path='/auth' render={()=><Suspense fallback={<Spinner/>}><AsyncAuth/></Suspense>} />
        <Route path='/build' component={BurgerBuilder} />
        <Redirect from='/' to='/build' />
      </Switch>
    }
    return (
      <BrowserRouter>
        <Layout>
          {routes}
        </Layout>
      </BrowserRouter>
      
    );
  }
  
}
const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token!==null
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onTryReconnect: () => dispatch(actionCreators.tryAuthReconnnect())
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(App);
