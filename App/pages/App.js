import { createStore, applyMiddleware, combineReducers } from 'redux';
import {
  reduxifyNavigator,
  createReactNavigationReduxMiddleware,
  createNavigationReducer,
} from 'react-navigation-redux-helpers';
import { Provider, connect } from 'react-redux';
import React, { Component } from 'react';


import AppNavigator from '../navigations/AppNavigator';
import reducers from '../redux/reducers';

const navReducer = createNavigationReducer(AppNavigator);
const appReducer = combineReducers({
  nav: navReducer,
  reducers,
});

const middleware = createReactNavigationReduxMiddleware('root', state => state.nav);

const ReduxNavigator = reduxifyNavigator(AppNavigator, 'root');
const mapStateToProps = state => ({
  state: state.nav,
});
const AppWithNavigationState = connect(mapStateToProps)(ReduxNavigator);

const store = createStore(appReducer, applyMiddleware(middleware));
export default class App extends Component {
 

  render() {
    return (
      <Provider store={store}>
        <AppWithNavigationState />
      </Provider>
    );
  }
}
