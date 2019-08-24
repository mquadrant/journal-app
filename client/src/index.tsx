import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import store from './store/store'
import { Provider } from 'react-redux';

import setAuthorizationToken from './utils/setAuthorizationToken';
import { setCurrentUser } from './containers/Login/redux/actions';

import 'semantic-ui-css/semantic.min.css';

if (localStorage.journToken) {
    setAuthorizationToken(localStorage.journToken);
    store.dispatch(setCurrentUser(localStorage.journToken));
  }

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
