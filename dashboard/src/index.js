import '@babel/polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from './data/store';
import App from './components/presentational/App';

window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

const renderApp = () => (
  render((
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  ), document.getElementById('app'))
);

renderApp();
