/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, { Component } from 'react';
import {
  Image,
  Platform,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
} from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import { Modal, Scene, Router, Actions } from 'react-native-router-flux';
import { connectSC } from './actions/sc';
import { requireAuth } from './containers/AuthComponent';
import LoginView from './components/LoginView';
import SignUpView from './components/SignUpView';
import FeatureNav from './containers/FeatureNav';
import SCDrawer from './containers/SCDrawer';
import FormNavigator from './containers/FormNavigator';
import StoreNavigator from './containers/StoreNavigator';
import MapNavigator from './containers/MapNavigator';
import TestNavigator from './containers/TestNavigator';
import palette from './style/palette';
import reducer from './reducers';

const store = createStore(
  reducer,
  applyMiddleware(thunk, createLogger())
);

class SCMobile extends Component {
  constructor(props) {
    super(props);
    this.renderLeftButton = this.renderLeftButton.bind(this);
  }

  componentWillMount() {
    connectSC(store); //connect spatialconnect to the redux store
  }

  onLeft() {
    Actions.refresh({key: 'drawer', open: value => !value });
  }

  renderLeftButton() {
    console.log('renderLeftButton');
    return (
      <TouchableOpacity
        onPress={this.onLeft.bind(this)}>
        <Image source={require('./img/menu.png')}
       style={styles.icon} />
      </TouchableOpacity>
    );
  }

  render() {
    if (Platform.OS === 'ios') {
      StatusBar.setBarStyle('light-content', true);
    } else {
      StatusBar.setBackgroundColor(palette.lightblue, true);
    }
    return (
      <Provider store={store}>
        <Router
          navigationBarStyle={styles.navBar}
          titleStyle={styles.title}
          leftButtonIconStyle={styles.leftButtonIconStyle}
          duration={250}>
          <Scene key="modal" component={Modal}>
            <Scene key="root" hideNavBar hideTabBar>
              <Scene key="drawer" component={SCDrawer} open={false} initial={true}>
                <Scene key="main" tabs={true}>
                  <Scene key="formNav" title="Form List">
                    <Scene key="forms" title="Forms" component={requireAuth(FormNavigator)} renderLeftButton={this.renderLeftButton} />
                    <Scene key="form" title="" component={requireAuth(FormNavigator)} renderLeftButton={this.renderLeftButton}  />
                    <Scene key="formSubmitted" title="Form Submitted" component={requireAuth(FormNavigator)} renderLeftButton={this.renderLeftButton} />
                  </Scene>
                  <Scene key="storeNav" title="Store List">
                    <Scene key="stores" component={requireAuth(StoreNavigator)} title="Stores"  renderLeftButton={this.renderLeftButton}/>
                    <Scene key="store" component={requireAuth(StoreNavigator)} title="" renderLeftButton={this.renderLeftButton} />
                  </Scene>
                  <Scene key="mapNav" title="Store List">
                    <Scene key="map" component={requireAuth(MapNavigator)} title="Map" renderLeftButton={this.renderLeftButton} />
                    <Scene key="viewFeature" component={requireAuth(MapNavigator)} title="Feature" renderLeftButton={this.renderLeftButton}
                      rightTitle="Edit" rightButtonTextStyle={styles.buttonTextStyle}
                      onRight={ props => Actions.feature({feature: props.feature}) } />
                  </Scene>
                  <Scene key="testNav" title="Tests">
                    <Scene key="test" component={requireAuth(TestNavigator)} title="Tests" renderLeftButton={this.renderLeftButton} />
                  </Scene>
                  <Scene key="login" component={LoginView} title="Login" renderLeftButton={this.renderLeftButton} />
                  <Scene key="signUp" component={SignUpView} title="Sign Up" renderLeftButton={this.renderLeftButton} />
                </Scene>
              </Scene>
              <Scene key="feature" direction="vertical" duration={100}>
                <Scene component={requireAuth(FeatureNav)} title="Edit Feature"
                  key="editFeature"
                  leftButtonTextStyle={styles.buttonTextStyle}
                  leftTitle="Cancel"
                  onLeft={() => Actions.pop() } />
              </Scene>
            </Scene>
          </Scene>
        </Router>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  navBar: {
    backgroundColor: palette.lightblue,
    height: (Platform.OS === 'ios') ? 64 : 44,
  },
  title: {
    color: 'white',
    fontSize: 20,
    marginTop: (Platform.OS === 'ios') ? 12 : 0,
  },
  leftButtonStyle: {

  },
  buttonTextStyle: {
    color: 'white',
  },
  icon: {
    height: 20,
    width: 20,
    tintColor: 'white',
    marginTop: (Platform.OS === 'ios') ? 32 : 12,
    marginLeft: 10,
  },
  leftButtonIconStyle: {
    tintColor: 'white',
    marginTop: (Platform.OS === 'ios') ? 0 : -6,
  }
});

export default SCMobile;
