import React from 'react';
import ReactDOM from 'react-dom';
import Component from './Component';

/**
 * A dummy entry point, for standalone display
 */
const App = () => {
  return (
    <>
      <Component message="Index" />
    </>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
