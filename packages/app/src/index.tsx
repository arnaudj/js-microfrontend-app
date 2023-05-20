import React from 'react';
import ReactDOM from 'react-dom';
import { VERSION } from 'api';

const App = () => <h1>App version {VERSION}.</h1>;

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
