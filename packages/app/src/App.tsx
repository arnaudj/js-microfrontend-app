import React from 'react';
import { VERSION } from 'api';

const RemoteComponent = React.lazy(() => import('mfe/Component'));

const App = () => {
  return (
    <>
      <h1>App version {VERSION}.</h1>
      <React.Suspense>
        <RemoteComponent />
      </React.Suspense>
    </>
  );
};

export default App;
