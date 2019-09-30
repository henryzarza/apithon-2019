import React from 'react';
import { Provider } from 'react-redux';

import store from '../redux/store';

import Routes from './components/Routes';
import '../scss/application.scss';

function App() {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
}

App.defaultProps = {
  loading: false
};

export default App;
