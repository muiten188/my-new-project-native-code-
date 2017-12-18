import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Provider } from 'react-redux';

import AuthenNavigation from '../routers/authen_navigation';
import RootNavigaion from '../routers/root_navigation';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loged: false
    }
  }

  render() {
    let {loginReducer} =this.props;
    if (!loginReducer || !loginReducer.Logged) {
      return (
        <AuthenNavigation />
      )
    }
    return (
      <RootNavigaion />
    );
  }

}
function mapStateToProps(state, props) {
  return {
      loginReducer: state.loginReducer,
  }
};

export default connect(mapStateToProps)(App);