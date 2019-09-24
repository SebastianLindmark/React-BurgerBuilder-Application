import React, { useEffect } from 'react';
import Layout from './components/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
//import Checkout from './containers/Checkout/Checkout'
//import Orders from './containers/Orders/Orders'
//import Auth from './containers/Auth/Auth'
import Logout from './containers/Auth/Logout/Logout'
import { Route, withRouter, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from './store/actions/index'

const Auth = React.lazy(() => import('./containers/Auth/Auth'));
const Orders = React.lazy(() => import('./containers/Orders/Orders'));
const Checkout = React.lazy(() => import('./containers/Checkout/Checkout'));




const app = (props) => {

  const {onTryAutoSignup} = props;

  useEffect(() => {
    onTryAutoSignup();
  }, [onTryAutoSignup])


  let routes = (
    <Switch>

      <Route path="/" exact component={BurgerBuilder} />
      <Route path="/auth" render={(props) => <Auth {...props} />} />
      <Redirect to="/" />
    </Switch >
  );


  if (props.isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/checkout" render={(props) => <Checkout {...props}/>} />
        <Route path="/orders" render={(props) => <Orders {...props}/>} />
        <Route path="/logout" component={Logout} />
        <Route path="/" exact component={BurgerBuilder} />
        <Route path="/auth" render={(props) => <Auth {...props}/>} />
        <Redirect to="/" />
      </Switch>
    )
  }

  return (
    <Layout>
      <React.Suspense fallback={<p> Loading... </p>}>
        {routes}
      </React.Suspense>
    </Layout>
  );
}


const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(app));
