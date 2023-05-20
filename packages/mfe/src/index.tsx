import React from 'react';
import { createRoot } from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import Component from './Component';
const container = document.getElementById('root');
const root = createRoot(container!);

/**
 * A dummy entry point, for standalone display
 */
const App = () => {
  return (
    <>
      <RecoilRoot>
        <Component message="Index" />
      </RecoilRoot>
    </>
  );
};

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
