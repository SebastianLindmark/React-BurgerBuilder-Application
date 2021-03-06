import React, { Component } from 'react';
import Layout from './components/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Checkout from './containers/Checkout/Checkout'
import Orders from './containers/Orders/Orders'
import Auth from './containers/Auth/Auth'
import Logout from './containers/Auth/Logout/Logout'
import { Route, withRouter, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from './store/actions/index'

const asyncAuth = React.lazy(() => import('./containers/Auth/Auth'));

class App extends Component {




  componentDidMount() {
    this.props.onTryAutoSignup();
  }


  render() {

    let routes = (
      <Switch>

        <Route path="/" exact component={BurgerBuilder} />
        
        <React.Suspense fallback={"<h2> Loading </h2"}>
          <Route path="/auth" component={asyncAuth} />
        </React.Suspense>

        <Redirect to="/" />
      </Switch>
    );


    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />
          <Route path="/logout" component={Logout} />

          <Route path="/" exact component={BurgerBuilder} />
          
          <React.Suspense fallback={"<h2> Loading </h2>"}>
            <Route path="/auth" component={asyncAuth} />
          </React.Suspense>


          <Redirect to="/" />
        </Switch>
      )
    }

    return (
      <Layout>
        {routes}
      </Layout>
    );
  }
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
