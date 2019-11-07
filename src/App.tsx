import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import ReduxLogger from 'redux-logger';
import ReduxThunk from 'redux-thunk';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import './App.css';
import WrappingComponent from './Components/HigherOrderComponents/WrappingComponent';
import AppRoutingModule from './Routing';
import { LoginReducer } from './Reducers/Login';
import { AppWindow } from './Contracts';
import { SignUpReducer } from './Reducers/SignUp';

declare var window: AppWindow;

const middleWare: Array<any> = [ReduxThunk];
let composeEnhancers = compose;

if (process.env.REACT_APP_NODE_ENV === 'development') {
  middleWare.push(ReduxLogger);
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
  if (devToolsExtension && typeof devToolsExtension === 'function') {
    composeEnhancers = devToolsExtension || compose;
  }
}

const store = createStore(combineReducers({
  login: LoginReducer,
  signUp: SignUpReducer
}), composeEnhancers(applyMiddleware(...middleWare)));



class App extends React.Component {
  render() {
    return (
      <WrappingComponent>
        <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <BrowserRouter>
            <AppRoutingModule />
          </BrowserRouter>  
        </Provider>
        </ MuiThemeProvider>
      </WrappingComponent >
    );
  }
}

const theme = createMuiTheme({
  palette: {
      primary: { main: "#111000" },
      secondary: { main: '#999999' }
  },
});

export default App;
